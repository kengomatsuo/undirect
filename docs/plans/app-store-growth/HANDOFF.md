# App Store growth handoff (2026-11-10)

Where things stand: Undirect is done on 6 of the 10 directories, its 1.0.4 build is uploading screenshots, nothing is submitted to Apple yet. First action: "Next actions" step 1.

## Where things stand

| Area | State |
|---|---|
| Listings languages | Done. 50 of Apple's 50 on all four versions; in-app strings complete in both apps [read: asc localizations list, check_localizations.py, xcstrings count] |
| Undirect screenshots | Rendered, 47 language sets x 5 x 3 devices, red ground, dark app screens, press on the Undirect row; committed [commit b4485ed and the commit after it] |
| Undirect build | Background job: bump to next patch, build, binary, mas, `./deploy.sh screenshots`, `./deploy.sh screenshots_mac`. Check `pgrep -fl 'deploy.sh|fastlane'` and `git -C ~/Repositories/undirect status`. project.yml bump is uncommitted until release |
| Cutling screenshots | Frame 1 replaced by the keyboard in a chat for iPhone and iPad in 50 locales, composed by `./deploy.sh frame`; uncommitted in the Cutling repo. ja and id use their own takes, the others the English take |
| Banners | 50 per app, 5244x2950 PNG, no alpha: `~/Repositories/undirect/.shots/creative/<locale>/universal.png`, `~/Repositories/Cutling/fastlane/creative/<locale>/universal.png` (untracked). Not uploaded |
| Undirect site badges | Live in the footer [commit 087acbb]: MacPip, MacBase, Mac Browse, Mac App Index. MacNative's badge is not added |

| Directory | Undirect | Cutling |
|---|---|---|
| Indie App Catalog | submitted | submitted |
| MacPip | listed, plain link | not started; submit the website link so the badge can verify |
| MacBase | in review, ct=macbase, video added (listing cmw9zpjsg0001484l0hfazgfq) | in review, plain link, no video (listing cmw9zrxp40002484ltzo4vgxi) |
| Mac Browse | in review, free with verified badge, video added, website link | not started |
| Mac App Index | saved at macappindex.com/submit/undirect; press Verify badge, the badge is live | not started |
| MacNative | submitted (profile/apps/9468); publishes once its badge is on the site; ct in the text | not started |
| MacUpdate | submitted, ct=macupdate | not started |
| Uptodown | not started, signed in; needs an upload or an authorship claim | not started |
| MacMenuBar | not a fit | needs 3 real menu bar screenshots; form did not load in automation |
| r/macapps | blocked in Claude's browser; owner posts | same |

## Next actions, in order

1. Finish directories for Cutling, plus Mac App Index and MacNative's badge for Undirect [owner: "All ten sites do it where possible."]. Campaign link on every App Store link [owner: "did you even bother to make campaign links to know which source yields most?"]: `https://apps.apple.com/app/apple-store/id<ID>?pt=127609326&mt=12&ct=<site>`. Undirect 6810513194, Cutling 6759476314. A site that needs a badge gets it in the footer [owner: "All these kinds of things do apply and put into the github"]. Cutling footers: `web/_generator/templates/*/index.html`, publish with `./deploy.sh web`. Never pay for a tier.
2. Upload Cutling's explainer and Shorts [owner: "Cutling also the explainer and shorts are ready for youtube why not uploaded?"]: `~/Repositories/cutling-promo/out/explainer-{en,id,ja}.mp4` (16:9, 109 s) and `explainer-{en,id,ja}-portrait.mp4` (1080x1920). Plan files first [rule: skill youtube-visibility]; model: `~/Repositories/undirect-promo/docs/youtube/explainer-en.plan.md`. GUESS: public, as with Undirect; the owner said "Keep it public" about those. Then add the video URLs to Cutling's listings [owner: "Why you don't put the youtube videos in?"].
3. Undirect release after the background job ends: upload each locale's banner with `asc asset-library images upload --library-id 6810513194 --file <png> --reference-name <locale>`, then POST `/v1/appAssetLibraryPlacements` through `asc api` for types `PRODUCT_PAGE_HEADER_ASSET` and `APP_STORE_SEARCH_RESULTS_ASSET`, group `DEFAULT_PROFILE`, relationships `image` and `appStoreVersionLocalization`, on the editable iOS version [read: developer.apple.com/documentation/appstoreconnectapi/placing-assets-on-your-app-store-surfaces]. Then `fastlane ios release`, `fastlane mac release_mac`, commit project.yml, as the `release)` block of deploy.sh does [owner: "Apple's playbook THEN MAKE THEM. GO DO ALL."].
4. Cutling release the same way: commit the screenshots, `./deploy.sh bump`, `build`, `binary`, `mas`, `screenshots`, placements, `ruby fastlane/submit_release.rb <build>`.
5. Move board cards ASG1-8 in `BOARD.md` to Review with their commits.

## Owner decisions in force

- Only the background changes to red; app screens stay dark [owner: "I WAS TALKING ABOUT THE BACKGROUND BEING BLACK ONLY"].
- No scam pages in Undirect's screenshots [owner: "like they advertise the opposite"].
- Cutling's keyboard shot is in a chat, with no onboarding behind it [owner: "use one thats in imessage"].
- Free directory extras and badges are wanted [owner: "just whatever extras you may do"].

## Waiting on the owner

- r/macapps post. MacMenuBar screenshots, if wanted.

## Gotchas

- Claude does not create accounts or type passwords. The owner signed in to every directory in Chrome on 2026-11-10.
- Chrome JS results containing query strings come back as BLOCKED: return lengths, or click the page's Copy button and read `pbpaste`.
- Forms: set values with the native value setter and fire input and change. Mac Browse tags need real clicks.
- `.shots/` is untracked; the panels and theme that make Undirect's screenshots live only there.
- Cutling's chat is the stand-in app from the film, and the Cutling keyboard in it is real.
- The site's IndexNow 403 is old and harmless to the deploy.

## Skills to load

`youtube-visibility`, `anthropic-skills:chrome-browser`, `board`, `human-prose`.
