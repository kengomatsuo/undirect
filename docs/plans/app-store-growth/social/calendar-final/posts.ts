// Every post of the @monholtco calendar, Nov 22 to Dec 20 2026, in its final words.
// Source rows: ../pains-calendar.md (P1-P87). build.ts turns this file into the media,
// the per-platform captions and ~/Downloads/social-calendar/index.html.

export type App = "Undirect" | "Cutling" | "Both";
export type Tags = "u" | "umac" | "c" | "cmac" | "csmb";

// An image spec names a template in templates.ts and its props.
export type Img = { tpl: string; [k: string]: unknown };

export type Post = {
  n: number;
  date: string; // WIB calendar day, YYYY-MM-DD
  slot: 1 | 2 | 3 | "kept";
  keptTime?: { wib: string; et: string }; // only for KEPT rows
  app: App;
  kind: "film" | "image" | "carousel" | "poll" | "text" | "kept";
  pain: string;
  gate?: string;
  body?: string; // the post text shared by X, Instagram and TikTok
  reply?: string; // our own first reply on X, before the link
  tags?: Tags;
  film?: string; // file name in ~/Downloads/pain-films-v4, without .mp4
  images?: Img[]; // one image, or a carousel's slides in order
  poll?: {
    x: { q: string; options: string[] };
    ig: { sticker: string; q: string; options?: string[]; correct?: number; emoji?: string; bg: Img; note?: string };
    tt: { type: string; q: string; options?: string[]; film: string; cut?: "6s" | "endcard"; note?: string; caption: string };
  };
  kept?: { x?: string; ig?: string; tt?: string; media?: string[]; source: string };
  notes?: string[];
  missing?: string[];
};

const U = "Undirect" as const;
const C = "Cutling" as const;

export const posts: Post[] = [
  // ---------------- Sun Nov 22 ----------------
  {
    n: 1, date: "2026-11-22", slot: 1, app: U, kind: "film", tags: "u", film: "u1",
    pain: "U1 an ad tab on every tap",
    body: `You press Play. A page says "install the VPN app to keep watching". Back, press again: "Your iPhone is severely damaged by (12) virus!" Again: "You are today's lucky visitor."

The page lays an invisible layer over Play, so your tap goes to an ad first.`,
    reply: `Undirect takes that layer's tap away, so Play just plays. It's a Safari extension, $1.99 once.`,
  },
  {
    n: 2, date: "2026-11-22", slot: 2, app: C, kind: "film", tags: "c", film: "cutling-address",
    pain: "C5 retyping your address into every checkout form",
    body: `Deliver to. Shipping address. Delivery details. Billing address. Your address again, by thumb, typos and all: 14 seconds a form.

Saved once in Cutling, it goes in with one tap, in about a second.`,
    reply: `Cutling is the keyboard in that clip. $4.99 once for iPhone and iPad, and the Mac app comes with it.`,
  },
  {
    n: 3, date: "2026-11-22", slot: 3, app: U, kind: "poll",
    pain: "U3 and U10 closing ad tabs to watch one episode (\"repeat 7 times\")",
    reply: `Those tabs open because the page takes your tap for an ad. Undirect hands the tap back to the button you pressed.`,
    poll: {
      x: { q: "Ad tabs you closed last night to watch one episode:", options: ["0", "1-5", "6-20", "Lost count"] },
      ig: { sticker: "Poll", q: "Ad tabs you closed to watch one episode?", options: ["0", "1-5", "6-20", "Lost count"], bg: { tpl: "storyq", app: U, q: "Ad tabs you closed to watch *one* episode?" } },
      tt: { type: "Poll sticker, 24 h", q: "Has Safari ever opened a tab you didn't tap?", options: ["Yes", "No"], film: "u1-short", cut: "6s",
        caption: `Has Safari ever opened a tab you didn't tap? Vote on the sticker.

Search Undirect on the App Store.` },
    },
    tags: "u",
  },
  // ---------------- Mon Nov 23 ----------------
  {
    n: 4, date: "2026-11-23", slot: 1, app: C, kind: "film", tags: "c", film: "cutling-email",
    pain: "C5 typing your email address over and over",
    body: `Your email address into a Wi-Fi login, a 10%-off pop-up, a check-in form and a receipt: 21 seconds of typing.

Save it in Cutling once. In an email field the keyboard puts it first, so each form takes one tap.`,
    reply: `Cutling: saved text on your iPhone and iPad keyboard, $4.99 once, no account.`,
  },
  {
    n: 5, date: "2026-11-23", slot: 2, app: U, kind: "image", tags: "u",
    pain: "U9 Block Pop-ups is on and tabs still open",
    body: `Settings, Safari, Block Pop-ups: on. And the tabs keep coming.

Safari lets a tab through when it thinks you asked for it, and a page can make any tap look like you asked.`,
    reply: `Undirect checks what was really under your finger before a tab gets to open. $1.99 once.`,
    images: [{ tpl: "settings", top: "Block Pop-ups is *on.*", bottom: "The tabs still open." }],
    notes: ["The Settings screen is drawn in iOS 26 style, not captured from a simulator: no tap tool runs on this Mac's simulators (no idb, axe or cliclick)."],
  },
  {
    n: 6, date: "2026-11-23", slot: 3, app: C, kind: "poll",
    pain: "C5 text you retype every week, kept in Notes",
    reply: `Cutling keeps that text on the keyboard: save it once, tap it in from any app.`,
    poll: {
      x: { q: "Where do you keep the text you retype every week?", options: ["The Notes app", "A screenshot in Photos", "Text Replacement", "I just retype it"] },
      ig: { sticker: "Add Yours", q: "The text you retype every week", note: "Our own answer goes first: \"221 Example Street, Flat 4\" (fictional).", bg: { tpl: "storyq", app: C, q: "The text you *retype* every week", shot: "c03" } },
      tt: { type: "Comment poll, up to 5 answers", q: "What do you retype most?", options: ["Address", "Email", "Same DM reply", "A link", "Other"], film: "cutling-address",
        note: "Reply with a video to each \"Other\".",
        caption: `What do you retype most? Address, email, the same DM reply, a link? Pick one in the poll.

Search Cutling on the App Store.` },
    },
    tags: "c",
  },
  // ---------------- Tue Nov 24 ----------------
  {
    n: 7, date: "2026-11-24", slot: 1, app: U, kind: "film", tags: "u", film: "u2-short",
    pain: "U2 thrown to another site (\"The download button redirects to dumb fake file-hosting site\")",
    body: `Tap Download on a movie site and you get a fake "Download in progress" page telling you to install a player app.

With Undirect on for that site, you stay put.`,
    reply: `One press on the site turns Undirect on there, and it stays on for that site. $1.99 once.`,
  },
  {
    n: 8, date: "2026-11-24", slot: 2, app: C, kind: "image", tags: "c",
    pain: "C4 a Full Access keyboard (\"are all third party keyboards keystroke loggers\")",
    body: `Would you let a keyboard app read what you type? Fair question.

Cutling's keyboard has no network code, there's no account, and the App Store label says Data Not Collected. It reads the word before the cursor to suggest a saved item, and sends nothing.`,
    reply: `The privacy label is on the App Store page, under App Privacy. Cutling is $4.99 once.`,
    images: [{ tpl: "store", capture: "privacy", app: C, head: "Data *Not* Collected", sub: "Cutling's App Store page, App Privacy" }],
    notes: ["Captured from the live App Store page (apps.apple.com/us/app/cutling/id6759476314) on Nov 21; build.ts captures it again on each run, so run it the day before."],
  },
  {
    n: 9, date: "2026-11-24", slot: "kept", keptTime: { wib: "15:07", et: "03:07 Tue Nov 24" }, app: C, kind: "kept",
    pain: "KEPT: Cutling on Product Hunt (draft 7)",
    kept: { source: "social-posts.md draft 7", x: `Cutling is on Product Hunt today: a keyboard for the text you type again and again, on iPhone, iPad and Mac.
producthunt.com/products/cutling` },
  },
  // ---------------- Wed Nov 25 ----------------
  {
    n: 10, date: "2026-11-25", slot: 1, app: C, kind: "film", tags: "c", film: "cutling-android",
    pain: "Android switchers miss the clipboard (\"It's the main thing I missed from Samsung\")",
    body: `Copy a door code, then a tracking number, then a meeting link. Your iPhone keeps only the last one.

Moved from Android and miss pinned clips? Cutling pins the text you paste all day to your keyboard. It doesn't record what you copy; iOS doesn't let any app do that.`,
    reply: `Cutling: pinned text on your iPhone keyboard, and the full clipboard history in its Mac app. $4.99 once.`,
  },
  {
    n: 11, date: "2026-11-25", slot: 2, app: U, kind: "film", tags: "umac", film: "u-mac",
    pain: "U15 Safari on a Mac opening tabs",
    body: `Click Play in Safari on your Mac and a casino tab opens: "200% welcome bonus".

One click on Undirect's button turns it on for that site. After that, Play opens no new tab.`,
    reply: `The same purchase covers Safari on your iPhone and iPad. $1.99.`,
  },
  {
    n: 12, date: "2026-11-25", slot: 3, app: C, kind: "image", tags: "c",
    pain: "C7 Text Replacement is text only, and it stops syncing",
    body: `iPhone Text Replacement keeps plain text and fires only when you type the shortcut. After an update, some people found the whole list gone from one device.

A cutling can hold a whole paragraph or an image, and it syncs through your own iCloud.`,
    reply: `Cutling for iPhone and iPad, with a Mac app in the same $4.99 purchase.`,
    images: [{ tpl: "split" }],
    notes: ["Left half is a drawn iOS Settings > Text Replacement list; right half is Cutling's real keyboard from its App Store screenshot."],
  },
  // ---------------- Thu Nov 26 ----------------
  {
    n: 13, date: "2026-11-26", slot: 1, app: U, kind: "film", tags: "u", film: "u1",
    pain: "U1 an ad tab on every tap on free streaming sites",
    body: `Free streaming site, and each press of Play opens an ad instead of the movie.

Switch Undirect on for that site once, and Play just plays.`,
    reply: `Works the same on the iPhone and iPad versions of Safari. $1.99 once, no account.`,
  },
  {
    n: 14, date: "2026-11-26", slot: 2, app: C, kind: "film", tags: "c", film: "cutling-sync",
    pain: "C7 Text Replacement not syncing",
    body: `Your Text Replacement shortcuts work on your iPhone, and on your iPad "addr" just stays "addr".

Save the text once in Cutling and it's on your iPad keyboard too, synced through your own iCloud.`,
    reply: `No Cutling account to make: it syncs through the iCloud you already use. $4.99 once.`,
  },
  {
    n: 15, date: "2026-11-26", slot: 3, app: U, kind: "poll",
    pain: "U3 an ad blocker is installed and the tabs still open",
    reply: `Blockers hide ads. The tab that opens when you press Play is the page taking your tap, and a blocker has nothing to hide there. Undirect stops that part, so run both.`,
    poll: {
      x: { q: "Your ad blocker against the tabs that open when you tap:", options: ["Stops them", "Some get through", "Doesn't touch them", "I have no blocker"] },
      ig: { sticker: "Quiz", q: "Your ad blocker is on. Which of these can it hide?", options: ["The banner ad", "The tab Play opens"], correct: 0,
        note: "Next frame: \"A blocker hides the banner. The tab is the page taking your tap, and that's what Undirect stops.\" and the link sticker.",
        bg: { tpl: "storyq", app: U, q: "Your blocker is on. What can it *hide?*", visual: "stream" } },
      tt: { type: "Comment poll", q: "Did your blocker stop the redirect?", options: ["Yes", "Some", "No", "No blocker"], film: "u2",
        caption: `Did your ad blocker stop this redirect? Answer in the poll.

Search Undirect on the App Store.` },
    },
    tags: "u",
  },
  // ---------------- Fri Nov 27 (Black Friday window: no prices) ----------------
  {
    n: 16, date: "2026-11-27", slot: 1, app: C, kind: "image", tags: "c",
    pain: "C12 paste keyboards full of ads (\"It's a clipboard, not a billboard\")",
    body: `"It's a clipboard, not a billboard." That's how one reviewer put it about a paste keyboard with ads in it.

Cutling has no ads and no account.`,
    reply: `Cutling is paid once, and the Mac app comes in the same purchase.`,
    images: [{ tpl: "quote", quote: "It's a clipboard, not a billboard.", cite: "an App Store review of a paste keyboard, 2026" }],
  },
  {
    n: 17, date: "2026-11-27", slot: "kept", keptTime: { wib: "07:13", et: "19:13 Thu Nov 26" }, app: "Both", kind: "kept",
    pain: "KEPT: Black Friday, Undirect $0.99 and Cutling $2.99 (drafts 10 and 11)",
    kept: {
      source: "social-posts.md drafts 10 and 11",
      x: `Black Friday, Nov 27 to 30 on the App Store:
Cutling $2.99 (was $4.99)
Undirect $0.99 (was $1.99)
One purchase covers iPhone, iPad and Mac.
apps.apple.com/app/id6759476314`,
      ig: `Black Friday on the App Store, Nov 27 to 30. Undirect $0.99 instead of $1.99, Cutling $2.99 instead of $4.99. One purchase for iPhone, iPad and Mac.

Link in bio.
#iphonetips #iosapps #macapps #safari #productivityapps`,
      tt: `Black Friday on the App Store, Nov 27 to 30. Undirect $0.99 instead of $1.99, Cutling $2.99 instead of $4.99. One purchase for iPhone, iPad and Mac.

Search Undirect or Cutling on the App Store.
#iphonetips #iphonehacks #techtok`,
      media: ["sale-undirect-ig.png", "sale-cutling-ig.png", "sale-undirect-tt.png", "sale-cutling-tt.png"],
    },
    notes: ["Draft 10 links Cutling's App Store id only; the sale covers both apps. Draft 11 says \"App Store links with ct=ig-bf\", which Instagram captions can't click, so the caption ends on Link in bio."],
  },
  {
    n: 18, date: "2026-11-27", slot: 3, app: U, kind: "text",
    pain: "U12 blockers that cost a subscription (\"$40 for the year\")",
    body: `$40 for the year, and the redirect tabs still got through.

Undirect is a single purchase. You make no account, and nothing you browse is sent anywhere.`,
    reply: `Undirect stops the tabs and redirects a page sets off from your tap, in Safari on iPhone, iPad and Mac.`,
  },
  // ---------------- Sat Nov 28 ----------------
  {
    n: 19, date: "2026-11-28", slot: 1, app: C, kind: "poll",
    pain: "C1 paying monthly for a clipboard (\"I WILL NEVER BUY ANY SUBSCRIPTION\")",
    reply: `Cutling is one purchase, no subscription, for iPhone, iPad and the Mac app.`,
    poll: {
      x: { q: "A clipboard app on a subscription:", options: ["Fine by me", "Never", "Paying and annoyed", "What's a clipboard app"] },
      ig: { sticker: "Emoji slider", emoji: "😤", q: "How much does a subscription for a clipboard annoy you?", bg: { tpl: "storyq", app: C, q: "A subscription. For a *clipboard.*" } },
      tt: { type: "Comment poll", q: "Would you pay monthly for a clipboard?", options: ["Never", "Maybe", "Yes"], film: "cutling-android", cut: "endcard",
        caption: `Would you pay every month for a clipboard app? Vote in the poll.

Search Cutling on the App Store.` },
    },
    tags: "c",
    notes: ["TikTok film is trimmed before its end card, which shows $4.99 during the sale."],
  },
  {
    n: 20, date: "2026-11-28", slot: 2, app: U, kind: "carousel", tags: "u",
    pain: "U2 and U8 fake \"iPhone at risk\" pages (\"does my iPhone have a virus\")",
    body: `Your iPhone doesn't have a virus.

The "iPhone at risk" page came from the website you were on. Close the tab, and don't install or pay for anything it asks for. Send this to the person in your family who panics at these.`,
    reply: `When a tap set it off, Undirect stops the page opening. It's a Safari extension.`,
    images: [
      { tpl: "virus", head: "Got this? Your iPhone is *fine.*" },
      { tpl: "big", app: U, text: "It's the *website,* not your phone." },
      { tpl: "big", app: U, text: "Close the *tab.*" },
      { tpl: "big", app: U, text: "Don't install, call or pay *anything* it shows." },
      { tpl: "big", app: U, text: "When a tap set it off, *Undirect* stops it opening.", icon: true },
    ],
  },
  {
    n: 21, date: "2026-11-28", slot: 3, app: C, kind: "text",
    pain: "C8 Mac switchers who miss Win+V",
    body: `On Windows, Win+V showed everything you'd copied. A Mac has nothing like it out of the box.

Cutling's menu bar app keeps that history on a Mac, and anything your password manager marks as concealed stays out of it.`,
    reply: `Shift-Command-V opens it. Cutling for Mac comes with the iPhone and iPad keyboard.`,
  },
  // ---------------- Sun Nov 29 ----------------
  {
    n: 22, date: "2026-11-29", slot: 1, app: U, kind: "text",
    pain: "U4 readers sent away mid-chapter",
    body: `Reading a manga or a web novel and every page turn opens another site? Switch Undirect on for that site once and the next-page tap stays on the chapter.`,
    reply: `Undirect runs in Safari on iPhone and iPad, and on the Mac.`,
  },
  {
    n: 23, date: "2026-11-29", slot: 2, app: C, kind: "image", tags: "c",
    pain: "C5 typing the address into delivery apps",
    body: `Delivery app. Address field. Street, flat number and postcode by thumb, again.

Tap it in from the Cutling keyboard instead.`,
    reply: `Cutling works in any app's text field, on iPhone and iPad.`,
    images: [{ tpl: "shot", app: C, shot: "c03", head: "Your address in *one tap*" }],
    notes: ["Uses Cutling's App Store screenshot of the address going in with one tap, in place of a still from the film, which is being re-rendered."],
  },
  {
    n: 24, date: "2026-11-29", slot: 3, app: U, kind: "poll",
    pain: "U2 Download buttons that send you elsewhere",
    reply: `The button can be part of the ad. With Undirect on for that site, the tab stays where it was and the address it tried goes in the list.`,
    poll: {
      x: { q: "A Download button on a free site sent you to another site:", options: ["Every time", "Often", "Rarely", "Never"] },
      ig: { sticker: "Quiz", q: "Which Download button is the real one?", options: ["Big green one", "Start Download", "The file link"], correct: 2,
        note: "Next frame: \"The other two were ads.\" and the link sticker.",
        bg: { tpl: "storyq", app: U, q: "Which one is the *real* Download?", visual: "download" } },
      tt: { type: "Poll sticker, 24 h", q: "Has a Download button ever given you a fake download?", options: ["Yes", "No"], film: "u2-short", cut: "6s",
        caption: `Has a Download button ever given you a fake download page? Vote on the sticker.

Search Undirect on the App Store.` },
    },
    tags: "u",
  },
  // ---------------- Mon Nov 30 ----------------
  {
    n: 25, date: "2026-11-30", slot: 1, app: C, kind: "image", tags: "c",
    pain: "C6 an iPhone clipboard holds one thing",
    body: `Your iPhone clipboard holds one thing. Copy a new link and the last one is gone.

Keep the text you paste every day on the keyboard, one tap away.`,
    reply: `That's Cutling's keyboard. It keeps what you save; iOS lets no app record what you copy.`,
    images: [{ tpl: "shot", app: C, shot: "c01", head: "Saved once, *one tap* away" }],
    notes: ["Uses Cutling's App Store screenshot (Mail with the keyboard and four saved items) in place of a new Messages mock."],
  },
  {
    n: 26, date: "2026-11-30", slot: "kept", keptTime: { wib: "10:07", et: "22:07 Sun Nov 29" }, app: "Both", kind: "kept",
    pain: "KEPT: last day of the Black Friday prices (draft 12)",
    kept: { source: "social-posts.md draft 12", x: `Last day of the Black Friday prices. Undirect is $0.99 and Cutling $2.99 until midnight Pacific, then back to $1.99 and $4.99.` },
  },
  {
    n: 27, date: "2026-11-30", slot: 3, app: U, kind: "carousel", tags: "u",
    pain: "U11 fake close buttons that open another ad",
    body: `You hit the X on the ad and another ad opens.

Three X buttons on this page. How many of them close the ad?`,
    reply: `Answer on the last slides. Undirect is the Safari extension in slide 4.`,
    images: [
      { tpl: "xbtn", head: "How many of these *close* the ad?" },
      { tpl: "big", app: U, text: "*None.* All three are part of the ad." },
      { tpl: "big", app: U, text: "The X is drawn by the ad, so a tap on it is a tap on the *ad.*" },
      { tpl: "big", app: U, text: "With *Undirect* on for the site, that tap opens nothing.", icon: true },
    ],
    notes: ["Changed from the calendar: it asked \"one of these closes it, which?\" with no real answer, and slide 4 said the X becomes a close button, which Undirect does not do. Now the answer is none, and slide 4 says the tap opens nothing."],
  },
  // ---------------- Tue Dec 1 ----------------
  {
    n: 28, date: "2026-12-01", slot: 1, app: C, kind: "poll",
    pain: "C7 Text Replacement and your Mac",
    reply: `Cutlings sync through your own iCloud, and a deleted one comes back from Recently Deleted for 30 days.`,
    poll: {
      x: { q: "Text Replacement between your iPhone and Mac:", options: ["Syncs fine", "Stopped syncing", "Never worked", "I don't use it"] },
      ig: { sticker: "Questions", q: "What do you type again and again on your phone?", note: "The best answers get a frame each, showing that text saved in Cutling.", bg: { tpl: "storyq", app: C, q: "What do you type *again and again?*" } },
      tt: { type: "Q&A", q: "Ask us about saved text on iPhone.", film: "cutling-sync", cut: "endcard", note: "Answer each question as its own video; the trimmed film backs the first answer.",
        caption: `Ask us anything about saved text on iPhone: Text Replacement, syncing, keyboards. Each question gets its own video.

Search Cutling on the App Store.` },
    },
    tags: "c",
  },
  {
    n: 29, date: "2026-12-01", slot: 2, app: U, kind: "image", tags: "u",
    pain: "U8 wanting to know where the tab was going",
    body: `Want to know where that tab was trying to take you?

Undirect lists every address a page reached for, so you can block one everywhere or allow it on that site.`,
    reply: `Nothing in that list leaves your device.`,
    images: [{ tpl: "shot", app: U, shot: "u03", head: "Every blocked address, *listed*" }],
    notes: ["Uses Undirect's App Store screenshot of the list in place of a still from u1, which is being re-rendered."],
  },
  {
    n: 30, date: "2026-12-01", slot: 3, app: C, kind: "film", tags: "c", film: "cutling-address",
    pain: "C5 parcels and cards, the same addresses again",
    body: `Shipping form, delivery form, billing form: this month you'll type your address into all of them.

Save it once in Cutling and each one takes a tap. $4.99 once, for iPhone and iPad, and the Mac app too.`,
    reply: `Cutling on the App Store. The Mac app is in the same purchase.`,
  },
  // ---------------- Wed Dec 2 ----------------
  {
    n: 31, date: "2026-12-02", slot: 1, app: U, kind: "film", tags: "u", film: "u2",
    pain: "U7 \"The download button redirects to dumb fake file-hosting site\"",
    body: `You press Download and get a fake download page, then an "Add Calendar Subscription" pop-up, then a "Speedy Clean" app page.

With Undirect on, you stay on the page you were on, and the list shows the address it tried.`,
    reply: `$1.99 once, and it covers Safari on your Mac too.`,
  },
  {
    n: 32, date: "2026-12-02", slot: 2, app: C, kind: "film", tags: "c", film: "cutling-share",
    pain: "C5 copying an address from a message into Notes and back",
    body: `Copy, switch apps, paste, go back. Four trips for one boat time and one door code.

Share the page to Cutling instead. It's saved with a name, and next time it goes in with one tap.`,
    reply: `Cutling shows up in the iPhone share sheet once it's installed. $4.99 once.`,
  },
  {
    n: 33, date: "2026-12-02", slot: 3, app: U, kind: "film", tags: "u", film: "u-ipad",
    pain: "U1 on iPad (\"without opening 50 tabs\")",
    body: `Streaming on an iPad and every tap on Play leaves a new tab behind.

Undirect works the same in Safari on iPad, from the same $1.99 purchase. Allow it once for the site, and Play stops opening tabs.`,
    reply: `Bought it on your iPhone? It's already yours on the iPad.`,
  },
  // ---------------- Thu Dec 3 ----------------
  {
    n: 34, date: "2026-12-03", slot: 1, app: C, kind: "film", tags: "cmac", film: "cutling-mac-history",
    pain: "C8 copied passwords landing in clipboard history",
    body: `A clipboard history that saves every password you copy is a risk on a Mac.

Cutling's history keeps every copy and skips anything your password manager marks as concealed.`,
    reply: `Cutling for Mac, with the iPhone and iPad keyboard in the same $4.99 purchase.`,
  },
  {
    n: 35, date: "2026-12-03", slot: 2, app: U, kind: "film", tags: "umac", film: "u-mac-short",
    pain: "U15 tabs on a Mac that nobody clicked",
    body: `Mac Safari, a movie site, and one click on Play opens a casino tab.

Undirect turns on for that site with one click, and the next Play opens no tab.`,
    reply: `Undirect for Safari on the Mac, $1.99 once, iPhone and iPad included.`,
  },
  {
    n: 36, date: "2026-12-03", slot: 3, app: C, kind: "poll",
    pain: "C2 a Mac clipboard that forgets (\"only within the last 8 hours. Lunacy.\")",
    reply: `Cutling's Mac app keeps a clipboard history of its own, and what you save as a cutling stays until you delete it.`,
    poll: {
      x: { q: "How long does your Mac remember what you copied?", options: ["30 minutes", "8 hours", "7 days", "No idea"] },
      ig: { sticker: "Emoji slider", emoji: "😩", q: "How often do you copy over something you needed?", bg: { tpl: "storyq", app: C, q: "Copied over something you *still needed?*", shot: "c06" } },
      tt: { type: "Poll sticker, 24 h", q: "Ever copied over something you still needed?", options: ["Yes", "No"], film: "cutling-mac-history",
        caption: `Ever copied over something you still needed? Vote on the sticker.

Search Cutling on the App Store.` },
    },
    tags: "cmac",
  },
  // ---------------- Fri Dec 4 ----------------
  {
    n: 37, date: "2026-12-04", slot: 1, app: U, kind: "film", tags: "u", film: "u1-short",
    pain: "U3 and U10 closing ad tabs (\"repeat 7 times\")",
    body: `How many ad tabs did you close tonight to watch one episode? One person wrote "repeat 7 times".

Here it's a VPN alert, then a virus warning. Then the same tap with Undirect on.`,
    reply: `Undirect is the Safari extension in the second half. $1.99 once.`,
  },
  {
    n: 38, date: "2026-12-04", slot: 2, app: C, kind: "film", tags: "c", film: "cutling-email-short",
    pain: "C5 retyping an email address into forms",
    body: `Free Wi-Fi, 10% off, check-in, receipts: every form asks for your email address again.

Save it in Cutling once. In an email field the keyboard offers it first.`,
    reply: `Cutling: $4.99 once, and the Mac app comes with it.`,
  },
  {
    n: 39, date: "2026-12-04", slot: 3, app: U, kind: "image", tags: "u",
    pain: "U10 a hidden Safari flag as the workaround (\"Verify window.open user gesture\")",
    body: `Someone on Reddit told you to turn on a hidden Safari setting, "Verify window.open user gesture", to stop redirect tabs.

It half works, and it sits under Advanced, Feature Flags. Undirect does the job with one press per site.`,
    reply: `Undirect works without any hidden setting. $1.99 once.`,
    images: [{ tpl: "flags", head: "The hidden setting *Reddit* sends you to" }],
    notes: ["The Feature Flags screen is drawn, not captured: no simulator tap tool on this Mac. Settings > Apps > Safari > Advanced > Feature Flags is where the flag sits on iOS 26; check the row name on a device before posting."],
  },
  // ---------------- Sat Dec 5 ----------------
  {
    n: 40, date: "2026-12-05", slot: 1, app: C, kind: "image", tags: "c",
    pain: "C10 paying twice for Mac and iPhone (\"it doesn't make any sense paying it twice\")",
    body: `Bought a clipboard app for your Mac, then found the iPhone one is a second purchase?

Cutling is one $4.99 purchase for iPhone, iPad and Mac.`,
    reply: `The App Store page lists all three devices under one price.`,
    images: [{ tpl: "store", capture: "header", app: C, head: "One price. *iPhone, iPad, Mac.*", sub: "Cutling's App Store page" }],
    notes: ["Captured from the live App Store page; build.ts captures it again on each run, so run it the day before."],
  },
  {
    n: 41, date: "2026-12-05", slot: 2, app: U, kind: "film", tags: "u", film: "u-no-tap",
    gate: "AFTER 1.0.5: the no-tap redirect stop ships in 1.0.5. Checked Nov 21: asc_state.py 1.0.5 prints IOS WAITING_FOR_REVIEW.",
    pain: "U5 redirects \"without me clicking\", while scrolling",
    body: `Reading a news story, scrolling, no tap at all, and the page jumps to a fake Settings screen: "Platform Security… RUN A TEST".

The page did that, and your device is fine. Undirect 1.0.5 keeps you on the story.`,
    reply: `Undirect 1.0.5 is out now. $1.99 once.`,
  },
  {
    n: 42, date: "2026-12-05", slot: 3, app: C, kind: "film", tags: "c", film: "cutling-android-short",
    pain: "Pinned clips on iPhone (\"I especially miss the clipboard where you can pin\")",
    body: `Gboard on Android kept your pinned clips. Cutling pins them to your iPhone keyboard: your address, your work email, the Wi-Fi password.`,
    reply: `Cutling for iPhone and iPad, $4.99 once, with the Mac app included.`,
  },
  // ---------------- Sun Dec 6 ----------------
  {
    n: 43, date: "2026-12-06", slot: 1, app: U, kind: "film", tags: "u", film: "u2-short",
    pain: "U7 a Download button that leaves the page",
    body: `Tap Download, get a fake download page. Tap again, an "Add Calendar Subscription" pop-up.

Then the same Download with Undirect on.`,
    reply: `Undirect is $1.99 once, and one press per site turns it on.`,
  },
  {
    n: 44, date: "2026-12-06", slot: 2, app: C, kind: "text",
    pain: "C5 reply guys retyping a wallet address and handle",
    body: `Reply guys: your wallet address and your X handle, one tap from the keyboard. No text-replacement codes to remember.`,
    reply: `Cutling: $4.99 once on iPhone and iPad, Mac app included.`,
  },
  {
    n: 45, date: "2026-12-06", slot: 3, app: U, kind: "film", tags: "u", film: "u-back",
    gate: "AFTER 1.0.5: the Back-trap fix ships in 1.0.5. Checked Nov 21: IOS WAITING_FOR_REVIEW.",
    pain: "U6 Back taking you to the ad again",
    body: `Press Back to leave a live-stream site and land on a casino page instead?

From 1.0.5, with Undirect on for the site, Back just goes back.`,
    reply: `Back works again from Undirect 1.0.5. $1.99 once.`,
  },
  // ---------------- Mon Dec 7 ----------------
  {
    n: 46, date: "2026-12-07", slot: 1, app: C, kind: "film", tags: "cmac", film: "cutling-mac-history-short",
    pain: "C8 Windows people miss Win+V on a Mac",
    body: `Moved from Windows and miss Win+V?

Cutling for Mac keeps your clipboard history, and the passwords your manager marks as concealed stay out of it.`,
    reply: `Cutling: the Mac app and the iPhone keyboard in one $4.99 purchase.`,
  },
  {
    n: 47, date: "2026-12-07", slot: 2, app: U, kind: "image", tags: "u",
    pain: "U8 \"Safari opening seemingly random tabs on its own ... super freaked out\"",
    body: `Safari opening tabs on its own and you're freaked out?

The tabs came from the page you were on, and your iPhone is fine. Close them, and don't install anything they push.`,
    reply: `Undirect stops the ones a tap set off. $1.99 once.`,
    images: [{ tpl: "text", app: U, logo: false, lines: ["Random tabs in Safari: it's the *page.*", "Your iPhone is fine."], small: "Undirect stops the ones a tap set off." }],
  },
  {
    n: 48, date: "2026-12-07", slot: 3, app: C, kind: "poll",
    pain: "C5 what you retype most",
    reply: `Cutling keeps each of them on the keyboard. Save it once and tap it in.`,
    poll: {
      x: { q: "What do you retype most on your phone?", options: ["An address", "An email address", "The same reply", "A link"] },
      ig: { sticker: "Questions", q: "What do you retype most?", note: "Answers go back as frames showing them saved in Cutling.", bg: { tpl: "storyq", app: C, q: "What do you *retype* most?", shot: "c01" } },
      tt: { type: "Comment poll, up to 5 answers", q: "What do you retype most?", options: ["Address", "Email", "Wifi password", "Same reply", "Other"], film: "cutling-wifi-again",
        caption: `What do you retype most? Address, email, the wifi password for the fifth time? Vote in the poll.

Search Cutling on the App Store.` },
    },
    tags: "c",
    notes: ["TikTok uses the new cutling-wifi-again film in place of cutling-email, which P4, P38 and P79 already use, so \"Wifi password\" joins the comment poll."],
  },
  // ---------------- Tue Dec 8 ----------------
  {
    n: 49, date: "2026-12-08", slot: 1, app: C, kind: "film", tags: "c", film: "cutling-sync-short",
    pain: "C5 getting text from your iPhone to your Mac (\"emailing myself just to get text across\")",
    body: `Texting yourself a door code to get it from your iPhone to your iPad?

Save it in Cutling on the iPhone, and it's on the iPad keyboard too, through your iCloud.`,
    reply: `Cutling, $4.99 once, and the Mac app comes with it.`,
    notes: ["Film changed from cutling-share to cutling-sync-short: the post is about getting text to another device, which the sync film shows."],
  },
  {
    n: 50, date: "2026-12-08", slot: "kept", keptTime: { wib: "07:13", et: "19:13 Mon Dec 7" }, app: U, kind: "kept",
    pain: "KEPT: Undirect's launch day on MacPip (draft 14)",
    kept: { source: "social-posts.md draft 14", x: `Undirect's launch day on @macpiphq. If Safari on your Mac keeps opening tabs you never asked for, this is what stops them.
macpip.com/apps/undirect` },
    notes: ["Then the MacPip boost, as with Cutling's on Nov 18."],
  },
  {
    n: 51, date: "2026-12-08", slot: 3, app: C, kind: "image", tags: "cmac",
    pain: "Mac picker, clipboard history on the Mac",
    body: `On a Mac, press Shift-Command-V and your history is right there: the last thing you copied, and the cutlings you saved.`,
    reply: `Cutling for Mac comes with the iPhone and iPad keyboard. $4.99 once.`,
    images: [{ tpl: "shot", app: C, shot: "c06", head: "Shift-Command-V. *History.*" }],
    notes: ["Uses Cutling's App Store screenshot of the Mac picker on its History tab."],
  },
  // ---------------- Wed Dec 9 ----------------
  {
    n: 52, date: "2026-12-09", slot: 1, app: U, kind: "film", tags: "u", film: "u-no-tap-short",
    gate: "AFTER 1.0.5: describes 1.0.5's no-tap redirect stop. Checked Nov 21: IOS WAITING_FOR_REVIEW.",
    pain: "U5 \"keeps redirecting me to a scam page without me clicking on the screen\"",
    body: `A page that sends you to another site while you scroll, with no tap at all, now stays put in Undirect 1.0.5, and the address shows in its list.`,
    reply: `Undirect 1.0.5 is on the App Store now. $1.99 once.`,
  },
  {
    n: 53, date: "2026-12-09", slot: 2, app: C, kind: "film", tags: "c", film: "cutling-address-short",
    pain: "C5 \"the addresses of the three buildings we manage\"",
    body: `Managing three buildings means typing an address into every work order, at 14 seconds a go.

Save each one in Cutling, and it's one tap.`,
    reply: `Cutling, $4.99 once, iPhone and iPad with the Mac app.`,
  },
  {
    n: 54, date: "2026-12-09", slot: 3, app: U, kind: "poll",
    pain: "U9 Block Pop-ups is on and tabs still open",
    reply: `That switch stops windows a page opens by itself. A tab opened by your own tap passes it. Undirect checks what was under your finger.`,
    poll: {
      x: { q: "Safari's Block Pop-ups switch is on. Do tabs still open?", options: ["Yes, all the time", "Now and then", "Never", "What switch"] },
      ig: { sticker: "Emoji slider", emoji: "😠", q: "How much does a surprise ad tab ruin your night?", bg: { tpl: "storyq", app: U, q: "Block Pop-ups is on. *Still* tabs?", visual: "settings" } },
      tt: { type: "Q&A", q: "Ask us why Block Pop-ups doesn't stop it.", film: "u1", cut: "6s",
        note: "First answer video uses the first 6 s of u1, with the answer to \"does it block ads?\" as its caption.",
        caption: `Does Undirect block ads? No: it stops the tabs and redirects, and your blocker keeps the ads. Ask us why Block Pop-ups doesn't stop them.

Search Undirect on the App Store.` },
    },
    tags: "u",
  },
  // ---------------- Thu Dec 10 ----------------
  {
    n: 55, date: "2026-12-10", slot: 1, app: C, kind: "image", tags: "c",
    pain: "C6 \"I find it insane how the iPhone still doesn't have clipboard history\"",
    body: `Can an iPhone keep a clipboard history? No app can: iOS doesn't let apps read what you copy in the background.

Cutling keeps what you choose to save on iPhone, and its Mac app keeps the full history.`,
    reply: `Cutling: $4.99 once for both.`,
    images: [{ tpl: "cols", app: C, left: ["iPhone", "what you save"], right: ["Mac", "the full history"] }],
  },
  {
    n: 56, date: "2026-12-10", slot: 2, app: U, kind: "film", tags: "u", film: "u-ipad-short",
    pain: "U1 \"Best free movie site for iPad (no popups)?\"",
    body: `Looking for a free movie site on iPad with no popups?

The sites are the same ones, and Undirect works in Safari on iPad. Switch it on for the site, and the tabs stop.`,
    reply: `Undirect, $1.99 once, and the iPhone and Mac come with it.`,
  },
  {
    n: 57, date: "2026-12-10", slot: 3, app: C, kind: "film", tags: "c", film: "cutling-sync",
    pain: "C7 \"iCloud sync stopped working\"",
    body: `iPhone and iPad, one Apple ID, and the text you saved is on both.

Cutlings sync through your own iCloud, so there's no Cutling account to sign in to.`,
    reply: `Cutling: one $4.99 purchase for all three.`,
  },
  // ---------------- Fri Dec 11 ----------------
  {
    n: 58, date: "2026-12-11", slot: 1, app: U, kind: "image", tags: "u",
    pain: "U14 where Undirect can't help",
    body: `Where Undirect can't help: home-screen web apps and the browser inside other apps, because Safari extensions don't run there.

Open the link in Safari and it's covered.`,
    reply: `Undirect, for the Safari part. $1.99 once.`,
    images: [{ tpl: "text", app: U, lines: ["Home-screen web apps and in-app browsers: *no.*", "Safari on iPhone, iPad and Mac: *yes.*"] }],
  },
  {
    n: 59, date: "2026-12-11", slot: 2, app: C, kind: "film", tags: "c", film: "cutling-miss-android",
    pain: "Pinned clips on iPhone (\"Samsung switcher: the main thing I missed\")",
    body: `Switched from a Samsung? The Android things you miss: pasting without "Allow Paste", clipboard history, Gboard's pinned clips.

Cutling brings back the pinned clips: your booking link on the iPhone keyboard, one tap into any chat. It can't record what you copy.`,
    reply: `Cutling: $4.99 once for iPhone and iPad, Mac app included.`,
    notes: ["Uses the new cutling-miss-android film (\"Things I miss from Android\") in place of cutling-android, which P10 and P42 use."],
  },
  {
    n: 60, date: "2026-12-11", slot: 3, app: U, kind: "film", tags: "u", film: "AdPov",
    pain: "U1 the invisible layer over Play",
    body: `POV: you're the ad on a free movie site. They tap Play, you open a new tab. They tap again, you tell them their iPhone has 12 viruses.

Then they switched Undirect on for the site, and nothing you sent got through.`,
    reply: `That's Undirect switching on in the clip. $1.99 once.`,
    notes: ["Uses the new AdPov film in place of u1 (u1 is already on P1, P13 and P80); caption rewritten to match it."],
  },
  // ---------------- Sat Dec 12 ----------------
  {
    n: 61, date: "2026-12-12", slot: 1, app: C, kind: "poll",
    pain: "C4 trusting a Full Access keyboard",
    reply: `Cutling's keyboard has no network code at all, and the App Store label says Data Not Collected.`,
    poll: {
      x: { q: "Would you let a keyboard app hold your saved text?", options: ["Yes, if it's offline", "Only from big brands", "No third-party keyboards", "What's Full Access"] },
      ig: { sticker: "Questions", q: "What would you need to see before you trusted a keyboard?", bg: { tpl: "storyq", app: C, q: "What would make you *trust* a keyboard?" } },
      tt: { type: "Q&A", q: "Is a keyboard app safe?", film: "cutling-address",
        note: "First answer video: Full Access, what Cutling's keyboard reads (the word before the cursor), and that nothing leaves the phone, over this film.",
        caption: `Is a keyboard app safe to give Full Access? Ask us anything about what Cutling's keyboard reads and where it goes. Short answer: the word before the cursor, and nowhere.

Search Cutling on the App Store.` },
    },
    tags: "c",
  },
  {
    n: 62, date: "2026-12-12", slot: 2, app: U, kind: "film", tags: "u", film: "Quiz",
    pain: "U7 a Download button that sends you away",
    body: `Three Download buttons on a free file site, and only one of them is real. The other two send you to a calendar spam prompt and a fake cleaner app.

With Undirect on for the site, the fakes go nowhere and the real one downloads.`,
    reply: `Undirect, $1.99 once.`,
    notes: ["Uses the new Quiz film in place of u2 (u2 is on P31 and P86); caption rewritten to match it."],
  },
  {
    n: 63, date: "2026-12-12", slot: 3, app: C, kind: "film", tags: "cmac", film: "cutling-mac-history",
    pain: "C2 macOS Spotlight's clipboard history forgets after 8 hours",
    body: `Copy a flight number, then a one-time code, then an address. Press Command-V and only the address is left.

Press Shift-Command-V with Cutling for Mac: every copy is in the history, and passwords stay out.`,
    reply: `Cutling for Mac, with the iPhone keyboard in the same $4.99 purchase.`,
  },
  // ---------------- Sun Dec 13 ----------------
  {
    n: 64, date: "2026-12-13", slot: 1, app: U, kind: "film", tags: "umac", film: "u-mac",
    pain: "U15 a Mac Safari that opens tabs",
    body: `Click Play in Safari on your Mac and a tab you never clicked opens.

One click on Undirect's button for that site, and the next Play opens no tab.`,
    reply: `Undirect on the Mac App Store, $1.99 once with iPhone and iPad.`,
  },
  {
    n: 65, date: "2026-12-13", slot: 2, app: C, kind: "image", tags: "csmb",
    pain: "C5 Instagram sellers answering the same DMs (\"Is this still available?\")",
    body: `You sell on Instagram. "Is this still available?" "Where do you ship?" "How do I pay?" Forty times a day.

Save each answer once and tap it in.`,
    reply: `Cutling puts those answers on your iPhone keyboard. $4.99 once.`,
    images: [{ tpl: "dm" }],
  },
  {
    n: 66, date: "2026-12-13", slot: 3, app: U, kind: "image", tags: "u",
    pain: "U4 readers sent away mid-chapter",
    body: `Chapter 41. You press Next and a casino opens. You close it, press Next again, and it's a crypto site.

Switch Undirect on for that reader site once and the Next press stays on the chapter.`,
    reply: `Undirect works on any reader site you open in Safari. $1.99 once.`,
    images: [{ tpl: "reader" }],
  },
  // ---------------- Mon Dec 14 ----------------
  {
    n: 67, date: "2026-12-14", slot: 1, app: C, kind: "film", tags: "c", film: "cutling-share-short",
    pain: "C5 a booking link you go looking for",
    body: `Someone asks when you're free and you go hunting for your booking link.

Share the page to Cutling once. It's saved with a name, and next time it's one tap on your keyboard.`,
    reply: `Cutling for iPhone and iPad, $4.99 once.`,
  },
  {
    n: 68, date: "2026-12-14", slot: 2, app: U, kind: "poll",
    pain: "U12 blockers that cost a subscription",
    reply: `Undirect is $1.99 once, with no account and nothing sent anywhere.`,
    poll: {
      x: { q: "The Safari blocker you paid for was:", options: ["Monthly or yearly", "One payment", "A free one", "I don't use one"] },
      ig: { sticker: "Poll", q: "What's the most you paid for a Safari blocker?", options: ["Under $5", "$5 to $20", "Over $20", "Nothing"], bg: { tpl: "storyq", app: U, q: "Most you *paid* for a Safari blocker?" } },
      tt: { type: "Comment poll", q: "What did your blocker cost?", options: ["Nothing", "One payment", "Yearly", "Monthly"], film: "u1-short",
        caption: `What did your Safari blocker cost you? Vote in the poll.

Search Undirect on the App Store.` },
    },
    tags: "u",
  },
  {
    n: 69, date: "2026-12-14", slot: 3, app: C, kind: "image", tags: "c",
    pain: "C3 snippet apps that get abandoned or break",
    body: `Cutling has no account and no server, so there is nothing to switch off on you. Your cutlings live on your devices and in your own iCloud, and it works offline.`,
    reply: `Cutling is $4.99 once.`,
    images: [{ tpl: "text", app: C, lines: ["No *account.*", "Works *offline.*"], icon: true }],
  },
  // ---------------- Tue Dec 15 ----------------
  {
    n: 70, date: "2026-12-15", slot: 1, app: U, kind: "film", tags: "u", film: "u-back-short",
    gate: "AFTER 1.0.5: the Back-trap fix ships in 1.0.5. Checked Nov 21: IOS WAITING_FOR_REVIEW.",
    pain: "U6 Back taking you to the ad (\"go back 5 pages\")",
    body: `You press Back on a streaming site and it takes you to the ad again.

With Undirect 1.0.5 on for the site, Back just goes back.`,
    reply: `Undirect 1.0.5, $1.99 once.`,
  },
  {
    n: 71, date: "2026-12-15", slot: 2, app: C, kind: "film", tags: "c", film: "cutling-share",
    pain: "C5 an address found in a message",
    body: `Safari's share sheet has a Cutling button. Share a page to it, give it a name, and the next time a form asks, it's one tap on your keyboard.`,
    reply: `Cutling: $4.99 once, Mac app included.`,
  },
  {
    n: 72, date: "2026-12-15", slot: 3, app: U, kind: "image", tags: "u",
    pain: "U7 and U13 thrown to the App Store",
    body: `Tap a link and Safari throws you into the App Store.

If a page's trick did it, Undirect stops it. If it's a button that says it opens the App Store, like Google's "open the app", Undirect lets it through.`,
    reply: `Undirect is $1.99 once.`,
    images: [{ tpl: "text", app: U, lines: ["A page *tricked* you into the App Store: stopped.", "A button that says App Store: let through."] }],
  },
  // ---------------- Wed Dec 16 ----------------
  {
    n: 73, date: "2026-12-16", slot: 1, app: C, kind: "image", tags: "c",
    pain: "C5 addresses for holiday cards and parcels",
    body: `Mum, the office, Aunt Rina: three addresses you type every December.

Save each one in Cutling and tap the right one into the parcel form.`,
    reply: `Cutling: $4.99 once for iPhone and iPad, and the Mac app.`,
    images: [{ tpl: "kb", mode: "parcel" }],
    notes: ["Rewritten: the calendar's first line repeated P30's word for word, and the calendar says never post a text twice."],
  },
  {
    n: 74, date: "2026-12-16", slot: 2, app: U, kind: "film", tags: "u", film: "Dad",
    pain: "U1 and U8 free movie sites and the family member who thinks it's a virus",
    body: `Dad texts: "my iphone says it has 12 viruses??" It's the free movie site again, and now there are 9 tabs open.

I put Undirect on his iPhone and switched it on for that site. The movie just plays now.`,
    reply: `Undirect, $1.99 once. Dad's iPhone needed one press on that site.`,
    notes: ["Uses the new Dad film in place of u1-short (already on P37); caption rewritten to match it."],
  },
  {
    n: 75, date: "2026-12-16", slot: 3, app: C, kind: "film", tags: "c", film: "cutling-sync",
    pain: "C2 Universal Clipboard failing (\"copy-paste doesn't work between an iPhone and a Mac\")",
    body: `Copy on your iPhone, paste on your iPad, and nothing comes through.

Save it in Cutling instead: the office door code you saved on the iPhone is on the iPad keyboard too. It won't carry a one-off copy.`,
    reply: `Cutling is $4.99 once, Mac app included.`,
  },
  // ---------------- Thu Dec 17 ----------------
  {
    n: 76, date: "2026-12-17", slot: 1, app: U, kind: "film", tags: "u", film: "u-ipad",
    pain: "U1 on iPad (\"most free sites trigger a million\" pop-ups)",
    body: `iPad, free movie site, and Play opens a tab saying "Your iPhone has been hacked".

Switch Undirect on for the site in Safari and Play opens no more tabs. Same $1.99 as on iPhone and Mac.`,
    reply: `One purchase covers all three.`,
  },
  {
    n: 77, date: "2026-12-17", slot: 2, app: C, kind: "image", tags: "c",
    pain: "C1 subscription for a clipboard (\"$29.99 is crazy to me\")",
    body: `$29.99 a year. For a clipboard.

Cutling is $4.99, once, for iPhone, iPad and Mac, with no account.`,
    reply: `Cutling on the App Store.`,
    images: [{ tpl: "prices" }],
  },
  {
    n: 78, date: "2026-12-17", slot: 3, app: U, kind: "image", tags: "u",
    pain: "U13 \"I have an ad blocker and still get redirected\"",
    body: `Undirect hides nothing on the page, so it isn't an ad blocker, and keeping yours is fine.

It stops the tabs and redirects your blocker misses, so run the two side by side.`,
    reply: `Undirect is $1.99 once, and it runs next to whatever blocker you have.`,
    images: [{ tpl: "cols", app: U, left: ["Your blocker", "hides the ads"], right: ["Undirect", "sends your tap where you pressed"] }],
  },
  // ---------------- Fri Dec 18 ----------------
  {
    n: 79, date: "2026-12-18", slot: 1, app: C, kind: "film", tags: "c", film: "cutling-email",
    pain: "C5 email address in an email field",
    body: `Seven forms, seven taps. In an email field, the Cutling keyboard puts your email address first, so you don't go looking for it.`,
    reply: `Cutling: $4.99 once. It's the keyboard in the clip.`,
  },
  {
    n: 80, date: "2026-12-18", slot: 2, app: U, kind: "film", tags: "u", film: "u1",
    pain: "U1 the ad tab on Play, counted",
    body: `Press Play three times, get three different traps: a VPN alert, a virus countdown, a prize page.

The same press with Undirect on plays the video.`,
    reply: `That's Undirect in the second half. $1.99 once.`,
  },
  {
    n: 81, date: "2026-12-18", slot: 3, app: C, kind: "poll",
    pain: "C5 \"emailing myself just to get a bit of text\"",
    reply: `Save it in Cutling on the iPhone. It syncs through iCloud and shows in the Mac picker.`,
    poll: {
      x: { q: "To get text from your iPhone to your Mac, you:", options: ["Email myself", "Message myself", "AirDrop it", "Retype it"] },
      ig: { sticker: "Add Yours", q: "How you get text from iPhone to Mac", bg: { tpl: "storyq", app: C, q: "How do you get text from *iPhone to Mac?*" } },
      tt: { type: "Comment poll", q: "How do you move text from iPhone to Mac?", options: ["Email", "Message", "AirDrop", "Retype", "Other"], film: "cutling-sync-short",
        caption: `How do you get a bit of text from your iPhone to your Mac? Email yourself, message yourself, AirDrop, retype? Vote in the poll.

Search Cutling on the App Store.` },
    },
    tags: "c",
  },
  // ---------------- Sat Dec 19 ----------------
  {
    n: 82, date: "2026-12-19", slot: 1, app: U, kind: "film", tags: "u", film: "u-no-tap",
    gate: "AFTER 1.0.5: describes 1.0.5's no-tap redirect stop. Checked Nov 21: IOS WAITING_FOR_REVIEW.",
    pain: "U5 \"keeps redirecting me to a scam page\"",
    body: `You didn't tap anything, and the page sent you to a fake security alert anyway.

Undirect 1.0.5 keeps you where you were, and the address it tried shows in the list.`,
    reply: `Undirect 1.0.5 is $1.99 once, for Safari on iPhone, iPad and Mac.`,
  },
  {
    n: 83, date: "2026-12-19", slot: 2, app: C, kind: "film", tags: "cmac", film: "cutling-mac-history-short",
    pain: "C8 copying over something you still needed",
    body: `You copied a second thing and the first one is gone.

On a Mac, Cutling's history still has it.`,
    reply: `Cutling for Mac, with the iPhone keyboard in the same $4.99.`,
  },
  {
    n: 84, date: "2026-12-19", slot: 3, app: U, kind: "poll",
    pain: "U1 where the ad tab went",
    reply: `Each of those is a page taking your tap. Undirect sends the tap to what you pressed and lists the address.`,
    poll: {
      x: { q: "The last ad tab Safari opened for you was:", options: ["A casino", "A fake virus page", "The App Store", "Somewhere adult"] },
      ig: { sticker: "Questions", q: "Where did the last ad tab take you?", bg: { tpl: "storyq", app: U, q: "Where did the last ad tab *take you?*" } },
      tt: { type: "Poll sticker, 24 h", q: "Where did the last ad tab take you?", options: ["Casino", "Virus page", "App Store", "Other"], film: "u2-short", cut: "6s",
        caption: `Where did the last ad tab take you? Vote on the sticker.

Search Undirect on the App Store.` },
    },
    tags: "u",
  },
  // ---------------- Sun Dec 20 ----------------
  {
    n: 85, date: "2026-12-20", slot: 1, app: C, kind: "film", tags: "c", film: "cutling-address-field",
    pain: "C5 \"type out the same info over and over and over\"",
    body: `"Type out the same info over and over and over." That's how one reviewer described a paste keyboard's job.

Save it once in Cutling, and tap it in.`,
    reply: `Cutling, $4.99 once.`,
    notes: ["Uses the new cutling-address-field film (\"I've seen you type Main St 214 times\") in place of cutling-address."],
  },
  {
    n: 86, date: "2026-12-20", slot: 2, app: U, kind: "film", tags: "u", film: "u2",
    pain: "U2 a Download button on a free file site",
    body: `Download button, fake "download in progress" page. Every time.

Switch Undirect on for that site once, and the tab stays on the page.`,
    reply: `Undirect, $1.99 once, and the iPhone, iPad and Mac versions come together.`,
  },
  {
    n: 87, date: "2026-12-20", slot: 3, app: C, kind: "image", tags: "c",
    pain: "C13 \"Raycast dont allow images to save as Snippet\"",
    body: `A snippet app that won't keep images. In Cutling an image is a cutling too: save a screenshot once, tap it on the keyboard and paste it into the chat.`,
    reply: `Cutling: $4.99 once. Image cutlings paste on the Mac too.`,
    images: [{ tpl: "kb", mode: "image" }],
    notes: ["Text changed: tapping an image cutling copies it, and you paste it, since iOS keyboards cannot type an image in. The calendar said \"paste it from the keyboard\"."],
  },
];
