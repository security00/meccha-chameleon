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
        loginVisible: [...document.querySelectorAll('a,button')].some((el) => /^(login|sign in|log in)$/i.test(el.textContent.trim()) && getComputedStyle(el).display !== 'none'),
        interactionScript: Boolean(document.querySelector('script[src="/app-interactions.js"]')),
      };
    });
    const overflow = data.docScrollWidth > data.innerWidth || data.bodyScrollWidth > data.innerWidth;
    results.push({ viewport: viewport.name, route, http: res?.status(), overflow, ...data });
    if (res?.status() !== 200) throw new Error(`${viewport.name} ${route} returned ${res?.status()}`);
    if (overflow) throw new Error(`${viewport.name} ${route} overflows: doc=${data.docScrollWidth}, body=${data.bodyScrollWidth}, inner=${data.innerWidth}`);
    if (data.loginVisible) throw new Error(`${viewport.name} ${route} exposes auth entrypoint`);
    if (!data.interactionScript) throw new Error(`${viewport.name} ${route} is missing interaction script`);
  }
  await page.close();
}

const interactionPage = await browser.newPage({ viewport: { width: 390, height: 900 } });
await interactionPage.goto(base + '/', { waitUntil: 'networkidle' });
await interactionPage.click('button:has-text("menu")');
await interactionPage.waitForSelector('.mc-mobile-menu.is-open', { timeout: 5000 });
await interactionPage.click('.mc-mobile-menu a[href="/beginner-guide/"]');
await interactionPage.waitForURL('**/beginner-guide/', { timeout: 10000 });
console.log('interaction mobile menu -> beginner-guide ok');

await interactionPage.setViewportSize({ width: 1280, height: 900 });
await interactionPage.goto(base + '/', { waitUntil: 'networkidle' });
await interactionPage.locator('button:has-text("How to Play")').filter({ visible: true }).first().click();
await interactionPage.waitForURL('**/beginner-guide/', { timeout: 10000 });
console.log('interaction CTA How to Play -> beginner-guide ok');

await interactionPage.goto(base + '/contact/', { waitUntil: 'networkidle' });
await interactionPage.fill('#name', 'QA Tester');
await interactionPage.fill('#email', 'qa@example.com');
await interactionPage.fill('#message', 'Checking contact form interaction.');
await interactionPage.click('button[type="submit"]');
await interactionPage.waitForSelector('[data-form-status]', { timeout: 5000 });
const contactStatus = await interactionPage.textContent('[data-form-status]');
if (!contactStatus?.includes('Opening your email app')) throw new Error(`contact form status failed: ${contactStatus}`);
console.log('interaction contact form validation/mailto ok');
await interactionPage.close();

await browser.close();

for (const row of results) {
  console.log(`${row.viewport.padEnd(7)} ${row.route.padEnd(22)} ${row.http} overflow=${row.overflow} auth=${row.loginVisible} script=${row.interactionScript} bg=${row.bodyBg} h1=${JSON.stringify(row.h1Text)} h1Color=${row.h1Color} radius=${row.cardRadius}`);
}
