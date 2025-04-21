const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://www.w3schools.com/');

  const data = await page.evaluate(() => {
    return {
      title: document.title,
      url: location.href
    };
  });

  fs.writeFileSync('scraped.json', JSON.stringify(data, null, 2));
  await browser.close();
})();

