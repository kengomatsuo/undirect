# Undirect vs 1Blocker vs AdGuard

1Blocker and AdGuard stop ads they know about. Undirect stops the page that takes your tap: the layer you cannot see, the link that changes under your finger, the tab you did not open.

Updated 21 November 2026 by Kenneth Fang, who makes Undirect

| Feature | Undirect | [1Blocker](https://apps.apple.com/us/app/1blocker-ad-blocker/id1365531024) | [AdGuard](https://apps.apple.com/us/app/adguard-ad-blocker-for-safari/id1047223162) | Safari Block Pop-ups |
|---|---|---|---|---|
| Stops ad tabs opened with your tap | Yes: a new tab opens only where you pressed | Its listing does not say so | Its listing does not say so | No: a window opened on your tap is allowed |
| Removes invisible layers that catch taps | Yes, before your tap lands | Not listed | Not listed | No |
| Puts back a link rewritten mid-tap | Yes | Not listed | Not listed | No |
| Blocks ads, banners and trackers | Not its job: run it beside 1Blocker or AdGuard | Yes, by filter list | Yes, by filter list | No |
| Shows what a page tried | Every address a page tried to open, blocked or not | Its site says the Mac app shows how many companies tried to track you | Statistics of blocked ads and trackers | Block and Notify on Mac shows a blocked pop-up |
| You decide per site | Allow or block each address, on one site or everywhere | Allowlist a site | Allowlists, blocklists, your own rules | Per website on Mac |
| Works on iPhone, iPad and Mac | Yes | Yes, plus Vision Pro | iPhone and iPad; Mac through AdGuard Mini | Yes |
| No account needed | Yes; no analytics, no server, source public | Yes | Yes; open source | Part of Safari |
| Price | $1.99, paid once, every device | Free for one category; Premium $2.99 a month, $14.99 a year or $39.99 once | Free; Pro sold in the app | Free |

## Two different jobs

A content blocker hands Safari a list of ad and tracker addresses before a page loads, and Safari refuses them. That clears banners and trackers well, and it is why 1Blocker and AdGuard are worth having. It cannot see what a page does with your tap, and pop networks are built around that: the script we took apart in September 2026 did nothing until a real press landed, then spent the press on its own tab. 1Blocker's own listing says "not all ads can be blocked" with Safari's content blocking.

Undirect runs in the page and acts at the moment you press. It removes the layer that would catch the tap, puts back a link that changed while you pressed, and lets a new tab open only where your press pointed. If a redirect rides your tap, the tab is sent back and the address is blocked in Safari, so the next try never loads.

## Undirect and 1Blocker

1Blocker is a polished content blocker for every Apple device, free with one category on at a time and $14.99 a year or $39.99 once for Premium. Keep it for ads and trackers. Add Undirect for the pages that still send you somewhere you did not choose: the two never touch the same thing, so they do not get in each other's way.

## Undirect and AdGuard

AdGuard is free for Safari ad blocking, with Pro sold in the app, and its DNS filtering reaches apps outside Safari. If you already run it and pages still open where you did not tap, that is the part Undirect covers. Undirect's popup lists every address the page tried, so you can see exactly what it stopped and allow anything you want.

## Paid once, for every device

Undirect costs $1.99 once. No subscription and no in-app purchase, and one purchase covers iPhone, iPad and Mac. It runs without an account, analytics or a server, and its [source code](https://github.com/kengomatsuo/undirect) is public. It is off on a site until you press its toolbar button there, so it only acts where you asked it to.

[Download on the App Store](https://apps.apple.com/app/apple-store/id6810513194?pt=127609326&ct=llms&mt=8)

See all seven tools on [Safari pop-up and redirect blockers compared](https://undirect.matsuokengo.com/safari-popup-blockers/), read [how to stop Safari redirects on iPhone](https://undirect.matsuokengo.com/stop-safari-redirects/), or [try Undirect on the demo sites](https://undirect.matsuokengo.com/demo/).

## Sources

[Apple: Block pop-ups in Safari on iPhone](https://support.apple.com/guide/iphone/block-pop-ups-ipha49a83ae8/ios); [Apple: Allow or block pop-ups in Safari on Mac](https://support.apple.com/guide/safari/block-pop-ups-sfri40696/mac); [MDN: Window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open); [1Blocker on the App Store](https://apps.apple.com/us/app/1blocker-ad-blocker/id1365531024) and [1blocker.com](https://1blocker.com/); [AdGuard Ad Blocker for Safari on the App Store](https://apps.apple.com/us/app/adguard-ad-blocker-for-safari/id1047223162); Undirect's own App Store page. First read 7 November 2026, read again 20 November 2026. Prices are US App Store prices, which differ by country and change.
