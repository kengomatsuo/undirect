# Social post formats for @monholtco: X, Instagram, TikTok, Threads

Research started 2026-11-20 for the rewrite of @monholtco's organic posts
(Undirect, Cutling). Adds to `docs/research/short-video-platforms.md`, which
already covers TikTok search/hashtag basics, Instagram's 5-hashtag cap, Threads'
one-topic rule, cadence, links, AI and commercial disclosure, and APIs; those
are not repeated here.

Each line: fact, source URL, date read. "Official" = the platform's own help
center, creator academy, newsroom or engineering docs. "Marketing source" =
Buffer, Later, Hootsuite, Sprout and similar (tests and opinions, not rules).
"GUESS" = not from a source.

## X

### Hashtags

- Official, quoted: "We recommend using no more than 2 hashtags per post as best practice, but you may use as many hashtags in a post as you like." Also "Hashtags can be included anywhere in a post." and their job is to help posts "show more easily in X search." Source: https://help.x.com/en/using-x/how-to-use-hashtags, read 2026-11-20 in Chrome.
- Official, ranking: the published For You code (xai-org/x-algorithm README, updates through Oct 26, 2026) lists what the Grok-based Phoenix model predicts: favorite, reply, repost, quote, share, share via DM, share via copy link; clicks on post, profile, link, photo expand, video open; dwell, dwell time, video continuation, profile visit seconds; follow author; negatives: not interested, mute, block, report, "not dwelled". Hashtags are not a signal in the README. Source: https://github.com/xai-org/x-algorithm (raw README), read 2026-11-20.
- The X Business page "Organic best practices" (https://business.x.com/en/basics/organic-best-practices) returned 404 when opened in Chrome 2026-11-20. Search-snippet only, not verified: it once said "Avoid using hashtags in your Post copy". Treat as retired.
- Reading for us (GUESS from the two official lines): 0-1 hashtag on X, only when it is a search label people really type (e.g. #iOSDev for the dev crowd, #buildinpublic); write the pain in plain words instead, because X reads the full text.

### What the ranking code says a small account should do

- Official, quoted: "New-Author Boost: posts from authors whose impressions are below a threshold are lifted toward a target position." and "Author Diversity: each post after an author's first is multiplied by a decaying factor, down to a floor." and "Out-of-Network Discount: posts from accounts the viewer does not follow are multiplied by a factor below 1, as are replies and reposts from accounts the viewer does follow." Source: https://github.com/xai-org/x-algorithm README, read 2026-11-20.
- Official: filters include `AgeFilter` ("Posts older than 48 hours"), `OONRetweetReplyFilter` ("Reposts and replies from accounts the viewer does not follow"), and `NewUserMinEngagementFilter` ("For new accounts, out-of-network posts below an engagement threshold"; the README does not say whether "new accounts" means the viewer or the author). Same source.
- Official, Oct 13, 2026 update: "Phoenix retrieval is now also trained to surface posts that people read all the way through." Oct 8, 2026: ranking "now does a better job of estimating how long you'll spend on each post". Same source. Reading (GUESS): a post people read to the end (a short story of the pain, a clip watched through) beats a feature list people skim past.
- Official: the weights "scale the predicted probabilities ... they do *not* scale the raw engagement counts", so "1 report cancels out 468 likes" is a misreading. Same source. The "one reply = 150 likes" figure in blogs comes from the 2023 Twitter code, not this one (TechTimes, May 18, 2026, https://www.techtimes.com/articles/316791/20260518/xais-may-15-update-makes-xs-phoenix-ranking-engine-fully-runnable-one-reply-outweighs-150-likes.htm, search snippet).
- Reading for us (GUESS): replies to strangers' posts are filtered out of For You for non-followers (`OONRetweetReplyFilter`), so "reply-guy" replies are seen inside the conversation you reply in, not pushed to feeds. Their value is being seen by the people in that thread, which is still where buyers with the pain are talking.

### Links, Premium, format

- Marketing source (Buffer, Oct 2, 2025, 18M+ posts, mid-2024 to mid-2025): regular accounts "typically under 100 impressions per post", Premium "closer to 600"; "Regular accounts had a median engagement rate of 0%"; for free accounts "link posts have been completely suppressed since March 2025". Source: https://buffer.com/resources/x-premium-review/, read 2026-11-20 (WebFetch). For @monholtco: no App Store link in the main post on a free account; put it in a reply or the bio (GUESS for the reply placement, widely advised, not tested here).
- Marketing source (Buffer, Mar 5, 2026, 52M+ posts): on X "Text posts led with a median engagement rate of 3.56%", images 3.40%, video 2.96%. Source: https://buffer.com/resources/state-of-social-media-engagement-2026/, read 2026-11-20.

### Character limits and the fold

- Free accounts: 280 characters; any Premium tier: up to 25,000, collapsed behind "Show more" in the feed. Sources (third-party, consistent): https://www.hootsuite.com/whats-new/longer-captions-for-x-twitter-premium-users, https://posteverywhere.ai/help/platforms/x-character-limits (search snippets, read 2026-11-20). No help.x.com page found today stating the fold point. GUESS: the fold falls near 280 characters, so the first 280 must stand alone.

### X: short posts with one picture (measured 2026-11-22)

Read in Chrome as @monholtco, with a script that reads each post's text length, like count and media box on the profile pages of accounts @monholtco follows.

- What small-app makers' best posts look like: @jordibruin's top post of the autumn is 59 characters over one picture ("Fixed Safari on Duo. Wider coming on October 23rd for free.", 1.6K likes), and his next four run 105 to 160 characters over a clip or a picture. @dudufolio's best two after his launch film are 21 and 32 characters over pictures (355 and 242 likes). @rashem48's short one, 45 characters with a link, matches his 300-character diary posts (34 likes each). @sindresorhus's top posts are opinions in 115 to 220 characters with no picture, and his product posts with a picture run 170 to 290. Long posts that do well are announcements with a film (@dudufolio's Shotbase launch, 308 characters, 4.1K likes).
- Every post @monholtco had sent by Nov 22 carried no picture (profile read, media count 0 on each).
- X on the web (window 1470 px wide): a single picture is shown whole at its own ratio, 518 px wide, up to 510 px tall, 48 px in from the post's left edge. 16:9 comes out 518 x 291; a 0.84 portrait 428 x 510.
- X's mobile web layout (a 390 px wide window of x.com): a single picture is shown whole, 310 px wide; 16:9 comes out 310 x 174.
- Two or more pictures are a strip of equal height (350 px on the web and 209 px at 390 px for the same post), and a picture wider than about 1.18:1 is cropped at the sides to fit (a 2878 x 2064 picture showed as 412 x 350). A 16:9 picture in a set loses about a third of its width.
- Not measured: the iPhone and Android apps. Vendor guides disagree on how the apps crop tall pictures (skedsocial.com: whole between 2:1 and 3:4; adobe.com/express: "displayed at a 16:9 ratio" on mobile) and all of them call 16:9 safe, so 1200 x 675 is the one size used.
- Reading for us: one 1200 x 675 picture per post, never a set; one line of words on it at 58 px or more (15 px on a phone); the claim in the post's first 8 to 10 words and about 140 characters before the link. `docs/plans/app-store-growth/social/calendar-final/x-posts.ts` holds the posts and `x-images.ts` renders the pictures and their timeline checks.

## Instagram (feed, carousel, Reels)

Already in short-video-platforms.md: 5-hashtag cap (Dec 2025), Mosseri's "hashtags don't improve visibility", Reels ranking signals (2023), trial reels, links, AI label, cadence.

### Official guidance on making a Reel

- Official, via Social Media Today (Andrew Hutchinson, Aug 5, 2026, reporting Instagram's own creator tips for the Edits app): the first few seconds "decide everything"; "The creators we talked to open with the moment that makes someone stop scrolling ... A bold statement. A surprising visual. A question that demands an answer. They build the edit around that opening, trimming anything that slows down the start." On-screen text "can highlight key points and maximize viewership in sound-off environments"; "every visual element should help the viewer understand and stay with the content"; "If viewers are dropping off at the 4-second mark, the hook needs work"; "If saves are high but shares are low, the content might be valuable but not shareable enough." Use the skip-rate metric. Source: https://www.socialmediatoday.com/news/instagram-shares-tips-on-video-creation/827172/, read 2026-11-20 in Chrome.
- Reported, Mosseri, Jan 2025 video: "The top three signals that matter most for ranking are watch time, likes and sends"; earlier: sends per reach "correlate more, in my experience, with overall reach than anything else" (quoted by https://www.socialmediatoday.com/news/instagram-shares-algorithm-2025/738034/ and Buffer https://buffer.com/resources/instagram-algorithms/, search snippets read 2026-11-20). No 2026 restatement found. Reading (GUESS): a post a person sends to a friend ("this is the thing that stops the ad tab", "you retype your address too?") reaches non-followers; a feature list does not get sent.
- Reels length: up to 3 minutes since Jan 2025 (Mosseri: "Starting today, you can upload Reels to Instagram that are up to three minutes long"), https://www.socialmediatoday.com/news/instagram-officially-expands-reels-length-to-3-minutes/737766/ (search snippet, read 2026-11-20). No official length recommendation found.

### Carousels

- Up to 20 photos/videos per carousel since Aug 8, 2024 (https://www.macrumors.com/2024/08/08/instagram-20-photos-carousel-posts/, search snippet read 2026-11-20). Instagram's own help page still says 10 (https://help.instagram.com/iphone-app/269314186824048, snippet), so it is stale.
- Since June 2026 each slide can carry its own caption, via "a toggle in the caption area"; "Users can now mix up to 20 photos with 20 individual captions." Source: https://dataconomy.com/2026/06/19/instagram-adds-unique-captions-carousel-slides/, read 2026-11-20 (WebFetch).
- Marketing source (Buffer, Mar 5, 2026, 52M+ posts): on Instagram "Carousels led with a median engagement rate of 6.90%", single images 4.44%, Reels 3.31%, while Reels reach more people. Source: https://buffer.com/resources/state-of-social-media-engagement-2026/, read 2026-11-20. Reading: carousels for engagement with followers and saves (a step-by-step pain → fix), Reels for reaching strangers.

### Caption length and the fold

- Hard cap 2,200 characters, 5 hashtags (see short-video-platforms.md). The "more" fold sits at about 125 characters in feed per a marketing guide (https://growthscribe.com/instagram-caption-character-limit/, search snippet, read 2026-11-20); no Meta source states the number. GUESS: put the pain in the first line, under ~125 characters.

## TikTok

Already in short-video-platforms.md: search reads caption/voiceover/on-screen text, "more doesn't always mean better" on hashtags, Creator Search Insights, 2,200/4,000 caption, cadence, length data, disclosure.

### Hashtag pages checked (Chrome, 2026-11-20, logged-out-style view, feed served with an Indonesian locale bias)

TikTok tag pages no longer show a post or view count in the page (screenshot of https://www.tiktok.com/tag/iphonetips shows only the tag name and the grid), so "volume" below means: are recent, on-topic posts there.

- `#iphonetips` (https://www.tiktok.com/tag/iphonetips): busy, on topic, tech creators. Top grid post: "text replacement changed my life🙂‍↔️ follow for more tech 🤓 #iphone #iphonetips #iphonehacks #iphonefeatures #apple" (liv [tech]). Others pair it with #iphonehacks, #iphonetipsandtricks, #techtok, #apple. Fit: both apps.
- `#textreplacement` (https://www.tiktok.com/tag/textreplacement): on topic; Stephen Robles: "Save tons of time by using quick text replacements on iPhone! #shortcuts #techtips #iphonetips". The pain Cutling solves is already a TikTok genre, taught with Apple's built-in Text Replacement. Fit: Cutling.
- `#macbooktips` (https://www.tiktok.com/tag/macbooktips): on topic ("MacBook tricks you didn't know #macbooktips #mactips #appletips #productivity #techtips"). Fit: Cutling for Mac.
- `#macapps` (https://www.tiktok.com/tag/macapps): on topic, app-recommendation videos ("Why Are These 5 Mac Apps Still Free 🤯", "3 free Mac apps that feel like paid software"). Fit: Cutling for Mac; note the genre leans "free".
- `#iosapps` (https://www.tiktok.com/tag/iosapps): on topic, "apps you've never heard of" lists; an indie maker posts "finished building my first ios app!". Fit: both.
- `#popupads` (https://www.tiktok.com/tag/popupads): mixed (games, Roblox), but includes "iPhoneHacks: Block Pop-Up Ads Completely 📲 #fyp #ios #iphone #viral #ios26" and "Block Pop-up Ads in Chrome Browser #popupads #removeads #blockads #blockredirects #redirect". Fit: Undirect, paired with #iphone.
- `#adblock` (https://www.tiktok.com/tag/adblock): on topic but Android/Chrome/Brave/uBlock heavy. Fit: Undirect, weak alone.
- `#safaritips` (https://www.tiktok.com/tag/safaritips): WRONG audience, all zoo/Taman Safari travel tips. Do not use. Write "Safari" in caption text instead, or #safaribrowser (not checked).
- `#productivityapps` (https://www.tiktok.com/tag/productivityapps): lifestyle "apps I use" lists. Fit: Cutling, weak.

### Official TikTok guidance on structure (written for ads; the nearest official text for a brand's own posts)

- Official, "Creative best practices for performance ads" (Last updated: June 2025), quoted: "Follow well-proven content structures that sell: Have a hook, highlight your unique selling points, and end with a clear call-to-action." "Prioritize your hook in the first 6 seconds ... by creating suspense, surprise, or other emotions." "Introduce your content proposition in the first 3 seconds for better recall and awareness." "Use captions or text overlays to provide context ... We recommend displaying 5-10 words per second when using text." "go for a DIY or not overly polished style so that it fits in with the user-generated content on TikTok." "We recommend featuring people such as creators, employees, or customers". Keep content "within the UI safe zone". Source: https://ads.tiktok.com/help/article/creative-best-practices?lang=en, read 2026-11-20 in Chrome.
- Official TikTok staff (Creator Manager Norissa Samuels, TikTok Creativity Summit, as reported by Tubefilter Nov 27, 2024), paraphrased: the first five seconds are critical; open with a hook that teases a memorable moment; keep a new reveal close; "Solve a problem"; give the video a beginning, middle and end. Source: https://www.tubefilter.com/2024/11/27/tiktok-ten-tips-long-form-videos-creativity-summit-creator-rewards-program/amp/, read 2026-11-20 (WebFetch).
- Official: Creator Rewards Program pays for "original video content over 1 minute long" (Creator Academy home, https://www.tiktok.com/creator-academy/en, read 2026-11-20 in Chrome). Not relevant to a brand account selling apps, but it explains why so much advice pushes 60 s+.
- Marketing source (Buffer, Mar 5, 2026): on TikTok "Video led with a median engagement rate of 3.39%", photo posts 1.92%. https://buffer.com/resources/state-of-social-media-engagement-2026/, read 2026-11-20.
- Creator Academy search (https://www.tiktok.com/creator-academy/en/search?q=hook) returned no hook article in Chrome, 2026-11-20. No official TikTok page found on POV, greenscreen or "things I wish I knew" formats; those are creator genres (GUESS: they are, see the tag pages above, where "did you know about backtap?" and "text replacement changed my life" are the native shape).
- Stitch/Duet: the per-post "allow stitch/duet" switches exist (short-video-platforms.md, API section). Reading (GUESS): stitching a viral "how do I stop these ads/redirects" or "text replacement" video with the fix is the cheapest way in for a zero-follower account, because it borrows the original's audience and starts from a pain someone already voiced.

## Threads

Already in short-video-platforms.md: one topic tag per post (official help page, verified), communities, links, 500-char text, video spec, AI label.

### Ranking

- Official (Meta Transparency Center, "Instagram Threads Feed AI system", UPDATED 7 MAR 2025): the feed predicts, among others, "How likely you are to like a post", "How likely you are to scroll past a post rather than engage with it", "How likely you are to create a reply to a post", "How likely you are to click on a post's author's profile", "How much time you spend viewing a post's permalink page" and "How much time you spend viewing a post". Many inputs count replies-to-replies ("engagement of descendants ... within level 2 (i.e. replies to replies)"). Source: https://transparency.meta.com/features/explaining-ranking/ig-threads-feed/, read 2026-11-20 in Chrome.
- Official (@threads, 17/10/2025): "We've made a few updates to make sure you see the most lively conversations on Threads, right when they're happening. Expect to see more posts from the most active and engaged people here." Pinned reply by Threads staff (conno_r, 18/10/2025): "you'll probably notice a bit more content about timely events and from people who actively drive conversations ... For creators, posting directly to Threads should get you more reach and followers". Source: https://www.threads.com/@threads/post/DP7I4PAEueK, read 2026-11-20 in Chrome.
- Reported (Mosseri via Platformer, cited by Buffer): the value of all your replies roughly equals the value of all your posts; Buffer's 128K-post analysis: replying to comments on your own posts lifts engagement 42%. Source: https://buffer.com/resources/threads-comments-engagement/ (search snippet, read 2026-11-20).
- Marketing source (Buffer, Mar 5, 2026): on Threads "Video led with a median engagement rate of 5.55%", images 4.55%, text 2.79%, links 2.34%. https://buffer.com/resources/state-of-social-media-engagement-2026/, read 2026-11-20. Buffer's older Threads data said text starts the most conversations (search snippet, same date); the two measure different things.
- Reading (GUESS): Threads ranks on replies and reply chains, so a post should end on something a reader can answer from experience ("Where do you keep your bank number so you can paste it?"), and the account should answer every reply.

### Topic tags and communities, checked

- Community "Tech Threads": 226K members, reachable as topic `Tech Threads` (Chrome, https://www.threads.com/search?q=techthreads&serp_type=tags, read 2026-11-20, browser already signed in; nothing posted). @monholtco already posts there: two Cutling posts 3 h old, one Indonesian ("Capek nyari nomor rekening di Notes?"), one Japanese, both with the App Store link in text and the "AI content" label. Those already open on the pain; keep that shape.
- Tag search for "iphone tips" and "apple" returned posts and profiles, not a community list, so whether iPhone/Mac communities exist was not confirmed (GUESS: try `iPhone`, `Apple`, `Mac` in the composer and pick one that shows the community icon).

### Character limits and the fold

- Post text 500 characters (official, API docs, in short-video-platforms.md). Text attachment up to 10,000 characters on text-only posts, one link inside it, no polls: https://developers.facebook.com/documentation/threads/create-posts/text-attachments (search snippet, read 2026-11-20); launched Sept 2025 (https://techcrunch.com/2025/09/04/threads-challenges-x-by-offering-free-support-for-up-to-10k-characters-plus-prominent-links, snippet). No fold point found for the 500-character body (GUESS: long posts show "more" after a few lines; keep the hook in line one).

### Instagram hashtag pages checked (Chrome, signed-in browser, 2026-11-20; nothing posted)

Instagram now sends `/explore/tags/<tag>/` to keyword search (`/explore/search/keyword/?q=%23<tag>`) and shows no post count, so fit is judged from what ranks.

- `#iphonetips`: Reels with a big text hook on the cover: "Did you know this iPhone trick?", "4 IPHONE APPS That Shouldn't Be Free", "Hidden gems of the App Store", "POV: you didn't know your iPhone could do this". Fit: both apps. Format lesson: talking head or hand-held phone, one-line hook burned into the cover.
- `#iphonehacks`: same genre, Reels; covers "Apple doesn't tell you this trick!", "POV: you don't know your iPhone could do this". Fit: both.
- `#macapps`: carousels dominate: "5 Mac Apps you must have", "Mac Apps Collection Part 7/Part 10" (a numbered series), "THESE 4 MAC APPS WILL 10X YOUR Productivity", "best apps for mac". Fit: Cutling for Mac. Format lesson: a list carousel in a numbered series is the native shape of this tag; a single-app post would sit inside such lists, so pitching list makers is also a route (GUESS).

## Real posts that sold a utility off a pain (checked 2026-11-20 in Chrome; counts as shown that day)

1. TikTok, Haptyk (Mac keyboard-sound app), @innermudd, 8-26: https://www.tiktok.com/@innermudd/video/7678216601296047381. Caption: "it's called Haptyk. thought I needed an actual mechanical keyboard for that satisfying click. turns out an app can do it. reads how hard you type and matches the sound. #macapps #keyboardsounds #techtok #macbookpro #productivityapp". 65.2K likes, 97 comments, 34.6K saves, 3,022 shares. Why it works: the caption starts from the want ("thought I needed an actual mechanical keyboard") and names the app only as the answer; hands on a real MacBook; 5 tags, 3 of them niche; saves are half of likes, so people keep it to buy later.
2. TikTok, DockDoor-style Mac utility, same creator, 8-24: https://www.tiktok.com/@innermudd/video/7677549665994231060. Hook line: "Your Mac can actually show you every window open in an app." 8,540 likes, 6,262 saves, 434 shares. Why: "your Mac can actually..." frames it as something the viewer's own machine lacks; big on-screen word ("open") over a screen recording.
3. TikTok, Text Replacement tip, @agenomicsphd (liv [tech]): https://www.tiktok.com/@agenomicsphd/video/7667537780884491542. Caption "text replacement changed my life🙂‍↔️ follow for more tech 🤓 #iphone #iphonetips #iphonehacks #iphonefeatures #apple"; SEO title TikTok gave it: "6 iPhone Features You Didn't Know About (Text Replacement Hack!)". 62.1K likes, 247 comments, 22.1K saves, 4,564 shares. Why it matters for Cutling: the retyping pain already draws this much on TikTok; the hand-held phone, first-person "changed my life" and "did you know" text on screen are the native shape. Cutling's post can answer what Text Replacement can't (GUESS on what it can't: multi-line address, bank number one tap away in any app; check against Cutling's own copy).
4. TikTok, "Block Pop-Up Ads Completely", @appletipsdaily (iPhoneHacks), 3-10: https://www.tiktok.com/@appletipsdaily/video/7615495135953997086. Faceless screen recording of iPhone Settings, title as the hook, "#fyp #ios #iphone #viral #ios26". 7,798 likes, 110 comments, 4,281 saves, 2,301 shares. Why it matters for Undirect: a plain screen recording on the pop-up/redirect pain gets saved and shared at scale; buyers already report "Block Pop-ups is on and it still happens" (docs/research/undirect-voice-of-customer.md, pain 9, from Reddit and Google's People Also Ask), which is the opening for a stitch: "you turned this on and the ad tab still opened? here's why".
5. X, Matte (Mac screenshot app), @nutlope, Oct 14: https://x.com/nutlope/status/2110104697222672724. "I got tired of CleanShot, so I built my own Mac screenshot app. It's called Matte." plus a short list and a video. 107 replies, 31 reposts, 720 likes, 62K views as shown. Why: line one is a frustration in the maker's own voice; the feature list comes after, short; video attached.
6. X, holdmynotes, @nullbytes00, Aug 30: https://x.com/nullbytes00/status/2093755659628245221. "My girlfriend wanted a sticky notes app that feels real and lives on the edge of the Mac. So I built one..." then "Meet holdmynotes.app". 2.7K likes as shown. Why: a person and a want first, product second.

Case studies with numbers (weaker, vendor blogs): Dumbphone (Michael Tigas), handheld self-shot TikToks of the app's home screen, 2.4M views, 20K downloads, $9K MRR in 78 days, no paid ads mentioned (https://shortimize.com/blog/20k-downloads-and-9k-mrr-in-78-days-how-this-indie-app-turned-minimalism-into-millions-of-views, Oct 31, 2024, read 2026-11-20). BoltAI went viral on X after a Pieter Levels repost, built in public with weekly feature posts (https://www.indiehackers.com/post/how-going-viral-on-x-helped-this-solopreneur-reach-15k-mo-with-his-native-ai-apps-ZBbFBKrpwqZQkQsy7Bcs, search snippet, read 2026-11-20). Appfigures and mwm.ai 2026 "viral" spikes (Puzzlit, TripRank, myCar) are described there as paid or engineered, not organic.

### A live X conversation on the Undirect pain (2026-11-20)

- X search "safari redirect ad iphone" (https://x.com/search?q=safari%20redirect%20ad%20iphone&f=top) top results: iPip's launch notice for Undirect (Nov 18), and @ignace (Nov 17): "Yep, there it was, on my phone, with Apple Safari protections and several ad-blocking extensions installed:" (1.2K views) under a thread on a poisoned script on BBC/Zoom sites (@IntCyberDigest, Nov 17). This is the kind of thread a reply belongs in. Nothing was posted.

## Hashtag lists (from the checks above; GUESS where marked)

- TikTok, Undirect (3-5): #iphonetips #iphonehacks #popupads #safari (GUESS: #safari unchecked; #safaritips is zoo travel, avoid) #techtok. Say "stop Safari redirects" / "ad tabs opening by themselves" in voiceover, on-screen text and caption, since TikTok search reads them (official, see short-video-platforms.md).
- TikTok, Cutling iPhone (3-5): #textreplacement #iphonetips #iphonehacks #iphonekeyboard (GUESS, unchecked) #techtok.
- TikTok, Cutling Mac (3-5): #macapps #macbooktips #mactips #productivityapp #techtok.
- Instagram (max 5): Undirect: #iphonetips #iphonehacks #safari #adblock #iosapps. Cutling: #iphonetips #macapps #textreplacement #productivityapps #iosapps. (Volumes unseen; Instagram shows none.)
- X (0-1, official best practice is 2 or fewer): none by default; #buildinpublic only on maker-story posts; plain words "Safari", "iPhone", "Mac" do the search work.
- Threads (exactly 1 topic): `Tech Threads` (226K-member community, checked). GUESS alternatives: `iPhone`, `Mac`, `Apple` if they show a community icon.
