# Content and data operations

## Official update review

`npm run content:check` compares the latest official Steam Community announcement with the reviewed snapshot in `scripts/check-content-freshness.mjs`. The scheduled GitHub Action fails when a new announcement appears so an editor can review affected guides, map files, troubleshooting entries, and the public update log.

For every affected entry:

1. Read the exact official announcement, not only the general news feed.
2. Update the game version, verification date, review status, and source URL.
3. Keep current-build map screenshots and exact callouts marked as `needs review` until a reviewer reproduces them in-game.
4. Add a concise entry to `/updates/` and update the expected Steam news GID.

## Feedback queue

Feedback is stored in the `feedback_submissions` D1 table. It contains the submitted category, page, context, message, status, reference ID, and timestamp. It does not contain an account, cookie ID, or an intentionally stored IP address.

Use Wrangler or the Cloudflare D1 console to review it:

```powershell
npx wrangler d1 execute meccha-chameleon-data --remote --command="SELECT id, category, context, page, message, status, created_at FROM feedback_submissions WHERE status = 'new' ORDER BY created_at ASC LIMIT 100;"
```

Update an item after review:

```powershell
npx wrangler d1 execute meccha-chameleon-data --remote --command="UPDATE feedback_submissions SET status = 'resolved' WHERE id = 'REFERENCE_ID';"
```

## Analytics summary

Run `npm run data:summary` for 30-day event totals and feedback queue counts. Search terms are capped at 80 characters and only sent when Do Not Track is not enabled. The daily Worker cleanup removes analytics older than 90 days and feedback older than 365 days.

## Optional delivery upgrades

Cloudflare Email Sending is not currently enabled for `meccha-chameleon.co`. Once the domain is onboarded, add an email binding and send a notification after a successful D1 insert. Turnstile can be added if spam volume justifies it; the current form already uses same-origin validation, a honeypot field, a minimum completion time, and strict server-side limits.
