# How the click gets taken

Verified on 2026-09-08 by reading what lunarx.to serves and what it loads.

## The site arms it

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


# gogoanime.by, a different network

Verified 2026-09-08 after a pop got through.

The loader sits in the served HTML as a plain script tag:
`buildsstate.com/ad/b5/e1/<key>.js`, where `<key>` is the publisher id that also
appears as `key=` in the pop URL. Nothing waits for a gesture, so blocking the
host stops the whole thing. That rule is in `rules/known-pop-networks.json`.

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
