import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const designDir = join(root, '..', 'design', 'stitch-export');
const outDir = join(root, 'out');
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meccha-chameleon.co';
const steamUrl = 'https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/';
const lastChecked = 'June 25, 2026';

const routes = [
  ['/', 'Home', 'Paint Your Way to Victory', 'A safe unofficial field guide for finding Meccha Chameleon on Steam, learning the round flow, joining friends, and improving hide-and-seek habits without downloads or account features.', 'logo-wall.webp', 'Start with the Steam page, then use the field cards below to learn roles, setup flow, camouflage, and search discipline.', ['Steam access only through the official store', 'Practical guide routes instead of LFG or gallery features', 'Visible source, affiliation, and last-checked notes'], [
    ['Where to play', '/where-to-play/', 'Use Steam CTA and verify the official listing before buying or launching.'],
    ['Beginner guide', '/beginner-guide/', 'Understand lobby setup, role reveal, prep time, and win conditions.'],
    ['Join friends', '/join-friends/', 'Coordinate rooms and regions without collecting Steam IDs here.'],
  ]],
  ['/where-to-play/', 'Where to Play', 'Where to Play Meccha Chameleon', 'Use the official Steam listing. This site does not host installers, mirrors, unauthorized copies, or browser-playable versions.', 'promo-poster.webp', 'The safest path is simple: open Steam, confirm the app name and developer page, then follow Steam account and purchase flows there.', ['Official Steam store CTA only', 'No hosted files or mirror links', 'Check region, account, and platform details on Steam'], [
    ['Open Steam listing', steamUrl, 'External official store page; opens in a new tab.'],
    ['Beginner setup', '/beginner-guide/', 'After Steam, learn what a round asks you to do.'],
    ['Troubleshooting', '/server-not-showing/', 'If a friend room is missing, check region and room details.'],
  ]],
  ['/beginner-guide/', 'Beginner Guide', 'Beginner Round Flow', 'Learn the basic hide-and-seek loop before chasing advanced paint tricks: join a room, confirm mode, get a role, use prep time, then play the timer.', 'farm-round.webp', 'Meccha Chameleon rewards scene reading. Hiders match color, brightness, and pose; Seekers scan zones, outlines, shadows, and suspicious movement.', ['Confirm room and map before readying up', 'Hiders win if at least one survives the timer', 'Seekers win by finding every Hider'], [
    ['Hider guide', '/hider-guide/', 'Paint after choosing the spot, not before.'],
    ['Seeker guide', '/seeker-guide/', 'Search in repeatable zones instead of random chasing.'],
    ['FAQ', '/faq/', 'Read safety and source notes.'],
  ]],
  ['/join-friends/', 'Join Friends', 'Join Friends Safely', 'Coordinate outside this site, then use shared room details and the same Steam/region context. No matchmaking board, login, chat, or Steam ID collection is implemented here.', 'hotel-lobby.webp', 'Private friend sessions work best when everyone checks the same region, mode, map, and room timing before the round starts.', ['No account system on this P0 site', 'No room matching or user-generated posts', 'Use your own trusted chat or Steam friends list'], [
    ['Room not showing?', '/server-not-showing/', 'Check the usual visibility causes.'],
    ['Beginner guide', '/beginner-guide/', 'Share the round basics with new players.'],
    ['Steam store', steamUrl, 'Confirm everyone is using the same Steam app.'],
  ]],
  ['/server-not-showing/', 'Server Not Showing', 'Server or Room Not Showing?', 'Use a calm checklist before assuming the game is down: region, version, privacy setting, room timing, and whether the host has already started.', 'blue-room.webp', 'Most missing-room issues come from mismatched settings or stale room details. Reconfirm before restarting everything.', ['Same region or server setting', 'Same game version and Steam account context', 'Host room still open and not already in round'], [
    ['Join friends', '/join-friends/', 'Coordinate the exact room details.'],
    ['Where to play', '/where-to-play/', 'Use Steam for store and app checks.'],
    ['Contact', '/contact/', 'Report a site guide correction.'],
  ]],
  ['/hider-guide/', 'Hider Guide', 'Hider Guide: Blend With Intention', 'Pick the hiding spot first, then paint for that surface. A detailed pattern in the wrong place is easier to notice than a simple match in a believable spot.', 'brick-hide.webp', 'Good hiding is a scene-reading problem: shape, brightness, pose, background clutter, and escape route all matter.', ['Choose spot before painting', 'Match brightness as carefully as hue', 'Stay still unless escape is obvious'], [
    ['Seeker guide', '/seeker-guide/', 'Learn what Seekers are scanning for.'],
    ['Beginner guide', '/beginner-guide/', 'Review role flow and win conditions.'],
    ['Steam store', steamUrl, 'Use the official listing only.'],
  ]],
  ['/seeker-guide/', 'Seeker Guide', 'Seeker Guide: Improve Your Search', 'Search like a team, not a swarm. Divide the map, clear zones, and look for broken patterns, wrong brightness, odd silhouettes, and tiny movement.', 'yellow-hall.webp', 'Consistency beats panic. Give each zone a time limit, remember checked areas, and return to suspicious spots when the route allows.', ['Clear corners, floors, walls, shelves, and shadows', 'Call out checked zones with friends', 'Use end-of-round reveals to learn common hiding spots'], [
    ['Hider guide', '/hider-guide/', 'Understand how good disguises are built.'],
    ['Beginner guide', '/beginner-guide/', 'Review round structure first.'],
    ['FAQ', '/faq/', 'Read source and safety notes.'],
  ]],
  ['/faq/', 'FAQ', 'FAQ and Safety Notes', 'Quick answers about official access, affiliation, downloads, friend setup, source notes, and what this guide does not do.', 'paint-room.webp', 'This P0 site is a static unofficial guide. It does not provide accounts, uploads, matchmaking, files, or market/community features.', ['Unofficial and not affiliated', 'No downloads hosted or linked as mirrors', 'Last checked and source notes stay visible'], [
    ['Is this official?', '#unofficial', 'No. It is an unofficial guide with visible affiliation notes.'],
    ['Can I download the game here?', '#downloads', 'No. Use the official Steam listing only.'],
    ['Does this site store account data?', '#accounts', 'No P0 login or matchmaking database is implemented.'],
  ]],
  ['/privacy/', 'Privacy', 'Privacy Policy', 'This static guide keeps privacy simple: no site accounts, no matchmaking profiles, no Steam ID collection, and no user uploads in the P0 build.', 'green-room.webp', 'If analytics are added later, they should be disclosed clearly and configured without collecting sensitive game-account data.', ['No login in P0', 'No gameplay file uploads', 'Contact uses your email app via mailto'], [
    ['Contact', '/contact/', 'Ask for a correction without using a site account.'],
    ['Terms', '/terms/', 'Read safety and affiliation boundaries.'],
    ['Home', '/', 'Return to the field guide hub.'],
  ]],
  ['/terms/', 'Terms', 'Terms of Service', 'Use this guide as player-facing information, not as an official source, software distributor, or guarantee of game behavior.', 'laundry-hall.webp', 'Game details may change. Always confirm purchase, availability, account, and platform information on Steam or official channels.', ['Unofficial fan guide', 'No ownership claim over game media or trademarks', 'No files, unauthorized copies, or browser-play promises'], [
    ['Download policy', '#download-policy', 'This guide does not distribute game files.'],
    ['Disclaimer', '#disclaimer', 'Not affiliated with Steam, Valve, or developers.'],
    ['Privacy', '/privacy/', 'Review data boundaries.'],
  ]],
  ['/contact/', 'Contact', 'Contact the Guide Maintainer', 'Send corrections about guide wording, source notes, broken links, or safety boundaries. The form opens your email app; it is not a backend ticket system.', 'bathroom-hall.webp', 'Please include the page path, what looked wrong, and the public source you want us to compare against.', ['No account required', 'No personal gameplay data requested', 'Use public sources for factual corrections'], [
    ['FAQ', '/faq/', 'Check common answers first.'],
    ['Steam store', steamUrl, 'For purchase/support, use Steam or official channels.'],
    ['Terms', '/terms/', 'Read the disclaimer.'],
  ]],
];

function nav() {
  return `<nav class="bg-background/90 backdrop-blur-md sticky top-0 z-50 w-full border-b border-brick-slate shadow-[0px_4px_20px_rgba(161,217,255,0.15)]">
  <div class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
    <a class="flex items-center gap-2 group" href="/"><span class="font-display-hero-mobile md:font-display-hero text-headline-lg bg-clip-text text-transparent bg-gradient-to-r from-paint-pink via-paint-yellow to-paint-orange">Meccha Chameleon</span></a>
    <div class="hidden md:flex items-center gap-6">
      <a class="text-on-surface-variant font-bold hover:text-surface-tint hover:bg-surface-container-highest transition-all duration-300 px-3 py-2 rounded-lg" href="/where-to-play/">Steam Store</a>
      <a class="text-on-surface-variant font-bold hover:text-surface-tint hover:bg-surface-container-highest transition-all duration-300 px-3 py-2 rounded-lg" href="/beginner-guide/">Guides</a>
      <a class="text-on-surface-variant font-bold hover:text-surface-tint hover:bg-surface-container-highest transition-all duration-300 px-3 py-2 rounded-lg" href="/join-friends/">Join Friends</a>
      <a class="text-on-surface-variant font-bold hover:text-surface-tint hover:bg-surface-container-highest transition-all duration-300 px-3 py-2 rounded-lg" href="/faq/">FAQ</a>
      <a class="text-on-surface-variant font-bold hover:text-surface-tint hover:bg-surface-container-highest transition-all duration-300 px-3 py-2 rounded-lg" href="/contact/">Contact</a>
    </div>
    <button class="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest text-primary border border-brick-slate font-label-caps" type="button"><span class="material-symbols-outlined">menu</span>menu</button>
  </div>
</nav>`;
}

function head(title, description) {
  return `<!DOCTYPE html><html class="dark" lang="en"><head>
<meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>${title} - Meccha Chameleon Guide</title>
<meta name="description" content="${description.replace(/"/g, '&quot;')}"><meta name="generator" content="Next.js static export + Cloudflare Workers Assets">
<link href="https://fonts.googleapis.com/css2?family=Anybody:wght@400;700;900&family=JetBrains+Mono:wght@700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"inverse-on-surface":"#243142","surface-tint":"#82cfff","on-secondary-container":"#9ac07d","surface-container-highest":"#293646","error":"#ffb4ab","tertiary":"#ffc887","secondary-container":"#2f4f19","on-surface-variant":"#bfc8d0","background":"#061423","surface-container-high":"#1e2b3b","surface-variant":"#293646","brick-slate":"#2A475E","surface-container-low":"#0f1c2c","on-surface":"#d6e3f9","stealth-black":"#0D121A","on-primary":"#00344b","outline":"#89929a","primary":"#a1d9ff","tertiary-fixed":"#ffddb7","on-secondary":"#193704","on-background":"#d6e3f9","paint-pink":"#FF00E5","outline-variant":"#3f484f","paint-yellow":"#FCEE09","surface-container":"#132030","primary-container":"#66c0f4","paint-orange":"#FF8A00","surface":"#061423","secondary":"#abd28d"},borderRadius:{DEFAULT:"0.125rem",lg:"0.25rem",xl:"0.5rem",full:"0.75rem"},spacing:{gutter:"24px","margin-mobile":"16px","margin-desktop":"48px",unit:"4px","container-max":"1280px"},fontFamily:{"headline-lg":["Anybody","sans-serif"],"label-caps":["JetBrains Mono","monospace"],"display-hero-mobile":["Anybody","sans-serif"],"body-lg":["Noto Sans","sans-serif"],"body-md":["Noto Sans","sans-serif"],"display-hero":["Anybody","sans-serif"],"headline-md":["Anybody","sans-serif"]},fontSize:{"headline-lg":["32px",{lineHeight:"1.2",fontWeight:"700"}],"label-caps":["12px",{lineHeight:"1",letterSpacing:"0.1em",fontWeight:"700"}],"display-hero-mobile":["32px",{lineHeight:"1.1",fontWeight:"900"}],"body-lg":["18px",{lineHeight:"1.6",fontWeight:"400"}],"body-md":["16px",{lineHeight:"1.6",fontWeight:"400"}],"display-hero":["48px",{lineHeight:"1.1",letterSpacing:"-0.02em",fontWeight:"900"}],"headline-md":["24px",{lineHeight:"1.2",fontWeight:"700"}]}}}}</script>
<style>
body{background-color:#0D121A;background-image:url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z" fill="%23243142" fill-opacity="0.08" fill-rule="evenodd"/%3E%3C/svg%3E');color:#d6e3f9}.neon-glow-primary{box-shadow:0 0 15px rgba(161,217,255,.4)}.neon-glow-pink{box-shadow:0 0 20px rgba(255,0,229,.42)}.neon-glow-yellow{box-shadow:0 0 15px rgba(252,238,9,.34)}.paint-splat-hover:hover:before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#FF00E5,#FCEE09,#FF8A00);opacity:.13;z-index:0;pointer-events:none;mix-blend-mode:color-dodge}.btn-jitter:hover{animation:jitter .3s ease-in-out infinite alternate}@keyframes jitter{0%{transform:translate(0,0)}50%{transform:translate(1px,-1px)}100%{transform:translate(-1px,1px)}}.mc-hero-img{filter:saturate(1.08) contrast(1.04)}.mc-source-pill{border:1px solid rgba(161,217,255,.2);background:rgba(15,28,44,.72);border-radius:999px;padding:.65rem 1rem;color:#bfc8d0;font-size:.82rem}.mc-card{background:linear-gradient(180deg,rgba(30,43,59,.86),rgba(15,28,44,.82));border:1px solid rgba(137,146,154,.28);box-shadow:0 18px 50px rgba(0,0,0,.26);position:relative;overflow:hidden}.mc-card:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 0 0,rgba(255,0,229,.13),transparent 34%),radial-gradient(circle at 100% 100%,rgba(252,238,9,.1),transparent 30%);pointer-events:none}.mc-card>*{position:relative}.mc-shot{border:1px solid rgba(191,200,208,.18);box-shadow:0 22px 70px rgba(0,0,0,.32)}.mc-shot img{width:100%;height:100%;object-fit:cover}.mc-legal h2{font-family:Anybody,sans-serif;font-weight:800;color:#a1d9ff;font-size:1.45rem;margin-top:1.5rem}.mc-legal p,.mc-legal li{color:#bfc8d0;line-height:1.75}.mc-legal section{scroll-margin-top:110px}input,textarea,select{color:#d6e3f9!important;background:#132030!important;border-color:#2A475E!important}a{overflow-wrap:anywhere}@media(max-width:760px){.mc-source-pill{border-radius:18px}.mc-card{border-radius:18px!important}}</style>
<link rel="stylesheet" href="/app-interactions.css"><script defer src="/app-interactions.js"></script>
</head>`;
}

function cards(items) {
  return items.map(([title, href, body], index) => `<a class="mc-card paint-splat-hover rounded-xl p-6 flex flex-col gap-3 min-h-[180px] hover:-translate-y-1 transition-transform" href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>
  <span class="font-label-caps text-label-caps text-tertiary">0${index + 1}</span><h3 class="font-headline-md text-headline-md text-on-surface">${title}</h3><p class="text-on-surface-variant leading-relaxed">${body}</p></a>`).join('\n');
}

function compliance() {
  return `<section class="mc-compliance-strip" aria-label="Source and affiliation note"><strong>Unofficial guide.</strong> Not affiliated with Steam, Valve, or the game developers. No downloads are hosted here.<span>Source note: Steam store/news pages and public player-facing materials; gameplay advice is original and source-labeled.</span><span>Last checked: ${lastChecked}.</span></section>`;
}

function footer() {
  return `<footer class="border-t border-brick-slate mt-10"><div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row gap-4 justify-between text-on-surface-variant"><p>© 2026 Meccha Chameleon Guide. Unofficial player resource.</p><div class="flex gap-4 flex-wrap"><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/contact/">Contact</a><a href="${steamUrl}" target="_blank" rel="noopener noreferrer">Steam Store</a></div></div></footer>`;
}

function page(route) {
  const [path, eyebrow, title, description, image, intro, bullets, items] = route;
  const isContact = path === '/contact/';
  const isFaq = path === '/faq/';
  const isPrivacy = path === '/privacy/';
  const isTerms = path === '/terms/';
  const heroImage = `/media/game/${image}`;
  let extra = '';
  if (isFaq) extra = `<section class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
    <article id="unofficial" class="mc-card rounded-xl p-6"><h2 class="font-headline-md text-headline-md text-primary mb-3">Is this official?</h2><p class="text-on-surface-variant">No. This is an unofficial player guide and is not affiliated with Steam, Valve, or the game developers.</p></article>
    <article id="downloads" class="mc-card rounded-xl p-6"><h2 class="font-headline-md text-headline-md text-primary mb-3">Can I download the game here?</h2><p class="text-on-surface-variant">No. This guide hosts no game files and does not link to mirrors. Use the official Steam listing.</p></article>
    <article id="accounts" class="mc-card rounded-xl p-6"><h2 class="font-headline-md text-headline-md text-primary mb-3">Does this site have accounts?</h2><p class="text-on-surface-variant">No P0 account, LFG board, gallery upload, comments, market, or matchmaking database is implemented.</p></article>
    <article class="mc-card rounded-xl p-6"><h2 class="font-headline-md text-headline-md text-primary mb-3">Where do facts come from?</h2><p class="text-on-surface-variant">Store access and game availability should be confirmed on Steam. Gameplay notes here are original and source-labeled.</p></article>
  </section>`;
  if (isPrivacy) extra = `<section class="mc-legal mc-card rounded-xl p-8"><h2>No accounts in P0</h2><p>This static guide does not offer login, matchmaking profiles, comment accounts, or uploads.</p><h2>Contact form</h2><p>The contact form opens a mailto link in your email app. The static site does not store the message in a database.</p><h2>External links</h2><p>Steam and other external destinations have their own privacy practices. Confirm details there before sharing account information.</p></section>`;
  if (isTerms) extra = `<section class="mc-legal mc-card rounded-xl p-8"><section id="disclaimer"><h2>Unofficial guide disclaimer</h2><p>This guide is not affiliated with Steam, Valve, or the game developers. Trademarks and game media belong to their respective owners.</p></section><section id="download-policy"><h2>No-download policy</h2><p>This site does not distribute game files, installers, mirrors, cheats, unauthorized copies, or browser-playable copies. Use the official Steam listing for access.</p></section><section><h2>Information changes</h2><p>Game availability, price, platform details, balance, and server behavior can change. Always confirm current facts on official channels.</p></section></section>`;
  if (isContact) extra = `<section class="grid grid-cols-1 lg:grid-cols-12 gap-gutter"><form class="mc-card rounded-xl p-8 lg:col-span-7" action="mailto:hello@mecchachameleon.guide" method="post"><label class="block text-on-surface font-bold mb-2" for="name">Name</label><input id="name" class="w-full rounded-lg mb-4" name="name" autocomplete="name"><label class="block text-on-surface font-bold mb-2" for="email">Email</label><input id="email" class="w-full rounded-lg mb-4" name="email" type="email" autocomplete="email"><label class="block text-on-surface font-bold mb-2" for="topic">Topic</label><select id="topic" class="w-full rounded-lg mb-4" name="topic"><option>Guide correction</option><option>Broken link</option><option>Source note</option><option>Safety boundary</option></select><label class="block text-on-surface font-bold mb-2" for="message">Message</label><textarea id="message" class="w-full rounded-lg min-h-36" name="message"></textarea><button class="btn-jitter mt-5 px-7 py-3 rounded-lg bg-primary text-on-primary font-headline-md font-bold neon-glow-primary" type="submit">Send correction</button><p data-form-status class="mt-4 text-on-surface-variant" role="status"></p></form><aside class="mc-card rounded-xl p-8 lg:col-span-5"><h2 class="font-headline-md text-headline-md text-tertiary mb-4">What to include</h2><ul class="space-y-3 text-on-surface-variant"><li>• Page URL or route.</li><li>• The exact line that needs correction.</li><li>• A public source link if factual.</li><li>• Do not send passwords, tokens, or private Steam account data.</li></ul></aside></section>`;
  if (!extra) extra = `<section class="grid grid-cols-1 md:grid-cols-3 gap-gutter">${cards(items)}</section><section class="grid grid-cols-1 lg:grid-cols-2 gap-gutter"><div class="mc-card rounded-xl p-8"><h2 class="font-headline-md text-headline-md text-primary mb-4">Field routine</h2><ol class="space-y-3 text-on-surface-variant leading-relaxed"><li>1. Confirm the official Steam context and current game state.</li><li>2. Pick the guide path that matches your current problem.</li><li>3. Apply the checklist in-game, then adjust based on what you actually see.</li></ol></div><figure class="mc-shot rounded-xl overflow-hidden min-h-[280px]"><img src="/media/game/${path.includes('seeker') ? 'meat-locker.webp' : path.includes('hider') ? 'green-room.webp' : 'paint-room.webp'}" alt="Meccha Chameleon gameplay reference screenshot" loading="lazy" decoding="async"></figure></section>`;
  return `${head(eyebrow, description)}<body class="min-h-screen flex flex-col font-body-md overflow-x-hidden">${nav()}<main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col gap-12"><section class="relative w-full rounded-xl overflow-hidden min-h-[58vh] flex items-center justify-center p-6 md:p-8 bg-surface-container-low border border-brick-slate group"><div class="absolute inset-0 z-0 opacity-45 mix-blend-luminosity pointer-events-none" style="background-image:url('${heroImage}');background-size:cover;background-position:center"></div><div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center w-full"><div class="lg:col-span-7 bg-stealth-black/68 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-outline-variant/30 neon-glow-primary"><p class="font-label-caps text-label-caps text-tertiary uppercase mb-4">${eyebrow}</p><h1 class="font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface mb-5">${title}</h1><p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">${description}</p><div class="flex flex-wrap gap-3 mt-6"><button class="btn-jitter px-7 py-3 bg-primary text-on-primary font-headline-md rounded-lg font-bold neon-glow-primary" type="button">How to Play</button><a class="px-7 py-3 bg-transparent text-primary font-headline-md rounded-lg font-bold border-2 border-primary hover:bg-primary/10 transition-all" href="${steamUrl}" target="_blank" rel="noopener noreferrer">Steam Store</a></div></div><figure class="lg:col-span-5 mc-shot rounded-xl overflow-hidden aspect-[4/3] neon-glow-pink"><img class="mc-hero-img" src="${heroImage}" alt="Meccha Chameleon gameplay screenshot used as guide visual reference" loading="${path === '/' ? 'eager' : 'lazy'}" decoding="async"></figure></div></section><section class="grid grid-cols-1 lg:grid-cols-12 gap-gutter"><article class="mc-card rounded-xl p-8 lg:col-span-7"><p class="font-label-caps text-label-caps text-secondary uppercase mb-3">Player note</p><h2 class="font-headline-lg text-headline-lg text-on-surface mb-4">${intro}</h2><p class="text-on-surface-variant leading-relaxed">All advice is written as conservative player guidance. It avoids feature promises, download language, and unofficial support claims.</p></article><aside class="mc-card rounded-xl p-8 lg:col-span-5"><p class="font-label-caps text-label-caps text-tertiary uppercase mb-3">Checklist</p><ul class="space-y-3">${bullets.map((b) => `<li class="flex gap-3 text-on-surface-variant"><span class="material-symbols-outlined text-primary">verified</span><span>${b}</span></li>`).join('')}</ul></aside></section>${extra}<section class="flex flex-wrap gap-3"> <span class="mc-source-pill">Source note: Steam/public materials + original guidance</span><span class="mc-source-pill">Last checked: ${lastChecked}</span><span class="mc-source-pill">No P0 login, LFG board, gallery, map, market, or news feed</span></section></main>${compliance()}${footer()}</body></html>`;
}

for (const route of routes) {
  const html = page(route);
  const targetDir = route[0] === '/' ? outDir : join(outDir, route[0]);
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, 'index.html'), html);
}

for (const asset of ['favicon.ico', 'apple-touch-icon.png', 'logo.png', 'logo.svg']) {
  const source = join(designDir, asset);
  if (existsSync(source)) copyFileSync(source, join(outDir, asset));
}
for (const asset of ['app-interactions.js', 'app-interactions.css']) {
  copyFileSync(join(root, 'src', asset), join(outDir, asset));
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(([route]) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
for (const starter of ['next.svg', 'vercel.svg', 'file.svg', 'globe.svg', 'window.svg']) rmSync(join(outDir, starter), { force: true });
console.log(`Copied ${routes.length} stitch-export inspired P0 pages into ${outDir}`);
