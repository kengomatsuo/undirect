# Undirect 1.0.5 launch (card ASG80)

What ships: on a site where Undirect is on, a page can no longer send the tab
somewhere else with no tap (on load, on a timer, while scrolling), and a page
can no longer answer Back with another site or stack copies of itself so Back
goes nowhere. Proof: `docs/screenshots/pains/` (Mac Safari, off vs on).

## Done before release (2026-11-20)

| What | State | Read back |
| --- | --- | --- |
| iOS 1.0.5 (15) | WAITING_FOR_REVIEW, release on approval, with custom product pages "Block pop-up ads" and "Safari extension for iPhone and iPad" (owner's yes) | ASC API reviewSubmissions, 16:27 UTC |
| macOS 1.0.5 (15) | WAITING_FOR_REVIEW, release on approval | ASC API reviewSubmissions, 16:25 UTC |
| Store text | name "Undirect - Tab & Popup Blocker", subtitle, keywords, What's New in 50 storefronts | ASC API appInfoLocalizations / versionLocalizations |
| Featuring nomination | "Undirect stops redirects nobody tapped", App Enhancements, publish window from 2026-12-11, iPhone, iPad and Mac, demo links attached; SUBMITTED | ASC API nominations b4bd80a9 |
| Site and AI files | "from version 1.0.5" on all 50 support pages, llms.txt, demo pages /demo/scroll/ and /demo/back/ | curl of the live site |

Apple asks three weeks' notice for featuring and the owner chose to release
before the Black Friday sale (Nov 27-30), so the nomination's window starts
three weeks out instead of on release day.

## The hour 1.0.5 is live (READY_FOR_SALE on iOS)

Check: `python3 Support/AppStore/asc_state.py 1.0.5` prints each platform's
state; the launch starts when iOS reads READY_FOR_SALE.

1. **Promotional text** (no review needed, en-US first): "New: Undirect keeps
   you on the page when a site tries to send you away without a tap, and Back
   takes you back. One purchase for iPhone, iPad and Mac." Other storefronts
   through the blind-translation pipeline (`Support/i18n/store/*.json`
   `promo`), then `./deploy.sh metadata` and `metadata_mac`. ASO rule: promo
   text is store copy, so read `docs/aso/research.md` first.
2. **Social** (asg-social-2 holds the calendar and the owner's go): the angle
   and Mac clips are with it; iOS clips follow in `docs/screenshots/pains/ios-*`.
   Posts go out after the owner's go, not before release.
3. **Replies where people asked** (owner's go per reply, after reading each
   thread whole, memory: comments-after-research): the threads in
   `docs/research/undirect-voice-of-customer.md` rows 1, 2, 23, 24 (no-tap
   redirects) and 7, 32, 47 (Back trap). Reddit is blocked in Chrome on this
   Mac; read it in another browser.
4. **Directory listings that show "what's new"** (AlternativeTo, Product Hunt,
   MacUpdate when listed): one line, owner's go where it posts as him.
5. **App Store reviews** that complain about redirects with no tap or Back:
   reply "1.0.5 fixes this" from App Store Connect, owner's go.
6. **Black Friday (Nov 27-30)**: the sale posts name 1.0.5's two fixes.
7. **Dec 11 onward**: the nomination window; nothing to do unless Apple asks
   for assets (they arrive by email to the Account Holder).

## Not done here

- iPhone clips from the Simulator (filmer run in progress 2026-11-20).
- An In-App Event with the "Major Update" badge (Apple's badge for significant
  new features) could carry 1.0.5 on the product page and in search: it needs
  a 1920x1080 card and goes through review, so it is the owner's call; not
  prepared yet.
