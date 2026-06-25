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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meccha-chameleon.co';

function addHowToPlayContent(html, file) {
  if (file === 'beginner-guide-desktop.html' && !html.includes('Learn the Round Flow')) {
    const oldSection = `<!-- Step 4: Have Fun -->
<section class="glass-panel rounded-xl p-8 bg-gradient-to-br from-primary-container/20 to-secondary-container/20 border-primary/30 text-center relative overflow-hidden">
<span class="material-symbols-outlined text-6xl text-primary mb-4" style="font-variation-settings: 'FILL' 1;">group</span>
<h2 class="font-headline-lg text-headline-lg text-on-surface mb-2">Have fun with friends!</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">Grab your squad and dive into the colorful chaos.</p>
</section>`;
    const expandedSection = `<!-- Step 4: Round Flow -->
<section class="glass-panel rounded-xl p-8 glow-primary relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
<div class="absolute top-[-20px] right-[-20px] w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors"></div>
<h2 class="font-headline-md text-headline-md text-primary-fixed-dim mb-4 flex items-center gap-3">
<span class="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">4</span>
                        Learn the Round Flow
                    </h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-4">Meccha Chameleon is round-based: players enter a room, receive a role, use the setup window, then race the timer. Hiders win if at least one player survives until time runs out; Seekers win by finding every Hider before the clock expires.</p>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-4">For faster improvement, think in three skills: painting creates the color match, camouflage chooses the place and pose, and pattern recognition helps Seekers notice what looks slightly wrong.</p>
<ol class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body-sm text-body-sm text-on-surface-variant list-decimal list-inside">
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary/20">Join or create a room.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary/20">Wait for enough players.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary/20">Check whether you are Hider or Seeker.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary/20">Use prep time, then play until the timer ends.</li>
</ol>
</section>
<!-- Step 5: Hider Details -->
<section class="glass-panel rounded-xl p-8 glow-secondary relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
<div class="absolute top-[-20px] right-[-20px] w-32 h-32 bg-secondary/20 rounded-full blur-2xl group-hover:bg-secondary/30 transition-colors"></div>
<h2 class="font-headline-md text-headline-md text-secondary mb-4 flex items-center gap-3">
<span class="bg-secondary text-on-secondary w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">5</span>
                        Hider Checklist
                    </h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-4">Choose the hiding spot before painting. Start with the main color, adjust brightness to match the light, then add only the small details that help your outline disappear.</p>
<ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body-sm text-body-sm text-on-surface-variant">
<li class="bg-surface-container/50 rounded-lg p-3 border border-secondary/20">Use busy backgrounds, corners, shadows, shelves, and object clusters.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-secondary/20">Pick a pose that looks natural in that exact location.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-secondary/20">Check whether your silhouette still looks player-shaped.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-secondary/20">Move only when a safe escape route is obvious.</li>
</ul>
</section>
<!-- Step 6: Seeker Details -->
<section class="glass-panel rounded-xl p-8 glow-tertiary relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
<div class="absolute top-[-20px] right-[-20px] w-32 h-32 bg-tertiary/20 rounded-full blur-2xl group-hover:bg-tertiary/30 transition-colors"></div>
<h2 class="font-headline-md text-headline-md text-tertiary mb-4 flex items-center gap-3">
<span class="bg-tertiary text-on-tertiary w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">6</span>
                        Seeker Search Plan
                    </h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-4">Do not run randomly. Split the map into zones, scan one area at a time, and look for the details that break the scene: wrong brightness, broken patterns, odd outlines, tiny movement, or body parts near edges.</p>
<ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body-sm text-body-sm text-on-surface-variant">
<li class="bg-surface-container/50 rounded-lg p-3 border border-tertiary/20">Search corners, floors, walls, shelves, and dark areas first.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-tertiary/20">Cover different zones when multiple Seekers are playing.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-tertiary/20">Return to suspicious spots instead of wasting the whole timer there.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-tertiary/20">Remember where players were found for the next round.</li>
</ul>
</section>
<!-- Step 7: Have Fun -->
<section class="glass-panel rounded-xl p-8 bg-gradient-to-br from-primary-container/20 to-secondary-container/20 border-primary/30 text-center relative overflow-hidden">
<span class="material-symbols-outlined text-6xl text-primary mb-4" style="font-variation-settings: 'FILL' 1;">group</span>
<h2 class="font-headline-lg text-headline-lg text-on-surface mb-2">Have fun with friends!</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">Private rooms work best for friend groups: create a room, share the room details, use the same region or server setting, and start with Normal mode until everyone understands the hide-and-seek rhythm.</p>
</section>`;
    html = html.replace(oldSection, expandedSection);
  }

  if (file === 'hider-guide-desktop.html' && !html.includes('Before You Paint')) {
    const marker = `<!-- CTA Section -->
<section class="mt-8 mb-4 text-center">`;
    const expanded = `<!-- Practical Hider Routine -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-element-gap md:gap-8">
<div class="bubbly-card rounded-xl p-8 md:col-span-1">
<h3 class="font-headline-md text-headline-md text-secondary-fixed mb-3">Before You Paint</h3>
<p class="text-on-surface-variant">Pick the location first. A perfect color on a bad spot still looks suspicious, especially on plain walls with clean lighting.</p>
</div>
<div class="bubbly-card rounded-xl p-8 md:col-span-1">
<h3 class="font-headline-md text-headline-md text-primary-container mb-3">During Setup</h3>
<p class="text-on-surface-variant">Match the dominant color, then tune brightness and copy only the details that matter. Too many random shapes make your body easier to read.</p>
</div>
<div class="bubbly-card rounded-xl p-8 md:col-span-1">
<h3 class="font-headline-md text-headline-md text-tertiary mb-3">When Seekers Arrive</h3>
<p class="text-on-surface-variant">Stay still unless you already know the escape route. Most losses happen because a Hider moves before the Seeker is fully committed elsewhere.</p>
</div>
</section>
<!-- Painting and Camouflage Deep Dive -->
<section class="grid grid-cols-1 md:grid-cols-12 gap-element-gap md:gap-8">
<div class="bubbly-card rounded-xl p-8 md:col-span-7">
<h3 class="font-headline-md text-headline-md text-primary-container mb-3">Painting Workflow</h3>
<p class="text-on-surface-variant mb-4">Build the disguise in a repeatable order: choose the surface, sample the main color, add darker tones where the background is in shadow, add lighter tones where the light hits, then copy only the real patterns behind you.</p>
<ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-on-surface-variant text-sm">
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary-container/20">Hue alone is not enough; brightness usually gives bad disguises away.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary-container/20">Use matte or shiny settings only when the surface around you matches.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary-container/20">Check head, shoulders, elbows, hands, knees, feet, and sharp color borders.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary-container/20">A simple match in the right place beats a detailed paint job on a bad background.</li>
</ul>
</div>
<div class="bubbly-card rounded-xl p-8 md:col-span-5">
<h3 class="font-headline-md text-headline-md text-tertiary mb-3">Hiding Spot Test</h3>
<p class="text-on-surface-variant mb-4">Before the Seekers release, ask whether your shape belongs there, whether the main path can see your outline, and whether you still have an escape route.</p>
<ul class="space-y-2 text-on-surface-variant text-sm">
<li>• Crouched poses fit shelves, boxes, furniture, and floor-level details.</li>
<li>• Standing poses fit pillars, panels, curtains, and vertical decorations.</li>
<li>• Rotate the camera and judge the spot from a Seeker’s entrance angle.</li>
</ul>
</div>
</section>
${marker}`;
    html = html.replace(marker, expanded);
  }

  if (file === 'seeker-guide-desktop.html' && !html.includes('Search like a team, not a swarm')) {
    const marker = `<!-- Disclaimer -->
<div class="mt-stack-lg bg-surface-container-high rounded-full px-6 py-3 border border-surface-variant">`;
    const expanded = `<!-- Search Discipline -->
<section class="w-full glass-card rounded-3xl p-stack-md mt-stack-md glow-yellow">
<h2 class="font-headline-md text-headline-md text-tertiary text-center mb-stack-sm">Search like a team, not a swarm</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter text-left">
<div class="bg-surface-container/50 rounded-3xl p-6 border border-tertiary/20">
<h3 class="font-label-lg text-label-lg text-on-surface mb-2">Divide the map</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Start with corners, walls, floors, shelves, object clusters, and shadowed zones. Move section by section instead of chasing every hunch.</p>
</div>
<div class="bg-surface-container/50 rounded-3xl p-6 border border-secondary/20">
<h3 class="font-label-lg text-label-lg text-on-surface mb-2">Read the scene</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Wrong brightness, broken patterns, odd silhouettes, and tiny movement are stronger clues than color alone.</p>
</div>
<div class="bg-surface-container/50 rounded-3xl p-6 border border-primary/20">
<h3 class="font-label-lg text-label-lg text-on-surface mb-2">Use the timer</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Do not spend the whole round on one maybe. Mark it mentally, clear another zone, then return if time allows.</p>
</div>
</div>
</section>
<!-- Movement and Detection Methods -->
<section class="w-full glass-card rounded-3xl p-stack-md mt-stack-md glow-teal">
<h2 class="font-headline-md text-headline-md text-secondary text-center mb-stack-sm">Movement and detection routine</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter text-left">
<div class="bg-surface-container/50 rounded-3xl p-6 border border-secondary/20">
<h3 class="font-label-lg text-label-lg text-on-surface mb-2">Move with a route</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-3">Use an S-curve, grid, or zone-by-zone path so you do not miss corners or repeat the same hallway. Check high ledges and low furniture because many Hiders rely on your camera staying at one height.</p>
<ul class="font-body-sm text-body-sm text-on-surface-variant space-y-2">
<li>• Scan from the room entrance first.</li>
<li>• Clear walls and corners before clutter.</li>
<li>• Look up, then look down, before leaving the zone.</li>
</ul>
</div>
<div class="bg-surface-container/50 rounded-3xl p-6 border border-primary/20">
<h3 class="font-label-lg text-label-lg text-on-surface mb-2">Detect in layers</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-3">Make a quick first pass for obvious movement, unfinished paint, and strange poses. Use the second pass for smaller clues like broken patterns, bad light direction, and outlines near edges.</p>
<ul class="font-body-sm text-body-sm text-on-surface-variant space-y-2">
<li>• Give each zone a time limit.</li>
<li>• Call out checked areas if multiple Seekers are playing.</li>
<li>• Use end-of-round reveals to remember common hiding spots.</li>
</ul>
</div>
</div>
</section>
${marker}`;
    html = html.replace(marker, expanded);
  }

  if (file === 'beginner-guide-desktop.html' && !html.includes('painting creates the color match')) {
    html = html.replace(
      '<p class="font-body-md text-body-md text-on-surface-variant mb-4">Meccha Chameleon is round-based: players enter a room, receive a role, use the setup window, then race the timer. Hiders win if at least one player survives until time runs out; Seekers win by finding every Hider before the clock expires.</p>',
      '<p class="font-body-md text-body-md text-on-surface-variant mb-4">Meccha Chameleon is round-based: players enter a room, receive a role, use the setup window, then race the timer. Hiders win if at least one player survives until time runs out; Seekers win by finding every Hider before the clock expires.</p>\n<p class="font-body-sm text-body-sm text-on-surface-variant mb-4">For faster improvement, think in three skills: painting creates the color match, camouflage chooses the place and pose, and pattern recognition helps Seekers notice what looks slightly wrong.</p>',
    );
  }

  if (file === 'hider-guide-desktop.html' && !html.includes('Painting Workflow')) {
    const marker = `<!-- CTA Section -->\n<section class="mt-8 mb-4 text-center">`;
    html = html.replace(marker, `<!-- Painting and Camouflage Deep Dive -->
<section class="grid grid-cols-1 md:grid-cols-12 gap-element-gap md:gap-8">
<div class="bubbly-card rounded-xl p-8 md:col-span-7">
<h3 class="font-headline-md text-headline-md text-primary-container mb-3">Painting Workflow</h3>
<p class="text-on-surface-variant mb-4">Build the disguise in a repeatable order: choose the surface, sample the main color, add darker tones where the background is in shadow, add lighter tones where the light hits, then copy only the real patterns behind you.</p>
<ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-on-surface-variant text-sm">
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary-container/20">Hue alone is not enough; brightness usually gives bad disguises away.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary-container/20">Use matte or shiny settings only when the surface around you matches.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary-container/20">Check head, shoulders, elbows, hands, knees, feet, and sharp color borders.</li>
<li class="bg-surface-container/50 rounded-lg p-3 border border-primary-container/20">A simple match in the right place beats a detailed paint job on a bad background.</li>
</ul>
</div>
<div class="bubbly-card rounded-xl p-8 md:col-span-5">
<h3 class="font-headline-md text-headline-md text-tertiary mb-3">Hiding Spot Test</h3>
<p class="text-on-surface-variant mb-4">Before the Seekers release, ask whether your shape belongs there, whether the main path can see your outline, and whether you still have an escape route.</p>
<ul class="space-y-2 text-on-surface-variant text-sm">
<li>• Crouched poses fit shelves, boxes, furniture, and floor-level details.</li>
<li>• Standing poses fit pillars, panels, curtains, and vertical decorations.</li>
<li>• Rotate the camera and judge the spot from a Seeker’s entrance angle.</li>
</ul>
</div>
</section>
${marker}`);
  }

  if (file === 'seeker-guide-desktop.html' && !html.includes('Movement and detection routine')) {
    const marker = `<!-- Disclaimer -->\n<div class="mt-stack-lg bg-surface-container-high rounded-full px-6 py-3 border border-surface-variant">`;
    html = html.replace(marker, `<!-- Movement and Detection Methods -->
<section class="w-full glass-card rounded-3xl p-stack-md mt-stack-md glow-teal">
<h2 class="font-headline-md text-headline-md text-secondary text-center mb-stack-sm">Movement and detection routine</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter text-left">
<div class="bg-surface-container/50 rounded-3xl p-6 border border-secondary/20">
<h3 class="font-label-lg text-label-lg text-on-surface mb-2">Move with a route</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-3">Use an S-curve, grid, or zone-by-zone path so you do not miss corners or repeat the same hallway. Check high ledges and low furniture because many Hiders rely on your camera staying at one height.</p>
<ul class="font-body-sm text-body-sm text-on-surface-variant space-y-2">
<li>• Scan from the room entrance first.</li>
<li>• Clear walls and corners before clutter.</li>
<li>• Look up, then look down, before leaving the zone.</li>
</ul>
</div>
<div class="bg-surface-container/50 rounded-3xl p-6 border border-primary/20">
<h3 class="font-label-lg text-label-lg text-on-surface mb-2">Detect in layers</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-3">Make a quick first pass for obvious movement, unfinished paint, and strange poses. Use the second pass for smaller clues like broken patterns, bad light direction, and outlines near edges.</p>
<ul class="font-body-sm text-body-sm text-on-surface-variant space-y-2">
<li>• Give each zone a time limit.</li>
<li>• Call out checked areas if multiple Seekers are playing.</li>
<li>• Use end-of-round reveals to remember common hiding spots.</li>
</ul>
</div>
</div>
</section>
${marker}`);
  }

  return html;
}

function patchHtml(html, file) {
  const interactionAssets = '<link rel="stylesheet" href="/app-interactions.css"/><script defer src="/app-interactions.js"></script>';
  return addHowToPlayContent(html, file)
    .replace(/<button\b[^>]*>\s*(?:LOGIN|Login|Sign In|SIGN IN|Log In)\s*<\/button>/g, '')
    .replace(/©\s*2024/g, '© 2026')
    .replace(/©2024/g, '© 2026')
    .replace(/Last Updated:\s*October 2024/g, 'Last Updated: June 25, 2026')
    .replace(/Last updated:\s*October 24, 2024/g, 'Last updated: June 25, 2026')
    .replace(/<meta charset="utf-8"\/>/, '<meta charset="utf-8"/><meta name="generator" content="Next.js static export + Cloudflare Workers Assets"/>')
    .replace(/<\/head>/, `${interactionAssets}</head>`)
    .replace(/<\/body>/, '<footer style="position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden">Unofficial guide. Not affiliated with Steam or developers.</footer></body>');
}

for (const [route, file] of routes) {
  const html = patchHtml(readFileSync(join(designDir, file), 'utf8'), file);
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
