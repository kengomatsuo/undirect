# YouTube reach: techniques and Studio features (research 2026-11-20)

For the Matsuo Kengo channel (@matsuokengo): Cutling and Undirect explainers (long-form, en/id/ja) and their Shorts.
Each finding: source URL, date read, a short quote (under 15 words), and an "apply:" line.
Official YouTube pages come first; third-party guides are marked THIRD-PARTY. Anything not read from a page this session is marked GUESS.
Thumbnails are out of scope (another agent).

## 1. Hashtags

### 1.1 How YouTube uses hashtags (official)
- Source: https://support.google.com/youtube/answer/6390658 (read 2026-11-20 in Chrome)
- Quote: "up to three hashtags that are considered most engaging will appear by your video title"
- Facts on the page: hashtags go in title or description; each links to a results page of videos sharing it; YouTube suggests popular hashtags as you type `#` in the title or description field (Shorts get "Recommended hashtags" from past uploads and entered text, previously used ones with a clock icon); over 60 hashtags and every one is ignored; "Over-tagging may result in the removal of your video from your uploads or from search"; unrelated hashtags fall under the Misleading Metadata policy; "ordinary descriptive tags or repetitive sentences in the description" are prohibited.
- apply: keep 3 to 5 hashtags per video, every one describing the video. The three shown above the title are picked from the description by engagement, so put the three strongest topic hashtags in the description. Drop generic or off-topic ones that a reviewer could read as unrelated: `#techtok` names TikTok, not this video, and `#smartphone` is broad; keep them only if the Studio chip is all we have. Never paste a tag list as plain words in the description.

### 1.2 What third-party guides add (THIRD-PARTY)
- vidIQ, "YouTube SEO in 2026", https://vidiq.com/blog/post/youtube-seo/ (updated 2026-05-27, reviewed 2026-10-08; read 2026-11-20). Quote: "mixing one broad and one niche". Says 2-3 hashtags, in the title on Shorts and in the description's first line.
- Buffer, "YouTube SEO", https://buffer.com/resources/youtube-seo/ (2024-03-19; read 2026-11-20). Research method: brainstorm the problem, search it on YouTube, take autocomplete long-tail phrases, check Google Trends (YouTube Search) and the Studio Research tab, pick 1-3 primary keywords.
- Hootsuite's hashtag post returned 404 today; most other 2026 "hashtag guides" in search results are hashtag-tool vendors whose limits (15 vs 60) contradict YouTube's own page. YouTube's page (1.1) wins: 60.
- GUESS (not read on an official page today): when the title itself carries hashtags, the description hashtags are not shown above the title. Check on one live Short's watch page before relying on it.
- apply: Shorts: 1-2 specific hashtags at the end of the title, 3 in the description's first or last line; long-form: no hashtags in the title, 3 in the description.

### 1.3 How the volumes below were measured (read 2026-11-20)
- Hashtag pages: `https://www.youtube.com/hashtag/<tag>` header shows "N videos • N channels" and the top videos; fetched with curl in en-US, id-ID and ja-JP. N videos is supply, not searches; the top videos show whether the tag means our topic (e.g. #safari is Taman Safari and the song "Safari").
- Demand: YouTube type-ahead (`suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=..&gl=..&q=..`) for "#stem" and plain phrases per language. A suggestion means people type it; it gives no volume.
- Studio's own chips (`#` typed in the title/description field) are a third signal and stay in use when they fit the topic.

Type-ahead found (2026-11-20):
- en: "#iphone" -> #iphonetips, #iphoneduo, #iphone18; "#ios" -> #ios27; "#productivity" -> #productivityapps, #productivityhacks; "safari pop up" -> "safari pop up blocker"; "stop safari redirect" -> "how to stop safari redirect", "block redirects safari"; "clipboard iphone" -> "clipboard iphone keyboard", "clipboard iphone history", "clipboard iphone app"; "iphone text replacement" (exists).
- id: "cara blokir iklan" -> "... di hp", "... di chrome"; "iklan pop up" -> "iklan pop up muncul tiba tiba", "menghilangkan iklan pop up di chrome"; "tips iphone" -> "tips iphone pemula"; "keyboard iphone" -> mostly "untuk android" (people want the iPhone look on Android).
- ja: "#iphone便利" -> #iphone便利機能; "iphone 広告" -> "iphone 広告 ブロック", "iphone 広告ブロック アプリ"; "iphone ユーザー辞書" -> "iphone ユーザー辞書登録"; "iphone キーボード" -> "iphone キーボードアプリ おすすめ"; "safari ポップアップ" -> "iphone safari ポップアップブロック".

### 1.4 Hashtag page counts and fit (read 2026-11-20)
| Tag | Videos | What its top videos are | Verdict |
|---|---|---|---|
| #iPhoneTips | 170K | iPhone setup and tips videos, en and id | Use (both apps, en) |
| #iPhoneTricks | 66K | iPhone tips lists | Alternate to #iPhoneTips |
| #iPhoneHacks | 34K | iPhone hacks lists | Alternate |
| #SafariTips | 1.7K | Safari browser tips mixed with travel safaris | Use for Undirect (niche) |
| #Safari | 720K | Taman Safari, animal songs, a pop song | Weak: topic mismatch; keep only as brand word |
| #AdBlocker / #AdBlock | 6K / 6.4K | ad-blocker reviews and how-tos, 2026 | Use for Undirect (niche) |
| #PopUps | 3.8K | "how to stop pop-up ads" | Use for Undirect |
| #PopupBlocker | 439 | disable Chrome pop-up blocker | Skip (opposite intent) |
| #Redirect | 6.6K | music, web-dev redirects | Skip |
| #SafariExtension | <100 | Safari extension how-tos | Optional exact tag |
| #iOS27 / #iOS26 | (id page 38K) / 70K | current iOS feature videos | Only if the video shows the current iOS |
| #iPhoneDuo | 81K | new device, trending | Only if the video shows an iPhone Duo; otherwise misleading |
| #Clipboard | 14K | "find the clipboard on iPhone/Android", 1.2M top | Use for Cutling |
| #iPhoneKeyboard | 2.2K | iPhone keyboard tricks, recent | Use for Cutling |
| #TextReplacement | 304 | iPhone/Mac text replacement how-tos | Use for Cutling (exact problem) |
| #ProductivityApps | 13K | iPhone productivity apps | Use for Cutling |
| #iPhoneApps | 10K | indie iPhone app roundups | Use (both apps) |
| #MacTips | 14K | Mac tips | Use on Mac-showing videos |
| #Keyboard | 1M | ASMR typing, mechanical keyboards | Skip |
| #CopyPaste | 53K | songs named "Copy Paste" | Skip |
| #smartphone / #tech / #tutorial | 8.1M / 8.1M / 12M | anything (crafts, recipes, phones) | Weak: our video is invisible there |
| #techtok | 249K | Indonesian "techtok" phonk edits, earbuds | Drop: not this video's topic |
| id #TipsiPhone | 13K | Indonesian iPhone settings tips (95K-1.4M views) | Use (both apps, id) |
| id #TutorialiPhone | 8.9K | Indonesian iPhone how-tos | Use (id) |
| id #iPhoneIndonesia | 2.6K | Indonesian iPhone news, reviews | Use (id) |
| id #BlokirIklan | 749 | "menghilangkan iklan di hp", top 11M views | Use for Undirect (id) |
| id #IklanPopUp | <100 | "menghilangkan iklan pop up" | Optional exact tag (id) |
| id #KeyboardiPhone | 784 | Android-to-iPhone keyboard skins | Weak for Cutling |
| id #Produktivitas | 76K | habits, music | Skip |
| ja #iPhone便利機能 | 4,188 | iPhone feature tips | Use (both apps, ja) |
| ja #iPhone活用術 | 1,435 | iPhone how-to | Use (ja) |
| ja #iPhone初心者 | 1,058 | iPhone beginner settings, one on Safari | Use (ja) |
| ja #スマホ便利機能 | 426 | top: "スマホ広告が全部消える" 1.1M views | Use for Undirect (ja) |
| ja #広告ブロック | 415 | phone and browser ad blocking | Use for Undirect (ja) |
| ja #ポップアップ | 4,552 | pop-up stores, tents | Skip |
| ja #ユーザー辞書 / #ユーザ辞書 / #辞書登録 | <100 each | iPhone text replacement how-tos | Use one for Cutling (ja): it is the Japanese name of the problem |
| ja #仕事効率化 | 27K | work efficiency, AI tools | Use for Cutling (ja) |
| ja #時短術 | 8,695 | PC time-savers mixed with cooking | Optional |
| ja #キーボード / #コピペ | 41K / 4.9K | hardware keyboards / 2ch copypasta | Skip |

### 1.5 Candidate sets per video (from 1.3-1.4)
- Undirect en: title (Short) #SafariTips #iPhoneTips; description #iPhoneTips #AdBlocker #PopUps (+ #Undirect as brand, last).
- Undirect id: #TipsiPhone #BlokirIklan #iPhoneIndonesia (title Short: #TipsiPhone #BlokirIklan).
- Undirect ja: #iPhone便利機能 #広告ブロック #スマホ便利機能 (title Short: #iPhone便利機能 #広告ブロック).
- Cutling en: #iPhoneTips #iPhoneKeyboard #Clipboard (alt #TextReplacement, #ProductivityApps); Mac cut adds #MacTips.
- Cutling id: #TipsiPhone #TutorialiPhone #iPhoneIndonesia.
- Cutling ja: #iPhone便利機能 #ユーザー辞書 #仕事効率化.
- apply: replace the generic chip set (#smartphone #tech #techtok #tutorial) in Shorts titles with the two title tags above; keep the brand tag last in the description. Keep each video's total under 6. Re-type `#` plus the stem in Studio's field to see whether Studio itself suggests the tag (third signal) and prefer the spelling it suggests.
- Title idea from 1.3 (not a hashtag): Japanese viewers search "iphone ユーザー辞書登録"; a Cutling ja title or first description line that names ユーザー辞書 matches the words they type.

## 2. Studio Analytics: Research and Inspiration

### 2.1 The Research tab moved and changed (official)
- Source: https://support.google.com/youtube/answer/17232321 (read 2026-11-20)
- Quote: "In the left menu, select Insights. From the top menu, click Research."
- What it gives: a topic search over high-performing videos and Shorts, with filters Type (Videos/Shorts), Views, "Watched by my viewers" (what our audience watched on other channels last month), Outlier Score (views vs that channel's average, e.g. 5x), Upload date, Subscribers, Duration, Channel age; "More like this" turns a result's title into a search chip. Ask Studio uses the same YouTube-wide search and answers questions about what works in a niche.
- apply: in Studio > Insights > Research, search each phrase ("safari pop up", "safari redirect iphone", "block pop ups iphone", "clipboard keyboard iphone", "text replacement iphone", "paste faster iphone") with Type = Shorts, then Videos; filter Subscribers low and Outlier Score high to find small channels whose videos broke out, and copy their title wording (not their claims). Repeat per language where the filter returns results.

### 2.2 The old Research tab is now the Trends tab (official)
- Source: https://support.google.com/youtube/answer/11962757 (read 2026-11-20)
- Quote: "Content gaps for Shorts ... search terms for Shorts that are related to topics"
- What it gives: Studio > Analytics > Trends: Top searches (our audience, last 28 days), Breakout videos from similar channels, Recent videos, "Content gaps for Shorts", and per-search "Audience interest" (very low to very high) plus "Searched on YouTube" with Show more > Content gaps. Insights are limited to some countries, languages and devices (the page notes a Studio redesign rolling out from July 2026).
- apply: in Studio > Analytics > Trends, type "safari", "pop up", "redirect", "clipboard", "keyboard iphone", "text expander" and read Searched on YouTube and Content gaps. A content-gap search term that our video answers goes word for word into the Short's title or the long-form description's first line. Our channel is small, so audience-based cards may be empty; the search bar still works (GUESS: not verified on this channel today).

### 2.3 Inspiration tab is being retired; Ask Studio replaces it (official)
- Source: https://support.google.com/youtube/answer/15575509 (read 2026-11-20)
- Quote: "Starting August 2026, we are gradually deprecating the Inspiration tab."
- What it gave: Content > Get Inspired: AI ideas, titles, hooks, outlines from channel data, English only, desktop only.
- apply: if Content > Get Inspired still shows, ask it for title options for each existing video (pick a published video from its + menu) and take any title that keeps the searched words first. Otherwise use Ask Studio with the same request ("What are people searching for about Safari pop-ups on iPhone, and which titles work for Shorts on this?"). Treat its answers as ideas to check against Research, not facts.

## 3. Reach features in Studio

All read 2026-11-20 from support.google.com (curl or Chrome). "Advanced features" is on for @matsuokengo since 2026-11-09 (house skill notes).

### 3.1 Shorts "Related video"
- Source: https://support.google.com/youtube/answer/14075157
- Quote: "Viewers will see a clickable link below your channel handle."
- Eligibility: advanced features; target public or unlisted. Place: Studio > Content > Shorts > the Short > Related video > Save.
- apply: already done per brief. Check each Short points at its own language's long-form explainer (en Short -> en explainer, id -> id, ja -> ja), not at a different app.

### 3.2 Clips and Shorts tool (Short made from the long-form)
- Source: https://support.google.com/youtube/answer/15824265
- Quote: "You won't be penalized for using your content in a video clip or Short."
- Also: "The source video will be automatically added as a related video to any Short you create with this tool". Place: Studio > Content > the long video > Clips and Shorts > Create clip or Short.
- apply: more Shorts can be cut from each explainer here (one per pain point: "bank number in one tap", "pop-up tab after tapping a link", "fake download button"), each with its own search phrase as title. Each new Short is a new upload, so it goes through the youtube-visibility plan first; not a Studio-tune edit today.

### 3.3 End screens (long-form)
- Source: https://support.google.com/youtube/answer/6388789
- Quote: "End screens can be added to the last 5–20 seconds of a video."
- Eligibility: video at least 25 s; not made for kids; up to 4 elements on 16:9; external Link element only in YPP. Place: Studio > Content > video > Editor > End screen (or Apply template).
- apply: on every explainer add: Video element "Best for viewer" or the other app's same-language explainer, Playlist element (the app's playlist), Subscribe element, for the last 15-20 s. Element timing must not cover the App Store screen the narration points at.

### 3.4 Info cards (long-form)
- Source: https://support.google.com/youtube/answer/6140493
- Quote: "You can add up to 5 cards to one video."
- Eligibility: not made for kids; cards show to viewers on computers (and as an icon on mobile when controls show); Link cards only in YPP. Place: Studio > Content > video > Editor > Info cards.
- apply: one Playlist card (the app's playlist) at the point the narration says "it works in every app" or similar, and one Video card to the same-language explainer of the other app near the end, with teaser text in the video's language.

### 3.5 Pinned comment
- Source: https://support.google.com/youtube/answer/9482367
- Quote: "highlight a comment at the top of your video's watch page"
- Place: watch page or Studio app > comments > More > Pin. API cannot pin (house docs/youtube-api.md).
- apply: on each long-form and Short, post one comment from the channel that answers the most likely question (en: "Works in Safari on iPhone, iPad and Mac. Free download: <campaign link>") and pin it. Links in Shorts comments are not clickable (house skill), so on Shorts pin a line pointing to the Related video link instead.

### 3.6 Playlists
- Source: https://support.google.com/youtube/answer/57792 and https://support.google.com/youtube/answer/12948449
- Quote: "Link out to playlists of related videos."
- Playlists hold videos and Shorts; viewers can filter by Shorts/Videos. Playlist titles and descriptions are searchable text (GUESS: YouTube Help pages read today do not state how playlists rank).
- apply: one playlist per app per language is too thin; keep one per app with all its languages plus Shorts, titled with the search phrase ("Block pop-ups and redirects in Safari on iPhone - Undirect", "Paste saved text in one tap on iPhone - Cutling"), with a description whose first line restates the problem. Link the playlist in each video description.

### 3.7 Collaborations (up to 10 creators)
- Source: https://support.google.com/youtube/answer/16554898
- Quote: "Our goal is to recommend the video to the audiences of both"
- Long-form and Shorts; the invited channel must accept; revenue stays with the uploading channel. Place: the page shows the upload flow: Details > Audience > Show more > Collaboration > Invite a collaborator (whether existing videos can add one is not stated; GUESS: check the video's Details > Show more).
- apply: no second creator is in these videos today. When a reviewer or app-review channel features Cutling or Undirect, ask them to make the video as a collaboration. Not a today edit.

### 3.8 Translated titles and descriptions, multi-language audio, auto dubbing
- Sources: https://support.google.com/youtube/answer/4792576 ("Translated video titles and descriptions can show up in YouTube search results"), https://support.google.com/youtube/answer/13338784, https://support.google.com/youtube/answer/15569972
- Multi-language audio: own dubbed tracks on videos and Shorts, advanced features, Studio > Languages > video > Add Language > Dub. Quote: "over 25% of their watch time come from views in the video's non-primary language". Long-form can also carry localized thumbnails (Languages > language > Thumbnail).
- Auto dubbing: English originals can be dubbed to Indonesian (expressive) and Japanese; Indonesian originals to English; Japanese originals to English. On by default for eligible channels; Settings > Channel > Advanced settings > Allow automatic dubbing; "You cannot edit automatic dubs."
- apply: each language cut is its own upload with burned-in text (house rule), so do not add dubs over a cut whose picture is in another language. Do add translated titles and descriptions where a viewer in that language would still understand the picture (e.g. the en Short's screens show English UI; an id title on it would mislead, so skip). Check Studio > Languages for each video: if auto dubs appeared on an en explainer while an id/ja cut exists, they compete with our own cut (GUESS) and the owner should decide whether to keep them. Make sure every video's original language is set correctly, since a wrong one mistranslates dubs.

### 3.9 Captions and chapters
- Sources: https://support.google.com/youtube/answer/2734796, https://support.google.com/youtube/answer/9884579
- Quote (4792576): "Same language captions make your videos available for ... viewers in loud environments."
- apply: done per brief. Check each language cut has a caption track in its own spoken language, and chapter names use search words ("Stop pop-up tabs in Safari" rather than "The problem").

### 3.10 Category, tags, Featured places, recording location, Shorts remixing
- Source: https://support.google.com/youtube/answer/57407 (upload settings) and https://support.google.com/youtube/answer/146402 (tags)
- Quotes: "Select a category so viewers can find your video more easily." / "tags play a minimal role in your video's discovery"
- Category Education offers Type (how-to, tips...), Science & Technology is the other fit. Tags help mainly for misspellings ("cutlin", "undirect safari", "un direct"). "Shorts remixing: Allow others to create Shorts using the audio of your video." Recording location is optional metadata; Featured places is for destinations.
- apply: set Category = Science & Technology (or Education > How-to; pick one and use it on all, GUESS which ranks better: neither page says). Fill tags with misspellings and the two or three search phrases. Leave Shorts remixing on (Studio > video > Show more > Shorts remixing: allow video and audio) so others can remix. Recording location adds nothing for an app demo (GUESS); skip.

### 3.11 Posts (Community)
- Source: https://support.google.com/youtube/answer/9409631
- Quote: "image posts may additionally show on the Shorts feed"
- Posts show on the channel Home/Posts tab, home and Subscriptions feeds; not on made-for-kids channels. Place: Studio > Content > Posts, or Create > Create post. Spam policy forbids "high volumes of low-effort, repetitive polls" (answer/2801973).
- apply: one image post per app per week: a still of the app solving the problem with one line, and the video linked. Schedule one for the Product Hunt day (Nov 24) and one for the Black Friday sale (Nov 27).

### 3.12 Hype
- Source: https://support.google.com/youtube/answer/15509925
- Quote: "up-and-coming creators in the YouTube Partner Program with 500–500,000 subscribers"
- apply: not available: the channel is not in YPP (GUESS from channel size; check Studio > Earn). Note only.

### 3.13 Made for kids
- Source: https://support.google.com/youtube/answer/6388789, /6140493, /9409631 (each lists made-for-kids exclusions)
- apply: every video must be "No, it's not made for kids", or end screens, cards, pinned comments and posts are switched off. Check each in Studio > Content > Audience column.

### 3.14 Channel Home tab: trailer, Spotlight, sections, "For you"
- Source: https://support.google.com/youtube/answer/3219384 (read 2026-11-20)
- Quote: "Once a viewer watches your channel trailer, it won't be shown to them again."
- Up to 12 sections; defaults are Short videos, Uploads, Created playlists, Subscriptions. Section types include For you, Videos, Playlists, Posts. Place: Studio > Customization > Home tab > Add section > Publish.
- apply: trailer = the strongest en explainer (already set); Spotlight = the Cutling explainer during the Product Hunt week (Nov 24), then the sale video; add one Playlists section per app at the top, a "For you" section, and a Posts section; hide old personal playlists from the Home tab (no deletes).

### 3.15 Promote (paid; note only)
- Source: https://support.google.com/youtube/answer/12199105 (read 2026-11-20)
- Quote: "promotions don't impact your channel's or a specific video's organic performance"
- Place: Studio > Content > Promotions, or a video's three-dot menu > Promote. Targets location, language, interests; goals: views, subscribers, website clicks. Paid, so the owner's call; not done.

### 3.16 Cross-promotion and embedding
- Source: https://support.google.com/youtube/answer/141808 (read 2026-11-20)
- Quote: "Allow embedding so others can distribute for you."
- apply: keep "Allow embedding" on for every video (Studio > video > Show more > License and distribution); embed each explainer on the Undirect and Cutling sites and in the Product Hunt gallery (Product Hunt accepts a YouTube link: GUESS, not read today).

## 4. Titles, descriptions, and what hurts reach

### 4.1 How search ranks (official)
- Source: https://support.google.com/youtube/answer/16090438 (read 2026-11-20)
- Quote: "how well the title, tags, description, and video content match your search query"
- Plus engagement (watch time for that query) and quality (expertise, trust).
- apply: the spoken words matter too (captions carry them). The first line of the description and the title both carry the exact search phrase.

### 4.2 Recommendations follow viewer response (official)
- Source: https://support.google.com/youtube/answer/11914225 (read 2026-11-20)
- Quote: "Our systems use both avg. view duration and avg. % viewed as signals"
- Also: click or ignore or "not interested", likes and post-watch surveys; topic interest, competition and seasonality move impressions.
- apply: nothing in metadata replaces retention. Titles must promise exactly what the first 5 seconds show.

### 4.3 Descriptions (official)
- Source: https://support.google.com/youtube/answer/12948449 (read 2026-11-20)
- Quote: "Identify 1-2 main words that describe your video and feature them prominently"
- Also: first lines are what shows before "more"; each description unique; up to 5000 characters; use the Research tab and Google Ads Keyword Planner; check Analytics "How viewers find you" search terms and add missing ones; link playlists; set a default description in Upload defaults.
- apply: every description opens with one sentence holding the 1-2 main words (en: "Stop Safari redirects and pop-up tabs on iPhone."), then chapters, links, hashtags. Each language and each Short gets its own wording, never a copy of another video's description.

### 4.4 Titles (official)
- Source: https://support.google.com/youtube/answer/12340300 (read 2026-11-20)
- Quote: "put the most important words near the beginning. Save episode numbers and branding for the end."
- Also: be accurate; limit ALL CAPS and emoji; searchable vs intriguing titles; judge CTR on Home and Suggested in the first 24 hours on videos with above-average impressions.
- apply: keep keyword-first; app name last ("... | Cutling"). Shorts feed traffic is browse-like, so a Short title can be intriguing if the search phrase sits in its description's first line.

### 4.5 What hurts reach (official)
- Sources: https://support.google.com/youtube/answer/2801973 (Spam policy), https://support.google.com/youtube/answer/6390658, https://support.google.com/youtube/answer/146402
- Quote (2801973): "maliciously misleading titles, thumbnails, descriptions, or imagery"
- Also: excessive tags in the description; over 60 hashtags (all ignored; possible removal from search); unrelated hashtags; "identical or similar 'check out my channel' messages" as comment spam; repetitive low-effort polls; mass-produced near-identical videos ("posting a few variations of a video is ok").
- apply: no pasting our app links as comments on other channels' videos; no off-topic trending hashtags; language cuts are fine because each adds its own narration and text.

## Do now (ordered by expected impact)

Expected impact is judged, not measured (GUESS ordering), from what YouTube's pages say drives reach: viewer response, search match, links between videos.

1. Shorts titles: swap the generic chips (#smartphone #tech #techtok #tutorial) for two topic hashtags per 1.5 (e.g. Undirect en #SafariTips #iPhoneTips; Cutling ja #iPhone便利機能 #ユーザー辞書). #techtok goes first: it is off-topic (1.1, 1.4).
2. Descriptions: first line holds the 1-2 searched words per language (4.3); last line 3 topic hashtags + the brand tag (1.5). Never paste tag lists into the text (4.5).
3. Search phrases from type-ahead into titles and first lines where the video answers them: "block redirects safari", "safari pop up blocker", "clipboard iphone keyboard", "iphone text replacement", "menghilangkan iklan pop up", "iphone 広告ブロック", "iphone ユーザー辞書登録" (1.3).
4. Studio > Insights > Research and Analytics > Trends: run the phrases in 2.1/2.2, read Content gaps and Outlier Score results, adjust titles once before the A/B tests start (editing stops a running test).
5. End screens on every long-form: same-language video of the other app, the app's playlist, Subscribe (3.3).
6. Info cards on every long-form: playlist card mid-video, other-app card near the end (3.4).
7. Pinned comment on every video and Short (3.5).
8. Check Related video on each Short points to its own language's explainer (3.1); check "Not made for kids" on all (3.13).
9. Playlists: one per app with all languages and Shorts, search-phrase title and first line (3.6); Home tab: playlist sections, Spotlight = Cutling for Product Hunt week, For you, Posts (3.14).
10. Studio > Languages per video: original language correct; review any auto dubs that appeared (3.8).
11. Tags: misspellings + 2-3 phrases; Category consistent; Shorts remixing allowed; embedding allowed (3.10, 3.16).
12. Posts: schedule an image post for Nov 24 (Product Hunt) and Nov 27 (sale) per app (3.11).
13. Later, not today: more Shorts from long-form via Clips and Shorts (3.2, new uploads need a plan); collaborations with reviewers (3.7). Not available or paid: Hype (needs YPP), Promote (owner's budget).
