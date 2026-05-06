const fs = require('fs');

const sitemapPath = "sitemap.xml";
let sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
const urls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

const filesToProcess = [];
for (const url of urls) {
    let filename = url.split("/").pop();
    if (!filename) filename = "index.html";
    if (fs.existsSync(filename)) {
        filesToProcess.push(filename);
    }
}

for (const filename of filesToProcess) {
    let html = fs.readFileSync(filename, "utf-8");
    
    // Replace components.min.js with our new global scripts
    if (html.includes('./assets/js/components.min.js')) {
        html = html.replace(/<script[^>]*src="\.\/assets\/js\/components\.min\.js"[^>]*><\/script>/g, 
            '<script src="js/header.min.js" defer></script>\n  <script src="js/footer.min.js" defer></script>');
    } else if (html.includes('assets/js/components.min.js')) {
         html = html.replace(/<script[^>]*src="assets\/js\/components\.min\.js"[^>]*><\/script>/g, 
            '<script src="js/header.min.js" defer></script>\n  <script src="js/footer.min.js" defer></script>');
    } else {
        // Just inject before </body> if it's not already there
        if (!html.includes('js/header.min.js')) {
            html = html.replace(/<\/body>/i, '  <script src="js/header.min.js" defer></script>\n  <script src="js/footer.min.js" defer></script>\n</body>');
        }
    }
    
    // I also need to ensure global CSS is linked if missing
    if (!html.includes('css/global.min.css')) {
        html = html.replace(/<\/head>/i, '  <link rel="stylesheet" href="css/global.min.css">\n</head>');
    }

    fs.writeFileSync(filename, html, "utf-8");
    console.log("Fixed JS links in " + filename);
}
