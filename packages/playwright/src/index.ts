const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.goto('http://oasis.sh');
  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
