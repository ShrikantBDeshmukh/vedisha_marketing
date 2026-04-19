const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 390, height: 844 });

  const files = [
    'index.html', 'services.html', 'work.html', 'about.html', 'contact.html',
    'ai-visibility-boost.html', 'blog.html', 'clients.html', 'gmb.html',
    'meta-google-ads-management.html', 'real-estate-marketing.html',
    'static-website-seo-launch.html'
  ];

  let allOk = true;
  for (const file of files) {
    try {
      await page.goto('file://' + process.cwd() + '/' + file);
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.offsetWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        return { docWidth, scrollWidth };
      });

      if (overflow.scrollWidth > overflow.docWidth) {
        console.log(`[OVERFLOW] ${file}: docWidth=${overflow.docWidth}, scrollWidth=${overflow.scrollWidth}`);
        allOk = false;
      } else {
        console.log(`[OK] ${file}`);
      }
    } catch (e) {
      console.log(`[ERROR] ${file}: ${e.message}`);
      allOk = false;
    }
  }

  if (!allOk) process.exit(1);
  await browser.close();
})();
