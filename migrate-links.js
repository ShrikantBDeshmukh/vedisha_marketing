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
    
    // Replace portfolio.html with work.html
    const oldLink = /portfolio\.html/g;
    if (oldLink.test(content)) {
        content = content.replace(oldLink, 'work.html');
        fs.writeFileSync(filePath, content, 'utf-8');
        successCount++;
        console.log(`Updated links in ${filePath}`);
    }
});

console.log(`Finished updating links in ${successCount} files.`);
