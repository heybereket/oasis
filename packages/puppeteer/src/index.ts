import puppeteer, { Browser } from 'puppeteer';

const go = async (browser: Browser) => {
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'example.png' });
};

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  for (let i = 0; i < 10; i++) {
    /** 
  increment this no. ^ to increase no. of puppeteer instances 
  **/

    go(browser);
  }
};

main();
