# Safari pop-up and redirect blockers compared

Most ad pages that get past Safari today ride on a tap you made. Here are seven tools, what each one actually stops, and which to use for the problem you have.

Updated 21 November 2026 by Kenneth Fang, who makes Undirect

| Option | Best for | Price | How it works | Runs on |
|---|---|---|---|---|
| Undirect (ours) | Taps that land on ad pages, links that change under your finger, tabs you did not open | $1.99 once, one purchase for iPhone, iPad and Mac | Watches each tap and lets the page go only where you pressed | iPhone, iPad, Mac |
| 1Blocker | Ads, trackers and cookie notices | Free for one category; Premium $2.99 a month, $14.99 a year or $39.99 once | Filter lists of known ad and tracker addresses | iPhone, iPad, Mac, Vision Pro |
| AdGuard | Ads, including YouTube, and filtering beyond Safari | Free; Pro sold in the app | Filter lists, plus DNS filtering for other apps | iPhone, iPad; Mac through AdGuard Mini |
| Ghostery | Seeing who tracks you on each site | Free; optional contributions | Filter lists and tracker reports | iPhone, iPad, Mac |
| TabGuard | Tabs a script opens on its own | Free | Blocks new tabs and windows by mode | iPhone, iPad |
| Tab Blocker | A site where you never want a new tab | Free | One switch per site that stops all new tabs | iPhone, iPad |
| Safari's own settings | Windows a page opens with no tap at all | Free, built in | Blocks a window that was not opened by your tap | iPhone, iPad, Mac |

## Which one fits

- Your tap lands on an ad page, a tab opens behind the one you are reading, or a link takes you somewhere it did not say: Undirect. Of the seven listings, it is the only one that says it removes an invisible layer before your tap lands and puts back a link rewritten mid-tap.
- Banners, video ads, trackers or cookie notices are what bother you: a content blocker, 1Blocker, AdGuard or Ghostery.
- One site opens tabs you never want, and you are happy to lose its new-tab links too: Tab Blocker.

A content blocker and Undirect do different jobs, so most people who are tired of ad pages run one of each. Safari's own settings are free and worth switching on whatever else you use.

## Undirect

We make Undirect, a Safari extension for iPhone, iPad and Mac built for the ad pages that come in through your own tap. On a site where you switch it on, it removes an invisible layer before your tap lands, puts back a link rewritten between the press and the release, and lets a new tab open only where your press pointed. Sign-in windows still open, because a window that asks for a size and leads back to the page is let through.

If a redirect rides your tap, the tab is sent back and that address is blocked in Safari, so the next attempt never loads. The popup lists every address the page tried, blocked or not, and you can allow or block each one on that site or everywhere.

It costs $1.99 once: no subscription, no in-app purchase, and one purchase covers iPhone, iPad and Mac. It runs without an account, analytics or a server, and the [source code](https://github.com/kengomatsuo/undirect) is public. It runs on iOS 26.2 and macOS 15 or later, and it works beside whatever content blocker you already use.

[Download on the App Store](https://apps.apple.com/app/apple-store/id6810513194?pt=127609326&ct=llms&mt=8)

You can [try it on the demo sites](https://undirect.matsuokengo.com/demo/), made-up pages that misbehave on purpose.

## Why pay when blockers are free

The free tools here are good at what they target. Content blockers stop addresses that are on a list, and Safari stops windows a page opens with no tap. The pop networks we studied wait for a real press and spend it on their own tab, which is the one case neither of those checks ( [MDN: a window opened in response to user input is allowed](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)). Undirect is built for that case, it costs $1.99 once for every device you own, and you never pay again.

## 1Blocker

A well-made content blocker for iPhone, iPad, Mac and Vision Pro, around since 2015. It gives Safari filter lists for ads, more than 50,000 trackers, cookie notices and chat pop-ups, and Safari does the blocking. Free with one category on at a time; Premium is $2.99 a month, $14.99 a year or $39.99 once ( [App Store](https://apps.apple.com/us/app/1blocker-ad-blocker/id1365531024), [1blocker.com](https://1blocker.com/)).

Good for: clearing ads and trackers off every site. Its listing says "not all ads can be blocked", since some pages use techniques Safari content blockers cannot reach. A pop script missing from its lists can still spend your tap on an ad tab, and that is where Undirect comes in. [Undirect and 1Blocker side by side](https://undirect.matsuokengo.com/compare/#1blocker).

## AdGuard

A content blocker with more than 50 filter lists, and DNS filtering that reaches apps outside Safari. Its listing names banners, pop-ups, autoplay videos, YouTube ads and trackers. Safari blocking is free; Pro adds YouTube blocking, DNS protection and custom rules. On a Mac it is a separate app, [AdGuard Mini](https://apps.apple.com/us/app/adguard-ad-blocker-for-safari/id1440147259) ( [App Store](https://apps.apple.com/us/app/adguard-ad-blocker-for-safari/id1047223162), [adguard.com](https://adguard.com/en/adguard-ios/overview.html)).

Good for: ads everywhere, inside Safari and out. Like every filter-list blocker, it acts on addresses it knows, before the page runs; it does not look at where your tap was aimed. [Undirect and AdGuard side by side](https://undirect.matsuokengo.com/compare/#adguard).

## Ghostery

A free, open-source blocker for Safari on iPhone, iPad and Mac. Its listing says it blocks ads and pop-ups, YouTube and Facebook included, removes cookie consent pop-ups and shows which trackers each site runs ( [App Store](https://apps.apple.com/us/app/ghostery-adblocker-for-privacy/id6504861501)).

Good for: seeing and stopping trackers, at no cost. It needs iOS 18.7 or macOS 14.6, and like the other blockers here it works from filter lists rather than from where your tap was aimed.

## TabGuard

A free Safari extension for tabs, with three modes: Block All, Smart Mode, which its listing says allows your clicks and blocks tabs a script opens, and Allow All ( [App Store](https://apps.apple.com/us/app/tabguard/id6756740309)).

Good for: scripts that open tabs on their own. Smart Mode lets a tab through when your click opened it, and a tab opened with your click is exactly what pop networks wait for. It reached version 1.0 in December 2025.

## Tab Blocker

A free extension that stops a site opening new tabs once you switch it on there, and does nothing elsewhere ( [App Store](https://apps.apple.com/us/app/tab-blocker/id6759275389)).

Good for: a site where you never want a new tab. It stops every new tab on that site, the links you meant to open in one included.

## Safari's own settings

Block Pop-ups on iPhone and iPad (Settings, Apps, Safari) and Pop-up Windows on a Mac (Safari, Settings, Websites) stop windows a page opens without your tap, and Fraudulent Website Warning flags known fraudulent sites. Turn them on; they cost nothing. A window opened on your tap counts as one you asked for, which is how most ad pages get past them: [why Safari still opens ads with Block Pop-ups on](https://undirect.matsuokengo.com/safari-popups-still-open/).

## A name you may see that is not a blocker

RedirectWeb comes up in searches for a Safari redirect blocker. Its listing describes a URL router that sends links where your rules say, for example Google Maps links to Apple Maps ( [App Store](https://apps.apple.com/us/app/redirectweb-smart-url-router/id1571283503)).

## Stop the ad pages that ride your taps

Undirect costs $1.99 once for iPhone, iPad and Mac, and runs beside the blocker you already have.

[Download on the App Store](https://apps.apple.com/app/apple-store/id6810513194?pt=127609326&ct=llms&mt=8)

Sources: each app's own App Store listing and website, and Apple's support pages, read 20 November 2026. Prices are US App Store prices, which differ by country and change.
