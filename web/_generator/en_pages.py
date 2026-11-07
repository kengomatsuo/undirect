"""English-only pages: /stop-safari-redirects/ and /compare/.

They have no translations and no hreflang other than "en" and "x-default".
Facts about other products were read on 2026-11-07 from:
  Apple, "Block pop-ups in Safari on iPhone" (iOS 26 and iOS 18 editions both say
    Settings > Apps > Safari > Block Pop-ups):
    https://support.apple.com/guide/iphone/block-pop-ups-ipha49a83ae8/ios
  Apple, "Block pop-up ads and windows in Safari" (steps: Open Settings, tap Apps,
    tap Safari, turn Block Pop-ups on or off; warns about fake close buttons):
    https://support.apple.com/en-us/102524
  1Blocker's App Store page: https://apps.apple.com/us/app/1blocker-ad-blocker/id1365531024
  AdGuard's App Store page: https://apps.apple.com/us/app/adguard-ad-blocker-for-safari/id1047223162
  Undirect's own App Store page (price, minimum OS, description).
"""

CHECKED = "7 November 2026"
SAFARI_GUIDE = "https://support.apple.com/guide/iphone/block-pop-ups-ipha49a83ae8/ios"
SAFARI_ARTICLE = "https://support.apple.com/en-us/102524"
ONEBLOCKER = "https://apps.apple.com/us/app/1blocker-ad-blocker/id1365531024"
ADGUARD = "https://apps.apple.com/us/app/adguard-ad-blocker-for-safari/id1047223162"

SLUGS = ["stop-safari-redirects/", "compare/"]
LABEL = {"stop-safari-redirects/": "Stop Safari redirects", "compare/": "Compare"}


def ext(url, text):
    return f'<a href="{url}" rel="noopener">{text}</a>'


def stop_safari_redirects(price, badge):
    price_line = f" It costs {price} in the US store." if price else ""
    return {
        "title": "How to stop Safari redirects and pop-ups on iPhone",
        "description": "Safari's Block Pop-ups setting handles pop-up windows. Redirects, invisible click layers and swapped links are a different problem. Where the setting is, what it misses, and what covers the rest.",
        "h1": "How to stop Safari redirects and pop-ups on iPhone",
        "sub": "You tapped something on a page and landed on a site you never chose. Here is what happened and what you can switch on.",
        "body": f"""<section><h2>What a redirect or pop-under is</h2>
<p>A redirect sends the tab you are reading to another address, often a betting, dating or fake virus-warning page. A pop-under opens a second page behind the one you are reading, so you only find it when you close the first.</p>
<p>Both usually start with your tap. The page lays a transparent layer over its content and takes the press, or it changes where a link points between the moment your finger lands and the moment it lifts. You aimed at the article and the page's advertiser got the click.</p></section>
<section><h2>Turn on Safari's Block Pop-ups</h2>
<p>Open Settings, tap Apps, tap Safari, and switch on Block Pop-ups. That is the path in Apple's iPhone guide for iOS 26, and its iOS 18 edition gives the same steps. Apple's article on pop-ups also warns that some of them draw a fake close button, so when in doubt close the tab instead of tapping the X. Sources: {ext(SAFARI_GUIDE, "iPhone User Guide")} and {ext(SAFARI_ARTICLE, "Apple Support article 102524")}.</p>
<p>It is free, it is already on your phone, and you should turn it on.</p></section>
<section><h2>What that setting does not stop</h2>
<p>Apple describes the switch in a few lines and leaves its limits unlisted. These four things are not pop-up windows opened by a script, which is why a phone with Block Pop-ups on can still end up somewhere you did not choose:</p>
<ul>
<li>A page that sends the tab you are reading to a different address.</li>
<li>An invisible layer that catches your tap and opens something with it.</li>
<li>A link that is rewritten between the press and the release.</li>
<li>A blank tab opened in the background while the one you were reading is pointed somewhere else.</li>
</ul></section>
<section><h2>Undirect covers that part</h2>
<p>Undirect is a Safari extension for iPhone, iPad and Mac. It removes the invisible layer before your tap lands, puts a rewritten link back, and lets a new window open only when a site asks for one the way a sign-in does. Every address a page tried to send you to is listed, blocked or not, and you can allow or block each one for that site or everywhere.</p>
<p>It is off until you press its toolbar button on a site, and it runs without an account, analytics or a server. It needs iOS 26.2 or later.{price_line}</p>
<div class="cta-row">{badge}</div>
<p>If you are unsure, <a href="/compare/">see how it differs from Safari's setting and from content blockers</a>, or <a href="/demo/">try it on the made-up demo sites</a>.</p></section>""",
    }


def compare(price, badge):
    undirect_price = f"Paid app, {price} in the US store" if price else "Paid app"
    rows = [
        ("What it is", "A switch inside iOS", "App with a Safari content blocker", "App with a Safari content blocker and DNS filtering", "App with a Safari extension"),
        ("Price", "Free, part of iOS", "Free to download. Its listing puts custom rules behind Premium", "Free to use. Its listing puts custom rules, advanced YouTube blocking and security filters behind Pro, with a 7-day trial", undirect_price),
        ("What it goes after", "Pop-up windows", "Ads, trackers and page elements, by filter list", "Banners, pop-ups, autoplay videos, ads and trackers, by filter list", "Invisible click layers, rewritten links and windows or tabs a page opens that you did not ask for"),
        ("Where you control it", "One on/off switch in Settings", "Allowlist a site from the Safari extension; rules and filters in the app", "Allowlists, blocklists and your own rules in the app", "Per destination, for one site or everywhere; the guard is off on a site until you switch it on"),
        ("Shows what a page tried", "Not in Apple's description", "Not in its listing", "Statistics of blocked ads and trackers", "Lists every address a page tried to open, blocked or not"),
        ("Devices", "iPhone, iPad and Mac", "iPhone, iPad and Mac, synced by iCloud; iOS 16 or later", "iOS 15 or later", "iPhone, iPad and Mac; iOS 26.2 or later"),
        ("Privacy as the maker describes it", "Part of iOS", "Says it has no access to webpages and does not track you", "Says no account is needed; open source", "Runs without an account, analytics or a server"),
    ]
    head = "<tr><th scope=\"col\"><span class=\"sr\">Feature</span></th><th scope=\"col\">Safari Block Pop-ups</th><th scope=\"col\"><a href=\"%s\" rel=\"noopener\">1Blocker</a></th><th scope=\"col\"><a href=\"%s\" rel=\"noopener\">AdGuard</a></th><th scope=\"col\">Undirect</th></tr>" % (ONEBLOCKER, ADGUARD)
    trs = "\n".join("<tr><th scope=\"row\">%s</th>%s</tr>" % (r[0], "".join(f"<td>{c}</td>" for c in r[1:])) for r in rows)
    return {
        "title": "Safari Block Pop-ups, content blockers and Undirect compared",
        "description": "What Safari's Block Pop-ups, content blockers such as 1Blocker and AdGuard, and Undirect each do about pop-ups and redirects on iPhone, including what Undirect does not do.",
        "h1": "Safari Block Pop-ups, content blockers and Undirect compared",
        "sub": f"Three different tools get called a pop-up blocker. Undirect is not an ad blocker. Facts below come from Apple's support pages and each product's own App Store listing, read on {CHECKED} in the US store.",
        "body": f"""<div class="table-wrap"><table class="compare">
<thead>{head}</thead>
<tbody>
{trs}
</tbody></table></div>
<section><h2>Where the others do more</h2>
<p>1Blocker and AdGuard block ads, trackers and page clutter, which Undirect does not touch. If banners, video ads or tracking are what bother you, use one of them. Safari's own switch costs nothing and covers pop-up windows, so there is no reason to leave it off.</p></section>
<section><h2>What Undirect does not do</h2>
<p>It does not hide ads, banners or cookie notices, and it does not block trackers. It works in Safari only, on the sites where you have switched it on, and it needs iOS 26.2 or later. It also costs money where the others have a free tier. You can run a content blocker beside it, though we have not tested every combination.</p></section>
<section><h2>Where it fits</h2>
<p>Undirect is for the page that takes your tap: the layer you cannot see, the link that changes under your finger, the tab you did not open. For that, read <a href="/stop-safari-redirects/">how to stop Safari redirects and pop-ups on iPhone</a>, or <a href="/demo/">try the demo sites</a> before you buy.</p>
<div class="cta-row">{badge}</div></section>
<section><h2>Sources</h2>
<p>{ext(SAFARI_GUIDE, "Apple: Block pop-ups in Safari on iPhone")}; {ext(SAFARI_ARTICLE, "Apple: Block pop-up ads and windows in Safari")}; {ext(ONEBLOCKER, "1Blocker on the App Store")}; {ext(ADGUARD, "AdGuard Ad Blocker for Safari on the App Store")}; Undirect's own App Store page. Read {CHECKED}. Prices and features change, so check the listings.</p></section>""",
    }


BUILDERS = {"stop-safari-redirects/": stop_safari_redirects, "compare/": compare}
