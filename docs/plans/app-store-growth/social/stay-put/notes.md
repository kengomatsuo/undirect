# Stay-Put posts (card ASG213)

Owner, 2026-11-25: "so pause or lessen posts to what really matter, delete underperforming ones, focus more on the
current big things like undirect stay-put update with its artwork?" Later the same day: "so like our posts and
scheduled stuff aim more like personal announcement of my products instead of like forced questions you have been
doing?" Nothing goes out or is scheduled until his go on the review page.

## Findings (2026-11-25)

- The event is APPROVED in App Store Connect: id 6837368724, "The Stay-Put Update", published on the store
  from Nov 25 08:00 UTC, live Nov 27 08:00 UTC (15:00 WIB) to Dec 27. Deep link undirect.matsuokengo.com/demo/.
  Direct link to the event: apps.apple.com/app/id6810513194?eventid=6837368724.
- Undirect 1.1.1 is READY_FOR_SALE on iOS and macOS (asc_state.py 1.1.1). Its What's New (releases/1.1.1):
  a pop-up is stopped at the press itself, so no ad tab opens even for an instant, and a stopped pop-up breaks
  like glass from where you pressed. 1.1.0 added the note at the foot of the page and the effects, and iOS 18.
- What reached strangers (docs/research/x-reach-drop-2026-11-25.md): only video. TikTok 57-207, IG Reels 90-135,
  FB reel 206, Shorts up to 954. Stills, carousels and stand-alone questions: 0-6 views; X has 4 followers.
  "Hey, I just started Monholt" (a maker introducing his own work) drew 85 on X and 207 on TikTok.
- Already scheduled and kept (videos and the sale, social-posts.md): "Next chapter" film Nov 27 07:55-08:19 WIB
  (TikTok, IG+FB Reel, Threads, Short) and X 15:45; "× means close" Nov 28 23:25-23:47 and X 15:15;
  the Black Friday sale on X Nov 27 21:45. The Cutling films of Dec 2-3 wait for Cutling 2.0, which is not
  yet submitted (ASG151), so no Cutling 2.0 post is planned here.
- The event art's source is the path-traced scene options/src/scene-paperweight.glsl.js (studio-render skill);
  art.html in the event folder is the older flow-field art, not the card.

## Decisions

- Prices read from App Store Connect (price_sale.py read 6810513194): $0.99 from Nov 27 00:00 Pacific (15:00 WIB,
  the same moment the event goes live) to Dec 1 00:00 Pacific (Dec 1 15:00 WIB), then $1.99. So no Stay-Put post
  goes out before Nov 27 15:00 WIB, and any price in a caption carries its end date.
- This is Undirect's first In-App Event and Monholt's first live one (Cutling's "2.0 The Write-It-Once Update" is a
  DRAFT in App Store Connect), so "my first App Store event" is true.
- The demo page's address in the film is marlowtv.com: no DNS record and "No match" in whois (2026-11-25), the same
  check films-2 made for lampnovel.com. The pop-under's host is the demo's own stand-in, prize-hub.example.

## Decisions

- Every Stay-Put piece is a film, because only video reached strangers; the art is the film's first and last shot,
  set moving (the path tracer renders the gust frame by frame), so the artwork the owner asked for is what a
  stranger's feed shows first. The cover frame is the event card's own composition with "The Stay-Put Update" on the
  plain red under the stack.
- The film shows one real case, the 1.1.1 headline: a tap on Play on Undirect's own demo page (Marlow TV) is aimed
  at a pop-under, Undirect stops it at the press, the glass breaks from the fingertip (drawn with fx.js's own
  fracture() and its timings) and the note rises ("Stopped", prize-hub.example struck through), and the film plays.
  The Back-button trap is named in the words only (the event's short description) and not acted out: a second case
  would push the film past 15 s, and a Back beat needs a previous page the story does not have.
- Words on screen are only the owner's own event text: "The Stay-Put Update", "No surprise redirects.", "You just
  stay put." (ASG128: four rounds of written event text were rejected; his own words are the ones approved).
- Captions are a maker announcing his own work in "I" (owner, 2026-11-25), with no closing question.
- Music is Hangtime from 94.98 s, so its break (98.56 s) leaves the tap and the glass in near silence and its drop
  (102.78 s) lands on the cut back to the calm art (measurements from monholt-films-2's u-next).
- Sound: the gust is "PaperWind.wav" (freesound 420874, CC0), ranked by sfx.py (undirect-promo/stay-put/tools/sfx/picks/gust/ranked.md);
  the glass is the shatter.wav the sample films' sfx.py pass picked. The sfx.py batch for the glass moment was stopped
  by the mac-overloading session at 26 min (9.5 GB, swapping); its gust ranking had already been written and the glass
  reuses the earlier pick, so no rerun is needed. Model and audio batches go to a cloud session from here on.
- Threads gets one maker post every day from Nov 26 to Dec 6 (ASG217's rule: "I", text plus a picture or clip, one
  topic tag, no price, no closing question). So the Threads posts carry no price, the Black Friday last-day post is
  X only, and seven extra Threads posts (Nov 28, Nov 30, Dec 1, 3, 4, 5, 6) each tell one true thing about the update,
  taken from the code or the release notes: the glass's timings (fx.js: 170 ms whole, 120 ms cracked), the note
  (guard.js: Safari gives extensions no notifications), the seven made-up demo sites (web/demo), iOS 18 support
  (What's New 1.1.0), the switches for the note and the effects, the stone's hand-made flaws (the scene file), and
  1 versus 900 light paths per pixel. The kept Threads film posts of Nov 27 08:11 and Nov 28 23:39 end on questions;
  they were approved earlier and are left as they are, so those two days carry two Threads posts each.
- The art render shares the Mac's GPU with another session's path tracing, about a minute a frame; a frame whose
  Chrome dies is retried after 5 minutes (render-frames.sh).
- Owner, 2026-11-25 (via the coordinator): "where the stories and posts on them other social media platforms? The
  image posts of the stay-put update, later on for the cutling one, etc.?" So the page also carries, for the Stay-Put
  Update: Instagram and Facebook Stories (Nov 27 "New", Nov 30 "Last day at $0.99"), an Instagram carousel with
  Facebook photos (Nov 30) and a TikTok photo post (Nov 30), all four pictures drawn from the film itself
  (src/films/cards.js); X and Threads already had image posts. And a Cutling 2.0 section for Dec 1 with the same set
  (X with its event card, Threads, Instagram + Facebook carousel, Stories, TikTok photo post), built from Cutling's
  event art and the approved Five names / Five taps stills, marked as waiting until Cutling 2.0 reads READY_FOR_SALE
  (both 2.0.0 versions PREPARE_FOR_SUBMISSION on Nov 25, release scheduled Dec 1 00:00 UTC; its event is a DRAFT).
- Stories carry their words in the picture and no sticker, because Business Suite could not place the stickers of
  Stories P03, P06 and P09 (Nov 22-25), so they never went out. A link sticker would mean posting from the Instagram app.
- Every Instagram feed post and Reel names @kenneth_j.fang as collaborator (owner decision, memory
  personal-account-collab). After he accepts he shares it to his Story mentioning @monholtco, and @monholtco reshares
  that Story from the Instagram app; on Nov 27 that reshare is the Story that carries the film.
- Coordinator, 2026-11-25: one Stay-Put film only, built by undirect-b2 (ASG215, "Blown away", undirect-promo/monholt-films-3:
  the buyers' complaints on the art's loose sheets blow away and real 1.1.1 takes answer each; Hangtime 141.10-167.98 s,
  26.9 s). So no film is cut from this card's art render: its 96 frames (out/art, 1080x1920, 30 fps, motion.json) went to
  b2 by message for its art shots, the Stay-Put film slots on the page read "film from undirect-b2, 9:16 for TikTok,
  Reels, Shorts", and the Nov 27 captions now describe what b2's film shows (a page that redirects while you scroll
  stays put; Back goes back) instead of the pop-up on Play. The film code (src/films/stay-put.js) stays as the source
  of the stills and cards: the glass, the note and the end frame. "Not a photo" no longer ends on the gust; it holds the
  finished still, so the moving art appears only in b2's film.

## Delivered (2026-11-25)

- Review page: https://claude.ai/artifact/WE3t8oLEELxHGVYyEwL7tS (built by review.py from posts.json; rebuild with
  `python3 review.py review` and publish review/index.html with review/media).
- Media in ~/Downloads/Claude/stay-put-posts/ (34 files): the making-of film undirect-not-a-photo-9x16.mp4 (12.4 s,
  -15.1 LUFS, true peak -1.6 dBFS) and its cover; the event card and details; 4:5 stills from the film code; the
  stone close-up; the 1-versus-900 split; carousels, Stories and TikTok photo posts for Stay-Put and Cutling 2.0;
  Cutling's event card. Sources: undirect-promo/stay-put (art/, src/films/, tools/package.sh) and this folder.
- Checks: the making-of film under TikTok's and Reels' overlays (undirect-promo/stay-put/out/overlay-nap-*.jpg): every
  word inside the clear box after moving the lower lines to x 120-780; every still opened at full size on contact sheets.
- Open: the Stay-Put film itself is undirect-b2's; its slots on the page show a placeholder until b2's file is final.
  The kept Threads film posts of Nov 27 and Nov 28 end on questions.
