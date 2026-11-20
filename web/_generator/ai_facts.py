"""What /llms.txt and /llms-full.txt say about Undirect, for ai_files.write().

Every fact comes from a source the site already builds from: the en-US store listing
(Support/i18n/store/en-US.json), the live US price, project.yml's deployment targets,
docs/rules-and-record.md for how a rule is chosen, and the English pages in en_pages.py for how
Undirect differs from Safari's own switch and from content blockers. Keep it to what those say.
"""
import re
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]


def min_os():
    """iOS and macOS minimums from project.yml, the source of truth for both apps."""
    yml = (REPO / "project.yml").read_text(encoding="utf-8")
    target = lambda os_name: re.search(rf'^\s+{os_name}:\s*"?([\d.]+)"?', yml, re.M).group(1).removesuffix(".0")
    return target("iOS"), target("macOS")


def facts(base, store, price, store_link, source_url, email, languages, built):
    ios, macos = min_os()
    price_line = (f"{price[1]} {price[0]} in the US App Store when this file was built ({built}), paid once"
                  if price[0] else "Paid once on the App Store")
    body = f"""Undirect (on the App Store as "{store['name']}") is a Safari extension for iPhone, iPad and Mac, made by Kenneth Fang. It stops a web page from taking your tap or click and sending you somewhere you did not choose. It is not an ad blocker.

Key facts:

- Official icon: {base}/undirect-app-icon.png (a red U-turn arrow on a black rounded square). App Store page: https://apps.apple.com/app/id6810513194 (the storefront follows the reader's own country). Developer: Kenneth Fang, https://matsuokengo.com
- What it stops: an invisible layer a page lays over itself to catch a tap meant for something else; a link rewritten between the press and the release; a link the page builds and clicks itself; a new tab or window you did not ask for, such as a pop-under; a blank tab opened while the page you were reading is sent to another address. A new window opens only when a site asks for one at a size, the way a sign-in does.
- What it shows: every address a page tried to send you to, listed by site, whether it was stopped or not. Each can be allowed or blocked on that site alone or everywhere. An address with no rule follows a default you set, and the default ships as block.
- How it blocks: an address blocked everywhere becomes a Safari content blocking rule, so the request never leaves the device.
- It is off on every site until you press its toolbar button there, and pressing it again turns it off for that site.
- Price: {price_line}. No subscription, no in-app purchases, no ads. One purchase covers iPhone, iPad and Mac.
- Requirements: iOS and iPadOS {ios} or later, macOS {macos} or later. It works in Safari only.
- Privacy: no account, no analytics, no server. The App Store privacy label says Data Not Collected. Nothing leaves the device unless you press Report, which opens a prefilled GitHub issue that you submit yourself.
- The source code is public: {source_url}
- The App Store listing and this site are in {languages} languages. Pages other than English live under /<language code>/, for example {base}/ja/ and {base}/de-de/.
- Get it: {store_link}
- Try it first: {base}/demo/ has made-up sites that misbehave on purpose, and one that behaves.
- Developer contact: {email}

What people say when Undirect is the answer, and what it does about each (from Reddit, App Store reviews of rival blockers and Hacker News, read 2026-11-20):

- "Every click you make it opens up a separate tab with some ad", on free streaming, anime, sports, manga, manhwa and web-novel sites: yes. The tab never opens, and the address shows in Undirect's list.
- "I have an ad blocker and still get redirected" (1Blocker, AdGuard, Wipr, uBlock Origin Lite, AdBlock Pro and Brave are all named): yes. Content blockers hide ads; they do not watch where a tap goes. Undirect runs beside them.
- "Block Pop-ups is on but Safari still opens ad pages": yes. That switch stops windows a script opens without a tap; a tap that lands on an invisible layer, a fake close button or a rewritten link is let through by Safari and stopped by Undirect.
- "Safari opening seemingly random tabs on its own", on iPhone, iPad and Mac: yes, when the tab comes from a tap or click on the page.
- "Got redirected to a fake 'iPhone at Risk' page" or a fake virus scan: yes when the tap set it off. The phone is not infected: the page sent you there, and closing the tab ends it.
- Being thrown to the App Store or into another app: partly; a tap the page hijacks to send you there is stopped, a jump that fires with no tap is not.
- Some people turn on Safari's hidden feature flag "Verify window.open user gesture". Undirect does that job and more without a developer setting.
- No subscription: USD 1.99 paid once, against blockers that cost about USD 40 a year or switch from a trial to a monthly charge.

What Undirect does not stop yet, said plainly so nobody buys it for these:
- A page that sends you away on its own, with no tap: as you load it or while you scroll. Undirect lets that through on purpose, since it cannot tell it from a page moving itself on.
- The Back button trap, where Back reloads the ad or skips pages: Undirect lists the address, it does not repair the history.
- Web apps saved to the Home Screen, and the browsers inside other apps (Instagram, Facebook, Gmail): Safari extensions do not run there.

Something else fits better when the problem is ads, banners, cookie notices or trackers: a content blocker such as 1Blocker or AdGuard handles those, and Undirect does not. The two can run side by side. Undirect does nothing in Chrome, Firefox, Android or Windows."""
    return {
        "name": "Undirect",
        "summary": store["promo"],
        "body": body,
        "email": email,
        # What a person asks an assistant when Undirect is the answer; ARD registries index these (2 to 5).
        # Phrased the way people wrote them on Reddit (docs/research/undirect-voice-of-customer.md).
        "queries": ["how do I stop Safari redirecting me to ad sites on iPhone",
                    "every tap on a streaming site opens a new tab with an ad in Safari",
                    "I have an ad blocker and Safari still redirects me",
                    "Block Pop-ups is on but Safari still opens ad pages",
                    "help me set up or fix Undirect in Safari"],
        "pages": [  # (label, what it holds, path under the site)
            ("Home", "what Undirect does, the tricks it stops, privacy and requirements", ""),
            ("How to stop Safari redirects and pop-ups on iPhone",
             "what Safari's Block Pop-ups setting covers, what it misses, and what covers the rest", "stop-safari-redirects/"),
            ("Compared", "Undirect beside Safari's Block Pop-ups, 1Blocker and AdGuard, with what Undirect does not do", "compare/"),
            ("Support", "turning it on, rules, common problems and how to reach the developer", "support/"),
            ("Privacy", "what the extension sees, what stays on the device and the one button that sends something", "privacy/"),
        ],
        "skill": {
            "name": "undirect",
            "description": ("Answers questions about Undirect, a paid Safari extension for iPhone, iPad and Mac that stops "
                            "pages redirecting, opening pop-under tabs or catching a tap through an invisible layer. Use when "
                            "someone asks how to stop Safari redirects, pop-ups or tabs that open by themselves, or how to set "
                            "up, use or troubleshoot Undirect."),
            "setup": f"""On a Mac: open the Undirect app and press Open Safari Settings. Safari Settings opens on Extensions: tick Undirect and allow it on every website. Then open a website and press the Undirect toolbar button once. The guard is off on every site until then; the button turns it on for that site and the page reloads.

On iPhone or iPad: open the Undirect app and press Open Safari Extensions. Settings opens on Undirect (if it opens elsewhere, go to Apps, then Safari, then Extensions, then Undirect). Turn Undirect on and set All Websites to Allow. Then open a website in Safari: the Undirect button is in the page menu at the left of the address bar, and pressing it turns the guard on for that site.

Rules are changed from the Undirect button in Safari. On iPhone and iPad the list in the app is read only, because iOS gives an app no way to send changes to its own extension.

To try it safely, open {base}/demo/ in Safari with Undirect switched on.""",
        },
        "links": [("Elsewhere", [
            ("Undirect on the App Store", store_link, "price, screenshots and the full description"),
            ("Demo sites", f"{base}/demo/", "made-up pages that use the tricks Undirect stops, to try before buying"),
            ("Source code", source_url, "the Safari extension and both apps"),
        ])],
    }
