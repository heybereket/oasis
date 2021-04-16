import puppeteer, { Browser } from 'puppeteer';

const go = async (browser: Browser) => {
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000');
};

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  for (let i = 0; i < 10; i++) {
    go(browser);
  }
};

main();

