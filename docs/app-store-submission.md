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
- Screenshots from real Safari on the demo page (`undirect.matsuokengo.com/demo/`):
  three iPhone 6.9" 1320x2868, three iPad 13" 2064x2752, two Mac 2880x1800,
  framed from `.shots/` (untracked) and checked by the hypershots validator.
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

## Submitted (2026-09-18)

iOS 1.0 and macOS 1.0, both build 3, are Waiting for Review. Screenshots were
replaced with the demo-page set, and the review notes describe the press-to-turn-on
flow. App Review can reproduce every stop at `undirect.matsuokengo.com/demo/`.

## macOS rejected, 2.1(a) (2026-09-21)

The reviewer found the toolbar button "greyed out and unresponsive". Safari
greys every extension's button on the Start Page, and build 3 set no popup
there: a tab with no site was painted popup-less, so the press went to
`onClicked`, which returns when there is no site. Reproduced on the TestFlight
build. Build 4 sets `default_popup` in the manifest and keeps the popup on a
tab with no site, where it says the button works on websites; the popup is
cleared only on a real site that is off, so one press still turns it on.
Build 4 was checked on the Start Page through TestFlight and resubmitted the
same day, with the review notes' step 4 rewritten to match.

iOS build 3 was left in review. On the iOS Simulator (2026-09-21) Safari's Start
Page shows no page-menu button and the address field opens only the keyboard,
so no press reaches the extension on a tab without a site.

Two leads were ruled out first. Signing: the exported extension carries no
provisioning profile, but neither do the Mac App Store Safari extensions from
Fonts Ninja and Mendeley. Website access: with every site set to Ask, the press
brings up Safari's permission prompt as it should.

## iOS rejected, 2.1 Information Needed (2026-09-21)

The reviewer, on an iPad Pro 11-inch, stopped at the setup screen and asked for
a demo video. Their screenshot showed why: the button said Open Safari Settings
and called `UIApplication.openSettingsURLString`, which opens the app's own
page in Settings, nowhere near Safari's Extensions pane.

Build 5 calls `SFSafariSettings.openExtensionsSettings(forIdentifiers:)`, which
the SDK header says opens that extension's page, and drops the old path. That
call and the state read both arrived in iOS 26.2, so the minimum is now 26.2.
The setup screen and the welcome sheet share one button, bottom-anchored and
`.glassProminent`. In the iOS 27 Simulator the call reports no error and still
opens Settings at its top level, on both iPhone and iPad; nobody has pressed it
on a physical device yet. Resubmitted without the video on 2026-09-22.

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
