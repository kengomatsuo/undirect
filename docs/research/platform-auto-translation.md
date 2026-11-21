# Which platforms translate a post for the viewer (state as of November 2026)

Question: on Instagram, Facebook, Threads, TikTok and YouTube, does a viewer see our caption or text
in their own language without asking, or only behind a "See translation" tap? Does the platform
translate a video's speech or on-screen text, and does the creator have to switch it on?

Why it matters: X has translated every post into the reader's language by default since April 2026
(TechCrunch, 2026-04-08, https://techcrunch.com/2026/04/08/x-is-rolling-out-automatic-translation-and-photo-editing-powered-by-grok/),
so the @monholtco calendar posts on X in English only. This file decides the same for the other five.

Each finding names its source. An item with no source is marked GUESS.

## Findings, as they landed

### Facebook (read 2026-11-21 in Chrome, Facebook Help Centre)

- **Post text: shown in the original, with a "See Translation" link under it.** "Click See
  Translation below the post or comment." (https://www.facebook.com/help/509936952489634)
- **Post text is auto-translated only once a post draws many translation requests.** "A post that
  receives many translation requests is automatically translated." (https://www.facebook.com/help/541469169337994)
  The viewer can stop it per language under Settings > Language and region > "Languages that you
  don't want automatically translated" (https://www.facebook.com/help/894653377249514). A new Page
  post with few readers abroad will show in English with a "See Translation" link.
- **Reel voice: Meta AI dubs and lip-syncs, and a viewer whose language is covered hears it by
  default, but only if the creator switched it on.** "If a creator has turned this setting on, and
  the translation is available in your language, you'll see their video playing in the default
  language that you've selected in your app settings." Labelled "Meta AI translation" below the
  caption; viewer can pick Original audio or Don't translate. (https://www.facebook.com/help/772608811973195)
- **Voice translation needs speech and nothing else in the audio.** "You can only use translation
  on videos with your original audio and voice. Videos that use music, other sound effects or
  contain other voices will receive a notice that says translation is not available."
  (https://www.facebook.com/help/576364395068889). The "Translate your voice" how-to page says
  "This feature is not currently available to everyone." (https://www.facebook.com/help/902794301440198)
- **Eligibility and languages (Meta newsroom, updated 2026-07-14):** free, "accessible to Facebook
  creators with 1,000 followers or more and to all public Instagram accounts in countries where
  Meta AI is available". Live: English, Spanish, Hindi, Portuguese (2025), Bengali, Tamil, Telugu,
  Marathi, Kannada (2026-01-16). June 4 2026: "will soon be expanding to Arabic, Bahasa
  Indonesian, French, Thai, and Vietnamese on Facebook". (https://about.fb.com/news/2025/10/discover-reels-around-world-meta-ai-translation/)
  Whether those five went live on Facebook by November 2026: not found, GUESS that it is rolling out.
- **Reel captions (subtitles from speech): auto-generated translated captions exist, but the
  viewer turns them on.** Languages: Arabic, Brazilian Portuguese, English, Hindi, Indonesian,
  Spanish (Latin America), Tagalog, Tamil, Telugu, Urdu, Vietnamese. "Captions may be only available
  in the video's original language." "A reel's creator can decide if they want captions to be
  turned on by default." (https://www.facebook.com/help/1557096867988011). These are made from
  speech; a film with no speech gets none (GUESS from how auto-captions work; the page does not say).
- **Text burned into the video: no Facebook page found that translates it.** GUESS: not translated.
- **Facebook made every video a reel** (September 2025 note on the same captions page), so the
  Reel rules above cover every Facebook video we post.

### What our films carry (measured 2026-11-21)

The calendar films in `~/Downloads/social-calendar` (116 .mp4) have an audio track (P31 `u2.mp4`,
P74 `Dad.mp4`, P36 `cutling-mac-history.mp4`: mean volume about -16 dB, ffmpeg volumedetect). The
films are built from Mixkit music and sound effects with the words as on-screen text
(`docs/research/promo-video-research.md`, G1-G2); GUESS that no film carries speech, since none
was recorded with a voice and the owner's no-face rule holds. So voice dubbing (Meta AI, YouTube
auto dubbing, TikTok AI dubbing) has nothing to translate in our films, and Facebook says a video
with music or sound effects is refused outright (above).

### Instagram (read 2026-11-21 in Chrome, Instagram Help Centre)

- **Captions, comments and bios: translated, but shown behind a tap.** "Captions and comments on
  posts in feed, as well as the bio that you include on your profile, are translated automatically
  based on the language they're written in and the language settings of the person viewing it. If
  your language is available as a translation, you can tap See translation below the text to see
  it." (https://help.instagram.com/512686498916530). The viewer first sees our English caption with
  a "See translation" link.
- **Text on a Reel's Captions sticker: translated for the viewer by default.** The help page tells a
  viewer how to read the Captions sticker "in its original language": "Toggle off Translate text on
  reels", per reel (Options > Translations) or for all reels (Menu > Language and translations).
  (https://help.instagram.com/844045324219149). That the toggle is on unless the viewer turns it
  off is read from the page's wording ("Why are my reels translating?"); no page states the default
  or the languages. GUESS: it covers text made with Instagram's own Captions sticker, not words
  burned into the uploaded video file, which is how our films carry their text.
- **Reel voice: Meta AI dub with optional lip sync, which the creator switches on before
  publishing.** Creator side: "Translate voices with Meta AI" on the pre-publish screen (under "More
  options" if hidden); preview and approve; turn off or remove any time
  (https://creators.instagram.com/blog/meta-ai-translations, updated January 16 2026). Viewer side:
  plays in the viewer's language, labelled "Translated with Meta AI", switchable to Original
  (https://help.instagram.com/1805048780019931).
- **Languages, two sources disagree.** The help page: "only available in Spanish, English, Hindi,
  Portuguese, Bengali, Tamil, Telugu, Marathi and Kannada" and "aren't yet available for everyone"
  (https://help.instagram.com/1805048780019931, read 2026-11-21). The newsroom, 2026-07-14: "We're
  expanding AI-powered translations for Reels to French, German, Italian, Japanese, and Korean on
  Instagram" (https://about.fb.com/news/2025/10/discover-reels-around-world-meta-ai-translation/).
  Not Arabic, Indonesian, Chinese, Turkish or Russian on Instagram in either. Eligible: all public
  Instagram accounts in countries where Meta AI is available (same newsroom post). Single speaker
  only (creators blog).
- **Words burned into the video: no Instagram page found that translates them.** GUESS: not translated.

### Threads (read 2026-11-21 in Chrome, Instagram Help Centre, which hosts Threads help)

- **Posts: translated, opened with a tap on the post's translate icon.** "Posts in your feeds on
  Threads are translated automatically based on the language they're written in and the language
  settings of the person viewing it. If you see a post in a different language, and your language is
  available as a translation, you can tap [the icon] in the bottom right of a post to see it."
  (https://help.instagram.com/646730270720963). Same pattern as Instagram captions: original shown,
  translation one tap away. The feature dates from July 2023 (TechCrunch,
  https://techcrunch.com/2023/07/18/metas-threads-update-adds-translation-and-a-flurry-of-minor-improvements/).
  No 2025-2026 Meta announcement changes it to show the translation first: searched, none found.
- **Threads Live Chats added translation in June 2026** (TechCrunch,
  https://techcrunch.com/2026/06/30/threads-adds-new-features-to-live-chats-as-it-expands-access/,
  title read from search results only). Not relevant to scheduled posts.
- **Video on Threads: no voice or text translation found.** GUESS: none.

### YouTube (read 2026-11-21: YouTube Help, YouTube blog, and @matsuokengo's own Studio settings in Chrome)

- **Auto dubbing: on by default for eligible creators, "available to everyone" since 2026-02-04, 27
  languages.** "This feature is enabled by default for eligible creators." Turned on or off in Studio
  at Settings > Content > Automatic dubbing (Studio app); early access via "Advanced settings"
  (https://support.google.com/youtube/answer/15569972). "Auto dubbing is now available to everyone",
  "an expanded library of 27 languages", Expressive Speech in English, French, German, Hindi,
  Indonesian, Italian, Portuguese and Spanish (https://blog.youtube/news-and-events/youtube-auto-dubbing-expressive-speech/, 2026-02-04).
- **English originals dub into:** Arabic, Bengali, Dutch, French, German, Hebrew, Hindi, Indonesian,
  Italian, Japanese, Korean, Malayalam, Polish, Portuguese, Punjabi, Russian, Spanish, Tamil,
  Telugu, Ukrainian (help page above). Not Chinese or Turkish.
- **Our channel: off.** @matsuokengo's Studio, Settings > Channel > Advanced settings, shows
  "Automatic dubbing: Automatically translates your audio tracks into different languages" with an
  **Enable** button, so it is not on for this channel (read 2026-11-21; nothing was changed).
- **Auto dubbing skips our films anyway.** Ineligible when "The video contains no speech, only
  music, or very little spoken content" (help page above); the blog's "Automatic Smart Filtering"
  recognises "when a video shouldn't be dubbed—like music or silent vlogs".
- **What viewers hear:** a viewer's preferred languages stay original ("Content with the original
  audio in one of your preferred languages will not be translated",
  https://support.google.com/youtube/answer/13339776); "the rest will be dubbed where possible"
  (https://blog.youtube/creator-and-artist-stories/youtube-auto-dubbing-explained/, 2026-05-15).
  Shorts are not named on any of these pages: GUESS that Shorts follow the same rule.
- **Titles and descriptions: shown in the viewer's language only when the creator added a
  translation.** "Add translated video titles and descriptions to your videos"
  (https://support.google.com/youtube/answer/4792576); YouTube then "uses signals to automatically
  match a video's language (title, description, and captions) to viewer preferences"
  (https://support.google.com/youtube/answer/7296123). TeamYouTube, 2025-07-06: "It's still up to
  creators to decide whether they'll add translated video titles and descriptions to their videos"
  (quoted by PPC Land, https://ppc.land/youtube-users-complain-about-forced-auto-translation/).
  No YouTube page found that machine-translates titles without the creator. Studio's Upload defaults
  > Advanced settings has "Title and description language" but no auto-translate switch (read in
  our Studio). A 2021 PhoneArena report of a title-translation test could not be opened (Cloudflare check).
- **Captions:** auto-captions are made from speech in the video's own language; viewers can
  auto-translate existing captions from the CC menu (YouTube help via search summary; GUESS for the
  exact menu). A film with no speech gets no captions to translate.
- **Words burned into the video: not translated.** No YouTube page found that does it. GUESS.

### TikTok (read 2026-11-21: TikTok Newsroom, TikTok Help Centre and TikTok Ads help in Chrome and fetch)

- **Descriptions, captions (subtitles) and text stickers: translated behind a "See translation"
  tap.** TikTok's newsroom (2022-07-21, https://newsroom.tiktok.com/en-us/auto-translations-and-captions)
  launched "Translations for captions and video descriptions" and "Translation for text stickers"
  in English, Portuguese, German, Indonesian, Italian, Korean, Mandarin, Spanish and Turkish, "on
  select videos". The only current official page found describing the viewer side is the Spark Ads
  help: "Once a viewer enables translation, they will see a See translation link below the ad
  description", which turns the title, description and subtitles into the viewer's language, and
  "Text that is part of the video or image creative itself is not translated by this feature"; US
  and EU only (https://ads.tiktok.com/help/article/about-captions-and-translations-for-spark-ads).
  GUESS: organic posts behave the same (See translation under the description), since no organic
  help page was found; third-party guides describe a viewer "Show translation" switch under
  Settings and privacy > Language, not confirmed on an official page.
- **Auto-generated captions are made from speech, in the language the creator picks at posting**
  (Help Centre, Accessibility for your videos, "Select video language",
  https://support.tiktok.com/en/using-tiktok/creating-videos/accessibility, read in Chrome). A film
  with no speech gets none.
- **AI dubbing: for ads and TikTok Shop, not for ordinary posts.** Symphony AI dubbing for ads and
  branded content (TechCrunch 2024-06-17,
  https://techcrunch.com/2024/06/17/tiktok-ads-and-branded-content-will-now-include-ai-avatars-of-creators-and-stock-actors/);
  "Lipsync Dubbing" in TikTok Shop Creator Center for shoppable videos, English, Spanish, French or
  German, US users, 15-60 s with at least 5 s of speech (TikTok Seller University,
  https://seller-us.tiktok.com/university/essay?knowledge_id=1401044627343118&lang=en, search
  summary). A December 2025 roundup says creators can switch AI dubbing on or off on their videos
  (socialbee.com/blog/tiktok-updates, search summary only): GUESS, no TikTok page confirms a
  general creator dubbing switch as of November 2026.
- **Words burned into the video: not translated** (Spark Ads page above, for ads; GUESS for organic).

## Summary, November 2026

| Platform | Post text a viewer sees first | Speech in video | Words burned into our films |
|---|---|---|---|
| X | Translated into the reader's language by default (TechCrunch 2026-04-08) | n/a | not translated (GUESS) |
| Facebook | Original, "See Translation" tap; auto-shown only on posts with many translation requests | Meta AI dub, creator opts in, 1,000+ followers; refuses videos with music or sound effects | not translated (GUESS) |
| Instagram | Original, "See translation" tap | Meta AI dub, creator opts in; 9 languages per help page, 14 per newsroom | Captions sticker text translated by default; burned-in text not (GUESS) |
| Threads | Original, translate icon tap | none found | none found |
| TikTok | Original, "See translation" tap (official page covers Spark Ads, US/EU) | AI dubbing for ads and TikTok Shop only | not translated (ads page; GUESS for organic) |
| YouTube | Title and description in the viewer's language only where the creator added translations; then matched automatically | Auto dubbing on by default for eligible creators, 20 targets from English; off on @matsuokengo; skips music-only videos | not translated (GUESS) |

Our films carry music and on-screen English text, no speech (measured audio track; no voice
recorded), so none of the dubbing features applies to them. The question reduces to the post text.

## Recommendation per platform

- **X: English only.** Done 2026-11-21 (owner's decision): X shows the translation by default.
- **Instagram: native-language captions.** Captions are translated only behind a tap, so an English
  caption reaches a Japanese or Arabic viewer as English first. The film's on-screen text stays
  English either way. If a film is ever recorded with a voice, switch on "Translate voices with
  Meta AI" on the pre-publish screen for the covered languages instead of separate uploads.
- **Facebook: native-language captions.** Same tap rule; automatic translation only once many
  readers ask for it, which a small Page will not get. Voice dubbing refuses videos with music.
- **Threads: native-language posts.** Text-first platform; translation is one tap away, not shown.
- **TikTok: native-language descriptions.** Translation sits behind "See translation" and no
  official page shows it on by default for organic posts.
- **YouTube: one English upload per post, with translated titles and descriptions added in Studio
  for each other language, instead of a separate upload per language.** YouTube shows a creator's
  translated title and description to each viewer by default and indexes them for search in that
  language (help pages above), so one video gathers every language's views. GUESS, not checked here:
  uploading near-identical videos per language risks YouTube's repetitious-content policy and splits
  their views. Auto dubbing needs no action: our films have no speech and our channel has it off.

