# How the click gets taken

## What lunarx.to serves now

Checked again on 2026-09-14, and the account below it has been overtaken. The
site is a Next.js app; `/px/q`, the CloudFront tag and the `lunar_ads_optout`
opt-out are all gone from what it serves, so the recipe that honoured the
opt-out would do nothing today.

What the homepage loads instead:

| Address | What it is |
| --- | --- |
| `api.lunarx.to/api/ads/state` | the gate, moved onto a subdomain of the site |
| `llvpn.com/tag.min.js` | the loader |
| `luugy.com/5/<id>/?...&dmn=llvpn.com&js_build=iclick-v1.1906.0` | the network behind it |
| `api.lunarx.to/api/extension-blacklist` | a list of extensions the site looks for |

The gate being on `api.lunarx.to` matters: that is the same site as the page, so
the caller check in `content/bridge.js` reads it as the page's own code and
vouches for what it asks for. None of the twenty-six script chunks the page
loads carries the pop code, so the network arrives at runtime.

Three taps on "Enter Lunar" were taken on 2026-09-14 while the guard was
running: a new tab to `ay267.com`, then same-tab trips to `pgb40.top` and
`spf.shopee.co.id`, and later `refpa61797.com`. Two of the four were plain
same-tab navigations, which nothing in the page-world half can see. That is
what the section below on judging a navigation is for.

## The site arms it, as it did on 2026-09-08

Every page lunarx.to serves carries an inline script that waits for a real
`pointerdown` or `keydown`, sits out a cooldown the server sets, then POSTs
`/px/q`. If the reply says yes, the script appends a tag from
`d2pf0ys5xus6n.cloudfront.net/?syfpd=1573224` to the head.

The script excludes its own reader and player routes: `/watch/`, `/embed/`,
`/manga/x/y`, `/novel/x/y`, `/anime/x/y/z`, `/rooms`. So the tag loads while you
browse and keeps its hooks after a client-side navigation into a route that was
supposed to be clean. The site's own comments say this is why ads kept firing
there, and that patching `window.open` did not stop it.

The same gate honours an opt-out: cookie `lunar_ads_optout=true`, or the same
key in `localStorage`. With either set, `/px/q` is never called and the tag never
loads. Undirect writes both, in `Extension/Resources/sites/recipes.js`.

## What the tag does

70 KB, with FingerprintJS bundled in. Its serving methods are named in the
source: `POP_UP`, `POP_UNDER`, `NEW_TAB_FOCUS`, `NEW_TAB_REPLACE`, `POP_IN_PAGE`,
several ad-block fallbacks, and a back-button redirect behind a
`REDIRECT_ON_BACK_BUTTON` feature flag.

Four ways it takes a click, all read out of the source:

| Name in the source | What it builds |
| --- | --- |
| `applyMultiple` | a transparent `form` with `target="_blank"`, fixed, 100% by 100%, z-index 1000, holding a submit input. Your click lands on the submit. |
| `getOverlayStyleString` | a fixed overlay at z-index 2147483647. It reads `elementFromPoint` to learn what is underneath, then hides itself. |
| `generateTargetedAnchor` | an `a` with `target="_blank"`, clicked from its own handler. `window.open` is never called. |
| `NewTabReplaceServingMethod` | opens `about:blank`, then rewrites `window.top`'s URL. This is the redirect you see. |

Events it hooks: `click`, `mouseup`, `mousemove`, `mouseout`, `touchstart`,
`touchend`, `popstate`, `beforeunload`, `focus`, `message`.

## What follows for the guard

A content script cannot cancel a top-level navigation another script started.
So the JavaScript half detects and names the host, and the background page turns
that host into a block rule. The second attempt dies at the request. See
`Extension/Resources/background.js`.

The one case that only reports is the back-button redirect. It arms the sweeper
and nothing more.

# Judging a navigation

Added 2026-09-14, after lunarx.to took a tap three times with the guard on.

`window.location` is unforgeable: no script can replace it, so `location.href =
somewhere` is invisible to the page-world half, and hooking `window.open` does
nothing about it. The navigation itself, though, is visible to the background
page, which is where this is decided. `lib/navigation.js` holds the judgement
and nothing else, so it can be tested without a browser.

**What separates a theft from an ordinary trip off-site is the press.** These
networks wait for a real press and ride it. So a cross-site navigation in the
moment after a press the user aimed somewhere else is the press being taken,
while a cross-site navigation with no press behind it is the user typing an
address, opening a bookmark or going back, and is left alone. `guard.js` reports
every trusted press along with wherever the thing under it honestly leads.

The order, which follows `UndirectSite.decide()`: the same site is always fine,
then a rule the user set, then no press means the user's own doing, then the
press pointing at that destination, then the default policy.

Judging happens at `onBeforeNavigate` rather than at the commit, so a chain of
server redirects answers for the address the user asked for and not for wherever
it ended up. A page that is caught is recorded, its base domain is blocked, and
the tab is sent back with `tabs.goBack`. Three undos per tab in ten seconds is
the ceiling: past that the block rule is doing the work and a tab that keeps
going is a loop, not a theft worth chasing.

A tab the page opened is judged the same way against the tab that opened it,
keyed by `openerTabId`, because Safari has no
`webNavigation.onCreatedNavigationTarget`. iOS Safari leaves `openerTabId` out
of a pop tab (seen on lunarx.to, 2026-09-17), so a tab created within a second
of a press in another tab is taken to be that tab's doing; where the press
pointed still lets a real link through. A tab created with no press behind it
never reaches the judgement.

"Carries a way back here" is not asked of a new tab. The lunarx.to pops name
the page they came from in their own address, and a real sign-in in a new
window asks for it at a size.

None of this runs at all on a site nobody turned the guard on for (added
2026-09-16, see "What the guard runs on" in
[docs/rules-and-record.md](rules-and-record.md)) - `guarding(state, site)` gates
`announced`, `arrived` and `judgeOpened` before any of the above is reached.

## Being the page's own code buys nothing

The page-world half lets a site's own code open a cross-site window, on the
reasoning that the page asking for something is different from a stranger
asking. That reasoning does not survive contact with a site that wants the pop.
lunarx.to serves its ad gate from `api.lunarx.to`, a subdomain of itself, so the
caller check reads the pop network as the page and vouches for whatever it asks
for. The site is the one being paid; of course its own code delivers the ad.

So a tab is judged on the press, whoever asked for it. One thing still counts as
the page vouching: **a window asked for at a size**.

```js
window.open(url, "_blank", "width=500,height=620")  // a sign-in or a share sheet
window.open(url)                                    // a bare tab, which is the pop
```

A sign-in flow needs a window the reader works in and says so in the features
string. A pop-under wants a full tab behind what the reader is looking at, and a
small window in front of them is no use to it. `content/bridge.js` reads the
features and the report carries `sized`, which is the only thing that puts a
destination in a tab's allowed set. A network could start passing `width` to get
past this; it would then be opening a visible window instead of a hidden tab,
which costs it the trick rather than restoring it.

## Telling the user what the network layer stopped

A `declarativeNetRequest` rule kills the request before the page sees anything,
and nothing calls back into JavaScript, so the guard cannot witness its own best
outcome. The popup listed nothing, which read exactly like nothing having
happened — the worst possible feedback for a block that worked.
`declarativeNetRequest.getMatchedRules()` (Safari 15.4, mirrored to iOS, with
the `declarativeNetRequestFeedback` permission) answers which rules matched in a
tab. Every rule is a learned one, so `ruleIds` in storage maps its id back to a
host; on Safari, which leaves the rule out, the request URL's host is kept when
`ruleIds` names it. Rows from this path are marked `network-rule` and learn
nothing, since the destination is already blocked.

This path is exempt from "what the guard runs on" and reports on every site,
watched or not - the same silent-stop argument above applies whether or not
the site was ever pointed the guard at, and it teaches nothing new either way.

## Two things this cost

- **A press must be written down without awaiting anything.** Safari unloads
  this page, and the first version let the press wait for the session record to
  be restored. On the way back up the press landed *after* the navigation it was
  meant to explain, so the theft was judged as though nobody had pressed
  anything, and it went through. The press now lives in a plain map written
  synchronously, and a navigation announced before the rules have been read is
  judged at the commit instead of being waved through. `tests/background.test.mjs`
  stages exactly that moment; it fails against the old code.
- **The popup read the tab's record before awaiting the restore.** After Safari
  unloaded the background page the popup got a blank page record while the
  counters were right, and the blank entry it created then shut the real one out
  for good. It now reads the record after the restore, and a reload of the same
  site keeps its rows so the record survives an undo.

`declarativeNetRequest` was not observed to block a loopback host: a rule for
`localhost` was written and a cache-busted request still arrived. Either a
dotless host does not match `||localhost` or Safari exempts local addresses.
It only affects testing against a local server.


# gogoanime.by, a different network

Verified 2026-09-08 after a pop got through.

The loader sits in the served HTML as a plain script tag:
`buildsstate.com/ad/b5/e1/<key>.js`, where `<key>` is the publisher id that also
appears as `key=` in the pop URL. Nothing waits for a gesture, so blocking the
host stopped the whole thing. That rule shipped in `rules/known-pop-networks.json`
until 2026-09-17, when the shipped list was removed; the guard now has to catch
the pop itself.

The script is obfuscated behind a string table. Its own strings name the parts:
`isNotAnchorOrJSLink`, `addListeners`, `mousedown`, `iosClicks`, `cookieClicks`,
`LieDetector`, a second stage at `/sfp.js`, and the literal `&sub3=invoke_layer`
that turns up in the pop URL as the method that fired.

Two holes let it through, both since closed:

- A real click authorised any window. The page-world half allowed
  `window.open` whenever the user had just pressed a link or a button. These
  networks pick a real click on purpose, so that allowance handed them the
  gesture they wanted. Now a cross-origin window needs the page's own code to
  have asked for it.
- The stack check accepted any frame. Page code calling a third-party helper
  put a page frame in the stack, which vouched for the helper. The check now
  looks at the nearest caller instead.

The `mousedown` hook is the shape where a link is rewritten between the press
and the release. `guard.js` snapshots an anchor on `pointerdown` and compares on
`click`, putting the original back and following it. A different query string is
ignored, since tracking code decorates links constantly. A different host, or a
new `_blank`, is treated as the click being taken.

## What counts as the same site

The caller check asks whether the nearest stack frame belongs to this site, and
the destination check asks the same about the window being opened. Both mean
base domain, because the case that matters is a page on `www.site.com` whose
scripts are served from `cdn.site.com`. Neither host is a subdomain of the
other, so a subdomain-only rule would refuse a site's own popup.

`lib/site.js` works out the base domain. It approximates the Public Suffix List
instead of shipping it: the list runs to thousands of entries and would be read
on every page load. Two rules stand in for it.

- A registry label one level down, so `bbc.co.uk` and `shop.web.id` keep three
  labels. The label set is short and covers what country registries hand out.
- Shared hosting, where each subdomain is a different owner, so `one.github.io`
  and `two.github.io` are different sites.

Anything else keeps two labels. Where the approximation is wrong it errs toward
calling two hosts different sites, which refuses a window rather than letting
one through. The isolated half computes the page's base domain once and hands it
to the page-world half on the injected script element, so there is one copy of
this logic and no dependency on which script runs first.

Ports do not enter into it. `127.0.0.1:8766` and `127.0.0.1:8767` are different
origins and the same site, which is correct, and is why the test harness serves
its third-party helper from `localhost` instead of a second port.
