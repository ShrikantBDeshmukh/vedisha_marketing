import os
import re

files_to_check = ['about.html', 'mr/meta-google-ads-management.html', 'mr/services.html']

for f_path in files_to_check:
    print(f"Checking {f_path}...")
    with open(f_path, 'r') as f:
        content = f.read()
        headers = re.findall(r'<header', content)
        footers = re.findall(r'<footer', content)
        print(f"  Headers: {len(headers)}")
        print(f"  Footers: {len(footers)}")
        lang = re.findall(r'lang="(.*?)"', content)
        print(f"  Lang: {lang}")
