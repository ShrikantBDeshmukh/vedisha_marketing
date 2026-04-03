const fs = require('fs');
const path = require('path');

const dir = process.cwd();
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let successCount = 0;

const analyticsAndTags = `
  <!-- New Global SEO & Analytics injected -->
  <link rel="icon" type="image/x-icon" href="images/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
  <meta property="og:image" content="https://vedishamarketing.com/images/office-studio.png">
  <meta name="twitter:image" content="https://vedishamarketing.com/images/office-studio.png">
  
  <!-- Google tag (gtag.js) - Placeholder -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
`;

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Skip if already injected
    if (content.includes('<!-- New Global SEO & Analytics injected -->')) {
        console.log(`Skipping ${file} - already injected`);
        return;
    }

    // Attempt to inject right before </head>
    if (content.match(/<\/head>/i)) {
        content = content.replace(/<\/head>/i, analyticsAndTags + '</head>');
        fs.writeFileSync(filePath, content, 'utf-8');
        successCount++;
        console.log(`Updated ${file}`);
    } else {
        console.log(`Warning: No </head> tag found in ${file}`);
    }
});

console.log(`Finished updating ${successCount} files with SEO & Analytics tags.`);
