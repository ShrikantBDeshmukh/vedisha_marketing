const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12

  const pages = [
    'index.html',
    'services.html',
    'industrial-seo-waluj-midc.html',
    'mr/index.html'
  ];

  for (const p of pages) {
    const url = 'file://' + process.cwd() + '/' + p;
    await page.goto(url);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    if (scrollWidth > clientWidth) {
      console.log(`FAIL: ${p} has horizontal overflow (${scrollWidth}px > ${clientWidth}px)`);
    } else {
      console.log(`PASS: ${p} is mobile responsive.`);
    }
  }

  await browser.close();
})();
