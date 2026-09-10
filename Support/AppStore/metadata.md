# App Store Connect metadata

Paste each field. Counts are checked against Apple's limits.

## Name (8/30)

Undirect

## Subtitle (28/30)

Stop pages taking your click

## Keywords (86/100)

popup,redirect,blocker,extension,hijack,click,tab,ads,tracker,privacy,browser,popunder

## Promotional Text (165/170)

Some pages lay an invisible layer over themselves to catch the click you meant for something else. Undirect clears it, and lists everywhere a page tried to send you.

## Description (1236/4000)

Undirect stops a page taking your click.

Pop networks do not wait to be clicked. They lay a transparent layer over the page and take the next press. They build a link and click it themselves. They rewrite the link under your finger between the press and the release. They open a blank tab and rewrite the address of the one you were reading.

Undirect watches for those shapes and undoes them. The invisible layer goes before your press lands, so the click reaches what you aimed at. A link rewritten mid-click is put back, and you arrive where you meant to. A window opens only when the site's own code asks for it.

Everywhere a page tried to send you is listed, whether or not it was stopped. Each destination can be allowed or blocked, on that site alone or everywhere. A destination with no rule follows a default you set.

What is blocked everywhere becomes a content blocking rule, so the request never leaves your device.

PRIVATE BY BUILD
No account. No analytics. No server. Nothing leaves the device. The list of destinations lives in your browser, and the app reads it through a container on the same machine.

REQUIREMENTS
Undirect is a Safari extension. Switch it on in Safari, and allow it on the sites you want guarded.

## What's New (14/4000)

First release.

## Review Notes (1303)

Undirect is a Safari web extension. The app itself shows setup and the rules; the guarding happens in Safari.

TO ENABLE AND TEST

macOS
1. Launch Undirect. A welcome screen appears; press Open Safari Settings.
2. Safari Settings opens on Extensions. Tick Undirect and allow it on every website.
3. Return to Undirect. The window now lists rules instead of the setup screen.
4. Browse any ad-supported site. Clicking anywhere that opens an unrequested tab is stopped, and the destination appears in the Safari toolbar popup and in the app.

iOS and iPadOS
1. Launch Undirect, press Open Safari Settings.
2. Settings, then Apps, then Safari, then Extensions. Turn on Undirect and allow all websites.
3. Browse as above. The app shows the same list, read only, because iOS gives no way for a containing app to message its extension.

NOTES FOR REVIEW
No account, no sign-in, no demo credentials needed.
The app makes no network requests. The extension blocks requests using declarativeNetRequest and never sends data anywhere.
Broad website access is requested because the guard must observe a click before the page acts on it. Nothing about the page is stored or transmitted.
The rules list is empty until the extension reports something, which happens the first time a page attempts one of these tricks.

## Category

Primary: Utilities. The app is a browser extension companion.

## Age rating

No objectionable content. Answer no to every questionnaire item.

## App Privacy

Data Not Collected. Nothing is gathered, so no data types are declared. This matches
PrivacyInfo.xcprivacy, which declares no collected data and no tracking, and the one
required-reason API the app touches: UserDefaults under CA92.1, for remembering that
the welcome screen was shown.

## URLs

Support URL and Privacy Policy URL are both required and must resolve. Neither exists yet.
