const fs = require('fs');
const path = require('path');

const dir = process.cwd();

// Recursively find all HTML files
function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'components') {
                getHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const htmlFiles = getHtmlFiles(dir);
let successCount = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(path.dirname(file), dir);
    const basePath = relativePath ? relativePath + '/' : '';

    // Idempotency check: Skip if global.css link is already present
    if (content.includes('global.css')) {
        console.log(`Skipping ${file} - already has global.css`);
        return;
    }

    const fileName = path.basename(file);
    const canonicalUrl = `https://vedishamarketing.com/${fileName === 'index.html' ? '' : fileName}`;

    const headInjection = `
  <!-- Global Technical SEO -->
  <link rel="stylesheet" href="${basePath}css/global.css">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Vedisha Marketing | Strategy, content, PR & performance">
  <meta property="og:description" content="Vedisha Marketing is a small, senior-led studio for positioning, content systems, PR, and performance testing—built to move fast without losing quality.">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="Vedisha Marketing">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vedisha Marketing",
    "url": "https://vedishamarketing.com",
    "logo": "https://vedishamarketing.com/images/office-studio.png"
  }
  </script>
`;

    const bodyInjection = `
  <script src="${basePath}js/global.js"></script>
`;

    content = content.replace(/<\/head>/i, headInjection + '</head>');
    content = content.replace(/<\/body>/i, bodyInjection + '</body>');
    
    fs.writeFileSync(file, content, 'utf-8');
    successCount++;
    console.log(`Updated ${file}`);
});
console.log(`Finished updating ${successCount} files.`);
