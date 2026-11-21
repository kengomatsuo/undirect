# X debut post for @monholtco: research log

Research for the pinned first post on @monholtco. Each finding carries its
source. Anything without a source is marked GUESS. Started 2026-11-21.

## 1. Debut conventions on X

### How this was searched (method, so the gaps are visible)

X search needs a signed-in browser and Claude in Chrome was off limits, so the "search bar" was:
open web searches in plain words (WebSearch, also restricted to x.com), Brave search with
`site:x.com` and phrases such as "just started", "first post", "introducing myself", "hello world",
"I'm building", "today we're launching" (Brave answered 3 queries, then HTTP 429), and every post
found was read through api.fxtwitter.com for its numbers (likes L, replies R, reposts RT, views V,
the author's follower count now, media, tags). Nitter is offline, xcancel answers 451, Reddit and
Indie Hackers block scripted reads (Indie Hackers was read through Wayback snapshots or search
snippets). So this is a sample of what open search surfaces, not a census.

### What the posts that came up look like, with their numbers

| Post | Author followers | Shape | Tags / media | Result |
|---|---|---|---|---|
| @MBabhulkar, 2026-10-22, x.com/MBabhulkar/status/2113316740176470308 | 20 | "Hi 👋 I'm a designer and mom of two ... we build apps at night as Zweikarta. We quit once ... This is our second try. I'll share what I design and learn" | none; text; mentions her partner | L1 R0 V31 |
| @shri_chaudhari, 2026-11-11, /status/2120621712291106930 | 257 | "Let's connect 👋 I'm a dad building GeldSpace ... Who are you and what are you building? Drop it below and I'll follow back 🤝" | #connect; text | L3 R4 V94 |
| @kooapps (company), 2024-03-22, /status/1771054213352640731 | 1,864 | "Hello world! We are Kooapps, an indie game developer ..." | 2 branded tags; photo | L2 R0 V260 |
| @openstatushq (company), 2023-09-22, /status/1705294712096051466 | 1,468 | "How do you like my makeover? 💅" + link | none; link | L10 R1 V273 |
| @CommandotStudio (company, 56 f), 2025-01-08, /status/1877054028074594399 | 56 | "Hello #IndieGameDev! We show you ours, you show us yours ... Reply with ..." | 7 tags; video | L11 R2 V522 |
| @Tobby2808, 2026-01-10, /status/2009948288158707714 | 38 | "I'm currently building a freelance website ..." | 3 tags incl. #BuildInPublic; 2 photos | L5 R1 V89 |
| @yadav_patle, 2026-01-10, /status/2009973507753726042 | 107 | "Raise your hand if ... Reply — I'm building the solution" | #BuildInPublic #Productivity | L5 R3 V74 |
| @gratia_001, 2026-01-10, /status/2009936473504510397 | 1,251 | "Started building my Clipping Agent yesterday ..." | 5 tags; photo | L8 R4 V375 |
| @RichieDbuilder, 2025-09-30, /status/1973070394870366659 | 29 | "here's my first progress report: 53 tweets, 748 impressions" | #BuildInPublic | L2 R0 V12 |
| @mattiapomelli (Sleek founder), 2025-10-31, /status/1984193081940537529 | 16,373 | "Been working on design generation for mobile apps ... Reply below if you want to try it out." | none; demo video | L24 R9 V2,750 |
| @PrajwalTomar_ (IgnytStudio founder), 2026-04-05, /status/2040722870444421389 | 56,921 | "I'm launching my app studio this month (IgnytStudio). The goal is simple: ship 2 mobile apps per month ... getting users? That's the part I've been stuck on" | none; text | L390 R17 V69,310 |
| @Shubham_iosdev, 2026-10-15, /status/2110649720326774872 | 9,254 | "Why do you build apps? For me, it's always been about ... What about you?" | none; text | L9 R3 V632 |

What this shows:
- **Views track the author's existing followers, not the tags.** Every account under ~1,300
  followers landed between 12 and 522 views whether it carried 0, 1, 3, 5 or 7 hashtags. The tagged
  posts from tiny accounts (Tobby 38 f: 89 views with three tags; Richie 29 f: 12 views with
  #BuildInPublic) did no better than the untagged Zweikarta debut (20 f: 31 views). The largest
  untagged intros (Prajwal, Sleek) did well because the founders already had 16k-57k followers.
- **No high-performing intro found carried a hashtag.** Tags show up mostly on low-reach posts,
  often in clusters of 3-7. The one 2022 maker log that credited hashtags ("Without hashtags, nobody
  would've found my tweets", Wilson Wilson, Indie Hackers, Jan 2022, read via Wayback) predates the
  2023-2026 ranking rewrite; the 2026 code does not rank by hashtag (section 4a).
- **The shape that works for founders who already have reach:** first person, what they are
  starting, a concrete goal or number, an honest problem, and an open question or offer. Zweikarta's
  "We quit once ... This is our second try" and Prajwal's "getting users? That's the part I've been
  stuck on" are the same honest-stake move the draft's "what breaks" makes.
- **"Hello world" from a company account is the weakest form found**: Kooapps (1,864 f, photo,
  two tags) 2 likes; openstatus's playful first posts 4-10 likes while its founder carried the story
  (x-studio-content-plan.md section 2).
- **"Reply with your project / drop it below and I'll follow back"** posts draw a few replies
  (Commandot R2, shri R4) and read as engagement solicitation, which X says Grok downranks (Bier
  2026-03-19) and the code can act on (`PROMOTES_REPLIES`, section 4a). "I'll follow back" is
  follow-for-follow, which X's platform-manipulation policy names ("coordinating to exchange
  engagement ... Follows", cited in `x-account-health-and-practice.md`).

### Intro threads, "who's here" posts and introduce-yourself replies

- **The live ones are run by big accounts, and the replies are where newcomers show up.**
  @buildinpublic (74,497 f), 2024-05-30, x.com/buildinpublic/status/1796184740430541087: "What are
  you building in public today? Share a screenshot!" L89 R85 V25,129. 85 makers replied with a
  screenshot. A reply there is seen inside that thread only (`OONRetweetReplyFilter`, section 4a),
  but the thread itself had 25k views. @_BuildInPublic_ (a bot account) invites accounts under 1,000
  followers to "introduce yourself to #buildinpublic Twitter" (WebSearch snippet of its profile).
- **Indie Hackers "let's follow each other on Twitter" threads** (several, 2021-2026, search
  snippets) are follow trains: replies are "just followed", no follower or reach numbers reported.
  Avoid: follow edges from accounts that follow everyone add little credibility mass in
  `user-cred-v2` (PageRank weighted by the follower's own score), and X's rules name coordinated
  follow exchange as manipulation.
- **An introduction framework from a founder with reach:** Daniel Priestley (89,932 f), 2025-03-08,
  /status/1898282655164035568 (L43 V3,110, talking video): "Name, Same, Fame, Aim, and Game": your
  name and business, what it is like that people already know, what makes you stand out, what you
  are working on in the next 90 days, the bigger vision. The draft has Name and Same ("a small
  studio making apps") and Aim ("I'll share what I ship"); it lacks Fame (a proof point) and a
  concrete Aim (a number or a date).

### Tagging and mentioning people

- Mention only people actually involved. The code drops repeated identical mentions
  (`DUPLICATE_MENTION`, drop for non-followers) and a new or "not graduated" author's mentions may
  never notify the person (section 4a). Tagging big accounts to borrow reach is the pattern the
  reply-spam LLM scores (`grox/core/lm/thread.py`, "Follower Count", "Reply Was Pasted").
- Mentioning @IndieHackers, @ycombinator or similar is pointless and reads as spam when they are not
  involved (owner's own instruction, 2026-11-21; consistent with X's "Check for past conversations
  to get context and create a personalized exchange", business.x.com organic best practices).


## 1b. Founders' and startups' first posts

**What open search shows: on X, launches are carried by a person, and the company account is close
to irrelevant on launch day.**

- **AgentCloak (Oct 2026), the clearest founder-versus-company split found.** Launch write-up by
  Subah Wadhwani (7,389 f), x.com/subahwadhwani/status/2112198236941455661 (an X article; L780 R38
  V523,667), read through api.fxtwitter.com: "We were starting from 0 awareness on X." The launch
  video was the founder on camera (Peter Yared, "Open on Peter's credentials ... Rant ... Demo the
  product"); results "2.2M views, 8,700 bookmarks ... 3,000 downloads ... 2,500 new followers for
  Peter". Today @peteryared has 7,991 followers and the company account @AgentCloakAI 157
  (fxtwitter, 2026-11-21). The reach came from the first hour: "The video is maybe 30% of a launch.
  The rest is ensuring its seen in the first few hours ... Bigger creators went first. They quote
  posted and commented right after launch, which got the post to 200k views in the first 60
  minutes. Smaller influencers came next."
- **Okara's launch playbook** (@askOkara, 79,670 f, 2026-10-12,
  x.com/askOkara/status/2109634876811170136, L25 V3,188; a vendor selling an influencer tool, so
  read its steps as practice, not data): one-page brief first; launch video under 2 minutes with no
  logo intro; "For a US audience, we've found that Tuesday after 9 AM ET can work well ... check
  that you're not launching on the same day as a major announcement"; tell friends, former
  colleagues and customers the date and time ahead, "send them a calendar invite"; "Reply to every
  comment and repost quote tweets throughout the day. Keep posting updates for the next 48 hours";
  "the first tweet shouldn't include a link. Otherwise, you won't be able to run ads on it."
- **Founder-voiced studio debuts that worked were from founders who already had followers**:
  Prajwal Tomar's IgnytStudio announcement (56,921 f, 69k views) and Mattia Pomelli's Sleek teaser
  (16,373 f, 2,750 views), both on the founder's own account, both without tags (section 1 table).
  The Zweikarta couple debuted on personal accounts with 20 and 257 followers and got 31 and 94
  views: founder voice alone does not create reach; existing followers and the first hour do.
- **openstatus**: the brand account's first posts got 4-10 likes; the co-founder's account carried
  the launch story (x-studio-content-plan.md section 2, from fxtwitter reads).
- **Measured founder-versus-company split (LinkedIn only; none found for X).** Jeremiah Ajayi,
  530 LinkedIn posts from six fintech companies (thejeremiahajayi.com, search snippet): founder posts
  had higher median engagement at every company, "from 1.9x at Mercury to 11.2x at Ramp", but
  routine product posts were at parity (0.99x). 5W PR, 18 months, 50 health-tech founders (eMarketer
  write-up, snippet): founder posts drove over 4x the qualified inbound of brand posts. Vendor claims
  for X ("3.4x" xpatla.com, "3-5x" smmnut.com) cite no data. No controlled split on X was found
  (Indie Hackers "Using personal or project Twitter account?" thread: anecdotes favour the personal
  account for build-in-public, the brand account for announcements).
- **Hashtags in founder and startup debuts:** none of the founder or startup launch posts found with
  real reach (AgentCloak, IgnytStudio, Sleek, Okara's examples, the "60+ viral startup launch
  videos" thread by @Motionsbyeddy, x.com/Motionsbyeddy/status/2071694912597479912, L1,267
  V139,470) used a hashtag. Tags such as #founder, #startup, #SaaS, #buildinpublic appear on the
  small-account posts in the section 1 table, at 12-375 views.
- **Mentioning @ycombinator, @IndieHackers or similar**: only when they are involved (a YC company's
  "Launch YC" post is tagged because YC is the investor). Nothing found where a cold mention of a
  big account helped a debut.

**What it means for @monholtco** (GUESS where marked): the draft is already in a founder's first
person ("I just started Monholt"), which is the voice that carries launches. But it runs on a
company account with 0 followers, and the owner's personal X account (@mctsuokengo, per
`docs/plans/app-store-growth/directory-actions.md`) is protected, so it cannot quote or amplify the
post publicly. The two levers the evidence supports are (1) putting a person in the post (a name, a
face or a short talking clip) and (2) arranging the first hour with people who will actually see
and react to it. Without either, the base rate for a 0-follower debut is tens of views (section 1).


## 2. X Communities in late 2026

**They are gone; do not plan around them.**
- Nikita Bier (X head of product), 2026-04-22, read through api.fxtwitter.com
  (`/nikitabier/status/2047041338106159484`, 11.6k likes, 12.1M views): "Due to declining usage,
  we're deprecating X Communities on May 6. To migrate your Community's members, pin your groupchat
  link ... we are investing heavily in niche communities with the launch of Custom Timelines".
- Bier, 2026-04-23 (`/nikitabier/status/2047180747690434994`): Communities "were used by less than
  0.4% of users—yet contributed to 80% of spam reports, financial scams, and malware on X ... that
  content should really live on Timeline or in chats".
- The retirement date moved to May 30, 2026 after backlash (TechCrunch 2026-04-23, updated;
  Engadget; Business Today 2026-04-24). Searches on 2026-11-21 found no report of a reversal.
- X's help page "Join a Community on X" (help.x.com/en/using-x/communities) was still served
  unchanged in a Wayback snapshot of 2026-11-15; it is a stale page, not evidence the feature lives.
  The live page refuses non-browser fetches (403), so it was read only through the archive.
- What replaced them: XChat group chats with public join links (350 members, rising to 1,000), and
  Custom Timelines (Grok-curated topic feeds, Premium). Custom Timelines are fed from ordinary
  posts by topic, so the debut reaches a "build in public" or "iOS apps" custom timeline only by
  being about that topic in plain words (GUESS on the matching method; X has not published it).
- Implication: "post it into the Build in Public community" is not available. The nearest working
  equivalents are a quote or reply in live threads where those people already are (section 4b) and,
  later, a joinable XChat group the studio runs itself (GUESS that one pays at 0 followers: it
  does not).


## 3. Media for a debut

No dataset on first posts or new accounts specifically was found; every number below is an average
over all accounts, so it is a prior, not a forecast.

- **Text vs image vs video, all accounts.** Buffer, "Best content format on social platforms in
  2026", 45M+ posts, published 2026-03-19 (buffer.com/resources/data-best-content-format-social-media,
  via search): X median engagement rate text 3.56%, image 3.40%, video 2.96%, link 2.25%.
- **Split by Premium.** Buffer, "Do posts with links affect content performance on X?", 18.8M posts
  from 71,000 accounts, figures as of Aug 2025 (buffer.com/resources/links-on-x, fetched 2026-11-21):
  regular accounts text ~0.40%, video ~0.25%, image ~0.20%, link 0%; Premium accounts text ~0.90%,
  video ~0.85%, image ~0.42%, link ~0.28%. With Premium, video is almost level with text and twice
  an image. @monholtco has Premium.
- **X's own product head on video for small accounts.** Nikita Bier, 2026-04-12,
  x.com/nikitabier/status/2043404323485589763 (L11,650 V15.8M), replying to a face-to-camera video:
  "People should make more talking videos like this on X. Easy way to get millions of impressions
  with basically no followers." The video he replied to (@RadicalFalk, "I'm leaving Germany |
  Brutally Honest Review", /status/2042957685717667981) is a person talking to camera: L23,118
  V8.4M. Bier also said copied content with no commentary gets cut ("just steal impressions from the
  real creators", /status/2043079481678795175, via piunikaweb.com 2026-04-13): original footage only.
- **X's business guidance.** business.x.com "Organic best practices" (archived 2026-08-22, cited in
  `x-account-health-and-practice.md`): images without heavy text, videos 15 seconds or less, and
  "Avoid using hashtags in your Post copy".
- **Faces.** Li & Xie, "Is a Picture Worth a Thousand Words?", Journal of Marketing Research 2020
  (via search summary): on Twitter, pictures with human faces raised engagement by 38% to 291%; the
  effect was absent on Instagram, where faces are common. Twitter-era data, nothing newer for X found.
  The AgentCloak launch (section 1b) opened on the founder's face; Daniel Priestley's intro framework
  post is a talking clip.
- **A product screenshot.** No measurement found for screenshots specifically on X. The @buildinpublic
  intro threads ask for one ("Share a screenshot!") and drew 85 replies. Sleek's founder debuted with
  a short demo clip (2,750 views on 16k followers).
- **What the debuts that came up used** (section 1): of the 12 read, the three with reach were text
  (Prajwal), demo video (Sleek) and talking/launch video (AgentCloak, Priestley); photos on small
  accounts (Kooapps, Tobby, gratia) did not lift them.

**Reading for the debut:** a short original clip with the founder's face and voice, or the
product doing its one job, is the best-supported media for a Premium account (Buffer Premium split;
Bier; Li & Xie). Plain text is the safe floor (Buffer: text tops every split). A stock image,
logo card or text-heavy graphic is the weakest choice (Buffer images last for regular accounts; X's
"without heavy text"). Whether the owner shows his face is his call; that a face lifts this
particular post is GUESS from the Twitter-era study.


## 4. What surrounds a debut, and the ranking code

### 4a. The ranking code (xai-org/x-algorithm, shallow clone at commit 269340c, 2026-11-21)

Paths are inside that repo. The fuller reading of this code is in
`x-account-health-and-practice.md` section 2; only what bears on a first post is here.

- **New-author lift.** `home-mixer/scorers/author_cold_start.rs` with `ColdStart*` params in
  `home-mixer/params/param.rs`: one post per feed request from an author with 50,000 followers or
  fewer, under 2 hours old (`ColdStartMaxPostAgeSecs` 7200) and under 200 home impressions
  (`ColdStartImpressionThreshold`), is placed at slot 15 or 16, chosen by Thompson sampling on its
  like rate (`sample_reward` uses `fav_count`). Only original posts qualify
  (`cold_start_base_eligible` excludes replies and reposts). Consequence for the debut: the first
  ~200 strangers' impressions are a like-rate test. Likes in the first two hours, not replies, are
  what the sampler reads.
- **Hashtags are not a ranking input in For You.** No file in `home-mixer`, `phoenix` ranking,
  `vm-ranker` or `xai-value-model` reads a post's hashtags as a feature. Hashtags appear in:
  (a) `simclusters/.../TweetEntityExtractor.scala`, which takes at most 4 hashtags per post
  (`MaxHashtagsPerTweet = 4`) as topic entities for SimClusters embeddings, so a niche tag can help
  the post be placed near that interest cluster; (b) `phoenix/xrex/data/recsys/history_id_lists.py`,
  which records a viewer's hashtag clicks as history; (c) the spam side:
  `grox/flows/ptos/state.py` has a `SpamHashTagAbuse` policy type, and
  `task_write_safety_post_annotations_result_sink.py` applies `SpamHighRecall` (dropped for
  everyone but the author) for any spam policy type not listed separately "if not
  is_high_page_rank_user". A four-day-old account is not high page rank, so a post the Grok
  classifier reads as hashtag abuse is hidden outright. One relevant tag is not abuse (the
  classifier's prompt is withheld; that one tag is safe is GUESS backed by X's own "1-2 hashtags"
  advice below).
- **Asking for replies can switch off the reply weight.** The same sink file maps
  `SpamPromotesReplies` to a `PROMOTES_REPLIES` label (and `SpamEngagementBaiting` /
  `SpamEngagementFarming` to `SpamHighRecall`). `home-mixer/scorers/vm_ranker_engagement_labels.rs`
  turns `PROMOTES_REPLIES` into `reply_ineligible`, and `vm-ranker/scoring/value_model.rs`
  (`exclude_ineligible_heads`) then sets `reply_score = None`, so the post loses the reply term
  (weight 5.0, 20.0 between mutuals) in ranking. The switch `VMRankerSendEngagementIneligible`
  ships `false` in the open-source params; whether production has it on is unknown. Nikita Bier
  (X head of product), 2026-03-19: "We are very close to Grok identifying direct solicitations for
  engagement & downranking accordingly" (cited in `x-account-health-and-practice.md`). The draft's
  closing question is a real question, not "reply below / RT", so it should read as conversation;
  that it will not be labelled is GUESS, since the classifier prompt is withheld.
- **Mentions.** `visibility-filtering` has `DUPLICATE_MENTION` (drop for non-followers): tagging
  the same accounts across several posts is a spam signal. One-off mentions of people who are
  actually involved carry no penalty in the code read.
- **"New account" filters and the "not graduated" label (notifications only).**
  `visibility-filtering/hydration/decode/author.rs`: an author is a "new account" for 72 hours
  (`NEW_AUTHOR_AGE` 72 h). `author_rules.rs` `NO_NEW_USERS_DROP_UNSPECIFIED` drops a new account's
  mention, reply and quote notifications for non-followers who turned on the "new accounts" filter;
  `NO_DEFAULT_PROFILE_IMAGE_DROP_UNSPECIFIED` does the same for an egg avatar;
  `NO_NOT_FOLLOWED_BY_DROP_UNSPECIFIED` for viewers filtering "people you don't follow". A separate
  author label `NotGraduated` (`NOT_GRADUATED_USER_LABEL_DROP_UNSPECIFIED`, `levels.rs`
  `NOTIFICATION_AUTHOR_LABEL_DROPS`) drops the author's notifications to every non-follower; it is
  not in the For You drop list (`OON_AUTHOR_LABEL_DROPS`), so it silences mentions, not the post. How
  an account graduates is not in the repo. An Indie Hackers maker reported X placing a new account in
  "graduated access" right after posting (search snippet of
  indiehackers.com/post/zero-followers-high-reach-how-to-get-impressions-on-x-in-2026-1dd99f725d;
  page itself blocked); a BlackHatWorld thread reports the notice text but no X source.
  **For @monholtco** (fxtwitter, 2026-11-21: joined 2026-11-18 07:08 UTC, custom avatar, banner,
  link to monholt.com, bio "Apps that do exactly what they say.", 0 followers, 12 following, 33
  posts, 0 media posts, blue check "individual"): it passed 72 hours on 2026-11-21 07:08 UTC, so the
  new-account filter no longer applies; avatar is set. Whether it carries `NotGraduated` is visible
  only to the owner at `x.com/i/jf/under_the_hood` (README, "Under the Hood Label Transparency
  Tool"). Consequence: a mention in the debut is not guaranteed to notify the person, so a mention is
  never the plan for reach.

- **Score weights** (`param.rs`): like 0.708, reply 5.0 (+15.0 mutual), quote 5.0, share via copy
  link 20.0, DM share 5.0, follow author 4.0, profile click 0, "not interested" -53.07, mute
  -58.8, block -31.2, report -234. For a debut, one stranger's "not interested" outweighs many
  likes' worth of predicted probability, so anything that reads as spam to strangers (a tag wall,
  a follow-train ask) costs more than it can earn.
- **Premium.** No ranking file reads the author's checkmark; Premium seeds the account in the
  `user-cred-v2` credibility PageRank (`isPremium`), which raises the score that exempts accounts
  from several spam rules. So the blue check helps the debut survive spam classifiers, not rank.


### 4b. Around the post: profile, timing, first hour, contacts, quotes, reply threads

- **Profile.** @monholtco now (fxtwitter, 2026-11-21): avatar, banner, link monholt.com, bio "Apps
  that do exactly what they say.", Premium check. Every filter in the code that keys on the profile
  is passed (custom avatar, account older than 72 hours). Profile clicks carry weight 0 in ranking,
  but "follow author" carries 4.0 (`param.rs`), and the 560k-impressions experiment's author warns
  "Impressions are useless if people visit your profile and leave without following" (Indie Hackers
  2026 guide, snippet). The bio says the motto but not who or what; naming the apps and the person
  in it is GUESS-grade advice (pinned-post vendor blogs, no data).
- **Pinned.** A pinned post is what a profile visitor reads first; no ranking effect in the code
  (no pin feature read anywhere in `home-mixer`). Pin it the moment it is posted.
- **Time.** `posting-times-countries.md` (this repo): X arm A is Mon-Thu 09:10 ET (21:10 WIB) from
  Buffer and Hootsuite; Sprout's tech slice says Tue-Thu 11:00-16:00 ET. Okara: "For a US audience
  ... Tuesday after 9 AM ET can work well ... check that you're not launching on the same day as a
  major announcement." US Thanksgiving is Thu 2026-11-26 and the Black Friday sale starts Nov 27
  (MEMORY: black-friday-sale-2026); a debut on those days competes with holiday feeds (GUESS).
  So: Tue 2026-11-24 or Wed 2026-11-25, 09:10 ET = 21:10 WIB.
- **First two hours.** The cold-start lift places the post in strangers' feeds for 2 hours or 200
  impressions, sampled on like rate (`author_cold_start.rs`). AgentCloak's first-hour seeding took
  its post to 200k views in 60 minutes (section 1b). Okara: "Reply to every comment ... throughout
  the day." A mutual follow raises the reply weight from 5.0 to 20.0 (`param.rs`), so replies from
  the ~12 accounts @monholtco follows count most if they follow back. Be at the keyboard for the
  first two hours and answer every reply with substance (a question back), not "thanks!".
- **Asking existing contacts.** Every launch write-up found tells people the date and time ahead
  (Okara: "Tell them you're launching on XYZ date at XYZ time ... send them a calendar invite";
  AgentCloak: "founder DMs sent before launch, with personal messages"). The line not to cross:
  X's platform-manipulation policy names coordinated engagement exchange; asking real acquaintances
  to read and answer the question is not that, a like-for-like ring is
  (`x-account-health-and-practice.md` section 5). Accounts X links to the same owner have their
  edges removed from credibility (`filterLinkedUserEdges`, user-cred-v2), so the owner's own
  second accounts add nothing there.
- **Quoting it from a personal account.** A quote is an original post, eligible for its own
  cold-start window (`cold_start_base_eligible`), and a predicted quote is weighted 5.0 against 1.0
  for a repost (`param.rs`). The owner's personal
  account @mctsuokengo is protected (`directory-actions.md`), so a quote from it is invisible to
  everyone but its approved followers; it only helps if he makes it public. GUESS: a quote that
  adds a line in his own voice about why he started the studio is the founder-voice pairing from
  section 1b.
- **Posting it into reply threads.** A reply is shown to non-followers only inside its thread
  (`OONRetweetReplyFilter`; `EnablePhoenixOonReplies` false); a pasted link reply in many threads is
  the duplicate-reply pattern the code labels `COPYPASTA_SPAM` for low-PageRank accounts
  (`BBQDuplicateTextRepliesProd.bot`). "Drop your link" threads are the "direct solicitations" Bier
  said Grok will downrank. The reply route that does work, by self-report: replying with substance
  to bigger accounts' fresh posts in the niche within 30-60 minutes drove ~80% of a zero-follower
  account's 560k impressions in 10 days (Indie Hackers, "How I got 560K impressions on X in 10 days
  with zero followers", search snippet; single unverified experiment). The @buildinpublic account's
  "What are you building in public today? Share a screenshot!" threads (74k followers, 85 replies on
  the 2024 one) are the one intro thread format found that is run by a hub account; no 2026 instance
  was found.
- **The #BuildInPublic retweet bot.** @_BuildInPublic_ (2,208 followers, 16,675 posts; bio "tag
  #BuildInPublic and I will RT it", made by @iamborisv). Whether it still runs in Nov 2026 could not
  be checked (X's syndication timeline answered "Rate limit exceeded"). Its reposts would reach its
  2,208 followers' Following feeds only; reposts from non-followed accounts are filtered out of For
  You (`OONRetweetReplyFilter`). This is the only mechanism found by which a hashtag moves reach, and
  it is small.

## Recommendation

### What the evidence changes in the draft

1. **Drop `#buildinpublic`.** Not because it is harmful (one relevant tag is not hashtag abuse),
   but because nothing found shows it helping: X's ranking code reads no hashtags (4a); every
   tagged debut from a small account landed at 12-522 views, the same as untagged ones (1); no
   intro with real reach carried a tag (1, 1b); X's own business guide says "Avoid using hashtags in
   your Post copy". The topic still reaches SimClusters through the words themselves
   (`TweetEntityExtractor.scala` takes named entities and keywords as well as hashtags). The only
   tag mechanism found, the @_BuildInPublic_ retweet bot, reaches about 2,200 followers and may be
   dead. If the owner wants the tag anyway, one tag at the end costs nothing measurable.
2. **Add proof.** The draft says what Monholt is but not that anything exists. Two apps are live; the
   founder intros that worked named the concrete thing (IgnytStudio's "ship 2 mobile apps per
   month", Sleek's demo). Priestley's "Fame" slot.
3. **Keep the founder's first person and the honest stake.** "What I ship, what breaks" matches
   Zweikarta's and IgnytStudio's honest-stake line, and founder voice is what carries launches (1b).
4. **Keep the closing question, as a real question, with no "drop it below" or "follow back".**
   Solicitation can switch off the reply weight (`PROMOTES_REPLIES`) and "follow back" is
   follow-for-follow (1, 4a).
5. **Stay under 280 characters**, so nothing hides behind "Show more" (GUESS-grade: X truncates
   long posts in the timeline; no reach data found on length).

### The post (277 characters, counted)

> I just started Monholt, a small studio making apps that do exactly what they say. Out now: Undirect stops surprise tabs in Safari; Cutling keeps your most-pasted text a tap away.
>
> I'll share what ships and what breaks.
>
> What do you expect your phone to do, but it just doesn't?

No hashtag, no mention, no link in the post. Link to monholt.com in the bio already; put the App
Store links in one reply under the post after the first replies arrive (link-in-reply per
`x-account-health-and-practice.md`; Okara: a link-free first post stays eligible for ads).

If the owner wants his name in it (founder voice, 1b), it fits only by cutting the app line; the
better place for the person is the media below. Whether to name himself is his call.

### Media

- **First choice: a 15-40 second clip, his face and voice, saying the same three things** (who,
  what is out, the question), shot on the phone with a few seconds of Undirect stopping a pop-up tab
  on screen. Sources: Bier, "talking videos ... millions of impressions with basically no
  followers" (3); Buffer's Premium split, video ~0.85% against text ~0.90% and image ~0.42% (3);
  Li & Xie, faces +38-291% on Twitter (3); AgentCloak opened on the founder (1b); X's "videos 15
  seconds or less" (3). Captions burned in, since many watch muted (GUESS).
- **If no face: a 10-15 second screen recording of Undirect blocking a surprise tab**, no logo
  intro (Okara: "Don't waste time on logo animations"), or text alone. Text alone is the safe floor
  (Buffer: text first in every split).
- **Not**: a logo card, a "Hello world" graphic, or a text-heavy image (Kooapps, 2 likes; X's
  "images without heavy text").

### Before posting

1. Open `x.com/i/jf/under_the_hood` signed in as @monholtco and check for labels such as
   `NotGraduated` or `SpamHighRecall` (README of xai-org/x-algorithm). If any shows, fix that first:
   a labelled account's debut is wasted.
2. Pick the slot: **Tue 2026-11-24 or Wed 2026-11-25, 09:10 ET = 21:10 WIB** (`posting-times-
   countries.md` arm A; Okara "Tuesday after 9 AM ET"). Not Thanksgiving (Thu Nov 26) or the Black
   Friday sale days (Nov 27-30) (GUESS on holiday dilution).
3. Two or three days ahead, message 5-15 real people who know him or the apps (buyers who wrote in,
   developer friends, the indie developers he has actually talked with) with the day and time and
   one line: "would love your answer to the question". No "please like and RT" (Okara; AgentCloak;
   platform-manipulation policy, 4b).
4. Make sure the profile names what and who (bio: the motto plus the two app names; GUESS-grade).
5. If the owner is willing, make the personal account public so it can quote the post; while it is
   protected, a quote from it reaches nobody new (4b).

### The first hour (and the full two-hour window)

1. Post, then pin at once.
2. Stay on it for two hours: the new-author lift lasts 2 hours or 200 impressions and is sampled on
   likes (`author_cold_start.rs`). Answer every reply within minutes with a follow-up question; a
   reply from a mutual follower is weighted 20.0 against 5.0 (`param.rs`).
3. Post the App Store links as one reply under the post, once, after the first replies.
4. Spend the rest of the hour replying with substance to fresh posts (under an hour old) from the
   indie Apple developers it follows and similar larger accounts, never with the link and never the
   same text twice (560k-impressions experiment, self-reported; `BBQDuplicateTextRepliesProd.bot`;
   reply LLM inputs "Reply Was Pasted", "Num Replies Last 24 Hours").
5. Do not drop the post into "drop your link" threads or follow trains (Bier 2026-03-19; 4b).

### The first day

1. A second original post 4-6 hours later, a different shape (one of the build-in-public drafts in
   `x-studio-content-plan.md` section 3), so it gets its own 2-hour window (GUESS that spacing beats
   bunching; the window itself is code).
2. Turn the best replies to the question into the next posts, quoting the reply with something added
   (a quote is weighted 5.0 and counts as an original; `param.rs`, `cold_start_base_eligible`).
3. Follow back real people who answered; skip accounts that only follow for follow (4b).
4. Expect tens to a few hundred views from a 0-follower start, as every comparable debut found got
   (section 1 table). The post's job is the pinned first impression for every later profile visitor,
   so judge it over weeks, not the first day (GUESS framing, backed by the base rates).

### Not available any more

X Communities were retired on 2026-05-30 (section 2). There is no community to post the debut into.
