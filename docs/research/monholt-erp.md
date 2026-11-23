# Is there an open-source "ERP for devs" for Monholt's ops? (ASG173, 2026-11-23)

Scope: check, post and reply on the six Monholt accounts (X, Instagram, Facebook Page, Threads, TikTok, YouTube), site traffic, and whether stya's ops console should join one Monholt system. Free and self-hosted only.

## What Monholt has today (read from disk)

- `claude-house-rules/scripts/social.ts`: reads all six accounts through official APIs (followers, posts with views, likes, replies, new replies). `scripts/youtube.ts`: upload, schedule, stats.
- Sites: monholt.com and connect.monholt.com are Cloudflare Workers (repo `~/Repositories/monholt`), and Cloudflare Web Analytics already measured them, along with stya.app, solute.id, tolk.id and zhixingmandarin.id. The GitHub Pages sites (undirect., cutling. and matsuokengo.com) were not measured until ASG174 added the beacon on 2026-11-23. `claude-house-rules/scripts/traffic.ts` reads every host.
- stya's ops: `pos/infra/selfhost/ops` (Bun job service, ~14.5k lines of non-test TS) plus `ops-console` (React build) at ops.stya.app on stya's 4 GB 2-core server, behind Cloudflare Tunnel and Access. Jobs, incidents, alerts, backups, migrations, responders, telemetry, status page. Decision record: `pos/docs/maintenance/ops-console-is-our-own-page.md` (built our own after rejecting Grafana, Netdata, Komodo, Coolify).

## Social schedulers

| Tool | Licence | Monholt's six | Inbox (read replies) | Hosting | Source |
|---|---|---|---|---|---|
| Postiz | AGPL-3.0, 42k stars, active today | All six have providers; post + analytics on all; first-comment on X, FB, IG, Threads | No. A user's fork adds a Comments/Messages inbox, offered upstream, still open (#1944) | Containers: app, Postgres, Redis, Temporal, Elasticsearch | `gh api repos/gitroomhq/postiz-app`, tree `libraries/nestjs-libraries/src/integrations/social/*.provider.ts`, compose file |
| Mixpost Lite | MIT, 4k stars, last push 2026-03 | Facebook Page, X, Mastodon only; IG, Threads, TikTok, YouTube are in paid Pro | No | Laravel + MySQL + Redis | `src/SocialProviders/` tree; README "Lite version of Mixpost Pro, a commercial product" |
| Odoo Social Marketing | Enterprise (paid) | FB, IG, X, LinkedIn, YouTube (limited); no TikTok | Yes (streams) | n/a | Odoo forum staff: cannot be used on Community |

Postiz tracker, real users:
- #1570 (open): 32 Temporal workers start whatever is configured; idle ~27% CPU and 672 MiB in postiz, ~31% CPU in temporal, ~330 MiB in Elasticsearch.
- #2026, #1748 (open): backend hangs on cold boot when Temporal is late; posts stuck in QUEUE with a healthy-looking process.
- #2297 (open): TikTok rejects self-hosted apps for own-account use ("not eligible for approval"), so TikTok posting stays sandbox-only, the same wall Monholt already has.
- #2383 (open): new TikTok apps cannot get `video.list`; Postiz refuses the connection until the scope is removed by hand.
- X through Postiz still uses the owner's own X API keys (`X_API_KEY`), so X's pay-per-use cost stays.

## "ERP for devs" / workflow platforms

- ERPNext (GPL-3.0): accounting, stock, HR; no social module.
- Twenty CRM (AGPL core): contacts and deals; no social posting.
- n8n: Sustainable Use License, free for "your own internal business purposes". Has X, Facebook Graph and YouTube nodes; no Instagram, Threads or TikTok node (HTTP node by hand). A scheduler for scripts, not a social tool.
- Windmill (AGPL core), Activepieces (MIT core), Appsmith (Apache-2.0), ToolJet (AGPL): generic script runners and internal-tool builders; each would host our own scripts, not replace them.

No open-source system does Monholt's job end to end. The nearest is Postiz, without an inbox.

## Site traffic

- Cloudflare Web Analytics (adopted, ASG174): free, a JS snippet before `</body>`, works on sites not proxied by Cloudflare (manual snippet), up to 10 non-proxied sites. Queryable through the GraphQL API (`rumPageloadEventsAdaptiveGroups`), so a script beside `social.ts` can read it. No server. (developers.cloudflare.com/web-analytics/get-started, /web-analytics/limits)
- Umami: MIT, 40k stars, Node + Postgres; light, but needs a host.
- Plausible CE: AGPL-3.0, needs ClickHouse; heavier.

## Free hosting for a self-hosted tool

- stya-prod is for stya and POS only (house rule), and is 4 GB.
- Oracle Cloud Always Free A1: current docs say 2 OCPU and 12 GB total; idle instances (95th-percentile CPU, network and memory under 20% over 7 days) may be reclaimed. Sign-up terms not verified. (docs.oracle.com, Always Free Resources)

## Recommendation

Keep building our own, and borrow from Postiz's provider code (read, not vendored: AGPL). Postiz would need a new server, brings Temporal and Elasticsearch to run six accounts, lacks the inbox that is half the job, and hits the same TikTok and X walls. Add site traffic with Cloudflare Web Analytics' snippet in each site generator, read by a script beside `social.ts`.

## Merge stya's ops into it?

No. stya's console controls a production server (restarts, migrations, backups, kill switch) behind Cloudflare Access, sized for a 4 GB box, and the house rule keeps stya-prod for stya and POS. Gain from merging: one login and one page. Risk: social tokens and a marketing tool's outages and dependencies sit beside production controls. monholt.com already exists as a public Worker; an owner's Monholt console, if wanted, reuses the stya console's UI parts (React/Tailwind components) on its own host, not the stya service.
