const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const url = 'file:///D:/vedisha%20marketing%20projects/vedisha_marketing/insights/brand-positioning-sprint.html';
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'load' });
  
  await page.screenshot({ path: 'screenshot_insight.png', fullPage: true });
  console.log('Saved screenshot_insight.png');

  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(url, { waitUntil: 'load' });
  await mobilePage.screenshot({ path: 'screenshot_insight_mobile.png', fullPage: true });
  console.log('Saved screenshot_insight_mobile.png');

  await browser.close();
})();
