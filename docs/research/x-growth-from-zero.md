# What grows a new X account from about zero followers: originals, replies or quotes

Research for the owner's message of 2026-11-23: "we aint getting traction at all. should we continue
replying/quoting instead? research I'm telling you". Card ASG171.

Written as each finding lands, so the order is the order of research. Every finding names its
source (a URL, or a path in `github.com/xai-org/x-algorithm`); a line with no source is marked GUESS.
Nothing was liked, followed, replied to or posted while researching.

Earlier files this builds on, not repeated here: `x-account-health-and-practice.md` (2026-11-21:
spam rules, credibility, the first ranking read), `x-engagement-mix.md` (2026-11-22: 398 posts of 14
small Apple-app accounts counted by kind), `grok-x-review.md` (2026-11-22: Grok's advice and 21 of
its claims checked against the code).

## 1. X's ranking code, read deeper (xai-org/x-algorithm at its head, pushed 2026-11-21T03:11Z)

Files read through the GitHub API on 2026-11-23. The questions: how does a post from an author with
3 followers reach anyone who does not follow it, what happens to a reply, what happens to a quote,
and what does Premium change.

### 1.1 How a post reaches strangers: retrieval comes before ranking

For You has two kinds of source (README, "Candidate Sources"): **Thunder** returns recent posts from
accounts the viewer follows; **Phoenix retrieval** and SimClusters find posts from accounts the viewer
does not follow. A post that no source returns for a viewer is never ranked for that viewer, so no
boost can reach it.

- With 3 followers, Thunder offers each post to 3 people.
- Phoenix retrieval asks for up to 1,000 posts per feed request, of which up to 200 may come from a
  "cold" pool (`home-mixer/params/param.rs`: `PhoenixMaxResults` 1000, `PhoenixColdStartMaxResults`
  200; `home-mixer/sources/phoenix_source.rs` passes both to `retrieve_excluding`).
- **The out-of-network corpus is a file named `1fav_1day`.** Phoenix's home dataset is
  `HOME = (1, *_sid_window("1fav_1day.parquet"))` (`phoenix/xrex/data/retrieval_dataset.py`), and the
  index builder writes it from a window called `1fav` beside `post_creation`, `32fav` and
  `1fav_reply` (`phoenix-rankall/src/config/mod.rs`, `PipelineKind::Main.window_configs`). The names
  say "posts of the last day with at least one like" (a post enters on its first like); the code
  that fills the window is upstream of this repo, so that reading is an inference from the names,
  not a line of code. Two things support it: the repo also holds a separate `ZeroFav` retrieval
  type, served as `ForYouPhoenixRetrievalZeroFav`, which X is testing on a bucket of authors only
  (`home-mixer/filters/zero_fav_codivert_filter.rs`; `AuthorZeroFavCodivertIsTreatment` default
  false), and the home index for replies is its own window, `1fav_reply`.
- **The cold pool is the 1-like corpus cut to small, fresh posts**: `HOME_COLD` keeps the posts with
  fewer than 8 likes and fewer than 500 views (`phoenix/xrex/data/cold_pool_filter.py`,
  `cold_pool_mask(max_favs=8, max_views=500)`), no older than 2 hours
  (`DEFAULT_COLD_START_MAX_AGE_SECONDS = 2 * 60 * 60`, applied by `fresh_post_mask`); everything else
  is `HOME_HOT`.

What it means for @monholtco: a post's first like matters more than any later one. Until a post has
a like, it is very likely outside the pool that strangers' feeds are filled from, and at 3 followers
the only people who can give that like quickly are the followers and whoever lands on the profile.

### 1.2 The new-author lift, with its numbers

Re-read in full in `home-mixer/scorers/author_cold_start.rs` and `param.rs` (all are code defaults):

- Eligible: an original post (not a reply, not a repost), author at 50,000 followers or fewer, post
  2 hours old or less, under 200 home impressions, ranked above the bottom 3% of the viewer's scored
  candidates (`cold_start_base_eligible`, `ColdStartFollowerCap` 50000, `ColdStartMaxPostAgeSecs`
  7200, `ColdStartImpressionThreshold` 200, `LowImpressionsMaxPositionRatio` 0.97).
- Per feed request, one eligible post is lifted to rank 15 or 16 (`ColdStartSlotMin` 15,
  `ColdStartSlotMax` 16; `record_cold_started_posts(arm, 1)`).
- Which one: Thompson sampling on its like rate per home impression. Each post's draw comes from
  Beta(0.75 + likes, 49.25 + impressions - likes), so a post starts as if it had a 1.5% like rate
  and moves with real likes and views (`sample_reward`; `ColdStartBetaAlpha0` 0.75,
  `ColdStartBetaBeta0` 49.25, `ColdStartImpressionScale` 1.0). The two best draws go through, and
  the one the ranking model scores higher wins (`ColdStartTsTopK` 2, `pick_thompson`).
- The lift works only on a post that was already retrieved for that viewer (1.1).

So the order for an original from a 3-follower account is: followers see it, one of them likes it,
it enters the out-of-network pool, it is retrieved for strangers, and among the new authors in a
stranger's feed it wins slot 15 or 16 if its likes per view beat theirs. Each original gets 2 hours
at this.

### 1.3 Replies: shown in the thread, never in a stranger's feed

- `home-mixer/filters/oon_retweet_reply_filter.rs`: a reply from an account the viewer does not
  follow is dropped from For You unless `EnablePhoenixOonReplies` is on; it is off by default
  (`param.rs`, `rust_home_mixer_enable_phoenix_oon_replies` false; `PhoenixOonRepliesRootOnly`
  false). The code to show out-of-network replies with their parent exists
  (`phoenix_reply_ancestors_hydrator.rs`), so X has built it and keeps it switched off.
- A reply never gets the new-author lift (`cold_start_base_eligible` requires
  `in_reply_to_tweet_id.is_none()`).
- So a reply is seen by the person replied to (in notifications) and by readers who open that
  thread. Its value is who reads it, not how far it travels.
- How replies are ordered under a post is not in this repo: it covers "post visibility in the For
  You timeline" (README, "Deployment-related code"), and the file tree holds no conversation
  ranker. What is in it: a Grok model (Grok 4 Mini) scores each
  reply 0 to 3 when the parent or the thread's root has more than 250,000 followers, and the score
  is stored as the reply's "reply ranking score"; replies in smaller threads go to a Gemma spam
  scorer instead (`grox/flows/reply_spam/task_filter.py`, `TaskReplyRankingFilter` and
  `TaskSpamFilter`, split at `GROK_GEMMA_FOLLOWER_SPLIT = 250_000`; `classifier_reply_ranking.py`;
  `task_write.py`). A 0 also labels the reply `RiskyHighVizReply`, hiding it from non-followers,
  unless the author's credibility score is 66 or more or the account is grey-verified
  (`constants.py`, `RISKY_HIGH_VIZ_REPLY_EXEMPT_MIN_PAGE_RANK_SCORE = 66`). The scoring prompt is
  rendered with a "large account" line at 100,000 followers (`reply_scoring_system_prompt(100_000)`)
  and is withheld "to reduce gameability" (`prompts.py`).
- The signals the reply scorer sees, from the earlier read of `grox/core/lm/thread.py`: the
  replier's follower count, replies in the last 24 hours, whether the reply was pasted, missing
  client events, account language and blocks received.

### 1.4 Mutual follows: the one boost aimed at small accounts' originals

`docs/BIDIRECTIONAL_BOOST_CHANGE.md` in the repo: "the bidirectional follow boost boosts original
posts from people you mutually follow by increasing the weight on the predicted probability that
you'll reply to a post from one of those authors who you mutually follow." Tested from July 10,
2026, rolled out at 20 on July 13, set to 15 on July 24 (linked announcement:
x.com/nikitabier/status/2076747704248758617). Today's default: `ReplyWeight` 5.0 plus
`BidirectionalFollowReplyWeightBoost` 15.0, so a mutual's original is scored with a reply weight of
20 instead of 5 (`param.rs`).

What it means: every mutual follow with an active account puts @monholtco's originals higher in that
account's feed. Replies are how mutuals start (the peer sees the reply, opens the profile, follows
back); originals are what the mutual then sees.

### 1.5 Quotes: an original that carries someone else's post

- A quote is neither a reply nor a repost, so it passes every test above that a reply fails: it is
  in-network for followers, eligible for out-of-network retrieval and for the new-author lift
  (`cold_start_base_eligible`), and it is not dropped by `OONRetweetReplyFilter`.
- The ranker sees the quoted post's text and media as part of the candidate
  (`home-mixer/candidate_hydrators/quote_hydrator.rs` fetches the quoted text, photo, video and
  durations; README, "quoted post" among the hydrated features). The quote is dropped for a viewer
  the quoted author blocks, and for anyone if the quoted post was itself dropped (`AncillaryVFFilter`).
- Quote weight is 5.0 (`QuoteWeight`), the same as a reply, against 1.0 for a repost.
- Nothing in the repo sends a quote to the quoted author's followers. The quoted author is told in
  notifications (X's product behaviour, not in this repo; GUESS for the exact rule).

So a quote is an original with a borrowed subject: it needs the same first like as any original,
and it gives the quoted author a reason to look at @monholtco.

### 1.6 Premium in the code

GitHub code search on 2026-11-23 for `premium`, `is_blue_verified` and `subscription`: no hit in
`home-mixer/scorers`, `vm-ranker`, `xai-value-model` or `phoenix/xrex/models`, so no ranking weight
reads them (as in `grok-x-review.md`, row 14). Premium's effects in
this repo stay where the earlier read found them: credibility seed mass in `user-cred-v2`, and
"reply prioritization" in the Help Center, which works in the conversation view that is not in this
repo.

## 2. What @monholtco did and got (read on x.com in Chrome, 2026-11-23 09:17 to 09:40 WIB)

Profile: 45 posts, **8 following, 3 followers**. Views, replies and likes were read from each
post's own counter on the Posts and Replies tabs; times are WIB, taken from the post IDs.

**The 3 followers**: @Deweythe2 (B2B SaaS growth), @dievokke (Brazilian tech account) and
@manu_zurcher (maker of Pommit; bio "NO AI WRITTEN POSTS"). All three are followed back. None makes
or writes about Apple apps.

**The 8 followed**: those three, @XCreators, and four directories (@mac_native, @MacBaseApp,
@ipiphq, @macpiphq). Of the ten hand-picked follows logged on Nov 21 in `social-posts.md`, only
@MacBaseApp and @mac_native are still followed; @JustinasRoland0, @iPritamX, @picconedoro,
@DanielSmidstrup, @Guronnimo, @sl1ma4, @PitchProtocol and @getindieapps are not. So today the
account follows no maker of Apple apps, and its own feed shows it almost nothing to reply to.

**Originals and quotes, 20** (the Posts tab, one repost of @macpiphq left out):

| WIB | Post | Views | Replies | Likes |
|---|---|---|---|---|
| Nov 18 14:30 | Cutling launched on MacPip | 11 | 0 | 0 |
| Nov 19 10:08 | Undirect is on MacBase | 18 | 0 | 0 |
| Nov 20 09:55 | Quote of @macpiphq's top earners | 13 | 0 | 0 |
| Nov 20 17:58 to Nov 21 00:30 | Ten listing posts with links (L1 to L10), half an hour apart | 7, 7, 7, 8, 9, 9, 10, 12, 12, 14 | 0 | 0 |
| Nov 21 07:26 | Undirect launching on iPip | 18 | 0 | 0 |
| Nov 21 07:41 | Cutling on iPip | 33 | 0 | 0 |
| Nov 21 17:19 | Debut post, pinned, no link ("Hey, I just started Monholt ...") | 70 | 1 | 1 |
| Nov 21 21:30 | Safari Block Pop-ups setting, Undirect link | 16 | 0 | 0 |
| Nov 22 01:00 | Safari AutoFill, Cutling link | 17 | 0 | 0 |
| Nov 22 19:45 | "What do you keep in your Notes app only so you can copy it out again?" | 8 | 0 | 0 |
| Nov 22 22:15 | "What's in your Mac menu bar that you open more than once a day?" | 2 | 0 | 0 |

301 views in all, median 11.5; one like and one reply in total, both on the debut.

**Replies, 21** (the Replies tab; "thread" is the parent post's own view count):

| WIB | Replied to | Thread | Views | Replies back | Likes |
|---|---|---|---|---|---|
| Nov 20 10:38 | @anupamrjp, link thread | 1,664 | 4 | 0 | 0 |
| Nov 20 14:04 | @16vchq "Drop your startup link" | 44,733 | 4 | 0 | 2 |
| Nov 20 14:05 | @anupamrjp, link thread | 1,626 | 2 | 0 | 0 |
| Nov 20 15:04 | @sl1ma4, link thread | 4,182 | 7 | 1 | 0 |
| Nov 20 15:08 | @Joi2James, link thread | 2,675 | 2 | 0 | 0 |
| Nov 20 17:51 | @lightsilver323, link thread | 5,008 | 1 | 0 | 0 |
| Nov 20 17:52 | @brianoliveri, link thread | 3,617 | 5 | 0 | 0 |
| Nov 20 17:54 | @anupamrjp, link thread | 1,588 | 1 | 0 | 0 |
| Nov 20 17:55 | @uzzy_dev1, link thread | 713 | 1 | 1 | 0 |
| Nov 21 07:21 | @Nehakathare, link thread | 8,501 | 10 | 0 | 0 |
| Nov 21 07:23 | @tiboadriana, link thread | 5,791 | 21 | 0 | 0 |
| Nov 21 07:23 | @PitchProtocol, link thread | 245 | 5 | 1 | 0 |
| Nov 21 07:24 | @whodoyousee1, link thread | 1,154 | 3 | 0 | 0 |
| Nov 21 16:36 | @iPritamX, no link | 200 | 4 | 0 | 0 |
| Nov 21 16:46 | @picconedoro, no link | not read | 3 | 0 | 0 |
| Nov 21 16:57 | @JustinasRoland0, no link | 2,762 | 19 | 0 | 0 |
| Nov 21 17:08 | @Copypaster3000, no link | 137 | 11 | 1 | 1 |
| Nov 21 17:18 | @rashem48, no link | 521 | 19 | 1 | 1 |
| Nov 21 20:23 | @manu_zurcher, answering his reply to the debut ("A keyboard that remembers the things I paste every day would be useful!!"), with the Cutling link | 24 | 5 | 0 | 0 |
| Nov 21 20:42 | @tiboadriana, a bare Cutling link | 4,355 | 48 | 1 | 1 |
| Nov 21 20:46 | @anupamrjp "Drop your project url / I'm picking 30 startups to feature for free.", a bare Cutling link | 6,470 | 4 | 0 | 0 |

179 views in all. The 16 replies that carry a link (13 on link threads on Nov 20 and 21, three more
bare links on the evening of Nov 21, after the pause on link threads had been approved) drew a
median of 4 views, on threads seen by 245 to 44,733 people: inside a thread of hundreds of link
replies, almost nobody opens ours. Their 4 answers are hosts acknowledging (the one read: "Wishing
everyone great success!"). The 5 link-free replies to makers drew 3 to 19 views (median 11), and 2 of
them (@Copypaster3000, @rashem48) got an answer and a like from the author. The one conversation
with someone who now follows the account began when @manu_zurcher replied to the debut post, an
original.

**The newest reply is from Nov 21 20:46 WIB.** In the 36 hours since, the account has sent no reply
at all; what went out was scheduled originals (Nov 22 19:45 and 22:15).

What the numbers say, read beside section 1:
- Originals reach their 3 followers in-network and almost no one else: 19 of the 20 never got a
  like (the debut got one, at an hour not shown), so by the code's own rules those 19 never entered
  the out-of-network pool (1.1) and had nothing for the new-author lift to pick them by (1.2). That
  is why question posts get 2 to 8 views: the questions are not the problem; nobody is there to see
  them.
- The link listings drew as many views as the questions (7 to 14): views at this size measure the
  follower count and profile visits, not the post.
- Replies did what the code says they do: they were seen by the person replied to and a handful of
  thread readers. Link-free replies to makers were seen two to three times as often as link replies
  and drew real answers; link replies drew acknowledgments.
- The debut, an honest intro with a question, is the account's best post (70 views, the one reply
  and like). Two of the logs in section 4 open with the same kind of post (Efe, Tony).

## 3. What X's own people say (read on x.com in Chrome, 2026-11-23)

| Who, when | Words | What it adds |
|---|---|---|
| @XCreators (X's creator account), 2026-11-20 WIB, 102.7K views, x.com/XCreators/status/2123525901589872764 | "The easiest way to start posting on X: pick 5-10 people you admire and jump into the conversation. That's it." | X's own advice for starting is replies to a small, fixed set of people, not broadcasting. |
| @XCreators, 2026-11-12 WIB, x.com/XCreators/status/2120587296458334225 | "The secret to more replies: leave room for them." Quoting @bryan_johnson: "If you leave just the opening where they can complete the sentence, they'll pile in." | How X wants originals written: open-ended, finishable by the reader. |
| @XCreators, 2026-11-21 WIB, 1.9M views, x.com/XCreators/status/2123886385828684073 | "Video is the fastest growing format on X. Posts with video get 5x the reach and engagement, and 36% of all impressions now go to video." | X's own number for video; it does not say whether the 5x holds for accounts with no followers. |
| Nikita Bier (X head of product), 2026-07-14, 9.9M views, x.com/nikitabier/status/2076747704248758617 | "We're rolling out a small tweak to boost visibility of your posts to your mutuals (people who you follow back). We noticed this data was missing from the algo and it made your friends appear less in your replies. This resulted in the reply section feeling more like a battleground with people you don't recognize." | The mutual boost (1.4). Read plainly, mutual-follow data now also decides who shows in a post's replies, so people the poster knows rise and strangers sink; he does not give the mechanism. |
| Nikita Bier, 2026-07-14, 1M views, x.com/nikitabier/status/2076917480518558035 | The mutual boost's measured result: "Replies: +3.15% / Original Posts: +1.8% / Small Account Reach: +1.19% / Time Spent: -0.13%" | X measures "small account reach" and moved it through mutual follows. |
| Nikita Bier, 2026-07-17, x.com/nikitabier/status/2078135648524112236 | "We need more cross-user interaction. The app was shifting from a social network to a news media property of 100 major accounts—with no on-ramp for small accounts to grow. This new profile meaningfully drove DMs and Follows." | X sees the on-ramp for small accounts as the profile page and person-to-person contact. |
| Nikita Bier, 2026-03-25, x.com/nikitabier/status/2036836599573745930 | On For You's incentives: otherwise it "will proceed to be a monoculture with a handful of countries rationally spamming the replies of those posts to get $30/week." | Reply-spamming big posts is what X is building against (it is why the Grok reply scorer in 1.3 exists). |
| Nikita Bier, 2026-03-26 WIB, x.com/nikitabier/status/2036867075705364911 | A reply setting that lets posters allow "Accounts you follow" plus "their followers too: your 2nd degree connections" ("Early access available to Premium+ subscribers"). | More posts will only take replies from people inside the poster's circle; an account no one follows cannot reply to those at all. |
| Nikita Bier, 2026-07-16, 5.9M views, x.com/nikitabier/status/2077774853650944028 | "Soliciting engagements ("I'll follow everyone who replies") 3 or more times will results in removal from the program and your account will be forwarded to the policy team for suspension. Grok now catches all of these." | Follow-for-follow and "reply and I'll follow" are punished, not just ignored. |
| Nikita Bier, 2026-01-15, x.com/nikitabier/status/2011825522817270230 | API access revoked from apps "that reward users for posting on X (aka "infofi"). This has led to a tremendous amount of AI slop & reply spam on the platform." | Automated or paid reply volume is the thing being removed. |
| Nikita Bier, 2025-10-20 WIB, 7.3M views, x.com/nikitabier/status/1979994223224209709 | "posts with links tend to get lower reach. This is because the web browser covers the post and people forget to Like or Reply. So X doesn't get a clear signal ... the post should stand alone as great content so write a solid caption." | A link post loses the early like it needs (1.1, 1.2), which matches the 0 likes on all 13 link posts here. |
| Nikita Bier, 2026-05-27, x.com/nikitabier/status/2059610990657061328 | Answering "X algo kills small creators": "No. What kills small creators is aggregators with 4 million followers downloading-and-reuploading 600 videos per day ... But we will kill them." | X says the obstacle is crowding at the top, not a rule against small accounts. |
| Nikita Bier, 2026-01-21, 3.2M views, x.com/nikitabier/status/2014079005025247240 | "we scoured the world for the top posters in every niche & country / We've compiled them into a new tool called Starterpacks: to help new users find the best accounts—big or small—for their interests" | A later source of followers for a niche account; nominations were taken in public replies (x.com/nikitabier/status/1991016787543035907). |
| Nikita Bier, 2022-03-03 (before he joined X), x.com/nikitabier/status/1499452301185929216 | "Twitter Growth Strategy / 0-500 Followers: Reply Guy / 501-2K: Niche Bangers / ..." | A joke, but the line most quoted about this question. Its first rung agrees with @XCreators above. |

Not found: an X Help Center or X Engineering page that tells a new account how many posts or
replies to make. The Help Center's numbers are limits (400 follows, 50 posts and 200 replies a day
for unverified accounts; `x-account-health-and-practice.md`), not advice.

## 4. Makers who grew from about zero, 2025-2026: their own logs

Each is self-reported unless marked; numbers are theirs.

### 4.1 "Solopreneur Dad" (Indie Hackers user JonBuildsHQ, maker of PageGains), 2026-05-21

https://www.indiehackers.com/post/how-i-went-from-30-to-1-000-followers-on-x-in-14-days-94fcd933e1
(read in Chrome). About 30 to "a bit over 1,000" followers in 14 days; "I didn't buy followers / I
didn't run ads / I didn't have an existing audience / I didn't have a single mega-viral post". His
main finding: "X growth is much more about replies than posting ... A good reply on a large
account can outperform anything you post to your own tiny audience", and replies "compound
socially: people start seeing your name repeatedly across different threads". Volume on his busiest
day: "something like 18 posts… and over 250 replies", treating X "as a full-time job for 14 days".
His best originals were "asking founders what they're building, asking controversial-but-small
questions, talking about growth itself, or just genuinely encouraging people". His audience and his
buyers are the same people (founders), which @monholtco's are not: Undirect's and Cutling's buyers
are iPhone and Mac users, not makers. No screenshots. 250 replies a day is above X's stated limit of
200 a day for unverified accounts, so he either had Premium or the count is loose.

### 4.2 Innmind / NotPeople, "The X Growth Playbook We Ran Across 20 Accounts" (2026)

https://blog.innmind.com/x-growth-playbook-for-startup-founders-2026/ (WebFetch). 20 founder and
company accounts "from roughly 0 to 20K followers", "8+ months of daily activity per account".
Below 3K followers, replies only: "a founder working this layer deliberately adds between 10 and
100 followers a day" from 10 to 50 thoughtful comments a day; daily routine: "Open X search, type
"pitch your startup", and leave five genuinely useful replies on the latest thread." Weak: written
by a team that sells reply automation, no analytics shown, and its daily routine is the one
@monholtco ran on Nov 20 and 21 for a median of 4 views a reply (section 2).

### 4.3 @JustinasRoland0 (Justinas Rolando, solo founder; later MacPip and iPip), Aug to Nov 2026, with analytics

The closest case to @monholtco found: started from nothing in late August 2026, in the maker niche,
and later built the two Apple-app directories that list Undirect and Cutling. His own posts, read
on x.com:

- 2026-09-05, x.com/JustinasRoland0/status/2096198626993123648: "results from my first 2 weeks of
  being active on X: - 0 to 253 followers - 80.4k impressions - 2.9k engagements - 1.4k replies".
  It carries a screenshot of X's own Account overview for Aug 23 to Sep 5, read here bar by bar:

  | Days | His posts a day | His replies a day | New follows a day | Impressions a day |
  |---|---|---|---|---|
  | Aug 23 to Aug 31 (9 days) | 1 to 6 | 0 to 20, mostly under 13 | -1 to 8, about 20 in all | under about 1,500 |
  | Sep 1 | about 12 | about 66 | about 13 | about 6,000 |
  | Sep 2 | about 14 | about 76 | about 71 | about 19,000 |
  | Sep 3 | about 17 | about 11 | about 55 | about 13,000 |
  | Sep 4 | about 23 | about 50 | about 42 | about 25,000 |

  The overview also shows 635 profile visits, 800 likes received, and "Checkmark followers 136 /
  253": over half his first followers were paying accounts, that is other active builders. The
  "Replies 1.4K" tile sits beside Likes, Reposts and Bookmarks, so it most likely counts replies he
  received, not ones he wrote (the Posts and Replies chart shows his own replies at 0 to about 76 a
  day).
- 2026-09-02: "just hit 100 followers ... while i was posting into what felt like an empty room"
  (x.com/JustinasRoland0/status/2095076442438521287).
- 2026-09-15: "my best two days ever were sep 11 and 12. 47k impressions, 300+ new followers
  between them / then i went offline on a cruise with no wifi. no posting, no replies, no engaging /
  four days later i'm at roughly 1k impressions a day / ... consistency is doing far more work than
  content quality, and the drop is faster than the climb."
  (x.com/JustinasRoland0/status/2099817926257713163)
- 2026-09-24: "900 followers. Solo founder. Got here by posting what I build, what breaks, and a lot
  of questions." (x.com/JustinasRoland0/status/2103032879043285389); 2026-09-25: "1K followers in 14
  days" (x.com/JustinasRoland0/status/2103510076749172992); 2026-10-12: 1,500
  (x.com/JustinasRoland0/status/2109588389343420668); 2,313 on Nov 22 (`x-engagement-mix.md`).
- 2026-10-06, x.com/JustinasRoland0/status/2107375244566569104: "what i did today before 10am: 1.
  turned on notifications for 3 big accounts 2. replied in the first 10 min with an image meme 3.
  reused the same meme under the next big post / result: 45.7k impressions, one reply at 24k views,
  another at 11k + 421 likes".

What his log shows, against @monholtco's: the followers did not come while he posted a few times
and replied a dozen times a day; they came in the days he did both at volume, about 15 originals
and 50 to 75 replies a day, with the replies landing early under big posts. One early reply under a
big account was seen by 24,000 people; @monholtco's late replies on link threads were seen by 1 to
21. Cautions: his reply counts run far above his likes, the pattern of a reply circle
(`x-engagement-mix.md`), 9 of 29 posts in late November were paid partnerships, he reused one meme
under two posts (X's duplicate-reply rule), and he says @levelsio put him on a public list of X
spammers (4.4).

### 4.4 This month in the maker niche: a public block list for AI replies

- @levelsio, 2026-11-06, x.com/levelsio/status/2118737314943754500: "If you write AI replies under my
  tweets you will now permanently destroy your X account / Because you'll very quickly end up in a
  public data[base]".
- @levelsio, 2026-11-19, x.com/levelsio/status/2123388955143893122: "THE 𝕏 SPAMMERS LIST / Blocked
  for AI reply / blockedforaireply.levels.io / 3,728 𝕏 accounts that continuously spam automated AI
  replies to artificially farm engagement". The site says reports are "reviewed by hand" and offers a
  "Find my account" lookup for appeals (WebFetch, 2026-11-23; the list itself is not shown).
- @levelsio, 2026-11-21, x.com/levelsio/status/2124173662597075020 (105K views): "I think we may
  have solved AI replies for now / I literally don't get them anymore / We scared them off with the
  mass block list?"
- @julianwhatif, 2026-11-22, x.com/julianwhatif/status/2124481068006781033: "I write my own posts
  and replies. That's also why I can't manage more than 60-70 replies a day."

What it means: in the exact niche @monholtco replies in, a reply that reads as machine-written now
costs mass blocks, and blocks received are one of the signals the reply scorer reads (1.3). Whether
@monholtco is on the list was not checked (the lookup is the site's appeal form, the owner's to use).

### 4.5 @rashem48 (Rashem Pandit, Scenes for Mac), Oct to Nov 2026

His milestone posts: "3 weeks ago I was at around 650" and 1,300 on 2026-10-26
(x.com/rashem48/status/2114627536835485810), 1,500 on 2026-11-01
(x.com/rashem48/status/2116925734383939730), about 2,000 on Nov 22 (`x-engagement-mix.md`). He names
"Connecting and engaging with you lovely people here on X" beside building his Mac app, and ends
posts with "If you're an active builder ... Say hi 👋 and lets connect". No analytics shown. His
launch week (`x-engagement-mix.md`) showed a bare link drop at a median of 1 reply against 9 for a
question and 15 for a sale told as a story.

### 4.6 Vendor guides: read, and mostly discounted

- Farid Shukurov, "Zero Followers, High Reach: How to Get Impressions on X in 2026", Indie Hackers,
  2026-06-03 (https://www.indiehackers.com/post/zero-followers-high-reach-how-to-get-impressions-on-x-in-2026-1dd99f725d,
  read in Chrome). Says "spend 80% of your time replying to viral tweets in your niche", replying
  "within the first 30–60 minutes", and to pick posts "with high engagement but few existing
  replies". It sells SupaBird, its one case ("560,000 impressions" in 10 days) names nobody, and its
  "confirmed weights" (repost 20x, reply 13.5x, profile click 12x) are not the 2026 code's (repost
  1.0, reply 5.0, profile click 0; `param.rs`), so its numbers are not used here. Its timing advice
  agrees with 4.3.
- Buffer, "Replying to Comments Boosts Engagement by 5-42% on These Major Platforms", 2025-11-12
  (https://buffer.com/resources/replying-to-comments-boosts-engagement/, WebFetch). The one measured
  study of replies found: on X, posts whose author answered the comments under them got about 8%
  more engagement, compared within each account; about 2,100 such posts, "only marginally
  significant (p ≈ 0.097)", positive for about 51% of accounts. On Threads the same habit was worth
  42%. So answering replies under your own posts is a small plus on X, not a growth engine.

### 4.7 Six more logs, found by Grok and each opened and read on x.com (2026-11-23)

Grok returned these six when asked for accounts that went from under about 100 followers to 500 to
1,000 or more in weeks (section 5.1). Each post below was opened; the words are the author's. All
numbers are the authors' own.

| Who, post | Start to end | Replies a day | Originals | Whom they replied to | In their words |
|---|---|---|---|---|---|
| @casparbuilds (Caspar, small iOS apps beside a job), X Article, 2026-10-30, x.com/casparbuilds/status/2116149670741196837 | 13 at the start of October, 500 by Oct 22, 746 after three weeks, 1,000 on Oct 29 | "On my best day I did around 110 comments and 50 replies and gained 106 followers"; his routine with little time: comment under 5 to 10 fresh posts in each free gap | none until 100 followers ("Until 100 followers I posted almost nothing. I only commented and followed"); then one a day, "No second post the same day" | Fresh "let's connect building" posts on Search > Latest: "fresh ones (under 30 minutes) with few replies. Under a post with 300 replies you are invisible. Under one with 3 replies the author reads you." | "people don't follow a post. They follow a person they have talked to." A 30k-view post "brought me almost no followers". A €10 boost: "2,936 impressions, €9.32 spent, and no follower jump". "Posting a lot in a row" failed: "One post, then hours of replies, works better." |
| @pfernan95dev (Pablo, small iOS and Mac apps), X Article, 2026-08-10, x.com/pfernan95dev/status/2086729587086495797 | nothing to "just past 1,000" in 11 days | first full week "451 replies, 60,300 organic impressions, 486 profile visits"; one day about 120 replies for about 185 followers, the next about 55 for about 86 | "one technical thing most mornings. Specifically: bugs I hit shipping my own apps" | builders' posts that are "minutes old, not hours" with "some traction but few replies" | "1.5 followers per reply. Same ratio whether I wrote 50 replies that day or 120." "A reply under a 20-minute-old post gets read by the author and by everyone who arrives after. The same reply three hours later effectively doesn't exist." "If your reply could be pasted under any post on the timeline, don't send it." Caveat he gives: "Unfollows are climbing." |
| @kreadony (Efe, Daysway time-blocking planner for Mac and iPhone), 2026-11-11, x.com/kreadony/status/2120469837453365558 | 10 to 1,275 in his first 10 days of posting, 92K impressions | "about 100 posts a day" | one intro post ("Mine reached 92k views and still brings people in"), a daily recap of numbers | "founders who are growing like me and from people I already follow" | "Posts asking "what are you building?" or "let's connect" bring way more replies than anything else I post." |
| @TonyChanBuilds (Tony Chan), 2026-11-21, x.com/TonyChanBuilds/status/2124098569191768499 | 39 to 2,316 in 25 days, 522.3K impressions | "about 94 good replies a day" | an intro post (13,166 views), number updates, one public goal | "posts from people in your space that went up in the last hour" | "Quote helpful posts in your space. My best quote got 49,853 views." |
| @TheXSami (Sami, apps), thread, 2026-10-19, x.com/TheXSami/status/2111874240852959650 | 20 to almost 3,500 in about a month | Grok said about 100 a day, later 236; those numbers were not in the thread text read | at first "my projects and revenue numbers ... getting maybe 2–3 likes" | other people's "let's connect" invitations, then "people building things I could actually talk about" | "I tried replying early to big accounts. Some jokes got loads of likes, but barely any followers." "about 80% followbacks and 20% other follows". |
| @NabhaniMehdi (Mehdi Nabhani), X Article, 2026-11-22, x.com/NabhaniMehdi/status/2124528158229639667 | 339 (mostly dormant since 2012) to about 1,000 in three weeks | "hundreds a day, every one reviewed and posted by me"; Grok Bot searches, filters and drafts | not the lever | accounts "Under 10,000 followers ... Then, under 5,000 / Now, under 2,000" | Big accounts "were a small lottery of their own ... The crowd that made big accounts look attractive was the same crowd that drowned me out." The move to small accounts: "Of everything I've tried so far, this change moved the most." |

Grok's own summary of them was checked against these texts and mostly holds: replies dominate, big
accounts give views but few follows, and fresh posts with few replies are the target. "Original
posts are low-volume early" holds for Caspar and Pablo (0 to 1 a day) but not for Tony, who posted
9 to 12 a day beside his replies (4.9). Two cautions Grok did not give. First, every one of these grew among other
makers, mostly through follow-backs ("let's connect" threads, Sami's 80%): their first thousand
followers are builders, not buyers. Second, two growth posts (Efe's and Tony's) share one template
almost line for line, and Caspar's hourly "unfollow a few accounts ... that never followed back" is
the "follow churn" X's platform-manipulation policy forbids (`x-account-health-and-practice.md`).

### 4.8 @0xPaulvibe (Paul), the playbook Caspar copied, 2026-10-01

x.com/0xPaulvibe/status/2105617628458877019 (X Article, read in Chrome). "For 9 months, I sat at
around 400 followers. I posted tips, frameworks and lessons I thought were valuable. Almost nobody
saw them." Then "400 → 800 → 1,500 → 2,000" in 17 days. "Phase 1 (0 → 200): connect, don't create.
At this stage you have no reach. Posting value into the void is what kept me stuck for 9 months."
His measured mix, from a recap tool: "89% replies, 8% original posts" over 7 days. He credits a $10
boost with about 450 followers; Caspar's copy of that boost did nothing (4.7).

### 4.9 Primary case: @TonyChanBuilds (Tony Chan, solo founder in Houston), 39 to 2,547 in 27 days, with his daily counts

The owner sent his Nov 22 post as evidence. Read on x.com on 2026-11-23: profile "Joined October
2026", 593 following, **2,547 followers**, 2,558 posts (replies included). He posted a count every
morning in one format ("N days ago, I had 39 followers. Right now ... I have N followers. All I did
was: ..."); the ones read:

| Posted (WIB) | Day | Followers | Originals a day | Replies a day | Post |
|---|---|---|---|---|---|
| Oct 31 17:13 | 4 | 455 | 11 | 87 | x.com/TonyChanBuilds/status/2116473611771113639 ("1 honest intro post (8,784 views)") |
| Nov 2 18:13 | 6 | 612 | 11 | 64 | x.com/TonyChanBuilds/status/2117213453592977868 |
| Nov 3 18:19 | 7 | 665 | 12 | 68 | x.com/TonyChanBuilds/status/2117577478508056969 |
| Nov 4 18:04 | 8 | 726 | 11 | 82 | x.com/TonyChanBuilds/status/2117936060046999892 |
| Nov 5 18:11 | 9 | 814 | 10 | 87 | x.com/TonyChanBuilds/status/2118300273768628599 |
| Nov 6 18:22 | 10 | 865 | 9 | 82 | x.com/TonyChanBuilds/status/2118665394755977418 |
| Nov 7 18:05 | 11 | 895 | 9 | 83 | x.com/TonyChanBuilds/status/2119023514791313408 |
| Nov 9 19:07 | 13 | 1,000 | 10 | 57 | x.com/TonyChanBuilds/status/2119763819505324167 |
| Nov 13 18:12 | 17 | 1,522 | 10 | not read | x.com/TonyChanBuilds/status/2121199417751437739 |

His summaries: day 14, 1,149 and "157.7K impressions" (x.com/TonyChanBuilds/status/2120116762771362276);
day 18, 1,559 (x.com/TonyChanBuilds/status/2121563420667375812, 41.4K views, his "Playbook"): "3.
Leave about 78 good replies a day. Pick posts from people in your space that went up in the last
hour" and "7. Post less. My 6-post days got 2x the views per post of my 12-post days."; day 22,
2,000 and "386.9K impressions" (x.com/TonyChanBuilds/status/2123020208331727064); day 25, 2,316,
"about 94 good replies a day" and "Quote helpful posts in your space. My best quote got 49,853
views." (x.com/TonyChanBuilds/status/2124098569191768499).

The post the owner sent, 2026-11-22 (x.com/TonyChanBuilds/status/2124459481501139200, 10.4K views
when read): "I went from 39 to 2,460 followers on 𝕏 in 26 days. Here's every post type I tried,
ranked by the views on my top post of each type. My best was a quote of a helpful Grok Bot tip. It
got 50,216 views. Hope it helps you pick what to post next." His chart, as he drew it:

| His tier | Post type | Views on his best post of that type |
|---|---|---|
| Best for growth | Quoted tip / Playbook / Let's connect | 50,216 / 41,407 / 23,766 |
| Post often | Night one-liner / Intro / Milestone | 21,858 / 13,184 / 8,497 |
| Worth it | AI tools / Numbered list | 4,559 / 1,641 |
| Only if it fits | Parenting / Daily routine | 1,185 / 1,092 |
| Low reach | Midday tips / Gaming | 838 / 575 |
| Skip it | Long thread / Product post | 462 / 181 |

The posts behind his top types, found on his profile:
- Quoted tip, 2026-11-20, 50,378 views by Nov 23: "A lot of you ask me how to keep your Grok Bots
  organized. / Do what Lauren said. Install dr eggbot v2. / It found 6 of my 35 I could delete and
  optimized the ones I kept!", quoting @poteto, whom he calls "lauren from the grok bot team"
  (x.com/TonyChanBuilds/status/2123521701749084584). An earlier quote of her, Nov 18: 30,642 views
  (x.com/TonyChanBuilds/status/2122808245551038891).
- Let's connect, Nov 12: "My goal on 𝕏 is 10,000 real connections. / I want to connect with: ...",
  23,783 views (x.com/TonyChanBuilds/status/2120673185297228203).
- Night one-liner, Nov 17 at 10:55 WIB (21:55 in Houston): "I don't think people get Grok Bot yet. /
  Most people are using maybe 10% of what it can do." 21,915 views
  (x.com/TonyChanBuilds/status/2122538976032555463).
- Intro, Oct 29: "I'm 37 / Solo founder / If you are in tech let's connect", 13,192 views, 243 replies
  (x.com/TonyChanBuilds/status/2115578542046269879).

His own caveat, when asked under the chart whether he had checked follows per view: "at this point,
i'm more going for impressions instead of followers. that quote post was based on lauren from the
grok bot team." (x.com/TonyChanBuilds/status/2124494755367354719). On Nov 17 he wrote "The Original
Content Rewards Program is within reach!" (x.com/TonyChanBuilds/status/2122391129479839972): he is
paid by impressions, so his tiers rank views, not followers and not buyers.

What his case shows, for this question:
- **The ratio**: 9 to 12 originals and 57 to 87 replies a day, about one original for every seven
  or eight replies, the same split as Paul's "89% replies, 8% original posts" (4.8). His fastest
  days were the first four (39 to 455) at 87 replies a day.
- **Originals worked for him from day two** (the intro had 8,784 views by day 4) because his replies
  had already built a circle that saw them, which is the code's order (1.1, 1.4). @monholtco has
  posted originals without that circle.
- **Fewer originals did better per post**: "My 6-post days got 2x the views per post of my 12-post
  days."
- **The best type was a quote**: a helpful post by someone on the team behind the tool his readers
  use, plus his own one-line result. The two types at his bottom ("Skip it") are the two @monholtco
  has posted most on X: product posts (his best 181 views; ours 7 to 33) and long threads (drafted
  and held, `grok-x-review.md`).

His types, fitted to @monholtco:

| His type | The @monholtco version |
|---|---|
| Quoted tip | Quote a helpful post by someone who builds Safari, WebKit or iOS, or a well-known Apple-platform writer, and add what happened when you tried it, in one or two lines. |
| Playbook, milestone | Numbers once there are numbers: followers from 3, a first sale from X, an App Review rejection (an App Review story drew 4,441 views at @iPritamX's 1.4K followers, `x-engagement-mix.md`). |
| Let's connect, intro | The pinned debut is one already (70 views, the account's best). Tony's names whom he wants to meet; a fresh intro naming "people who make Mac and iPhone apps" fits. Never "reply and I'll follow back" (Bier: soliciting is punished, 3). |
| Night one-liner | One plain line about Safari or the iPhone at US night, 08:00 to 11:00 WIB. |
| Skip it: product post, long thread | Listing posts, sale posts and demo films on X wait until there are followers to see them. |

## 5. Grok, asked in the owner's Chrome (x.com/i/grok as @monholtco, model "Auto", 2026-11-23)

One new conversation, titled by Grok "X Account Growth Strategies from New Indie App Makers". Both
answers were read whole; Grok's words are marked "Grok said".

### 5.1 First question: small accounts that grew fast, and what they did

Asked for 6 to 8 real posts from the last six months by accounts that went from under about 100
followers to 500 to 1,000 or more within weeks, with their method, verified to exist. Grok
("Thought for 56s", 73 sources) returned six: @casparbuilds, @pfernan95dev, @kreadony,
@TonyChanBuilds, @TheXSami and @NabhaniMehdi. All six exist and say what Grok said they say (4.7),
with one exception: Sami's "~100 replies/day first week (11–17 Sep), ~236/day later" was not in the
thread text read. Grok said, across them: replies "typically 70–95%+ of daily activity (often
50–200+ per day). Original posts are low-volume early (often 0–2 per day ...)", and several stopped
"Replying to large/big accounts (high impressions or likes but few profile clicks/follows)",
"Chasing views or viral lottery posts", "Paid boosts/ads", "Generic "great post" / agreement
replies", "Posting multiple originals in a short window" and "Relying primarily on own posts while
still tiny".

### 5.2 Second question: this account

Given @monholtco's numbers from section 2 and that its buyers are ordinary iPhone and Mac users,
Grok said ("Thought for 17s", 25 sources):

- "Yes — shift mostly to replies (and a smaller number of quotes/originals). At 3 followers your
  originals are effectively invisible ... so almost all discovery has to come from appearing under
  other people's posts."
- Mix: "Replies: ~80–90% of effort — 40–70 quality replies per day"; "Originals: ~5–10% — 1 short
  post every 1–2 days"; "Quotes: ~5–10% — 2–5 per day, usually quoting something a non-founder said
  about a relevant pain". It labels the percentages and the 40 to 70 as its own judgement.
- Whom: "accounts under ~5–10k followers (or roughly peer size)", posts "Minutes old, ideally under
  15–30 minutes, and with few existing replies"; "Specific, useful replies that add something the
  original post didn't have".
- Stop: "High-volume originals while still at this size", ""Drop your startup link" threads and
  other pure founder-networking posts", "Generic or low-effort replies", paid boosts and "viral
  lottery posts".
- Founder-to-founder as the main plan: "No, not as the primary strategy ... your buyers are
  ordinary iPhone and Mac users ... Those people are not sitting in "drop your startup link"
  threads." Instead, reply under ordinary users' posts about Safari tabs, redirects and pop-ups,
  retyping text, clipboard and menu-bar friction, found on Search > Latest, and quote those
  complaints "because quotes can reach strangers more readily than pure replies in the published
  filtering logic".

Checked:

| Grok's claim | Verdict |
|---|---|
| Originals at 3 followers are nearly invisible | Confirmed: section 2 numbers; code in 1.1 and 1.2 explains why. |
| Reply weight about 5 against a like about 0.7, and a mutual-follow reply boost | Confirmed (`param.rs`: 5.0, 0.708, +15.0). |
| Replies help through the parent post's audience and profile clicks, not For You | Confirmed (1.3). |
| Quotes reach strangers more readily than replies | Confirmed (1.5): a quote is an original; it still needs its first like. |
| "author engagement with the reply further helps ranking under that post" | Not checkable: the conversation ranker is not in the repo. |
| Big accounts bring impressions, not follows; fresh posts with few replies are the target | Confirmed by the authors' own words (4.7): Sami, Caspar, Mehdi, Pablo. |
| 40 to 70 replies a day; quotes 2 to 5 a day | Grok's judgement. The logs ran 50 to 160 replies on busy days; none gives a quote count except Tony's one best quote. 2 to 5 quotes a day would be 2 to 5 originals a day under another name, against Grok's own "1 short post every 1–2 days". |
| Founder-to-founder does not reach buyers | Judgement, and half right: the logs' followers are makers (4.7). But at 3 followers the account first needs anyone active who will like and reply, and in the code the first likes and mutual follows are what let an original travel (1.1, 1.4); makers on X also buy Mac utilities. Both targets, not one. |

## 6. Verdict and routine

### 6.1 The answer

**Yes. Replies are the work: about eight replies for every original. Quotes, yes, but as the one
original of the day when there is a helpful post worth quoting, not instead of replies.**

- The code: a reply is the only thing that reaches people without followers; an original needs a
  first like from followers before strangers' feeds can pick it up (1.1 to 1.3).
- The account: it has sent **no reply since Nov 21 20:46 WIB**, while scheduled originals go out to
  3 followers for 2 to 8 views (2).
- X: "pick 5-10 people you admire and jump into the conversation" (3).
- Every maker who said how they grew from zero did it with replies (4.1, 4.3, 4.7 to 4.9). The two
  with exact daily counts ran 7 to 11 replies per original: Tony, 57 to 87 replies and 9 to 12
  originals a day (4.9); Paul, "89% replies, 8% original posts" (4.8).
- Quotes: in the code a quote is an original (1.5), with the same no-followers problem, but Tony's
  best post was a quote of a helpful post from the team behind his readers' tool (4.9).

### 6.2 The daily routine that follows from the evidence

1. **Replies: 30 a day now**, in three sittings of about 10 (around 15:00, 20:00 to 23:00 and 01:00
   WIB, when US and European Apple people post; `x-engagement-mix.md`), one at a time, never in
   bursts. Toward 60 to 80 as time allows (Tony 57 to 94, Pablo 50 to 120). Starting lower than the
   logs because the account's replies so far ran in bursts on link threads, and X's reply scorer
   reads replies in the last 24 hours and follower count (1.3).
   - Find them on Search > Latest, never Home (Caspar, Paul). About two thirds **peers**: people
     who make Apple apps or write about Mac and iPhone tools, under about 5,000 followers (Mehdi:
     under 2,000 "moved the most"), e.g.
     `("Mac app" OR "iOS app" OR SwiftUI OR "App Store" OR TestFlight OR "App Review") -filter:replies lang:en`.
     About one third **buyers** posting the pain, e.g.
     `Safari (tabs OR redirect OR "pop-up" OR popup) -filter:replies lang:en` and
     `(retype OR "typing my address" OR clipboard OR autofill) (iPhone OR Mac) -filter:replies lang:en`;
     they answer less but they are the buyers. No link, no app name unless asked.
   - Posts under 30 minutes old (Tony: "went up in the last hour"; Pablo: "minutes old, not hours")
     with fewer than about 10 replies (Caspar: "Under one with 3 replies the author reads you"). A
     big account only in its first 10 minutes and only with a fact to add, 2 or 3 a day at most:
     views, few follows (Justinas, Sami, Mehdi).
   - One specific thing the author did not have, from having built these apps (Pablo: "If your
     reply could be pasted under any post on the timeline, don't send it").
   - Typed by the owner in his own words. A tool may find the posts and suggest the fact; he
     rewrites and sends (Mehdi reviews every one). Replies that read machine-written now land on a
     mass block list in this niche (4.4), and blocks and pasted text feed X's reply scorer (1.3).
2. **Originals: one or two a day**, the best of what is scheduled, never more than six (Tony's
   6-post days had twice the views per post of his 12-post days). Use Tony's types that fit
   (4.9): a quoted tip, a night one-liner at 08:00 to 11:00 WIB, a question at 20:00 to 22:00 WIB,
   numbers once there are numbers. After posting, stay and answer (Caspar: "One post, then hours of
   replies, works better").
3. **Quotes: at most one a day**, counted as one of the originals: a helpful post from someone at
   Apple, WebKit or a known Apple-platform account, plus what happened when you tried it.
4. **Answer every reply under the account's own posts within the hour.** Caspar, Efe and Tony each
   list it as a rule (4.7, 4.9). Buffer measured only about +8% engagement for it on X (4.6), so it is for the
   conversation and the follow, not reach. Today each such answer waits for the owner's go; that
   delay is the one step the logs say not to have.
5. **Follow 5 to 10 a day**: people the account had a real exchange with, and makers whose posts it
   wants in its feed. Never unfollow for not following back (X's policy names follow churn, 4.7).
   Each mutual follow with an active maker shows that person the account's originals at reply
   weight 20 instead of 5 (1.4).
6. **Once a week**: followers, profile visits and which replies were answered, in `social-posts.md`.

Expected, GUESS from the logs: in builder circles the makers in 4.3, 4.7 and 4.9 got about 0.5 to
1.5 followers per reply (Caspar's best day 160 for 106; Pablo 1.5; Tony about 80 a day for 2,500
in 27 days); this account has 3 followers after 21 replies and 20 originals. At 30 well-aimed
replies a day, 100 followers in two to four weeks is a fair target; from there the daily original
starts getting the first likes that let it travel (1.1).

### 6.3 What to stop

1. **Going quiet on replies.** None since Nov 21 20:46 WIB (2).
2. **"Drop your startup link" threads, for good, not only until Dec 5.** 16 replies with links,
   median 4 views, on threads of 245 to 44,733 views (2); Bier names reply-spamming of big threads
   as what X is building against (3); Grok agrees (5.2).
3. **Product posts on X until about 200 followers**: listing posts, and the demo films and
   carousels of the two apps scheduled for Nov 23 to 28. Ours drew 7 to 33 views; Tony's best product post drew 181 and he files the type under
   "Skip it" (4.9). The one Black Friday post the owner approved is his call.
4. **Long threads** (Tony: 462 views, "Skip it").
5. **More than two originals a day** while under about 200 followers.
6. **Links in posts and replies for now** (13 link posts, 0 likes; Bier on why link posts lose the
   early like, 3).
7. **Replies in bursts, or machine-written replies the owner has not rewritten** (1.3, 4.4).
8. **Unfollowing in bulk.** Eight of the ten makers followed by hand on Nov 21 are no longer
   followed (2). If that was an unfollow, it should not happen again.
9. **Expecting Premium to lift originals.** No ranking weight reads it (1.6); the Nov 22 questions
   went out with the checkmark and got 8 and 2 views. Its use is reply prioritization under other
   people's posts (Help Center), one more reason the effort belongs in replies.

### 6.4 The five strongest pieces of evidence

1. **X's code: replies never reach strangers' feeds, and originals reach strangers only after a
   first like.** `home-mixer/filters/oon_retweet_reply_filter.rs` (out-of-network replies dropped,
   `EnablePhoenixOonReplies` false); `phoenix/xrex/data/retrieval_dataset.py` (strangers' pool is
   `1fav_1day`; cold pool under 8 likes, 500 views, 2 hours); `home-mixer/scorers/author_cold_start.rs`
   (one lifted post per feed, picked by likes per view). https://github.com/xai-org/x-algorithm
2. **The account's own numbers.** 20 originals: 301 views, 1 like. 16 link replies: median 4 views.
   5 link-free replies to makers: median 11 views, 2 answered and liked. No reply sent since Nov 21
   20:46 WIB. https://x.com/monholtco/with_replies (section 2)
3. **Tony Chan's daily counts (the owner's case).** 39 to 455 followers in 4 days at 11 originals
   and 87 replies a day; 2,547 in 27 days at 9 to 12 originals and 57 to 87 replies a day; "Post
   less. My 6-post days got 2x the views per post of my 12-post days"; best type a quote of a
   helpful tip, worst a product post.
   https://x.com/TonyChanBuilds/status/2116473611771113639 ,
   https://x.com/TonyChanBuilds/status/2121563420667375812 ,
   https://x.com/TonyChanBuilds/status/2124459481501139200
4. **X's own words.** @XCreators: "The easiest way to start posting on X: pick 5-10 people you
   admire and jump into the conversation. That's it."
   https://x.com/XCreators/status/2123525901589872764 ; the mutual-follow boost, measured by X at
   "Small Account Reach: +1.19%": https://x.com/nikitabier/status/2076917480518558035
5. **Where replies turn into followers.** @pfernan95dev: "1.5 followers per reply ... A reply under
   a 20-minute-old post gets read ... The same reply three hours later effectively doesn't exist."
   https://x.com/pfernan95dev/status/2086729587086495797 ; @casparbuilds: "people don't follow a
   post. They follow a person they have talked to"
   https://x.com/casparbuilds/status/2116149670741196837 ; @NabhaniMehdi, moving to accounts under
   2,000 followers: "this change moved the most"
   https://x.com/NabhaniMehdi/status/2124528158229639667 ; and @JustinasRoland0's X analytics,
   where follows jumped only on the days replies reached 50 to 76
   https://x.com/JustinasRoland0/status/2096198626993123648

### 6.5 Earlier decisions this changes

- The routine approved on Nov 21 (memory `startup-link-replies-standing-go.md`, from
  `x-account-health-and-practice.md`): "5-10 link-free replies" a day becomes 30, then toward 60 to
  80. The low number came from X's spam wording; the logs show 50 to 160 a day on busy days, and
  the risk this month's evidence points at is replies that read machine-written (4.4), not the count.
- Same routine: "1-2 original text posts" stays at one or two, now with Tony's types, and product
  posts on X are held until about 200 followers.
- Same routine: link-thread replies "paused until 2026-12-05; after that, at most one a day"
  becomes stopped.
- Same routine: answers to replies on our own posts wait for the owner's go; the evidence says
  answer within the hour, so the owner either answers himself or lifts that gate.
- `grok-x-review.md` section 5 scheduled about 30 originals for Nov 23 to Dec 6 (two a day); that
  count can stay if the replies start. The six X picture and film posts (Nov 23 to 28) are demo
  films and carousels of the apps and fall under 6.3 item 3.

## 7. Not about growth: the 18 repositories in @flxrnc's post, for the promo films

The owner's screenshot also showed @flxrnc (Florence), 2026-11-22,
x.com/flxrnc/status/2124231511499026436: "I make a new animation every day now, these 18 GitHub
repos are my secret / this is f*cking gold for Fable 5.2 and Opus 5.5 users / Launches. Explainers.
Demos. Motion. VFX. Taste." It ends: "Topic → script → motion → score → export." and quotes her X
Article "The Fable 5.2 Motion Playbook: One Prompt, One Film" ("9 lessons from 40 finished films,
with every prompt, setting and number"). Each repository below was checked on the GitHub API on
2026-11-23 (stars, last push, description); her one-line description is in quotes.

| # | Repository | Her line | Stars, last push | What GitHub says it is |
|---|---|---|---|---|
| 1 | [alchaincyf/huashu-motion](https://github.com/alchaincyf/huashu-motion) | "launch films that write their own music" | 3,023, 2026-11-21 | Commercial-grade launch films made by a coding agent; composes music, edits by pointing at the frame |
| 2 | [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer) | "pick a topic, get a narrated explainer" | 3,531, 2026-11-21 | A Claude Code / Codex skill: topic in, narrated explainer video out |
| 3 | [getopenscreen/openscreen](https://github.com/getopenscreen/openscreen) | "screen recordings that look like polished demos" | 7,842, 2026-11-23 | Free, open-source screen recorder for demos, GPU-accelerated, no watermark |
| 4 | [feitangyuan/onetake](https://github.com/feitangyuan/onetake) | "the whole piece in one unbroken camera move" | 4,362, 2026-11-19 | Motion films with no cuts: each beat grows out of the one before |
| 5 | [lemomo-ai/lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) | "99 film looks your agent can shoot in code" | 19,959, 2026-11-20 | A toolbox of 99 film styles in code for Claude Code |
| 6 | [storytold/effectcraft](https://github.com/storytold/effectcraft) | "a full VFX toolkit you never pay for" | 9,141, 2026-11-22 | Open-source motion graphics and compositing tool |
| 7 | [greensock/GSAP](https://github.com/greensock/GSAP) | "timelines that make every move smooth" | 31,095, 2026-11-04 | JavaScript animation library |
| 8 | [mrdoob/three.js](https://github.com/mrdoob/three.js) | "3D shots straight from a web page" | 119,176, 2026-11-23 | JavaScript 3D library |
| 9 | [ahujasid/mcp-for-blender](https://github.com/ahujasid/mcp-for-blender) | "Claude does the heavy 3D lifting in Blender" (as "Blender MCP") | 35,404, 2026-11-18 | Plugin to drive Blender from any LLM (the old `ahujasid/blender-mcp` redirects here) |
| 10 | [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) | "the AI image engine behind your shots" | 148,167, 2026-11-23 | Node-based diffusion model GUI, API and backend |
| 11 | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | "build in HTML, deliver as video" | 88,347, 2026-11-23 | Open-source AI video editor: edit footage, or make and remake video with an agent |
| 12 | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | "videos you can edit like a web page" | 74,996, 2026-11-22 | Videos made programmatically with React |
| 13 | [remotion-dev/skills](https://github.com/remotion-dev/skills) | "your agent learns video the official way" | 7,814, 2026-11-18 | Remotion's own agent skills |
| 14 | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | "a final polish pass on every frame" | 115,092, 2026-11-23 | A design vocabulary and review skill for coding agents |
| 15 | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | "gives your agent a real sense of style" | 120,189, 2026-11-22 | Agent skills for art direction, reference images and browser checks |
| 16 | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | "no AI look, ever" | 59,600, 2026-11-11 | Anti-AI-slop design skill for Claude Code, Cursor and Codex |
| 17 | [nexu-io/open-design](https://github.com/nexu-io/open-design) | "your own AI design studio, no subscription" | 109,004, 2026-11-23 | Local-first, open-source collaborative AI design workspace |
| 18 | [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) | "exports a clean MP4 every time" | 68,006, 2026-11-22 | Mirror of FFmpeg |

Remotion (12) is what the house `product-video` skill makes films in;
whether any of the others earns a place beside it is a separate decision (`library-catalog` skill),
not taken here. Her Nov 19 post lists a different 18 for copying animations
(x.com/flxrnc/status/2123392905934999811); not read.
