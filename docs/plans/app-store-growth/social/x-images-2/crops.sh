#!/bin/bash
# Cuts the X pictures that are single real captures out of their screens and pages, and blurs third parties'
# names, logos and addresses so a picture shows the pattern, not who did it (owner, 2026-11-23).
# The iPhone screens come from sim/job-rest2.sh (src/sim/rest-*.png); the Apple pages from capture.ts:
#   bun capture.ts apple-omw-page https://support.apple.com/guide/iphone/use-shorthand-for-frequently-used-text-iph6d01d862/ios --full
#   bun capture.ts apple-keyboards-page https://support.apple.com/guide/iphone/add-or-change-keyboards-iph73b71eb/ios --full
#   bun capture.ts apple-pastecontrol https://developer.apple.com/documentation/uikit/uipastecontrol --wait 8000 --full
# Offsets were read off the 2026-11-23 captures (1320 x 2868 iPhone screens, 1170-wide pages); a fresh capture
# can move them, so look at each result.
set -e
cd "$(dirname "$0")"
S=src/sim
blur() { magick "$1" \( +clone -crop "$2" +repage -blur 0x"${3:-14}" \) -geometry "+${2#*+}" -composite "$1"; }

# x03: Safari's tab overview, its bottom part; every page and title blurred, the tab bar sharp
magick $S/rest-0-tabs.png -crop 1320x1650+0+1218 +repage x03.png
blur x03.png 1320x1378+0+0 18
# x13: the menu from holding Safari's address bar; the site's address blurred
magick $S/rest-1-address-menu.png -crop 1320x1632+0+1236 +repage x13.png
blur x13.png 459x84+427+1354
# x07: Safari's Back list on Undirect's own demo page
magick $S/rest-7-back-list.png -crop 1320x1650+0+1180 +repage x07.png
# x32: a newspaper's cookie banner; the paper's name (twice) and its address blurred
magick $S/rest-5-article.png -crop 1320x1512+0+1356 +repage x32.png
blur x32.png 204x71+439+133
blur x32.png 204x65+624+381
blur x32.png 447x76+427+1305
# x08, x20, x15: Apple's own pages
magick src/apple-omw-page.png -crop 1170x1450+0+2540 +repage x08.png
magick src/apple-keyboards-page.png -crop 1170x1920+0+5340 +repage -background white -gravity center -extent 1536x1920 x20.png
magick src/apple-pastecontrol.png -crop 1170x1210+0+1630 +repage x15.png
