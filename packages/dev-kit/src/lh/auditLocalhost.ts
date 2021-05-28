import * as chromeLauncher from 'chrome-launcher';

const lighthouse = require('lighthouse');

export const auditLocalhost = async (): Promise<string> => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      '--no-first-run',
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
    ],
  });
  const runnerResult = await lighthouse('http://localhost:3000', {
    port: chrome.port,
    output: 'html',
  });

  await chrome.kill();

  return runnerResult.report;
};
