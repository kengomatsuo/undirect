# Real sites that swap a pressed link or hijack Back

Searched 2026-11-23 from the Mac's network (Indonesia), in headless WebKit 26.6
(Playwright `webkit-2368`) with the `iPhone 15` device profile. Each page loads,
waits about 7 s for ad tags, takes two taps on blank areas and one on an in-site
link, then three `goBack()` calls. An init script records every press on an `<a>`
(href and target at `touchstart`, `pointerdown`, `mousedown`), the same anchor's
href and target at `click`, every `pushState`, `replaceState`, `popstate`,
`window.open`, and any `<a>` whose href changes host. A second pass (`probeA`)
taps up to six off-site links on a page and compares the href at press with the
href at click, capture and bubble. Scripts: the session scratchpad, `trap/probe.mjs`
and `trap/probeA.mjs`.

- **A** means the pressed link's host changed, or it gained `target=_blank`,
  between press and click: what `guard.js` B2 calls `href-swap`.
- **B** means Back from the page landed on another site, or a popstate handler
  sent the tab there.

## Findings

### A, href swap: Bing search results (2026-11-23)

**URL:** `https://www.bing.com/search?q=safari+extension` (any query works; this
one was used every run).

**Steps:** open the URL in Safari on the iPhone, tap any organic result title,
for example "Safari extensions - Apple Developer".

**Evidence**, from the event log of one tap, in order:

1. `pointerdown`, `touchstart`, `pointerup`, `touchend`, `mousedown`: the
   anchor's `href` is `https://developer.apple.com/safari/extensions/`.
2. Right after `mousedown`, the page rewrites it (MutationObserver) to
   `/fd/ls/GLinkPing.aspx?IG=<id>&&ID=SERP,5195.2&SUIH=<id>&redir=aHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL3NhZmFyaS9leHRlbnNpb25zLw`
   (the `redir` is the original URL in base64).
3. `click`, capture and bubble: `href` is still the `/fd/ls/GLinkPing.aspx` one.

Host at press `developer.apple.com`, host at click `www.bing.com`: exactly the
`wentElsewhere` test in `guard.js` B2, since the guard stores `pressedHref` at
`pointerdown`, which runs before Bing's `mousedown` rewrite. Every one of the
four results tapped behaved the same (`support.apple.com`, `developer.apple.com`,
`www.apple.com`, each swapped to `www.bing.com/fd/ls/GLinkPing.aspx`).
Responsible script: Bing's own SERP code from `r.bing.com`, not an ad network.
Reproduced on three separate runs.

What the film should show: the snap, then the tab opening the result's real
address, never `bing.com/fd/ls/...`. The swap is click tracking, harmless, so
this is a clean demonstration and not a scam.


**Filming on a 440x956 iPhone (added 2026-11-24).** On `safari extension` the
first organic title sits below an image carousel and an AI answer (top of the
first result at about y 720 CSS px), so use a navigational query instead:
`https://www.bing.com/search?q=kbbi`. Its first screen is plain results (no
carousel, no AI block, checked by screenshot in WebKit with the `iPhone 16 Pro
Max` profile: screen 440x956, page viewport 440x763). Tap the blue title
"Arti kata - Kamus Besar Bahasa Indonesia (KBBI) Online": the text sits at
about **x 40-400, y 170-200 CSS px from the top of the page**, inside an anchor
that covers y 148-273. On screen add Safari's top inset (status bar) to that y.
Two runs, both alike: `href` `https://www.kbbi.web.id/` at `pointerdown`,
rewritten at `mousedown` to `/fd/ls/GLinkPing.aspx?...&redir=...`, still Bing's
at `click`. The six links under it (`abjad/abjat` at y 359-387, `akte/akta` at
y 412-440, ...) are ordinary result links too.

### A, second site: Cosmopolitan through Skimlinks (2026-11-23)

**URL:** `https://www.cosmopolitan.com/style-beauty/beauty/a46539844/cosmopolitan-awards/`

**Steps:** scroll to the author bio near the end (about 7200 px down on an
iPhone 15) and tap its "Instagram" link (`https://www.instagram.com/laurenbalsamo/`).

**Evidence:** `href` at `pointerdown` is `https://www.instagram.com/laurenbalsamo/`;
at `touchstart` Skimlinks rewrites it to
`https://go.skimresources.com/?id=74968X1525071&isjs=1&jv=15.11.1&sref=...&url=https%3A%2F%2Fwww.instagram.com%2Flaurenbalsamo%2F&...&xjsf=other_click__touchstart%20%5B%5D`,
and at `click` (capture and bubble) it is still the `go.skimresources.com` one.
Host `www.instagram.com` at press, `go.skimresources.com` at click. Script:
`s.skimresources.com`. The parameter `xjsf=other_click__touchstart` is
Skimlinks naming the event it swapped on. Its shopping galleries
(`/g73486987/best-dry-scalp-oils/`) do not swap: their "Shop" buttons are
already Amazon affiliate links, which Skimlinks leaves alone, so only
unmonetised outbound links are taken. Bing stays the better film: every result
swaps, on the first screen.

For comparison, Yahoo (`search.yahoo.com/search?p=...`) does the opposite: its
results arrive as `r.search.yahoo.com/...` and are rewritten to the clean URL as
the page loads, with no change at the press. Not A.

### B, Back sent to another site: the ad tab pahe.ink opens (2026-11-23)

**URL to start from:** `https://pahe.ink/` or any post, for example
`https://pahe.ink/your-mother-your-mother-your-mother-2026-web-dl-480p-720p-1080p/`.

**Steps:** with Undirect off, tap once anywhere on the page. A new tab opens at
`https://budgetezy.org/4/809069fa06f61a0a1be67d700d057ebe` and forwards to an
offer (every run so far: `safevpnzone.com/index.php?key=g6wb515ixfuss82hhzi4...`).
In that new tab, press Back. It should have nowhere to go; instead each Back
lands on another advertiser.

**Evidence**, four runs, all alike. Backs from the new tab:

| Run | Back 1 | Back 2 | Back 3 | Back 4 |
| --- | --- | --- | --- | --- |
| 1 | safevpnzone.com (another key) | tripih.com/sini.php | spf.shopee.co.id | tripih.com |
| 2 | safevpnzone.com (another key) | lucky77-official.info | starlink.com/indonesia-blocked | lucky77-official.info |
| 3 | safevpnzone.com (another key) | spf.shopee.co.id | 1xlite-2199.com | spf.shopee.co.id |
| direct load | safevpnzone.com (another key) | tripih.com/sini.php | lucky77-official.info | |

The mechanism, read from the page `budgetezy.org/4/809069fa…` serves (6966 bytes):

```js
o=function(e){if(e.isEnabled)!function(e){var n='https://'+window.location.host+e.urlPath;
window.history.pushState(null,document.title,n),window.history.pushState(null,document.title,n)}(e)};
```

So the page pushes two entries at
`https://budgetezy.org/4/10afaec35404ffd5edbad0131bb38ee6?ibid=<id>&submetric=32405074`
(a second zone, the back-button zone) before it forwards to the offer. Back
returns to one of those entries, which is a real page load of a direct-link
zone, and that zone forwards to a fresh advertiser. The pushes ran with
`navigator.userActivation.hasBeenActive === false` and WebKit 26.6 still honoured
them. The offers chain further: `tripih.com/sini.php` opens `stream28.com`,
`bold-consequence.com` and `hai8g.com/4/10988755`, which push their own entries
(`hai8g.com/afu.php?zoneid=10988755...`).

Network: the `/4/<zone>` paths, `/afu.php?zoneid=` and `dlrt=t` parameters are
Monetag (formerly PropellerAds) direct-link and OnClick zones. pahe.ink loads it
through its own first-party loader host `ttxba87r.pahe.ink`.

The same page also carries `window.opener.location.href=e.url`, the tab-under
that sends the page you were on somewhere else. One run saw the original
pahe.ink tab sent to `s.honestraptor.com/h/452/...` and then
`1osb.com/smart.php?link=12072213`, which pushed three
`/afu.php?zoneid=12072213` entries with user activation true; the two later runs
left the pahe.ink tab alone. So the opener trap is real but not every time. In a later set of three runs
(`tabunder.mjs`, three blank taps each) one run saw the pahe.ink tab itself sent
to `1osb.com/afu.php?zoneid=12070813` about 20 s after the taps, while it sat on
`pahe.ink/` after two Backs: that is the tab-under landing late, not a Back trap.

The pahe.ink tab's own Back is not trapped by script: `mainB.mjs` hooked
`pushState`, `onpopstate` and every `popstate` listener on it over three runs and
saw no `pushState` from any ad code. History still grew to 5 to 12 entries and
the first three Backs stayed on the same post URL, because the ad iframes
navigate and each iframe load is a joint-history entry. A viewer sees "Back does
nothing" there, not "Back goes to another site".

**A more filmable variant:** open any page, then type
`budgetezy.org/4/809069fa06f61a0a1be67d700d057ebe` in the address bar. It lands
on an offer; press Back and you land on another advertiser instead of the
page you typed it from. Reproduced twice that way from `https://pahe.ink/`
(`typed.mjs`): history length 5 after the load, Back 1 to
`safevpnzone.com/index.php?key=jszat2kwrejada2i3uyu...`, Back 2 to
`1xlite-2199.com` or `bold-consequence.com`, Back 3 still on an advertiser.
Three Backs never reached pahe.ink. Each Back first commits a
`budgetezy.org/4/10afaec35404ffd5edbad0131bb38ee6?ibid=...` entry, which pushes
two more of itself and forwards, so the trap refills as you press.


### B in one document: infox.ru (added 2026-11-24)

This is the shape `guard.js` catches: a `popstate` and, in the same document,
a navigation to another site right after it. The budgetezy chain above is not:
each of its Backs is a cross-document load.

**The page's own inline script**, in the `<head>` of `https://www.infox.ru/`
and of its article pages (Russian news site, loads from Indonesia):

```js
window.history.pushState({}, "", location.href);
window.onpopstate = function (e) {
	e.preventDefault();
	if(e.state != null)
		location.replace("https://cis.infox.sg/topnews/?id=topnews.app");
};
```

It fires only when Back lands on an entry whose state is `{}`, which is one of
the page's own pushed entries in the same document. A fresh visit has
`[previous page, infox (null), infox ({})]`, and the first Back lands on the
null entry, so nothing happens on the very first visit. A reload makes it
reliable: the reloaded document pushes again, giving
`[..., infox (null), infox ({}), infox ({})]`, and Back then lands on a `{}`
entry inside the same document.

**Steps:**
1. Open any page first (so Back has somewhere honest to go), then open
   `https://www.infox.ru/`.
2. Reload the page once.
3. Tap once on a blank spot so the page has user activation, for example the
   heading "ГЛАВНОЕ ЗА СЕГОДНЯ" at about (220, 100) CSS px. It is an `H1`,
   not a link.
4. Press Back once. The tab goes to `https://cis.infox.sg/topnews/?id=topnews.app`
   instead of staying on infox.ru or returning to the page before it.

**Evidence**, `popB.mjs`, three runs (two with no tap, one with the tap at
(220, 100)), all alike. Times in ms after Back:

| ms | event |
| --- | --- |
| 1-4 | `navigate` type `traverse` to `https://www.infox.ru/` |
| 2-5 | `popstate`, `e.state` = `{}`, same document (no `pagehide`) |
| 2-5 | `navigate` type `replace` to `https://cis.infox.sg/topnews/?id=topnews.app`, `userInitiated: false`, `cancelable: true` |
| ~880-915 | commit of `cis.infox.sg/topnews/` |
| ~1060-1085 | `cis.infox.sg` calls `pushState({}, "", location.href)` on itself |

The replace starts 0 ms after the popstate, far inside the guard's 700 ms
window, and it is cancelable, so `judgeUnasked()` gets to rule on it. `infox.ru`
and `infox.sg` are different base domains. No ad network is involved: it is the
publisher's own inline script, sending readers to its sister aggregator.

**Without a reload:** open `https://www.infox.ru/`, tap a headline, then press
Back three times. Back 1 lands on the article's null entry (nothing), Back 2
returns to the homepage, Back 3 is hijacked as above (one run, popstate then
the replace 1 ms later). This path depends on Back 2 *reloading* the homepage.
Playwright's WebKit never uses the back-forward cache (even `wikipedia.org`
came back `pageshow persisted=false`), but Safari may restore the homepage
from it, and a restored page would make Back 3 land on the null entry. So
film the reload path.

**Other pages with a popstate redirect, checked and rejected:**

- `walkjogrun.net`: `popstate` then `location.replace(home_url)`, but to its
  own homepage, and only for visitors referred by Google (90% of them).
- `1osb.com/afu.php`, `hai8g.com/4/<zone>`, `1osb.com/smart.php` (Monetag
  OnClick pages): each pushes three `/partitial/5117867?var=<zone>` entries,
  then sets `window.location.href` to the offer. No popstate handler, so it is
  the same cross-document shape as budgetezy.
- `skidkaonline.ru`, `alchetron.com`, `openthesaurus.de`, `tennispotting.it`,
  `staikudrik.com`, `cholteth.com`, `www2.iris.gov.hk`: their popstate
  handlers close a modal or reload the same page, never another host.
- Found through PublicWWW: `"onpopstate" "location.replace" "pushState"`
  (11 of about 440 visible to a guest), `"onpopstate" "infox.sg"` (infox.ru
  and one hidden `a***.one`), `"popstate" "backRedirect"` (349, only
  walkjogrun.net visible to a guest).

## Near misses, worth knowing

- **kusonime.com** (2026-11-23): `zxc.nyaa-tan.my.id` / shrinkearn's full-page
  script rewrites off-site anchors to `shrinkearn.com/full?api=...&url=<base64>`
  as the page loads, not at the press. Host at press equals host at click, so
  this is not A; the guard sees an ordinary link to shrinkearn.
- **pahe.ink** (2026-11-23): the first blank tap opens a tab to
  `budgetezy.org/4/<zone>` (Monetag-style direct link) that calls `pushState`
  on itself twice, so Back inside that ad tab stays on budgetezy. The pahe.ink
  tab's own Back is clean.
- **lunarx.to** (2026-11-23): the page detects the headless browser
  (`disable-devtool`) and sends it to `theajack.github.io/disable-devtool/404.html`,
  so it cannot be probed headless.

## Tested, nothing found

| URL | Result |
| --- | --- |
| `https://oploverz.ch/` and `/dark-summoner-to-dekiteiru-episode-8-subtitle-indonesia/` | Adcash (`acscdn.com`) pop tabs to traveloka.com, sukseskan.com, kykay.com, shopee; `travellermania.com/xid-prop.php` opens blank tabs. No swap; Back clean. |
| `https://nimegami.id/` and `/saishuu-gakushou-hibike-euphonium-zenpen-sub-indo/` | `backup.gaslah.my.id` pop tab to t.co, then shopee. Next.js pushState is its own routing. Back clean. |
| `https://kusonime.com/` and `/gyakusatsu-kikan-bd-subtitle-indonesia/` | shrinkearn rewrites links at load (see near misses). Back clean. |
| `https://manhwaindo.my/` | DNS fails here. |
| `https://bacakomik.my/` and `/ticket-hero-chapter-355/` | Loads `qk.windowylarvule.com`, `ew.ileacringes.com`; no pop or swap seen in headless. Back clean. |
| `https://www.mangakakalot.gg/` | Cloudflare Turnstile; no ad behaviour. Back clean. |
| `https://lunarx.to/` | Detects headless, sent to disable-devtool 404. |
| `https://komikcast.li/` | Timed out. |
| `https://komiku.org/` | Nothing. Back clean. |
| `https://komikindo.ch/` and `/overgeared-chapter-349/` | A blank tap takes the same tab to a slot site (`4.cinaa33.site/mobile/hot-games`, another run `4.rusiaa.site`). Back 1 lands on `4.cinaa33.site/` (its own redirect entry), Back 2 on komikindo. No pushState; one extra Back, not a trap. |
| `https://shinigami.asia/` | Redirects to its own mirror `s1.shinigami.mx`. Nothing else. |
| `https://rebahin.lol/` | Same-tab redirect to `vinniebags.com/go/3128368?...subid2=rebahin.lol` with no tap; Back clean. |
| `https://nontondrama.click/`, `https://gogoanime3.co/` | Parked domains (wondersearch.io). |
| `https://hianime.to/` | Timed out. |
| `https://droplink.co/`, `https://gplinks.co/`, `https://shrinkme.io/`, `https://exe.io/`, `https://ouo.io/`, `https://sfl.gl/` | Shortener homepages: nothing. sfl.gl redirects to linku.to. |
| `https://getmodsapk.com/`, `https://liteapks.com/`, `https://an1.com/` | Nothing. Back clean. |
| `https://steamunlocked.net/` | Redirects to steamunlocked.org; page closed itself during the run. |
| `https://samehadaku.how/` | Redirects to `v2.samehadaku.how`, a tap opened `t.me/samehadaku_care` in the same tab; Cloudflare challenge. No trap. |
| `https://maid.my.id/` | Nothing. Back clean. |
| `https://komikav.net/` | Pop tab to `displayendpointstarring.com`, whose Back stays on itself. Not cross-site. |
| `https://anime-indo.lol/` | Nothing. Back clean. |
| `https://kusonime.org/` | Not the real kusonime; nothing. |
| `https://bacaman.id/` | Could not connect. |
| `https://search.yahoo.com/search?p=safari+extension` | Rewrites results to clean URLs at load; no swap at press. |
| `https://yandex.com/search/touch/?text=safari+extension` | No swap at press. |
| `https://www.google.com/search?q=safari+extension` | No result links reached headless. |
| `https://duckduckgo.com/?q=...`, `https://www.startpage.com/do/search?q=...`, `https://search.brave.com/search?q=...` | No links reached headless. |
| `https://www.ecosia.org/search?q=safari+extension` | No swap. |
| `https://m.baidu.com/s?word=safari+extension` | Rewrites some header links to a login page at load; no swap at press. |
| `https://m.search.naver.com/search.naver?query=safari+extension` | No swap. |
| `https://www.dailymail.co.uk/femail/shopping/index.html`, `/lifestyle/article-16308669/...` | Skimlinks present but no swap seen on the links tapped. |
| `https://www.mirror.co.uk/shopping/` | Not reached (probe bug in the first run; not retried). |
| `https://old.reddit.com/r/apple/` | No swap. |
| `https://www.cosmopolitan.com/style-beauty/beauty/g73486987/best-dry-scalp-oils/` | Affiliate links already, no swap (see A, second site). |
| `https://apkmody.io/` | Redirects to its own `apkmody.mobi`. Nothing. |
| `https://modyolo.com/`, `https://5play.org/`, `https://rexdl.com/`, `https://sharemods.com/` | Nothing. Back clean. |
| `https://andropalace.org/` | Origin down (Cloudflare 522). |
| `https://apkdone.com/` | A blank tap took the same tab to `damanworld.asia/#/register?invitationCode=222479906566` (a click theft, not A or B). Back from it returned to apkdone.com normally. |
| `https://playmods.net/` | Opens its own article in a new tab. Nothing. |
| `https://igetintopc.com/` | Nothing. Back clean. |
| `https://mega4upload.com/` | Redirects to `mega4upload.net`. Nothing. |
| `https://acefile.co/` | Nothing. Back clean. |
| `https://uptomega.me/` | A tap took the same tab to `click-v4.junimedclk.com/click?i=...` with the entry replaced; Back clean. |
| `https://getmodsapk.com/5473-youtube-premium-free-apk-mod/`, `https://an1.com/4718-war-machines.html` | AdSense vignette (`#google_vignette`) only. Back clean. |
| `https://moddroid.com/` | Static scan: its pushState is Swiper's slide history, not a trap. |
| `https://www.mirror.co.uk/shopping/` | No swap; one tap left for `yimbly.com` as an ordinary link. |
| `https://www.bing.com/news/search?q=apple` | News results do not swap; the web results do (see A). |

Hosts that resolve to `198.54.100.22` here are the Indonesian block page and were
not loaded: komiku.id, westmanga.me, doujindesu.tv, samehadaku.email,
otakudesu.cloud, anoboy.icu, kiryuu.one, mangadex.org, apkmody.com, 9anime.to,
fmovies.to, sflix.to, myflixer.to, 123movies.to, yts.mx, nyaa.si, animepahe.ru,
manganato.com, chapmanganato.to, mangapark.net, bato.to, igg-games.com,
y2mate.com, savefrom.net, ssyoutube.com, dood.re, streamtape.com and more.

## Caveats

- Headless WebKit is the iPhone engine with an iPhone user agent, not Safari on
  a phone. Ad networks rotate offers and cap frequency per visitor, so the
  advertiser at each Back will differ; the shape (Back lands on an advertiser,
  never on the page you came from) held in every run.
- Bing may serve a different results page to a signed-in or non-Indonesian
  visitor; the swap held on two queries (`safari extension`,
  `resep nasi goreng`) and on every result tapped.

## Filmed in the iPhone simulator (2026-11-24)

With the guard on every site, all five effects drew on these real pages; the
clips are the owner's `~/Downloads/Claude/undirect-effects/`.

| Effect | Site | Note |
| --- | --- | --- |
| burst | lunarx.to, nimegami.id, pahe.ink | lunarx.to's pop arrives as a tab the background closes; the page is told and draws it |
| field | oploverz.ch | a trip to sukseskan.com nobody pressed for |
| shatter | oploverz.ch | the layer that caught the press |
| snap | bing.com/search?q=kbbi | the first result, swapped to `/fd/ls/GLinkPing.aspx` at mousedown |
| back | infox.ru | only after a press on the page: iOS Safari skips the trap's entries on a page nobody touched, so an untouched page has no trap to stop |
