import os
import re

def standardize_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add overflow-x-hidden to body tag
    # Match <body class="..." or <body without class
    body_match = re.search(r'<body([^>]*)>', content)
    if body_match:
        attrs = body_match.group(1)
        if 'overflow-x-hidden' not in attrs:
            if 'class="' in attrs:
                new_attrs = attrs.replace('class="', 'class="overflow-x-hidden ')
            else:
                new_attrs = attrs + ' class="overflow-x-hidden"'
            content = content.replace(f'<body{attrs}>', f'<body{new_attrs}>')
    
    # 2. Inject noise-overlay if missing
    if '<div class="noise-overlay"></div>' not in content:
        content = re.sub(r'(<body[^>]*>)', r'\1\n  <div class="noise-overlay"></div>', content)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Root directory
for file in os.listdir('.'):
    if file.endswith('.html'):
        print(f"Standardizing {file}...")
        standardize_html(file)

# Insights directory
if os.path.exists('insights'):
    for file in os.listdir('insights'):
        if file.endswith('.html'):
            print(f"Standardizing insights/{file}...")
            standardize_html(os.path.join('insights', file))
