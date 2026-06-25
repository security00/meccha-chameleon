import { chromium } from 'playwright';

const base = process.env.SITE_URL || 'https://meccha-chameleon.potter-faa.workers.dev';
const routes = ['/', '/where-to-play/', '/beginner-guide/', '/join-friends/', '/server-not-showing/', '/hider-guide/', '/seeker-guide/', '/faq/', '/privacy/', '/terms/', '/contact/'];

const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
const results = [];
for (const viewport of [{ name: 'desktop', width: 1280, height: 1200 }, { name: 'mobile', width: 390, height: 900 }]) {
  const page = await browser.newPage({ viewport });
  for (const route of routes) {
    const res = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 45000 });
    const data = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const card = document.querySelector('main [class*="rounded"], main article, main section');
      return {
        title: document.title,
        statusText: document.body.innerText.slice(0, 160).replace(/\s+/g, ' '),
        docScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        bodyBg: getComputedStyle(document.body).backgroundColor,
        h1Color: h1 ? getComputedStyle(h1).color : null,
        h1Text: h1?.textContent?.trim() || null,
        cardRadius: card ? getComputedStyle(card).borderRadius : null,
      };
    });
    const overflow = data.docScrollWidth > data.innerWidth || data.bodyScrollWidth > data.innerWidth;
    results.push({ viewport: viewport.name, route, http: res?.status(), overflow, ...data });
    if (res?.status() !== 200) throw new Error(`${viewport.name} ${route} returned ${res?.status()}`);
    if (overflow) throw new Error(`${viewport.name} ${route} overflows: doc=${data.docScrollWidth}, body=${data.bodyScrollWidth}, inner=${data.innerWidth}`);
  }
  await page.close();
}
await browser.close();

for (const row of results) {
  console.log(`${row.viewport.padEnd(7)} ${row.route.padEnd(22)} ${row.http} overflow=${row.overflow} bg=${row.bodyBg} h1=${JSON.stringify(row.h1Text)} h1Color=${row.h1Color} radius=${row.cardRadius}`);
}
