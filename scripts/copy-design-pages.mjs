import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const designDir = join(root, '..', 'design', 'stitch-export-v2');
const outDir = join(root, 'out');
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meccha-chameleon.co';
const steamUrl = 'https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/';
const lastChecked = 'June 25, 2026';
const sourceMode = '7,000,000+ copies sold';

const routes = [
  {
    path: '/', eyebrow: 'Unofficial Meccha Chameleon Hub', title: 'Paint Your Way to Victory', image: 'logo-wall.webp', accent: 'pink',
    description: 'A neon field guide for Steam players: find the official store page, learn the round flow, coordinate with friends, and improve hide-and-seek habits without account features or hosted files.',
    intro: 'This guide follows the latest dark neon hub rhythm: compact navigation, immersive game-media hero, status cards, and bento guide entrances. Community-like actions are mapped back to safe guide pages.',
    bullets: ['Steam access through the official listing only', 'Static guide pages instead of accounts, uploads, or matchmaking', 'Visible source, affiliation, and last-checked notes'],
    cards: [
      ['Steam Store', '/where-to-play/', 'Confirm the official listing, platform details, and current store information.'],
      ['Missions Guide', '/beginner-guide/', 'Understand lobbies, role reveal, prep time, and win conditions.'],
      ['Friend Setup', '/join-friends/', 'Coordinate rooms safely without collecting Steam IDs on this site.'],
      ['Seeker Routine', '/seeker-guide/', 'Scan rooms by zones, outlines, brightness, shadows, and movement.'],
    ],
  },
  {
    path: '/where-to-play/', eyebrow: 'Steam Store Route', title: 'Where to Play Meccha Chameleon', image: 'promo-poster.webp', accent: 'cyan',
    description: 'Use the official Steam listing. This site does not host installers, mirrors, unauthorized copies, or browser copies.',
    intro: 'The safest path is simple: open Steam, confirm the app name and store context, then follow Steam account and purchase flows there. Price, availability, and platform details can change, so confirm them on Steam before acting.',
    bullets: ['Official Steam CTA only', 'No hosted files or mirror links', 'Current purchase details belong on Steam'],
    cards: [['Open Steam listing', steamUrl, 'External official store page; opens in a new tab.'], ['Beginner setup', '/beginner-guide/', 'After Steam, learn what a round asks you to do.'], ['Troubleshooting', '/server-not-showing/', 'If a friend room is missing, check region and room details.']],
  },
  {
    path: '/beginner-guide/', eyebrow: 'Missions Guide', title: 'Beginner Round Flow', image: 'farm-round.webp', accent: 'yellow',
    description: 'Learn the basic hide-and-seek loop before chasing advanced paint tricks: join a room, confirm mode, get a role, use prep time, then play the timer.',
    intro: 'Meccha Chameleon rewards scene reading. Hiders match color, brightness, pose, and clutter; Seekers clear zones and look for details that break the room.',
    bullets: ['Confirm room and map before readying up', 'Hiders win if at least one survives the timer', 'Seekers win by finding every Hider'],
    cards: [['Hider guide', '/hider-guide/', 'Paint after choosing the spot, not before.'], ['Seeker guide', '/seeker-guide/', 'Search in repeatable zones instead of random chasing.'], ['FAQ', '/faq/', 'Read safety and source notes.']],
  },
  {
    path: '/join-friends/', eyebrow: 'Friend Setup', title: 'Join Friends Safely', image: 'hotel-lobby.webp', accent: 'pink',
    description: 'Coordinate in your trusted chat or Steam friends list, then use shared room details and the same Steam/region context. This guide does not collect Steam IDs or provide chat, login, or post boards.',
    intro: 'Private friend sessions work best when everyone checks the same region, mode, map, and timing before the round starts. This page is a checklist, not a matchmaking feature.',
    bullets: ['No account system on this guide', 'No room posts or user-generated listings', 'Use your trusted chat or Steam friends list'],
    cards: [['Room not showing?', '/server-not-showing/', 'Check the usual visibility causes.'], ['Beginner guide', '/beginner-guide/', 'Share the round basics with new players.'], ['Steam store', steamUrl, 'Confirm everyone is using the same Steam app.']],
  },
  {
    path: '/server-not-showing/', eyebrow: 'Troubleshooting', title: 'Server or Room Not Showing?', image: 'blue-room.webp', accent: 'cyan',
    description: 'Use a calm checklist before assuming the game is down: region, version, privacy setting, room timing, and whether the host has already started.',
    intro: 'Most missing-room issues come from mismatched settings or stale room details. Reconfirm the same region, game version, room name, invite path, and host status before restarting everything.',
    bullets: ['Same region or server setting', 'Same game version and Steam account context', 'Host room still open and not already in round'],
    cards: [['Join friends', '/join-friends/', 'Coordinate the exact room details.'], ['Where to play', '/where-to-play/', 'Use Steam for store and app checks.'], ['Contact', '/contact/', 'Report a site guide correction.']],
  },
  {
    path: '/hider-guide/', eyebrow: 'Hider Guide', title: 'Blend With Intention', image: 'brick-hide.webp', accent: 'yellow',
    description: 'Pick the hiding spot first, then paint for that surface. A detailed pattern in the wrong place is easier to notice than a simple match in a believable spot.',
    intro: 'Good hiding is a scene-reading problem: shape, brightness, pose, background clutter, and escape route all matter. Match the room before adding small details.',
    bullets: ['Choose spot before painting', 'Match brightness as carefully as hue', 'Stay still unless escape is obvious'],
    cards: [['Seeker guide', '/seeker-guide/', 'Learn what Seekers are scanning for.'], ['Beginner guide', '/beginner-guide/', 'Review role flow and win conditions.'], ['Steam store', steamUrl, 'Use the official listing only.']],
  },
  {
    path: '/seeker-guide/', eyebrow: 'Seeker Guide', title: 'Improve Your Search', image: 'yellow-hall.webp', accent: 'cyan',
    description: 'Search like a team, not a swarm. Divide the map, clear zones, and look for broken patterns, wrong brightness, odd silhouettes, and tiny movement.',
    intro: 'Consistency beats panic. Give each zone a time limit, remember checked areas, and return to suspicious spots when the route allows.',
    bullets: ['Clear corners, floors, walls, shelves, and shadows', 'Call out checked zones with friends', 'Use end-of-round reveals to learn common hiding spots'],
    cards: [['Hider guide', '/hider-guide/', 'Understand how good disguises are built.'], ['Beginner guide', '/beginner-guide/', 'Review round structure first.'], ['FAQ', '/faq/', 'Read source and safety notes.']],
  },
  {
    path: '/faq/', eyebrow: 'FAQ', title: 'FAQ and Safety Notes', image: 'paint-room.webp', accent: 'pink',
    description: 'Quick answers about official access, affiliation, hosted files, friend setup, source notes, and what this guide does not do.',
    intro: 'This is an unofficial player guide. It does not provide accounts, uploads, matchmaking, market features, comments, or game files.',
    bullets: ['Unofficial and not affiliated', 'No downloads hosted or linked as mirrors', 'Last checked and source notes stay visible'],
    cards: [],
  },
  {
    path: '/privacy/', eyebrow: 'Privacy', title: 'Privacy Policy', image: 'green-room.webp', accent: 'cyan',
    description: 'This guide keeps privacy simple: no site accounts, no matchmaking profiles, no Steam ID collection, and no user uploads.',
    intro: 'If analytics are added later, they should be disclosed clearly and configured without collecting sensitive game-account data.',
    bullets: ['No login on this guide', 'No gameplay file uploads', 'Contact uses your email app via mailto'],
    cards: [],
  },
  {
    path: '/terms/', eyebrow: 'Terms', title: 'Terms of Service', image: 'laundry-hall.webp', accent: 'yellow',
    description: 'Use this guide as player-facing information, not as an official source, software distributor, or guarantee of game behavior.',
    intro: 'Game details may change. Always confirm purchase, availability, account, and platform information on Steam or official channels.',
    bullets: ['Unofficial fan guide', 'No ownership claim over game media or trademarks', 'No files, unauthorized copies, or browser-play promises'],
    cards: [],
  },
  {
    path: '/contact/', eyebrow: 'Contact', title: 'Contact the Guide Maintainer', image: 'bathroom-hall.webp', accent: 'pink',
    description: 'Send corrections about guide wording, source notes, broken links, or safety boundaries. The form opens your email app; it is not a backend ticket system.',
    intro: 'Please include the page path, what looked wrong, and the public source you want us to compare against. Do not send passwords, tokens, private Steam account data, or payment details.',
    bullets: ['No account required', 'No personal gameplay data requested', 'Use public sources for factual corrections'],
    cards: [],
  },
];

function esc(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function nav() {
  return `<nav class="mc-nav sticky top-0 z-50 w-full border-b border-brick-slate bg-background/90 backdrop-blur-md shadow-[0_4px_20px_rgba(161,217,255,0.15)]">
  <div class="mx-auto flex w-full max-w-container-max items-center justify-between px-margin-mobile py-4 md:px-margin-desktop">
    <a class="group flex items-center gap-3" href="/" aria-label="Meccha Chameleon guide home"><span class="mc-logo-mark">MC</span><span class="font-display-hero-mobile text-[26px] font-black bg-clip-text text-transparent bg-gradient-to-r from-paint-pink via-paint-yellow to-paint-orange md:text-headline-lg">Meccha Chameleon</span></a>
    <div class="hidden items-center gap-4 md:flex">
      <a class="mc-nav-link" href="/where-to-play/">Steam Store</a>
      <a class="mc-nav-link" href="/beginner-guide/">Missions</a>
      <a class="mc-nav-link" href="/join-friends/">Friends</a>
      <a class="mc-nav-link" href="/server-not-showing/">Fix Room</a>
      <a class="mc-nav-link" href="/faq/">FAQ</a>
      <a class="mc-nav-link" href="/contact/">Contact</a>
    </div>
    <button class="mc-menu-button md:hidden" type="button" data-menu-button aria-expanded="false"><span class="material-symbols-outlined">menu</span>menu</button>
  </div>
</nav>`;
}

function head(page) {
  const canonical = `${siteUrl}${page.path}`;
  return `<!DOCTYPE html><html class="dark" lang="en"><head>
<meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>${esc(page.eyebrow)} - Meccha Chameleon Unofficial Guide</title>
<meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${canonical}">
<link href="https://fonts.googleapis.com/css2?family=Anybody:wght@400;700;900&family=JetBrains+Mono:wght@700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"surface-tint":"#82cfff","on-surface-variant":"#bfc8d0","background":"#061423","surface-container-high":"#1e2b3b","surface-container-highest":"#293646","surface-variant":"#293646","brick-slate":"#2A475E","surface-container-low":"#0f1c2c","on-surface":"#d6e3f9","stealth-black":"#0D121A","on-primary":"#00344b","outline":"#89929a","primary":"#a1d9ff","on-background":"#d6e3f9","paint-pink":"#FF00E5","outline-variant":"#3f484f","paint-yellow":"#FCEE09","surface-container":"#132030","primary-container":"#66c0f4","paint-orange":"#FF8A00","surface":"#061423","secondary":"#abd28d","tertiary":"#ffc887"},borderRadius:{DEFAULT:"0.125rem",lg:"0.25rem",xl:"0.5rem",full:"0.75rem"},spacing:{gutter:"24px","margin-mobile":"16px","margin-desktop":"48px",unit:"4px","container-max":"1280px"},fontFamily:{"headline-lg":["Anybody","sans-serif"],"label-caps":["JetBrains Mono","monospace"],"display-hero-mobile":["Anybody","sans-serif"],"body-lg":["Noto Sans","sans-serif"],"body-md":["Noto Sans","sans-serif"],"display-hero":["Anybody","sans-serif"],"headline-md":["Anybody","sans-serif"]},fontSize:{"headline-lg":["32px",{lineHeight:"1.2",fontWeight:"700"}],"label-caps":["12px",{lineHeight:"1",letterSpacing:"0.1em",fontWeight:"700"}],"display-hero-mobile":["32px",{lineHeight:"1.08",fontWeight:"900"}],"body-lg":["18px",{lineHeight:"1.6",fontWeight:"400"}],"body-md":["16px",{lineHeight:"1.6",fontWeight:"400"}],"display-hero":["56px",{lineHeight:"1.02",letterSpacing:"-0.03em",fontWeight:"900"}],"headline-md":["24px",{lineHeight:"1.2",fontWeight:"700"}]}}}}</script>
<style>
body{background-color:#0D121A;background-image:radial-gradient(circle at 50% -20%,rgba(255,0,229,.16),transparent 48%),radial-gradient(circle at 110% 20%,rgba(161,217,255,.14),transparent 34%),url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z" fill="%23243142" fill-opacity="0.08" fill-rule="evenodd"/%3E%3C/svg%3E');color:#d6e3f9}.mc-logo-mark{display:grid;place-items:center;width:42px;height:42px;border:1px solid rgba(252,238,9,.42);border-radius:14px;background:linear-gradient(135deg,rgba(255,0,229,.22),rgba(252,238,9,.14));color:#FCEE09;font:900 13px/1 JetBrains Mono,monospace;box-shadow:0 0 22px rgba(255,0,229,.28)}.mc-nav-link{border:1px solid transparent;border-radius:12px;color:#bfc8d0;font-weight:800;padding:.65rem .8rem;text-decoration:none;transition:.2s}.mc-nav-link:hover{border-color:rgba(161,217,255,.24);background:#293646;color:#82cfff}.mc-menu-button{display:flex;align-items:center;gap:.4rem;border:1px solid #2A475E;border-radius:12px;background:#293646;color:#a1d9ff;font:800 12px JetBrains Mono,monospace;padding:.65rem .85rem;text-transform:uppercase}.neon-glow-primary{box-shadow:0 0 18px rgba(161,217,255,.42)}.neon-glow-pink{box-shadow:0 0 24px rgba(255,0,229,.44)}.neon-glow-yellow{box-shadow:0 0 18px rgba(252,238,9,.34)}.btn-jitter:hover{animation:jitter .3s ease-in-out infinite alternate}@keyframes jitter{0%{transform:translate(0,0)}50%{transform:translate(1px,-1px)}100%{transform:translate(-1px,1px)}}.paint-splat-hover:hover:before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#FF00E5,#FCEE09,#FF8A00);opacity:.13;z-index:0;pointer-events:none;mix-blend-mode:color-dodge}.mc-card{background:linear-gradient(180deg,rgba(30,43,59,.9),rgba(15,28,44,.84));border:1px solid rgba(137,146,154,.28);box-shadow:0 18px 50px rgba(0,0,0,.26);position:relative;overflow:hidden}.mc-card:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 0 0,rgba(255,0,229,.13),transparent 34%),radial-gradient(circle at 100% 100%,rgba(252,238,9,.1),transparent 30%);pointer-events:none}.mc-card>*{position:relative}.mc-shot{border:1px solid rgba(191,200,208,.18);box-shadow:0 22px 70px rgba(0,0,0,.32);background:#061423}.mc-shot img{width:100%;height:100%;object-fit:cover}.mc-stat{min-height:142px}.mc-compliance-strip{width:min(1180px,calc(100% - 32px));margin:48px auto 24px;padding:16px 18px;border:1px solid rgba(226,224,252,.16);border-radius:22px;background:radial-gradient(circle at 0 0,rgba(93,217,208,.12),transparent 36%),rgba(10,14,31,.72);color:rgba(226,224,252,.78);box-shadow:0 18px 48px rgba(0,0,0,.26);font:500 13px/1.55 Noto Sans,Arial,sans-serif}.mc-compliance-strip strong{color:#FCEE09}.mc-compliance-strip span{display:block;margin-top:4px}.mc-legal h2{font-family:Anybody,sans-serif;font-weight:800;color:#a1d9ff;font-size:1.45rem;margin-top:1.5rem}.mc-legal p,.mc-legal li{color:#bfc8d0;line-height:1.75}.mc-legal section{scroll-margin-top:110px}input,textarea,select{color:#d6e3f9!important;background:#132030!important;border-color:#2A475E!important}a{overflow-wrap:anywhere}.mc-mobile-menu{position:fixed;inset:0;z-index:9999;display:none;background:rgba(6,20,35,.78);backdrop-filter:blur(18px)}.mc-mobile-menu.is-open{display:grid;place-items:center}.mc-mobile-menu__panel{width:min(92vw,420px);max-height:88vh;overflow:auto;padding:28px;border:1px solid rgba(255,0,229,.34);border-radius:32px;background:radial-gradient(circle at 20% 0,rgba(255,0,229,.18),transparent 40%),#0f1c2c;box-shadow:0 30px 90px rgba(0,0,0,.45)}.mc-mobile-menu__panel a,.mc-mobile-menu__close{display:flex;width:100%;align-items:center;justify-content:space-between;min-height:48px;margin:8px 0;padding:12px 16px;border:1px solid rgba(255,255,255,.1);border-radius:999px;color:#d6e3f9;text-decoration:none;font:700 15px/1.2 Noto Sans,Arial,sans-serif;background:rgba(255,255,255,.035)}.mc-mobile-menu__close{justify-content:center;color:#FCEE09;cursor:pointer}@media(max-width:820px){.mc-hero-grid{grid-template-columns:1fr!important}.mc-hero-title{font-size:clamp(38px,13vw,64px)!important}.mc-stat-grid,.mc-bento{grid-template-columns:1fr!important}.mc-shot{min-height:240px}}
</style>
<link rel="stylesheet" href="/app-interactions.css"><script defer src="/app-interactions.js"></script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"${esc(page.title)}","url":"${canonical}","description":"${esc(page.description)}","isPartOf":{"@type":"WebSite","name":"Meccha Chameleon Unofficial Guide","url":"${siteUrl}/"}}</script>
</head>`;
}

function cardList(items) {
  return items.map(([title, href, body], index) => `<a class="mc-card paint-splat-hover rounded-xl p-6 min-h-[184px] transition-transform hover:-translate-y-1" href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}><span class="font-label-caps text-label-caps text-tertiary">0${index + 1}</span><h3 class="mt-3 font-headline-md text-headline-md text-on-surface">${esc(title)}</h3><p class="mt-3 text-on-surface-variant leading-relaxed">${esc(body)}</p></a>`).join('\n');
}

function statCards() {
  return `<section class="mc-stat-grid grid grid-cols-1 gap-gutter md:grid-cols-3">
  <article class="mc-card mc-stat rounded-xl p-6"><span class="font-label-caps text-label-caps text-on-surface-variant">Source mode</span><strong class="mt-2 block font-headline-lg text-headline-lg text-paint-yellow">${sourceMode}</strong><p class="mt-2 text-sm leading-relaxed text-on-surface-variant">Sales milestone confirmed by owner; not a live counter. See Steam for current data.</p></article>
  <article class="mc-card mc-stat rounded-xl p-6"><span class="font-label-caps text-label-caps text-on-surface-variant">Source status</span><strong class="mt-2 block font-headline-lg text-headline-lg text-primary">Last checked</strong><p class="mt-2 text-sm leading-relaxed text-on-surface-variant">${lastChecked}. Store details should still be confirmed on Steam.</p></article>
  <article class="mc-card mc-stat rounded-xl p-6"><span class="font-label-caps text-label-caps text-on-surface-variant">Guide boundary</span><strong class="mt-2 block font-headline-lg text-headline-lg text-paint-pink">Guide only</strong><p class="mt-2 text-sm leading-relaxed text-on-surface-variant">No login, uploads, market, comments, or matchmaking features.</p></article>
</section>`;
}

function compliance() {
  return `<section class="mc-compliance-strip" aria-label="Source and affiliation note"><strong>Unofficial guide.</strong> Not affiliated with Steam, Valve, or the game developers. No downloads are hosted here.<span>Source note: Steam store pages and public player-facing materials; gameplay advice is original and source-labeled.</span><span>Last checked: ${lastChecked}.</span></section>`;
}

function footer() {
  return `<footer class="mt-10 border-t border-brick-slate"><div class="mx-auto flex max-w-container-max flex-col gap-4 px-margin-mobile py-8 text-on-surface-variant md:flex-row md:justify-between md:px-margin-desktop"><p>© 2026 Meccha Chameleon Guide. Unofficial player resource.</p><div class="flex flex-wrap gap-4"><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/contact/">Contact</a><a href="${steamUrl}" target="_blank" rel="noopener noreferrer">Steam Store</a></div></div></footer>`;
}

function extraSection(page) {
  if (page.path === '/faq/') {
    return `<section class="grid grid-cols-1 gap-gutter md:grid-cols-2">
      <article id="unofficial" class="mc-card rounded-xl p-6"><h2 class="font-headline-md text-headline-md text-primary mb-3">Is this official?</h2><p class="text-on-surface-variant">No. This is an unofficial player guide and is not affiliated with Steam, Valve, or the game developers.</p></article>
      <article id="downloads" class="mc-card rounded-xl p-6"><h2 class="font-headline-md text-headline-md text-primary mb-3">Can I get the game here?</h2><p class="text-on-surface-variant">No. This guide hosts no game files and does not link to mirrors. Use the official Steam listing.</p></article>
      <article id="accounts" class="mc-card rounded-xl p-6"><h2 class="font-headline-md text-headline-md text-primary mb-3">Does this site have accounts?</h2><p class="text-on-surface-variant">No account, post board, gallery upload, comments, market, or matchmaking database is provided.</p></article>
      <article class="mc-card rounded-xl p-6"><h2 class="font-headline-md text-headline-md text-primary mb-3">Where do facts come from?</h2><p class="text-on-surface-variant">Store access and game availability should be confirmed on Steam. Gameplay notes here are original and source-labeled; live sales or player counters are intentionally not shown.</p></article>
    </section>`;
  }
  if (page.path === '/privacy/') {
    return `<section class="mc-legal mc-card rounded-xl p-8"><h2>No accounts</h2><p>This guide does not offer login, matchmaking profiles, comment accounts, or uploads.</p><h2>Contact form</h2><p>The contact form opens a mailto link in your email app. This guide does not store the message.</p><h2>External links</h2><p>Steam and other external destinations have their own privacy practices. Confirm details there before sharing account information.</p></section>`;
  }
  if (page.path === '/terms/') {
    return `<section class="mc-legal mc-card rounded-xl p-8"><section id="disclaimer"><h2>Unofficial guide disclaimer</h2><p>This guide is not affiliated with Steam, Valve, or the game developers. Trademarks and game media belong to their respective owners.</p></section><section id="file-policy"><h2>File policy</h2><p>This site does not distribute game files, installers, mirrors, cheats, unauthorized copies, or browser copies. Use the official Steam listing for access.</p></section><section><h2>Information changes</h2><p>Game availability, price, platform details, balance, and server behavior can change. Always confirm current facts on official channels.</p></section></section>`;
  }
  if (page.path === '/contact/') {
    return `<section class="grid grid-cols-1 gap-gutter lg:grid-cols-12"><form class="mc-card rounded-xl p-8 lg:col-span-7" action="mailto:support@meccha-chameleon.co" method="post"><label class="mb-2 block font-bold text-on-surface" for="name">Name</label><input id="name" class="mb-4 w-full rounded-lg" name="name" autocomplete="name"><label class="mb-2 block font-bold text-on-surface" for="email">Email</label><input id="email" class="mb-4 w-full rounded-lg" name="email" type="email" autocomplete="email"><label class="mb-2 block font-bold text-on-surface" for="topic">Topic</label><select id="topic" class="mb-4 w-full rounded-lg" name="topic"><option>Guide correction</option><option>Broken link</option><option>Source note</option><option>Safety boundary</option></select><label class="mb-2 block font-bold text-on-surface" for="message">Message</label><textarea id="message" class="min-h-36 w-full rounded-lg" name="message"></textarea><button class="btn-jitter mt-5 rounded-lg bg-primary px-7 py-3 font-headline-md font-bold text-on-primary neon-glow-primary" type="submit">Send correction</button><p data-form-status class="mt-4 text-on-surface-variant" role="status"></p></form><aside class="mc-card rounded-xl p-8 lg:col-span-5"><h2 class="mb-4 font-headline-md text-headline-md text-tertiary">What to include</h2><ul class="space-y-3 text-on-surface-variant"><li>• Page URL or route.</li><li>• The exact line that needs correction.</li><li>• A public source link if factual.</li><li>• Do not send passwords, tokens, or private Steam account data.</li></ul></aside></section>`;
  }
  if (page.path === '/') {
    return `<section class="mc-bento grid grid-cols-1 gap-gutter md:grid-cols-3" aria-label="Hub access">
      <a class="mc-card paint-splat-hover rounded-xl p-6 min-h-[168px]" href="/where-to-play/"><span class="material-symbols-outlined text-primary">shopping_bag</span><h3 class="mt-10 font-headline-md text-headline-md text-on-surface">Steam Route</h3><p class="text-on-surface-variant">Official store access only.</p></a>
      <a class="mc-card paint-splat-hover rounded-xl p-6 min-h-[168px]" href="/beginner-guide/"><span class="material-symbols-outlined text-paint-yellow">menu_book</span><h3 class="mt-10 font-headline-md text-headline-md text-on-surface">Guide Center</h3><p class="text-on-surface-variant">Beginner, Hider, and Seeker paths.</p></a>
      <a class="mc-card paint-splat-hover rounded-xl p-6 min-h-[168px]" href="/join-friends/"><span class="material-symbols-outlined text-paint-pink">group</span><h3 class="mt-10 font-headline-md text-headline-md text-on-surface">Friend Checklist</h3><p class="text-on-surface-variant">Coordinate in trusted channels.</p></a>
    </section>
    <section class="mc-immersive-panel"><div><p class="mc-kicker">Gameplay reference</p><h2>Hide-and-seek panels, not live counters</h2><p>The design source uses neon cards, compact hub panels, and game screenshots. This implementation keeps that arcade rhythm while replacing community boards, upload showcases, shop-like panels, account entrypoints, and live-stat prototypes with safe guide routes.</p><div class="mc-media-source mt-5">Media source: local Steam/game assets under <code>/media/game/*.webp</code>. This is an unofficial fan guide with no hosted game files.</div></div><div class="mc-shot-grid"><figure><img src="/media/game/yellow-hall.webp" alt="Yellow room gameplay reference"><figcaption>Search lanes</figcaption></figure><figure><img src="/media/game/brick-hide.webp" alt="Brick hide gameplay reference"><figcaption>Blend checks</figcaption></figure><figure><img src="/media/game/farm-round.webp" alt="Farm round gameplay reference"><figcaption>Round flow</figcaption></figure><figure><img src="/media/game/hotel-lobby.webp" alt="Hotel lobby gameplay reference"><figcaption>Friend setup</figcaption></figure></div></section>
    <section class="mc-video-panel"><div><p class="mc-kicker">Latest intel</p><h2>Stable guide updates only</h2><p>Instead of copying patch-note claims or showing unverified counters, pages link to durable player tasks: where to play, how rounds work, friend setup, and troubleshooting.</p></div><div class="mc-video-cards"><article><span>01</span><strong>Official access</strong><p>Open Steam and verify current details there.</p></article><article><span>02</span><strong>Room routine</strong><p>Check region, version, privacy, and host state.</p></article><article><span>03</span><strong>Role discipline</strong><p>Use Hider and Seeker checklists during rounds.</p></article></div></section>`;
  }
  const guideImage = page.path.includes('seeker') ? 'meat-locker.webp' : page.path.includes('hider') ? 'green-room.webp' : page.path.includes('join') ? 'paint-room.webp' : 'laundry-hall.webp';
  return `<section class="mc-bento grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">${cardList(page.cards)}</section><section class="grid grid-cols-1 gap-gutter lg:grid-cols-2"><div class="mc-card rounded-xl p-8"><p class="font-label-caps text-label-caps text-tertiary">Field routine</p><h2 class="mt-3 font-headline-md text-headline-md text-primary">Use the guide in rounds</h2><ol class="mt-5 space-y-3 leading-relaxed text-on-surface-variant"><li>1. Confirm the official Steam context and current game state.</li><li>2. Pick the guide path that matches your current problem.</li><li>3. Apply the checklist in-game, then adjust based on what you actually see.</li></ol></div><figure class="mc-shot min-h-[280px] overflow-hidden rounded-xl"><img src="/media/game/${guideImage}" alt="Meccha Chameleon gameplay reference screenshot" loading="lazy" decoding="async"></figure></section>`;
}

function pageHtml(page) {
  const heroImage = `/media/game/${page.image}`;
  return `${head(page)}<body class="min-h-screen flex flex-col font-body-md overflow-x-hidden">${nav()}<main class="mx-auto flex w-full max-w-container-max flex-grow flex-col gap-12 px-margin-mobile py-8 md:px-margin-desktop md:py-12">
<section class="relative flex min-h-[62vh] w-full items-center justify-center overflow-hidden rounded-xl border border-brick-slate bg-surface-container-low p-6 md:p-8"><div class="absolute inset-0 z-0 opacity-48 mix-blend-luminosity pointer-events-none" style="background-image:url('${heroImage}');background-size:cover;background-position:center"></div><div class="mc-hero-grid relative z-10 grid w-full grid-cols-1 items-center gap-gutter lg:grid-cols-12"><div class="rounded-xl border border-outline-variant/30 bg-stealth-black/70 p-6 backdrop-blur-sm neon-glow-primary md:p-8 lg:col-span-7"><p class="mb-4 font-label-caps text-label-caps uppercase text-tertiary">${esc(page.eyebrow)}</p><h1 class="mc-hero-title mb-5 font-display-hero-mobile text-display-hero-mobile text-on-surface md:font-display-hero md:text-display-hero">${esc(page.title)}</h1><p class="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">${esc(page.description)}</p><div class="mt-6 flex flex-wrap gap-3"><a class="btn-jitter rounded-lg bg-primary px-7 py-3 font-headline-md font-bold text-on-primary neon-glow-primary" href="/beginner-guide/">How to Play</a><a class="rounded-lg border-2 border-primary bg-transparent px-7 py-3 font-headline-md font-bold text-primary transition-all hover:bg-primary/10" href="${steamUrl}" target="_blank" rel="noopener noreferrer">Steam Store</a></div></div><figure class="mc-shot aspect-[4/3] overflow-hidden rounded-xl neon-glow-pink lg:col-span-5"><img src="${heroImage}" alt="Meccha Chameleon gameplay screenshot used as guide visual reference" loading="${page.path === '/' ? 'eager' : 'lazy'}" decoding="async"></figure></div></section>
${statCards(page)}
<section class="grid grid-cols-1 gap-gutter lg:grid-cols-12"><article class="mc-card rounded-xl p-8 lg:col-span-7"><p class="font-label-caps text-label-caps text-tertiary">Guide note</p><h2 class="mt-3 font-headline-md text-headline-md text-primary">${esc(page.eyebrow)} field panel</h2><p class="mt-4 leading-relaxed text-on-surface-variant">${esc(page.intro)}</p></article><aside class="mc-card rounded-xl p-8 lg:col-span-5"><p class="font-label-caps text-label-caps text-paint-yellow">Checklist</p><ul class="mt-4 space-y-3 text-on-surface-variant">${page.bullets.map((item) => `<li>• ${esc(item)}</li>`).join('')}</ul></aside></section>
${extraSection(page)}
</main>${compliance()}${footer()}</body></html>`;
}

for (const page of routes) {
  const targetDir = page.path === '/' ? outDir : join(outDir, page.path);
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, 'index.html'), pageHtml(page));
}

for (const asset of ['favicon.ico', 'apple-touch-icon.png', 'logo.png', 'logo.svg']) {
  const source = join(designDir, asset);
  if (existsSync(source)) copyFileSync(source, join(outDir, asset));
}
for (const asset of ['app-interactions.js', 'app-interactions.css']) {
  copyFileSync(join(root, 'src', asset), join(outDir, asset));
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((page) => `  <url><loc>${siteUrl}${page.path}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
for (const starter of ['next.svg', 'vercel.svg', 'file.svg', 'globe.svg', 'window.svg']) rmSync(join(outDir, starter), { force: true });
console.log(`Copied ${routes.length} stitch-export-v2 inspired guide pages into ${outDir}`);
