# How to stop Safari opening new tabs by itself

On iPhone, iPad and Mac. The fix depends on what is opening the tabs, and when they appear tells you that.

Updated 20 November 2026 by Kenneth Fang, who makes Undirect

## What is opening the tabs

- A tab that appears right after you tap something on a page, often behind the page you are reading, was opened by the page. When it hides behind, it is called a pop-under.
- Tabs that open with no tap at all, or on every site you visit, point to an extension or, on a Mac, to unwanted software.
- Old tabs that come back when Safari starts are Safari restoring your last session.

## On iPhone and iPad

Open Settings, tap Apps, then Safari, and turn on Block Pop-ups. That stops a page opening a window without a tap.

In the same screen, tap Extensions and read the list. Apple's guide asks you to check the extensions you have installed and make sure you know what they do, so turn off any you do not recognise. To turn one off for a single site, tap the page menu at the left of the address bar in Safari, then Manage Extensions.

Open Links, also under Settings, Apps, Safari, decides what happens to a link you open in a new tab. Apple describes In Background as the way to stay on the current page when you do that. It is a choice about your own links and blocks nothing. Sources: [Block pop-ups](https://support.apple.com/guide/iphone/block-pop-ups-ipha49a83ae8/ios), [Get extensions](https://support.apple.com/guide/iphone/get-extensions-iphab0432bf6/ios) and [Open and close tabs](https://support.apple.com/guide/iphone/open-and-close-tabs-iph489b9313f/ios), Apple's iPhone User Guide.

## On a Mac

In Safari, choose Safari, then Settings, then Websites, and click Pop-up Windows at the bottom of the list on the left. Set "When visiting other websites" to Block, or to Block and Notify if you would like to see what was stopped and open it yourself. A site listed under Configured Websites keeps its own setting.

The Tabs pane has two settings that change where a new tab shows up without stopping it. "Open pages in tabs instead of windows" chooses between a tab and a window. "When a new tab or window opens, make it active" brings the new one to the front; with it off, the new tab stays behind the page you are reading.

If tabs open on their own with no tap, check the Extensions pane in Safari's settings and the Applications folder for anything you did not install, and update macOS, which removes known malware when it restarts. To open Safari without last session's tabs, quit it and hold Shift while you open it again. Sources: [Allow or block pop-ups](https://support.apple.com/guide/safari/block-pop-ups-sfri40696/mac), [Change Tabs settings](https://support.apple.com/guide/safari/tabs-ibrw1045/mac) and [Block pop-up ads and windows in Safari](https://support.apple.com/en-us/102524), Apple, read 20 November 2026.

## Tabs a page opens when you tap

No setting above stops this one. Browsers allow a window opened in direct response to your tap ( [MDN, Window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)), since a link that opens in a new tab works the same way. A page that waits for your tap can open its ad tab, and Block Pop-ups lets it through.

It takes a Safari extension. Three are built around tabs:

- [Tab Blocker](https://apps.apple.com/us/app/tab-blocker/id6759275389) is free and does nothing until you switch it on for a site; from then on it stops that site opening new tabs. iOS 16 or later.
- [TabGuard](https://apps.apple.com/us/app/tabguard/id6756740309) is free and has three modes: Block All, Smart Mode, which its listing says allows your clicks and blocks scripts, and Allow All. iOS 17 or later.
- Undirect lets a new tab open only where your press pointed, so a tab aimed at an ad is stopped even when your own tap set it off. It also removes the invisible layers that catch taps, sends back a redirect that rides one, and lists every address the page tried. It costs $1.99 once and needs iOS 26.2 or macOS 15 or later.

Tab Blocker and TabGuard cost nothing and run on older iPhones, so if a couple of sites bother you, try one of them first. Undirect is for the tab that comes from a tap you meant for something else, on a site where you still want ordinary links and sign-in windows to work.

[Download on the App Store](https://apps.apple.com/app/apple-store/id6810513194?pt=127609326&ct=llms&mt=8)

All seven options, with prices, are on [Safari pop-up and redirect blockers compared](https://undirect.matsuokengo.com/safari-popup-blockers/). You can also [try Undirect on the demo sites](https://undirect.matsuokengo.com/demo/) before you buy.
