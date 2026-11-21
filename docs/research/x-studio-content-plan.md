# A content plan for @monholtco beyond app promos

Research for the owner's ask of 2026-11-21: "How do software developers or small startup companies
in technology do? Usually they make like an introductory or something. Also, maybe we want to ask
about what people's expectations on POS systems and other things as tweets."

Written as findings land. X posts were read through public mirrors (api.fxtwitter.com JSON, search
results), never signed in. Anything without a source is marked GUESS.

## 1. What Monholt makes, read from disk (2026-11-21)

Source: monholt.com's live copy in `~/Repositories/monholt/site/public/index.html`.

| Product | What the site says | Stage on the site | Repo |
|---|---|---|---|
| stya | "Times rented tables and rooms, with their food on the same bill." | Live, iOS, Android and Chrome, stya.app | `~/Repositories/pos/stya` (Expo app; plan 0156) |
| Tolk | "Send guests their receipts and booking reminders on WhatsApp." | Coming, for venues on stya, tolk.id | `~/Repositories/pos/docs/plans/0165-whatsapp-add-on/README.md`: no card can send a real message until a Meta developer account exists |
| Cutling | "Paste the text you reuse, from the keyboard or the menu bar." | Live, iPhone, iPad and Mac, $4.99 | `~/Repositories/Cutling` |
| Undirect | "A Safari extension that stops redirects and pop-up tabs." | Live, iPhone, iPad and Mac | `~/Repositories/undirect` |
| Client work | "Phone and web apps, designed and built for other companies." | Open, hello@monholt.com | many client repos (not named in public copy) |

The `pos` repo is Solute, a "B2B white-label restaurant and café POS, multi-tenant" (`pos/CLAUDE.md`);
stya is its own app inside `pos/stya`, and its maker line is "stya by Monholt" (`.claude/rules/stya-product.md`).
Solute is not on monholt.com, so public posts talk about stya, not Solute.

### stya, from its built site (`~/Repositories/pos/stya/site/dist/index.html`, read 2026-11-21)

stya.app's live HTML is a client-rendered shell (a fetch returned only "stya"), so the copy was read
from the built site on disk. Title: "stya: till for restaurants, cafés and activities". Headline:
"stya for cafés, restaurants and games rooms". Price: "From Rp60.000 a month", "No card needed to
sign up", and "From Rp5.000 for a day you open. A day you don't, nothing." Venue kinds offered: food
and drink (cafés, restaurants, bars, bakeries, stalls), table rental (billiards, mahjong, karaoke,
PlayStation), or both. Sections: offline orders ("Signal gone? Sales not."), a live table floor with
timers, kitchen tickets, promos and packages, low-stock warnings on the phone, scan-to-order at the
table, staff shifts and payroll, and one book for every outlet. Payment mix shown: cash, QRIS, card.
The owner's correction (2026-11-21): stya is not specialised for one country; it is a till for small
venues anywhere, and Solute's own rule says every country and language is a peer (`pos/CLAUDE.md`,
`docs/localisation.md`). So stya's questions and polls are written in English by default, and other
languages are added the way `posting-times-countries.md` adds them for every product, never as a
one-country track. Posts quote no rupiah price; they say "a monthly plan, or pay only for the days you
open" where the price model is needed.

### Cutling and Undirect, from the App Store lookup API (itunes.apple.com/lookup, 2026-11-21)

| App | Price | Live version | First release | Languages listed |
|---|---|---|---|---|
| Cutling - Clipboard Keyboard (id6759476314) | $4.99 | 1.6.2, Nov 19 2026 | Feb 24 2026 | 51 |
| Undirect - Popup Blocker (id6810513194) | $1.99 | 1.0.4, Nov 10 2026 | Sep 21 2026 | 44 |

Cutling's store text still says "bank details" and "bank info"; the brief bars that phrase from posts
(`cutling-niche-language.md`: nobody in the niche says it). Cutling's README calls it a "clipboard
manager", but iOS gives no app background clipboard reading, so no post may say it keeps clipboard
history on iPhone.

### Real recent milestones for build-in-public posts (git logs, 2026-11-21)

- Undirect: 413 commits since Sep 8 2026. 1.0.5 is in review on iPhone and Mac with a Major Update
  In-App Event, "The Stay-Put Update", Nov 27 to Dec 27 (commit of 2026-11-20). The next version is
  1.1.0: an animated note on the page naming what was stopped, in all 50 languages, on by default with
  "Don't show again"; Undirect runs on iOS 18 from it; release binaries now build on Xcode Cloud.
- Undirect sales (`docs/research/posting-times-countries.md`): 450 units for both apps Aug 20 to Nov 19,
  most on the Oct 10 day Undirect was free (Saudi Arabia 132, US about 130). Paid Undirect units
  Sep 1 to Nov 19: 14, US 4 first. Cutling paid in that window: US 3. Owner's call whether numbers
  this small go public (GUESS: build-in-public accounts do post small numbers; see section 2).
- Cutling: 425 commits since Feb 18 2026. Next version is 2.0.0 (build 21): fill-in blanks and dates
  inserted from the editor as pills, a redesigned keyboard flow, a new setup guide with a recording
  of the real Settings steps, and room for 5,000 text cutlings and 500 images, up from 1,000 and 50
  (measured peak 58.6 MB in the simulator against iOS's 77 MB keyboard limit). New strings written
  in 76 languages.
- stya (pos repo, 14,560 commits overall): one Expo app for iOS, Android and Chrome replacing four
  web apps with four logins (plan 0156, approved 2026-10-26); the latest pos tag is v0.2.207 (Nov 21).
- Tolk: plan 0165 opened 2026-11-04; the outlet's own WhatsApp number at no fee, or a shared number
  billed at Meta's rate plus a markup shown on its own bill line. Not sending yet.

## 2. How small studios, makers and young startups run X (read 2026-11-21)

Method: each account's latest 60-120 posts pulled from `api.fxtwitter.com/2/profile/<handle>/statuses`
(public JSON, no sign-in), follower counts from `api.fxtwitter.com/<handle>`. Likes (L) and replies
(R) as of 2026-11-21. Pinned posts are not exposed by any public mirror that still works (xcancel is
suspended, X's syndication endpoint answered "Rate limit exceeded"), so intros were found as the
accounts' first posts or through search.

### Accounts read

| Account | Followers | What it is |
|---|---|---|
| @openstatusHQ | 1,468 | open-source status page startup, account opened Sep 2023 |
| @mxkaske | 3,373 | openstatus co-founder |
| @lickability | 3,916 | app studio (client work), bio "People who make apps people love." |
| @PlausibleHQ | 18,339 | bootstrapped analytics company, 10 people |
| @Superwall | 11,362 | paywall SDK startup |
| @mattiapomelli | 16,374 | co-founder of Sleek (sleek.design), launched Nov 12 2025 |
| @jordibruin | 25,287 | indie Apple developer (Good Snooze: MacWhisper, Wider, Frames) |
| @SebastianRoehl | 25,842 | indie app business (HabitKit, FocusKit), account opened Mar 2021 |
| @heyandras | 26,333 | Coolify founder, open source turned business |
| @shri_chaudhari / @MBabhulkar | 257 / 20 | a couple building apps as Zweikarta, from zero in Oct 2026 |
| @Iconfactory, @RogueAmoeba | 13,278 / 7,577 | studios that left X: last original posts 2026-07 and 2024-12 |

### Intro posts

- **The maker's own first post, one paragraph: who, what, why now, what they'll share.**
  @MBabhulkar, Oct 22 2026 (https://x.com/MBabhulkar/status/2113316740176470308): "Hi 👋 I'm a
  designer and mom of two girls. My husband codes @shri_chaudhari I design, and we build apps at night
  as Zweikarta. We quit once when motivation faded. This is our second try. I'll share what I design
  and learn, day by day 🌱". Shape: person, roles, the studio name, an honest stake, a promise of
  what follows. Her partner's intro-plus-ask (https://x.com/shri_chaudhari/status/2120621712291106930):
  "I'm a dad building GeldSpace ... Who are you and what are you building? Drop it below".
- **A studio's opening announcement leads with the goal and the number.** @PrajwalTomar_ (56,920),
  Apr 5 2026 (https://x.com/PrajwalTomar_/status/2040722870444421389, 390 likes, 69k views): "I'm
  launching my app studio this month (IgnytStudio). The goal is simple: ship 2 mobile apps per month
  ... and scale them to actual revenue", then the honest problem ("getting users? That's the part I've
  been stuck on").
- **A demo first, then "reply if you want to try it".** Sleek's first public post was the founder's,
  Oct 31 2025 (https://x.com/mattiapomelli/status/1984193081940537529): "Been working on design
  generation for mobile apps. Describe your idea -> watch your app design come to life. Reply below if
  you want to try it out." Five days of one-shot demo clips followed before launch.
- **A brand account's first posts carry little.** @openstatusHQ opened with "Ping" and "How do you like
  my makeover?" (Sep 22 2023, https://x.com/openstatushq/status/1705294712096051466): 4-10 likes. The
  founder's account carried the story.
- Guides on pinned posts (xposterai.com/blog/what-should-i-pin-on-x-pinned-tweet-templates,
  xautopilot.app/blog/twitter-intro-template; vendor blogs, read through search snippets only): one
  post beats a thread unless there is a real story; structure audience, outcome, proof, offer, one
  call to action. GUESS-grade: no data behind them.

### Building in public

- **Honest numbers, including bad ones, from the founder.** @mxkaske after a Product Hunt day,
  Oct 26 2026 (https://x.com/mxkaske/status/2114745533487018145): "came up #4 of the day ... honest
  take: zero new paying customers so far. same as our previous launches. ph is great for backlinks and
  a fun 24h, not for revenue."
- **Company milestones as plain numbers with what they mean.** @PlausibleHQ: "we've now reached
  22,000 paying subscribers! Still no sales team" (Oct 26, https://x.com/PlausibleHQ/status/2114675504024572167);
  "Goals report loading time has gone from 9 seconds to 0.5 seconds for one of our heaviest sites"
  (Nov 5, https://x.com/PlausibleHQ/status/2118296017892471074); "3.2 Billion ... roughly one in four
  incoming hits" filtered as bots (Nov 17, https://x.com/PlausibleHQ/status/2122622489062965364).
- **Work in progress shown before it ships, with the doubt left in.** @mxkaske: "possible new
  sidebar ... (wip)" (Nov 15, 47 likes, https://x.com/mxkaske/status/2122013257011466347), then the
  shipped version three days later (64 likes, https://x.com/mxkaske/status/2123101678811406369);
  "I'm still struggling with the amount of different colors: a heavy year shouldn't feel like a xmas
  tree" (https://x.com/mxkaske/status/2120265567466905616).
- **A numbered series.** @SebastianRoehl's "Building An Indie App Business #58 / #68 / #75" (monthly,
  e.g. https://x.com/SebastianRoehl/status/1939196697751560705, 68 likes, 7.9k views); Zweikarta's
  "Day 7 ... submitted to the App Store", "Day 24. Apple said yes", "Day 26 Our first App Store review"
  (https://x.com/shri_chaudhari/status/2120229161830682726); @CodeWithChris's "raw monthly updates.
  Spoiler: there's no big money yet" (https://x.com/CodeWithChris/status/1942224997319114758).
- **Decisions with the reason.** @SebastianRoehl: "I readjusted my roadmaps so December stays quiet.
  All updates get prepared and shipped early" (https://x.com/SebastianRoehl/status/2123903966031601998);
  "New rule ... always have one App Store product page A/B test and one @RevenueCat pricing experiment
  running" (58 likes, 17 replies, https://x.com/SebastianRoehl/status/2123378380213243972).
  @PlausibleHQ: "We ignore highly upvoted feature requests all the time ... product direction beats
  feature count" (https://x.com/PlausibleHQ/status/2105221983286006257).
- **Outages and mistakes told straight.** @heyandras: "There was a 30 minutes downtime on Coolify
  Cloud. Some other server in our physical rack was tripped the fuse" (130 likes,
  https://x.com/heyandras/status/2121964314244571448). @daniel_nguyenx: "I sent the early Black Friday
  email campaign with the wrong CTA link. How's your day going?" (https://x.com/daniel_nguyenx/status/2123439923835666467).

### Asking the audience

- **An open question about the product's next step draws the most replies per like of anything read.**
  @heyandras, Nov 13 (https://x.com/heyandras/status/2121153806163423494): "I plan to add mostly QoL
  improvements in the upcoming releases of Coolify. What do you want to have better usability & better
  polished?": 50 likes, 36 replies. @fayazara: "Looking for whimsical and playful and fun websites. Do you
  know any?" 19 likes, 15 replies (https://x.com/fayazara/status/2115691899143274631); "Which app should
  I open source next?" (https://x.com/fayazara/status/2119804046488056140).
- **Ask what the reader uses or measures, not what they think of us.** @mxkaske: "Refining our event
  timelines and looking for inspiration. What's the best one you've used?" (https://x.com/mxkaske/status/2108221882034249741).
  @jordibruin: "Honest question for people who are going through their 5 hour Codex limit, what are you
  doing that makes it go down so quick?" (13 replies, https://x.com/jordibruin/status/2024853109843935573).
- **Polls are rare among these accounts.** In about 1,000 posts read across ten maker accounts, one
  poll: @jakobgreenfeld, Oct 22 2025 (https://x.com/jakobgreenfeld/status/1980982036862321058): "If
  you run cold email campaigns right now, what's your average positive reply rate across all of them?"
  with four ranges (20 votes). It asks about the reader's own number, the discovery shape. So a poll is
  a format to test (one post in five tries a new format, `social-lessons`), not the main tool.
- **The brand account's question gets little; the same question from a person gets replies.**
  @openstatusHQ: "Still here. Still shipping. What's missing for you to use openstatus?" (Apr 17,
  4 likes, 0 replies, https://x.com/openstatushq/status/2045149068758757502).
- **Recruiting testers is a plain ask.** @jordibruin: "Looking for a few testers for an interior design
  with AI app. DM me 👍" (11 replies, https://x.com/jordibruin/status/2049957144770834703).
- What POS owners complain about, from vendor surveys (read through search snippets only, vendor-funded):
  57% frustrated with their current POS (Vitamojo hospitality report); many owners do not use features
  that are hard to set up (RestaurantOwner.com survey of 800+ independents, 2022); data migration is the
  biggest obstacle to switching (Blue Star, 81 retailers); only 20% report no frustration with payments
  (TouchBistro). These set the topics of the stya questions; they are not quoted in posts.

### Behind the scenes, lessons and how-tos

- @lickability (a studio): team retreat report (https://x.com/lickability/status/2099922886517481626),
  a list of iOS 27 apps that impressed them (31 likes, https://x.com/lickability/status/2102804602668114382),
  a bug one of their partners traced and GitHub credited (https://x.com/lickability/status/2123809134453690816),
  client work spotted in the wild ("a pleasure working on iOS, Android, and React Native SDKs with
  Stripe", https://x.com/lickability/status/2092643994882679205), their own free feedback event
  "Software Sommelier". Posting about other people's apps is a regular part of their mix.
- @mxkaske's how-to: "Why record a 30s video in 5 minutes when you can automate it in 5 hours? ...
  @playwrightweb for the screencast, @Remotion for zooms" (https://x.com/mxkaske/status/2114372661476544882).
- @PlausibleHQ explains how a feature works and why: time on page and background tabs
  (https://x.com/PlausibleHQ/status/2119774379366342751); city stats without IPs
  (https://x.com/PlausibleHQ/status/2112145055784046677).
- @Superwall posts tips taken from customers' talks, tagged with the person
  (https://x.com/Superwall/status/2123114787781714416).

### Launches

- **Tease with a date, show it on the real device, launch with an offer.** @jordibruin's Wider:
  "Full Screen Safari on the front screen. Wider, launching October 23rd" (Sep 20, 865 likes,
  https://x.com/jordibruin/status/2101703895407825318); "Tested on device and ready to go"
  (560 likes, https://x.com/jordibruin/status/2104599250755555416); "Fixed Safari on Duo. Wider coming
  on October 23rd for free." (1,651 likes, https://x.com/jordibruin/status/2112519685799649571); launch
  "Free for the first 10.000 downloads!" (1,033 likes, 123 replies,
  https://x.com/jordibruin/status/2115760657526374846); then the result: "Did not expect to reach that
  10.000 in the first 12 hours" (https://x.com/jordibruin/status/2115914986954293460). Five posts, one
  launch, each a new fact.
- **Pain first, then what it does.** @jordibruin: "Got annoyed with long voice memos on WhatsApp so I
  made Mono." then four feature lines (https://x.com/jordibruin/status/2103441148500996513).
- @mxkaske's launch post names who it is for: "Built for small teams that live in Slack" (96 likes,
  32 replies, https://x.com/mxkaske/status/2114270739469582683).

### The mix

Counted from each account's recent originals (by hand from the dumps):

- @mxkaske (founder, 30 originals Aug-Nov): about half work-in-progress and shipped screens, a fifth
  opinions and jokes about the trade, a few launches and results, two questions.
- @PlausibleHQ (company, 20 originals Sep-Nov): about half feature explainers, a quarter milestone
  numbers, the rest beliefs about how they run the company (no sales team, ignoring upvoted requests),
  customer names (Stripe, Mozilla). No questions.
- @lickability (studio, 26 originals Aug-Nov): about a third other people's apps and things they liked,
  a third their events and team, the rest client work and blog posts. No product promo of their own.
- @heyandras (founder, 81 originals in 3 weeks, several a day): releases, live outage notes, opinions,
  questions to users, personal life (cooking, games, rest).
- @jordibruin: launches carry the reach; between launches, few posts, mostly personal finds.

What holds across them:
1. Follower reach sits with people. Founders' posts get 5-20 times the likes of their company's
   account on the same news (openstatus's sidebar: brand 7 likes, founder 64).
2. The studio accounts that grew post about the trade and other people's work, not only their own
   products (Lickability, Superwall); studios that only announce (Rogue Amoeba, Iconfactory) stopped
   posting on X.
3. Every build-in-public post carries one concrete thing: a number, a screen, a date or a mistake.
4. Questions ask about the reader's own work or tools, and are answered by people who have the problem.

## 3. Drafts (written 2026-11-21, nothing posted)

Written through `human-prose` and `social-media`. Every post is at most 280 characters (counted);
`ai-prose-scan.ts --warn-caps` passes with three capped hits, each a real list kept on purpose (the
platforms iPhone, iPad and Mac; the site's own "cafés, restaurants and games rooms"; stya's four old
apps). No post names a country of ours, says "bank details", or claims clipboard history on iPhone,
and no two posts share a sentence or an opening. The account speaks as "we", as the studio accounts in
section 2 do; whether the owner also speaks as himself is his call (see the mix below).

### Pinned intro thread (6 posts, @monholtco)

Shape from section 2: who and what in the first post, one product per post with its pain and its
price, an honest line about what is not ready, and what followers will get.

1. Monholt makes apps that do exactly what they say, and builds phone and web apps for other companies. Four of our own are below, one per post, with what each is for.
2. Tap play on a free streaming site and Safari opens an ad tab instead. Undirect, a Safari extension for iPhone, iPad and Mac, lifts the invisible layer before your press lands and puts back a link rewritten mid-click. $1.99 once, and no account to make.
3. Cutling keeps the text you type over and over, like your address, an email signature or the reply you send every day, one tap away in its own keyboard on iPhone and iPad, and in the menu bar on Mac. $4.99, paid once.
4. stya is a till for cafés, restaurants and games rooms. It times rented tables and rooms (billiards, karaoke, mahjong, PlayStation), puts the food on the same bill, and keeps taking orders when the signal drops. On iOS, Android and Chrome.
5. Tolk comes next. It will send a venue's receipts and booking reminders on WhatsApp, and it isn't sending yet. And if your company needs a phone or web app, we build those too: hello@monholt.com
6. Here you'll see what we ship, what broke on the way, and questions for people who run a venue, fight pop-up tabs or paste the same text all day. Your answers decide what gets built next.

Fact sources: monholt.com copy (`monholt/site/public/index.html`); App Store descriptions and prices
(lookup API); stya's built site; plan 0165 for Tolk. The link to each product goes in a reply under its
post, per the X rule in `social-media`.

### Ten audience questions

English by default for every product, stya included (owner, 2026-11-21: the POS is not specialised for
one country). Other languages follow `posting-times-countries.md` for every product alike: the
Japanese X track may carry any of these, written natively per `blind-translation`, and the Arabic
track stays Undirect-only. Section 2 found polls rare and open questions answered more, so each poll
can also go out as the bare question; run polls as the "one post in five" format test.

| # | Product | Post | Poll options (each 25 characters or fewer) | Why this question |
|---|---|---|---|---|
| 1 | stya | Café and restaurant owners: which part of your till gives you the most trouble? | Closing the day's count / Training new staff / Moving or splitting bills / Reports I can trust | Vendor surveys in section 2 (unused features, payments, reporting); stya's motto research found owners' complaints sit at closing (`pos/stya/site/copy/motto-review.md`). |
| 2 | stya | Happy hour ends at 6. A table orders at 5:55 and pays at 6:20. Which price should the bill show? | The happy hour price / The regular price / Depends on the item | A live design question: `pos/docs/research/time-boundary-pricing.md` settles promo prices at the moment the order goes to the kitchen, after Toast's "17:55-order, 18:20-payment complaint"; the answers test that choice. |
| 3 | stya | A billiard table is booked for 2 hours and the players leave at 2h10m. How would you charge the extra 10 minutes? | By the minute / Round up to 15 minutes / A full extra hour / Let it slide | stya times rented tables and its rounding sits in `app.rental_meter_amount` (`pos/docs/timed-rental.md`). |
| 4 | stya | If you've ever moved your shop to a new till or POS: what made the move painful, and what would have got you to switch sooner? | (open question, no poll) | Data migration is the biggest obstacle to switching (Blue Star survey, section 2). |
| 5 | stya | Venue owners, honest count: how often does your internet drop in the middle of service? | Most weeks / About once a month / Hardly ever / We run on mobile data | stya keeps taking orders offline ("Signal gone? Sales not.", built site). |
| 6 | Tolk | When a guest at your venue wants a receipt, how do they usually get it? | Printed paper / On WhatsApp / By email / They rarely ask | Tolk will send receipts on WhatsApp (plan 0165); the answers say whether venues and guests want it. |
| 7 | Undirect | A page tries to open a tab you never asked for. What do you want your blocker to do? | Block it quietly / Block it and tell me / Ask me first | 1.1.0 adds a note on the page; buyers asked for a confirmation prompt (`undirect-voice-of-customer.md`, gap 6). |
| 8 | Undirect | Where do surprise ad tabs and redirects hit you most often? | Streaming sites / Manga and comics / Sports streams / Somewhere else | Top pains 1 and 4 in `undirect-voice-of-customer.md`; a reply under the poll asks "Somewhere else? Say what kind of site, no links." |
| 9 | Cutling | What do you paste most often on your phone? | My address / A link I share a lot / A reply I send daily / Email or phone number | What people paste, in their own words (`cutling-niche-language.md`); no "bank details". |
| 10 | Cutling | You send the same message all day with one part changed. Which part changes most? | A name / Today's date / A time / An order or code number | Cutling 2.0 adds fill-in blanks and dates (Cutling git log, 2026-11-21); the answers rank which kinds to add next. |

### Five build-in-public posts, from real recent work

1. Cutling 2.0 will hold 5,000 saved texts and 500 images, up from 1,000 and 50. The keyboard now reuses its cells and draws photos from small thumbnails on disk, so a full store of long texts and 12-megapixel photos peaked at 58.6 MB in testing. iOS gives a keyboard 77 MB.
   Source: Cutling commit of 2026-11-21: "Cutling holds 5,000 text cutlings and 500 images, up from 1,000 and 50 ... peaks at 58.6 MB in the simulator, 18 MB under iOS's 77 MB keyboard limit"; next release 2.0.0.
2. Our two apps were downloaded 450 times between Aug 20 and Nov 19, and most of that came on a single day, Oct 10, when Undirect was free. 132 of those were from Saudi Arabia, after one post in Arabic. Paid copies since Sep 1: 14 of Undirect, 3 of Cutling.
   Source: `docs/research/posting-times-countries.md`, "App Store units by country" and "Paid units by country". Owner's call whether numbers this small go public; section 2 shows makers who post small and even zero numbers (@mxkaske, @CodeWithChris) and get replies for it.
3. When Undirect stops a redirect or a pop-up tab, the page will now say so, in a small note naming what it stopped. It's on by default, Don't show again appears on the first three, and the note is written in all 50 languages Undirect speaks. Coming in 1.1.0.
   Source: Undirect commits of 2026-11-21 (the page note, on by default, Don't show again on the first three, all 50 languages; the next version is 1.1.0). Post only once 1.1.0 is in review or out.
4. Undirect has needed iOS 26.2 until now, which shut out every iPhone that hasn't updated. 1.1.0 runs on iOS 18. Below 26.2 the app can't read whether the extension is on, so it opens Safari on a demo page and shows where to switch it on.
   Source: Undirect commit of 2026-11-21: "Undirect runs on iOS 18 ... below 26.2 the app cannot read the extension's state or open its settings page, so it opens Safari on the demo page and says where Manage Extensions is".
5. stya started as four web apps, each with its own login: admin, cashier, staff and the waiter's pad. On a shared phone at the counter, that's four sign-ins. We're rebuilding it as one app with one login for iOS, Android and Chrome, and the Chrome build is tested on a Windows PC.
   Source: `pos/stya/docs/plans/0156-stya-is-one-app.md`: admin, cashier, staff and the waiter pad become one app with one login; the Chrome build is "walked on a Windows PC".

## 4. The weekly mix for X (English track)

The English X slots in `posting-times-countries.md` give 10 originals a week (Mon-Thu 21:10 WIB,
Tue-Fri 01:30 WIB, Fri 23:30, Sun 22:30), at least 3 hours apart, links in our own reply. Filled by type:

| Type | Posts a week | What it is | Model from section 2 |
|---|---|---|---|
| Helping a stranger, no pitch | 3 | a how-to or explainer from what we know: telling a scam redirect from a virus, a Safari or iPhone keyboard setting, how a venue can price the minutes past a booking | @PlausibleHQ's explainers, @mxkaske's how-to |
| Build in public | 2 | one number, screen, date, decision or mistake from the week's commits, with the reason | @mxkaske, @SebastianRoehl, @heyandras |
| Asking the audience | 2 | one open question and one poll, rotating stya, Cutling, Undirect and Tolk; reply to every answer | @heyandras, @jakobgreenfeld |
| Product pain posts | 2 | the existing calendar's pain posts and films, one app each | @jordibruin's "Got annoyed with ... so I made" |
| Someone else's work | 1 | an app or tool we liked, a directory or developer who listed us, credited by handle (quote, not repost) | @lickability |
| **Total** | **10** | 3 of 10 help with no pitch; app-about posts (pain plus build) are 4 of 10, under the half `social-lessons` allows | |

Around that:
- **Pinned:** the intro thread above, pinned once and refreshed when a product changes stage (Tolk
  sending, stya on the App Store).
- **Launch weeks** (Undirect 1.1.0, Cutling 2.0): the two product posts and one build post become a
  launch run in @jordibruin's order: a dated tease, a clip on a real device, the launch post with any
  offer, then the result in numbers.
- **Japanese X (3 a week) and Arabic X (2 a week, Undirect only)** keep their tracks from
  `posting-times-countries.md`; each takes one audience question a fortnight, written natively.
- **The founder's voice:** company accounts in section 2 drew 5-20 times fewer likes than their
  founders on the same news. GUESS: the owner quoting each build post from his own account would carry
  it further; his call, since public copy may not name his place.
