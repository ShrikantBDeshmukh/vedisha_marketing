/**
 * Static HTML/JS helper (no TypeScript/build step).
 * ES module exports for reuse in browser or Node.
 */

function normalizeWhitespace(input) {
  return String(input).replace(/\s+/g, " ").trim();
}

export function normalizeName(name) {
  let s = normalizeWhitespace(name).toLowerCase();
  s = s.replace(/[^\w\s&-]/g, "");
  s = s.replace(/\b(inc|llc|ltd|co|company|corp|corporation)\b\.?/g, "");
  return normalizeWhitespace(s);
}

export function normalizeAddress(address) {
  let s = normalizeWhitespace(address).toLowerCase();
  s = s.replace(/#/g, " apt ");
  s = s.replace(/[^\w\s-]/g, " ");
  s = s.replace(/\bstreet\b/g, "st");
  s = s.replace(/\broad\b/g, "rd");
  s = s.replace(/\bavenue\b/g, "ave");
  s = s.replace(/\bboulevard\b/g, "blvd");
  s = s.replace(/\bsuite\b/g, "ste");
  return normalizeWhitespace(s);
}

export function normalizePhone(phone) {
  let digits = String(phone).replace(/\D+/g, "");
  if (digits.length >= 10) digits = digits.slice(-10);
  return digits;
}

export function compareNAP(expected, found) {
  const expName = normalizeName(expected.name);
  const expAddress = normalizeAddress(expected.address);
  const expPhone = normalizePhone(expected.phone);

  const foundName = found?.name ?? "";
  const foundAddress = found?.address ?? "";
  const foundPhone = found?.phone ?? "";

  return [
    {
      field: "name",
      expected: expected.name,
      found: foundName,
      status: foundName ? (normalizeName(foundName) === expName ? "match" : "mismatch") : "missing",
    },
    {
      field: "address",
      expected: expected.address,
      found: foundAddress,
      status: foundAddress
        ? (normalizeAddress(foundAddress) === expAddress ? "match" : "mismatch")
        : "missing",
    },
    {
      field: "phone",
      expected: expected.phone,
      found: foundPhone,
      status: foundPhone ? (normalizePhone(foundPhone) === expPhone ? "match" : "mismatch") : "missing",
    },
  ];
}

