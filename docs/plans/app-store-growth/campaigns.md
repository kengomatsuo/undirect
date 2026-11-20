# App Store campaigns (card ASG56, read 2026-11-20)

## How App Store Connect campaigns work (read in ASC and Apple's help, 2026-11-20)

- Apps > app > Analytics > Acquisition > Campaigns > (+) opens "Generate a Campaign Link". It builds the link in the page and saves nothing: typing a name and pressing Done sent no request to Apple (Chrome network log), and the dialog says to copy the link because it is not kept. Typing `macpip` gives `https://apps.apple.com/app/apple-store/id<ID>?pt=127609326&ct=macpip&mt=8`, byte for byte the link MacPip already carries.
- The Campaigns list is a traffic report: the page asks `analytics/api/v1/data/sources/list` for `dimension: campaignId`, and a token appears only after 24 hours and once at least 5 different Apple Accounts installed through it (dialog text; Apple's help adds a threshold of 5 per metric). Both apps answer "There isn't enough data to display campaigns" for Aug 21 to Nov 18; the API returns `meetsThreshold: false`.
- So there is nothing to create per token. A token counts when (a) the link a person taps carries `pt=127609326` and its own `ct`, and (b) it reaches 5 installs. Screenshots: `~/Downloads/asc-campaigns/`.
- Apple's own generator writes `mt=8` for these universal apps. Our Mac links use `mt=12` (plus `platform=mac` on Cutling's site so the web page opens on the Mac listing); Apple's pages say nothing on `mt=12`.

## Our sites pass the visitor's source on

`web/_generator/store-source.js` (same file in both repos; undirect f762cc0, Cutling 313a3874) rewrites every App Store button's `ct` to the visit's source: `?ct=`, `?ref=`, `?utm_source=`, `?source=`, else the referring site's name (t.co and x.com give `x`, `l.instagram.com` gives `instagram`, `macappindex.com` gives `macappindex`). Search engines and our own pages keep the page token (`web-home`, `web-compare`, `web-mac`, ...). It is kept for the browser session, so a visitor who reads two pages first still counts. So a directory or post that links our website counts under its own name, with the same token as its direct App Store button.

Tested in Chrome on local builds: `/compare/?utm_source=macappindex.com` gives `ct=macappindex`, carried to `/stop-safari-redirects/`; Cutling `/mac/?ref=macpip` gives `ct=macpip` with `mt=12&platform=mac` kept. 15 unit cases pass (params, t.co, Google kept as page token, co.uk).

Live: waiting on the site-ai-files-2 deploys (they carry these commits); read back with curl when live.

## Every place a link appears

| Place | App | Link now (2026-11-20) | pt + own ct, to apps.apple.com? | Fix |
|---|---|---|---|---|
| undirect.matsuokengo.com, every page's button | Undirect | `ct=web-<page>`, `mt=8` (curl) | Yes | Plus source pass-on (above) |
| undirect.matsuokengo.com Smart App Banner | Undirect | `affiliate-data=pt=127609326&ct=web-banner` | Yes | none |
| undirect llms.txt | Undirect | `ct=llms` | Yes | none |
| cutling.matsuokengo.com buttons | Cutling | `ct=web-home`, `web-download`, `web-download-mac`, `web-mac`, `web-compare`, `web-schema` (curl) | Yes | Plus source pass-on |
| cutling llms.txt | Cutling | `ct=llms` (iOS and Mac) | Yes | none |
| matsuokengo.com (portfolio) | both | was plain `apps.apple.com/app/id...` and storefront links | No | **Fixed**: `ct=matsuokengo` (kengomatsuo 626699d) |
| GitHub README, Cutling | Cutling | was plain `apps.apple.com/app/cutling/id...` | No | **Fixed**: `ct=github-readme` |
| GitHub README, Undirect | Undirect | had no App Store link | n/a | **Added**: `ct=github-readme` (b1da4e0) |
| MacPip | both | Buy button `pt` + `ct=macpip&mt=12`; App link is our website `?ref=macpip` | Yes | Site passes `macpip` on |
| iPip | both | plain `apps.apple.com/app/id...`; website link plain | No | iPip's "New App Store link" keeps only the app id ("That is the link your listing already has"); no campaign field. Website link sends the referrer: site counts it as `ipip` |
| MacNative | both | `pt` + `ct=macnative&mt=12` (plus pt-only copies); website `?utm_source=macnative.io` | Yes | none |
| MacNative Black Friday deal | Cutling | `ct=macnative-bf` | Yes | none |
| MacBase | both | `pt` + `ct=macbase&mt=12`; website `?ref=macbase.app` | Yes | none |
| MacBase Black Friday deals | both | `ct=macbase-bf` | Yes | none |
| Mac App Index | both | plain `apps.apple.com/us/app/...`; website `?utm_source=macappindex.com` | No | No self-edit; change asked by email (ASG19b). Website path already counts as `macappindex` |
| NativeShelf | both | plain `apps.apple.com/us/app/...`; website `?utm_source=NativeShelf.com` | No | Sign-in is an emailed code (owner). Website path counts as `nativeshelf` |
| Get Indie Apps | both | plain `apps.apple.com/us/app/...`; website plain | No | Asked by email (ASG19b); website path counts by referrer as `getindieapps` |
| Indie App Catalog | both | `apps.apple.com/us/app/id...?ct=https://indieappcatalog.com`, no `pt` | No (no pt) | Developer account is the owner's (password); custom link needs him |
| Product Hunt | Undirect (Cutling Nov 24) | website `?ref=producthunt` | via site | Site passes `producthunt` on |
| AlternativeTo | both | website, referrer sent (`nofollow noopener`) | via site | Site counts `alternativeto` |
| PostYourStartup, LaunchIgniter | both | website only | via site | Site counts by referrer |
| MacUpdate, TinyLaunch, DodoLaunch, focusapps sites, NextGen Tools | both | not live yet | n/a | When submitted: App Store field gets `ct=<site>`, website field gets `?ref=<site>` |
| YouTube descriptions (undirect-promo, cutling-promo) | both | `ct=yt-short-id`, `yt-short2-en`, `yt-short3-en/id`, `yt-explainer-en/id`, `yt-explainer3-en/id`, `yt-cut-short-en/id/ja`, `yt-cut-explainer-en/id/ja` | Yes | none; site links in them count as `youtube` |
| TikTok captions | both | `ct=tt-short-en/id`, `tt-cut-short-en/id/ja` | Yes | none |
| Instagram captions | both | `ct=ig-short-en/id`, `ig-cut-short-en/id/ja` | Yes | none |
| Threads captions | both | `ct=th-short-en/id`, `th-cut-short-en/id/ja` | Yes | none |
| X posts and replies (social-posts.md) | both | link our websites or directory pages | via site | t.co referrer counts as `x`. Draft 10 (Black Friday) had a plain App Store link: replaced in the hand-off with `ct=x-bf` |
| Black Friday IG/TikTok (draft 11) | both | `ct=ig-bf`, `ct=tt-bf` | Yes | none |

## Links for asg-social-2

Appended to `~/.claude/session-states/asg-social-2.md` under "From asc-campaigns".
