const { webkit } = require('playwright');

async function run(){
  const browser = await webkit.launch({ headless: true, args: ['--disable-gpu'] });
  const page = await browser.newPage();
  await page.goto('http://oasis.sh');
  await browser.close();
}
