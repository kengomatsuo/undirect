# Saved skills, read in code

Started 2026-11-21. The owner asked whether we had read the code of the skills his
Instagram saves point to, not only their READMEs. This file records, per repo, what
each skill actually does step by step, read from its SKILL.md, references, scripts and
prompts in a shallow clone (untrusted: read, never run or installed). Clones sit in the
session scratchpad under `skill-repos/<owner>_<repo>`; line numbers below refer to the
commit named in each heading. The list of saves and their primary sources is
`docs/research/instagram-saves-social.md`.

House skills compared against: `claude-house-rules/skills/social-media/SKILL.md` (83
lines), `~/.claude/skills/product-video/SKILL.md` (226 lines, plus `references/`),
`human-prose`, `site-design`.

Verdicts: **install** (as-is), **copy** (a part into a house skill), **skip**.

## 1. Corey Haines, `coreyhaines31/marketingskills` (commit 5b2b400, 2026-11-19)

**Licence:** MIT (`LICENSE`, "Copyright (c) 2025 Corey Haines"). 53 `SKILL.md` files (the
README's 52 plus one added), each 116-500 lines with `references/` and `evals/`. Code: 40-odd
API wrappers under `tools/clis/*.js` (Ahrefs, Search Console, Plausible, Apollo ...), one
skill script that matters (`reverse-engineer-marketing/scripts/teardown.mjs`, 1,777 lines),
and `conversion-tracking/scripts`. Every skill first reads `.agents/product-marketing.md`.
Read in full: `social` (+ all 11 references), `video` (+ `edit-anatomy.md`,
`code-rendered-product-films.md`), `aso` (+ `benchmarks.md`), `launch`,
`directory-submissions`, `reverse-engineer-marketing` (stages 6-9, `content-teardown.md`).
Read by headings: `customer-research`, `community-marketing`, `competitors`, `ai-seo`.

### 1.1 `social` (469 lines, v2.6.0)
**What it does:** asks goals, audience, voice, time (SKILL.md 22-42); a platform table
(48-54); 3-5 content pillars with a 30/25/25/15/5 split (72-78); four hook families
(95-113); a "No AI tells" list (117-135: no "It's not X, it's Y", no negation lists, no
self-answered questions, no em dashes, no broetry, no "Agree?" bait, no emoji bullets;
"Keep fragments and lists of three to one per post"); repurposing tables; a daily 30-minute
engagement routine (240-245); a weekly review of top 3 and bottom 3 posts (275-281); drafts
first, never auto-publish (342-343); short-form structures with second marks (391-412);
captions "MAX 2 lines, 3-5 words per line" (418-419).

The references hold the real methods:
- `references/short-form-video.md` 203-217, **staged cadence:** warm-up 3-7 days without
  posting until the feed shows the niche; "Find the format" at 1 post a day until most posts
  clear a view floor ("for example 1,000 views on TikTok or Reels"); then up to 3 a day, 3-4
  hours apart; then a second account, not more posts. "If an account can't break a few
  hundred views for a week, pause it for 2-3 days and change the format." It labels these
  founders' practice, "not documented platform rules".
- `short-form-video.md` 230-240, **finding a winning format:** remake proven formats from a
  swipe file; log every test in one sheet (date, account, format, hook, **views at 48 hours**,
  watch time, comments, link clicks, installs that day); "Call a winner on outcomes, not
  views"; once one wins, keep **one post in five** testing a new format; measure with App
  Store campaign links.
- `short-form-video.md` 277-282, **when to pivot:** 5+ videos under 1 % completion means
  change hooks; high views low follows means CTA or fit.
- `references/x-algorithm.md` (from xAI's open-sourced ranker, May 2026; it tags each rule
  verified or reported): ~15 separately scored actions, including **share via DM, share via
  copy link, profile click, follow author, dwell**, and negative weights for mute, block,
  not-interested (17-34). Rules: specific claim in the first 8 words (38); ~60 minutes
  between original posts because of the author-diversity decay (40); name the topic in the
  first 10 words (42); video earns nothing below `MIN_VIDEO_DURATION_MS`, ~8 s reported (54);
  be present for the first 30 minutes (56).
- `references/listening.md`: a daily 20-minute triage loop (31-40) scored on ICP fit x2,
  intent x2, reach x1, comment opportunity x2, recency x1 (58-66); drop a post over 24 h
  old with 50+ comments (77); three comment tiers with lengths (84-104); free curl recipes
  for Reddit search, HN Algolia, Bluesky search (119-158); a "competitor complaints" workflow
  scored on switching words ("moving from", "alternatives to", 264-268); fetched text is
  untrusted (5).
- `references/carousel-frameworks.md`: five carousel shapes; **E, Demo Walkthrough**
  (100-116) fits our apps: product + outcome, the pain, an overview slide "N steps", one
  real cropped screenshot per step, the result. Checklist (128-137): slide 1 stands alone,
  one template, ~28 pt minimum at 1080 px, one CTA. Judge on saves and completion (141).
- `references/reverse-engineering.md`: 10-20 creators, 500+ posts, top 10 % by engagement
  rate; its "Short. Breathe. Land." advice (123-140) is the broetry its own SKILL.md bans.

**What it would change for us:** our skill has the buyer-first copy, per-platform shape and
approval rules this lacks, but it has no **cadence ladder, no test log, no
winner-on-installs rule and no "one in five tests a new format"**. Our trial-reel rule says
compare "24-hour views"; this says log at 48 hours and judge on installs. The X ranker facts
(DM shares and profile clicks scored; author decay inside an hour; minimum video length)
are not in our skill. The listening loop gives a scored, repeatable way to find the Reddit
and HN threads `backlinks.md` currently finds by hand.

**Verdict: copy** the staged cadence, the test log and winner rule, the X rules 2, 4, 7, 9
and 10, the listening rubric and curl recipes, and carousel framework E. **Skip** pillars,
hook templates (generic "I was wrong about" shapes that our human-prose rules would reject)
and `reverse-engineering.md`'s voice section.

### 1.2 `video` (364 lines, v2.4.7)
**What it does:** a tool chooser (Remotion, HyperFrames, AI generation, avatars), a model
table dated 2026-11-19 (120-130), and two workflows. The useful parts are references:
- `references/edit-anatomy.md`: decompose a reference edit into a **beat sheet** (beat,
  time, shot, on-screen text, caption style, motion, audio; 49-57) and a **style summary of
  3-5 signature moves** (59-62); count **cuts per second** first (25); decode the first 2 s
  in most detail (85); copy the grammar, never the creative (76-78).
- `references/code-rendered-product-films.md` (from Inbox Zero's write-up): render purity,
  real DOM snapshots of a seeded app with a fictional cast (51-56); "When docs and UI
  disagree, the UI wins", logged in `VARIANT.md` (61); starter taste rules (71-75): payoff
  within ~2 s, **no recaps**, end card = logo lockup + one line + quiet URL, body text >= 20 px
  at 1080p, **captions settled >= 0.4 s before the click they describe**, no long crossfades
  between busy UIs; audio -14 LUFS / -1.2 dBTP; "Agents can't listen" (82); a video judge
  model's glitch reports are hints only (94); don't A/B the hero video on overall signups,
  compare cuts by `video_id` watch-through (106).

**What it would change:** `product-video` already exceeds this on capture, motion, loudness
and QA. Two gaps: it studies references (phase 2, "films' cut times measured") but has no
fixed **beat-sheet format with a cuts-per-second count and 3-5 signature moves**, and it has
no rule that **a caption lands before the press it describes** (ours times captions to
reading time).

**Verdict: copy** the beat-sheet columns and signature-move summary into
`references/research.md`, and the 0.4 s caption-before-click and no-recap rules. **Skip**
the rest: HyperFrames and AI footage are a second stack; avatars break the real-recording rule.

### 1.3 `aso` (314 lines, v2.0.6)
**What it does:** fetch the listing; classify brand tier (Dominant, Established,
Challenger; 104-139); score six weighted dimensions (title and subtitle 20 %, description
15 %, visuals 25 %, ratings 20 %, freshness 10 %, conversion 10 %; 156-163); report three
quick wins with character counts. Apple facts (220-231): keyword field 100 bytes, no repeats
across title, subtitle and keywords, commas without spaces, screenshot captions indexed
since June 2025, in-app events at most 10 live and 31 days each, CPPs in organic search.
`benchmarks.md` (vendor figures, AppTweak, SplitMetrics): 90 % never pass the 3rd
screenshot (69), 4-5 screenshots optimal for utilities (75), in-app events best at 2-4 a
month and the lift ends with the event (110-111), A/B under 2 % is noise (129).

**What it would change:** little. `docs/plans/app-store-growth/` already holds a
conversion change set, CPP and event work that goes past this. The one carry-over is the
**A/B threshold table** for reading Product Page Optimization results.

**Verdict: skip** as a skill; the numbers are vendor blog figures, not Apple's.

### 1.4 `launch` (385 lines) and `directory-submissions` (439 lines)
`launch` is generic SaaS (ORB owned/rented/borrowed, five phases, Product Hunt day).
`directory-submissions` has three things we lack:
- Rule 3 (53-54): **never the same description on every directory**; identical copy gives
  AI engines "no new signal across sources". Variants per directory type live in
  `references/positioning-variations.md`.
- "Verify the Actual Backlink" (179-186): record the anchor's real `rel` tokens
  (`nofollow`, `sponsored`, `ugc`) or "unqualified link observed"; there is no `dofollow`
  attribute. `backlinks.md` already does this for some rows and marks the rest GUESS.
- Indie launch sites (108): high DR from badge-swap rings, link often lasts only while the
  badge shows. Matches our rule 11 in `instagram-saves-social.md`.
- Product Hunt: "Never ask for upvotes. Ask for feedback" (210); Show HN only with a
  technical angle (217).
Its "AI-referred traffic converts 6-27x" (25) and "2.8x higher AI citation" (37) carry no
source.

**Verdict: copy** the vary-the-copy rule and the rel-token check into the directory
procedure. **Skip** the rest (G2, Capterra, LinkedIn are B2B).

### 1.5 `reverse-engineer-marketing`, stage 6 (`references/content-teardown.md`, 97 lines)
**What it does:** per channel, pull up to 100 posts from 180 days, **skip posts younger than
10 days**, rank inside the channel only, **split into thirds and compare top with bottom,
leaving the middle out**; under 24 settled posts, call no pattern (15-35). Download covers
in one batch because Instagram and TikTok links expire; never describe an image from its
caption (37-42). Per-channel checklists (Instagram: reels vs carousels, cover headline word
count, slide count, the line before "more", grid colours; 59-64). Write-up: 3-5 traits
counted in both thirds ("7 of 10 top thumbnails show a face, 1 of 10 bottom"), house style
with hex values, 2-3 fill-in formulas with a real example each (86-91). A contact sheet with
the top third above the bottom (95-97). Stage 9 adds "what won't transfer" and "the one play
to start this week" (234-248). `teardown.mjs` (not run) wraps free sources: sitemap growth,
Wayback history, job boards, review terms, GitHub stars.

**What it would change:** our weekly outlier scan (social-media skill, "Formats are taken
from outliers") says "3x their usual views" and nothing about how to read the result. This
gives the reading: settle time, thirds, counted traits, formulas, a contact sheet.

**Verdict: copy** the thirds method, the 10-day settle and 24-post floor into the outlier
scan rule.

### 1.6 Others read by headings
- `customer-research`: six extraction fields (jobs, pains, triggers, outcomes, vocabulary,
  alternatives; 67-84), confidence High only when a theme shows in 3+ independent sources
  (103). Our voice-of-customer files have quotes but no confidence level: **copy** the 3-source rule.
- `competitors`: four page formats ("X alternative", "X alternatives", "You vs X", "A vs B");
  a competitive asset audit that re-verifies every claim with a date (221-229). Our
  `comparison-page-research.md` covers the pages; **copy** the dated re-check.
- `ai-seo`: which index each AI engine reads (72-77: ChatGPT and Copilot Bing, Claude Brave,
  Perplexity its own plus Google); the Princeton GEO table (+41 % quotations, +31 %
  statistics, +27 % cited sources; 234-241). Relevant to `site-design`; see section 2.
- `community-marketing`: Discord/Slack community building. **Skip**.

## 2. Claude SEO, `AgriciDaniel/claude-seo` (commit 468ed5b, 2026-11-15)

**Licence:** MIT ("Copyright (c) 2026 agricidaniel"; each SKILL.md also says `license: MIT`).
22 core skills, 11 extension skills, 20 agent files, 75 Python scripts run through a
`scripts/claude-seo` launcher that builds its own venv and Chromium. Read: `skills/seo`
(orchestrator, 339 lines), `seo-geo` (412), `seo-backlinks` (327), `seo-drift` (224),
`seo-sxo` (260), `hooks/hooks.json`, `scripts/verify_backlinks.py`,
`scripts/commoncrawl_graph.py` headers.

**What it does:** `/seo audit <url>` detects the business type from homepage signals
(`seo/SKILL.md` "Industry Detection") and spawns 8-14 sub-agents in parallel (technical,
content, schema, sitemap, performance, visual, geo, agentic, backlinks, sxo, plus Google
APIs when credentials exist); results become an SEO Health Score with fixed weights
(technical 22 %, content 23 %, on-page 20 %, schema 10 %, CWV 10 %, AI 10 %, images 5 %), and
each recommendation must carry a "how would we know this failed?" check. Hard rules: never
recommend HowTo schema; **FAQ rich results retired for all sites on 2026-05-07**; INP, never FID.

Methods worth having, with places:
- `seo-geo` "AI Crawler Detection": each claim only from its own bot. ChatGPT Search
  citability = `OAI-SearchBot`, not `GPTBot`; Claude search = `Claude-SearchBot`, not
  `ClaudeBot`; Siri/Spotlight/Safari = `Applebot`, and `Applebot-Extended` is a training
  opt-out only; AI Overviews come from the `Googlebot` index, never `Google-Extended`.
  Ahrefs' 75,000-brand study: YouTube mentions correlate ~0.737 with AI visibility, Domain
  Rating ~0.266 (a correlation, it says so). ~44 % of AI citations come from the first 30 %
  of a page (SE Ranking). Every third-party number is marked "not re-verified".
- `seo-sxo` steps 2-3: search the keyword, classify the **page type of each top-10 result**,
  call the SERP's dominant type (>60 % strong, 40-60 % mixed, <40 % fragmented) and flag a
  mismatch ("Blog post vs product pages = CRITICAL").
- `scripts/verify_backlinks.py`: for each claimed backlink, fetches the page, finds the
  anchor to the target, records its `rel` tokens **and page-level nofollow from
  `<meta name=robots>` and the `X-Robots-Tag` header** (lines 121-157, 320-327), and
  whether the source redirects.
- `seo-backlinks`: free tier = Common Crawl's monthly host graph (PageRank, harmonic
  centrality; no key) plus Moz and Bing Webmaster free keys; with Common Crawl alone it
  **must not print a numeric score** (208-210).
- `seo-drift`: SHA-256 baseline of title, meta description, canonical, robots, H1, JSON-LD
  and status per URL; `compare` after a deploy names what changed.

**Install hazards read in the code:** `hooks/hooks.json` adds a `PostToolUse` hook on
**every Edit and Write** in every repo that runs `validate-schema.py`; every major command
ends with a Skool advert footer ("Join the AI Marketing Hub community", `seo/SKILL.md`
"Community Footer"); `/seo setup` installs Chromium.

**What it would change:** less than the reel suggests. `site-design/references/seo.md`
already carries the FAQ retirement (line 136), the per-bot table (148-153), llms.txt as
experimental (155) and a raw-HTML curl per crawler (165). Three things are new to us: the
**SERP page-type check before writing a page for a query**, **page-level nofollow in the
backlink check** (`backlinks.md` reads only `rel`), and the **drift baseline after each
site deploy**. Correction to `instagram-saves-social.md` 8.1: its "act on the schema
(`SoftwareApplication`, `FAQPage`)" is out of date; FAQPage earns no Google feature since
2026-05-07 (Google's FAQ page, read with curl today: "The FAQ rich result feature is no
longer shown in Google Search results").

**Verdict: copy** the SXO page-type step into `site-design` and the page-level nofollow
check into the directory and backlink procedure. **Skip installing**: the hook on every
edit and the advert footer cost more than a one-off audit gains on two small sites.

## 3. Lawrence Hitches (@lawrenceaiseo), `lhitches/*` (all commits 2026-09-13)

**Identity:** confirmed. lawrencehitches.com links `instagram.com/lawrenceaiseo` (curl,
2026-11-21), and his marketplace repo `lhitches/claude-seo-plugins` indexes eight plugins.
This settles `instagram-saves-social.md` 8.2, which was wholly UNVERIFIED.
**Licence:** MIT in each of the eight plugin repos (the index repo has none). All eight
cloned and read; every SKILL.md is short (68-280 lines). Code: one MCP server,
`google-trends-mcp/server.py` (309 lines, on the unofficial `pytrends` 4.9.2; its own
docstring warns of 429s from Google's internal endpoints).

### 3.1 `query-templates` (105 lines)
**What it does:** six gated stages over a 90-day Search Console export of every query with
impressions. Stage 1 (31-45): **cluster by pattern, not topic**: strip the variable slot,
write the rest in slot notation, rank templates by total impressions, never by one query;
GSC hides the tail, so volumes are floors; "expect the best template to be vendor-dark".
Stage 3 (57-68), **Query Deserves a Page**: a page only if all five hold (demand, low
similarity to existing pages, distinct entity, distinct predicates, repeatable pattern);
everything else becomes a HEADING, SECTION, LINK or SKIP; a weak fill gets a written
**promote trigger** ("crosses 50 impressions a month, promote the heading to a page"); "never
touch a fortress". Stage 5 (80-88): the same anchor text at most three times in main
content. Stage 6 (90-97): success = **count of variations in the top 20 per template**.
**For us:** both sites are new, so stage 1 has little data yet; the promote-trigger rule and
the HEADING-before-PAGE default fit our help pages now. **Copy** the five-condition test and
promote triggers into `site-design`.

### 3.2 `reddit-extract` (104 lines)
**What it does:** appends `.json` to a Reddit thread URL and curls it with a User-Agent
(35-38); search mode uses `r/<sub>/search.json?q=...&restrict_sr=on&sort=top&limit=10`
and takes the top five threads (43); a fixed extraction prompt in seven parts: questions,
objections, comparisons, frustrations, phrasings, sentiment, angles (49-62); rules: at most
ten threads, two seconds between fetches, **threads under ten comments flagged
low-signal**, always the loud-minority caveat (93-100).
**Tested here 2026-11-21:** `curl -A "Mozilla/5.0 (compatible; research-client)"
https://www.reddit.com/r/Safari/comments/1f5lvnw/.json` returned **403** (old.reddit.com
302). The mechanic does not work from this Mac; it would need a cloud session or the browser.
**Verdict: copy** the seven-part extraction prompt and the under-ten-comments rule into how
we fill `*-voice-of-customer.md`; the fetch route must be re-tested from a cloud session.

### 3.3 Hawk SEO skills (`hawk-seo-skills`, eight skills)
- `striking-distance-finder` (142): keep GSC rows at positions 4-15, drop impressions under
  5; Lift = impressions x (target CTR at position 3, 11 % informational or 7 % commercial,
  minus current CTR) x position weight (1.0 at 4 down to 0.55 at 11-15); group by page;
  per page a title under 60 characters with the query verbatim, a 140-160 character meta,
  one H2 to add, one internal link. "Title-tag tweaks first ... move CTR within 7-14 days".
- `content-decay-detector` (83): two GSC page exports a year apart; five diagnoses from the
  pattern (freshness, displacement, intent shift, demand, seasonal) and one treatment each;
  "Decay is a trend, never a snapshot".
- `ai-visibility-check` (161): eight customer-style queries pasted by hand into ChatGPT,
  Gemini, Perplexity and Claude; "NEVER guess ... what ChatGPT ... would say"; stop at
  stage 1 until real answers are pasted.
- `technical-seo-audit`, `google-trust-check`, `competitor-gap-check`,
  `content-brief-draft`, `topical-authority-map`: read by heading; generic, local-business
  slant (Australian English rule throughout).
**For us:** striking distance is the one to run once both sites have 90 days of GSC data;
the ai-visibility protocol (paste real answers, never simulate) is a rule `site-design`
lacks for AI-search checks. **Copy** both as procedures; skip the rest.

### 3.4 `seo-page-design` (page-design 143, line-edit 116, copy-audit 69)
**What it does:** a nine-layer spec for one page. Layer 2: answer in the first sentence under
every H2, a ~50-word self-contained chunk per key claim. Layer 3: one H1, headings ordered
by demand, question-form. Layer 4: ~44 % of AI citations come from the first 30 % of a
page (Kevin Indig, 1.2 M responses). **Layer 7, a hard gate**, Lily Ray's eight risky
templates (May 2026, 220+ sites, 54 % lost 30 %+ of traffic): programmatic A-vs-B pages,
"What is X" farms, "Best X for Y" at volume, self-promotional listicles with no testing,
**competitor-alternatives pages at scale**, programmatic language scaling, FAQ farms,
off-topic content.
**For us:** this is the counterweight to Corey Haines' "build 3-5 alternatives pages before
directories". Cutling's site serves many languages and we have comparison-page plans; the
gate says a few honest comparison pages are fine, a programmatic set is the pattern that
lost traffic. **Copy** layer 7 into `site-design` as a check before any comparison or
per-language page set.

### 3.5 `seo-boardroom` (99), `internal-linking` (152), `schema-specialist` (245)
Boardroom: five adversarial advisors (Crawler, Editor, Intent Reader, Authority, Answer
Engine) each must cite a checkable source and return SHIP, FIX FIRST or KILL, then
anonymised peer review and one Chair verdict. A decision tool, not a method we lack.
`internal-linking` and `schema-specialist` duplicate `site-design/references/seo.md`.
**Skip.**

### 3.6 `google-trends-mcp`
Four tools (interest over time, related queries, interest by region, trending now) on
`pytrends`. Unofficial, rate-limited, and it would be a Python MCP on the Mac. **Skip**;
`instagram-saves-social.md` 8.4's manual Trends category filter does the same job.

## 4. Sahil Lavingia, `slavingia/skills` (commit eb9f57f, 2026-04-13)

**Licence:** no LICENSE file in the repo (GitHub reports none); `.claude-plugin/plugin.json`
declares `"license": "MIT"`. Treat as MIT by the author's own manifest, with no licence text
to ship alongside a copy. Ten skills, 50-100 lines each, all prompts, no code; all ten read.

**What they do:** each is a persona prompt ("channeling the philosophy of The Minimalist
Entrepreneur") with an output list.
- `first-customers` (76 lines): three circles (friends and family, community, strangers);
  for the community circle "Make a list of everyone who has written or shared anything about a
  similar business", contact each personally, ask for candid feedback, "not reviews or social
  posts" (26-29); cold notes never copy-pasted (36); "Don't launch until you have 100 paying
  customers" (67). Output: 10 friends, 10 community members, a template, a weekly sales goal.
- `marketing-plan` (100): educate, then inspire, then entertain (40-58); two accounts,
  personal and business (62); **pick one platform** (67); email is owned land (69-76);
  spend money last, never more than a customer earns (85-91).
- `find-community` (50): evaluate a community on membership, pain, reach, size.
- `pricing` (64): charge something, start low and raise (29-35).
- `grow-sustainably`, `processize`, `mvp`, `validate-idea`, `company-values`,
  `minimalist-review`: company-building advice with no marketing method.

**What it would change:** almost nothing. "Pick one platform" contradicts the owner's
standing order that every post goes to every platform he holds, and the owner's order wins.
The one method that carries over is the community list: name people who already wrote about
Safari tap-redirects or iPhone clipboard keyboards and send each a personal note. Our
`backlinks.md` already lists the threads; what is missing is the people (thread authors and
answerers) as a list, which this skill's output 2 is.
**Verdict: skip installing.** The community-list step is one line in `social-media`
"Reach and leads" at most.

## 5. Ads and the ad library

The two saves (@globewick DfohgWwjwsQ, @champmack DftI1olv1Aq) name no repo. Three
candidates were cloned and read: the one the earlier file found
(`ComposioHQ/awesome-claude-skills/competitive-ads-extractor`), the most-starred "Google
Ads" skill for Claude (`AgriciDaniel/claude-ads`, 11,201 stars, same author as claude-seo),
and the one with a real ad-library method (`gooseworks-ai/goose-skills`). Which one the reel
showed stays UNVERIFIED.

### 5.1 `ComposioHQ/awesome-claude-skills` `competitive-ads-extractor/SKILL.md` (sparse clone)
**Licence:** the repo's own; sparse clone took only this folder, which carries none
(UNVERIFIED). **What it does:** nothing executable. Example prompts ("Extract all current
ads from [Competitor]") and an invented sample output with a progress bar ("Found: 23 active
ads ... [████] 100%", lines 64-82) for a scrape it ships no code for. **Verdict: skip.**

### 5.2 `AgriciDaniel/claude-ads` (commit fc3908e, 2026-10-17)
**Licence:** MIT ("Copyright (c) 2026 Daniel Agrici"). 34 skills, but each is a 20-40 line
procedure pointing at `ads/references/*.md` and a Python core (`claude_ads_core/`) that
validates JSON run bundles and gates account changes. `ads-competitor` (23 lines) only says:
use official transparency libraries, record capture date, platform, creative, landing page
and URL, separate observation from inferred spend. `ads/references/apple-audit.md` (68
lines): 17 controls for Apple Ads, e.g. AP-S01 "Campaigns separate brand, category,
competitor, discovery ... intent", AP-S02 Search Match must not overlap exact keywords,
AP-C01 custom product pages matched to keywords, AP-M03 "Attribution privacy thresholds ...
treated as uncertainty, not zero performance". It also records (verified 2026-10-12 by its
author) that **Apple's Campaign Management API v5 is deprecated and sunsets 2027-01-26**,
replaced by the Apple Ads Platform API.
**For us:** we run no paid ads; ASG17 (Cutling's Apple Ads Basic) waits on the owner's
sign-in. If Advanced campaigns ever start, AP-S01, AP-S02 and AP-M03 are the checklist, and
any script must target the Platform API, not v5. **Verdict: skip installing**; note the
three controls and the sunset date on ASG17.

### 5.3 `gooseworks-ai/goose-skills` (commit 885edb5, 2026-11-16)
**Licence:** MIT ("Copyright (c) 2026 GooseWorks"). A large library tied to the paid
GooseWorks MCP and ScrapeCreators (billed per call). Read: `shared/ad-angle-miner` (422
lines), `marketing/run-organic-social` (187).
- `ad-angle-miner` 1A-1G: read the brand's own ads first; sort them into **running 30+ days
  or 3+ variants** ("advertiser persistence, worth investigating"), stopped ("reason
  unknown"), and **"Never run: the white space. An angle buyers talk about that the brand has
  never run is the most valuable find"**. For every competitor ad keep link, hook, offer,
  CTA, days running, variants, and write "at least N days, still running". Customer voice:
  own 4-5 star reviews for outcomes, 1-3 star for objections; **rivals' 1-2 star reviews** for
  gaps, "Claim a gap only when this product independently supports the promised
  difference". A Reddit thread counts as customer voice only when reviews or comments repeat
  it (1F). Label every reference paid, organic or unknown, never guess organic; high views
  relative to followers do not prove paid distribution (1G). Phase 2: seven angle kinds
  (pain, outcome, identity, switching, proof, contrast, objection), each with verbatim quotes
  and links. Phase 2.5: **headline at most 8 words static, at most 12 as a video hook**.
- `run-organic-social` step 4: every post names the pattern and links the one example it
  follows ("built like @x's teardown video, 14 Oct"); **at most half the posts mainly about
  the product, at least 3 in 10 useful to a stranger who never heard of the brand**; a
  research card needs 8+ examples with numbers, **at least 3 from accounts under 10k
  followers**; for small accounts each post carries its reply plan (which named accounts to
  engage that day); each post at most one fill-in.
**What it would change:** our social skill starts every post from buyers' words, but it has
no angle inventory, so the calendar cannot show which angles we have never posted. The
"never run" list, the seven angle kinds, rivals' 1-2 star reviews as the gap source and the
paid/organic label for every reference are each missing. The 3-in-10 stranger-useful rule
and "name the example each post is built on" make a calendar checkable.
**Verdict: copy** the angle inventory (seven kinds, never-run list, rival 1-2 star reviews,
paid/organic/unknown label), the 3-in-10 mix and the per-post pattern link. **Skip** the
skills themselves: they need the paid GooseWorks MCP.

## 6. Instagram: outlier research, growth setup and trial reels

None of the four saves (@pedroaitech DfnnIPKgYOi, @pete.creatives DfqYVy8hQi2, @getripping
DfkCsRMknwQ and DfkZbFOlLxS) names its repo in the caption. GitHub search on 2026-11-21
("reels outlier", "trial reels", "instagram trial reels") turned up the four below; each is
a candidate, not a confirmed match (UNVERIFIED which one each reel used). All were cloned
and their skills and scripts read; none was run.

### 6.1 `shafeela-bot/ig-radar-plugin` (commit 90ec2d8, 2026-08-25): an outlier radar
**Licence:** none (no LICENSE file, GitHub reports none): all rights reserved, so nothing may be
copied verbatim; methods only. 9 skills, 8 Python libs.
**What it does:** `ig-radar` pulls each tracked competitor's last 20 reels and the top 30
reels per hashtag through paid Apify actors (budget cap $4 a sweep; its own note says the
real cost is ~$1.95-2.10 because transcripts run ~$0.05 a reel), scores them, transcribes the
top 15 and writes a breakdown of the top 10.
`lib/outlier_scoring.py`:
- **Baseline** (109-146): **median** views of the account's reels in the last 30 days, after
  **dropping the top 10 % by views** so a recent hit does not inflate it; reels only, never
  carousels; recomputed when older than 30 days.
- **Score** (178-240): views/median x 40 (capped at 40), comments/average x 20, likes/average
  x 15, +10 if the caption asks for a save, +10 if under 20 s and over 2x median
  ("completion"), +5 if under 7 days old and over 1.5x median; 70+ viral, 40+ above average;
  a hard floor of 20,000 views. Shortlist: top 5 per competitor, 30 in all.
- **A flaw in the code:** the view term saturates at 1x median (`min((views / median) *
  40, 40)`, line 206), so a reel at the median and one at 10x the median get the same 40
  points; the score cannot rank real outliers by size. Its own `ig-postmortem` notes the
  20,000 floor zeroes every reel of a small account.
- `lib/ffmpeg_analysis.py`: real cut times with ffmpeg `select='gt(scene,0.3)',showinfo`
  (line 53), then cuts per second, average shot length and cut variance; silence at -30 dB;
  loudness.
- `ig-outlier-breakdown`: a fixed vocabulary so breakdowns can be grouped: hook type
  (text, visual, audio, combo), hook format (question, bold claim, pain, curiosity gap ...),
  one of seven triggers, format, length bracket (<15, 15-30, 30-60, 60+ s), pacing, text
  density, CTA, the one "outlier factor", five 1-5 scores (hook, emotion, shareability,
  save-worthiness, **replicability for us**).
- `ig-postmortem`: for our own reels use the Graph API, not a scraper: **saves, shares,
  reach and average watch time** explain a result that views alone understate; views over
  reach shows rewatches, reach over followers shows cold traffic.
- **Install hazard:** `.claude/settings.json` runs `git pull --ff-only` on every session
  start, so the code would update itself from a stranger's repo.

### 6.2 `JSNGe/instagram-viral-reels-research-skill` (6f77d85, 2026-09-19), from `w-avw`
**Licence:** MIT ("Copyright (c) 2026 w-avw", preserved; `UPSTREAM.md`). Method credited to
Ava Yuergens (@personalbrandlaunch). `skills/viral-outliers/SKILL.md` 460 lines,
`scripts/getreel.sh`, `scripts/transcribe.py`.
**What it does:**
- **Two filters, in order** (SKILL.md "THE FILTER"): views >= 700,000 *and* views >= 5x the
  account's followers. "A reel with 3,800 views from a 700-follower account is 5X and is
  useless. It never reached anyone new." Above 500K followers use 5x their own median.
  Prefer templates from **1,000-100,000-follower accounts**. Cross niches freely: "The mold
  travels; the value does not."
- **Watch before writing:** download the MP4, pull at least six frames (10-12 for fast
  cuts) into a 3x2 ffmpeg contact sheet; "One frame lies".
- **Transcribe with settings that keep the hook:** faster-whisper `small` with
  `no_speech_threshold=1.0`, `log_prob_threshold=None`, `compression_ratio_threshold=None`,
  `vad_filter=False`; with defaults "Whisper silently drops the opening seconds" under music.
  **"The first line must read `[ 0.0s]`"** or the transcript is truncated. Four logged
  cases where the missing 4-12 s held the hook.
- **Caption, on-screen text and audio are three different scripts**; across sixteen
  outliers none of the captions repeated the video (an 8.9M-view reel's caption told a
  90-day story; its audio was one sentence).
- **Discard by function, not metrics.** "Lessons drive comments, stories drive shares."
  Seven hook types per idea (shock, comprehensive, common mistake, comparison, question,
  negative, tutorial): write all seven, pick one, keep six for later.
- **The template is literal:** count sentences against template steps; "More sentences than
  steps means there is filler." Never invent a line the user did not say; mark it
  `(TO CONFIRM)`. One card per outlier, named after the concept.
- Its CTA rule "Never 'link in bio' ... use ManyChat" contradicts our rule for paid apps
  (keep the link one tap away); ours stays, because the reason (each step loses a $1.99 buyer) holds.
- **Hazard:** discovery calls Instagram's private web API (`/api/v1/discover/web/explore_grid/`,
  `x-ig-app-id: 936619743392459`) inside the user's logged-in Chrome. That breaks
  Instagram's terms and risks the account; Business Discovery (Meta's API) is the allowed route.
  The explore feed is also personalised to the signed-in account.

### 6.3 `duvanchat2/trialr` (de725d7, 2026-07-22): batch trial reels
**Licence:** MIT. A local Vite app over the paid Zernio API. `server/zernio-api.mjs`
160-170 posts each video as its own reel with `trialParams: { graduationStrategy:
"MANUAL" }` and one shared caption, up to ten at once; `server/experiment-api.mjs` 7-18
stores ten metrics per variant (views, reach, impressions, likes, comments, shares, saves,
engagement rate, **`igReelsAvgWatchTime`**, total watch time); the "leader" is the top
variant on one chosen metric (`ExperimentsView.jsx` 99-101), with no significance check.
**For us:** confirms the method (several cuts of one film as separate trial reels, same
caption, same day) and that average watch time comes back per reel. **Skip** the app
(Zernio is a paid middleman; Postiz on a cloud service or the Graph API does the same).

### 6.4 `artemnovitckii/claude-editing-skills` `trial-reels` (beff6b8, 2026-10-30)
**Licence:** MIT ("Copyright (c) 2026 Artem Novitckii"). 11 editing skills on HyperFrames
and a Python kit (Groq transcription). `skills/trial-reels/SKILL.md` (61 lines):
- Step 3 (31-34): **three packagings of the same clip, each a different promise:** (1) the
  claim as a 3-line title with the key line bigger, (2) the hook rewritten as a post
  headline with avatar and name, (3) **the single number or comparison said in the clip**
  plus a 3-5 word line. "Change the promise, not just the paint" (59).
- Check (37-40): titles clear the top 220 px; captions under the face; the three look
  clearly different at a glance.
- **"Post all three as trial reels on the same day and keep the one with the best 3-second
  hold"** (61). "No invented numbers. The v3 stat must be something said in the clip" (60).

### What the four change in our process
1. Our trial-reel rule compares "24-hour views across two or three hooks". The code above
   judges on **3-second hold and average watch time**, then saves and shares; views alone
   understate. Insights show about 24 h in, so read at 24 h but decide on watch time.
2. Our outlier rule ("3x their usual views") has no baseline definition and no absolute
   floor. Sharper: median of the last 30 days after dropping the top 10 %; an outlier must
   also clear an absolute reach floor scaled to the niche (700k is for big niches; for iPhone
   tips accounts, pick the floor from the scan's own distribution and write it down), and
   prefer 1k-100k-follower accounts.
3. A format is read from the **video and its audio**, not the caption: six frames minimum and
   a transcript whose first line is `[ 0.0s]`.
4. Each film gets three packagings that differ in promise (claim, headline, a number said in
   the film), posted as trial reels on one day.
**Verdict:** **copy** points 1-4 into `social-media` and `product-video`; **skip** all four
installs (no licence on 6.1, ToS risk in 6.2, paid middlemen in 6.1-6.3, a self-updating hook
in 6.1).

## 7. Sound design for motion graphics

The save (@ultra.skills DfII6u2Nl_p, 2026-10-30) sits behind a DM; GitHub search on
2026-11-21 ("sound design skill") found four Claude sound-design skills. The closest to "a
sound-design skill for Claude motion graphics" is `Chefy3x/sound-design-skill` (created a week
after the save, built for scoring graphics); the match is UNVERIFIED. All four cloned.

### 7.1 `Chefy3x/sound-design-skill` (beaba6d, 2026-11-06)
**Licence:** none (no LICENSE file, GitHub reports none): methods only, no verbatim copy.
`sound-design/SKILL.md` 165 lines; `scripts/build_pack.py`, `slots.py`, `pick.py`.
**What it does:**
1. **Build one pack**: gather 50-150 sounds (own, Freesound CC0, ElevenLabs Sound Effects
   with "dry", "close", "muffled, recorded under a blanket", "no reverb", "short"; or record
   at a desk), run `build_pack.py` for a listening page with length, attack, peak and
   brightness, keep **one sound per slot, about 16 in all**, in seven families (Air, Contact,
   Hands, Status, Draw, Paper and Objects, Screen). "Once a slot is picked, it never changes
   between videos" (70).
2. **The pack's character, measured** (77-86): brightness at or under -5 dB, bin over +3 dB,
   where brightness = mean volume above 4 kHz minus mean volume below 900 Hz
   (`build_pack.py` 52-53, ffmpeg `highpass=f=4000` and `lowpass=f=900`); attack 3-20 ms;
   hits under ~0.8 s, whooshes under ~1.5 s; dry; literal. For repeats keep 2-3 takes of the
   *same* sound, never a different one (89-91).
3. **Placement rules** (99-118): movement gets a whoosh, a hit only where something is
   touched, one file per hit, never stacked; the loudest sound on the frame where the picture
   moves fastest, **peak aligned, not start**; **at most two whoosh families per video**;
   repeated elements get identical cues; front-load the first 2-3 s, then sparser; one hero per
   graphic; big moves in the speaker's pauses; no chimes under the voice; "If a 10 second
   graphic has 25 cues, cut the ticks and settles first."
4. **Levels** (122-125): overlays 0.07-0.2 linear in a composition, the hero 0.3-0.45.
5. **Time from the render, not the script** (129-140): `ffmpeg -i graphic.mp4 -vf
   "select='gt(scene,0.02)',metadata=print" -an -f null -` lists the frames of most change;
   place each cue's peak there; show the cue list (time, slot, file, level) before placing it
   on a long edit.

### 7.2 `kajisho5/sound-design-skill` (eaa36ea, 2026-11-20)
**Licence:** MIT. A Python CLI (ACE-Step for music beds, EzAudio for effects, both optional
local models). Methods worth having: a **stinger** is written only if its loudest 10 ms lands
within 10 ms of `--peak-at`; `sfx-cues` drops a cue closer than `--min-spacing` (0.25 s in its
example) to the last; `--min-reuse-spacing 30` stops the same file playing twice within 30 s;
a library file without a declared licence is never picked, and a licence is reported
"declared as", never "cleared". It warns that EzAudio was trained on YouTube audio not
licensed for training. **Skip** the tool; its generated music and effects would bring a
provenance question into store previews.

### 7.3 `dannyjpwilliams/ui-sound-design-skill` (MIT, 48 stars) and `FunwayHQ/sound-design-skill` (MIT)
Synthesised UI sounds in Web Audio, Tone.js and SuperCollider. Not for films. **Skip.**

### What it changes in `product-video`
`references/audio.md` section 3 already fixes one Mixkit id per event with a level and an
offset (tap click 1109 at 0.28, whoosh 1490 at 0.32, pop 2357 at 0.60, impact 2902 at 0.45),
and says to measure onset and peak. It lacks: a **measured brightness and attack gate** for
any new effect; **two whoosh families at most**; **identical cues for repeated
elements**; **a hit only where something is touched, movement gets a whoosh, never stacked**;
**variants of the same file for repeats** (rows of taps); **cue density** (front-loaded
opener, then sparse; one hero per graphic); and **timing cues from the rendered frames' scene
change**, not the storyboard. Our levels (0.28-0.60) run hotter than its 0.07-0.2 overlay
band because our films carry no voice; the rule to keep is "under the voice when there is one".
**Verdict: copy** those seven rules into `references/audio.md`.

## 8. Films and motion

### 8.1 Bang Motion, `bangtutorial/bang-motion` (c1aa65e, 2026-09-15, v1.19.0)
**Licence:** MIT ("Copyright (c) 2026 Bang Tutorial"). Written in Indonesian. `SKILL.md` 551
lines; `references/opener-konsep.md` 817, `techniques.md` 690, `explainer.md` 579,
`anti-ppt.md` 110; HTML starters and `scripts/export-frames.mjs` (Puppeteer to PNG to MP4).
Output is one `index.html` on GSAP that plays as a film.
**What it does, with the rules that are checkable:**
- **Mechanical "this is a slide deck" checks before handing over** (SKILL.md "Larangan
  struktural", 8 points): three or more scenes that are `<section>`s faded in and out is a
  deck; **more than two text levels in a scene** (kicker + title + body) is a deck;
  Ken Burns as the only motion is a deck; fade + scale bump + light leak on every cut is a
  template; a camera zoom under 1.08 leaving the subject thumb-sized is a deck; and the
  **template skeleton** (scene one text zooms in and exits left; **three feature tiles side
  by side**; a typed search box; **hook > feature > feature > promise > logo > CTA**): two or
  more of these without the concept demanding them means rebuild. "Fail one point, rebuild
  before showing the user."
- **Three concept candidates, one chosen** for what is "most convincing when SEEN, not what
  is easiest to build" (`opener-konsep.md` 14-18), from a menu of 19 concepts (55-75),
  among them 3 "problem > vanishes" (chaos tidied by one product action), 4 before/after
  with a moving divider, 8 "a living number", **9 "one feature demoed in full"** (input >
  process > satisfying result, other features only as flashes at the end), 15 "claim > how >
  result", 19 "product tour with interleaved claims".
- **Structure fingerprint**, one line per film: `concept · scene count · main object per
  scene · opener · closer` (20-23); the next film must differ in the concept or in 3 of the
  5 (25-27). The canonical parts (text zoom-out left, three tiles, typed search box, camera
  push-through, light leak, stacked logo + CTA end) may appear **at most two per film**
  (28-36).
- Timings from concept 15 (158-200): claim 1-2.5 s, how 2-6 s in real UI zoomed to ~80 % of
  the frame, result 4-6 s, two or three cycles, close 4-5 s; concept 19 (387-438): 25-30 s,
  10-11 beats of 2-5 s, only 1-2 hard cuts, **never two claims in a row**, claim words rise
  from blur 0.12-0.15 s apart, hold 1.5-2 s.
- **Style brief before code** (SKILL.md Hukum #3): palette from the brand with hex and
  source for each colour; a reference gives rhythm (shot length, transition kind, energy),
  never skin (palette, font, layout, lines, scene order).
**What it would change:** `product-video` phase 3 already asks for three directions from the
references and brand colours only. New: the **fingerprint line** (so each film for
Undirect and Cutling is checked against the last one, which matters with a calendar of
many short cuts), the **at-most-two-canonical-parts rule**, the **at-most-two text levels**
check, and concept 9 "one feature demoed in full" as a named default for a one-job utility.
**Verdict: copy** those four into `product-video` phase 3. **Skip** the HTML/GSAP pipeline
(a second film stack).

### 8.2 `/brag`, `latent-spaces/brag` (0637943, 2026-11-15)
**Licence:** MIT ("Copyright (c) 2026 Shunit Haviv Hakimi"). `skills/brag/SKILL.md` 181
lines, `brag-slim` 108, four step references. HyperFrames underneath.
**What it does:** reads the project, plans a 15-25 s film (hook 2-3 s > reveal 2-4 s > 2-3
highlights 5-12 s > outro 2-4 s; 176-179), renders it, writes one share caption.
Readability law (164): a short label holds ~0.8 s settled, a sentence ~0.3 s per word,
"Fast-in, then hold, never fast-in, then gone". "No generic SaaS language" (170).
`references/step-4-deliver.md` 48-75: **pick the poster at the strongest settled beat and
bake it into frame 0** (`ffmpeg ... overlay=0:0:enable='eq(n,0)'`, every other frame and the
audio untouched), because "Slack, Twitter/X, and Discord regenerate thumbnails server-side
and ignore embedded cover-art", taking frame 0.
**What it would change:** `product-video` sets an App Store poster frame
(`references/formats.md` 59) but nothing for social cuts, whose idle thumbnail on X and in
chats is frame 0, often a fade-in. **Verdict: copy** the frame-0 poster step into phase 7f
for every social cut; **skip** the rest (generic 20 s clips are the kind the owner rejected).

### 8.3 Remotion's own skills, `remotion-dev/skills` (6f55706, 2026-11-18)
**Licence:** the repo declares none; the skills point to Remotion's own licence
(`skills/remotion-license/SKILL.md`), which needs a company licence above its free tier.
**State in the house:** the earlier file (9.1) said none of Remotion's skills is installed.
That is out of date: `product-video/references/remotion/index.md` line 1 records a
distillation of `remotion-dev/skills@a2824c6`. GitHub's compare shows that commit is **5
commits / 137 files behind** today's head, mostly maps and template updates. One change
matters for films: `<TransitionSeries.Transition>` now takes
`motionBlur={{shutterAngle: 180, samples: 16}}` for every built-in presentation
(`remotion-markup/transitions.md` 188-191), and audio-timed scenes should measure each file
with `getAudioDuration` and set the duration in `calculateMetadata` (`remotion-markup/audio.md`).
**Verdict:** **refresh** the distillation against 6f55706 (transition motion blur); do not
install the skills beside it, since the house copy is already reconciled with the docs.

### 8.4 Others read
- `greensock/gsap-skills` (MIT): GSAP's API rules; a second stack. **Skip.**
- `artemnovitckii/claude-editing-skills` other ten skills (ranking list, explainer, split
  screen ...): talking-head formats. **Skip**; `trial-reels` is in 6.4.

## 9. OpenSEO, `every-app/open-seo` (af3f995, 2026-11-19)

**Licence:** MIT ("Copyright (c) 2026 Ben Senescu"). An app (DataForSEO data, billed by use)
with ten agent skills in `plugins/openseo/skills/`; read `keyword-research` (83 lines) and
`link-prospecting` (117).
- `keyword-research` workflow 1: with Search Console connected, start from first-party
  rows at **positions 5-20 with 50+ impressions**, hydrate them with volume and difficulty,
  then explore seeds; "Do not invent metrics ... write `unknown`"; reuse any research run in
  the last 30 days before buying it again.
- `link-prospecting`: query patterns `<topic> resources`, `best <category> tools`,
  `<competitor> alternatives`, `<topic> statistics`, `<topic> for <audience>`, at most 10
  queries a call; keep editorial pages, resource pages, comparisons and curated lists, drop
  homepages and thin affiliate pages; one outreach angle per prospect (broken resource,
  better data, useful tool, alternative inclusion, expert quote); record a contact only with
  the URL it was found on.
**For us:** the free half (query patterns, the five angles, contact-with-source) fits the
backlinks list we keep by hand in `backlinks.md`; the data half needs a DataForSEO top-up
the owner has not approved. **Verdict: copy** the five outreach angles and the query
patterns into the backlink procedure; **skip** the install until the owner agrees to spend.

## 10. Not found

- **"Instagram growth setup"** (@pete.creatives DfqYVy8hQi2, "the Claude app, a competitor
  watchlist, one prompt"): no repo or prompt found; the nearest code is 6.1-6.2. UNVERIFIED.
- **@getripping's trial-reels plugin "behind 2.3M views"**: not found under that name;
  6.3 and 6.4 are the two public trial-reel tools for Claude. UNVERIFIED.
- **Motion-style prompts** (@pedroaitech DewHjJFEpdL, @mgmtvictor DfQUzxjFMTW): behind
  the reels; Bang Motion's 19-concept menu (8.1) is the closest readable equivalent.

## Verdicts at a glance

| Repo (licence) | Install | Copy a part | Skip | Why |
|---|---|---|---|---|
| coreyhaines31/marketingskills (MIT) | | social cadence, test log, X rules, listening, carousel E; video beat sheet; directory copy and rel check; content thirds | the rest | generic SaaS; our skill already holds the buyer-first copy rules |
| AgriciDaniel/claude-seo (MIT) | | SXO page-type check; page-level nofollow; drift baseline | install | hook on every Edit/Write, advert footer; `site-design` already covers most |
| lhitches/* (MIT each) | | query-deserves-a-page, promote triggers, striking distance, AI-visibility protocol, risky-template gate, reddit extraction prompt | boardroom, schema, linking, trends MCP | duplicates or unofficial APIs |
| slavingia/skills (MIT in manifest, no LICENSE file) | | community list of people | install | written for one-to-one selling; "pick one platform" contradicts the owner |
| claude-ads (MIT) | | Apple Ads controls AP-S01/S02/M03; v5 API sunset 2027-01-26 | install | we run no paid ads |
| ComposioHQ competitive-ads-extractor | | | yes | no code, invented sample output |
| goose-skills (MIT) | | angle inventory; 3-in-10 mix; pattern link per post | install | needs the paid GooseWorks MCP |
| ig-radar-plugin (no licence) | | median-after-trim baseline; postmortem on saves, shares, watch time (methods only) | install | no licence; paid Apify; self-updating hook; score saturates at 1x median |
| instagram-viral-reels-research-skill (MIT) | | two filters; watch + transcribe from 0.0 s; discard by function; literal templates | install | drives Instagram's private API in the user's session |
| trialr (MIT) | | batch trial reels, watch-time metric | install | Zernio is a paid middleman |
| claude-editing-skills (MIT) | | three packagings, best 3-second hold | install | talking-head, HyperFrames |
| Chefy3x/sound-design-skill (no licence) | | seven placement and character rules (methods only) | install | no licence |
| kajisho5/sound-design-skill (MIT) | | stinger peak tolerance, cue spacing, licence "declared" | install | generated audio provenance |
| bang-motion (MIT) | | fingerprint line, two-canonical-part cap, two text levels, concept 9 | pipeline | second film stack |
| brag (MIT) | | frame-0 poster | rest | generic clips |
| remotion-dev/skills (Remotion licence) | | refresh house distillation to 6f55706 | install | already distilled into `product-video` |
| open-seo (MIT) | | outreach angles, prospect queries | install | paid data |

## Changes to make

Exact additions, each with the source it comes from (clone path `skill-repos/<owner>_<repo>/`
plus file and line), ordered by expected effect on sales of the two apps. Line numbers in our
files refer to `claude-house-rules/skills/social-media/SKILL.md` (83 lines) and
`~/.claude/skills/product-video/` as read on 2026-11-21.

### social-media

1. **Replace the trial-reel bullet (line 64-65) with:** "Each new film goes to Instagram as
   three trial reels on the same day, one per packaging: the claim as a title, the hook as a
   post headline, and one number the film itself shows. They differ in promise, not paint.
   Read them at 24 hours and keep the one with the best 3-second hold and average watch time,
   then saves and shares; views alone understate. That hook then goes to X, TikTok and
   Threads. (Needs 200 followers; a film already posted as a reel is never reposted as a
   trial.)" Sources: `artemnovitckii_claude-editing-skills/skills/trial-reels/SKILL.md`
   31-34, 59-61; `shafeela-bot_ig-radar-plugin/skills/ig-postmortem/SKILL.md` 23-26;
   `duvanchat2_trialr/server/experiment-api.mjs` 7-18 (`igReelsAvgWatchTime`).
2. **Add under "Reach and leads":** "Every post is a test logged in one sheet: date,
   platform, format, hook, views at 48 hours, average watch time, saves, shares, link clicks,
   and each app's installs that day from its App Store campaign link. A format wins on
   installs, not views. Once one wins it carries most posts, and one post in five tries a new
   format. A platform where posts stay under a few hundred views for a week pauses two or three
   days and changes format before posting more." Source:
   `coreyhaines31_marketingskills/skills/social/references/short-form-video.md` 203-217,
   230-240.
3. **Replace the outlier bullet (line 66-67) with:** "Formats come from outliers. Each
   account's baseline is the median views of its reels from the last 30 days after dropping
   the top tenth; an outlier is at 3x that or more and also clears an absolute floor written
   into the scan from its own spread, preferring accounts of 1,000-100,000 followers; posts
   under 10 days old are left to settle. A format is read from the video, never the caption:
   six frames or more and a transcript whose first line starts at 0.0 s (Whisper with
   `no_speech_threshold=1.0`, `log_prob_threshold=None`, `vad_filter=False`, or it drops the
   hook). Compare the top third with the bottom third and count each trait in both." Sources:
   `shafeela-bot_ig-radar-plugin/lib/outlier_scoring.py` 109-146;
   `JSNGe_instagram-viral-reels-research-skill/skills/viral-outliers/SKILL.md` 53-54, 62,
   156, 171, 198; `coreyhaines31_marketingskills/skills/reverse-engineer-marketing/references/content-teardown.md`
   19, 33-35, 86-91.
4. **Add to "Before writing anything", as step 4:** "Keep an angle list per app in its
   voice-of-customer file: each angle one sentence, one of pain, outcome, identity,
   switching, proof, contrast or objection, with verbatim quotes and links. Mine rivals' 1-2
   star reviews for gaps and claim one only when our app really does the difference. A Reddit
   thread counts only when reviews or comments say the same. Mark which angles we have never
   posted; the next calendar starts from those." Source:
   `gooseworks-ai_goose-skills/skills/shared/ad-angle-miner/SKILL.md` 121, 150, 198, 232-238.
5. **Add to "Approval and scheduling":** "In a calendar at most half the posts are mainly
   about an app and at least 3 in 10 help a stranger who has never heard of it. Each post
   names the example it is built on (account, post, date), and each comes with the two or
   three named accounts to reply to that day." Source:
   `gooseworks-ai_goose-skills/skills/marketing/run-organic-social/SKILL.md` 95, 99, 102.
6. **Add to "The post", X part:** "On X the claim and the topic sit in the first 8-10 words;
   original posts sit about an hour apart, since the ranker decays a second post from the
   same author; a post is written to be sent by DM and to earn a profile click, both scored
   on their own; video runs past ~8 s or earns no video credit; reply in the first 30
   minutes." Source: `coreyhaines31_marketingskills/skills/social/references/x-algorithm.md`
   29-33, 38-56 (its numbers are "reported", the scored signals "verified").
7. **Add a "Listening" section:** "Each morning pull Hacker News (Algolia `search_by_date`)
   and Bluesky (`app.bsky.feed.searchPosts`) for the apps' problem words and rivals' names,
   score each post on fit x2, intent x2, comment opportunity x2, reach and recency x1, drop
   anything over 24 hours old with 50+ comments, and draft at most ten replies at the tier the
   post earns. Reddit's `.json` refused this Mac with 403 on 2026-11-21: run it from
   a cloud session." Sources: `coreyhaines31_marketingskills/skills/social/references/listening.md`
   31-40, 58-77, 137-158; `lhitches_reddit-extract/skills/reddit-extract/SKILL.md` 35-45.
8. **Add to "The post":** "An Instagram carousel for an app follows the demo walkthrough:
   app and result, the pain, a slide listing the steps, one real cropped screenshot per step,
   the result; slide 1 stands alone, text at least ~28 pt at 1080 px, one CTA." Source:
   `coreyhaines31_marketingskills/skills/social/references/carousel-frameworks.md` 100-137.

### product-video

9. **`references/audio.md` section 3, add after the table:** "A new effect passes before
   use: attack 3-20 ms, hits under 0.8 s and whooshes under 1.5 s, dry, and brightness (mean
   volume above 4 kHz minus below 900 Hz, by ffmpeg) at or under -5 dB. Movement gets a
   whoosh; a hit goes only where something is touched, one file, never stacked; at most two
   whoosh families in a film; a repeated element gets the same cue every time, with 2-3 takes
   of the same file for a row of taps. Cues are densest in the first 2-3 s, then only story
   beats, one hero per graphic. Place each cue's peak on the frame of most change, found from
   the render (`select='gt(scene,0.02)',metadata=print`), not the storyboard." Source:
   `Chefy3x_sound-design-skill/sound-design/SKILL.md` 77-91, 99-118, 129-140 (no licence:
   rules restated, not copied).
10. **SKILL.md phase 7f, add:** "Every social cut gets a poster: the strongest settled frame,
    exported as a JPEG and baked into frame 0
    (`ffmpeg -i film.mp4 -i poster.jpg -filter_complex "[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v]" -map "[v]" -map 0:a? -c:a copy`),
    because X, Slack and Discord thumbnail frame 0; the JPEG is also the cover for platforms
    that take one." Source: `latent-spaces_brag/skills/brag/references/step-4-deliver.md`
    48-75.
11. **SKILL.md phase 3, add a go-back line:** "The storyboard's first line is the film's
    fingerprint: concept, scene count, main object per scene, opener, closer. It differs from
    the last film for the same app in concept or in three of the five. At most two stock parts
    per film (text zooming out left, three feature tiles, a typed search box, a push-through,
    a light leak, a stacked logo-and-CTA end), and at most two text levels in any scene. For a
    one-job utility, 'one feature demoed in full, input to satisfying result' is the first
    concept to weigh." Source: `bangtutorial_bang-motion/references/opener-konsep.md` 14-36,
    65; `bangtutorial_bang-motion/SKILL.md` 58-112.
12. **`references/research.md` section 3, add:** "Each reference film gets a beat sheet
    (time, shot, on-screen text, caption style, motion, sound) and a line of its 3-5 signature
    moves, with its cuts per second (ffmpeg `select='gt(scene,0.3)'`). Its words come from
    three places that differ: the caption, the on-screen text, and the audio transcribed from
    0.0 s; never read the film from its caption." Sources:
    `coreyhaines31_marketingskills/skills/video/references/edit-anatomy.md` 25, 49-62;
    `shafeela-bot_ig-radar-plugin/lib/ffmpeg_analysis.py` 23, 53;
    `JSNGe_instagram-viral-reels-research-skill/skills/viral-outliers/SKILL.md` 198-216.
13. **SKILL.md phase 3, add:** "A caption has settled at least 0.4 s before the press it
    describes, and no film ends on a recap." Source:
    `coreyhaines31_marketingskills/skills/video/references/code-rendered-product-films.md`
    72-74.
14. **`references/remotion/`:** bring the distillation from `remotion-dev/skills@a2824c6`
    to `6f55706` (5 commits, 137 files); add to `transitions.md` that
    `<TransitionSeries.Transition>` takes `motionBlur={{shutterAngle: 180, samples: 16}}` on
    every built-in presentation, checked against the pinned Remotion version first. Source:
    `remotion-dev_skills/skills/remotion-best-practices/remotion-markup/transitions.md`
    188-191.

### Also (outside the two skills)
- `site-design/references/seo.md`: before writing a page for a query, classify the top-10
  results' page types and match the dominant one
  (`AgriciDaniel_claude-seo/skills/seo-sxo/SKILL.md` 49-92); gate comparison and
  per-language page sets against Lily Ray's eight risky templates
  (`lhitches_seo-page-design/skills/page-design/SKILL.md`, layer 7).
- Backlink checks read page-level nofollow (`<meta name=robots>`, `X-Robots-Tag`) as well
  as `rel` (`AgriciDaniel_claude-seo/scripts/verify_backlinks.py` 121-157, 320-327), and
  each directory gets its own description (`coreyhaines31_marketingskills/skills/directory-submissions/SKILL.md` 53-54).
- `instagram-saves-social.md` 8.1 and 9.1 carry two out-of-date lines: FAQPage earns no
  Google feature since 2026-05-07, and Remotion's skills are already distilled in
  `product-video`.
