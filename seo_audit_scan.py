import re, os

base = r'd:\vedisha marketing projects\vedisha_marketing'
files = [
    'index.html','services.html','work.html','contact.html',
    'meta-google-ads-management.html','static-website-seo-launch.html',
    'ai-visibility-boost.html','ai-content-structuring.html',
    'marketing-strategy-roadmap.html','brand-identity-kit.html',
    'social-media-marketing.html','blog-post-bundles.html',
    'keyword-research-spreadsheet.html','seo-audit-reports.html',
    'local-lead-combo.html','gmb.html','real-estate-marketing.html',
    'industrial-seo-waluj-midc.html','b2b-lead-gen-shendra-midc.html',
    'healthcare-marketing-csn.html',
    'digital-marketing-in-waluj-midc.html','web-development-in-waluj-midc.html',
    'seo-services-in-waluj-midc.html','digital-marketing-in-shendra-midc.html',
    'web-development-in-shendra-midc.html','seo-services-in-shendra-midc.html',
    'digital-marketing-in-cidco.html','web-development-in-cidco.html',
    'seo-services-in-cidco.html','digital-marketing-in-chikalthana.html',
    'web-development-in-chikalthana.html','seo-services-in-chikalthana.html'
]

print(f"{'FILE':<45} {'TITLE_LEN':>9} {'HAS_META':>8} {'CANON':>5} {'H1':>2} {'JSONLD':>6} {'IMG_NOALT':>9} {'IMG_NOSIZE':>10}")
print("-"*110)

issues = {}

for f in files:
    path = os.path.join(base, f)
    if not os.path.exists(path):
        print(f"{f:<45} NOT FOUND")
        continue
    with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
        content = fh.read()

    title_m = re.search(r'<title>([^<]+)</title>', content, re.I)
    title = title_m.group(1).strip() if title_m else 'MISSING'
    title_len = len(title)

    meta_m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']', content, re.I)
    if not meta_m:
        meta_m = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']description["\']', content, re.I)
    meta_desc = meta_m.group(1).strip() if meta_m else 'MISSING'
    meta_len = len(meta_desc) if meta_desc != 'MISSING' else 0

    canonical = 'YES' if re.search(r'rel=["\']canonical["\']', content, re.I) else 'NO'
    h1_count = len(re.findall(r'<h1[\s>]', content, re.I))
    jsonld = 'YES' if 'application/ld+json' in content else 'NO'

    imgs = re.findall(r'<img[^>]*>', content, re.I)
    img_no_alt = sum(1 for img in imgs if not re.search(r'\balt\s*=', img, re.I))
    img_no_size = sum(1 for img in imgs if not re.search(r'\bwidth\s*=', img, re.I))

    has_meta = f"YES({meta_len})" if meta_desc != 'MISSING' else 'NO'
    issues[f] = {
        'title': title, 'title_len': title_len,
        'meta_desc': meta_desc, 'meta_len': meta_len,
        'canonical': canonical, 'h1': h1_count,
        'jsonld': jsonld, 'img_no_alt': img_no_alt, 'img_no_size': img_no_size
    }
    print(f"{f:<45} {title_len:>9} {has_meta:>8} {canonical:>5} {h1_count:>2} {jsonld:>6} {img_no_alt:>9} {img_no_size:>10}")

print()
print("=== ISSUES SUMMARY ===")
missing_canon = [f for f,v in issues.items() if v['canonical']=='NO']
missing_jsonld = [f for f,v in issues.items() if v['jsonld']=='NO']
bad_h1 = [f for f,v in issues.items() if v['h1'] != 1]
missing_meta = [f for f,v in issues.items() if v['meta_desc']=='MISSING']
short_title = [f for f,v in issues.items() if v['title_len'] < 30 or v['title_len'] > 70]
short_meta = [f for f,v in issues.items() if 0 < v['meta_len'] < 120 or v['meta_len'] > 160]
has_img_noalt = [f for f,v in issues.items() if v['img_no_alt'] > 0]
has_img_nosize = [f for f,v in issues.items() if v['img_no_size'] > 0]

print(f"Missing canonical ({len(missing_canon)}): {missing_canon}")
print(f"Missing JSON-LD ({len(missing_jsonld)}): {missing_jsonld}")
print(f"H1 != 1 ({len(bad_h1)}): {bad_h1}")
print(f"Missing meta desc ({len(missing_meta)}): {missing_meta}")
print(f"Title not 30-70 chars ({len(short_title)}): {short_title}")
print(f"Meta desc not 120-160 chars ({len(short_meta)}): {short_meta}")
print(f"Images missing alt ({len(has_img_noalt)}): {has_img_noalt}")
print(f"Images missing width ({len(has_img_nosize)}): {has_img_nosize}")
