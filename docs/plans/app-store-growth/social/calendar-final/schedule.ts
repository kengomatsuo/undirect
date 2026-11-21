// The posting grid from docs/research/posting-times-countries.md section 5 ("New slots"), the
// matched-pair tests from its section 4, and the English posts that now help a stranger with no
// pitch (social-media skill: at least 3 posts in 10). Days are WIB days; X times sit on the
// quarter hour because X's scheduler takes nothing else.
import type { Lang } from "./lang-posts";

export type SPlat = "X" | "Threads" | "IG+FB" | "Instagram" | "TikTok" | "YouTube";
export type SlotDef = { lang: Lang; plat: SPlat; days: number[]; time: string; arm: string; why: string; from?: string; to?: string; dates?: string[]; region?: "eu" };

export const SLOTS: SlotDef[] = [
  // English, US audience (ET = WIB - 12 h all through Nov 22-Dec 20)
  { lang: "en", plat: "X", days: [1, 2, 3, 4], time: "21:15", arm: "A", why: "Buffer Tue 9:00 / Wed 9-10; Hootsuite Wed-Fri 9-11 (research 21:10, moved to X's quarter hour)" },
  { lang: "en", plat: "X", days: [2, 3, 4, 5], time: "01:30", arm: "B", why: "Sprout software and technology X Tue-Thu 11-16" },
  { lang: "en", plat: "X", days: [5], time: "23:30", arm: "A", why: "Sprout tech Fri 11-13" },
  { lang: "en", plat: "X", days: [0], time: "22:30", arm: "test", why: "Hootsuite Sun 9-12 against Metricool's avoid Sunday" },
  { lang: "en", plat: "Threads", days: [2, 3, 4], time: "20:30", arm: "A", why: "Buffer Thu 9:00, weekdays 7-12; Hootsuite Tue 8:00" },
  { lang: "en", plat: "Threads", days: [6], time: "02:00", arm: "B", why: "Hootsuite Fri 14:00" },
  { lang: "en", plat: "IG+FB", days: [2, 3], time: "00:30", arm: "B", why: "Sprout tech IG Mon 11-13, Tue 11-16; Sprout FB Tue-Wed 12-20" },
  { lang: "en", plat: "IG+FB", days: [4], time: "06:00", arm: "C", why: "Buffer IG Wed 18:00; Metricool IG 20:00" },
  { lang: "en", plat: "IG+FB", days: [4], time: "21:00", arm: "A", why: "Buffer IG and FB Thu 9:00" },
  { lang: "en", plat: "TikTok", days: [0], time: "21:00", arm: "A", why: "Buffer TikTok Sun 9:00" },
  { lang: "en", plat: "TikTok", days: [2], time: "01:00", arm: "A", why: "Buffer Mon 13:00; Sprout Mon 15-17" },
  { lang: "en", plat: "TikTok", days: [4, 0], time: "07:00", arm: "B", why: "Metricool 18-20; Buffer views peak 18-23" },
  { lang: "en", plat: "YouTube", days: [5, 6], time: "04:00", arm: "A", why: "Buffer Shorts Fri 16:00, Thu/Fri/Sat best" },
  // English for Europe: the last 30 days of App Store units put Europe first (29 of 76: France,
  // Italy, UK, Türkiye, Germany). European evening, CET = WIB - 6 h (UK one hour earlier). GUESS on
  // the hour: the global studies' evening windows (Buffer IG 18:00, Metricool 20:00) applied to CET;
  // no Europe-only study was fetched.
  { lang: "en", plat: "X", days: [3, 6], time: "02:45", arm: "EU", region: "eu", why: "European evening, Tue and Fri 20:45 CET; an hour and a quarter after the US X post at 01:30" },
  { lang: "en", plat: "Threads", days: [1, 4], time: "02:00", arm: "EU", region: "eu", why: "European evening, Sun and Wed 20:00 CET" },
  { lang: "en", plat: "Instagram", days: [3, 6], time: "02:30", arm: "EU", region: "eu", why: "European evening, Tue and Fri 20:30 CET (Metricool IG 20:00)" },
  // Traditional Chinese, Taiwan trial: Taiwan is the second paid market (Sales API, Sep 1-Nov 19:
  // Undirect US 4, Taiwan 2, Canada 2, the rest 1 each). One Threads and one Instagram post a week,
  // 21:00 Taipei (WIB + 1 h). GUESS: Threads is reported to be unusually strong in Taiwan, and the
  // 21:00 hour is borrowed from Japan's measured evening peak; neither verified in this run.
  { lang: "zh", plat: "Threads", days: [3], time: "20:00", arm: "A", why: "Taipei 21:00 weekday evening (GUESS); one a week as a trial" },
  { lang: "zh", plat: "Instagram", days: [6], time: "20:00", arm: "A", why: "Taipei 21:00 Saturday evening (GUESS); one a week as a trial" },
  // Indonesian (WIB is local)
  { lang: "id", plat: "TikTok", days: [6, 0], time: "19:00", arm: "A", why: "Jakpat evening 18-21; Buffer Sat best TikTok day" },
  { lang: "id", plat: "TikTok", days: [1], time: "19:30", arm: "A", why: "Jakpat 18-21; Buffer Mon" },
  { lang: "id", plat: "TikTok", days: [3], time: "07:30", arm: "B", why: "Jakpat morning 07-09" },
  { lang: "id", plat: "IG+FB", days: [2, 0], time: "19:30", arm: "A", why: "Jakpat 18-21; Metricool IG 20:00" },
  { lang: "id", plat: "IG+FB", days: [4], time: "12:15", arm: "B", why: "Sprout tech IG 11-14; lunch spike borrowed from Japan (GUESS)" },
  { lang: "id", plat: "YouTube", days: [5], time: "16:30", arm: "A", why: "Buffer Shorts Fri 16:00; our uploads at 16:12-19:04 WIB reached 456-945" },
  { lang: "id", plat: "YouTube", days: [1], time: "06:30", arm: "B", why: "Our 06:17 WIB upload reached 1,184; Jakpat 07-09" },
  // Japanese (JST = WIB + 2 h)
  { lang: "ja", plat: "X", days: [1, 3, 5], time: "10:00", arm: "A", why: "MIC weekday 12時台 lunch peak (research 10:05, moved to X's quarter hour)" },
  { lang: "ja", plat: "X", days: [2, 4, 6], time: "19:30", arm: "B", why: "MIC 21時台, the daily peak" },
  { lang: "ja", plat: "X", days: [0], time: "09:00", arm: "A", why: "MIC holiday 10-14時" },
  { lang: "ja", plat: "X", days: [2, 4], time: "05:45", arm: "C", why: "MIC 07-08時 commute; weeks 3-4 only", from: "2026-12-06" },
  { lang: "ja", plat: "Threads", days: [2, 4], time: "10:10", arm: "A", why: "MIC lunch; Buffer Threads weekday mornings" },
  { lang: "ja", plat: "Instagram", days: [5], time: "10:15", arm: "A", why: "Sprout tech IG Fri 11-14; MIC lunch" },
  { lang: "ja", plat: "Instagram", days: [3], time: "19:00", arm: "B", why: "MIC 21時 peak" },
  { lang: "ja", plat: "Instagram", days: [6], time: "09:00", arm: "B", why: "MIC holiday daytime" },
  { lang: "ja", plat: "YouTube", days: [3, 5, 0], time: "19:30", arm: "A", why: "MIC 21-22時; our best Japanese Short went up at 21:37 JST" },
  { lang: "ja", plat: "TikTok", days: [6], time: "20:00", arm: "A", why: "MIC 21時 peak (research 19:00 WIB; moved to 20:00 so it does not share the Indonesian TikTok minute)" },
  // Arabic: Undirect only, X only, cut to a light test (Riyadh = WIB - 4 h). Sales API, Sep 1-Nov 19:
  // no paid unit from Saudi Arabia; its 132 units were all Oct 10 free-day downloads. One post a week.
  { lang: "ar", plat: "X", days: [0], time: "20:15", arm: "A", why: "The 132-download Arabic post went out 16:16 Riyadh; one a week as a light test" },
];

export const LOCAL = {
  en: { label: "ET", off: -12 },
  id: { label: "WIB", off: 0 },
  ja: { label: "JST", off: 2 },
  ar: { label: "Riyadh", off: -4 },
  zh: { label: "Taipei", off: 1 },
  eu: { label: "CET (UK 1 h earlier)", off: -6 },
} as const;

export type Slot = { lang: Lang; plat: SPlat; date: string; time: string; t: number; arm: string; why: string; region?: "eu" };

const START = "2026-11-22", END = "2026-12-20";
export function allSlots(): Slot[] {
  const out: Slot[] = [];
  for (let d = new Date(START + "T00:00:00Z"); d <= new Date(END + "T00:00:00Z"); d = new Date(d.getTime() + 86400000)) {
    const iso = d.toISOString().slice(0, 10);
    for (const s of SLOTS) {
      const hit = s.dates ? s.dates.includes(iso) : s.days.includes(d.getUTCDay()) && (!s.from || iso >= s.from);
      if (!hit) continue;
      const [h, m] = s.time.split(":").map(Number);
      out.push({ lang: s.lang, plat: s.plat, date: iso, time: s.time, t: d.getTime() + (h * 60 + m) * 60000, arm: s.arm, why: s.why, region: s.region });
    }
  }
  return out.sort((a, b) => a.t - b.t);
}

// Approved English posts that now carry no pitch and no link, so at least 3 posts in 10 help a
// stranger. Each is a change since the owner's go and is marked so on its card.
export const HELP_OVR: Record<number, { body?: string; reply?: string; slides?: number; image?: string; dropReply?: boolean; storyOne?: boolean }> = {
  5: { dropReply: true },
  20: { slides: 4, dropReply: true },
  27: { body: `You hit the X on the ad and another ad opens.\n\nThe X is drawn by the ad, so tapping it is tapping the ad. To get rid of it, close the tab.`, slides: 3, dropReply: true },
  39: { body: `Someone on Reddit told you to turn on a hidden Safari setting, "Verify window.open user gesture", to stop redirect tabs.\n\nIt sits under Advanced, Feature Flags, and it stops some of them, not all.`, dropReply: true },
  47: { image: "help-ig-1.png", dropReply: true },
  55: { body: `Can an iPhone keep a clipboard history? No app can: iOS doesn't let apps read what you copy in the background.\n\nWhat iOS does have: Text Replacement under Settings, General, Keyboard for short phrases, and Universal Clipboard, which carries your last copy to your Mac.`, dropReply: true },
  58: { body: `Safari extensions, every blocker included, don't run in two places: home-screen web apps and the browser inside other apps (tap a link in X or Instagram and you're in one).\n\nIf a page there keeps opening ads, open it in Safari instead.`, dropReply: true },
  3: { reply: `If one opens, close it without tapping anything inside it.`, storyOne: true },
  15: { reply: `Blockers hide ads. The tab that opens when you press Play is the page taking your tap, so a blocker has nothing there to hide. Close it without tapping inside.`, storyOne: true },
  36: { reply: `macOS Tahoe's Spotlight keeps a clipboard history. It forgets after 8 hours by default; from 26.1 you can pick 30 minutes, 8 hours or 7 days.`, storyOne: true },
  54: { reply: `That switch stops windows a page opens by itself. A tab that opens right after your tap passes it, and a page can make any tap look like the cause.`, storyOne: true },
  61: { reply: `Before you install one: Full Access lets a keyboard use the network. The App Store's App Privacy box tells you what it collects.`, storyOne: true },
  81: { reply: `Universal Clipboard does it with no app: same Apple ID on both, Wi-Fi, Bluetooth and Handoff on, devices close together.`, storyOne: true },
  6: { reply: `If it's plain text, Text Replacement in Settings, General, Keyboard turns a short code into the whole thing.`, storyOne: true },
  19: { reply: `Before you install one, the App Store listing shows an In-App Purchases line. That's where a subscription hides.`, storyOne: true },
  24: { reply: `On free file sites the big coloured buttons are often ads. The real one tends to be the plain link with the file name and size.`, storyOne: true },
  48: { reply: `For short phrases, Text Replacement in Settings, General, Keyboard turns a few letters into the whole thing as you type.`, storyOne: true },
  72: { body: `Tap a link and Safari throws you into the App Store?\n\nIf you pressed a button that says it opens the app, like Google's "open the app", that's where it was always going. If a page sent you there with no such button, close the tab.`, dropReply: true },
  84: { reply: `Wherever it took you, close the tab without tapping inside, and don't install anything it pushes.`, storyOne: true },
};

// Three promises per film for Instagram trial reels: the claim as a title, the hook as a post
// headline, and one number the film itself shows (saved-skills-code-review.md, change 1).
export const PROMISES: Record<string, [string, string, string]> = {
  u1: ["Every tap opens another ad", "You press Play and a VPN alert opens", "3 taps, 3 different traps"],
  "u1-short": ["Every tap opens another ad", "A VPN alert, then a virus warning", "2 traps in 6 seconds"],
  u2: ["Tap Download, get a fake one", "A fake download page, then calendar spam", "3 fake pages from 1 button"],
  "u2-short": ["Tap Download, get a fake one", "The Download button lied twice", "2 fakes in 6 seconds"],
  "u-mac": ["Click Play, get a casino tab", "Mac Safari opened a tab you never clicked", "1 click turns it on"],
  "u-mac-short": ["Click Play, get a casino tab", "Press Play, no tab", "1 click, 0 new tabs"],
  "u-ipad": ["Every redirect leaves a tab", "\"Your iPhone has been hacked\" on an iPad", "Play without opening 50 tabs"],
  "u-ipad-short": ["Every redirect leaves a tab", "Play without the hacked alert", "50 tabs, none opened"],
  "u-no-tap": ["You only scrolled. The page left.", "A fake security alert with no tap", "0 taps, 1 redirect"],
  "u-no-tap-short": ["You only scrolled. The page left.", "You scroll. Nothing leaves.", "0 taps, 0 redirects"],
  "u-back": ["Back takes you to the ad again", "No ad on Back. It just goes back.", "1 click fixes Back"],
  "u-back-short": ["Back takes you to the ad again", "Back just goes back", "1 Back, 1 page"],
  AdPov: ["POV: you're the ad", "Every hijack: Not Delivered", "12 viruses, 0 delivered"],
  Quiz: ["Only one is the real Download button", "The fakes go nowhere", "3 buttons, 1 real"],
  Dad: ["Tech support for Dad, every week", "\"my iphone says it has 12 viruses??\"", "9 tabs, then none"],
  "cutling-address": ["Typing your address. Again.", "Same address, one tap", "0:14 typing, 0:01 with Cutling"],
  "cutling-address-short": ["Typing your address. Again.", "Every checkout, one tap", "0:14 against 0:01"],
  "cutling-address-field": ["I've seen you type Main St 214 times", "I saw every typo", "214 times this year"],
  "cutling-email": ["Your email. Typed again.", "Every. Single. Form.", "7 forms, 7 taps"],
  "cutling-email-short": ["Your email. Typed again.", "Tap Work Email", "21 seconds of typing"],
  "cutling-android": ["Moved from Android? Miss pinned clips?", "Pinned to your keyboard", "Copied 3, kept 1"],
  "cutling-android-short": ["Miss pinned clips?", "One tap. Any app.", "Copied 3, kept 1"],
  "cutling-miss-android": ["Things I miss from Android", "Found it: Cutling", "3 things, 1 found"],
  "cutling-sync": ["Text Replacement stopped syncing?", "It's on your iPad too", "iPhone ✓, iPad ✗"],
  "cutling-sync-short": ["Text Replacement stopped syncing?", "Save it once", "iPhone ✓, iPad ✗"],
  "cutling-share": ["Copy. Switch. Paste. Go back.", "Share to Cutling", "4 trips for 2 copies"],
  "cutling-share-short": ["Copy. Switch. Paste. Go back.", "Saved with a name", "4 trips, then 1 tap"],
  "cutling-mac-history": ["Win+V on a Mac? Nothing.", "Every copy kept. Passwords skipped.", "Copied 3, kept 1"],
  "cutling-mac-history-short": ["Win+V on a Mac? Nothing.", "Press Shift-Command-V", "Copied 3, kept 1"],
};
