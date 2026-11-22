# Grok's review of the 60 X drafts, and using Grok to run @monholtco

Research for the owner's words of 2026-11-22 after reading the 60 drafted sittings in
`docs/plans/app-store-growth/social/x-engagement-drafts.md`: "So many are no. X gets me grok too, try
double checking with that. They are more experienced in X. Also routines and guides for using grok to
manage X?"

Written as findings land. Nothing was posted, liked, followed, replied to or scheduled. Grok's answers
are model output, copied as given and marked "Grok said"; they are not facts until the check beside
them says so.

## Account facts (read from x.com/monholtco, 2026-11-22)

- 43 posts, 16 following, 3 followers, joined November 2026.
- Pinned post (17h old when read): "Hey, I just started Monholt, a small studio making apps that do
  exactly what they say. ..." 1 reply, 1 like, 56 views.
- The two most recent product posts with a link showed 10 and 13 views.

## 1. Grok's review (x.com/i/grok, signed in as @monholtco, 2026-11-22, model picker on "Auto")

One conversation, titled by Grok "X Account Growth Advice for Indie App Maker". Each answer below was
taken with Grok's own Copy button, so the words and formatting are Grok's.

### 1.1 What I asked first

> I run @monholtco on X (this account). Facts: joined November 2026, 3 followers, 16 following, 43 posts
> so far, X Premium. One maker, posting as "I". Two paid apps on the App Store: Undirect (...) and
> Cutling (...). Most of the 43 posts so far were product posts or replies carrying a link, and they got
> 10 to 60 views each. Goal for the next two weeks: replies and followers, not selling. I am in Jakarta
> (WIB, UTC+7); the audience I want is English-speaking iPhone and Mac users and other indie app makers.
>
> Before I show you drafts, answer these as specifically as you can, and for each claim say whether you
> know it from X's published sources (...) or whether it is your own judgement or commonly repeated
> advice: 1. What should an account like this post to get replies and followers? ... 2. How many posts
> a day, and how many replies to other people's posts a day? 3. At what hours, given in WIB? 4. How
> should I use replies and quote posts? ... 5. How does X's ranking treat (a) a new account with almost
> no followers, (b) a link in the post's own text versus in a reply under it, (c) native polls,
> (d) threads versus single posts, (e) Premium (reply boost, For You reach), (f) posting many times a
> day from a tiny account? 6. What would you tell me to stop doing?

### 1.2 Grok said (answer to the six questions; "Thought for 51s", 59 sources)

<!-- grok:begin a0 -->
**1. What to post for replies and followers**

Prioritize content that invites replies from English-speaking iPhone/Mac users and indie makers. Replies carry high weight in ranking (around 5× a like in published weights). Originals from small accounts can get a new-author boost if they qualify. Avoid pure product pitches.

- **Specific workflow or friction observation** (common in the niche, easy to reply to with “same” or a fix).  
  Example: “On Mac, I keep retyping the same three app-store review replies and the same error-log snippet. Anyone else have a one-tap text/snippet system that actually sticks across Safari and the keyboard?”

- **Short “how I do X” or constraint note** (no link in the main post).  
  Example: “Building a Safari extension that blocks unsolicited tab opens forced me to treat every redirect as hostile by default. The hard part was distinguishing ‘user tapped this’ from ‘page did this while the user was still looking at the previous page.’ What signal do you trust most?”

- **Poll or two-option question** about everyday Apple workflow.  
  Example (native poll): “When you paste the same image or paragraph multiple times a day, do you prefer: a keyboard suggestion, a menu-bar menu, or just Spotlight?”

- **Reply-bait observation about indie making** (no sell).  
  Example: “One-person App Store apps live or die on the first three reviews. The ones that mention a specific bug I already fixed are gold. The ones that say ‘doesn’t work’ with no details are the opposite. How do you ask for the useful ones without sounding desperate?”

These are judgement based on engagement weights and common successful patterns for small technical accounts. The algorithm itself rewards predicted replies, quotes, and follows more than likes (source: analyses of weights in xai-org/x-algorithm home-mixer/params).

**2. Volume**

1–2 original posts per day maximum, plus 15–40 thoughtful replies per day.  

Judgement + repeated-author decay in the ranking code (subsequent posts from the same author get a decaying multiplier). Quality replies matter more than volume of originals for a 3-follower account. Common advice for tiny accounts is reply-heavy.

**3. Hours (WIB)**

Target when English-speaking Apple/indie audiences are active:

- Primary: 19:00–23:00 WIB (roughly US East Coast morning to early afternoon).  
- Secondary: 07:00–10:00 WIB (Europe afternoon / UK evening overlap) or 00:00–02:00 WIB (US West Coast evening).

No specific hour rule in the published algorithm. Studies of posting times (Buffer, Sprout Social, etc.) consistently point to weekday mornings and early afternoons in the audience’s local time; convert those to WIB. Test and watch which of your posts get early engagement. New-author boost only applies in the first ~2 hours of an original post’s life and under ~200 Home impressions (details from published code analyses).

**4. Replies and quote posts**

Reply under posts by:

- Other indie iOS/Mac makers (search “App Store”, “SwiftUI”, “Safari extension”, “menu bar app”, “indie hacker”, “shipped”).
- People complaining about tab spam, redirect loops, or repetitive typing/pasting on Apple devices.
- Accounts with 1k–50k followers in the Apple/indie space (big enough to have readers, small enough that a good reply can still surface).

Pick posts that are <2–4 hours old when possible, have some early engagement, and are about a concrete problem you understand. Avoid pure self-promo threads.

A good reply: 1–3 sentences that add a specific observation, a short personal parallel, or a clarifying question. No link in the reply itself if you can avoid it. Example under a post about Safari tabs exploding: “The ones that open a tab then immediately redirect again are the worst. I ended up treating any navigation that didn’t come from a direct user gesture as suspect. Have you seen a reliable way to detect ‘user actually tapped this link’ vs page-initiated?”

Premium gives larger reply prioritization inside conversations (X Help Center / About X Premium: slight preference for verified/Premium replies; larger on higher tiers). This is for ordering under a post, not For You reach of your own originals. Quote posts work like originals for ranking but signal engagement on someone else’s content.

**5. Ranking treatment (specifics)**

(a) New account with almost no followers: Original posts can receive the new-author boost (accounts ≤50k followers, original not reply/repost, ≤2 hours old, <200 Home impressions, scored above bottom ~3%; one such post lifted per feed load toward roughly the 16th position, using early like-rate sampling). Out-of-network posts are discounted. Replies from accounts the viewer does not follow are frequently filtered from For You entirely (OONRetweetReplyFilter). Source: published code and analyses of xai-org/x-algorithm.

(b) Link in the post’s own text vs in a reply under it: No explicit penalty for containing a URL in the current published scoring formula. Opening a link has a small positive weight (~0.2). X leadership stated in mid-2026 that links had not been penalized for over a year. In practice, a link that causes people to leave without engaging can still hurt predicted dwell/reply scores. Putting the link in a reply is older advice and not required by current published rules. Source: code analyses + public statements.

(c) Native polls: Not specially mentioned in the open-sourced ranking code. They can drive votes and replies, both of which are positive signals. Judgement.

(d) Threads vs single posts: Conversation collapsing / deduplication exists. A strong single post that gets replies often outperforms a thread for initial reach. Threads can increase time-spent if people read through them. No large structural advantage documented for threads in the For You code. Judgement + existence of conversation filters.

(e) Premium: Documented reply prioritization in conversation rankings (Help Center). No Premium multiplier appears in the published For You scoring weights. It does not by itself expand who sees your original posts.

(f) Posting many times a day from a tiny account: Repeated-author decay applies. High volume of similar posts risks lower scores and possible spam/automation filters. New-author boost applies to at most one qualifying original per feed load. Source: code + common practice.

**6. What to stop doing**

Stop leading with product posts or replies that carry App Store links as the main content. Those have produced 10–60 views. They do not generate the replies that move ranking, and for a near-zero-follower account they mostly reach no one. Keep product mentions rare, secondary, and link-free in the primary text for the next two weeks. Also stop posting the same promotional angle repeatedly (risks decay and low engagement signals).

All claims about weights, new-author boost, out-of-network filtering, repeated-author decay, and absence of a link penalty come from the open-sourced xai-org/x-algorithm repository and analyses of its current parameters. Premium reply prioritization comes from X Help Center. Volume, exact hours, content examples, and the “stop doing product posts” recommendation are judgement informed by those mechanics and common results for small technical accounts. The algorithm changes; the published weights have moved multiple times in 2026.
<!-- grok:end a0 -->

### 1.3 Grok's verdicts on the 60 drafts

The drafts went in six messages of ten, numbered #1 to #60 in the order they stand in
`x-engagement-drafts.md` (#1 is Mon Nov 23 06:43, #60 is Sun Dec 6 21:58; #35 is the Cutling memory
thread, #47 the localisation thread). The instruction with the first ten:

> Judge each one for X specifically, for this account as it is today (3 followers, goal: replies and
> followers). For each number give: a verdict of KEEP, REWRITE or DROP; one or two sentences on why;
> and for REWRITE your rewritten words (under 280 characters, first person singular, no hashtags, and
> no product pitch inside a question or a poll). Be blunt. If most should be dropped, say so.

#### Grok said, drafts #1 to #10

<!-- grok:begin a1 -->
**#1 KEEP**  
Why: Clear, specific gripe about a real dark pattern that almost every iPhone/Safari user has felt. It invites “same” replies and short stories without needing to be a question. The observational tone works for a tiny account.  
Rewrite: none

**#2 REWRITE**  
Why: Useful tip, but pure tips get fewer replies than questions or gripes on a 3-follower account, and the three-finger gesture is still obscure enough that many people will miss it or already know a different method.  
Rewrite: On iPhone you can copy and paste without the menu. Select the text, pinch in with three fingers to copy, then pinch out where you want it. Pinch in twice to cut. Do you actually use the three-finger ones or do you still long-press?

**#3 DROP**  
Why: Meta post about your own posting research. With 3 followers this reads as “here is my content strategy” rather than something the audience cares about. It also telegraphs that you are about to ask questions, which kills the natural feel. Drop and just ask the questions.

**#4 KEEP**  
Why: Simple, concrete, and forces a tiny action (“go and look”). The planned own reply under it is the right move. Safari tab count is a shared minor irritation for the exact audience you want.  
Rewrite: none

**#5 KEEP**  
Why: Short, specific Safari tip that many people still don’t know. Low risk and on-niche. Tips like this occasionally get “wait, really?” replies.  
Rewrite: none

**#6 KEEP**  
Why: Clean, open question aimed at Mac people. Easy to answer in one line, so it has a realistic chance of replies even from a near-zero-follower account.  
Rewrite: none

**#7 REWRITE**  
Why: The core anecdote (extension button greyed out on Start Page) is interesting, but leading with “My Safari extension” makes it feel like a soft product mention. On a 3-follower account that is still mostly noise. Strip the product ownership.  
Rewrite: Safari greys out every extension button on the Start Page. A reviewer rejected one because the button looked dead there. Now the page itself says the button only works on actual websites. Have you hit this?

**#8 REWRITE**  
Why: The poll topic is exactly the problem your app solves, so it risks reading as setup even if you never name the app. The options are also a bit soft. Make the question sharper and more neutral.  
Rewrite: You tap a link and a second tab you never asked for opens. What do you usually do?  
Poll options: Close it and keep going / Leave the site / Notice it much later / Depends on the site

**#9 KEEP**  
Why: Short, specific, and recognizable. Back-button traps are a common Safari irritation. It can pull “this site does it” replies without any product framing.  
Rewrite: none

**#10 KEEP**  
Why: Direct question that matches the other half of your audience (people who retype the same things). Easy to answer, low friction, and not a pitch.  
Rewrite: none

Four of the ten should be dropped or rewritten because they are meta, tip-only, or too close to the product. The rest are usable as-is for a reply-seeking account.
<!-- grok:end a1 -->

#### Grok said, drafts #11 to #20

<!-- grok:begin a2 -->
**#11 DROP**  
Why: Explicit product name plus a localization anecdote. With 3 followers this is still a soft product post; almost no one here will care about the Korean page yet.  

**#12 REWRITE**  
Why: The topic fits the audience and can pull short replies, but a text list is weaker than a native poll and the options are a bit flat.  
Rewrite: Where do you keep the bits of text you paste again and again?  
Poll options: Notes / a chat with myself / text replacement / I just retype it  

**#13 KEEP**  
Why: Specific, actionable iPhone tip about a real annoyance. Low risk and on-niche; some people will reply with their own calendar-spam stories.  

**#14 KEEP**  
Why: Short, recognizable gripe. Newsletter pop-ups on first visit are a common Safari irritation that invites “this site does it” replies.  

**#15 DROP**  
Why: Mentions “two of them are mine.” Even framed as a quote, it is still a product mention on an account that has almost no audience yet.  

**#16 KEEP**  
Why: Clean open question aimed at people who pay for apps. Easy one-line answers, good chance of replies, and relevant to the indie-maker side of the audience.  

**#17 DROP**  
Why: Another localization story that names Undirect. Same problem as #11: product-centric for a near-zero-follower account whose current goal is replies.  

**#18 KEEP**  
Why: Clear Universal Clipboard tip that many people still don’t have set up correctly. Useful for the Mac + iPhone audience.  

**#19 KEEP**  
Why: Extremely low-friction question. Forces a tiny action and is easy to answer in a reply; good for a small account.  

**#20 DROP**  
Why: Direct App Store screenshot change for Undirect plus an ask about which version people would tap. This is product work presented as content; it will not generate the replies you want right now.  

Four of these ten are product-adjacent build stories or soft pitches and should be dropped. The remaining six are usable once the one poll is turned into a native poll.
<!-- grok:end a2 -->

#### Grok said, drafts #21 to #30

<!-- grok:begin a3 -->
**#21 KEEP**  
Why: Neutral poll on a common video-site annoyance (ad / extra tab before the video). It matches the Safari audience and can pull short replies without naming any product.  

**#22 DROP**  
Why: Explicit sale post with prices, product names, and planned link replies. This directly contradicts the two-week goal of replies and followers instead of selling. On a 3-follower account it will almost certainly get ignored or look like spam.  

**#23 KEEP**  
Why: Short, sharp gripe about the paste permission prompt. Highly relatable for iPhone users and easy to reply to with “same.”  

**#24 KEEP**  
Why: Concrete Text Replacement tip that many people still don’t use. Useful, on-niche, and low risk.  

**#25 DROP**  
Why: Build story that names Cutling and details App Store rejections. Product-centric content for an account that currently has almost no audience.  

**#26 KEEP**  
Why: Interactive “which button is real” question with a planned answer the next day. Visual + puzzle format can drive replies and quote posts even from a small account. The own reply stays product-free.  

**#27 KEEP**  
Why: Simple, open question aimed at people who switched to iPhone. Easy one-line answers and relevant to the target audience.  

**#28 REWRITE**  
Why: The Black Friday framing is fine for the date, but the options are a bit vague and the question can feel like a soft lead-in to sales talk. Sharpen it.  
Rewrite: Did you actually buy any software this Black Friday?  
Poll options: Yes, a subscription / Yes, a one-time purchase / Looked and bought nothing / What sale?  

**#29 DROP**  
Why: Names Undirect in the post and the planned reply is a full product pitch plus link. This is a sale post in build-story clothing.  

**#30 KEEP**  
Why: Short, specific gripe about “Open in app” banners. Common Safari irritation that invites quick agreement or counter-examples.  

Three of these ten are direct or soft product/sale posts and should be dropped. The rest are usable.
<!-- grok:end a3 -->

#### Grok said, drafts #31 to #40

<!-- grok:begin a4 -->
**#31 KEEP**  
Why: Direct question about keyboard choice. Relevant to iPhone users, easy to answer, and does not name any product.  

**#32 KEEP**  
Why: Specific, useful Safari tip that many people still don’t know. Low risk and on-niche.  

**#33 REWRITE**  
Why: Relatable email-gate scenario that can pull replies, but a text list is weaker than a native poll.  
Rewrite: A site wants your email before it shows you the page. You type:  
Poll options: your real one / the spam one / a made-up one / nothing, you leave  

**#34 DROP**  
Why: Explicit last-day sale post with prices, product names, and planned link replies. Same problem as the earlier sale drafts; it conflicts with the replies-and-followers goal.  

**#35 DROP (thread as a whole)**  
Why: Six-post thread that names Cutling, dives into its memory limits and code fixes, and ends with a product pitch plus link. Even the technical content is too inside-baseball for a 3-follower account. Almost no one will read past the first post, and the ones who do are not the people you need for early replies. Cut the entire thread.  

**#36 KEEP**  
Why: Short, specific gripe about unsubscribe links that demand a login. Common annoyance that invites quick agreement or examples.  

**#37 DROP**  
Why: Follow-up to the Cutling memory thread. It only makes sense if people already saw #35, which they almost certainly will not.  

**#38 KEEP**  
Why: Clear question aimed at solo indie makers. Easy to answer and relevant to the second half of the target audience.  

**#39 KEEP**  
Why: Practical Safari tip about fake close buttons on pop-ups. On-niche, specific, and does not pitch anything.  

**#40 KEEP**  
Why: Short comparative question that forces a choice. Can pull quick replies or short explanations about which dark pattern feels worse.  

Four of these ten (the sale, the long product thread, and its follow-up) should be dropped. The rest are usable.
<!-- grok:end a4 -->

#### Grok said, drafts #41 to #50

<!-- grok:begin a5 -->
**#41 DROP**  
Why: Build story that names Cutling and details an internal character-limit change. Product-centric for a 3-follower account whose current goal is replies.  

**#42 KEEP**  
Why: Specific, actionable Mac Safari tip about notification prompts. Useful for the target audience and low risk.  

**#43 REWRITE**  
Why: Relevant question for solo makers, but a text list is weaker than a native poll.  
Rewrite: App makers: who writes your app’s other languages?  
Poll options: me / a paid translator / AI, and I check it / it’s English only  

**#44 DROP**  
Why: Names Undirect and describes an internal bug fix. Same problem as other product build stories: too inside the app for an account with almost no audience.  

**#45 KEEP**  
Why: Open, easy-to-answer question about home-screen survivors. Good chance of short personal replies from iPhone users.  

**#46 KEEP**  
Why: Neutral poll on a common friction (address entry). On-niche for people who retype or paste the same details, and it does not name a product.  

**#47 DROP (thread as a whole)**  
Why: Eight-post thread that names Undirect throughout, walks through its 50-language process, and ends with a product pitch plus link. Far too long and product-specific for a near-zero-follower account. Almost no one will read it, and it will not generate the early replies you need. Cut the entire thread.  

**#48 KEEP**  
Why: Short, specific gripe about inconsistent address forms. Relatable checkout annoyance that can pull quick agreement or examples.  

**#49 DROP**  
Why: Build story about a screenshot line-break in Undirect. Another product-internal detail with no audience yet to care about it.  

**#50 DROP**  
Why: Names Undirect and recounts an App Store rejection. Product-centric content that conflicts with the replies-first goal.  

Five of these ten (including the long localization thread) are product build stories and should be dropped. The rest are usable.
<!-- grok:end a5 -->

#### Grok said, drafts #51 to #60

<!-- grok:begin a6 -->
**#51 DROP**  
Why: Opens with “Both my apps” and frames the question around your own open-source paid apps. On a 3-follower account this still reads as a soft product post rather than a pure question.  

**#52 REWRITE**  
Why: Relevant pricing question for indie makers, but a text list is weaker than a native poll and the follow-up “would you pick the same again?” can be folded in.  
Rewrite: App makers, your pricing:  
Poll options: free / pay once / subscription / it’s complicated  

**#53 DROP**  
Why: Names Undirect and describes translation edge cases. Another product-internal story with no audience yet to care.  

**#54 REWRITE**  
Why: The core question is good for solo makers, but the personal example still points back at your own rejection story. Strip that.  
Rewrite: App makers: what did App Review reject you for that you can laugh about now?  

**#55 DROP**  
Why: Names Undirect 1.1.0 and describes a visual feature with a planned demo clip. This is a product announcement, not reply-seeking content.  

**#56 KEEP**  
Why: Neutral poll on a common pop-up behavior. Easy to answer, on-niche for Safari users, and free of any product framing.  

**#57 DROP**  
Why: Explicit “Coming in Cutling 2.0” feature teaser with a demo clip. Direct product content that conflicts with the replies-and-followers goal.  

**#58 REWRITE**  
Why: Relatable cookie-banner scenario that can pull replies, but turn it into a native poll.  
Rewrite: A cookie banner covers the page. You:  
Poll options: Accept all / Reject all / hunt for the X / leave  

**#59 DROP**  
Why: Names Cutling and walks through a memory-optimization detail. Too inside the product for a near-zero-follower account.  

**#60 KEEP**  
Why: Simple, open question about Notes-as-clipboard. Directly matches the retype/paste audience, easy to answer, and does not name a product.  

Five of these ten are product-named build stories or soft pitches and should be dropped. The remaining five are usable once the two polls are native.
<!-- grok:end a6 -->

### 1.4 Grok's stricter pick, the build stories, and the posts it would write instead

I then told Grok the owner's reaction and asked three things:

> A. The owner of this account read all 60 before you did and said "so many are no". You kept about 35
> of them. Be stricter. Assume I post only 1 to 2 originals a day for 14 days (your own advice), so
> about 20 to 25 slots. Pick the ones you would actually post, ranked by how likely each is to get a
> reply from a stranger when the account has 3 followers. For the ones you kept before and now cut, say
> plainly what is wrong with them as X posts (...). If it helps, look at real posts on X this month from
> small indie Apple-app makers (under about 3,000 followers) that got replies, and say what theirs have
> that these drafts lack.
>
> B. You dropped every build story because it names an app. Is naming my own app in a build-in-public
> post actually a problem on X for a tiny account, or is the problem only the link and the pitch? Of
> #11, #17, #20, #25, #29, #35, #37, #41, #44, #47, #49, #50, #51, #53, #55 and #57, which three or four
> are the strongest, and how would you rewrite each so it earns replies? Should the two Black Friday
> sale posts (#22 and #34; the sale is real, Nov 27 to 30) go out at all, and if so in what form?
>
> C. Write 12 new posts you would post instead for this account, ready to post (...). Then give me 5
> searches I can run on X every day to find posts worth replying to, written as X search queries I can
> paste into the search box.

#### Grok said

<!-- grok:begin a7 -->
**A. Stricter cut for ~20–25 slots**

With 1–2 originals a day the priority is only posts that give a stranger a reason to type a reply in the first hour. Pure tips and generic gripes from a 3-follower account almost never do that. Questions and native polls that force a short, personal answer do.

**Actually post these (ranked by reply chance from strangers):**

1. #4 How many tabs are open in Safari… (forces action + planned own reply)  
2. #19 Without looking: what’s the last thing you copied…  
3. #6 Mac people: first app you install on a new Mac  
4. #16 What’s an app you paid for once… still open every week  
5. #27 If you moved from Android to iPhone: what’s the one thing you still miss  
6. #10 What have you typed so many times…  
7. #31 iPhone people: Apple’s keyboard or another one…  
8. #45 What’s the oldest app still on your home screen…  
9. #38 App makers: how many languages… who checks the ones you can’t read  
10. #60 What do you keep in your Notes app only so you can copy it out again  
11. #26 Which Download button is real (with the picture + next-day answer)  
12. #8 / rewritten poll: You tap a link and a second tab…  
13. #12 / rewritten: Where do you keep the bits of text you paste…  
14. #28 / rewritten: Did you actually buy any software this Black Friday  
15. #33 / rewritten: A site wants your email before…  
16. #46 How does your address get into a checkout form…  
17. #43 / rewritten: App makers, who writes your other languages  
18. #52 / rewritten: App makers, your pricing  
19. #56 A pop-up appears… do you read it before you close it  
20. #58 / rewritten: A cookie banner covers the page. You:  
21. #1 “Accept all” is one tap… (strongest of the gripes)  
22. #9 I pressed the Back button…  
23. #14 Newsletter pop-up two seconds in…  
24. #23 Paste. “Allow Paste”. Paste again…  
25. #30 “Open in app” across the top…  

**Previously kept, now cut, and why:**

- All remaining pure tips (#2, #5, #13, #18, #24, #32, #39, #42): tips from unknown accounts get likes at best. No reason for a stranger to reply.  
- Weaker gripes (#36, #40, #48): too generic or give no personal hook that invites a story.  
- #21 video-play poll: fine but lower priority than the more personal questions.  

What real small indie Apple posts that get replies usually have (from this month’s posts): a direct ask (“drop your app”, “what did Review reject you for”, “first thing you install”), a specific personal stake, or a short puzzle. They almost never lead with a tip or a polished observation. The drafts that work are the ones that already do that; the rest do not.

**B. Naming the app**

Naming is not the problem. The problem is the pitch, the link, and the “look at my thing” framing when no one knows you yet. A specific, interesting failure or constraint that ends with a real question can name the app.

Strongest four, rewritten to earn replies:

- #25 → “Apple rejected the same app twice in one week because the preview videos showed a phone around the screen. A preview may only use captures of the app itself. Anyone else get hit with that?”  
- #50 → “App Review rejected my first iPhone submission. The setup button said ‘Open Safari Settings’ and opened the wrong page. The reviewer got stuck on screen one. What’s the rejection you can laugh about now?”  
- #11 → “Korean writes ‘tap’ and ‘tab’ the same way (탭). A headline about pop-ups that hijack taps became nonsense. Had to switch to ‘touch’. Anyone else hit a word that looks fine until it lands in the store?”  
- #41 → “I capped a snippet at 1,000 characters in May because of ‘iOS form layout issues’. It wasn’t the keyboard memory. Next version takes 10,000. What’s a limit you set for a reason you later forgot?”

Black Friday sale posts (#22, #34): skip both as written. One low-key version on the 27th or 30th is fine if it is not the only post that day and contains no link in the main text: “Black Friday prices on the two apps until the 30th. Happy to answer questions about either.” Then put links only if someone asks.

**C. 12 new posts + 5 daily searches**

**New posts (ready to post):**

1. Question: Mac people, what’s the first thing you delete when you set up a new Mac?  
2. Question: iPhone people, do you still use the three-finger copy/paste gestures or did you give up?  
3. Poll: When a site opens a tab you never tapped, you usually: Close it / Leave the site / Notice later / Depends  
4. Question: What’s one App Store review that actually changed how you use the app?  
5. Gripe: I opened one article and got a newsletter, a cookie banner, and an “open in app” bar before I could read the first sentence.  
6. Question: Solo makers, how do you decide when a bug is bad enough to fix the same day versus ship it?  
7. Poll: Your most-used text replacement shortcut is for: email / address / a phrase / nothing  
8. Question: What’s a Safari behaviour that still surprises you in 2026?  
9. Question: If you pay for one utility app and one subscription app, which two are they?  
10. Gripe: The Back button took me to a page I had already closed. Then another. Then another.  
11. Question: App Review people: what’s the smallest thing that got you rejected?  
12. Question: What do you keep on your Mac menu bar that you open more than once a day?

**5 daily X search queries (paste into search):**

1. `"App Store" OR SwiftUI (shipped OR launched OR rejected) -filter:replies lang:en`  
2. `("Safari" OR "iPhone") (tabs OR popup OR redirect OR "open in app") -filter:replies lang:en`  
3. `(keyboard OR "text replacement" OR clipboard OR paste) (iPhone OR Mac) -filter:replies lang:en`  
4. `"app review" OR "rejected" (iOS OR Mac) (indie OR solo OR "one person") -filter:replies lang:en`  
5. `( "menu bar" OR "Safari extension") (Mac OR iPhone) -filter:replies lang:en`
<!-- grok:end a7 -->

### 1.5 Grok on using Grok to run the account

Asked: which Grok features inside X help manage an account and on which plan; what Grok cannot see or
do for the account; four prompts to save; and to run the first prompt itself and list 8 real posts from
the last 6 hours, leaving out any it could not verify.

#### Grok said

<!-- grok:begin a8 -->
**1. Grok features inside X today**

These are the ones relevant to managing an account. Plan details have shifted with the October 2026 X Subscription bundling; older Premium/Premium+ still exist for existing subscribers. I mark certainty.

- **Grok icon in the main navigation / Grok tab or side panel**: On x.com and in the X apps, a Grok icon opens a chat panel (often on the right or as a full tab). You can ask it questions, paste post links, or request summaries. Available on free (limited daily use); higher limits and longer context on paid tiers (Plus and above). Sure this exists.  
- **“Analyze with Grok” / Grok button on a post**: Tap the Grok logo or the ⋯ menu on a post for options such as Explain this, Summarize, Is this true?, Open in Grok. It gives a private analysis of that post. Widely available; some users report fuller options or higher reliability on paid plans. Sure this exists (confirmed by Elon posts and user reports).  
- **@grok mentions**: Tag @grok in a public reply or post for a public answer. Free for everyone when capacity allows; Premium users have better reliability and reply prioritization. Sure.  
- **DeepSearch**: Multi-step research mode that searches web + X and returns a cited report. Primarily on grok.com / Grok app (SuperGrok / higher X Subscription tiers). Not a core in-timeline X feature. Moderately sure of the distinction.  
- **Think / reasoning mode**: Toggle for longer chain-of-thought. Available in Grok chat (higher limits on paid). Sure it exists; less sure how prominently it appears inside the X panel vs grok.com.  
- **Image generation (Imagine)**: Generate images/videos from text inside the Grok composer or Grok app. Included on paid plans (Plus and above for basic; higher quality/limits higher up). Sure.  
- **Grok Bot**: Always-on agent that can run tasks, routines, and (in some setups) interact via X. Included from the Premium / higher X Subscription tier upward. Sure it exists as a separate product.  
- **Radar (x.com/i/radar)**: Real-time keyword/trend monitor with volume charts. Limited version for Premium+ / higher tiers; fuller for business plans. Sure.  
- **Scheduled tasks / Automations**: Available in Grok (and Grok Bot) for recurring prompts. Not a native “schedule this post” tool inside X itself. Moderately sure.  

I am not certain of every exact menu label or which sub-features are gated behind which exact 2026 plan tier, because the interface and bundling have changed.

**2. What I cannot do for this account**

I cannot see your analytics, impressions, drafts, scheduled posts, notifications, or DMs. I cannot post, reply, schedule, or follow on your behalf. I only see public posts and profiles. Anything private to your account is invisible to me.

**3. Four reusable prompts**

**(a) Find posts worth replying to**  
Find posts from the last 6 hours by accounts with roughly 1,000–50,000 followers that are relevant to English-speaking iPhone/Mac users or indie app makers (Safari tabs/redirects, keyboards, text replacement, menu-bar apps, App Review, solo shipping). For each, give the URL, handle, approximate age, and one sentence on a useful, non-promotional reply I could add from the perspective of a solo maker of small Apple utilities. Only include posts you can actually verify exist right now.

**(b) Check a draft before posting**  
Here is a draft post for @monholtco (3 followers, goal is replies and followers for the next two weeks, not selling). Account is a solo maker of two paid Apple apps (Undirect Safari extension and Cutling keyboard/menu-bar). Audience is English-speaking iPhone/Mac users and other indie makers. Judge it: KEEP, REWRITE or DROP. If REWRITE, give the rewritten version under 280 characters, first person, no hashtags, no product pitch. Be blunt about whether a stranger is likely to reply.

**(c) What the niche is talking about today**  
What are English-speaking iPhone, Mac, Safari, and indie Apple-app makers talking about on X in the last 24 hours? List the main topics with 2–3 example posts (handles + short quotes) for each. Focus on problems, shipping, App Review, keyboards, tabs, and small utilities rather than big-company news.

**(d) Weekly review of my posts**  
Review the public posts from @monholtco in the last 7 days. For each, note approximate views/replies if visible, what worked or didn’t for generating replies from strangers, and one concrete suggestion for next week. Be blunt.

**4. Real posts from the last ~6 hours (verified via search)**

Current time is ~04:20 UTC on 22 Nov 2026. These are posts I actually retrieved:

- https://x.com/plotarmordev/status/2124348393837207908 — @plotarmordev (~8.6k followers), ~1 hour old. Open-source iPhone dictation keyboard adding a language key. You could note the practical friction of on-device language switching and ask how they handle the model loading.  
- https://x.com/xinxianhub/status/2124311404173824123 — @xinxianhub (~6.4k followers), ~3 hours old. Comment on Hex’s on-device dictation and the “full access” permission. You could share a short observation about what still breaks in real dictation on Apple keyboards.  
- https://x.com/maomao000211/status/2124321545556267391 — @maomao000211 (~550 followers; borderline low), ~2.5 hours old. Direct question: first menu-bar app on a fresh Mac. Easy to answer with one concrete utility you rely on.  
- https://x.com/hpx1107/status/2124322147967373494 — @hpx1107 (low follower count), ~2.5 hours old. Hot take that indie Mac apps die from silence after shipping. You could agree with a specific example of a small utility that stayed visible only because the maker kept posting the small fixes.  

I could not verify eight posts that cleanly matched the 1k–50k follower band, last-6-hours window, and niche in this search pass. The four above are the ones that actually appeared and are usable. Run the saved prompt (a) yourself later in the day for a fresher list.
<!-- grok:end a8 -->

**Checked the same hour:** all four posts Grok listed were opened on x.com and exist, with the text Grok
described: @plotarmordev's dictation keyboard (2124348393837207908), @xinxianhub on Hex's iPhone
dictation, ending "What name does your phone still get wrong?" (08:18 WIB, 267 views),
@maomao000211's "fresh install, what's the first menu bar app you put back before anything else?"
(08:58 WIB, 73 views) and @hpx1107's "most indie Mac apps don't fail because of marketing" (09:00 WIB,
155 views). Grok was asked for eight and returned four, saying it could not verify more. So as a finder
of fresh threads it works, in small numbers. The follower counts it gave were not checked.
@maomao000211's question is nearly draft #6, posted by someone else today.

### 1.6 Grok's main points, in short

1. Verdicts on the 60, first pass: 29 keep, 10 rewrite, 21 drop. Every drop is a post that names an
   app or sells (all 16 build stories, both threads, both sale posts, the MacPip quote, the "both my
   apps" question) plus the post about my own posting research (#3).
2. Told the owner had said "so many are no", it cut to 25: the ten open questions, the Download-button
   puzzle, nine polls and five gripes. It then cut every tip ("tips from unknown accounts get likes at
   best. No reason for a stranger to reply") and the weaker gripes.
3. Every poll written as text should be a native poll.
4. Naming the app is not the problem; "the pitch, the link, and the 'look at my thing' framing" are. A
   build story survives if it is one specific failure or constraint and ends on a real question. Its
   four: the preview-video rejection (#25), the wrong-Settings rejection (#50), Korean tap/tab (#11),
   the 1,000-character cap (#41).
5. Volume: 1 to 2 originals a day, and 15 to 40 replies a day to other people's posts. Hours: 19:00 to
   23:00 WIB first.
6. Replies: accounts of 1k to 50k followers, posts under 2 to 4 hours old, one to three sentences that
   add an observation, a parallel or a question, no link.
7. Sale posts: skip as written; at most one low-key line with no link.
8. Stop: product posts and link replies as the main content.

## 2. Grok's claims about the algorithm, checked

Sources read this session (2026-11-22): `github.com/xai-org/x-algorithm` at its head (last push
2026-11-21T03:11Z), files fetched one by one through the GitHub API; `help.x.com/en/using-x/x-premium`
and `help.x.com/en/using-x/about-grok` opened in Chrome; two posts on x.com. "Earlier research" means
`docs/research/x-account-health-and-practice.md` (2026-11-21), not re-read at the source today.

| # | Grok's claim | Verdict | What the source says |
|---|---|---|---|
| 1 | Replies carry "around 5x a like in published weights" | Confirmed, number off | `home-mixer/params/param.rs`: `ReplyWeight` 5.0, `FavoriteWeight` 0.708, so about 7x; 5 is the reply weight itself. The file's own comment warns the weights multiply a predicted probability for one viewer, not counts. |
| 2 | Ranking rewards predicted replies, quotes and follows more than likes | Confirmed | Same file: quote 5.0, follow author 4.0, share by DM 5.0, share by copied link 20.0, repost 1.0, like 0.708, open link 0.2, profile click 0; a reply between two accounts that follow each other gets a further 15.0 (`BidirectionalFollowReplyWeightBoost`). Not interested -53.07, report -234. |
| 3 | A new-author boost: 50k followers or fewer, an original (not a reply or repost), 2 hours old or less, under 200 Home impressions, above the bottom 3%, lifted to about slot 16, picked by early like rate | Confirmed | `param.rs`: `ColdStartFollowerCap` 50000, `ColdStartMaxPostAgeSecs` 7200, `ColdStartImpressionThreshold` 200, `ColdStartSlotMin` 15, `ColdStartSlotMax` 16, `LowImpressionsMaxPositionRatio` 0.97, `EnableColdStartThompsonSampling` true. `home-mixer/scorers/author_cold_start.rs`, `cold_start_base_eligible`: `in_reply_to_tweet_id.is_none() && retweeted_tweet_id.is_none()` and the follower cap. A quote post passes that test. |
| 4 | "At most one qualifying original per feed load" | Confirmed | `author_cold_start.rs`, `apply_cold_start`: among the eligible posts already in one viewer's candidate list it picks a single index (`pick_thompson` returns one; `record_cold_started_posts(arm, 1)`) and raises that one post's score to the target slot. The post has to have been retrieved for that viewer first. |
| 5 | Out-of-network posts are discounted | Confirmed | README, "Out-of-Network Discount"; `vm-ranker/params.rs`: `OonWeightFactor` 0.75. |
| 6 | Replies from accounts the viewer does not follow are filtered from For You (`OONRetweetReplyFilter`) | Confirmed | `home-mixer/filters/oon_retweet_reply_filter.rs` drops an out-of-network reply unless `EnablePhoenixOonReplies` is on, and its default in `param.rs` is false. A reply of mine is seen inside the thread, not in strangers' feeds. |
| 7 | Repeated-author decay: later posts by one author get a decaying multiplier | Confirmed, and it corrects the earlier research | README, "Author Diversity: each post after an author's first is multiplied by a decaying factor, down to a floor". `vm-ranker/params.rs`: `EnableAuthorDiversity` true, decay 0.5, floor 0.25. (`home-mixer/scorers/value_model.rs` sets it off for its own pass, which is what the 2026-11-21 file reported; the vm-ranker service that reorders the result has it on.) It works inside one feed response: my second post in the same person's feed load counts half, later ones a quarter. It is not a penalty per day. |
| 8 | No explicit penalty for a URL in the scoring formula; opening a link has a small positive weight, about 0.2 | Confirmed, with one caveat | `OpenLinkWeight` 0.2; no rule on URLs in the scoring files. Caveat: `home-mixer/models/content_features.rs` passes `has_url` to the ranking model as a feature, so what the model has learned about link posts is not visible. |
| 9 | "X leadership stated in mid-2026 that links had not been penalized for over a year" | Confirmed | Elon Musk, 2026-07-29, replying to @paulg, @nikitabier and @finkd: "We haven't for over a year" (x.com/elonmusk/status/2082273378749268440). Nikita Bier the same day: "you do not need to put the links in replies anymore" (x.com/nikitabier/status/2082217171506344297). |
| 10 | Putting the link in a reply is older advice, not required | Confirmed by X's word | Row 9. The drafts' habit of putting the link in my own reply ten minutes later is no longer needed. Still true from the earlier research: X's spam rule names accounts whose posts are mostly links. |
| 11 | Native polls are not specially treated in the ranking code | Confirmed as far as searched | Code search for `has_poll`: 0 hits; `poll` hits are queue consumers and a text renderer, none in a scorer or filter. |
| 12 | Conversation collapsing exists; no structural advantage for threads | Confirmed | `home-mixer/filters/dedup_conversation_filter.rs` keeps the one best-scored post per conversation in a feed response, so an 8-post thread competes as one post. Nothing that lifts threads was found. |
| 13 | Premium gives reply prioritization in conversations (Help Center), larger on higher tiers | Confirmed | `help.x.com/en/using-x/x-premium`, read today: Basic "reply prioritization", Premium "larger reply prioritization ... and increased usage limits on Grok", Premium+ "largest reply prioritization, Radar Search", SuperGrok and Grok Bot. No number is given. |
| 14 | No Premium multiplier in the For You scoring weights | Confirmed as far as searched | Code search for `premium` and `is_blue_verified`: hits in visibility filtering, ads, abuse enforcement and `user-cred-v2`, none in `home-mixer/scorers`. Earlier research: Premium accounts are in the credibility seed set. |
| 15 | Quote posts work like originals for ranking | Confirmed for the new-author boost | Row 3: a quote is neither a reply nor a repost. |
| 16 | High volume of similar posts risks spam or automation filters | Confirmed in earlier research | Help Center platform-manipulation rule and the repo's duplicate-text rules, quoted in the 2026-11-21 file; not re-read today. |
| 17 | "The published weights have moved multiple times in 2026" | Partly confirmed | `param.rs` has 66 commits between 2026-08-13 and 2026-11-21; whether the weights themselves moved was not diffed. |
| 18 | No rule about the hour of posting in the code; best hours 19:00 to 23:00 WIB, then 07:00 to 10:00 or 00:00 to 02:00 WIB | Unconfirmed, and two labels are wrong | The hours are Grok's judgement from third-party studies (Buffer, Sprout), not from X. 19:00 to 23:00 WIB is 07:00 to 11:00 US Eastern, and agrees with the 26 of 35 strong posts counted in `x-engagement-mix.md`. But 07:00 to 10:00 WIB is 19:00 to 22:00 US Eastern the evening before and 01:00 to 04:00 in central Europe, not "Europe afternoon"; and 00:00 to 02:00 WIB is 09:00 to 11:00 US Pacific, not "West Coast evening". |
| 19 | 1 to 2 originals a day "maximum" | Unconfirmed (Grok's judgement) | No daily cap was found in the code. Each original under 2 hours and 200 impressions is eligible for the lift on its own (row 3); the decay in row 7 only bites when two of my posts land in one person's feed load. |
| 20 | 15 to 40 replies a day | Unconfirmed, and at odds with X's own rule | Earlier research: the Help Center names "bulk, aggressive, high-volume unsolicited replies", and the reply scorer is shown "Num Replies Last 24 Hours" and "Follower Count". The earlier course of action says 5 to 10 a day; that stands. |
| 21 | Reply to accounts of 1k to 50k followers, posts under 2 to 4 hours old | Unconfirmed (Grok's judgement) | Nothing in X's sources sets these numbers. Earlier research: replies under a post whose author has over 250,000 followers go to a stricter Grok scorer. |

Seen in X's own screens today, not from Grok: the account's Analytics page says "Detailed engagement
metrics become available once you reach 50 followers" and shows "Verified followers 2 / 3"; the profile
carries the checkmark.

## 3. Guides and routines for using Grok to manage an X account

### 3.1 X's and xAI's own pages, and what X's screens show

| Source | What it says |
|---|---|
| X Help Center, "About Grok", help.x.com/en/using-x/about-grok (read in Chrome 2026-11-22) | Grok "has a unique feature that allows it to decide whether or not to search X public posts and conduct a real-time web search". It is reached from "the Grok icon in the navigation bar". "It may confidently provide factually incorrect information, missummarize, or miss some context. We encourage you to independently verify any information you receive." Inputs and results may be used for training unless switched off under Privacy & Safety, Data sharing and personalization, Grok & Third-party Collaborators. A newer section covers "Grok Bot in X Chat": a bot you message like a contact, which signs in to tools you select and asks approval per action. The page describes no feature for analytics, drafting, scheduling or post analysis. |
| X Help Center, "About X Premium", help.x.com/en/using-x/x-premium (read in Chrome 2026-11-22) | Premium: checkmark, "larger reply prioritization", "increased usage limits on Grok". Premium+: "SuperGrok access, Grok Bot ... largest reply prioritization, Radar Search, and Articles". X Premium "is now part of The X Subscription, one plan for X, Grok, and Cursor". |
| X Help Center search for "grok" (17 results, read 2026-11-22) | Only two Grok pages exist: "About Grok" and "Grok Bot Template Rewards Pilot". The rest mention Grok in passing: in Chat you can "Select 'Ask Grok'" on a message or image; Grok sorts message requests into Priority or Hidden. There is no help page for "Explain this post". |
| xAI docs, X Search tool, docs.x.ai/docs/tools/x-search | Grok's search of X "enables Grok to perform keyword search, semantic search, user search, and thread fetch"; keyword search takes X's advanced search operators, sorted Top or Latest; date limits by day. No filter for minimum likes is documented. |
| x.com as @monholtco, 2026-11-22 | Every post carries an "Explain this post" button (the Grok mark, top right of the post). The composer has "Generate image", "Add poll", "Schedule post" and "Add another post". The Grok page has a "Think Harder" button, a model picker ("Auto"), a "Private" switch and a "Usage" meter. Analytics shows details only from 50 followers. |

### 3.2 Guides by tool sellers (each sells a scheduler or analytics tool; treat as advice, not fact)

| Source | What it says |
|---|---|
| Tweet Hunter, "How to Use Grok on X (Twitter): The Complete 2026 Guide", tweethunter.io/blog/how-to-use-grok-on-twitter-x | Prompts: "10 tweet ideas about [your niche] based on what is trending on X today"; paste a draft and ask for it "more direct and punchy, under 280 characters"; ask which posts about a topic were most shared in the last 24 hours; paste a thread's URL for its key points; ask what kind of posts from a named account get the most engagement. Limit it states: Grok does not track your analytics over time. |
| AutoTweet, "X Grok AI: how to use it (2026)", autotweet.io/blog/x-grok-ai-how-to-use-2026 | On any post, the "..." menu has "Ask Grok". Prompts: "What are the top 5 conversations happening in [niche] on X right now?", "What are people in the [niche] space complaining about on X this week?", "Summarize this thread and give me the 3 key takeaways." Limits it states: Grok "is purely a chat-based assistant" (no posting or scheduling), "does not remember your brand voice ... between sessions", and can give plausible wrong figures. It rates Grok's drafting "Decent" and recommends Grok for research, not for writing. |
| Unfollr, "How to Use Grok AI on X/Twitter in 2026", unfollr.com/blog/how-to-use-grok-on-twitter | Prompts: "What topics are trending in the [your niche] space on X right now?", "What angles on [subject] are getting the most replies this week?", "What questions do [target audience] frequently ask on X about [topic]?", "What has [account] been posting about this week and what's getting the most engagement?". For replies: select a post, ask Grok for a response, then edit it into your own voice. Limits: no posting, no DMs or private data, no statistics over time; quality drops in very long chats, so start a fresh chat per topic. |
| Metricool, "Grok explained", metricool.com/grok-ai | General only: ideas, captions, trend and hashtag reading; "Use Grok as a support, not a replacement." No prompts. |

### 3.3 Creators' documented routines

| Source | What it says |
|---|---|
| @rajsh7894, X Article "I Found a Way to Automate Content Research on X Using Grok (Full Prompt)", 2026-11-10, 57 replies, 179 likes, 7,298 views, x.com/rajsh7894/status/2120000935913247132 (read whole) | A Grok Bot (x.ai/bot) set up as a research assistant. Give it one job with the niche and audience, and the rules "Never publish anything automatically", "Always distinguish verified information from speculation", "Include relevant sources". Teach it your voice from 5 to 10 of your own posts. Each morning it lists 5 to 10 content opportunities with what happened, why people discuss it, an angle, hooks and links; each Monday it reviews the week from analytics you give it ("Don't assume it can automatically access private account information"). "Don't focus on generating 50 posts every day." His niche is crypto. |
| @SebastianRoehl (HabitKit, 25.8K), x.com/SebastianRoehl/status/2122659013263503432, 15 replies, 50 likes (from `x-engagement-mix.md`) | "My favorite automation right now: a Grok Bot reads my entire X feed every day and sends me three ideas for my apps." |
| @JustinasRoland0 (MacPip), x.com/JustinasRoland0/status/2123203042715603436, 36 replies, 600 likes, 937 bookmarks (from `x-engagement-mix.md`) | "New Mac? Grok recommends installing these 30 apps first.": Grok's answer used as the post itself, as one picture. |
| @ryangrowthh, "14 X growth tips" (video, transcribed in `x-account-health-and-practice.md`) | Recommends Grok at $40 a month as a researcher of X. |
| @HeyYoGB, X Article "How to Build Your Own AI Content Team With Grok Bot + Typefully", 2026-10-30, 123 likes, x.com/HeyYoGB/status/2116197697028018580 (only its opening was read) | "grok bot can write your posts all day. on its own, it cant schedule them or post them." |

Not found: an X Engineering or Help Center page that documents "Explain this post", Grok post analysis,
Grok drafting in the composer, or Grok answering questions about your own analytics. Grok itself said
(1.5) that it cannot see analytics, impressions, drafts, scheduled posts, notifications or DMs, and
cannot post, reply, schedule or follow.

## 4. A daily routine for @monholtco that uses Grok where it helps

Built only from the sources above. About 30 to 45 minutes, best inside 19:00 to 23:00 WIB.

1. **Find threads (Grok, 5 minutes).** Open x.com/i/grok, start a new chat (Unfollr: long chats get
   worse), paste the saved prompt below. Today it returned four real posts, all under three hours old
   and on the subject. Open each one and read it before replying.

   > Find posts from the last 6 hours by accounts with roughly 1,000 to 50,000 followers that are
   > relevant to English-speaking iPhone/Mac users or indie app makers (Safari tabs/redirects,
   > keyboards, text replacement, menu-bar apps, App Review, solo shipping). For each, give the URL,
   > handle, approximate age, and one sentence on a useful, non-promotional reply I could add from the
   > perspective of a solo maker of small Apple utilities. Only include posts you can actually verify
   > exist right now.

   Top up from X's own search, Latest tab, with Grok's five queries (given in 1.4; not run today), for
   example `("Safari" OR "iPhone") (tabs OR popup OR redirect OR "open in app") -filter:replies lang:en`.
2. **Reply by hand, 5 to 10 a day.** One to three sentences that add a fact, a parallel or a question;
   no link, no app name unless asked; never several within minutes. Grok says 15 to 40; X's spam rule
   and the reply scorer's inputs say stay low while the account has 3 followers (section 2, row 20).
   Grok may suggest what to add, but the reply is typed by the owner in his own words: every guide
   above says edit, and @rajsh7894's rule is "Never publish anything automatically".
3. **Read a post you do not follow (Grok, as needed).** Press "Explain this post" on it before
   replying.
4. **Check the day's 1 or 2 originals (Grok, 2 minutes each).** Paste the draft with:

   > Here is a draft post for @monholtco (new account, goal is replies and followers for the next two
   > weeks, not selling). One maker of two paid Apple apps. Audience: English-speaking iPhone and Mac
   > users and other indie makers. Judge it: KEEP, REWRITE or DROP. If REWRITE, give the rewritten
   > version under 280 characters, first person, no hashtags, no product pitch. Be blunt about whether
   > a stranger is likely to reply.

   Take the verdict; check any rewrite for facts and for "I". In this review Grok's rewrites lost the
   first person once (#7) and changed a fact once (#7, "the page itself says").
5. **What the niche is talking about (Grok, 3 minutes, once a day).**

   > What are English-speaking iPhone, Mac, Safari, and indie Apple-app makers talking about on X in
   > the last 24 hours? List the main topics with 2 to 3 example posts (handles and short quotes) for
   > each. Focus on problems, shipping, App Review, keyboards, tabs, and small utilities rather than
   > big-company news.

   Use it to choose which question from the list goes out today, or which post to quote. A quote post
   is an original, so it is eligible for the new-author lift; a reply is not (section 2, rows 3 and 6).
6. **Post.** Originals go out as native posts; polls as native polls, by hand. Answer every reply to
   my own posts the same day.
7. **Once a week (Grok, 10 minutes).** Grok cannot see analytics, and X shows the account detailed
   analytics only from 50 followers. Until then, copy each post's views, replies and likes from the
   profile into the chat and ask:

   > Review the public posts from @monholtco in the last 7 days. For each, note approximate
   > views/replies if visible, what worked or didn't for generating replies from strangers, and one
   > concrete suggestion for next week. Be blunt.

Optional, costs money, owner's call: a Grok Bot that does steps 1 and 5 by itself each morning
(@rajsh7894, @SebastianRoehl). The Help Center lists Grok Bot under Premium+.

## 5. The revised list

Grok's two verdicts and the final one, for each of the 60. "Final" is this session's judgement after
Grok's review and the checks in section 2. Rules applied: first person singular; no product pitch in
any question or poll; 1 to 2 originals a day, so about 30 posts for the 14 days.

Final count: 15 keep, 15 rewrite, 30 drop. Of the 30 to post: 13 questions, 5 native polls, 3 gripes,
6 build stories that end on a question, 2 quotes, 1 sale post.

| # | Drafted for | Kind | Opens | Grok, first pass | Grok, stricter pass | Final | Final words, or why |
|---|---|---|---|---|---|---|---|
| 1 | Mon Nov 23 06:43 | Gripe | "Accept all" is one tap. "Reject all" is a secon... | KEEP | post it, rank 21 of 25 | **KEEP** | Unchanged. |
| 2 | Mon Nov 23 15:37 | Tip | You can copy and paste on an iPhone without the ... | REWRITE | cut: a tip gives a stranger no reason to reply | **REWRITE** | You can copy on an iPhone by pinching in with three fingers, and paste by pinching out. Does anyone actually use that, or do you still long-press? |
| 3 | Mon Nov 23 18:52 | Build story | Before posting anything here I read 398 posts fr... | DROP | dropped | **DROP** | A post about my own posting research is of no use to a stranger. |
| 4 | Mon Nov 23 21:47 | Question | How many tabs are open in Safari on your phone r... | KEEP | post it, rank 1 of 25 | **KEEP** | Unchanged, with "I'm on 9 right now." as my reply under it. |
| 5 | Tue Nov 24 02:19 | Tip | Safari on iPhone can close every tab at once. Op... | KEEP | cut: a tip gives a stranger no reason to reply | **DROP** | Not a post of its own. Use it as my second reply under #4 the next day: "If your number scared you: touch and hold Done, then Close All Tabs." (my suggestion, not Grok's) |
| 6 | Tue Nov 24 06:07 | Question | Mac people: what's the first app you install on ... | KEEP | post it, rank 3 of 25 | **KEEP** | Unchanged, but not on Nov 24: @maomao000211 asked nearly the same thing on Nov 22. Reply to theirs now; post mine in the second week, or use new post N1. |
| 7 | Tue Nov 24 15:44 | Other people's work (quote) | I know this one. My Safari extension was rejecte... | REWRITE | not ranked | **REWRITE** | Quote of @iPritamX: I know this one. App Review rejected my Safari extension on the Mac because its button was "greyed out and unresponsive". The reviewer was on Safari's Start Page, where Safari greys out every extension's button. What's the strangest reason you've been given? (Grok's own rewrite dropped "my" and got the fix wrong, so these are my words.) |
| 8 | Tue Nov 24 18:23 | Native poll | You tap a link and a tab you never asked for ope... | REWRITE | post it, rank 12 of 25 | **REWRITE** | Native poll, Grok's words: You tap a link and a second tab you never asked for opens. What do you usually do? Options: Close it and keep going / Leave the site / Notice it much later / Depends on the site |
| 9 | Tue Nov 24 22:11 | Gripe | I pressed the Back button. That was the whole me... | KEEP | post it, rank 22 of 25 | **KEEP** | Unchanged. |
| 10 | Wed Nov 25 05:26 | Question | What have you typed so many times that your thum... | KEEP | post it, rank 6 of 25 | **KEEP** | Unchanged. |
| 11 | Wed Nov 25 16:09 | Build story | Something I learned from Undirect's Korean App S... | DROP | one of its four strongest build stories, rewritten with a question | **REWRITE** | Korean writes "tap" and "tab" the same way: 탭. So my App Store headline about pop-ups that hijack your taps now says 터치, touch. App makers: which word of yours looked fine until it was translated? (The tap/tab reason is still marked GUESS in the drafts file.) |
| 12 | Wed Nov 25 19:34 | Poll as text | Where do you keep the text you paste again and a... | REWRITE | post it, rank 13 of 25 | **REWRITE** | Native poll: Where do you keep the bits of text you paste again and again? Options: Notes / A chat with myself / Text replacement / I just retype it |
| 13 | Wed Nov 25 23:08 | Tip | iPhone calendar suddenly full of "your phone is ... | KEEP | cut: a tip gives a stranger no reason to reply | **DROP** | Banked. The best of the tips, for when there are followers to like and save it. |
| 14 | Thu Nov 26 03:51 | Gripe | A newsletter pop-up two seconds into the first a... | KEEP | post it, rank 23 of 25 | **DROP** | Folded into new post N2. |
| 15 | Thu Nov 26 16:41 | Other people's work (quote) | Every deal on this list was put there by the per... | DROP | dropped | **REWRITE** | Quote of @JustinasRoland0's list: Every deal on this list was put there by the person who made the app. Which one had you never heard of before today? ("Two of them are mine" is gone. Grok said drop; I keep it as a courtesy quote because his list tags @monholtco.) |
| 16 | Thu Nov 26 19:57 | Question | What's an app you paid for once, years ago, and ... | KEEP | post it, rank 4 of 25 | **KEEP** | Unchanged. |
| 17 | Thu Nov 26 22:48 | Build story | A small thing I like in Undirect's Tamil. The ap... | DROP | dropped | **DROP** | Names the app, asks nothing. |
| 18 | Fri Nov 27 02:33 | Tip | Copy on your iPhone, paste on your Mac. It alrea... | KEEP | cut: a tip gives a stranger no reason to reply | **DROP** | Banked tip. |
| 19 | Fri Nov 27 06:17 | Question | Without looking: what's the last thing you copie... | KEEP | post it, rank 2 of 25 | **KEEP** | Unchanged. |
| 20 | Fri Nov 27 15:13 | Build story | The first screenshot on Undirect's App Store pag... | DROP | dropped | **DROP** | App Store page work shown as content. |
| 21 | Fri Nov 27 19:42 | Poll as text | You tap Play on a video. What happens first on t... | KEEP | cut: lower priority | **DROP** | Overlaps #8. |
| 22 | Fri Nov 27 23:26 | Sale | Black Friday, Nov 27 to 30 on the App Store:... | DROP | skip as written; one low-key line at most | **KEEP** | The one sale post, in the owner's approved words. The sale is real and is the only discount allowed. The link may sit in the post itself (Bier, Musk, July 2026). Grok would post only "Black Friday prices on the two apps until the 30th. Happy to answer questions about either.", which names neither app nor price. |
| 23 | Sat Nov 28 04:38 | Gripe | Paste. "Allow Paste". Paste again. "Allow Paste"... | KEEP | post it, rank 24 of 25 | **KEEP** | Unchanged. |
| 24 | Sat Nov 28 16:27 | Tip | Your iPhone can type your email address for you.... | KEEP | cut: a tip gives a stranger no reason to reply | **DROP** | Banked tip; its subject returns as new poll N4. |
| 25 | Sat Nov 28 19:18 | Build story | Apple rejected Cutling twice in a week for the s... | DROP | one of its four strongest build stories, rewritten with a question | **REWRITE** | Apple rejected my app twice in one week for the same thing: my App Store preview videos showed a phone around the screen. A preview may only use captures of the app itself. Has that one caught anybody else? |
| 26 | Sat Nov 28 22:36 | Question | Three Download buttons, one file. Which one is r... | KEEP | post it, rank 11 of 25 | **KEEP** | Unchanged. Needs its picture and the next-day answer. |
| 27 | Sun Nov 29 06:49 | Question | If you moved from Android to iPhone: what's the ... | KEEP | post it, rank 5 of 25 | **KEEP** | Unchanged. |
| 28 | Sun Nov 29 17:23 | Native poll | Did you buy any software this Black Friday?... | REWRITE | post it, rank 14 of 25 | **REWRITE** | Native poll, Grok's words: Did you actually buy any software this Black Friday? Options: Yes, a subscription / Yes, a one-time purchase / Looked and bought nothing / What sale? |
| 29 | Sun Nov 29 20:41 | Build story | Three of my tests fail whenever I forget one thi... | DROP | dropped | **DROP** | A pitch and a link under a build story. |
| 30 | Sun Nov 29 23:52 | Gripe | "Open in app" across the top of an article I ope... | KEEP | post it, rank 25 of 25 | **DROP** | Folded into new post N2. |
| 31 | Mon Nov 30 03:17 | Question | iPhone people: are you on Apple's keyboard or an... | KEEP | post it, rank 7 of 25 | **KEEP** | Unchanged. Dictation keyboards are being talked about today (Grok's finds), so this one can go early. |
| 32 | Mon Nov 30 06:31 | Tip | Closed a Safari tab by mistake on your iPhone? O... | KEEP | cut: a tip gives a stranger no reason to reply | **DROP** | Banked tip. |
| 33 | Mon Nov 30 15:49 | Poll as text | A site wants your email before it shows you the ... | REWRITE | post it, rank 15 of 25 | **REWRITE** | Native poll: A site wants your email before it shows you the page. You type: Options: My real one / The spam one / A made-up one / Nothing, I leave |
| 34 | Mon Nov 30 18:44 | Sale | Last day.... | DROP | skip as written; one low-key line at most | **DROP** | One sale post is enough at 3 followers. |
| 35 | Mon Nov 30 22:21 | Build story, thread of 6 | 1/ A 4-star review of Cutling on MacPip said its... | DROP | dropped | **REWRITE** | Thread dropped for now; one post from it: Apple doesn't publish how much memory an iPhone gives a keyboard. It's in the firmware: 77 MB. A share sheet gets 120, a widget 30. Go over it and iOS shuts the keyboard. Keyboard makers: what did you have to cut to fit? (The owner asked for this story; the full thread waits until there are readers. His call.) |
| 36 | Tue Dec 1 05:12 | Gripe | An Unsubscribe link that opens a login page. If ... | KEEP | cut: weaker gripe | **DROP** | Banked. Grok cut it as a weaker gripe. |
| 37 | Tue Dec 1 16:33 | Build story | About last night's thread: for an hour and twent... | DROP | dropped | **DROP** | Only makes sense after #35. |
| 38 | Tue Dec 1 19:48 | Question | People who make apps alone: how many languages i... | KEEP | post it, rank 9 of 25 | **KEEP** | Unchanged. |
| 39 | Tue Dec 1 22:54 | Tip | When a pop-up in Safari won't close, leave its X... | KEEP | cut: a tip gives a stranger no reason to reply | **DROP** | Banked tip. |
| 40 | Wed Dec 2 02:41 | Question | Which do you trust less: a big green Download bu... | KEEP | cut: weaker gripe | **DROP** | Grok cut it as generic. |
| 41 | Wed Dec 2 06:22 | Build story | Since May, Cutling has stopped a snippet at 1,00... | DROP | one of its four strongest build stories, rewritten with a question | **REWRITE** | In May I capped a snippet at 1,000 characters. I thought the keyboard's memory was why. My own commit says "because of iOS form layout issues". The next version takes 10,000. What limit did you set for a reason you've since forgotten? |
| 42 | Wed Dec 2 15:18 | Tip | Tired of Safari on your Mac asking "Allow notifi... | KEEP | cut: a tip gives a stranger no reason to reply | **DROP** | Banked tip. |
| 43 | Wed Dec 2 18:39 | Poll as text | App makers: who writes your app's other language... | REWRITE | post it, rank 17 of 25 | **DROP** | Overlaps #38, which Grok ranks higher. |
| 44 | Wed Dec 2 22:03 | Build story | I pressed Stop next to a site in Undirect's Mac ... | DROP | dropped | **DROP** | Inside the app. |
| 45 | Thu Dec 3 04:47 | Question | What's the oldest app still on your home screen,... | KEEP | post it, rank 8 of 25 | **KEEP** | Unchanged. |
| 46 | Thu Dec 3 17:27 | Native poll | How does your address get into a checkout form o... | KEEP | post it, rank 16 of 25 | **DROP** | Fifth poll on forms and pasting; the budget is 1 to 2 posts a day. |
| 47 | Thu Dec 3 21:09 | Build story, thread of 8 | 1/ Undirect is in all 50 App Store languages. No... | DROP | dropped | **REWRITE** | Thread dropped for now; one post from it: My app is in 50 languages, and no native speaker has read any of them yet. If you read something other than English: what's the first thing that tells you an app's translation was never read by a person? (Saying this in public is the owner's call, as the drafts file already notes.) |
| 48 | Fri Dec 4 02:14 | Gripe | Every checkout form asks for my address in a dif... | KEEP | cut: weaker gripe | **DROP** | Grok cut it as a weaker gripe. |
| 49 | Fri Dec 4 05:58 | Build story | One Urdu word broke an App Store screenshot of m... | DROP | dropped | **DROP** | Inside the app. |
| 50 | Fri Dec 4 16:16 | Build story | Apple rejected Undirect's first iPhone submissio... | DROP | one of its four strongest build stories, rewritten with a question | **REWRITE** | Apple rejected my first iPhone submission, and they were right. My setup button said "Open Safari Settings" and opened the wrong page, so the reviewer got stuck on the first screen. App makers: which rejection can you laugh about now? (Carries #54's question.) |
| 51 | Fri Dec 4 19:29 | Question | Both my apps cost money on the App Store, and al... | DROP | dropped | **REWRITE** | Would you pay for an app whose code is public, when you could build it yourself for free? (Grok dropped it for opening on "Both my apps"; without them it is a clean question for makers. My rewrite.) |
| 52 | Fri Dec 4 23:34 | Poll as text | App makers, your pricing:... | REWRITE | post it, rank 18 of 25 | **REWRITE** | Native poll: App makers, how do you charge? Options: Free / Pay once / Subscription / It's complicated. My reply under it: And would you pick the same again? |
| 53 | Sat Dec 5 06:51 | Build story | Two things a second read of Undirect's translati... | DROP | dropped | **DROP** | Inside the app. |
| 54 | Sat Dec 5 15:41 | Question | App makers: what did App Review reject you for t... | REWRITE | dropped | **DROP** | Merged into #50. |
| 55 | Sat Dec 5 18:26 | Build story | Some pages put an invisible sheet over the Play ... | DROP | dropped | **DROP** | A release announcement. Hold it for the day 1.1.0 is live. |
| 56 | Sat Dec 5 21:37 | Native poll | A pop-up appears in the middle of what you're re... | KEEP | post it, rank 19 of 25 | **DROP** | Overlaps #8. |
| 57 | Sun Dec 6 03:23 | Build story | Coming in Cutling 2.0: a saved reply can have a ... | DROP | dropped | **DROP** | A release teaser. Hold it for the day 2.0 is live. |
| 58 | Sun Dec 6 16:28 | Poll as text | A cookie banner covers the page. You:... | REWRITE | post it, rank 20 of 25 | **DROP** | Folded into new post N2; #1 already covers cookie banners. |
| 59 | Sun Dec 6 19:11 | Build story | In a test with 10,000 snippets, Cutling's keyboa... | DROP | dropped | **DROP** | Inside the app. |
| 60 | Sun Dec 6 21:58 | Question | What do you keep in your Notes app only so you c... | KEEP | post it, rank 10 of 25 | **KEEP** | Unchanged. |

### New posts from Grok that fit (alternates; swap one in where a kept post feels stale)

Grok's own words are in 1.2 and 1.4; these are tidied to the account's voice.

| # | Kind | Words | From |
|---|---|---|---|
| N1 | Question | Mac people: what's the first thing you delete when you set up a new Mac? | Grok's new post 1. Stands in for #6, which someone else asked on Nov 22. |
| N2 | Gripe | I opened one article and got a newsletter box, a cookie banner and an "Open in app" bar before I could read the first sentence. | Grok's new post 5. Replaces #14, #30 and #58. |
| N3 | Question | Solo makers: how do you decide a bug is bad enough to fix today, and not in the next release? | Grok's new post 6. |
| N4 | Native poll | What's your most-used text replacement shortcut for? Options: My email / My address / A phrase I repeat / I don't use any | Grok's new post 7. |
| N5 | Question | What's a Safari behaviour that still surprises you? | Grok's new post 8. |
| N6 | Question | What's in your Mac menu bar that you open more than once a day? | Grok's new post 12. |
| N7 | Question for makers | The hard part of stopping tabs a page opens by itself is telling "the person tapped this" from "the page did this while they were looking at something else". Safari extension makers: which signal do you trust? | Grok's second example in 1.2, cut to size. |

Left out of Grok's twelve: 2 (used as the rewrite of #2), 3 (same as #8), 4 ("one App Store review
that changed how you use the app": unclear), 9 (same as #16), 10 (same as #9), 11 (same as #50).

### What this changes in earlier decisions, for the owner

- 60 sittings in 14 days becomes about 30 posts. That follows Grok's "1 to 2 originals a day", which is
  its judgement: the code has no daily cap (section 2, row 19). The owner asked earlier for more posts,
  not fewer; the count is his call.
- The two threads he asked for (Cutling's keyboard memory, Undirect's localisation) are held, each cut
  to one post that ends on a question. Grok's reason: at 3 followers nobody reads past post 1. The code
  agrees on one point: a thread competes in a feed as a single post (row 12).
- Tips are banked. Grok's reason is that nobody replies to a tip from a stranger. Against it: the
  new-author lift picks by like rate (row 3), and tips are what the bigger makers' readers like and
  save. Unresolved; a tip a week would test it.
- The link may go in the post itself; the "link in my own reply ten minutes later" habit rested on a
  penalty X says ended over a year ago (rows 9 and 10).
- Hours stay as drafted (15:00 to 00:15 WIB first); Grok's primary window sits inside it and its two
  secondary windows are mislabelled (row 18).
- Not done here: nothing was posted, scheduled, liked, followed or committed. The four pictures the
  drafts file lists are still to make for #26 only (the other three belonged to dropped posts).
