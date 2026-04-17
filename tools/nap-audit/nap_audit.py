from __future__ import annotations

import argparse
import csv
import json
import re
import sys
import time
from dataclasses import dataclass
from typing import Iterable, Optional

import requests
from bs4 import BeautifulSoup


@dataclass(frozen=True)
class ExpectedNAP:
    name: str
    address: str
    phone: str


@dataclass(frozen=True)
class NAPMatch:
    field: str
    expected: str
    found: str
    status: str  # "match" | "mismatch" | "missing"


def _normalize_whitespace(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def normalize_name(name: str) -> str:
    s = _normalize_whitespace(name).lower()
    s = re.sub(r"[^\w\s&-]", "", s)
    s = re.sub(r"\b(inc|llc|ltd|co|company|corp|corporation)\b\.?", "", s)
    return _normalize_whitespace(s)


def normalize_address(address: str) -> str:
    s = _normalize_whitespace(address).lower()
    s = s.replace("#", " apt ")
    s = re.sub(r"[^\w\s-]", " ", s)
    s = re.sub(r"\b(street)\b", "st", s)
    s = re.sub(r"\b(road)\b", "rd", s)
    s = re.sub(r"\b(avenue)\b", "ave", s)
    s = re.sub(r"\b(boulevard)\b", "blvd", s)
    s = re.sub(r"\b(suite)\b", "ste", s)
    return _normalize_whitespace(s)


def normalize_phone(phone: str) -> str:
    digits = re.sub(r"\D+", "", phone)
    # Prefer last 10 digits for US-style directories; preserves full digits if shorter.
    if len(digits) >= 10:
        digits = digits[-10:]
    return digits


def _looks_like_phone(s: str) -> bool:
    d = normalize_phone(s)
    return len(d) in (7, 10)


def _extract_jsonld_strings(html: str) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    out: list[str] = []
    for tag in soup.select('script[type="application/ld+json"]'):
        if not tag.string:
            continue
        out.append(tag.string)
    return out


def _search_in_jsonld_for_nap(jsonld_texts: list[str]) -> dict[str, str]:
    """
    Best-effort extraction: looks for common JSON-LD keys.
    Returns raw strings (not normalized).
    """
    raw: dict[str, str] = {}

    def walk(obj) -> None:
        if isinstance(obj, dict):
            for k, v in obj.items():
                lk = str(k).lower()
                if lk in ("name",) and isinstance(v, str) and "name" not in raw:
                    raw["name"] = v
                if lk in ("telephone", "phone") and isinstance(v, str) and "phone" not in raw:
                    raw["phone"] = v
                if lk == "address":
                    if isinstance(v, str) and "address" not in raw:
                        raw["address"] = v
                    if isinstance(v, dict):
                        parts = []
                        for key in (
                            "streetAddress",
                            "addressLocality",
                            "addressRegion",
                            "postalCode",
                            "addressCountry",
                        ):
                            if key in v and isinstance(v[key], str):
                                parts.append(v[key])
                        if parts and "address" not in raw:
                            raw["address"] = ", ".join(parts)
                walk(v)
        elif isinstance(obj, list):
            for it in obj:
                walk(it)

    for s in jsonld_texts:
        try:
            parsed = json.loads(s)
        except Exception:
            continue
        walk(parsed)

    return raw


def _extract_visible_text(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for el in soup(["script", "style", "noscript"]):
        el.decompose()
    return _normalize_whitespace(soup.get_text(" "))


def _best_effort_find_phone(text: str) -> str:
    # Wide match for phone-like patterns, then normalize.
    candidates = re.findall(r"(?:\+?\d[\d\s().-]{7,}\d)", text)
    for c in candidates:
        if _looks_like_phone(c):
            return c
    return ""


def _best_effort_find_address(text: str) -> str:
    # Very heuristic: find "street number + words + st/rd/ave/blvd + city/zip-ish"
    m = re.search(
        r"\b\d{1,6}\s+[A-Za-z0-9 .'-]{2,60}\s+(?:st|street|rd|road|ave|avenue|blvd|boulevard|ln|lane|dr|drive)\b.{0,80}\b\d{5}(?:-\d{4})?\b",
        text,
        re.IGNORECASE,
    )
    return m.group(0) if m else ""


def _best_effort_find_name(title: str, h1: str) -> str:
    if h1:
        return h1
    if title:
        return title.split("|")[0].strip()
    return ""


def fetch_url(url: str, timeout_s: int, user_agent: str) -> str:
    headers = {
        "User-Agent": user_agent,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }
    resp = requests.get(url, headers=headers, timeout=timeout_s, allow_redirects=True)
    resp.raise_for_status()
    return resp.text


def compare(expected: ExpectedNAP, found_raw: dict[str, str]) -> list[NAPMatch]:
    out: list[NAPMatch] = []

    exp_name_n = normalize_name(expected.name)
    exp_addr_n = normalize_address(expected.address)
    exp_phone_n = normalize_phone(expected.phone)

    found_name = found_raw.get("name", "") or ""
    found_addr = found_raw.get("address", "") or ""
    found_phone = found_raw.get("phone", "") or ""

    if found_name:
        status = "match" if normalize_name(found_name) == exp_name_n else "mismatch"
        out.append(NAPMatch("name", expected.name, found_name, status))
    else:
        out.append(NAPMatch("name", expected.name, "", "missing"))

    if found_addr:
        status = "match" if normalize_address(found_addr) == exp_addr_n else "mismatch"
        out.append(NAPMatch("address", expected.address, found_addr, status))
    else:
        out.append(NAPMatch("address", expected.address, "", "missing"))

    if found_phone:
        status = "match" if normalize_phone(found_phone) == exp_phone_n else "mismatch"
        out.append(NAPMatch("phone", expected.phone, found_phone, status))
    else:
        out.append(NAPMatch("phone", expected.phone, "", "missing"))

    return out


def _read_urls_csv(path: str) -> list[dict[str, str]]:
    with open(path, "r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        required = {"url"}
        if not required.issubset(set(reader.fieldnames or [])):
            raise ValueError("CSV must include a 'url' column.")
        return [dict((k, (v or "").strip()) for k, v in row.items()) for row in reader]


def _first_non_empty(*vals: str) -> str:
    for v in vals:
        if v and v.strip():
            return v.strip()
    return ""


def main(argv: Optional[list[str]] = None) -> int:
    p = argparse.ArgumentParser(
        description="Validate NAP consistency across directory URLs (best-effort extraction)."
    )
    p.add_argument("--input", required=True, help="Path to CSV with at least: url. Optional: expected_name, expected_address, expected_phone")
    p.add_argument("--expected-name", default="", help="Fallback expected business name")
    p.add_argument("--expected-address", default="", help="Fallback expected address")
    p.add_argument("--expected-phone", default="", help="Fallback expected phone")
    p.add_argument("--timeout", type=int, default=20, help="HTTP timeout seconds")
    p.add_argument("--sleep-ms", type=int, default=250, help="Delay between requests (politeness)")
    p.add_argument("--user-agent", default="AIVisibilityBoost-NAPAudit/1.0 (+https://example.com)", help="Custom user agent")
    p.add_argument("--out-json", default="nap_audit_report.json", help="Output JSON path")
    args = p.parse_args(argv)

    rows = _read_urls_csv(args.input)
    results = []

    for idx, row in enumerate(rows, start=1):
        url = row.get("url", "")
        if not url:
            continue

        expected = ExpectedNAP(
            name=_first_non_empty(row.get("expected_name", ""), args.expected_name),
            address=_first_non_empty(row.get("expected_address", ""), args.expected_address),
            phone=_first_non_empty(row.get("expected_phone", ""), args.expected_phone),
        )

        item = {
            "index": idx,
            "url": url,
            "expected": {"name": expected.name, "address": expected.address, "phone": expected.phone},
            "found": {"name": "", "address": "", "phone": ""},
            "matches": [],
            "ok": False,
            "error": "",
        }

        if not (expected.name and expected.address and expected.phone):
            item["error"] = "Missing expected NAP (provide via CSV columns or CLI fallback flags)."
            results.append(item)
            continue

        try:
            html = fetch_url(url, timeout_s=args.timeout, user_agent=args.user_agent)
            jsonld_texts = _extract_jsonld_strings(html)
            found_raw = _search_in_jsonld_for_nap(jsonld_texts)

            soup = BeautifulSoup(html, "html.parser")
            title = (soup.title.string.strip() if soup.title and soup.title.string else "")
            h1 = (soup.select_one("h1").get_text(" ", strip=True) if soup.select_one("h1") else "")

            visible = _extract_visible_text(html)
            found_raw.setdefault("phone", _best_effort_find_phone(visible))
            found_raw.setdefault("address", _best_effort_find_address(visible))
            found_raw.setdefault("name", _best_effort_find_name(title, h1))

            item["found"] = {
                "name": found_raw.get("name", "") or "",
                "address": found_raw.get("address", "") or "",
                "phone": found_raw.get("phone", "") or "",
            }

            matches = compare(expected, found_raw)
            item["matches"] = [m.__dict__ for m in matches]
            item["ok"] = all(m.status == "match" for m in matches)

        except Exception as e:
            item["error"] = f"{type(e).__name__}: {e}"

        results.append(item)
        time.sleep(max(0, args.sleep_ms) / 1000.0)

    summary = {
        "total": len(results),
        "ok": sum(1 for r in results if r.get("ok")),
        "with_error": sum(1 for r in results if r.get("error")),
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "results": results,
    }

    with open(args.out_json, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)

    print(f"Wrote {args.out_json} (ok={summary['ok']}/{summary['total']}, errors={summary['with_error']}).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

