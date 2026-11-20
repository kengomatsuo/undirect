---
title: How a web page steals your tap in Safari, and how my extension takes it back
published: true
tags: safari, javascript, webextensions, privacy
canonical_url:
---

I make [Undirect](https://undirect.matsuokengo.com/), a Safari extension for Mac, iPhone and iPad that stops pages from taking your click somewhere you didn't ask to go. It's open source ([GitHub](https://github.com/kengomatsuo/undirect)), and most of what I learned building it came from reading the ad scripts themselves. This post is about what those scripts do and why the obvious fix doesn't work.

## Patching `window.open` stops almost nothing

The first thing everyone tries is wrapping `window.open`. One streaming site I studied had already tried it on its own pages, and its own source comments said the ads kept firing anyway. When I pulled the 70 KB ad tag it loads (FingerprintJS bundled inside), the serving methods were named right in the code: `POP_UP`, `POP_UNDER`, `NEW_TAB_FOCUS`, `NEW_TAB_REPLACE`, `POP_IN_PAGE`, and a back-button redirect behind a feature flag.

The tag takes a click in four ways, and only one of them looks like a popup:

- **A transparent form** with `target="_blank"`, fixed at 100% by 100%, holding a submit input. Your click lands on the submit button, which opens a new tab with no JavaScript call to hook.
- **An overlay at z-index 2147483647** that reads `elementFromPoint` to learn what is underneath, takes the press, then hides itself.
- **An anchor with `target="_blank"`** that the script clicks from its own handler. `window.open` is never called.
- **`about:blank`, then a rewrite of `window.top`'s URL.** This is the redirect you actually see: the page you were reading turns into a different site.

`window.location` can't be replaced by any script, so the last one is invisible to anything running in the page. You can't wrap your way out of it.

## Split the job: detect in the page, block at the network

A content script can't cancel a top-level navigation that another script started. So Undirect splits the work. The JavaScript half watches for these patterns and names the host the page tried to reach. The background page turns that host into a `declarativeNetRequest` rule, so the second attempt dies at the request and never loads.

Navigations go through the background page's `onBeforeNavigate`, judged before the commit, so a chain of server redirects answers for the address you asked for and not wherever it ended up.

## What separates a theft from a normal trip off-site: the press

These networks wait for a real `pointerdown` or `keydown` and ride it. So the rule is simple to state: a cross-site navigation right after a press you aimed somewhere else is the press being taken. A cross-site navigation with no press behind it is you typing an address, opening a bookmark or going back, and it's left alone.

The content script reports every trusted press along with wherever the thing under your finger honestly leads. The order of the decision is: same site is always fine, then a rule you set, then no press means it was your own doing, then the press pointing at that destination, then the default.

Two details cost me a while:

1. **The press has to be written down synchronously.** Safari unloads the background page, and my first version awaited a storage restore before recording the press. On wake-up the press landed after the navigation it was meant to explain, so the theft was judged as if nobody had pressed anything. Now it lives in a plain map written without awaiting anything.
2. **iOS Safari leaves `openerTabId` off pop tabs.** So a tab created within a second of a press in another tab is treated as that tab's doing; where the press pointed still lets a real link through.

## A window size used to mean "this is a sign-in"

A sign-in flow opens a window at a size (`width=500,height=620`), and a pop-under wants a full tab, so for a while a features string with a size was my signal that the page meant it. Then a site asked for `width=800,height=600` and called `focus()` on the window every 300 ms until it had it. Now a size counts only when the address also names a way back to the page, which Google's popup sign-in does through `redirect_uri` and share sheets do by carrying the page's own address.

The same site laid an empty `div` over the whole page at `opacity:0.01`, `z-index:999999`, with an `onclick` that opens the pop, and put it back every two seconds. A click-outside backdrop is see-through by its background and sits under its modal; an empty layer hidden by its own opacity has no reason to exist except to be pressed unseen, so Undirect removes it on sight.

## Showing what the block stopped

A network rule kills the request before the page sees anything, so the extension can't witness its own best outcome, and an empty popup reads exactly like nothing happened. `declarativeNetRequest.getMatchedRules()` (Safari 15.4 and later, with the `declarativeNetRequestFeedback` permission) says which rules matched in a tab, so every address a page tried to reach shows up in the toolbar popup, blocked or not. You can allow or block each one on that site or everywhere.

The guard stays off on a site until you press its toolbar button there, there's no account or server, and there's a [page of deliberately broken demo sites](https://undirect.matsuokengo.com/demo/) to try it on. It's $1.99 once on the App Store for Mac, iPhone and iPad.

If you've seen a hijack it misses, the issue tracker on GitHub is the place. I read every script that gets reported.
