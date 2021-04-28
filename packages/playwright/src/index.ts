const { webkit } = require('playwright');

async function run(){
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.goto('http://oasis.sh');
  await browser.close();
}
