# Frontend Handoff — Meccha Chameleon

## Source of truth
- Design package: `../design/stitch-r4-v2/`
- Handoff: `../design/stitch-r4-v2/FRONTEND_HANDOFF.md`
- Final delivery: `../design/stitch-r4-v2/FINAL_DELIVERY.md`

## Implementation shape
- Next.js 16 App Router project initialized in this repository.
- Cloudflare Workers Assets deployment via `wrangler.toml` and `src/worker.ts`.
- `npm run build` runs `next build` then copies the Stitch V2 static HTML pages into `out/` route directories for 1:1 visual parity with the delivered design files.

## Routes
- `/`
- `/where-to-play/`
- `/beginner-guide/`
- `/join-friends/`
- `/server-not-showing/`
- `/hider-guide/`
- `/seeker-guide/`
- `/faq/`
- `/privacy/`
- `/terms/`
- `/contact/`

## Commands
```bash
npm run lint
npm run build
npx wrangler deploy --dry-run
npx wrangler deploy
```
