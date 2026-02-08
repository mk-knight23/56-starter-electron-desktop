const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  // Enable console logging
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      console.log(`[ERROR] ${text}`);
    } else if (type === 'warning') {
      console.log(`[WARN] ${text}`);
    } else {
      console.log(`[LOG] ${text}`);
    }
  });

  page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.message}`);
  });

  try {
    console.log('Navigating to http://localhost:4201...');
    await page.goto('http://localhost:4201', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for the app to render
    await page.waitForSelector('app-root', { timeout: 10000 });

    // Wait a bit for Angular to bootstrap
    await page.waitForTimeout(3000);

    // Check if main content is visible
    const sidebar = await page.locator('.sidebar').isVisible().catch(() => false);
    const content = await page.locator('.content-area').isVisible().catch(() => false);

    console.log('Sidebar visible:', sidebar);
    console.log('Content area visible:', content);

    // Take screenshot
    await page.screenshot({
      path: '/Users/mkazi/60 Projects/screenshots/starters/starter-56.png',
      fullPage: false
    });

    console.log('Screenshot saved to /Users/mkazi/60 Projects/screenshots/starters/starter-56.png');

    // Get page title
    const title = await page.title();
    console.log('Page title:', title);

  } catch (error) {
    console.error('Test failed:', error.message);
    await page.screenshot({
      path: '/Users/mkazi/60 Projects/screenshots/starters/starter-56-error.png',
      fullPage: false
    });
  }

  await browser.close();
})();
