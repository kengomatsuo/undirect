# Custom product pages

Researched 2026-10-01. Every Apple claim was fetched that day; the API behaviors marked "tested" were run against app 6810513194.

## What Apple says

- Up to 70 pages per app. Each can differ in screenshots, app previews, promotional text and keywords, is localizable and has its own URL. Available on iOS and iPadOS 15 and later. A page shows only to people who follow its link, or in search for the keywords assigned to it; otherwise everyone sees the default page. [ASC help: Configure multiple product page versions](https://developer.apple.com/help/app-store-connect/create-custom-product-pages/configure-multiple-product-page-versions/)
- **iPhone and iPad only.** "up to 70 additional versions of your product page on the App Store for iPhone and iPad". A page for Mac does not exist, so the Mac page the research proposed is dropped. [Custom product pages](https://developer.apple.com/app-store/custom-product-pages/)
- Creating needs the app to be Ready for Distribution in at least one country (it is: iOS 1.0 and macOS 1.0 are READY_FOR_SALE). A page can start from a copy of a version in Prepare for Submission. [ASC help](https://developer.apple.com/help/app-store-connect/create-custom-product-pages/configure-multiple-product-page-versions/)
- **Keywords** are assigned per page and per localization, chosen "from your latest approved app version". A keyword combination must belong to one page only; the page is searchable only after approval and while visible. [ASC help](https://developer.apple.com/help/app-store-connect/create-custom-product-pages/configure-multiple-product-page-versions/), [Custom product pages](https://developer.apple.com/app-store/custom-product-pages/)
- **Deep link**: optional, universal link or custom URL, used when someone opens the app from the page on iOS 18 or iPadOS 18 and later. [ASC help](https://developer.apple.com/help/app-store-connect/create-custom-product-pages/configure-multiple-product-page-versions/)
- **Review**: page metadata is reviewed separately from the app. With an approved app, a page can be submitted with or without an iOS version; "Add for Review" puts it in a new or existing draft submission and it is reviewed with the latest iOS version. Roles: Account Holder, Admin, App Manager, Marketing. Editing an approved page creates a new version and keeps the URL. [Submit a custom product page](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-a-custom-product-page/)
- App Analytics shows impressions, downloads and conversion per page once a page has five first-time downloads.
- API resources: `appCustomProductPages`, `appCustomProductPageVersions`, `appCustomProductPageLocalizations`, `appScreenshotSets` under a localization, `searchKeywords` relationship, `appKeywords`. [API: App Custom Product Pages](https://developer.apple.com/documentation/appstoreconnectapi/app-custom-product-pages)

## What the API does (tested)

- `asc` 5.1.0 has `product-pages custom-pages` (list, create, versions, localizations, search-keywords, screenshot-sets, preview-sets) but its `create` fails: Apple wants the first version and its localizations in the same request body ("missing a required relationship: appCustomProductPageVersions"). `Support/AppStore/asc_api.py` posts that body; the rest goes through `asc`.
- Pages can be created while the app versions sit in PREPARE_FOR_SUBMISSION. They are independent of those versions and are not part of the 1.0.1 submission until someone adds them. Created pages start unsubmitted.
- A page localization can use any locale the app has (a `ja` localization was accepted although the live 1.0 holds only en-GB).
- **Keywords are the hard limit.** Adding one is refused unless it sits in the keyword field of the released version localization of that locale: `'pop up' does not exist for ...appStoreVersionLocalizations/...` and `no released appStoreVersionLocalization for locale 'ja'`. Today only en-GB is released, with `popup,redirect,blocker,extension,hijack,click,tab,ads,tracker,privacy,browser,popunder`. The other 49 locales get keywords only after 1.0.1 is approved and live.
- Screenshot sets: the iPhone 6.9 inch frames (1320x2868) go to display type `IPHONE_67`, the 13 inch iPad frames (2064x2752) to `IPAD_PRO_3GEN_129`. Upload order follows file names. One locale takes about a minute per device.

## Decision: two pages

One page per clear search intent the research found (`research.md`, conversion item 4; `keywords.md` section 1).

| Page | Intent | Frames (order of the five localized frames) | Keywords |
| --- | --- | --- | --- |
| Pop-up blocker | 'popup blocker', 'pop up blocker' (the top typed term in US, GB, DE) | 1 Popup blocker for Safari, 4 works beside your ad blocker, 2 one press guards a site, 3 every blocked address, 5 nothing leaves the device | popup, popunder |
| Redirects and unwanted tabs | 'redirect', 'unwanted tab', 'tab hijack' (open in every storefront, no type-ahead) | 3 every blocked address, 4, 2, 1, 5 | redirect, hijack, tab, click |

Not made:

- **Mac page.** Not supported (above). The Mac listing stays on its own screenshots.
- **A third page for 'ad blocker' queries.** The research found that intent mismatched (people want ads removed; `research.md`, risks), so a page for it would raise installs and bounces. Frame 4 ("works beside your ad blocker") sits second on page one instead.
- **Deep links.** The app has one destination worth opening (the rules list) but the page's keyword intent does not point at a screen, so none is set.

Frames are reused, so no new captures. The captions are baked into the images and say nothing about redirects; the page differs by order and by promotional text. If the redirect page converts worse than the default, the fix is one new frame with a caption about redirects and tabs, captured from the demo site.

Promotional text (170 characters, not a search input) is what separates the pages in the listing. English is in `Support/AppStore/custom_pages.json`; every other locale was written blind from `/cpp/<code>.input.json` meanings.

## Two more API facts (found while deploying)

- The first localization in the create request must be in the app's released locale (en-GB here); an en-US first localization returned 409 "missing a required relationship". The script now starts from the first released locale and adds the others after.
- Screenshot uploads hit App Store Connect's hourly rate limit (429 with waits of 7 to 44 minutes). Filling 2 pages x 50 locales x 2 devices took several hours. `custom_pages.py` waits out the stated time and skips sets that already hold five frames, so a rerun resumes.

## Keywords follow the released field (owner decision, 2026-10-01)

The 1.0.1 English keyword fields stay as researched: `redirect` and `tab` live in the subtitle, where they rank. Page keywords are therefore candidates only. `custom_pages.py` reads the released iOS version's keyword field for each locale, keeps the candidates found there (one page per keyword, first page wins) and logs every skipped one. Today that is en-GB only; after 1.0.1 is live the redirect page keeps `hijack` and whatever else of its intent a locale's new field holds. `--list-released` prints each released field so per-locale candidates can be added to `custom_pages.json` (the `"*"` list applies to every locale).

## Pipeline

`./deploy.sh pages` (`Support/AppStore/custom_pages.py`): creates a page when none has the name, adds a localization per locale with promo text, sets the text, assigns the keywords Apple accepts, uploads the reordered iPhone and iPad frames, and reads every locale back. Flags: `--locales`, `--pages`, `--no-screenshots`, `--verify-only`. It never submits. Submitting is "Add for Review" in App Store Connect and the owner's call.
