const fs = require('fs');
const path = require('path');

const dir = process.cwd();

const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let successCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    if (content.includes('global.css')) {
        console.log(`Skipping ${file}`);
        return;
    }

    const canonicalUrl = `https://vedishamarketing.in/${file === 'index.html' ? '' : file}`;

    const headInjection = `
  <!-- Global Technical SEO -->
  <link rel="stylesheet" href="css/global.css">
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
    "url": "https://vedishamarketing.in",
    "logo": "https://vedishamarketing.in/images/office-studio.png"
  }
  </script>
`;

    const bodyInjection = `
  <script src="js/global.js"></script>
`;

    content = content.replace(/<\/head>/i, headInjection + '</head>');
    content = content.replace(/<\/body>/i, bodyInjection + '</body>');
    
    fs.writeFileSync(filePath, content, 'utf-8');
    successCount++;
    console.log(`Updated ${file}`);
});
console.log(`Finished updating ${successCount} files.`);
