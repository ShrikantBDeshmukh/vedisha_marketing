const fs = require('fs');
const path = require('path');

const dir = process.cwd();

function getAllHtmlFiles(directory, fileList = []) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const htmlFiles = getAllHtmlFiles(dir);

let successCount = 0;

htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf-8');
    const isSubDir = path.dirname(filePath) !== dir;
    const prefix = isSubDir ? '../' : '';

    // 1. Inject config.js before global.js or before </body>
    if (!content.includes('js/config.js')) {
        if (content.includes('js/global.js')) {
            content = content.replace(/<script src=".*?js\/global\.js"><\/script>/, `<script src="${prefix}js/config.js"></script>\n  <script src="${prefix}js/global.js"></script>`);
        } else if (content.includes('</body>')) {
            content = content.replace('</body>', `  <script src="${prefix}js/config.js"></script>\n  <script src="${prefix}js/global.js"></script>\n</body>`);
        }
    }

    // 2. Remove hardcoded WhatsApp Float Button blocks to avoid duplicates
    // This refined regex handles both cases: with and without the style block.
    const waRegex = /<!-- WhatsApp Float Button -->[\s\S]*?(?:<\/style>|(?=<\/body>)|<\/a>)/g;
    content = content.replace(waRegex, '');

    fs.writeFileSync(filePath, content, 'utf-8');
    successCount++;
    console.log(`Processed ${filePath}`);
});

console.log(`Finished processing ${successCount} files.`);
