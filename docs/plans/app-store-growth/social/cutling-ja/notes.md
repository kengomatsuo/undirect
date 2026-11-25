# Japanese Cutling posts on TikTok (ASG221): notes

Findings land here as they are read. Source for every number below: TikTok Studio in Chrome, signed in as @monholt, read 2026-11-25.

## Who watches @monholt (Studio > View analytics > Viewers, last 7 days)

1.2K viewers. Locations: Indonesia 59.4%, Mongolia 18.2%, Tajikistan 7.2%, Japan 5.7%, Russia 1.6%, Bosnia and Herzegovina 1.2%, North Macedonia 1.0%, Spain, Malaysia, US under 1%. Ages 18-34 make 86.5%. Followers: 1 (location insights need 100).

## Per post (Studio > post analytics > Viewers > Locations)

Studio shows a post's countries only once it has 100 views.

| Posted (WIB) | Post | Language | ElevenLabs voice | Viewers | Japan |
|---|---|---|---|---|---|
| Nov 18 17:42 | Cutling bank-number film 1:49 (7709459196093189377) | en | yes, "Hale" | 81 | under 100 views, not shown |
| Nov 18 17:53 | same film (7709462782848027912) | id | yes, "Defasyalala" | 86 | not shown |
| Nov 18 18:03 | same film, 2:02 (7709465283420884230) | ja | yes, voice T7yYq3WpB94yAuOXraRi (cutling-promo/tools/vo.py) | 111 (112 views) | **27.7%** (Indonesia 70.0%, Malaysia 1.5%) |
| Nov 18 21:58 | Undirect explainer 1:29 (7709525552813706502) | en | yes (undirect-promo explainer2, el-v4-hale) | 88 | not shown |
| Nov 18 22:01 | same (7709526816582683905) | id | yes (el-v4-defasyalala) | 84 | not shown |
| Nov 20 19:12 | Cutling bank-number film (7710225334066613524) | en | yes | 85 | not shown |
| Nov 20 19:15 | same (7710226143017815302) | id | yes | 69 | not shown |
| Nov 21 21:28 | "I just started Monholt" intro (7710631569291005205) | en | no | 254 | none listed (Mongolia 48.7%, Indonesia 31.4%, North Macedonia 5.2%) |
| Nov 23 07:35 | Undirect "You tapped Play" film (7711042922161900852) | en | no (music only) | 185 | under 1% (Indonesia 94.0%) |
| Nov 24 23:35 | Undirect carousel (7710988252647410945) | en | no | 100 views | 1.2% (Indonesia 94.6%) |
| Nov 25 07:25 | Cutling "typed your address" film (7710987843329412404) | en | no | 58 views | not shown |

The ja post's traffic was For You 100%, search and profile under 0.1%: TikTok handed it to Japanese viewers by itself, on an account with one follower. Average watch 30.8 s of 2:02; most viewers left at 0:01.

## The owner's hunch: does the ElevenLabs sound draw Japanese viewers?

Every Nov 18-20 film carried an ElevenLabs voice in its own language. Of those, only the Japanese one drew Japan; the English and Indonesian ElevenLabs films stayed under 100 views, and no post without Japanese words drew more than 1.2% Japan. So Japanese viewers follow Japanese words. The voice alone does not pull them, but the one post that did reach Japan spoke Japanese through ElevenLabs, and that is the only proven recipe on this account. One post cannot split voice from caption, so the Japanese versions keep both: Japanese caption, on-screen Japanese, and the same ElevenLabs Japanese voice (T7yYq3WpB94yAuOXraRi).

## @monholt or a Japanese account

Post the Japanese versions on @monholt. The one Japanese post already reached Japanese viewers there through For You, on an account with one follower, so TikTok sorts by the post's language without a separate account. A new account starts at zero followers and zero history, and per-language-accounts.md opens @monholtjapan only "once its language earns one". What was found on splitting accounts by language is vendor and forum opinion with no TikTok source and no measured penalty for a mixed account (web search 2026-11-25: dev.to/jondavis multi-language guide, blackhatworld "International Audiences", tokportal, pixelscan). Revisit when Japanese posts on @monholt draw a steady Japanese audience: then @monholtjapan (handle read free on 2026-11-21) is the name, and opening it needs the owner's yes.

## Times

Japan is UTC+9, two hours ahead of WIB. No Japan-specific data was found; Buffer's 2026 study (via felo.ai/ja/video/best-time-to-post-on-tiktok) names Tuesday 22:00, Wednesday 21:00 and 22:00, Friday 20:00 and 22:00 in the viewer's own time, and Shopify Japan names 20:00-25:00 on weekends (shopify.com/jp/blog/best-time-to-post-on-tiktok). The Japanese posts go out 21:00-22:15 JST on odd minutes:

| Post | JST | WIB |
|---|---|---|
| Address carousel | Thu Nov 26 21:17 | 19:17 |
| What's new in 2.0 | Mon Dec 1 21:07 | 19:07 |
| Five names | Tue Dec 2 21:43 | 19:43 |
| Five taps | Wed Dec 3 22:11 | 20:11 |

The Dec 1-3 posts, like their English rows, go out only once Cutling 2.0 reads READY_FOR_SALE.

## How the Japanese was written (copy-ja.json)

Blind-translation method, as Cutling's own `docs/fill-ins-strings-check.md` and `docs/aso/previews-2.0/g-words.json` ran it: each writer and each reader is a separate `claude -p` process with no tools (`--tools "" --strict-mcp-config`), so none can open a repo or see an English line. Writers get only a brief (screen, moment, what the line does, length budget, register, Cutling's own Japanese words); a separate cold reader, told only where each string sits, writes a literal English reading, what a Japanese viewer understands, and whether a Japanese person in that role would write it. Flagged lines go back to a fresh writer with the reader's point, or take the reader's own native line, and are read again. Fable was at its usage limit (resets Nov 29 9am WIB), so writers and readers ran on Opus at high effort.

Cutling's own Japanese words were read from `Cutling/Cutling/ja.lproj/Localizable.strings`, `Cutling/CutlingKeyboard/ja.lproj/Localizable.strings` and `Cutling/fastlane/metadata/ja` (name "Cutling - コピペ・定型文キーボード"; a saved text is a カットリング; the blank's default label is 名前; 変数, ボールド, 箇条書き, ハイライト, いつものキーボードで入力, ペースト).

## Post 2 seed (the Japanese 2.0 takes)

Sources: `Cutling/Cutling/SnapshotSeedData.swift` `seedForReleaseFilm` (six keys, the 12 `-PROMO_ROOM` replies, the Name blank's recent values), `Cutling/CutlingUITests/PromoReleaseUITests.swift` (`test1Note` typed on camera, `test2Keyboard` the Try It presses, `test3Room`), the film's cut `cutling-promo/src/release/plan.ts` and storyboard `release-2.0.md`, and frames of `out/release/cutling-2-release-9x16.mp4` (beat 1 is the Every-app preview's Messages take, with the keys Home address, Order update, Account number, Studio address, Thank you).

The Japanese world is the Every-app ja preview's (`SnapshotSeedData.swift` `EveryAppSeedCopy.japanese`, written blind on 2026-11-23 in `g-words.json`): a pottery class in Mitaka that also sells online. Four keys and the five names (中村, 小林, 松本, 岡田, 原田) are reused from it word for word, so beat 1's Messages take and the Try It takes show one phone. New: the date key (発送完了, three rounds), the welcome note (初回のご案内), the note's ※ date line, and nine of the 12 grid replies (three reuse the Every-app ja keys 返品について, 発送の目安, 教室の Wi-Fi).

The date key's beat is "dates fill themselves in". Round 2's reader read 2026年12月1日 inside a shop message as a system log and "delivered" as odd from a seller, so the key now types 「ご注文の品を12月1日に発送いたしました。」 with the date variable in the written pattern `M月d日` (Placeholders.swift takes any pattern after the colon). It still fills itself in, on one line.
