# Listing images, both apps (ASG39)

Two directions drawn 2026-11-20 and shown to the owner at MacNative's card size beside Liqoria and PinSet:
A, brand poster (brand gradient, white headline, real UI large and bleeding off the edge) and
B, on the desktop (a brand-coloured wallpaper drawn in SVG, a menu bar or Safari toolbar, the real UI floated with a deep shadow).
The owner left the pick to this session ("go put what you want up to you"); B is the pick for both apps, all five frames.

Each page is 1440x900 CSS, rendered at device scale 2 (2880x1800) in headless Chrome:
`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=1440,900 --screenshot=out.png file://$PWD/B-cutling.html`

Assets the pages name, copied beside them before a render (not committed, each has a home):
- c-picker.png, c-history.png: Cutling/fastlane/screenshots_mac/raw/<locale>/01_Picker.png, 02_History.png
- c-icon.png: Cutling/fastlane/listing-icon.png (ictool render of Cutling/AppIcon.icon, macOS, 1024)
- u-popup.png: undirect/.shots/mac/assets/popup.png (854x1204; real popup over a Safari dark plate; B clips it to the toolbar pill and the popup)
- u-icon.png: undirect/Support/AppStore/listing-icon.png
- menubar-cutling.png: SF Symbol doc.on.clipboard, Cutling's MenuBarExtra icon, from `swift sym.swift doc.on.clipboard menubar-cutling.png`

ictool lives at ~/Repositories/_mac/Xcode/Xcode.app/Contents/Applications/Icon Composer.app/Contents/Executables/ictool
(/usr/bin/ictool is a different tool).
