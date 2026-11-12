---
paths:
  - "Extension/Resources/content/**"
  - "Extension/Resources/lib/**"
  - "Extension/Resources/sites/**"
  - "Extension/Resources/background.js"
---

- **No shipping Safari supports `world: "MAIN"` as of 2026-09-08**, so the
  page-world half is appended as a script element by the content script. Full
  account: [docs/safari-constraints.md](../../docs/safari-constraints.md).
- **A sweep on `pointerdown` removes the trap but the click dies with it**, so
  the guard clears traps on hover and forwards the click when a press had to do
  the removing. Verified in `tests/`.
- **`coverage()` divides by the viewport area**, which is zero in a hidden tab.
  It returns 0 there rather than NaN. Any new geometry check needs the same care.
- **`window.location` cannot be hooked, so a same-tab redirect is judged in the
  background page**: a cross-site navigation within a moment of a press aimed
  elsewhere is the press being taken, and it is recorded, blocked and undone. A
  press is written down without awaiting anything, because one that waited for
  the restore landed after the navigation and the theft went through. Full
  account: [docs/redirect-mechanism.md](../../docs/redirect-mechanism.md).
- **Being the page's own code authorises no window either**, because the site
  taking the money is where the pop is served from: only a window asked for at a
  size whose address names a way back to the page, which is a sign-in or a share
  sheet, counts as the page vouching. A stop at the network layer is invisible
  to the guard, so the record asks `getMatchedRules()` what it refused; Safari
  leaves out the rule id, so the host comes from the request URL. Same doc and
  [docs/safari-constraints.md](../../docs/safari-constraints.md).
- **A user's click authorises nothing by itself.** Pop networks pick a real click
  and ride it, so a cross-origin `window.open` needs the page's own site in the
  nearest stack frame, never just a recent gesture. Site means base domain, so
  `cdn.site.com` may vouch for `www.site.com`. `lib/site.js` works that out and
  approximates the Public Suffix List rather than shipping it. Full account:
  [docs/redirect-mechanism.md](../../docs/redirect-mechanism.md).
