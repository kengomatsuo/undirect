# Getting Undirect onto App Store Connect

What is done, what needs an Apple account, and one judgement call.

## Done in the repo

- `ITSAppUsesNonExemptEncryption` is `false` on both app targets. The app uses no
  encryption of its own, and Apple's guidance sets the key to NO when a build
  only relies on what the system provides. Without the key, App Store Connect
  runs the export questionnaire on every upload.
- `PrivacyInfo.xcprivacy` declares no collection, no tracking, and the one
  required-reason API the app touches: `UserDefaults` under `CA92.1`, which backs
  the flag remembering the welcome screen was shown.
- App icon is a square, unmasked 1024 in the asset catalog, plus the macOS sizes.
- Nine screenshots, three per platform, at sizes Apple accepts: iPhone 6.9"
  1320x2868, iPad 13" 2064x2752, Mac 2880x1800. All sRGB with no alpha, and each
  is around 190 KB against an 8 MB ceiling.
- Store copy, review notes and the App Privacy answers are written in
  `Support/AppStore/metadata.md`, each field counted against its limit.
- Release configuration builds on both platforms.

## Done on the account (checked 2026-09-17)

- Xcode is signed in to team `PM3K35YS39`: provisioning profiles exist for
  `com.matsuokengo.undirect` and `com.matsuokengo.undirect.Extension`, iOS and
  Mac, store and development.
- The iOS app group `group.com.matsuokengo.undirect` is registered; both iOS
  profiles carry it.
- Support and privacy pages resolve: `undirect.matsuokengo.com/support/` and
  `/privacy/` both return 200.

## Still needs the Account Holder

1. **Accept the updated Apple Developer Program License Agreement** in App Store
   Connect. Nothing new can be submitted until it is accepted.
2. **Create the App Store Connect record**: name Undirect, primary language
   English, bundle ID `com.matsuokengo.undirect`, iOS and macOS. The name is
   checked for uniqueness at that moment.
3. **Upload the builds and fill the listing** from `Support/AppStore/metadata.md`.
   This needs a signed-in App Store Connect session or an API key for this app.

## The judgement call, settled

The per-site recipe naming lunarx.to was dropped (2026-09-10) and the shipped
block list, which named a host lunarx.to loads, was deleted (2026-09-17). The
bundle names no site.

## Two things found by opening the account

The team is `PM3K35YS39`. The macOS app group had been prefixed `5MPWBL8F42`,
which is the user identifier printed on the Apple Development certificate rather
than the Team ID. Ad-hoc signing validates neither, so it resolved locally and
would have failed the moment the build was signed for real. Corrected, and the
container resolves under the new prefix.

The Apple Developer Program License Agreement has been updated, and App Store
Connect states that the Account Holder must accept it before any new app can be
submitted. Nobody else can accept it.
