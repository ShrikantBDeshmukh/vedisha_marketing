const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);
const tailwindScript = '<script src="https://cdn.tailwindcss.com"></script>';

function traverseAndInject(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        traverseAndInject(fullPath);
      }
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('cdn.tailwindcss.com') && content.includes('</head>')) {
        content = content.replace('</head>', `  ${tailwindScript}\n</head>`);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Injected Tailwind CDN into ${file}`);
      }
    }
  });
}

traverseAndInject(directoryPath);
console.log('Finished injecting Tailwind.');
