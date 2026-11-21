# Is X limiting @monholtco, and how should it act on X

Research for the owner's question of 2026-11-21: "Isn't the following on monholt so suspiciously
little? X is technically just shadow banning us." Each finding names its source; anything without
one is marked GUESS. Written as findings land, so the order is the order of research.

## Account facts (read 2026-11-21)

- Joined November 2026; 30 posts, 2 following, 0 followers; not verified. (Profile, read by the
  brief's writer.)
- From `docs/plans/app-store-growth/social-posts.md`: between Nov 18 and Nov 21 the account sent
  about 30 X posts, nearly every one carrying an outside link: 10 directory-listing posts (L1-L10)
  scheduled half an hour apart on the night of Nov 20, 11 replies on "drop your startup link"
  threads (8 on Nov 20 alone, four of them within five minutes, 17:45-17:50 WIB), and launch posts.
  Replies 18-25 each named both apps with links.

## Findings

### 1. What X says it does to reach

Help Center pages are behind a Cloudflare challenge for scripts, so they were read from the
Wayback Machine's copies, each dated below.

**Search ("About search rules and restrictions", help.x.com/en/rules-and-policies/x-search-policies,
archived 2026-10-08).** X "filters search results for quality posts and accounts", and "may
automatically remove accounts engaging in these behaviors from search (or even suspend in some
cases)". The behaviours listed: "Repeatedly post duplicate or near-duplicate content (links or
posts)", abusing trending topics or hashtags, automated posts or replies, "similar messages based
on keywords", similar messages over several accounts, and "Aggressively follow and unfollow
people". It also says that a search-filtered account still reaches its followers, and "If you post a
reply or mention to a specific person, it will be delivered to that person."

**Authenticity / platform manipulation (help.x.com/en/rules-and-policies/platform-manipulation,
"April 2025" version, archived 2026-11-11).** Under "Content Spam", not allowed:
- "Sending bulk, aggressive, high-volume unsolicited replies, mentions, or direct messages";
- "repeatedly posting or sending direct messages consisting of links shared without commentary, so
  that this comprises the bulk of your post/direct message activity";
- "promoting content by replying with content that is irrelevant to the topic of the original post";
- "posting and deleting the same content repeatedly";
- "repeatedly posting identical or nearly identical posts" ("Copypasta").

Under "Engagement Spam", not allowed: "coordinating to exchange engagement in any X features, such
as Likes, Polls, Replies, Reposts, Lists, Views, or Follows"; "follow churn"; "indiscriminate
following – following and/or unfollowing a large number of unrelated accounts in a short time
period"; "engaging with posts aggressively or through the use of automation to drive traffic or
attention to accounts, websites, products, services". Enforcement starts with "Anti-spam
challenges" (a lock asking for a phone number or a puzzle) and "Restricting Reach: ... excluding
posts from search results, trends, and recommended notifications, removing posts from the For You
and Following timelines, restricting a post's discoverability to the author's profile ... and
downranking the post in replies."

**Enforcement options (help.x.com/en/rules-and-policies/enforcement-options, archived 2026-11-07).**
The same list of post-level limits, plus: "Starting in April 2023, posts identified as violating our
Rules will begin to receive labels informing both post authors and viewers that we limited the
post's visibility. Authors will be able to submit an appeal on the label." Account-level options
include read-only mode and an ownership challenge; an account locked pending a challenge "is
removed from follower counts, Reposts, and Likes".

What this means for @monholtco:
- A post-level limit is supposed to carry a visible label ("Visibility limited ...") on the post,
  seen by its author. A whole-account search filter carries no label by this text. So the first
  check is the account's own posts: any label means a post-level limit; none means no post-level
  enforcement was applied, though a search filter cannot be ruled out from this alone.
- The account's own pattern sits close to three of the listed behaviours: links make up nearly all
  of its posts ("links shared without commentary, so that this comprises the bulk"), eleven
  unsolicited promotional replies in two days, eight of them on one afternoon, four within five
  minutes ("bulk, aggressive, high-volume unsolicited replies"), and ten listing posts with links
  queued half an hour apart (near-duplicate link posts). Replies on threads that *ask* for links are
  on topic, so they are not "irrelevant", but the volume and link share are what the rule names.
- Joining a "follow train" or "follow for follow" thread is "coordinating to exchange engagement
  ... Follows", which the rule forbids outright.

**Premium prices (help.x.com/en/using-x/x-premium, archived 2026-11-17).** United States, web:
Basic $3/month or $32/year, Premium $8/month or $84/year, Premium+ $40/month or $395/year.
Indonesia, web: Basic Rp33,750, Premium Rp120,000, Premium+ Rp654,000 a month. What each tier
claims for reach: Basic "reply prioritization", Premium "larger reply prioritization" and the
checkmark (after a review), Premium+ "largest reply prioritization". The page puts no number on it.

**Verified Organizations / Premium Business (help.x.com/en/using-x/verified-organizations,
archived 2026-11-04).** Full Access $1,000/month ($10,000/year) plus $50/month per affiliate; Basic
$200/month ($2,000/year), gold checkmark and square avatar. Its reach claim is "Reach more customers
organically", with no number.

### 2. What the open-sourced code says (xai-org/x-algorithm, 2026)

The current release is `github.com/xai-org/x-algorithm`, updated daily (last commit 2026-11-21);
`twitter/the-algorithm` (the 2023 Scala release) was last pushed 2025-09-08 and no longer describes
what runs. Read from a shallow clone on 2026-11-21; paths below are inside that repo.

**There is a self-check, and it is the real answer to "are we limited".** The README's "Under the
Hood Label Transparency Tool" section: "lets people see aggregate statistics about the
visibility-impacting labels on their account and posts", at `https://x.com/i/jf/under_the_hood`,
"one can see the outcomes of these systems (and whether they affect their own account)". It is
"piloting" and "expanding availability over time", so it may not open for every account. The owner
opens it signed in as @monholtco; nothing else shows hidden labels.

**How a limit works: labels, then visibility filtering.** For each post and viewer the filter
answers ALLOW, NOTICE, INTERSTITIAL or DROP (README, "Labeling Path"). The relevant rules, in
`visibility-filtering/rules/tweet_rules.rs` and `author_rules.rs`:
- `SPAM_HIGH_RECALL` on a post, or `SpamHighRecall` on the account: drop for every viewer except the
  author (`audience: NonAuthors`). The author still sees the post normally, so from inside the
  account nothing looks wrong. This is the code behind a "ghost ban".
- `RISKY_HIGH_VIZ_REPLY`, `DOWNRANK_SPAM_REPLY`, `UNTRUSTED_URL`, `DUPLICATE_MENTION`: drop for
  non-followers (some only for viewers with the quality filter on).
- `DUPLICATE_CONTENT`, `LOW_QUALITY`, `SMYTE_SPAM_TWEET`: drop for everyone but the author.
- These levels cover the home timeline, recommendations and notifications
  (`visibility-filtering/rules/safety_level.rs`); search and reply order are served elsewhere and
  are not in this repo.

**Who gets labelled: low-follower, low-credibility accounts, and only those.** Every automatic
enforcement rule first skips accounts with a high follower count or a high credibility score
(`abuse-enforcement-service/service-lib/rules/enforcement_user.yaml` and `enforcement_post.yaml`,
rules `high_follower_count` and `pagerank_skipped`; the shipped thresholds are mock values, "Prod
uses a different ... threshold"). The duplicate-text and bad-URL rules skip a "high page rank"
author, defined in `botmaker-rules/scarecrow/derived-feature/IsHighPageRankUser.df` as a UserCred
score of at least 54 (`HighPageRankThreshold.df`), or more than 25,000 followers when no score
exists. A zero-follower account is therefore in the group every one of these rules can act on.

**The rules that match what @monholtco did:**
- Duplicate replies: `botmaker-rules/scarecrow/bot/BBQDuplicateTextRepliesProd.bot` clusters replies
  with duplicate text (jobs `bbq_duplicate_text_unigrams_replies`) and labels each `COPYPASTA_SPAM`,
  unless the author is high page rank or grey-verified. `BBQDuplicateTextProd.bot` does the same for
  original posts. Blue (Premium) is not an exemption here; only grey (government) and PageRank are.
- Every reply is read by a language model. `grox/flows/reply_spam/`: replies in threads whose
  root or parent has over 250,000 followers are scored by Grok on a 0-3 rubric
  (`classifier_reply_ranking.py`; the score is published as the reply's "reply ranking score");
  replies in smaller threads go to a Gemma spam scorer (`task_filter.py`,
  `task_spam_detection.py`). A score of 0 applies `RiskyHighVizReply` to the reply
  (`task_write.py`), which drops it for non-followers, unless the author's UserCred score is at
  least 66 (`constants.py`, `RISKY_HIGH_VIZ_REPLY_EXEMPT_MIN_PAGE_RANK_SCORE = 66`) or grey-verified.
  The prompts are withheld, but the signals the model is shown are in `grox/core/lm/thread.py`:
  "Num Replies Last 24 Hours", "Follower Count", "Reply Was Pasted", "Has Missing Client Events",
  "TFE Top Country", "Account Language", "Has Risky User Safety Label" and "Num Legit Blocks Received
  Last 24 Hours". A zero-follower account sending eight pasted promotional replies in an afternoon
  shows the model exactly the profile a reply spammer has.
- Fast reply spam: `enforcement_post.yaml` rule `act_add_fast_reply_spam_post_label` labels a post
  `SpamHighRecall` for 30 days; `llm_slop_post` gives `RiskyHighVizReply` for 30 days.
- Account level: `enforcement_user.yaml` turns model labels such as `bb1_reply_spam_bot_bounce`,
  `bb1_post_spam_bot_bounce`, `llm_slop_user` and `spam_high_recall_7d` into an account-wide
  `SpamHighRecall` label (7 or 30 days) and often a "liveness check"; the bounce rules both label and
  challenge. A challenge (a phone, captcha or "Arkose" puzzle prompt) would have been seen at
  sign-in; a label alone shows nothing.
- Low-quality links: `LQ_Tweets_With_LQ_URL_Verdict_At_Mention_To_NonFollower_v2.bot` labels a post
  `SPAM_HIGH_RECALL` when its link's redirect chain has a `LOW_QUALITY` verdict and is not on the
  GOOD list, again unless high page rank or grey.

**Credibility (the successor of TweepCred).** `user-cred-v2/` runs PageRank over follow edges and
like and repost edges from the last 7 days (`UserCredV2App.scala`, `UserCredV2Config.scala`), with
the random jump ("teleport") mass split between an even share for every Premium, verified-org or
VO-affiliate account (`ValidUserInfo.isPremium`) and a share earned from engagement weighted by the
engager's own mass (`engagement_teleport_beta` 0.5, jump probability 0.2). The score is
`165.2 + 7.07 × ln(mass)`, clamped to 0-100 (`UserCredV2.scala`). So credibility comes from being
followed, liked and reposted by credible accounts, and paying for Premium puts the account in the
seed set. Edges between accounts X links as the same owner are removed (`filterLinkedUserEdges`),
so the owner's other accounts following @monholtco add nothing. The old TweepCred cut for following
far more than followed applied only above 2,500 followings (`twitter/the-algorithm`,
`src/scala/com/twitter/graph/batch/job/tweepcred/Reputation.scala`); no such cut is in
user-cred-v2.

**Ranking in For You (`home-mixer/params/param.rs`, production defaults per the README).** Score =
Σ weight × predicted probability: like 0.708, reply 5.0 (plus a 15.0 boost when viewer and author
follow each other), repost 1.0, quote 5.0, share 2.118, share via DM 5.0, share via copy link 20.0,
follow author 4.0, open link 0.2, click 0.274, profile click 0; not interested -53.07, mute -58.8,
block -31.2, report -234. A link click is worth little; a reply, a quote, a DM share or a copied
link is worth a lot; one "not interested" outweighs dozens of likes' worth of probability.
- **Cold-start lift for new authors** (`home-mixer/scorers/author_cold_start.rs`, params
  `ColdStart*`): per feed request, one post from an author with 50,000 followers or fewer, under 2
  hours old and under 200 home impressions, is lifted to slot 15 or 16, picked by Thompson sampling
  on its like rate. It applies only to **original posts**: `cold_start_base_eligible` excludes
  replies (`in_reply_to_tweet_id.is_none()`) and reposts. A reply-only account never gets it.
- Out-of-network posts are discounted, and replies and reposts from followed accounts too
  (README "Out-of-Network Discount"); the `OONRetweetReplyFilter` removes replies and reposts from
  accounts the viewer does not follow. So a reply by @monholtco reaches a stranger's For You feed
  never; it is seen only inside the thread.
- No author boost for Premium or verified exists in the ranking path: no ranking file reads the
  author's checkmark or subscription (searched `home-mixer`, `phoenix`, `xai-value-model`,
  `vm-ranker`). The checkmark's effect in this code is the seed mass in user-cred-v2, which raises
  credibility and with it the enforcement exemptions above.
- Author diversity decay is off in the shipped weights (`home-mixer/scorers/value_model.rs`,
  `enable_author_diversity: false`).

### 3. Shadowban checkers, and what was measured for @monholtco on 2026-11-21

**How the public checkers work.** They are the four tests shadowban.eu published in 2018, now run by
forks (the one answering in 2026 is `shadowban.yuzurisa.com`, API at
`shadowban-api.yuzurisa.com:444/<handle>`): a logged-out **search** for `from:handle` (search ban),
the **typeahead** search suggestion (search-suggestion ban), whether a reply by the account appears
under its parent for a logged-out viewer (**ghost** ban), and whether it is hidden behind "Show more
replies" (**reply deboost**, `more_replies`). Since X closed logged-out search in 2023, the two search
tests mostly return errors. Vendor guides in 2026 (techbuzzireland.com 2026-05-22, dev.to,
dicloak.com) still describe these tests; none shows the hidden labels described above, which only
X's Under the Hood report does. They read what a guest sees, not what For You recommends.

**Result for @monholtco** (curl, 2026-11-21 ~15:50 WIB, four tries):
- First try: `"ghost":{"ban":false,"tweet":"2123839689421476235","in_reply_to":"2123935304461746318"}`,
  `"more_replies":{"ban":false,...}`; `"search":"_error","typeahead":"_error"`. Profile exists, not
  suspended, has posts.
- The other three tries returned `"Internal error"` or nulls; a control run on @jack and @levelsio
  errored too, so the service is flaky and the search tests cannot run at all.
- So: no ghost ban and no reply deboost on the one reply it tested; search unknown.

**Each logged post fetched from X's public embed endpoint** (`cdn.syndication.twimg.com/tweet-result`,
19 of the 20 URLs in `social-posts.md`): every one is live and public, none tombstoned, and
**every one has 0 likes**. Two replies show one reply each under them (to @sl1ma4 and
@PitchProtocol, both threads whose owner answers each reply), so those replies were delivered and
seen by the thread owner. Timestamps confirm the bursts: four replies 10:51-10:55 UTC on Nov 20, and
four 00:21-00:24 UTC on Nov 21.

**Under the Hood eligibility.** TechCrunch (2026-08-13, techcrunch.com/2026/08/13/x-open-sources-
its-ranking-algorithm-letting-users-see-if-theyve-been-shadowbanned/): for "users who have posted 10
or more times over the past month", and "initially be available to a test group of accounts at least
a year old as a pilot". The code gates it behind a feature switch (`under-the-hood/strato/lib/
params.strato`, `under_the_hood_report_enabled`, default false) and reports by calendar month. A
November 2026 account is very likely outside the pilot; worth one try anyway.

### 4. Limited, or new and unknown?

What a limit would look like, and what is seen:

| Sign | If X were limiting the account | Seen on @monholtco |
|---|---|---|
| Label on a post ("Visibility limited") | post-level enforcement (enforcement-options page) | none reported by the owner (GUESS: not checked post by post) |
| Lock, phone, captcha or puzzle prompt | anti-spam challenge, the first enforcement step | none reported |
| Reply missing for a logged-out viewer | ghost ban | not missing (checker, one reply) |
| Reply under "Show more replies" | reply deboost | no (checker, one reply) |
| Thread owners answering | replies delivered | two owners answered |

Why the numbers are small without any ban, all from the code and help pages above:
1. **Followers come from being seen, and almost nothing the account posts is eligible to be seen
   by strangers.** Replies never enter a non-follower's For You (`OONRetweetReplyFilter`); the
   cold-start lift is for original posts only, and the originals were directory-listing link posts
   that drew 0 likes, so the Thompson sampler (rewarding likes per impression) had nothing to pick.
2. **0 followers means 0 in-network reach** for every original post.
3. **Credibility starts at the floor**: no follows, likes or reposts from credible accounts, no
   Premium seed mass.
4. **Replies on link-drop threads compete with hundreds of others** (the 16VC thread had 504
   replies, `social-posts.md`), the reply ranker sees "Follower Count: 0" and the reply rate, and
   link-drop threads draw makers who are there to post their own link, not to buy or follow.
5. **Four days old.** The account joined in November 2026 and its first post was Nov 18.

**Verdict: unclear, leaning no.** Nothing measurable shows a ban, and a new account with zero
followers whose activity is almost all replies and link posts explains 0 followers and 0 likes on
its own. But the account's own pattern sits on the exact triggers in the code
(fast, near-identical promotional replies with links from a zero-follower, non-exempt account), and
those labels (`SpamHighRecall`, `RiskyHighVizReply`, `COPYPASTA_SPAM`) are invisible to the author.
Only Under the Hood can rule them in or out, and it likely does not open for this account yet. So
the course of action is the same either way: stop producing the trigger pattern now, and build
the follower and credibility base that exempts an account from the label rules.

### 5. Best practice for a small business or maker account, 2025-2026

Each line names its source; "code" means a path in `xai-org/x-algorithm` as read above.

**X's own guidance**
- "Organic best practices" (business.x.com/en/basics/organic-best-practices, archived 2026-08-22):
  concise copy, "Avoid using hashtags in your Post copy", a clear call to action, no all-caps, a
  conversational tone; images without heavy text, videos 15 seconds or less; a content calendar and a
  bank of evergreen posts; "Monitor indirect mentions of your brand (like keywords)"; "Check for past
  conversations to get context and create a personalized exchange".
- "About rules and best practices with account behaviors" (help.x.com/en/rules-and-policies/
  x-rules-and-best-practices, archived 2026-06-03): "Automated proactive following and automated
  un-following are not allowed ... aggressively or indiscriminately following hundreds of accounts
  to get attention"; "repeatedly posting duplicated and unsolicited replies to many accounts is
  considered spam behavior"; "We may filter accounts from search if they're degrading the search
  experience ... (by posting lots of duplicate links, for example)".
- Limits ("About X limits", help.x.com/en/rules-and-policies/x-limits, archived 2026-11-10): 400
  follows a day ("a technical account limit only, and there are additional rules prohibiting
  aggressive following behavior"); "50 original posts and 200 replies per day for unverified
  accounts", split into half-hour limits; ratio limits after 5,000 followings.

**Following: whom and how many**
- Following count is not a ranking input in the 2026 code. The only ratio rule ever published cut
  credibility for accounts following more than 2,500 (`Reputation.scala`, 2023); it is not in
  user-cred-v2. So 2 following is not why reach is low, and following more does not raise reach by
  itself.
- What following does: it fills the account's own feed with the posts it should be replying to
  (Thunder serves followed accounts' posts, README "Candidate Sources"), and a mutual follow raises
  the reply weight between the two accounts from 5.0 to 20.0 (`BidirectionalFollowReplyWeightBoost`
  15.0, `param.rs`), so mutuals see each other's posts more. Follows from credible accounts raise
  @monholtco's credibility (`user-cred-v2`); our follows of them raise theirs, not ours.
- SimClusters only treats an account as "known for" a cluster from about 400 active followers
  (`simclusters/simclusters_v2/scalding/UpdateKnownForApps.scala`, `minActiveFollowers` default
  400). Until then, out-of-network discovery depends on Phoenix retrieval and the cold-start lift.
- How many: X sets only the 400-a-day technical cap and forbids "aggressive" and "indiscriminate"
  following without a number. Operators' advice for a new account is 10-20 bigger niche accounts to
  reply to daily (Indie Hackers roadmap posts, 2026; vendor-grade sources). A pace of 10-20
  hand-picked follows a day is GUESS, chosen to stay far from "large number of unrelated accounts in
  a short time period".
- Follow-back: business.com ("advice for following back on social media") and Circleboom advise
  following back accounts that fit the brand's audience or are complementary, not everyone. The
  code adds a reason: a mutual follow lifts reply weight, so following back real peers who engage
  is worth it; following back follow-train accounts adds nothing and joining a follow train is
  "coordinating to exchange engagement ... Follows" (platform-manipulation policy).
- Lists: a private X List watches rivals or reply targets without following them (X feature;
  that it keeps the following list clean is GUESS-level etiquette, not a ranking rule).

**Liking and bookmarking**
- A like from @monholtco gives the liked author credibility mass (`UserCredV2App.readEngagementEdges`
  counts favorites and reposts) and tells Phoenix what @monholtco likes to see; it does nothing for
  our own reach. Likes on our posts carry weight 0.708 on predicted probability and drive the
  cold-start sampler (`author_cold_start.rs`, `sample_reward` uses `fav_count`).
- Bookmark is not among the scored actions (README "Scoring and Ranking"; `param.rs` has no
  bookmark weight). Use it as a private save list only.
- Mass liking "aggressively ... to drive traffic or attention" is engagement spam (policy).

**Reposts against quotes**
- Repost weight 1.0, quote 5.0 (`param.rs`). Reposts by followed accounts are discounted and reposts
  from non-followed accounts are filtered out of For You (`OONRetweetReplyFilter`).
- A quote is an original post: it is neither a reply nor a repost, so it is eligible for the
  cold-start lift (`cold_start_base_eligible`), and it can be ranked for strangers. A plain repost
  is neither. So: quote with something added when a third party mentions an app; repost only to
  pass along a post we have nothing to add to.

**Replies**
- A reply is seen only inside its thread by non-followers (`OONRetweetReplyFilter`, and
  `EnablePhoenixOonReplies` false in `param.rs`).
- Every reply is scored by an LLM with the replier's follower count, reply count in the last 24
  hours and whether it was pasted (`grox/core/lm/thread.py`); a 0 hides it from non-followers
  (`task_write.py`). Replies in threads under 250,000 followers go to the spam scorer, larger ones to
  the Grok ranker that orders replies.
- X is downranking the posts that ask for replies: Nikita Bier, 2026-03-19, replying to a request to
  "kill the 'reply XXXX + RT' thirsty boi posts": "We are very close to Grok identifying direct
  solicitations for engagement & downranking accordingly." (x.com/nikitabier/status/
  2034668641304895664, read through X's public embed endpoint). "Drop your startup link" posts are
  direct solicitations, so the threads themselves are headed down, and replies inside them with them.
- X suspended accounts that automate replies with AI agents (piunikaweb.com, 2026-05-28, paraphrase
  only), removed 42,000 reply-automation accounts (startupfortune.com, 2026-07-25), and from
  February 2026 lets API replies through only when the original author mentions or quotes the
  replier (roboin.io and piunikaweb.com, 2026-02-24).
- First 30 minutes: no rule in the code names it. The 2026 code keeps posts in For You for 48 hours
  (`AgeFilter`) and lifts new authors' originals only in their first 2 hours
  (`ColdStartMaxPostAgeSecs` 7200). Early replies sit higher in a thread mostly because there are
  fewer of them yet (GUESS; the "be present for the first 30 minutes" line in
  `saved-skills-code-review.md` is tagged "reported" in its own source).
- Link in post or link in reply: X's product head said on 2026-07-28 "you do not need to put the
  links in replies anymore", and Musk on 2026-07-29 "We haven't for over a year" (penalised links)
  (ppc.land, 2026-07-30). The code has no link-specific weight beyond `OpenLinkWeight` 0.2. Buffer's
  18.8 million posts (Aug 2024 - Aug 2025, buffer.com/resources/links-on-x, 2025-10-14) found link
  posts from free accounts at a 0% median engagement rate after March 2025, against 0.40% for text;
  Premium link posts about 0.28%. The two disagree on cause, not on outcome: for a free account a
  bare link post earns nothing. So the post carries the pain and the claim, and the link goes in our
  own reply under it or in the bio.

**Posting frequency**
- Author diversity decay is off in the shipped weights (`value_model.rs`), so the "one hour apart
  because of the author-diversity decay" rule in `saved-skills-code-review.md` and the
  `social-media` skill no longer has that reason. Spacing still helps: each original competes for
  the single cold-start slot in a viewer's feed, and the lift lasts 2 hours (code above), so posts
  spread over the day each get their own window (GUESS that spreading beats bunching).
- Operator advice disagrees: 3-5 originals a day under 1,000 followers, or 1-3 strong posts a week
  (vendor and Indie Hackers posts, 2026, unverified). Buffer's medians say text posts do best for
  free accounts (links-on-x above).

**X Premium and Verified Organizations**
- Price: Premium $8/month ($84/year) in the US, Rp120,000/month in Indonesia; Basic $3 (no
  checkmark); Premium+ $40. Premium Business Basic $200/month, Full Access $1,000/month (help pages
  above).
- What the code shows Premium does: puts the account in the credibility seed set (`user-cred-v2`,
  `isPremium` covers blue, gold, grey, verified org and affiliates; Basic has no checkmark and is
  not in it). No author boost in For You ranking. Blue is not an exemption from the duplicate-reply
  or bad-URL rules; only grey and a high credibility score are.
- What X says it does: "reply prioritization" (Basic), "larger" (Premium), "largest" (Premium+),
  with no number (help.x.com/en/using-x/x-premium).
- What was measured: Buffer, 18.8 million posts from 71,000 accounts, Aug 2024 - Aug 2025
  (buffer.com/resources/x-premium-review, 2025-10-02): median impressions per post under 100 for
  free accounts, about 600 for Premium, over 1,550 for Premium+; median engagement rate 0% free
  against about 0.49% Premium. Observational: Premium accounts are also the more active and larger
  ones, which Buffer says "doesn't account for" the whole gap, but no controlled test exists.
- Verified Organizations at $200-1,000 a month buys a gold check and ad credits; nothing in the code
  or Buffer's data isolates its reach for a two-app studio.

**Spam signals to avoid (all from the policy pages and code above)**
- Many near-identical replies: `BBQDuplicateTextRepliesProd` clusters replies by unigram overlap.
  Replies 22 and 23 (Nov 21, two minutes apart) both open "Two small apps for iPhone, iPad and
  Mac."; replies 18, 19, 20 and 25 all carry "two small quality-of-life apps" (public embed text,
  read 2026-11-21).
- Replies in bursts, pasted, from a zero-follower account (the reply scorer's inputs).
- Links as the bulk of activity ("links shared without commentary, so that this comprises the
  bulk").
- Mass follows, follow churn, follow trains, likes or follows traded for a boost. The iPip boost
  flow logged for draft 3 includes a "follow tick" before "Done, start my boost"
  (social-posts.md); if that tick or the boost trades follows or likes between participants, it is
  "coordinating to exchange engagement" (GUESS: what the boost does was not read for this file).
- Several accounts of the same owner engaging each other: the edges are removed from credibility
  (`filterLinkedUserEdges`) and the policy forbids using multiple accounts to "amplify one of your
  own accounts".
- Automation that posts or replies: "Unauthorized automation" (policy) and the "Has Missing Client
  Events" signal. Whether replies typed by a browser-driving agent look automated to X is GUESS;
  the risk is real enough that replies should be typed at human pace, not pasted in bursts.

## Course of action for @monholtco

Cost first: everything below is free except step 8, which is $8/month (Rp120,000) and waits for the
owner's yes. Nothing here has been done; this file only recommends.

**1. Check for hidden labels (owner, once, 2 minutes).** Signed in as @monholtco, open
`https://x.com/i/jf/under_the_hood`. If it opens, any `SpamHighRecall`, `RiskyHighVizReply`,
`CopypastaSpam`, `DuplicateContent` or `DownrankSpamReply` label answers the question; appeal it
there. If it does not open, the account is outside the pilot (a year old, 10 posts a month;
TechCrunch 2026-08-13), and the plan below goes ahead as if a label might exist.
Expected effect: a yes-or-no answer instead of a guess. Source: README "Under the Hood".

**2. Stop, starting today.**
- Link-drop threads ("drop your startup link", "what are you building", "promote your URL"): stop
  for two weeks, then at most one a day, only where the host answers each reply, written fresh, one
  app, no link if the host's thread shows profile cards (GUESS on that last test). Why: they are
  direct solicitations X is downranking (Bier 2026-03-19), the reply scorer sees a zero-follower
  account replying in bursts, and two weeks of them gave 0 likes and 0 followers (embed counts).
  This changes the standing go in memory `startup-link-replies-standing-go.md` and the social-media
  skill's "Replies on drop your link threads"; the owner decides.
- Bursts: never more than one reply in any ten minutes (GUESS on the number; the burst pattern and
  "Num Replies Last 24 Hours" are the code's inputs).
- Repeated openings: no two replies or posts share a sentence or opening (`BBQDuplicateText*`).
- Link-only posts: no more directory-listing posts like L1-L10; a listing gets mentioned inside a
  post about a pain, at most once a week (policy: links as "the bulk" of activity; Buffer: 0%).
- Engagement trades: no follow trains, no boost that needs a follow tick, no likes from the owner's
  other accounts (policy; `filterLinkedUserEdges`).
- Pasting replies at machine speed: replies are typed at human pace, or typed by the owner (GUESS
  on detection; signals "Reply Was Pasted" and "Has Missing Client Events").

**3. Follow 40-60 accounts over the first week, about 10 a day, each hand-picked.** Kinds, with
counts (GUESS on counts; no source sets one):
- 8-10 places that already list us and post about apps: @macpiphq, @ipiphq, @getindieapps,
  @mac_native, @picconedoro (NativeShelf), MacBase, Product Hunt, AlternativeTo, Mac Browse, Mac App
  Index (handles to confirm on X before following).
- 15-20 indie Apple developers with 1k-100k followers who post about their own Mac and iOS apps
  (Safari extensions, clipboard and keyboard tools, menu-bar utilities): peers whose followers are
  our buyers, and who follow back peers (mutual follow lifts reply weight to 20.0, `param.rs`).
- 5-10 writers and sites that cover small Apple apps (Mac and iOS app reviewers, newsletters).
- 5-10 people who posted the pain itself (Safari redirect or pop-up complaints; "I keep typing my
  address") and whom we answered.
- Everyone who replies to, quotes or mentions us with a real account: follow back.
Do not follow: follow trains, celebrities, link-drop hosts who are not makers, rivals (put rivals
in a private List). Expected effect: a feed of reply targets, and follow-backs from peers, which
are the first credibility edges (`user-cred-v2`). Source: section 5.

**4. Each day, about 30-45 minutes (operators' figure: 30 minutes a day of replies, Indie Hackers
2026, unverified).**
- 1-2 original posts, text first, the pain and a number in the first line, no link in the post, the
  link in our own reply under it (Buffer 2025; Bier 2026 says links are fine, but for a free account
  a link post's median was 0). Spread at least 3 hours apart in the US slots already in
  `posting-times-countries.md`. Why: only originals and quotes get the new-author lift, for 2 hours
  and under 200 impressions, picked on like rate (`author_cold_start.rs`). At least one post in
  three helps a stranger with no app in it (social-media skill).
- 5-10 replies to the accounts in step 3, on their posts from the last hour or two, each adding a
  fact, a fix or a question that only someone who builds these tools would know, with no link and
  no app name unless asked. Why: a reply is a 5.0-weight action for them, it puts our name in front
  of their followers inside the thread, and a reply that is useful scores above 0 with the reply
  model (`grox/flows/reply_spam`).
- Quote, don't repost, when someone mentions an app or posts the pain we fix: add one line of
  substance. Why: quote weight 5.0 against 1.0, and a quote is an original post eligible for the
  lift (`param.rs`, `cold_start_base_eligible`). The Nov 27 Arabic quote of @APPS_RH already fits.
- Like freely the posts we actually read in the niche (it costs nothing and shapes what For You
  shows us to reply to); bookmark reply targets for later. Neither changes our reach.
- Answer every reply to our own posts within the day: a reply that the author engages raises the
  conversation's predicted replies (reply weight 5.0) (code; effect on our post GUESS).

**5. Once a week.** Check followers, likes per original, profile visits and App Store taps from the
X link tag, and log them beside `social-posts.md`. Drop what earned nothing for two weeks.

**6. After two weeks.** If originals still get 0 likes and fewer than ~50 impressions each while
peers' replies are answered, open Under the Hood again and post a question in X's help forum; that
pattern after a clean two weeks would point at a label, not at newness (GUESS on thresholds).

**7. Expected outcome.** No source gives numbers for a two-app studio. Buffer's median free account
sits under 100 impressions a post; the first 100 followers are the slowest (Indie Hackers 2026
roadmap, unverified). A realistic first target is 50-100 followers in a month from peers and
people helped (GUESS).

**8. Premium: test it, one month, only on the owner's yes. Cost $8/month (Rp120,000), not Basic.**
For: Buffer's 10x median reach gap and 0% vs ~0.5% engagement; X's "larger reply prioritization";
the code puts Premium accounts in the credibility seed set, which is the route to the exemptions
that protect replies from the spam labels (scores 54 and 66). Against: Buffer's study is
observational, the code shows no ranking boost for the checkmark, and blue does not exempt
duplicate replies. Basic ($3) has no checkmark and is not in the seed set (`ValidUserInfo.isPremium`).
Recommendation: start it after step 2 has run clean for a week, so the test is not paying to
amplify the old pattern; compare impressions per original for the two weeks before and after.
Verified Organizations ($200-1,000/month): no, nothing measured supports it at this size.

## Earlier decisions this research contradicts

- `social-media` skill and memory `startup-link-replies-standing-go.md`: a standing go to keep
  replying on "drop your link" threads. The evidence above says pause them (step 2).
- `social-media` skill, "originals about an hour apart", from `saved-skills-code-review.md` (author
  diversity decay): that decay is off in the shipped 2026 weights (`value_model.rs`). Spacing stays,
  for the cold-start window instead.
- `saved-skills-code-review.md` lists "profile click" among scored actions: its production weight
  is 0.0 (`param.rs`, `ProfileClickWeight`).
- `social-lessons.md` "Links": the link-in-reply rule stays, but X's product head said in July 2026
  that links no longer need to go in replies; the rule now rests on Buffer's free-account data.

## @ryangrowthh video, "14 X growth tips" (watched and transcribed 2026-11-21)

Source: https://x.com/ryangrowthh/status/2123951780535161185 (12.7k followers, 10.5k views; his own claim: 10k followers in 35 days, self-reported, and he sells content help, so treat numbers as his).
- Profile is the sales page: show a face; bio says what you do, who for, with proof; banner repeats the message; pinned post is a recent post you are proud of or a deep dive into the product.
- Talk to one specific reader (niche), not everyone.
- Quality cadence for founders: 3-5 posts a day, 4-8 hours apart, because a creator's own posts compete with each other.
- Digestible: lists, graphics, white space; write so a 12-year-old can read it (short sentences, small words, active voice, no jargon).
- Quote posts on posts already trending or with strong early engagement are among the most boosted formats.
- Grow inside a group: engage with people in the niche; X is a web, not a silo.
- Give free value (guides, PDFs, agent skills) and deliver what you promise.
- 2-4 "heavy" pieces a week: threads, articles, long video; quick thoughts do not bring followers.
- Hook = curiosity gap + promise + proof, end on a takeaway.
- Study why posts go viral (topic, hook, angle, CTA); copying is detected as duplicate and does not convert.
- Video: he says 40% of X impressions are video and long-form video gets 5x median reach (no source given); face on camera brought him 1,000-follower days.
- Block time for creative work (his: 1 hour daily writing, a multi-hour session weekly).
- Paid tool he recommends: Grok at $40/month as an X researcher (cost: owner's call).
