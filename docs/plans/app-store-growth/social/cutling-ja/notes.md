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

## Hashtags (TikTok search in Chrome, signed in as @monholt, 2026-11-25)

TikTok's web tag pages no longer print a post count, so a tag counts here when the top Japanese results for a Japanese iPhone user's search carry it, and its tag page opens on recent Japanese posts.

| Search | Tags on the top Japanese results (account) |
|---|---|
| アイフォン 便利アプリ | #神アプリ #便利アプリ #時短 (得する雑学ちゃんねる, 16.6K and 60 likes shown), #iPhone活用術 #ライフハック #生産性向上 (田中さんは気になるものは全部買う), #おすすめアプリ紹介 #iphone |
| iPhone 定型文 | #iPhone活用 #ユーザ辞書 #暮らしの時短 #スマホ便利機能 (リッタくん, 1 day old), #iPhone #ユーザ辞書 #時短 (トクミル). The top results are all "stop typing the same text again": Cutling's exact pain, answered today with the system ユーザ辞書 |
| コピペ iPhone | #iphone便利機能 #iphone便利術 #iphone活用術 #iphone裏技 (りゅう今すぐ使えるiPhone便利術), #iphone便利機能 #iphone裏技 (小池モバイル), #コピペ #スマホ #保存用 (スマホとアプリの教科書) |
| 個人開発 アプリ | #個人開発 #自作アプリ (ゆう｜家計簿アプリ作った情報系大学院生): Japanese solo makers post their own apps under these |
| ネットショップ 返信 効率化 | #業務効率化 (えいと), #メルカリ #物販あるある (たろーパパ: "make templates for messages"); no shop-owner tag repeats across results |
| 飲食店 予約 返信 | no recurring tag; results are skits, not owners' tools |

Tag pages opened: #iphone活用術 (top: こあら博士, ぷろぷろ, みさみさ, あお: Japanese iPhone-tips accounts), #神アプリ, #便利アプリ (one of its top posts is a ranking whose 5th place is about text copied a moment ago, so clipboard apps are already shown there).

Picked per post (3 to 5, per the social-media skill): #iPhone便利機能 and #iPhone活用術 on every post (the iPhone-tips audience), #時短, plus #コピペ (posts 1 and 3), #個人開発 (post 2, the maker's release), #業務効率化 (posts 3 and 4, a shop or restaurant owner's messages). #神アプリ and #便利アプリ are crowded with "free apps" rankings; they are kept off so the post is not judged against free-app lists.

## Voice: where the ElevenLabs Japanese voice goes

TikTok Studio's upload page, Photos tab (read today): "Select photos to upload… Upload up to 35 photos per post", JPG/PNG/WebP only, no audio input; a photo post's sound comes from TikTok's own library. So the carousel (post 1) cannot carry the ElevenLabs voice as a photo post; its voice_decision in copy-ja.json says so. Posts 2, 3 and 4 carry a voice.

## Post 1 is the "Type it once" film (owner's correction)

The owner meant the film posted in English on Nov 25 07:25 WIB (https://www.tiktok.com/@monholt/video/7710987843329412404, `undirect-promo/monholt-samples/out/cutling-9x16.mp4`, drawn in `src/cutling/world.ts` and `Film.tsx`), with its opening rows typed on a real Japanese keyboard: the reading in underlined hiragana turning into kanji as the person types. It is post `1_type_it_once` in copy-ja.json; the carousel is kept as `1b_carousel_address`, lower priority.

### The Japanese typing, read from iOS

Device-queue job `t1795592066732-ad61` on the pool iPad simulator (iPadOS 27.2), script in this session's scratchpad (`ime/job.sh`): keyboards set to `ja_JP-Romaji@sw=QWERTY-Japanese;hw=Automatic`, language ja, region ja_JP (all restored on exit); Safari on a local page whose textarea posts every `compositionupdate` and `compositionend` to a log; AXe (`axe type <romaji> --layout us`) typing one kana at a time as hardware key presses, 0.7 s apart. iOS's live conversion (ライブ変換, on by default) does the converting. The log is `~/Shared/device-queue/ios-sim/t1795592066732-ad61/out/ime.jsonl`.

Four invented addresses were typed:

| Address | What iOS committed |
|---|---|
| 東京都杉並区阿佐谷北2-14-7 | not read (Safari had not loaded the page yet) |
| 東京都練馬区豊玉北4-21-6 | 東京都練馬区**富玉北**4−21−6 (wrong kanji; on the way it showed トヨタ, then fell back to とよたまき) |
| 東京都杉並区高円寺南3-8-11 | 東京都杉並区高円寺南3−8−11, right with no help |
| 東京都世田谷区経堂3-12-5 | 東京都世田谷区**共同**3−12−5 (wrong kanji) |

So the film types 東京都杉並区高円寺南3−8−11. Its states on the way, kept in copy-ja.json as iOS showed them: 東京鳥栖 (a city in Saga) at す, 公 and 公園 before 高円寺, 高円寺味 before 高円寺南, a hyphen as ー until the next digit turns it into − (U+2212), and 東京都, 杉並区 and 高円寺南 committed by iOS on its own while the numbers are typed. On iPad with a hardware keyboard the marked text has a blue underline and the candidates sit in a popover; a run on the pool iPhone (`t1795592525374-4c97`, address F only, a screenshot per kana) is queued to confirm the iPhone's states and its underline.

The film's other strings reuse Cutling's own Japanese promo seed (`SnapshotSeedData.swift` `PromoSeedCopy.japanese`): 住所, 署名, 振込先, Wi-Fiパスワード, the person 田中 太郎 and the bank 三菱UFJ銀行 渋谷支店, the same as the bank-number film that drew 27.7% Japanese viewers. Its seed address 桜新町9-12-3 is not used: 桜新町 has only blocks 1 and 2.

## Rounds, and what the readers found

Every line in copy-ja.json says in `written` which round shipped and what its cold reader said; `history` keeps the earlier rounds and why each was turned down. Writers: one per post (post 1 film, carousel, post 2 seed, post 2 film, post 3, post 4). Readers: a fresh one per round. Rounds 3 to 6 took a reader's own native line and read it again cold. Every shipped line was read back as natural.

Findings for the app and later posts, from readers who never saw an English line:
- **ボールド:** two readers independently called it techy or translated: Japanese iPhone users and Apple's own Japanese UI say 太字. Cutling's ja strings use ボールド (`"Bold" = "ボールド"`). The spoken lines say 太字; the on-screen lines name no style. The app's string is worth a native look.
- **カットリング:** a viewer who doesn't have the app reads it as a strange word ("one cut ring"), not as "saved text". Copy for strangers says 定型文 (the store name's own word) or 返信. カットリング stays where the viewer sees the app's own screens.
- **Captions:** three readers said Japanese TikTok posts write no space between Latin and Japanese (Cutlingキーボード, iPhoneの). Captions follow that; on-screen text keeps the half-width space of Cutling's 2.0 store words.
- **Templates:** "どのアプリでも" overclaims (third-party keyboards are blocked in password fields), so the caption says ほとんどのアプリで.

### The iPhone run, and which typing the film uses

Ticket `t1795592525374-4c97` typed the same address on the pool iPhone 18 Pro Max (Japanese Romaji keyboard on screen, a screenshot after every kana in its `out/`). The iPhone did not convert as it typed: the reading stayed in hiragana, underlined in blue, growing kana by kana (とうきょうとすぎなみくこうえんじみなみ3-8-11), while the candidate bar above the keys guessed the kanji. Its first candidate went 東京から, 東京 and 🗼 (Tokyo Tower), 東京都, then 東京都墨田区 before 東京都杉並区, through 東京都杉並区公園 and 高円寺味, and ended on 東京都杉並区高円寺南3-8-11 (plain hyphens). Return committed the hiragana as typed, so a person taps that candidate. That is the film's typing in copy-ja.json (`ime_typing.iphone`): hiragana first, then the whole row turns into kanji with one tap. The iPad's live conversion, kanji appearing keystroke by keystroke, is kept beside it (`ime_typing.ipad_live_conversion`), for an iPhone with ライブ変換 switched on.

## Post 2 beat 1: the name is typed (owner's correction)

The owner: the name step is the main part, and it is typed first, not chosen. The Japanese take now shows the reply asking for the name, なかむら typed on the kana keyboard and converted to 中村, ✓, and the reply landing with 中村様. The old headline (いつもの返信、[名前]はタップで入る), voice line 1 (…タップするだけで入ります) and caption line 2 sold a tap, so all three were written again blind from that screen and read back cold, each reader also asked whether a viewer understands the name is typed (all three: yes):
- headline 「[名前]を打つだけで、 / 返信が完成。」 (round 2, the round-1 reader's own line; round 1's 「返信が、[名前]を聞く。」 read as translated)
- voice 「定型文を選ぶと、お客さまの名前を聞いてきます。いつものキーボードで打てば、そのまま返信に入ります。」 (round 3), its last words on the check mark at 8.61 s
- caption line 2 「定型文を選ぶとお客さまの名前を聞かれるので、打った名前がそのまま返信に入ります。」 and the date line after it (round 5; a reader caught that 日付も after it made the name sound automatic)

The English film's head, "A reply that asks for the [name].", already says what either take shows and names no tap, so it is kept (copy-ja.json `2_release_2_0.en`).
