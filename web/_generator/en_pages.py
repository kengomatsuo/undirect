"""English-only pages: articles for the questions people ask about Safari pop-ups and redirects.

They have no translations and no hreflang other than "en" and "x-default". PAGES is the one list
of them: generate.py builds each page, its footer link, its sitemap entry, its dates in the
JSON-LD and its llms.txt line from it.

Every fact about Safari or another product was read from the page linked beside it:
  Apple, "Block pop-ups in Safari on iPhone" (Settings > Apps > Safari > Block Pop-ups), read
    2026-11-07 and again 2026-11-20 (iOS 27 edition, same steps).
  Apple, "Block pop-up ads and windows in Safari" (102524): the iPhone and Mac settings,
    Fraudulent Website Warning, fake close buttons, Shift at launch, adware steps, notifications.
  Apple, Safari User Guide for Mac: "Allow or block pop-ups" (Allow, Block, Block and Notify,
    "Blocking pop-ups might also block some content you want to see") and "Change Tabs settings".
  Apple, iPhone User Guide: "Open and close tabs" (Open Links > In Background), "Get extensions"
    (Settings > Apps > Safari > Extensions, Manage Extensions), "Hide distractions when browsing".
  MDN, Window.open(): pop-up windows "must be opened in direct response to user input".
  App Store listings, through https://itunes.apple.com/lookup?id=<id>&country=us and each listing
    page for in-app purchases and compatibility, read 2026-11-20: 1Blocker 1365531024, AdGuard
    1047223162, AdGuard Mini for Mac 1440147259, Ghostery 6504861501, TabGuard 6756740309,
    Tab Blocker 6759275389, RedirectWeb 1571283503, Undirect 6810513194.
  Vendor pages read 2026-11-20: 1blocker.com (filters, 50,000 trackers, platforms),
    adguard.com/en/adguard-ios/overview.html (more than 50 filters, DNS).
  How Undirect judges a tap: docs/redirect-mechanism.md and docs/rules-and-record.md.
Copy names no country or place (owner's rule), so prices are given as the App Store shows them in dollars.
"""

FIRST_READ = "7 November 2026"
READ = "20 November 2026"

SAFARI_GUIDE = "https://support.apple.com/guide/iphone/block-pop-ups-ipha49a83ae8/ios"
SAFARI_ARTICLE = "https://support.apple.com/en-us/102524"
MAC_POPUPS = "https://support.apple.com/guide/safari/block-pop-ups-sfri40696/mac"
MAC_TABS = "https://support.apple.com/guide/safari/tabs-ibrw1045/mac"
IPHONE_TABS = "https://support.apple.com/guide/iphone/open-and-close-tabs-iph489b9313f/ios"
IPHONE_EXTENSIONS = "https://support.apple.com/guide/iphone/get-extensions-iphab0432bf6/ios"
IPHONE_DISTRACTIONS = "https://support.apple.com/guide/iphone/hide-distractions-when-browsing-iph7778f2888/ios"
MDN_OPEN = "https://developer.mozilla.org/en-US/docs/Web/API/Window/open"
ONEBLOCKER = "https://apps.apple.com/us/app/1blocker-ad-blocker/id1365531024"
ONEBLOCKER_SITE = "https://1blocker.com/"
ADGUARD = "https://apps.apple.com/us/app/adguard-ad-blocker-for-safari/id1047223162"
ADGUARD_MINI = "https://apps.apple.com/us/app/adguard-ad-blocker-for-safari/id1440147259"
ADGUARD_SITE = "https://adguard.com/en/adguard-ios/overview.html"
GHOSTERY = "https://apps.apple.com/us/app/ghostery-adblocker-for-privacy/id6504861501"
TABGUARD = "https://apps.apple.com/us/app/tabguard/id6756740309"
TAB_BLOCKER = "https://apps.apple.com/us/app/tab-blocker/id6759275389"
REDIRECTWEB = "https://apps.apple.com/us/app/redirectweb-smart-url-router/id1571283503"
SOURCE = "https://github.com/kengomatsuo/undirect"


def ext(url, text):
    return f'<a href="{url}" rel="noopener">{text}</a>'


def cost(price):
    return f"{price} once" if price else "a one-time price"


def table(head, rows, first_col="Feature"):
    """A comparison table: head is the column titles after the row-title column, rows are tuples."""
    ths = "".join(f'<th scope="col">{h}</th>' for h in head)
    trs = "\n".join("<tr><th scope=\"row\">%s</th>%s</tr>" % (r[0], "".join(f"<td>{c}</td>" for c in r[1:])) for r in rows)
    return f"""<div class="table-wrap"><table class="compare">
<thead><tr><th scope="col"><span class="sr">{first_col}</span></th>{ths}</tr></thead>
<tbody>
{trs}
</tbody></table></div>"""


def stop_safari_redirects(price, badge):
    price_line = f" It costs {price}, paid once." if price else ""
    return {
        "title": "How to stop Safari redirects and pop-ups on iPhone",
        "description": "Safari's Block Pop-ups setting handles pop-up windows. Redirects, invisible click layers and swapped links are a different problem. Where the setting is, what it misses, and what covers the rest.",
        "h1": "How to stop Safari redirects and pop-ups on iPhone",
        "sub": "You tapped something on a page and landed on a site you never chose. Here is what happened and what you can switch on.",
        "body": f"""<section><h2>What a redirect or pop-under is</h2>
<p>A redirect sends the tab you are reading to another address, often a betting, dating or fake virus-warning page. A pop-under opens a second page behind the one you are reading, so you only find it when you close the first.</p>
<p>Both usually start with your tap. The page lays a transparent layer over its content and takes the press, or it changes where a link points between the moment your finger lands and the moment it lifts. You aimed at the article and the page's advertiser got the click.</p></section>
<section><h2>Turn on Safari's Block Pop-ups</h2>
<p>Open Settings, tap Apps, tap Safari, and switch on Block Pop-ups. That is the path in Apple's iPhone guide, and its editions for earlier iOS versions give the same steps. Apple's article on pop-ups also warns that some of them draw a fake close button, so when in doubt close the tab instead of tapping the X. Sources: {ext(SAFARI_GUIDE, "iPhone User Guide")} and {ext(SAFARI_ARTICLE, "Apple Support article 102524")}.</p>
<p>It is free, it is already on your phone, and you should turn it on.</p></section>
<section><h2>What that setting does not stop</h2>
<p>Apple describes the switch in a few lines and leaves its limits unlisted. These four things are not pop-up windows opened by a script, which is why a phone with Block Pop-ups on can still end up somewhere you did not choose:</p>
<ul>
<li>A page that sends the tab you are reading to a different address.</li>
<li>An invisible layer that catches your tap and opens something with it.</li>
<li>A link that is rewritten between the press and the release.</li>
<li>A blank tab opened in the background while the one you were reading is pointed somewhere else.</li>
</ul>
<p>Why the switch lets these through, and what each of Safari's other settings covers, is on <a href="/safari-popups-still-open/">Block Pop-ups is on, and Safari still opens ad pages</a>. If the trouble is tabs, read <a href="/stop-safari-new-tabs/">how to stop Safari opening new tabs by itself</a>.</p></section>
<section><h2>Undirect covers that part</h2>
<p>Undirect is a Safari extension for iPhone, iPad and Mac. It removes the invisible layer before your tap lands, puts a rewritten link back, and lets a new window open only when a site asks for one the way a sign-in does. Every address a page tried to send you to is listed, blocked or not, and you can allow or block each one for that site or everywhere.</p>
<p>It is off until you press its toolbar button on a site, and it runs without an account, analytics or a server. It needs iOS 26.2 or later.{price_line}</p>
<div class="cta-row">{badge}</div>
<p>If you are unsure, <a href="/safari-popup-blockers/">see seven pop-up and redirect blockers compared with prices</a>, read <a href="/compare/">how it differs from 1Blocker and AdGuard</a>, or <a href="/demo/">try it on the made-up demo sites</a>.</p></section>""",
    }


def popups_still_open(price, badge):
    settings = table(["Where it is", "What it stops", "What still gets past"], [
        ("Block Pop-ups", "iPhone and iPad: Settings, Apps, Safari",
         "A window a page opens without a tap", "A tab opened on your tap, a redirect, a swapped link"),
        ("Pop-up Windows", "Mac: Safari, Settings, Websites, at the bottom of the list",
         "The same, set per website: Allow, Block, or Block and Notify",
         "The same. Apple adds that blocking pop-ups \"might also block some content you want to see\""),
        ("Fraudulent Website Warning", "iPhone and iPad: Settings, Apps, Safari. Mac: Safari, Settings, Security",
         "Warns you when you visit a fraudulent website", "It warns about a page; it does not stop a tab opening"),
        ("Hide Distracting Items", "iPhone: the page menu at the left of the address bar",
         "Menus and other parts of a page that you pick, one by one", "Anything you have not picked on that page"),
        ("Extensions", "iPhone and iPad: Settings, Apps, Safari, Extensions. Mac: Safari, Settings, Extensions",
         "An extension you do not recognise, once you turn it off", "Nothing on its own: it is a list to check"),
    ], first_col="Setting")
    return {
        "title": "Why Safari still opens ads with Block Pop-ups on, and how to stop it",
        "description": "Block Pop-ups stops windows a page opens without your tap. Why ad pages still open in Safari on iPhone, iPad and Mac, what each Safari setting covers, and what stops the rest.",
        "h1": "Block Pop-ups is on, and Safari still opens ad pages",
        "sub": "The switch is working. The ad pages that get past it come in by other routes, and most of them ride on a tap you made yourself.",
        "wide": True,
        "body": f"""<section><h2>Why Block Pop-ups lets them through</h2>
<p>Safari's pop-up blocker, like the one in every current browser, stops a window that a page opens on its own. A window opened in direct response to your tap is allowed, because an ordinary link that opens in a new tab works the same way. Mozilla's reference for web developers puts the rule plainly: pop-up windows "must be opened in direct response to user input" ({ext(MDN_OPEN, "MDN, Window.open()")}).</p>
<p>Ad scripts are written around that rule. We took one pop network's script apart in September 2026, and it did nothing until a real press landed somewhere on the page. Then it spent that press on its own tab, and Safari saw a tab you had asked for.</p>
<p>So the ad pages that reach you with the switch on arrive in one of these ways:</p>
<ul>
<li>A tab opened with your tap. The page lays a transparent layer over itself, or listens for any press at all, and opens the ad as if you had clicked a link to it.</li>
<li>A redirect. The page sends the tab you are reading to another address, which is a trip to a new page and no pop-up at all.</li>
<li>A swapped link. A link changes its address between the moment your finger lands and the moment it lifts.</li>
<li>A pop-under. A new tab opens behind the one you are reading, and you find it only when you close the page in front.</li>
</ul></section>
<section><h2>What each Safari setting covers</h2>
<p>Every setting here is free and worth turning on. None of them checks what your tap was aimed at, which is the gap the ad pages above use.</p></section>
{settings}
<section><p>Sources:{ext(SAFARI_GUIDE, "Block pop-ups in Safari on iPhone")}, {ext(MAC_POPUPS, "Allow or block pop-ups in Safari on Mac")}, {ext(SAFARI_ARTICLE, "Block pop-up ads and windows in Safari")}, {ext(IPHONE_DISTRACTIONS, "Hide distractions when browsing")} and {ext(IPHONE_EXTENSIONS, "Get extensions")}, all Apple, read {READ}.</p></section>
<section><h2>If pop-ups keep coming on a Mac</h2>
<p>Apple's Mac guide says that if you block pop-ups on a site and still see them there, you may have unwanted software on the Mac. The steps in Apple's article:</p>
<ul>
<li>Update macOS, or restart the Mac if it is already up to date. macOS removes known malware when it restarts.</li>
<li>Look in the Applications folder for apps you do not remember installing, and delete them.</li>
<li>In Safari, open Settings, then Extensions, and turn off or remove any extension you do not need.</li>
<li>To stop Safari reopening last session's windows and tabs, quit it, then hold Shift while you open it again.</li>
</ul>
<p>Pop-ups on the Lock Screen or in Notification Center are something else: they are notifications from a website you once clicked Allow on. Apple's {ext(SAFARI_ARTICLE, "article on pop-ups")} links to the steps for managing them on a Mac.</p></section>
<section><h2>How to close one safely</h2>
<p>Apple warns that some pop-up ads draw a fake close button. If you are not sure, leave the ad alone and close the tab, or type a new address in the search field and go somewhere else. On iPhone, tap the top of the screen if the search field has gone.</p></section>
<section><h2>What stops the rest</h2>
<p>A content blocker such as 1Blocker, AdGuard or Ghostery stops known ad and tracker addresses from loading. When the pop network's script is on its list, the script never runs and never gets your tap. 1Blocker's own App Store listing states the limit: "not all ads can be blocked", because some sites use techniques Safari content blockers cannot reach.</p>
<p>Undirect watches the tap. On a site where you switch it on, it removes an invisible layer before your tap lands, puts back a link that changed while you pressed, and lets a new tab open only where your press pointed. If a redirect rides your tap, the tab is sent back and that address is blocked in Safari, so the next try never loads. The list in its popup shows every address the page tried, blocked or not. It costs {cost(price)}, with no subscription, and needs iOS 26.2 or macOS 15 or later. It does not block ads or trackers, so it sits beside a content blocker instead of replacing one.</p>
<div class="cta-row">{badge}</div>
<p>Compare <a href="/safari-popup-blockers/">seven pop-up and redirect blockers with prices</a>, or <a href="/demo/">try Undirect on the demo sites</a>, made-up pages that misbehave on purpose.</p></section>""",
    }


def stop_new_tabs(price, badge):
    return {
        "title": "How to stop Safari opening new tabs by itself on iPhone, iPad and Mac",
        "description": "Find out whether a page, an extension or Safari itself is opening the tabs, change the right settings on iPhone, iPad and Mac, and stop the tabs a page opens when you tap.",
        "h1": "How to stop Safari opening new tabs by itself",
        "sub": "On iPhone, iPad and Mac. The fix depends on what is opening the tabs, and when they appear tells you that.",
        "body": f"""<section><h2>What is opening the tabs</h2>
<ul>
<li>A tab that appears right after you tap something on a page, often behind the page you are reading, was opened by the page. When it hides behind, it is called a pop-under.</li>
<li>Tabs that open with no tap at all, or on every site you visit, point to an extension or, on a Mac, to unwanted software.</li>
<li>Old tabs that come back when Safari starts are Safari restoring your last session.</li>
</ul></section>
<section><h2>On iPhone and iPad</h2>
<p>Open Settings, tap Apps, then Safari, and turn on Block Pop-ups. That stops a page opening a window without a tap.</p>
<p>In the same screen, tap Extensions and read the list. Apple's guide asks you to check the extensions you have installed and make sure you know what they do, so turn off any you do not recognise. To turn one off for a single site, tap the page menu at the left of the address bar in Safari, then Manage Extensions.</p>
<p>Open Links, also under Settings, Apps, Safari, decides what happens to a link you open in a new tab. Apple describes In Background as the way to stay on the current page when you do that. It is a choice about your own links and blocks nothing. Sources: {ext(SAFARI_GUIDE, "Block pop-ups")}, {ext(IPHONE_EXTENSIONS, "Get extensions")} and {ext(IPHONE_TABS, "Open and close tabs")}, Apple's iPhone User Guide.</p></section>
<section><h2>On a Mac</h2>
<p>In Safari, choose Safari, then Settings, then Websites, and click Pop-up Windows at the bottom of the list on the left. Set "When visiting other websites" to Block, or to Block and Notify if you would like to see what was stopped and open it yourself. A site listed under Configured Websites keeps its own setting.</p>
<p>The Tabs pane has two settings that change where a new tab shows up without stopping it. "Open pages in tabs instead of windows" chooses between a tab and a window. "When a new tab or window opens, make it active" brings the new one to the front; with it off, the new tab stays behind the page you are reading.</p>
<p>If tabs open on their own with no tap, check the Extensions pane in Safari's settings and the Applications folder for anything you did not install, and update macOS, which removes known malware when it restarts. To open Safari without last session's tabs, quit it and hold Shift while you open it again. Sources: {ext(MAC_POPUPS, "Allow or block pop-ups")}, {ext(MAC_TABS, "Change Tabs settings")} and {ext(SAFARI_ARTICLE, "Block pop-up ads and windows in Safari")}, Apple, read {READ}.</p></section>
<section><h2>Tabs a page opens when you tap</h2>
<p>No setting above stops this one. Browsers allow a window opened in direct response to your tap ({ext(MDN_OPEN, "MDN, Window.open()")}), since a link that opens in a new tab works the same way. A page that waits for your tap can open its ad tab, and Block Pop-ups lets it through.</p>
<p>It takes a Safari extension. Three are built around tabs:</p>
<ul>
<li>{ext(TAB_BLOCKER, "Tab Blocker")} is free and does nothing until you switch it on for a site; from then on it stops that site opening new tabs. iOS 16 or later.</li>
<li>{ext(TABGUARD, "TabGuard")} is free and has three modes: Block All, Smart Mode, which its listing says allows your clicks and blocks scripts, and Allow All. iOS 17 or later.</li>
<li>Undirect lets a new tab open only where your press pointed, so a tab aimed at an ad is stopped even when your own tap set it off. It also removes the invisible layers that catch taps, sends back a redirect that rides one, and lists every address the page tried. It costs {cost(price)} and needs iOS 26.2 or macOS 15 or later.</li>
</ul>
<p>Tab Blocker and TabGuard cost nothing and run on older iPhones, so if a couple of sites bother you, try one of them first. Undirect is for the tab that comes from a tap you meant for something else, on a site where you still want ordinary links and sign-in windows to work.</p>
<div class="cta-row">{badge}</div>
<p>All seven options, with prices, are on <a href="/safari-popup-blockers/">Safari pop-up and redirect blockers compared</a>. You can also <a href="/demo/">try Undirect on the demo sites</a> before you buy.</p></section>""",
    }


def blockers_compared(price, badge):
    undirect_price = cost(price).capitalize() if price else "Paid once"
    overview = table(["Price", "What its listing says it blocks", "Runs on", "Ratings"], [
        ('<a href="#safari">Safari\'s own settings</a>', "Free, built in",
         "Pop-up windows a page opens without a tap; warns about fraudulent websites", "iPhone, iPad, Mac", "Part of Safari"),
        ('<a href="#1blocker">1Blocker</a>', "Free for one category; Premium $2.99 a month, $14.99 a year or $39.99 once",
         "Ads, trackers, annoyances such as cookie notices and chat pop-ups, adult sites", "iOS 16, macOS 13, visionOS", "13,137, average 4.5"),
        ('<a href="#adguard">AdGuard</a>', "Free; Pro sold in the app, from $1.99",
         "Banners, pop-ups, autoplay videos and ads, YouTube included; trackers; DNS filtering beyond Safari",
         "iOS 15; Mac through AdGuard Mini, a separate app", "20,537, average 4.4"),
        ('<a href="#ghostery">Ghostery</a>', "Free; optional contributions",
         "Ads and pop-ups, YouTube and Facebook included; trackers; cookie consent pop-ups", "iOS 18.7, macOS 14.6", "214, average 4.3"),
        ('<a href="#tabguard">TabGuard</a>', "Free",
         "Pop-up windows, links that force a new tab, pop-unders, redirect tricks", "iOS 17", "2, average 3.0"),
        ('<a href="#tab-blocker">Tab Blocker</a>', "Free",
         "New tabs, on the sites you switch it on for", "iOS 16", "6, average 3.7"),
        ('<a href="#undirect">Undirect</a> (ours)', undirect_price,
         "Invisible layers that catch a tap, links rewritten mid-tap, tabs and windows you did not ask for, redirects that ride your tap",
         "iOS 26.2, macOS 15", "None yet"),
    ], first_col="Option")
    return {
        "title": "7 Safari pop-up and redirect blockers compared, with prices",
        "description": f"Safari's own settings, 1Blocker, AdGuard, Ghostery, TabGuard, Tab Blocker and Undirect: price, what each blocks and where each is the better pick, from App Store listings read {READ}.",
        "h1": "Safari pop-up and redirect blockers compared",
        "sub": f"Seven ways to stop pages opening ads, tabs and redirects in Safari on iPhone, iPad and Mac. We make Undirect, one of the seven, so every fact about the others comes from Apple's pages or the app's own App Store listing, read on {READ}, and each entry says where it beats Undirect.",
        "wide": True,
        "body": f"""{overview}
<section><p>Prices and ratings are what each App Store listing showed in dollars on {READ}. They differ from one country's store to another and they change, so check the listing before you buy. We have not run the six others side by side on the same pages; this is what their makers say they do.</p></section>
<section><h2>Which one fits</h2>
<ul>
<li>If ads, banners, trackers or cookie notices are the problem, use a content blocker: 1Blocker, AdGuard or Ghostery. All three are free to start.</li>
<li>If sites keep opening new tabs, start with a free tab blocker, TabGuard or Tab Blocker, or use Undirect.</li>
<li>If your taps land on ad pages through a layer you cannot see, or links change under your finger, use Undirect. Of the seven listings, it is the only one that says it removes an invisible layer before your tap lands and puts back a link rewritten mid-tap.</li>
<li>If you want nothing installed, turn on Safari's own settings, which stop pop-up windows a page opens without a tap.</li>
</ul>
<p>A content blocker and a tab or tap guard do different jobs, so you can run one of each.</p></section>
<section id="safari"><h2>Safari's own settings</h2>
<p>Block Pop-ups on iPhone and iPad (Settings, Apps, Safari) and Pop-up Windows on a Mac (Safari, Settings, Websites) stop windows a page opens without your tap. On a Mac you set it per website: Allow, Block, or Block and Notify. Fraudulent Website Warning warns you when you visit a fraudulent site. Apple's {ext(SAFARI_ARTICLE, "pop-up article")} also tells you to close a tab instead of tapping a close button that may be fake.</p>
<h3>Where it beats Undirect</h3>
<p>It costs nothing and is already installed. Block and Notify on a Mac lets you open a pop-up you wanted from the address bar.</p>
<p>A window opened on your tap counts as one you asked for, so it gets through; <a href="/safari-popups-still-open/">why Safari still opens ads with Block Pop-ups on</a> explains how pages use that.</p></section>
<section id="1blocker"><h2>1Blocker</h2>
<p>1Blocker is a content blocker for iPhone, iPad, Mac and Apple Vision Pro, made since 2015. It gives Safari filter lists for ads, more than 50,000 trackers, annoyances such as cookie notices, marketing widgets and chat pop-ups, and adult sites, and Safari does the blocking; the listing says the app has no access to web pages. It is free with one category on at a time, such as Block Ads. Premium, which adds custom rules, costs $2.99 a month, $14.99 a year or $39.99 once, and one purchase covers every device ({ext(ONEBLOCKER, "App Store")}, {ext(ONEBLOCKER_SITE, "1blocker.com")}).</p>
<h3>Where it beats Undirect</h3>
<p>It blocks ads and trackers, which Undirect leaves alone, it is free to start, it runs on iOS 16, and it has 13,137 ratings averaging 4.5. Its listing is open about its limit: "not all ads can be blocked", because some sites use techniques Safari content blockers cannot reach. <a href="/compare/#1blocker">Undirect vs 1Blocker</a> goes further.</p></section>
<section id="adguard"><h2>AdGuard</h2>
<p>AdGuard Ad Blocker for Safari is a content blocker for iPhone and iPad with more than 50 filter lists to choose from, and its DNS filtering also blocks requests outside Safari. Its listing names banners, pop-ups, autoplay videos and ads, YouTube included, plus tracking scripts. Safari blocking is free with no account; Pro adds advanced YouTube blocking, DNS protection for apps, custom rules and security filters, with a 7-day trial, and the listing shows purchases from $1.99 to $65.99. On a Mac it is a separate app, {ext(ADGUARD_MINI, "AdGuard Mini")}, also free with a Pro upgrade ({ext(ADGUARD, "App Store")}, {ext(ADGUARD_SITE, "adguard.com")}).</p>
<h3>Where it beats Undirect</h3>
<p>Free ad and tracker blocking, filtering in other apps through DNS, support back to iOS 15, open source code, and 20,537 ratings averaging 4.4. <a href="/compare/#adguard">Undirect vs AdGuard</a> goes further.</p></section>
<section id="ghostery"><h2>Ghostery</h2>
<p>Ghostery's Safari app, Ghostery AdBlocker for Privacy, runs on iPhone, iPad and Mac. Its listing says it blocks ads and pop-ups on all websites, YouTube and Facebook included, stops trackers, removes cookie consent pop-ups by itself and shows which trackers each site runs. It is free and open source; the in-app purchases are optional contributions ({ext(GHOSTERY, "App Store")}).</p>
<h3>Where it beats Undirect</h3>
<p>It is free, it clears cookie consent pop-ups, which Undirect does not touch, and it shows you who is tracking you on each site. It needs iOS 18.7 or macOS 14.6 and has 214 ratings averaging 4.3.</p></section>
<section id="tabguard"><h2>TabGuard</h2>
<p>TabGuard is a Safari extension built for tabs. Its listing says it blocks pop-up windows opened with <code>window.open()</code>, links that force a new tab, pop-unders and "sneaky redirect tricks". It has three modes: Block All; Smart Mode, which allows your clicks and blocks tabs a script opens; and Allow All. You can allow or block single sites, and it shows a notice on the page and keeps a history of what it blocked. Everything runs on the device ({ext(TABGUARD, "App Store")}).</p>
<h3>Where it beats Undirect</h3>
<p>It is free and runs on iOS 17. Block All stops every new tab a site tries, which suits a site where you never want one. It is at version 1.0 from December 2025, in English only, with 2 ratings averaging 3.0.</p></section>
<section id="tab-blocker"><h2>Tab Blocker</h2>
<p>Tab Blocker stops websites opening new tabs in Safari on the sites you switch it on for, and does nothing elsewhere. You turn it on from its button in Safari and reload the page. No servers, accounts or analytics ({ext(TAB_BLOCKER, "App Store")}).</p>
<h3>Where it beats Undirect</h3>
<p>It is free, runs on iOS 16, and has one switch per site with nothing else to learn. It is at version 1.0 from March 2026, with 6 ratings averaging 3.7.</p></section>
<section id="undirect"><h2>Undirect</h2>
<p>This is the one we make, a Safari extension for iPhone, iPad and Mac that stops a page taking your tap. On a site where you switch it on, it removes an invisible layer before your tap lands, puts back a link rewritten between the press and the release, and lets a new tab open only where your press pointed. A window opens when a site asks for one at a size and its address leads back to the page, the way a sign-in does. If a redirect rides your tap, the tab is sent back and the address is blocked in Safari's content blocking, so the next attempt never loads.</p>
<p>The popup lists every address the page tried, blocked or not, and you can allow or block each one on that site or everywhere. It costs {cost(price)}, with no subscription or in-app purchase, and one purchase covers iPhone, iPad and Mac. It runs without an account, analytics or a server, and the {ext(SOURCE, "source code")} is public.</p>
<div class="cta-row">{badge}</div>
<h3>Where the others beat it</h3>
<p>It does not block ads, trackers or cookie notices. It costs money where the others are free to start. It needs iOS 26.2 or macOS 15, newer than any other entry here, and it is too new to have ratings. It judges a trip off the site by the tap behind it, so a page that redirects as it loads, with no tap at all, is left alone unless you have blocked that address. You can <a href="/demo/">try it on the demo sites</a> before you decide.</p></section>
<section><h2>A name you may see that is not a blocker</h2>
<p>RedirectWeb comes up in searches for a Safari redirect blocker. Its listing describes a URL router: it sends a link to a different address by rules you write, for example Google Maps links to Apple Maps. It does not say it blocks pop-ups or redirects ({ext(REDIRECTWEB, "App Store")}).</p></section>""",
    }


def compare(price, badge):
    undirect_price = f"{price}, paid once" if price else "Paid once"
    rows = [
        ("What it is", "A switch inside iOS, and a per-site setting on Mac", "App with a Safari content blocker", "App with a Safari content blocker and DNS filtering", "App with a Safari extension"),
        ("Price", "Free, part of Safari", "Free for one blocking category at a time. Premium: $2.99 a month, $14.99 a year or $39.99 once", "Free to use. Pro adds custom rules, advanced YouTube blocking and security filters, with a 7-day trial", undirect_price),
        ("What it goes after", "Pop-up windows a page opens without a tap", "Ads, trackers and page elements, by filter list", "Banners, pop-ups, autoplay videos, ads and trackers, by filter list", "Invisible click layers, rewritten links, and tabs, windows or redirects a page sets off with your tap"),
        ("Where you control it", "One switch on iPhone and iPad; per website on Mac: Allow, Block, or Block and Notify", "Allowlist a site from the Safari extension; rules and filters in the app", "Allowlists, blocklists and your own rules in the app", "Per destination, for one site or everywhere; the guard is off on a site until you switch it on"),
        ("Shows what a page tried", "Block and Notify on Mac shows a blocked pop-up in the address bar", "Its site says the Mac app shows how many companies tried to track you", "Statistics of blocked ads and trackers", "Lists every address a page tried to open, blocked or not"),
        ("Devices", "iPhone, iPad and Mac", "iPhone, iPad, Mac and Apple Vision Pro, synced by iCloud; iOS 16 or later", "iPhone and iPad, iOS 15 or later; Mac through AdGuard Mini", "iPhone, iPad and Mac; iOS 26.2 or macOS 15 or later"),
        ("Privacy as the maker describes it", "Part of Safari", "Says it has no access to webpages and does not track you", "Says no account is needed; open source", "Runs without an account, analytics or a server; source code public"),
    ]
    head = ["Safari Block Pop-ups", ext(ONEBLOCKER, "1Blocker"), ext(ADGUARD, "AdGuard"), "Undirect"]
    return {
        "title": "Undirect vs 1Blocker vs AdGuard: what each stops in Safari",
        "description": "Undirect, 1Blocker, AdGuard and Safari's Block Pop-ups side by side: price, what each blocks, and what each listing says about pop-ups and redirects on iPhone, iPad and Mac.",
        "h1": "Undirect vs 1Blocker vs AdGuard",
        "sub": f"Three different kinds of tool get called a pop-up blocker, and Undirect is not an ad blocker. Facts below come from Apple's support pages and each product's own App Store listing, read on {READ}.",
        "wide": True,
        "body": f"""{table(head, rows)}
<section id="1blocker"><h2>Undirect vs 1Blocker</h2>
<p>1Blocker is free with one blocking category on at a time, for example Block Ads. Premium turns on custom rules for blocking any address or hiding any page element, and costs $2.99 a month, $14.99 a year or $39.99 once.</p>
<p>The two work at different moments. 1Blocker hands Safari its lists before a page loads, and its listing says it does not modify web pages in any way. Undirect runs in the page and acts when you tap: it removes the layer that would catch the tap and checks that a new tab goes where you pressed. 1Blocker's listing says nothing about redirects or tabs opened with your tap, and it says "not all ads can be blocked" with Safari's content blocking. Undirect blocks no ads at all, so the two cover different things and can run together.</p></section>
<section id="adguard"><h2>Undirect vs AdGuard</h2>
<p>AdGuard Ad Blocker for Safari is free for Safari ad blocking, with Pro sold in the app; the listing shows purchases from $1.99 to $65.99. Its listing names pop-ups among the things it blocks, along with banners, autoplay videos, YouTube ads and trackers, and its DNS filtering reaches other apps too, which Undirect never does. On a Mac it is a separate free app, {ext(ADGUARD_MINI, "AdGuard Mini")}.</p>
<p>Undirect handles what a page does with your tap. It lists every address the page tried and lets you allow or block each one, on that site or everywhere. If you already run AdGuard and pages still open where you did not tap, that is the part Undirect covers.</p></section>
<section><h2>Where the others do more</h2>
<p>1Blocker and AdGuard block ads, trackers and page clutter, which Undirect does not touch. If banners, video ads or tracking are what bother you, use one of them. Safari's own switch costs nothing and covers pop-up windows, so there is no reason to leave it off.</p></section>
<section><h2>What Undirect does not do</h2>
<p>It does not hide ads, banners or cookie notices, and it does not block trackers. It works in Safari only, on the sites where you have switched it on, and it needs iOS 26.2 or later. It also costs money where the others have a free tier. You can run a content blocker beside it, though we have not tested every combination.</p></section>
<section><h2>Where it fits</h2>
<p>Undirect is for the page that takes your tap: the layer you cannot see, the link that changes under your finger, the tab you did not open. For that, read <a href="/stop-safari-redirects/">how to stop Safari redirects and pop-ups on iPhone</a>, see <a href="/safari-popup-blockers/">seven pop-up and redirect blockers compared</a>, including Ghostery, TabGuard and Tab Blocker, or <a href="/demo/">try the demo sites</a> before you buy.</p>
<div class="cta-row">{badge}</div></section>
<section><h2>Sources</h2>
<p>{ext(SAFARI_GUIDE, "Apple: Block pop-ups in Safari on iPhone")}; {ext(MAC_POPUPS, "Apple: Allow or block pop-ups in Safari on Mac")}; {ext(SAFARI_ARTICLE, "Apple: Block pop-up ads and windows in Safari")}; {ext(ONEBLOCKER, "1Blocker on the App Store")} and {ext(ONEBLOCKER_SITE, "1blocker.com")}; {ext(ADGUARD, "AdGuard Ad Blocker for Safari on the App Store")}; Undirect's own App Store page. First read {FIRST_READ}, read again {READ}. Prices are the App Store's dollar prices, which differ by country and change, so check the listings.</p></section>""",
    }


# slug -> footer label, what the page holds (for llms.txt), first published, last changed, builder
PAGES = {
    "stop-safari-redirects/": dict(label="Stop Safari redirects", published="2026-11-07", modified="2026-11-20",
                                   note="what Safari's Block Pop-ups setting covers, what it misses, and what covers the rest",
                                   build=stop_safari_redirects),
    "safari-popups-still-open/": dict(label="Pop-ups still opening", published="2026-11-20", modified="2026-11-20",
                                      note="why ad pages still open with Block Pop-ups on, what each Safari setting covers on iPhone, iPad and Mac, and what stops the rest",
                                      build=popups_still_open),
    "stop-safari-new-tabs/": dict(label="Stop new tabs", published="2026-11-20", modified="2026-11-20",
                                  note="how to stop Safari opening new tabs by itself on iPhone, iPad and Mac, by what is opening them",
                                  build=stop_new_tabs),
    "safari-popup-blockers/": dict(label="Pop-up blockers compared", published="2026-11-20", modified="2026-11-20",
                                   note="Safari's settings, 1Blocker, AdGuard, Ghostery, TabGuard, Tab Blocker and Undirect, with prices, what each blocks and where each beats Undirect",
                                   build=blockers_compared),
    "compare/": dict(label="Undirect vs 1Blocker and AdGuard", published="2026-11-07", modified="2026-11-20",
                     note="Undirect beside Safari's Block Pop-ups, 1Blocker and AdGuard, with what Undirect does not do",
                     build=compare),
}
SLUGS = list(PAGES)
LABEL = {s: p["label"] for s, p in PAGES.items()}
BUILDERS = {s: p["build"] for s, p in PAGES.items()}
