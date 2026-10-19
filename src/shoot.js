const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME, headless: true, args: ['--no-sandbox','--disable-gpu','--disable-dev-shm-usage'], timeout: 90000 });
  const p = await b.newPage();
  await p.setViewport({ width: 1000, height: 1200, deviceScaleFactor: 1 });
  await p.goto('file://' + __dirname + '/page.html', { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  for (const id of ['thumb','s1','s2','s3','s4','s5','s6','s7','s8']) {
    const el = await p.$('#' + id);
    await el.screenshot({ path: __dirname + '/../page/' + id + '.jpg', type: 'jpeg', quality: 88 });
  }
  await b.close();
})();
