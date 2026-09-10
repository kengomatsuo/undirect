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

## Blocked without the Apple account

None of these can be done from here.

1. **Sign in to an Xcode account for team `5MPWBL8F42`.** Automatic signing fails
   without it, so nothing can be archived or uploaded. Xcode, Settings, Accounts.
2. **Register the bundle identifiers**: `com.matsuokengo.undirect` and
   `com.matsuokengo.undirect.Extension`.
3. **Register the iOS app group** `group.com.matsuokengo.undirect` and enable the
   App Groups capability on both iOS identifiers. macOS uses the team-prefixed
   form, which needs no registration; iOS accepts only the registered form, so
   the app and its extension cannot share data on a device until this is done.
4. **Create the App Store Connect record.** The name is checked for global
   uniqueness at that moment, and "Undirect" cannot be verified from here.
5. **Host a Support URL and a Privacy Policy URL.** Both are required and must
   resolve. Neither exists. The privacy policy has to match what the app does,
   which is collect nothing.

## The judgement call

`Extension/Resources/sites/recipes.js` ships a rule naming `lunarx.to`, and the
static blocklist names a host that site loads. lunarx.to distributes anime and
manga without licence.

The rule itself only sets that site's own advertising opt-out, and the app does
nothing to help anyone reach the site. A reviewer reading the bundle will still
find a named piece of special handling for a piracy site, and App Review has
latitude here.

The safe version drops the per-site recipe and keeps the generic guard, which
already stops the same pops without naming anyone. That costs one site its
cleanest path and removes the argument entirely.
