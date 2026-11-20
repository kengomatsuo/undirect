# Redirects with no tap, and the Back-button trap

Research for ASG61 and ASG62, started 2026-11-20. The complaints are rows 1, 2, 7,
23, 24, 32, 47, 50, 52 and 54 of [undirect-voice-of-customer.md](undirect-voice-of-customer.md).
Each finding is written here as it lands.

## What Safari gives an extension to work with

- **`webNavigation` cannot tell a typed address from a script's redirect in
  Safari.** `transitionType` and `transitionQualifiers` on `onCommitted` are
  marked unsupported for Safari in MDN's compatibility data
  ([MDN onCommitted](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onCommitted)).
  So the background page, which is where same-tab trips are judged today, sees a
  scam page's `location.href = …` and the user typing an address the same way.
  That is why a trip with no press was let through: the background had no other
  way to know.
- **The Navigation API's `navigate` event can.** Safari 26.2 shipped the
  Navigation API ([web.dev, Baseline](https://web.dev/blog/baseline-navigation-api));
  WebKit fires `navigate` for cross-document navigations since
  [bug 274426](https://bugs.webkit.org/show_bug.cgi?id=274426) (fixed 2024-05).
  The HTML standard fires the push/replace/reload `navigate` event only when
  *all* of these hold: the user involvement is not "browser UI", the document
  being navigated is same origin-domain with the document that started it, the
  document is not the initial `about:blank`, and the URL is http(s)
  ([HTML, "navigate", browsing-the-web](https://html.spec.whatwg.org/multipage/browsing-the-web.html)).
  So a typed address, a bookmark or the Back button never raise it; a script on
  the page, a meta refresh or a link on the page do. Cancelling it with
  `preventDefault()` stops a cross-document push or replace before any request
  is made. `event.userInitiated` is true only for a link or form the user
  activated.
- **iOS needs nothing older.** The app's iOS deployment target is 26.2
  (`project.yml`), the release that brought the Navigation API, so every iPhone
  that can install Undirect has it. The Mac target is macOS 15, whose Safari
  may be older than 26.2; there the guard feature-detects `navigation` and
  falls back to today's behaviour.
- **A cross-origin frame sending the top page away is not covered by the
  event**, by the same-origin condition above. Safari, like Chrome, already
  refuses a cross-origin frame's top navigation without a user gesture (the
  "framebusting" intervention), so the remaining hole is an ad frame that rides a
  real tap, and that is what the press judgement in the background already
  catches.
- **WebKit already skips history entries a page adds without a gesture.**
  [Bug 241885](https://bugs.webkit.org/show_bug.cgi?id=241885) (2022) makes Back
  skip entries added by `history.pushState()` with no user interaction, after
  Chrome's intervention ([Chromium doc](https://chromium.googlesource.com/chromium/src/+/127.0.6533.99/docs/history_manipulation_intervention.md));
  [bug 241932](https://bugs.webkit.org/show_bug.cgi?id=241932) extends it to the
  swipe. A Chromium engineer reports WebKit counts any interaction in the last
  ten seconds that has not been consumed
  ([navigation-dev thread](https://groups.google.com/a/chromium.org/g/navigation-dev/c/IJxgtSDTjVg)).
  So the trap people still hit on iPhone (rows 7, 32, 47, 50) is built the other
  ways: entries pushed on the back of a real tap, a `popstate` handler that
  sends the tab to the ad the moment Back is pressed, and a redirect page left
  in history so Back re-runs it.

## How shipped products do it

- **Chrome, Firefox, Safari**: the history intervention above. Firefox's
  `browser.navigation.requireUserInteraction` breaks some sites' pushState
  ([bug 1645211](https://bugzilla.mozilla.org/show_bug.cgi?id=1645211)), which is
  why the guard narrows its own rule to repeats of the same address.
- **"Prevent tab history flooding" userscript** (Greasy Fork 422832): wraps
  `history.pushState` and drops a push whose URL equals the current one, so Back
  never stays on the same page. Undirect copies the idea and keeps one such push,
  since a sheet or menu that Back should close pushes exactly that.
- **Content blockers (1Blocker, AdGuard, uBlock Origin Lite)**: block ad hosts by
  list. Row 47 is a uBlock Origin Lite review complaining a redirect page stays
  in history so Back loops: a host list cannot stop a redirect it has never
  seen, which is the gap Undirect's judgement fills.

## What Undirect does with it

- **No-tap redirect (ASG61)**: on a guarded site, the top frame's content script
  listens for `navigate`. A cross-site push or replace that nobody activated, with
  no press on the page in the last five seconds, is cancelled, recorded in the
  popup as a redirect with no tap, and the banner names where it tried to go.
  Let through: a destination the user allowed, the "allow" default, a trip whose
  address carries a way back to this site (a sign-in), and a trip the page's own
  address names (a link shim such as `google.com/url?q=…`). Not learned as a
  network block, because one false positive would block that site everywhere;
  the next attempt is cancelled the same way.
- **Back-button trap (ASG62)**: two halves.
  - A navigation started within 700 ms of Back (a `traverse` navigate or a
    `popstate`) to another site is cancelled whatever press came before it,
    because Back was the user's and going somewhere else in reply is the hijack.
  - `history.pushState` to the address already showing is turned into
    `replaceState` after the first one, so a page can keep one entry for a sheet
    or menu but cannot stack copies that Back has to wade through.

## Testing on the Mac without touching the App Store copy

Safari 26 loads an unpacked web extension folder from Settings > Developer >
"Add Temporary Extension…", lists it under Temporary, and drops it after 24
hours or when Safari quits
([Apple, Running your Safari web extension](https://developer.apple.com/documentation/safariservices/running-your-safari-web-extension.md)).
That runs `Extension/Resources` beside the App Store Undirect with no pluginkit
swap, so the owner's guarded sites and learned blocks survive the test (a swap
wipes them; see docs/safari-constraints.md). The native app messaging is absent
in that mode, which the guard does not need.

## Launch: featuring nomination and release timing (2026-11-20)

- Apple takes featuring nominations in App Store Connect, types App Launch,
  App Enhancements and New Content; 1.0.5 is App Enhancements. Apple asks for
  at least two weeks' notice and recommends up to three months
  ([Getting featured](https://developer.apple.com/app-store/getting-featured/));
  App Store Connect's help sets the minimum at three weeks before the chosen
  publication date
  ([Nominate your app](https://developer.apple.com/help/app-store-connect/manage-featuring-nominations/nominate-your-app-for-featuring)).
  Up to five supplemental links (art, documents, a TestFlight public link).
- The App Store Connect API creates one (`POST /v1/nominations`, API 3.8.0):
  `name`, `description`, `type`, `publishStartDate`, `submitted` (false keeps
  it a draft in the owner's account), optional `deviceFamilies`, `locales`,
  `supplementalMaterialsUris`, `notes`, and `relatedApps` (read from Apple's
  OpenAPI specification zip, 2026-11-20).
- So the release date decides whether the nomination can count: releasing on
  approval (the repo's `automatic_release`) leaves no lead time; holding 1.0.5
  for a set date three weeks out gives Apple the notice it asks for.
- Release at the nomination date or now (owner asked for an honest read,
  2026-11-20): Apple frames nominations around upcoming moments and asks
  three weeks' notice, but none of its pages says an already-live enhancement
  is out ([Getting featured](https://developer.apple.com/app-store/getting-featured/)).
  Kept release on approval for the sale, and added an In-App Event instead:
  Apple lists In-App Events in editorial selections and personalised
  recommendations and lets a nomination carry one
  ([In-App Events](https://developer.apple.com/app-store/in-app-events/)).
- In-App Event rules used: name 30 characters title case, short 50, long
  120 sentence case; card 16:9 at least 1920x1080, details 9:16 at least
  1080x1920, no text or logos; at most 31 days, published at most 14 days
  ahead; Major Update is for "significant new features"
  ([badges](https://developer.apple.com/help/app-store-connect/reference/in-app-events/in-app-event-badges)).
  App Store Connect also requires a deep link and a purchase requirement
  before review although the create call takes neither.
