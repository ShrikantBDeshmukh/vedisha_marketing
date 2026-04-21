const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const url = 'file:///D:/vedisha%20marketing%20projects/vedisha_marketing/404.html';
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'load' });
  
  await page.screenshot({ path: 'screenshot_404.png', fullPage: true });
  console.log('Saved screenshot_404.png');

  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(url, { waitUntil: 'load' });
  await mobilePage.screenshot({ path: 'screenshot_404_mobile.png', fullPage: true });
  console.log('Saved screenshot_404_mobile.png');

  await browser.close();
})();
