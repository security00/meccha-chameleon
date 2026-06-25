import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const designDir = join(root, '..', 'design', 'stitch-r4-v2');
const outDir = join(root, 'out');

const routes = [
  ['/', 'homepage-desktop.html'],
  ['/where-to-play/', 'where-to-play-desktop.html'],
  ['/beginner-guide/', 'beginner-guide-desktop.html'],
  ['/join-friends/', 'join-friends-desktop.html'],
  ['/server-not-showing/', 'server-not-showing-desktop.html'],
  ['/hider-guide/', 'hider-guide-desktop.html'],
  ['/seeker-guide/', 'seeker-guide-desktop.html'],
  ['/faq/', 'faq-desktop.html'],
  ['/privacy/', 'privacy-desktop.html'],
  ['/terms/', 'terms-desktop.html'],
  ['/contact/', 'contact-desktop.html'],
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meccha-chameleon.potter-faa.workers.dev';

function patchHtml(html) {
  const interactionAssets = '<link rel="stylesheet" href="/app-interactions.css"/><script defer src="/app-interactions.js"></script>';
  return html
    .replace(/<button\b[^>]*>\s*(?:LOGIN|Login|Sign In|SIGN IN|Log In)\s*<\/button>/g, '')
    .replace(/<meta charset="utf-8"\/>/, '<meta charset="utf-8"/><meta name="generator" content="Next.js static export + Cloudflare Workers Assets"/>')
    .replace(/<\/head>/, `${interactionAssets}</head>`)
    .replace(/<\/body>/, '<footer style="position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden">Unofficial guide. Not affiliated with Steam or developers.</footer></body>');
}

for (const [route, file] of routes) {
  const html = patchHtml(readFileSync(join(designDir, file), 'utf8'));
  const targetDir = route === '/' ? outDir : join(outDir, route);
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, 'index.html'), html);
}

for (const asset of ['favicon.ico', 'apple-touch-icon.png', 'logo.png', 'logo.svg']) {
  copyFileSync(join(designDir, asset), join(outDir, asset));
}

for (const asset of ['app-interactions.js', 'app-interactions.css']) {
  copyFileSync(join(root, 'src', asset), join(outDir, asset));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(([route]) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);

for (const starter of ['next.svg', 'vercel.svg', 'file.svg', 'globe.svg', 'window.svg']) {
  rmSync(join(outDir, starter), { force: true });
}

console.log(`Copied ${routes.length} Stitch V2 pages into ${outDir}`);
