const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    console.log(`Checking directory: ${dir}`);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            const forbidden = ['node_modules', '.git', 'css', 'js', 'images', 'components', '.gemini'];
            if (!forbidden.includes(file)) {
                console.log(`  Entering directory: ${file}`);
                getHtmlFiles(filePath, fileList);
            } else {
                console.log(`  Skipping forbidden directory: ${file}`);
            }
        } else if (file.endsWith('.html')) {
            console.log(`  Found HTML: ${file}`);
            fileList.push(filePath);
        }
    });
    return fileList;
}

const htmlFiles = getHtmlFiles(process.cwd());
console.log(`Total files found: ${htmlFiles.length}`);
