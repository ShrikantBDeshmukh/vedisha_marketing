const fs = require('fs');
const path = require('path');

const dirPath = 'd:\\vedisha marketing projects\\vedisha_marketing';

function checkDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                checkDirectory(filePath);
            }
        } else if (filePath.endsWith('.html')) {
            const content = fs.readFileSync(filePath, 'utf8');
            let imgMatches = content.match(/<img[^>]*>/g);
            if (imgMatches) {
                imgMatches.forEach(imgTag => {
                    let warnings = [];
                    if (!imgTag.includes('loading="lazy"')) {
                        warnings.push('Missing loading="lazy"');
                    }
                    if (!imgTag.includes('.webp') && !imgTag.includes('svg')) {
                        warnings.push('Not using .webp or .svg');
                    }
                    if (warnings.length > 0) {
                        console.log(`${filePath} -> ${imgTag}: ${warnings.join(', ')}`);
                    }
                });
            }
        }
    });
}

console.log("Checking for img tags...");
checkDirectory(dirPath);
console.log("Check complete.");
