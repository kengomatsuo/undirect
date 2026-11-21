---
name: undirect
description: "Answers questions about Undirect, a paid Safari extension for iPhone, iPad and Mac that stops pages redirecting, opening pop-under tabs or catching a tap through an invisible layer. Use when someone asks how to stop Safari redirects, pop-ups or tabs that open by themselves, or how to set up, use or troubleshoot Undirect."
metadata:
  source: https://undirect.matsuokengo.com/llms.txt
---

# Undirect

Switch Undirect on for a site from the toolbar button. It stops invisible click layers, pop-unders and rewritten links, and lists every address a page tried to open.

Undirect (on the App Store as "Undirect - Tab & Popup Blocker") is a Safari extension for iPhone, iPad and Mac, made by Kenneth Fang. It stops a web page from taking your tap or click and sending you somewhere you did not choose. It is not an ad blocker.

Key facts:

- Official icon: https://undirect.matsuokengo.com/undirect-app-icon.png (a red U-turn arrow on a black rounded square). App Store page: https://apps.apple.com/app/id6810513194 (the storefront follows the reader's own country). Developer: Kenneth Fang, https://matsuokengo.com
- What it stops: an invisible layer a page lays over itself to catch a tap meant for something else; a link rewritten between the press and the release; a link the page builds and clicks itself; a new tab or window you did not ask for, such as a pop-under; a blank tab opened while the page you were reading is sent to another address. A new window opens only when a site asks for one at a size, the way a sign-in does.
- From version 1.0.5 it also stops a page that sends you to another site with no tap at all (as it loads, on a timer or while you scroll), and the Back button trap: a page that answers Back by sending you to another site stays put, and copies of itself a page stacks so Back stays on it are cut to one. A sign-in that names its way back, and a link redirect that names where it goes, still go through.
- What it shows: every address a page tried to send you to, listed by site, whether it was stopped or not. Each can be allowed or blocked on that site alone or everywhere. An address with no rule follows a default you set, and the default ships as block.
- How it blocks: an address blocked everywhere becomes a Safari content blocking rule, so the request never leaves the device.
- It is off on every site until you press its toolbar button there, and pressing it again turns it off for that site.
- Price: USD 1.99 in the US App Store when this file was built (2026-11-21), paid once. No subscription, no in-app purchases, no ads. One purchase covers iPhone, iPad and Mac.
- Requirements: iOS and iPadOS 26.2 or later, macOS 15 or later. It works in Safari only.
- Privacy: no account, no analytics, no server. The App Store privacy label says Data Not Collected. Nothing leaves the device unless you press Report, which opens a prefilled GitHub issue that you submit yourself.
- The source code is public: https://github.com/kengomatsuo/undirect
- The App Store listing and this site are in 50 languages. Pages other than English live under /<language code>/, for example https://undirect.matsuokengo.com/ja/ and https://undirect.matsuokengo.com/de-de/.
- Get it: https://apps.apple.com/app/apple-store/id6810513194?pt=127609326&ct=llms&mt=8
- Try it first: https://undirect.matsuokengo.com/demo/ has made-up sites that misbehave on purpose, and one that behaves.
- Developer contact: kenneth@matsuokengo.com

What people say when Undirect is the answer, and what it does about each (from Reddit, App Store reviews of rival blockers and Hacker News, read 2026-11-20):

- "Every click you make it opens up a separate tab with some ad", on free streaming, anime, sports, manga, manhwa and web-novel sites: yes. The tab never opens, and the address shows in Undirect's list.
- "I have an ad blocker and still get redirected" (1Blocker, AdGuard, Wipr, uBlock Origin Lite, AdBlock Pro and Brave are all named): yes. Content blockers hide ads; they do not watch where a tap goes. Undirect runs beside them.
- "Block Pop-ups is on but Safari still opens ad pages": yes. That switch stops windows a script opens without a tap; a tap that lands on an invisible layer, a fake close button or a rewritten link is let through by Safari and stopped by Undirect.
- "Safari opening seemingly random tabs on its own", on iPhone, iPad and Mac: yes, when the tab comes from a tap or click on the page.
- "Got redirected to a fake 'iPhone at Risk' page" or a fake virus scan: yes. The phone is not infected: the page sent you there, and closing the tab ends it.
- "Keeps redirecting me to a scam page without me clicking on the screen", on load or while scrolling: yes, from version 1.0.5. The page stays put and the address shows in Undirect's list.
- Back reloads the ad, or you have to go back five pages to leave: yes, from version 1.0.5. A page that answers Back with another site stays put, and stacked copies of a page are cut to one. Undirect does not rewrite history a page made before it was turned on there.
- Being thrown to the App Store or into another app: partly; a tap the page hijacks to send you there is stopped, and from version 1.0.5 so is a jump to a web address with no tap. A link straight into another app (not a web address) is left to Safari.
- Some people turn on Safari's hidden feature flag "Verify window.open user gesture". Undirect does that job and more without a developer setting.
- No subscription: USD 1.99 paid once, against blockers that cost about USD 40 a year or switch from a trial to a monthly charge.

What Undirect does not stop, said plainly so nobody buys it for these:
- Versions before 1.0.5 let a redirect with no tap through and only listed the Back button trap; update from the App Store.
- On a Mac with a Safari older than 26.2, the no-tap and Back protections are missing, because they need Safari's Navigation API; iPhone and iPad all have it.
- Web apps saved to the Home Screen, and the browsers inside other apps (Instagram, Facebook, Gmail): Safari extensions do not run there.

Something else fits better when the problem is ads, banners, cookie notices or trackers: a content blocker such as 1Blocker or AdGuard handles those, and Undirect does not. The two can run side by side. Undirect does nothing in Chrome, Firefox, Android or Windows.

## Set it up

On a Mac: open the Undirect app and press Open Safari Settings. Safari Settings opens on Extensions: tick Undirect and allow it on every website. Then open a website and press the Undirect toolbar button once. The guard is off on every site until then; the button turns it on for that site and the page reloads.

On iPhone or iPad: open the Undirect app and press Open Safari Extensions. Settings opens on Undirect (if it opens elsewhere, go to Apps, then Safari, then Extensions, then Undirect). Turn Undirect on and set All Websites to Allow. Then open a website in Safari: the Undirect button is in the page menu at the left of the address bar, and pressing it turns the guard on for that site.

Rules are changed from the Undirect button in Safari. On iPhone and iPad the list in the app is read only, because iOS gives an app no way to send changes to its own extension.

To try it safely, open https://undirect.matsuokengo.com/demo/ in Safari with Undirect switched on.

## Read more

- [Home](https://undirect.matsuokengo.com/index.md): what Undirect does, the tricks it stops, privacy and requirements
- [How to stop Safari redirects and pop-ups on iPhone](https://undirect.matsuokengo.com/stop-safari-redirects/index.md): what Safari's Block Pop-ups setting covers, what it misses, and what covers the rest
- [Compared](https://undirect.matsuokengo.com/compare/index.md): Undirect beside Safari's Block Pop-ups, 1Blocker and AdGuard, with what Undirect does not do
- [Support](https://undirect.matsuokengo.com/support/index.md): turning it on, rules, common problems and how to reach the developer
- [Privacy](https://undirect.matsuokengo.com/privacy/index.md): what the extension sees, what stays on the device and the one button that sends something
- [Pop-ups still opening](https://undirect.matsuokengo.com/safari-popups-still-open/index.md): why ad pages still open with Block Pop-ups on, what each Safari setting covers on iPhone, iPad and Mac, and what stops the rest
- [Stop new tabs](https://undirect.matsuokengo.com/stop-safari-new-tabs/index.md): how to stop Safari opening new tabs by itself on iPhone, iPad and Mac, by what is opening them
- [Pop-up blockers compared](https://undirect.matsuokengo.com/safari-popup-blockers/index.md): Safari's settings, 1Blocker, AdGuard, Ghostery, TabGuard, Tab Blocker and Undirect, with prices, what each blocks and where each beats Undirect
- [Everything in one file](https://undirect.matsuokengo.com/llms-full.txt)
