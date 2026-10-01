# Review prompt

The container app asks Apple for its standard rating sheet once per app version, after the extension has stopped something. `App/ReviewPrompt.swift` holds it and `ContentView.reviewReady` decides when.

## Rule

The request fires when all of these hold, then waits four seconds with the task cancelled if any of them stops holding:

- the welcome sheet has been dismissed and is not showing, and the rules list (not the setup screen) is on screen;
- the app is in the foreground;
- `snapshot.counts.lifetime` is above 0, which the extension writes;
- `UserDefaults` key `reviewRequestedVersion` differs from `CFBundleShortVersionString`.

The version is written just before `requestReview()` is called. No pre-prompt screen, and no call from a button. On iPhone the list is a pushed screen, so the request waits until someone opens it. `UserDefaults` is already declared in `Support/PrivacyInfo.xcprivacy` under CA92.1.

Debug builds take `-UndirectReviewNow`, which skips the lifetime test. The version guard still applies, so reinstall the app to see the sheet again. Release builds ignore the flag.

## Sources (fetched 2026-10-01)

- StoreKit `RequestReviewAction` and `AppStore.requestReview(in:)`, documentation JSON at developer.apple.com/tutorials/data/documentation/storekit/: available iOS 16, macOS 13 (the action; the scene overload has no macOS entry), so iOS 26.2+ and macOS 15+ are covered. The SwiftUI entry point is the `requestReview` environment value (iOS 16, macOS 13).
- Same pages: the system shows the request at most three times in 365 days for someone who has not reviewed on that device; for someone who has, only for a new app version after more than 365 days. App Store policy governs the display, so the call may do nothing. "Don't call it in response to a button tap or other user action." In development mode the sheet always appears; the call has no effect in apps distributed through TestFlight.
- Requesting App Store reviews (storekit/requesting-app-store-reviews): do not interrupt a task, do not ask right at launch, wait a few seconds on a completion screen, skip a version already asked for. People can turn the prompt off for every app.
- HIG, Ratings and reviews: ask only after engagement, never on first launch or in onboarding, prefer the system prompt, three a year, leave a week or two between requests.
- developer.apple.com/app-store/ratings-and-reviews: ask when satisfaction is likely, up to three times in 365 days.

## Verification

iOS 27 simulator, debug build, `-UndirectSeedSample -UndirectPane everywhere -UndirectReviewNow`: first launch showed "Enjoying Undirect?" about four seconds after the list appeared; a second launch of the same install showed nothing. A TestFlight build shows nothing by design, so the first real sheets come from App Store installs.
