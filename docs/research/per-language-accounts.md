# One account in many languages, or one account per language

Question (owner, 2026-11-21): do other companies post the same post in many
languages on one account, or run separate accounts per language? And does
Threads lock @monholtco's region? Each finding below carries its source; an
item with no source is marked GUESS.

## Findings as they land

### Threads: what Meta's system card says decides distribution

- **Meta's Threads feed system card names viewer country as a ranking signal; it names no
  account-location setting and no region lock.** Card "Instagram Threads Feed AI system", updated
  2025-03-07 (https://transparency.meta.com/features/explaining-ranking/ig-threads-feed/):
  inventory is "a portion of the public content available on Threads" plus "all the content posted
  by accounts you follow"; ranking predicts interest from "what and whom you've followed, liked or
  engaged with recently". Among its listed signals: engagement by "viewer country over the past
  week" and the viewer's device platform. The card does not mention language, the poster's location
  or account age.

### YouTube: one channel, many languages (official help)

- **YouTube's own help page pitches multi-language audio as the alternative to separate channels.**
  "expand your global reach without creating and managing multiple separate channels." Tracks
  "automatically default to the viewer's preferred language." Available to "creators with access to
  Advanced features". Translated titles and descriptions make videos findable "when viewers search
  using a translated video title and description"; per-language thumbnails for long-form only.
  YouTube does not make the dub: you upload the track (or use auto dubbing).
  (https://support.google.com/youtube/answer/13338784)
- Translated titles and descriptions are added in Studio > Subtitles > Add language > Title &
  description. (https://support.google.com/youtube/answer/6289575)

- **YouTube's own strategy page lists three shapes and recommends none for a start: one
  multi-language channel, separate per-language channels, or one global channel plus local ones.**
  One channel "consolidates your viewership and subscribers" but mixed languages "may be confusing
  for your audience"; separate channels give "focused communication" but "Each individual channel
  will need ongoing maintenance and attention"; global-plus-local "requires the most time and
  effort". Only timing advice: "As your channel grows and you reach viewers around the world,
  consider creating different channels." (https://support.google.com/youtube/answer/6070467)
- **Trade-press read of MrBeast (who ran separate dubbed channels, then added multi-language audio
  on the main channel):** AIR Media-Tech says the move to MLA "is often cited as proof that separate
  channels are obsolete" and argues MLA amplifies signals a channel already has while a separate
  channel builds signals where it has none
  (https://air.io/youtube-hacks/should-you-create-another-channel-for-a-different-language).
  Tubefilter: break a language out into its own channel once it "proves particularly popular as a
  dub track on the main channel"; "no hard subscriber number"
  (https://www.tubefilter.com/2023/08/01/youtube-content-language-localization-air-media-tech/).
  Both are a dubbing vendor and its press, not YouTube.

### Facebook: Global Pages

- **No current facebook.com help page for Global Pages was found by web search; every description
  is from 2015-2021 third parties.** They agree: one shared Page name/URL, market Pages per country
  or language, viewers auto-routed to their market version, "eligibility criteria ... kept
  confidential", access tied to a managed relationship with Facebook, and posts are NOT copied
  across market Pages (each market Page is posted to separately).
  (https://www.socialmediaexaminer.com/facebook-global-pages-and-market-pages-how-to-localize-your-marketing/
  2021; https://allsocial.de//wp-content/uploads/2015/04/Facebook_Global_Pages_Product_Guide.pdf;
  https://dashsocial.com/blog/global-vs-local-facebook-pages-explained). GUESS: not something a
  two-app studio can get; even when granted it is per-market Pages with per-market posting.

### What the big brands run (profiles read 2026-11-21 by fetching each public profile page)

Counts are the profile's own follower/subscriber text, fetched with curl from youtube.com and
threads.com (og:description). TikTok, Instagram and X refuse logged-out fetches, so those columns
come from press where cited, or are unknown.

| Brand | Global account | Per-country / per-language accounts found |
|---|---|---|
| Apple | YouTube @Apple 21.1M, Threads @apple 5.0M (0 posts) | YouTube Apple India 15.1M, Apple Japan 879K, Apple France 625K, Apple 대한민국 463K, Apple Deutschland 431K; each channel's own description is in its language |
| Netflix | YouTube @Netflix 33.9M, Threads @netflix 8.7M | YouTube Netflix Brasil 15.5M, Netflix France 3.56M, Netflix Korea 3.21M, Netflix Japan 2.86M; Threads @netflixbrasil 7.9M, @netflixlat 5.8M, @netflixfr 1.3M, @netflixkr 1.2M |
| Duolingo | YouTube @duolingo 7.11M, Threads @duolingo 1.1M | Threads @duolingobrasil 859.7K (785 posts, bio "amo o threads"), @duolingodeutschland 85.5K (0 posts). Press: local accounts for "French, German, Brazilian, Japanese, Spanish and Vietnamese" markets, TikTok the top channel in most markets, German TikTok run by Berlin agency Ozmoze (https://mediacat.uk/?p=41832, https://www.wuv.de/Themen/Marke/Duolingo-Deutschland-wird-auf-Tiktok-zur-viralen-Sensation) |
| Spotify | YouTube @Spotify 2.48M, Threads @spotify 3.3M | YouTube Spotify Brasil 99.5K; Threads @spotifybrasil 384.2K |
| Canva | YouTube @Canva 922K, Threads @canva 468K | YouTube "Canva 公式 (キャンバ)" 25.1K, Japanese description |
| Notion | YouTube @Notion 351K, Threads @notionhq 238.3K | YouTube Notion Japan 3.21K, Japanese description |
| Adobe | YouTube @Adobe 828K, Threads @adobe 410.3K | YouTube Adobe Creative Cloud Japan 181K |
| Figma | YouTube @Figma 798K, Threads @figma 315.3K | none found (tried FigmaJapan, figma_jp) |
| Revolut | YouTube @Revolut 77.3K, Threads @revolut 76.0K | none found on YouTube/Threads by handle guess |

- **Pattern: every brand above with a second language runs it as a separate account; none was
  found posting the same post in several languages on its global account.** The global account
  posts in English; a market gets its own account in its language, usually first in the biggest
  non-English markets (Japan, Brazil, Korea, France, Germany). GUESS on post language of global
  accounts: inferred from the English bios and channel descriptions, not from reading every recent
  post.
- **Split size:** these companies split when they had a local team or agency per market (Duolingo:
  local agency in Germany, Galleria.ag in Brazil per mediacat). Small local accounts exist (Notion
  Japan 3.21K, Canva Japan 25.1K, Duolingo Deutschland Threads with 0 posts), so the split happens
  at company size, not account size.

### Platform guidance on language and ranking

- **TikTok: language and country are counted, but weakly.** "Device and account settings" like
  "your language preference, country setting, and device type" are "included to make sure the
  system is optimized for performance", and "they receive lower weight in the recommendation system
  relative to other data points we measure". (https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/)
  These are the viewer's settings; TikTok's page says nothing about the poster's location.
- **Instagram's recommendations system card (updated 2026-06-29) lists no language or country
  signal**, only device platform; inventory is "a portion of the public content available on
  Instagram". (https://transparency.meta.com/features/explaining-ranking/ig-feed-recommendations/)
- **Instagram head on reaching other languages (secondary write-up):** translated reels are one of
  the most important things for crossing languages, but translation does not guarantee reach
  because interests differ by culture. (https://www.kontentino.com/q-and-a/instagram-global-reach/)
  No official Instagram page on running one account in several languages was found.
- **Facebook's "post in multiple languages" composer (2016):** one Page post with several language
  versions, each viewer sees only theirs (https://engineering.fb.com/2016/07/01/web/building-a-better-way-to-write-posts-in-multiple-languages/).
  Forum reports say the option vanished after Pages moved to the new Pages experience and Meta
  Business Suite (https://techrepublic.com/forums/discussions/how-to-post-multilingual-posts-on-facebook-pages),
  and schedulers say the API never supported it (https://intercom.help/loomly/en/articles/5031757-can-i-publish-a-facebook-post-in-multiple-languages).
  GUESS: not usable in 2026.
- **Evidence on mixing languages on one account:** no measured study found. Practitioner guides
  claim followers who can't read a post scroll past and replies split by language (no data). Meta
  survey: nearly half of U.S. Hispanics surveyed prefer brands not mix languages, some find it
  disrespectful (cited at https://blog.hootsuite.com/multilingual-social-media-presence, survey not
  opened). Mechanism that IS sourced: every ranking system above (Threads, Instagram, TikTok)
  ranks a post by predicted engagement from the people it is first shown to
  (system cards above); a post in a language a follower can't read earns less of it. GUESS: that is
  how mixing languages costs reach.
- **X auto-translates every post into the reader's language by default since April 2026**
  (TechCrunch 2026-04-08, already in `docs/research/platform-auto-translation.md`), so on X one
  English account reaches every language without a split.

### Steps if accounts are split (official help pages)

- **Facebook Page:** "Anyone with a Facebook account can create a Page." Pages > Create Page >
  Public Page > Get Started > name and category > Create Page, then contact info, photos, optional
  WhatsApp, notifications. No page limit stated. (https://www.facebook.com/help/104002523024878)
  Secondary sources quote a 200-Pages cap and a "created too many Pages recently" throttle
  (https://www.lilachbullock.com/how-many-facebook-pages-one-account/,
  https://hongkiat.com/blog/facebook-created-too-many-pages-error): GUESS, make them a few days apart.
- **YouTube channel (Brand Account) under the same Google login:** sign in > channel list >
  "Create a new channel" > profile picture, name, Handle > "Create channel. This creates a new
  Brand Account." (https://support.google.com/youtube/answer/1646861). One Google Account can manage
  up to 100 channels and switch without signing out (https://support.google.com/youtube/answer/3046356).
- **Threads:** a Threads profile is made from an Instagram account; to add one, long-press the
  profile tab > Add profile; multiple profiles switch from that menu (Threads, 2023-09-21, reported
  by https://9to5mac.com/2023/09/21/threads-switch-between-accounts/ and
  https://techcrunch.com/?p=2604667). Instagram allows up to 5 accounts in the app
  (https://help.instagram.com/iphone-app/1696686240613595). Email/phone sign-up without Instagram
  was a test for "selected EU users" (Social Media Today, 2025-05-19,
  https://www.socialmediatoday.com/news/threads-account-creation-separate-instagram/748530/). So
  each language on Threads costs one new Instagram account too. The official Threads help page did
  not load without a browser: GUESS that these steps still hold in November 2026.

### Small app makers

Social links read 2026-11-21 from each company's own site footer (curl, Japanese
Accept-Language), plus YouTube/Threads profile pages.

- **Craft (Craft Docs, a document app, roughly 3 million users per
  https://www.itreview.jp/products/craft-docs/profile) runs a separate Japanese X account:** its
  site links both `x.com/craftdocsapp` and `x.com/craftdocsapp_jp`. YouTube @CraftDocs 19K, one
  channel. This is the smallest company found with a per-language account.
- **Goodnotes:** the Japanese site links only the global accounts (x.com/GoodnotesApp,
  instagram goodnotes.app, tiktok @goodnotes, facebook goodnotesofficial); YouTube "Goodnotes
  Official" 46.3K. No Japanese account linked, even though Japan is its largest corporate market per
  a Japanese report found by search (GUESS on that report, not opened).
- **Notion and Figma:** Japanese sites link the global English accounts; Notion has a separate
  Notion Japan YouTube channel (3.21K) not linked from the footer.
- **One account, English only:** Flighty (x.com/flighty, instagram flightyapp), Halide
  (x.com/halidecamera, YouTube 9.87K), Bear (twitter bearnotesapp), Daylio (hellodaylio), Endel
  (YouTube 38.8K, x.com/EndelSound), TickTick (YouTube 12.2K), Raycast (YouTube 51.5K). None of
  them was found posting in several languages on the one account; GUESS from the English bios and
  site links, recent posts not read one by one (X, Instagram and TikTok refuse logged-out reads).
- **Practitioner guidance found leans to one account per language:** ClickZ ("nobody wants to be
  bombarded with messages in a language they don't understand",
  https://www.clickz.com/how-to-manage-twitter-for-asian-markets/38347/), Search Engine Journal
  ("open and run one account for each language",
  https://searchenginejournal.com/how-to-manage-twitter-multi-language-accounts/37891), Movable
  Type opening a Japanese account so each has its own language
  (https://movabletype.org/news/2013/05/announcing_the_start_of_the_movable_type_japanese_twitter_ac.html).
  All are old (2010s) and anecdotal.

### Threads: is it a region lock?

- **Threads has no region setting for a profile and Meta documents no lock.** The Threads feed
  system card names "viewer country over the past week" as an engagement signal and the viewer's
  own follows/likes as the main input (system card above). Meta's general privacy policy says
  location-related information "such as your current location, where you live ... the businesses
  and people near you" is used "to provide, personalize, and improve our Products", and IP address
  approximates location when location services are off (quoted at
  https://conductatlas.com/platform/threads/threads-privacy-policy/location-data-collection/ and
  https://ca.news.yahoo.com/heres-data-expect-joining-threads-223010593.html; Meta's own page not
  opened: GUESS on exact wording).
- **The For You feed of @monholtco is the feed of a viewer logged in from that country.** It shows
  what that viewer's country and engagement predict; it says nothing about who sees @monholtco's
  posts. Sourced by the system card's viewer-country signal; the conclusion is GUESS-free only for
  the feed, not for reach.
- **Who sees a new account's posts:** a new account has no followers to show posts to, so its
  views come from the recommended slice of other people's feeds, which is ranked per viewer by
  predicted engagement. With viewer country and language able to read the post both in play,
  Indonesian-language posts get shown to and engaged by viewers in that country first. GUESS: the
  5 and 6 views vs 2, 0 and 0 fit that, but 12 views from 10 viewers is too few to separate
  language from chance.
- **Location breakdown in Insights needs 100 followers.** Meta's Threads Insights API: follower
  demographics (country, city, age, gender) need "at least 100 followers"
  (https://developers.facebook.com/docs/threads/insights/). Sendible reports the in-app dashboard
  has shown age, gender and location since July 2025 (https://www.sendible.com/insights/threads-insights).

## Answer

**Do companies switch languages on one account? No.** Every big brand checked that speaks more
than one language does it with separate accounts: Apple (YouTube Apple India 15.1M, Japan 879K,
France 625K, Korea 463K, Deutschland 431K), Netflix (Threads @netflixbrasil 7.9M, @netflixlat 5.8M,
@netflixfr 1.3M, @netflixkr 1.2M), Duolingo (Threads @duolingobrasil 859.7K; local accounts in six
markets per press), Spotify (Spotify Brasil), Canva, Notion, Adobe (Japan channels), and among
small makers Craft (`craftdocsapp_jp`). Their global accounts post in English. The rest (Figma,
Revolut, Goodnotes, Flighty, Halide, Bear, Endel, TickTick, Raycast) run one English account and
nothing else. No company was found posting the same post in several languages on one account. The
only platform-built "one account, many languages" tools are YouTube's (translated titles and
descriptions; dubbed audio tracks) and X's automatic translation; Facebook's multilingual composer
and Global Pages are not available to a small Page (GUESS on the composer, see above).

**Threads lock? No lock.** Its own For You feed is a viewer's feed and follows the viewer's country;
its posts' early reach goes to whoever the ranker predicts will engage, and so far that is viewers
reading Indonesian-language posts. Insights shows location once the account has 100 followers.

**Per platform (recommendation):**

| Platform | Recommendation | Why |
|---|---|---|
| X | One account, English | X translates every post for the reader by default |
| YouTube | Keep one channel (@matsuokengo) for now with translated titles and descriptions per language; split a language off when it earns views | YouTube's own help pitches one channel "without creating and managing multiple separate channels"; our films have no speech, so dubbed tracks don't apply; a new channel starts at zero subscribers. If split anyway: Brand Accounts, up to 100 per Google login |
| Facebook | Split: one Page per language | No Global Pages, no working multilingual composer; Pages cost nothing and need no new login |
| Threads | Split, per language, starting with the biggest markets | Brands do this on Threads (Netflix, Duolingo, Spotify); each profile needs its own Instagram account, and the Instagram app holds 5 accounts per login session |
| Instagram | Comes with Threads: each Threads profile is an Instagram account | same |
| TikTok | Split like Duolingo if the team can feed each account | TikTok counts the viewer's language and country only weakly |

GUESS: 13 languages x 3 platforms is 39 accounts to feed; Duolingo runs six markets with local
agencies. Starting with the languages whose posts already earn views is the cheaper order.
