const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const files = [
    'index.html', 'services.html', 'gmb.html',
    'meta-google-ads-management.html',
    'static-website-seo-launch.html',
    'ai-visibility-boost.html'
  ];

  for (const file of files) {
    console.log(`Checking ${file}...`);
    await page.goto('file://' + process.cwd() + '/' + file);
    await page.setViewportSize({ width: 390, height: 844 }); // Mobile
    await page.screenshot({ path: `v_m_${file.substring(0, 4)}.png` });
  }

  await browser.close();
})();
