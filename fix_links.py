import os
import re

def fix_html_links(directory='.'):
    # Definitive global assets (Minified for Production)
    styles = [
        'css/global.min.css',
        'css/header.min.css',
        'css/footer.min.css'
    ]
    scripts = [
        'js/config.min.js',
        'js/global.min.js',
        'js/header.min.js',
        'js/footer.min.js'
    ]

    # Pattern to match redundant or legacy links to remove
    to_remove = [
        r'<link[^>]*href="[^"]*branding\.css"[^>]*>',
        r'<link[^>]*href="[^"]*branding-system\.js"[^>]*>',
        r'<link[^>]*href="[^"]*(global|header|footer)\.css"[^>]*>', # Remove non-min versions
        r'<script[^>]*src="[^"]*branding-system\.js"[^>]*></script>',
        r'<script[^>]*src="[^"]*(global|header|footer|config)\.js"[^>]*></script>', # Remove non-min versions
        r'<link[^>]*href="[^"]*branding\.min\.css"[^>]*>', # Redundant after consolidation
        r'<script[^>]*src="[^"]*branding-system\.min\.js"[^>]*></script>'
    ]

    count = 0
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')

        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Calculate relative path prefix
                rel_depth = os.path.relpath(directory, root).replace('\\', '/')
                prefix = rel_depth + '/' if rel_depth != '.' else ''

                # 1. Strip redundant markers and existing global links
                for pattern in to_remove:
                    content = re.sub(pattern, '', content, flags=re.IGNORECASE)

                # 2. Build injection tags
                style_tags = "\n".join([f'  <link rel="stylesheet" href="{prefix}{s}">' for s in styles])
                script_tags = "\n".join([f'  <script src="{prefix}{s}"></script>' for s in scripts])

                # 3. Inject Styles into <head>
                if '</head>' in content:
                    content = content.replace('</head>', f'{style_tags}\n</head>')
                
                # 4. Inject Scripts before </body>
                if '</body>' in content:
                    content = content.replace('</body>', f'{script_tags}\n</body>')

                # 5. Clean up multiple empty lines
                content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)

                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"Fixed: {file_path}")
                count += 1

    print(f"\nProcessing complete. {count} files updated.")

if __name__ == "__main__":
    fix_html_links()
