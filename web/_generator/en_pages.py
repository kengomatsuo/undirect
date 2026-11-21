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
<p>Undirect watches the tap. On a site where you switch it on, it removes an invisible layer before your tap lands, puts back a link that changed while you pressed, and lets a new tab open only where your press pointed. If a redirect rides your tap, the tab is sent back and that address is blocked in Safari, so the next try never loads. The list in its popup shows every address the page tried, blocked or not. It costs {cost(price)}, with no subscription, for iPhone, iPad and Mac.</p>
<p>It pairs with a content blocker such as 1Blocker, AdGuard or Ghostery, which stops known ad and tracker addresses from loading. The two cover different things: 1Blocker's own listing says "not all ads can be blocked", and the ones that get through are the ones Undirect is built for.</p>
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
<p>It takes a Safari extension that knows where your tap was aimed.</p>
<p>Undirect lets a new tab open only where your press pointed, so a tab aimed at an ad is stopped even when your own tap set it off, while the links you open in a new tab and sign-in windows still work. It also removes the invisible layers that catch taps, sends back a redirect that rides one, and lists every address the page tried. It costs {cost(price)} for iPhone, iPad and Mac.</p>
<p>Two free extensions handle tabs more bluntly: {ext(TAB_BLOCKER, "Tab Blocker")} stops every new tab on a site you switch it on for, and {ext(TABGUARD, "TabGuard")} blocks tabs a script opens on its own, while its Smart Mode lets through a tab opened by your click.</p>
<div class="cta-row">{badge}</div>
<p>Seven options, with prices, are on <a href="/safari-popup-blockers/">Safari pop-up and redirect blockers compared</a>. You can also <a href="/demo/">try Undirect on the demo sites</a> before you buy.</p></section>""",
    }


def blockers_compared(price, badge):
    undirect_price = cost(price).capitalize() if price else "Paid once"
    overview = table(["Best for", "Price", "How it works", "Runs on"], [
        ('<a href="#undirect">Undirect</a> (ours)', "Taps that land on ad pages, links that change under your finger, tabs you did not open",
         f"{undirect_price}, one purchase for iPhone, iPad and Mac",
         "Watches each tap and lets the page go only where you pressed", "iPhone, iPad, Mac"),
        ('<a href="#1blocker">1Blocker</a>', "Ads, trackers and cookie notices",
         "Free for one category; Premium $2.99 a month, $14.99 a year or $39.99 once",
         "Filter lists of known ad and tracker addresses", "iPhone, iPad, Mac, Vision Pro"),
        ('<a href="#adguard">AdGuard</a>', "Ads, including YouTube, and filtering beyond Safari",
         "Free; Pro sold in the app", "Filter lists, plus DNS filtering for other apps", "iPhone, iPad; Mac through AdGuard Mini"),
        ('<a href="#ghostery">Ghostery</a>', "Seeing who tracks you on each site",
         "Free; optional contributions", "Filter lists and tracker reports", "iPhone, iPad, Mac"),
        ('<a href="#tabguard">TabGuard</a>', "Tabs a script opens on its own", "Free", "Blocks new tabs and windows by mode", "iPhone, iPad"),
        ('<a href="#tab-blocker">Tab Blocker</a>', "A site where you never want a new tab", "Free", "One switch per site that stops all new tabs", "iPhone, iPad"),
        ('<a href="#safari">Safari\'s own settings</a>', "Windows a page opens with no tap at all", "Free, built in",
         "Blocks a window that was not opened by your tap", "iPhone, iPad, Mac"),
    ], first_col="Option")
    return {
        "title": "Safari pop-up and redirect blockers compared, with prices",
        "description": f"Undirect, 1Blocker, AdGuard, Ghostery, TabGuard, Tab Blocker and Safari's own settings: what each stops, what it costs and which fits the problem you have, from App Store listings read {READ}.",
        "h1": "Safari pop-up and redirect blockers compared",
        "sub": "Most ad pages that get past Safari today ride on a tap you made. Here are seven tools, what each one actually stops, and which to use for the problem you have.",
        "wide": True,
        "body": f"""{overview}
<section><h2>Which one fits</h2>
<ul>
<li>Your tap lands on an ad page, a tab opens behind the one you are reading, or a link takes you somewhere it did not say: Undirect. Of the seven listings, it is the only one that says it removes an invisible layer before your tap lands and puts back a link rewritten mid-tap.</li>
<li>Banners, video ads, trackers or cookie notices are what bother you: a content blocker, 1Blocker, AdGuard or Ghostery.</li>
<li>One site opens tabs you never want, and you are happy to lose its new-tab links too: Tab Blocker.</li>
</ul>
<p>A content blocker and Undirect do different jobs, so most people who are tired of ad pages run one of each. Safari's own settings are free and worth switching on whatever else you use.</p></section>
<section id="undirect"><h2>Undirect</h2>
<p>We make Undirect, a Safari extension for iPhone, iPad and Mac built for the ad pages that come in through your own tap. On a site where you switch it on, it removes an invisible layer before your tap lands, puts back a link rewritten between the press and the release, and lets a new tab open only where your press pointed. Sign-in windows still open, because a window that asks for a size and leads back to the page is let through.</p>
<p>If a redirect rides your tap, the tab is sent back and that address is blocked in Safari, so the next attempt never loads. The popup lists every address the page tried, blocked or not, and you can allow or block each one on that site or everywhere.</p>
<p>It costs {cost(price)}: no subscription, no in-app purchase, and one purchase covers iPhone, iPad and Mac. It runs without an account, analytics or a server, and the {ext(SOURCE, "source code")} is public. It runs on iOS 26.2 and macOS 15 or later, and it works beside whatever content blocker you already use.</p>
<div class="cta-row">{badge}</div>
<p>You can <a href="/demo/">try it on the demo sites</a>, made-up pages that misbehave on purpose.</p></section>
<section><h2>Why pay when blockers are free</h2>
<p>The free tools here are good at what they target. Content blockers stop addresses that are on a list, and Safari stops windows a page opens with no tap. The pop networks we studied wait for a real press and spend it on their own tab, which is the one case neither of those checks ({ext(MDN_OPEN, "MDN: a window opened in response to user input is allowed")}). Undirect is built for that case, it costs {cost(price)} for every device you own, and you never pay again.</p></section>
<section id="1blocker"><h2>1Blocker</h2>
<p>A well-made content blocker for iPhone, iPad, Mac and Vision Pro, around since 2015. It gives Safari filter lists for ads, more than 50,000 trackers, cookie notices and chat pop-ups, and Safari does the blocking. Free with one category on at a time; Premium is $2.99 a month, $14.99 a year or $39.99 once ({ext(ONEBLOCKER, "App Store")}, {ext(ONEBLOCKER_SITE, "1blocker.com")}).</p>
<p>Good for: clearing ads and trackers off every site. Its listing says "not all ads can be blocked", since some pages use techniques Safari content blockers cannot reach. A pop script missing from its lists can still spend your tap on an ad tab, and that is where Undirect comes in. <a href="/compare/#1blocker">Undirect and 1Blocker side by side</a>.</p></section>
<section id="adguard"><h2>AdGuard</h2>
<p>A content blocker with more than 50 filter lists, and DNS filtering that reaches apps outside Safari. Its listing names banners, pop-ups, autoplay videos, YouTube ads and trackers. Safari blocking is free; Pro adds YouTube blocking, DNS protection and custom rules. On a Mac it is a separate app, {ext(ADGUARD_MINI, "AdGuard Mini")} ({ext(ADGUARD, "App Store")}, {ext(ADGUARD_SITE, "adguard.com")}).</p>
<p>Good for: ads everywhere, inside Safari and out. Like every filter-list blocker, it acts on addresses it knows, before the page runs; it does not look at where your tap was aimed. <a href="/compare/#adguard">Undirect and AdGuard side by side</a>.</p></section>
<section id="ghostery"><h2>Ghostery</h2>
<p>A free, open-source blocker for Safari on iPhone, iPad and Mac. Its listing says it blocks ads and pop-ups, YouTube and Facebook included, removes cookie consent pop-ups and shows which trackers each site runs ({ext(GHOSTERY, "App Store")}).</p>
<p>Good for: seeing and stopping trackers, at no cost. It needs iOS 18.7 or macOS 14.6, and like the other blockers here it works from filter lists rather than from where your tap was aimed.</p></section>
<section id="tabguard"><h2>TabGuard</h2>
<p>A free Safari extension for tabs, with three modes: Block All, Smart Mode, which its listing says allows your clicks and blocks tabs a script opens, and Allow All ({ext(TABGUARD, "App Store")}).</p>
<p>Good for: scripts that open tabs on their own. Smart Mode lets a tab through when your click opened it, and a tab opened with your click is exactly what pop networks wait for. It reached version 1.0 in December 2025.</p></section>
<section id="tab-blocker"><h2>Tab Blocker</h2>
<p>A free extension that stops a site opening new tabs once you switch it on there, and does nothing elsewhere ({ext(TAB_BLOCKER, "App Store")}).</p>
<p>Good for: a site where you never want a new tab. It stops every new tab on that site, the links you meant to open in one included.</p></section>
<section id="safari"><h2>Safari's own settings</h2>
<p>Block Pop-ups on iPhone and iPad (Settings, Apps, Safari) and Pop-up Windows on a Mac (Safari, Settings, Websites) stop windows a page opens without your tap, and Fraudulent Website Warning flags known fraudulent sites. Turn them on; they cost nothing. A window opened on your tap counts as one you asked for, which is how most ad pages get past them: <a href="/safari-popups-still-open/">why Safari still opens ads with Block Pop-ups on</a>.</p></section>
<section><h2>A name you may see that is not a blocker</h2>
<p>RedirectWeb comes up in searches for a Safari redirect blocker. Its listing describes a URL router that sends links where your rules say, for example Google Maps links to Apple Maps ({ext(REDIRECTWEB, "App Store")}).</p></section>
<section><h2>Stop the ad pages that ride your taps</h2>
<p>Undirect costs {cost(price)} for iPhone, iPad and Mac, and runs beside the blocker you already have.</p>
<div class="cta-row">{badge}</div>
<p>Sources: each app's own App Store listing and website, and Apple's support pages, read {READ}. Prices are US App Store prices, which differ by country and change.</p></section>""",
    }


def compare(price, badge):
    undirect_price = f"{price}, paid once" if price else "Paid once"
    rows = [
        ("Stops ad tabs opened with your tap", "Yes: a new tab opens only where you pressed", "Its listing does not say so", "Its listing does not say so", "No: a window opened on your tap is allowed"),
        ("Removes invisible layers that catch taps", "Yes, before your tap lands", "Not listed", "Not listed", "No"),
        ("Puts back a link rewritten mid-tap", "Yes", "Not listed", "Not listed", "No"),
        ("Blocks ads, banners and trackers", "Not its job: run it beside 1Blocker or AdGuard", "Yes, by filter list", "Yes, by filter list", "No"),
        ("Shows what a page tried", "Every address a page tried to open, blocked or not", "Its site says the Mac app shows how many companies tried to track you", "Statistics of blocked ads and trackers", "Block and Notify on Mac shows a blocked pop-up"),
        ("You decide per site", "Allow or block each address, on one site or everywhere", "Allowlist a site", "Allowlists, blocklists, your own rules", "Per website on Mac"),
        ("Works on iPhone, iPad and Mac", "Yes", "Yes, plus Vision Pro", "iPhone and iPad; Mac through AdGuard Mini", "Yes"),
        ("No account needed", "Yes; no analytics, no server, source public", "Yes", "Yes; open source", "Part of Safari"),
        ("Price", undirect_price + ", every device", "Free for one category; Premium $2.99 a month, $14.99 a year or $39.99 once", "Free; Pro sold in the app", "Free"),
    ]
    head = ["Undirect", ext(ONEBLOCKER, "1Blocker"), ext(ADGUARD, "AdGuard"), "Safari Block Pop-ups"]
    return {
        "title": "Undirect vs 1Blocker vs AdGuard: what each stops in Safari",
        "description": "1Blocker and AdGuard block ads by filter list. Undirect stops the ad pages that ride your tap. What each one stops in Safari on iPhone, iPad and Mac, and why many people run two.",
        "h1": "Undirect vs 1Blocker vs AdGuard",
        "sub": "1Blocker and AdGuard stop ads they know about. Undirect stops the page that takes your tap: the layer you cannot see, the link that changes under your finger, the tab you did not open.",
        "wide": True,
        "body": f"""{table(head, rows)}
<section><h2>Two different jobs</h2>
<p>A content blocker hands Safari a list of ad and tracker addresses before a page loads, and Safari refuses them. That clears banners and trackers well, and it is why 1Blocker and AdGuard are worth having. It cannot see what a page does with your tap, and pop networks are built around that: the script we took apart in September 2026 did nothing until a real press landed, then spent the press on its own tab. 1Blocker's own listing says "not all ads can be blocked" with Safari's content blocking.</p>
<p>Undirect runs in the page and acts at the moment you press. It removes the layer that would catch the tap, puts back a link that changed while you pressed, and lets a new tab open only where your press pointed. If a redirect rides your tap, the tab is sent back and the address is blocked in Safari, so the next try never loads.</p></section>
<section id="1blocker"><h2>Undirect and 1Blocker</h2>
<p>1Blocker is a polished content blocker for every Apple device, free with one category on at a time and $14.99 a year or $39.99 once for Premium. Keep it for ads and trackers. Add Undirect for the pages that still send you somewhere you did not choose: the two never touch the same thing, so they do not get in each other's way.</p></section>
<section id="adguard"><h2>Undirect and AdGuard</h2>
<p>AdGuard is free for Safari ad blocking, with Pro sold in the app, and its DNS filtering reaches apps outside Safari. If you already run it and pages still open where you did not tap, that is the part Undirect covers. Undirect's popup lists every address the page tried, so you can see exactly what it stopped and allow anything you want.</p></section>
<section><h2>Paid once, for every device</h2>
<p>Undirect costs {cost(price)}. No subscription and no in-app purchase, and one purchase covers iPhone, iPad and Mac. It runs without an account, analytics or a server, and its {ext(SOURCE, "source code")} is public. It is off on a site until you press its toolbar button there, so it only acts where you asked it to.</p>
<div class="cta-row">{badge}</div>
<p>See all seven tools on <a href="/safari-popup-blockers/">Safari pop-up and redirect blockers compared</a>, read <a href="/stop-safari-redirects/">how to stop Safari redirects on iPhone</a>, or <a href="/demo/">try Undirect on the demo sites</a>.</p></section>
<section><h2>Sources</h2>
<p>{ext(SAFARI_GUIDE, "Apple: Block pop-ups in Safari on iPhone")}; {ext(MAC_POPUPS, "Apple: Allow or block pop-ups in Safari on Mac")}; {ext(MDN_OPEN, "MDN: Window.open()")}; {ext(ONEBLOCKER, "1Blocker on the App Store")} and {ext(ONEBLOCKER_SITE, "1blocker.com")}; {ext(ADGUARD, "AdGuard Ad Blocker for Safari on the App Store")}; Undirect's own App Store page. First read {FIRST_READ}, read again {READ}. Prices are US App Store prices, which differ by country and change.</p></section>""",
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
    "safari-popup-blockers/": dict(label="Pop-up blockers compared", published="2026-11-20", modified="2026-11-21",
                                   note="Undirect, 1Blocker, AdGuard, Ghostery, TabGuard, Tab Blocker and Safari's settings, with prices, what each stops and which fits which problem",
                                   build=blockers_compared),
    "compare/": dict(label="Undirect vs 1Blocker and AdGuard", published="2026-11-07", modified="2026-11-21",
                     note="Undirect beside 1Blocker, AdGuard and Safari's Block Pop-ups: content blockers stop known ads, Undirect stops the page that takes your tap",
                     build=compare),
}
SLUGS = list(PAGES)
LABEL = {s: p["label"] for s, p in PAGES.items()}
BUILDERS = {s: p["build"] for s, p in PAGES.items()}
