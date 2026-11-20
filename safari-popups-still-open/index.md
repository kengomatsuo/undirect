# Block Pop-ups is on, and Safari still opens ad pages

The switch is working. The ad pages that get past it come in by other routes, and most of them ride on a tap you made yourself.

Updated 20 November 2026 by Kenneth Fang, who makes Undirect

## Why Block Pop-ups lets them through

Safari's pop-up blocker, like the one in every current browser, stops a window that a page opens on its own. A window opened in direct response to your tap is allowed, because an ordinary link that opens in a new tab works the same way. Mozilla's reference for web developers puts the rule plainly: pop-up windows "must be opened in direct response to user input" ( [MDN, Window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)).

Ad scripts are written around that rule. We took one pop network's script apart in September 2026, and it did nothing until a real press landed somewhere on the page. Then it spent that press on its own tab, and Safari saw a tab you had asked for.

So the ad pages that reach you with the switch on arrive in one of these ways:

- A tab opened with your tap. The page lays a transparent layer over itself, or listens for any press at all, and opens the ad as if you had clicked a link to it.
- A redirect. The page sends the tab you are reading to another address, which is a trip to a new page and no pop-up at all.
- A swapped link. A link changes its address between the moment your finger lands and the moment it lifts.
- A pop-under. A new tab opens behind the one you are reading, and you find it only when you close the page in front.

## What each Safari setting covers

Every setting here is free and worth turning on. None of them checks what your tap was aimed at, which is the gap the ad pages above use.

| Setting | Where it is | What it stops | What still gets past |
|---|---|---|---|
| Block Pop-ups | iPhone and iPad: Settings, Apps, Safari | A window a page opens without a tap | A tab opened on your tap, a redirect, a swapped link |
| Pop-up Windows | Mac: Safari, Settings, Websites, at the bottom of the list | The same, set per website: Allow, Block, or Block and Notify | The same. Apple adds that blocking pop-ups "might also block some content you want to see" |
| Fraudulent Website Warning | iPhone and iPad: Settings, Apps, Safari. Mac: Safari, Settings, Security | Warns you when you visit a fraudulent website | It warns about a page; it does not stop a tab opening |
| Hide Distracting Items | iPhone: the page menu at the left of the address bar | Menus and other parts of a page that you pick, one by one | Anything you have not picked on that page |
| Extensions | iPhone and iPad: Settings, Apps, Safari, Extensions. Mac: Safari, Settings, Extensions | An extension you do not recognise, once you turn it off | Nothing on its own: it is a list to check |

Sources: [Block pop-ups in Safari on iPhone](https://support.apple.com/guide/iphone/block-pop-ups-ipha49a83ae8/ios), [Allow or block pop-ups in Safari on Mac](https://support.apple.com/guide/safari/block-pop-ups-sfri40696/mac), [Block pop-up ads and windows in Safari](https://support.apple.com/en-us/102524), [Hide distractions when browsing](https://support.apple.com/guide/iphone/hide-distractions-when-browsing-iph7778f2888/ios) and [Get extensions](https://support.apple.com/guide/iphone/get-extensions-iphab0432bf6/ios), all Apple, read 20 November 2026.

## If pop-ups keep coming on a Mac

Apple's Mac guide says that if you block pop-ups on a site and still see them there, you may have unwanted software on the Mac. The steps in Apple's article:

- Update macOS, or restart the Mac if it is already up to date. macOS removes known malware when it restarts.
- Look in the Applications folder for apps you do not remember installing, and delete them.
- In Safari, open Settings, then Extensions, and turn off or remove any extension you do not need.
- To stop Safari reopening last session's windows and tabs, quit it, then hold Shift while you open it again.

Pop-ups on the Lock Screen or in Notification Center are something else: they are notifications from a website you once clicked Allow on. Apple's [article on pop-ups](https://support.apple.com/en-us/102524) links to the steps for managing them on a Mac.

## How to close one safely

Apple warns that some pop-up ads draw a fake close button. If you are not sure, leave the ad alone and close the tab, or type a new address in the search field and go somewhere else. On iPhone, tap the top of the screen if the search field has gone.

## What stops the rest

A content blocker such as 1Blocker, AdGuard or Ghostery stops known ad and tracker addresses from loading. When the pop network's script is on its list, the script never runs and never gets your tap. 1Blocker's own App Store listing states the limit: "not all ads can be blocked", because some sites use techniques Safari content blockers cannot reach.

Undirect watches the tap. On a site where you switch it on, it removes an invisible layer before your tap lands, puts back a link that changed while you pressed, and lets a new tab open only where your press pointed. If a redirect rides your tap, the tab is sent back and that address is blocked in Safari, so the next try never loads. The list in its popup shows every address the page tried, blocked or not. It costs $1.99 once, with no subscription, and needs iOS 26.2 or macOS 15 or later. It does not block ads or trackers, so it sits beside a content blocker instead of replacing one.

[Download on the App Store](https://apps.apple.com/app/apple-store/id6810513194?pt=127609326&ct=llms&mt=8)

Compare [seven pop-up and redirect blockers with prices](https://undirect.matsuokengo.com/safari-popup-blockers/), or [try Undirect on the demo sites](https://undirect.matsuokengo.com/demo/), made-up pages that misbehave on purpose.
