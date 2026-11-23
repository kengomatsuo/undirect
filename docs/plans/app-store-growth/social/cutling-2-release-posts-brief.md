# Brief: Cutling 2.0 release posts, finished for every platform (ASG104)

## Goal

On Dec 1 Cutling 2.0 goes on sale. The owner opens one link on his phone and sees every Cutling 2.0
release post as it will appear on each platform he posts to, with its film, carousel or picture
playing and its words final, and gives one go. The session asg-social-2, which holds the
@monholtco calendar and every platform's scheduler, then schedules them from Dec 1.

## Why

The owner asked on 2026-11-21: "What's new posts, and also sheet for existing users coming back to
introduce the app." The What's New sheet is built. Text drafts for the posts went to him and on
2026-11-23 he answered "sure I guess". On 2026-11-22 he set a rule for every post:
`~/.claude/projects/-Users-hafang-Repositories-undirect/memory/social-engagement-first.md` (read it
whole). The drafts were written before that rule and before 2.0 took its final shape, so they are a
starting point, not approved copy.

## Facts read from disk on 2026-11-23

- 2.0.0 is scheduled in App Store Connect for Dec 1 (earliestReleaseDate 2026-12-01T00:00Z). The
  store still sells 1.6.2 (iTunes lookup, today). `web/_generator/live.py` in the Cutling repo has
  `LIVE_FEATURES["fill-ins"] = False` until release day.
- What 2.0 holds, in the words that ship: `~/Repositories/Cutling/fastlane/metadata/en-US/release_notes.txt`.
  The editor calls its inserts Variables (a blank is "Ask Each Time"; dates, a choice, clipboard
  text, the cursor and more; `Cutling/FillInKinds.swift`). Text opens on its own page like Notes, with
  bold, italic, underline, strikethrough, highlight, monospace, links and lists. 5,000 texts and 500
  images, 10,000 characters each (`CutlingStore.maxTextCutlings`, `maxImageCutlings`). Every key
  types. A new setup guide with the Settings steps as a video.
- The text drafts and the facts behind them: `cutling-release-posts.md` beside this file. Rival
  release posts studied: `~/Repositories/Cutling/docs/research/release-posts/README.md`.
- Buyers' words: `~/Repositories/undirect/docs/research/cutling-niche-language.md` and
  `cutling-voice-of-customer.md`. Rival research for 2.0's previews found Fast Reply already pitches
  fill-in-the-blanks: `~/Repositories/Cutling/docs/aso/previews-2.0/rivals.md`.
- The owner's platforms: X @monholtco, Instagram, TikTok, Threads, the Monholt Facebook Page,
  YouTube @matsuokengo (`per-language-accounts.md` beside this file; no per-language account exists
  yet). The calendar already scheduled: `asg-social-2`'s state `~/.claude/session-states/asg-social-2.md`,
  `calendar-final/`, and `films-2/posts.json` (the shape that session schedules from).
- Recordings that exist: Cutling 2.0's App Store previews, direction G "Every app",
  `~/Repositories/cutling-promo/out/previews-2.0/cutling-preview-*.mp4` (music Mixkit "Complicated"),
  with their takes from `CutlingUITests/PromoEveryAppUITests.swift` and `scripts/every-app-takes.sh`
  (seed `-PROMO_EVERY`); fill-in clips in `~/Downloads/cutling-fill-ins/` and
  `~/Downloads/cutling-fill-ins-redesign/`, and Text page clips in `~/Downloads/cutling-text-page/`,
  some recorded before the Variables rename. New takes run on the device queue
  (`~/Repositories/Cutling/scripts/ui-test.sh`, seeds `-FILLIN_TEST`, `-MEMORY_TEST`).
- Music: Mixkit only (owner, 2026-11-18).
- Files for the owner go under `~/Downloads/cutling-2-release-posts/`; the review page is a private
  Artifact.
