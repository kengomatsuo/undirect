// The English X posts of @monholtco, short, each with the picture it goes out with.
//
// Owner, 2026-11-22: the X posts were too long and most had no picture. Every worded X row in
// deliveries.json takes its text and media from here (deliveries.ts applies it), so this file is the one
// place an X post is written. The picture specs are rendered by x-images.ts.
//
// What a post is (measured 2026-11-22, docs/research/social-formats-2026.md, "X: short posts with one picture"):
// - The claim sits in the first 8 to 10 words and the text before the link stays near 140 characters. The
//   best posts of the small-app makers @monholtco follows run 20 to 125 characters over one picture or clip.
// - One 1200 x 675 picture per post that explains or shows something. X's web timeline shows a single 16:9
//   picture whole at 518 x 291 and its mobile web timeline at 310 x 174; two or more pictures become a strip
//   that crops anything wider than about 1.18:1, so no X post here carries more than one.
// - Polls carry no picture (X allows none) and film posts keep their film.
// - No two posts share an opening or a sentence, Cutling never leads with bank details, clipboard history is
//   claimed on the Mac only, and the sale prices appear only inside the sale (deliveries.ts checks all four).

export type Layout = "side" | "side-right" | "under" | "pair" | "stack" | "icons";
export type Picture = {
  layout: Layout;
  /** Names of crops in x-images.ts SOURCES: one for side and under, two for pair and stack, none for icons. */
  shots: string[];
  /** The one short line on the picture. */
  line: string;
};
export type XPost = {
  /** The post's words, without the link. */
  text: string;
  /** Goes on its own last line; null for a post with no link. */
  link: string | null;
  /** The picture, for posts that explain or show something. Film and poll rows have none. */
  picture?: Picture;
  /** Set on a row whose words are the owner's approved ones, kept as they were. */
  kept?: true;
  /** For a row that had no words before: what it is now, shown in the calendar's format column. */
  format?: string;
};

const U = "undirect.matsuokengo.com";
const C = "cutling.matsuokengo.com";

export const X_POSTS: Record<string, XPost> = {
  // ---------- Nov 22 to 28 ----------
  "P01-en-X": { link: U, text: "You pressed Play and Safari opened a virus warning instead. Undirect gives that press back to the Play button. $1.99 once." },
  "P02-en-X": { link: C, text: "Typing your address into one more checkout form takes about 14 seconds. From the Cutling keyboard it takes one tap." },
  "P03-en-X": { link: U, text: "The page took your tap for an ad. Undirect hands it back to the button you pressed." },
  "P04-en-X": { link: C, text: "Wi-Fi login, 10%-off pop-up, check-in form, receipt: your email address, four times. Cutling's keyboard puts it first in every email field." },
  "X-heavy-en-1": { link: U, format: "Image (how-to)", text: "Undirect stays off until you ask. On the site that keeps opening tabs, open Safari's page menu, tap Undirect, then the power button. It stays on there.",
    picture: { layout: "under", shots: ["u-menu-row"], line: "It's in Safari's page menu." } },
  "P06-en-X": { link: C, kept: true, text: "Cutling keeps that text on the keyboard: save it once, tap it in from any app." },
  "P07-en-X": { link: U, text: "Tap Download on a movie site and a fake \"Download in progress\" page opens. With Undirect on for that site, you stay put." },
  "P08-en-X": { link: C, text: "Would you let a keyboard app read what you type? Cutling's keyboard has no network code, and its App Store label says Data Not Collected.",
    picture: { layout: "under", shots: ["c-privacy"], line: "Nothing leaves your phone." } },
  "P09-en-X": { link: "producthunt.com/products/cutling", kept: true, text: "Cutling is on Product Hunt today: a keyboard for the text you type again and again, on iPhone, iPad and Mac.",
    picture: { layout: "under", shots: ["c-tiles-links"], line: "On Product Hunt today." } },
  "X-original-en-1": { link: C, text: "\"Best regards\" and your name, typed under one more email on your phone. Save the sign-off in Cutling once and it's a tap.",
    picture: { layout: "under", shots: ["c-sign"], line: "Your sign-off, one tap." } },
  "P10-en-X": { link: C, text: "Moved from Android and miss pinned clips? Cutling pins the text you choose to your iPhone keyboard, one tap from any app." },
  "P11-en-X": { link: U, text: "Click Play in Safari on your Mac and a casino tab opens. One click on Undirect's toolbar button, and Play opens no tab on that site again." },
  "X-heavy-en-2": { link: C, format: "Image (how-to)", text: "Copied something you'll need again? Open the Cutling keyboard and tap Add from Clipboard. It's saved, and next time it's on the keyboard.",
    picture: { layout: "under", shots: ["c-addclip"], line: "Copied it? Keep it." } },
  "P12-en-X": { link: C, text: "Text Replacement only fires when you remember the shortcut. A cutling sits on your keyboard with its name on it, and it can hold a whole paragraph.",
    picture: { layout: "under", shots: ["c-tile-notes"], line: "No shortcut to remember." } },
  "P13-en-X": { link: U, text: "Free streaming site, and Play opens an ad every time. Switch Undirect on for that site once and Play just plays." },
  "P14-en-X": { link: C, text: "On your iPhone \"addr\" expands. On your iPad it stays \"addr\". Save the text in Cutling and it's on both keyboards, through your own iCloud." },
  "P15-en-X": { link: U, text: "An ad blocker hides ads. The tab that opens when you press Play is the page taking your tap, so there's nothing to hide. Undirect stops that one." },
  "P16-en-X": { link: C, text: "\"It's a clipboard, not a billboard,\" one reviewer wrote about a paste keyboard full of ads. Cutling has no ads and no account.",
    picture: { layout: "under", shots: ["c-suggest"], line: "No ads on this keyboard." } },
  "P17-en-X": { link: "apps.apple.com/app/id6759476314", kept: true, text: "Black Friday, Nov 27 to 30 on the App Store:\nCutling $2.99 (was $4.99)\nUndirect $0.99 (was $1.99)\nOne purchase covers iPhone, iPad and Mac.",
    picture: { layout: "icons", shots: [], line: "$0.99 and $2.99 until Nov 30." } },
  "X-heavy-en-3": { link: U, format: "Image (how-to)", text: "A pop-up you do want on one site? Open Undirect's list and set that address to Allowed on this site. Everywhere else it stays blocked.",
    picture: { layout: "side", shots: ["u-rule-menu"], line: "Allow it on one site." } },
  "P18-en-X": { link: U, text: "$40 a year for a blocker, and the redirect tabs still got through. Undirect is $0.99 until Nov 30, paid once, with no account.",
    picture: { layout: "under", shots: ["u-popup-rows"], line: "Paid once. No account." } },
  "P19-en-X": { link: C, kept: true, text: "Cutling is one purchase, no subscription, for iPhone, iPad and the Mac app." },
  "P20-en-X": { link: U, format: "Image", text: "Your iPhone doesn't have a virus. The \"iPhone at risk\" page came from the website you were on, and Undirect stops a tap from opening it.",
    picture: { layout: "side", shots: ["u-landed"], line: "It's the page, not your iPhone." } },
  "P21-en-X": { link: C, text: "On Windows, Win+V showed everything you'd copied. On a Mac, Cutling does it with Shift-Command-V, and concealed passwords stay out.",
    picture: { layout: "side-right", shots: ["c-mac-history"], line: "Win+V, for your Mac." } },

  // ---------- Nov 29 to Dec 20 ----------
  "P22-en-X": { link: U, text: "Every page turn in your manga reader opens another site? Turn Undirect on for the reader once and Next stays on the chapter.",
    picture: { layout: "side", shots: ["u-power"], line: "On for this site." } },
  "P23-en-X": { link: C, text: "Delivery app, address field: street, flat number and postcode by thumb, again. Or one tap on the Cutling keyboard.",
    picture: { layout: "under", shots: ["c-form"], line: "Your address, one tap." } },
  "P24-en-X": { link: U, kept: true, text: "The button can be part of the ad. With Undirect on for that site, the tab stays where it was and the address it tried goes in the list." },
  "P25-en-X": { link: C, text: "Your iPhone clipboard holds one thing: copy a new link and the last one is gone. Keep the ones you reuse on the Cutling keyboard.",
    picture: { layout: "under", shots: ["c-tiles"], line: "Kept until you delete it." } },
  "P26-en-X": { link: null, kept: true, text: "Last day of the Black Friday prices. Undirect is $0.99 and Cutling $2.99 until midnight Pacific, then back to $1.99 and $4.99.",
    picture: { layout: "icons", shots: [], line: "Last day at $0.99 and $2.99." } },
  "P27-en-X": { link: U, format: "Image", text: "You hit the X on the ad and another ad opens, because that X was part of the ad. With Undirect on, the press opens nothing.",
    picture: { layout: "under", shots: ["u-blocked-row"], line: "The X was part of the ad." } },
  "P28-en-X": { link: C, kept: true, text: "Cutlings sync through your own iCloud, and a deleted one comes back from Recently Deleted for 30 days." },
  "P29-en-X": { link: U, text: "Want to know where that tab was trying to take you? Undirect lists every address the page reached for, and the list never leaves your device.",
    picture: { layout: "under", shots: ["u-list"], line: "Every address it tried." } },
  "P30-en-X": { link: C, text: "Shipping form, delivery form, billing form: your address goes into all of them this month. Saved in Cutling, each one is a tap." },
  "P31-en-X": { link: U, text: "Press Download and get a fake download page, then an \"Add Calendar Subscription\" pop-up. With Undirect on you stay on the page you were on." },
  "P32-en-X": { link: C, text: "Copy, switch apps, paste, go back: four trips for one door code. Share the page to Cutling instead and next time it's on your keyboard." },
  "P33-en-X": { link: U, text: "Streaming on an iPad and every tap on Play leaves a new tab behind? Undirect works in Safari on iPad from the same $1.99 purchase." },
  "P34-en-X": { link: C, text: "A clipboard history that saves every password you copy is a risk. Cutling's Mac history skips anything your password manager marks as concealed." },
  "P35-en-X": { link: U, text: "Mac Safari, a movie site, one click on Play, and a casino tab. Turn Undirect on for the site and the next Play opens nothing." },
  "P36-en-X": { link: C, kept: true, text: "Cutling's Mac app keeps a clipboard history of its own, and what you save as a cutling stays until you delete it." },
  "P37-en-X": { link: U, text: "How many ad tabs did you close tonight to watch one episode? One person wrote \"repeat 7 times\". Here's the same tap with Undirect on." },
  "P38-en-X": { link: C, text: "Free Wi-Fi, 10% off, check-in, receipts. Every form wants your email address, and the Cutling keyboard offers it first." },
  "P39-en-X": { link: U, text: "Reddit's fix for redirect tabs is a hidden Safari flag called \"Verify window.open user gesture\". It half works. Undirect takes one press per site.",
    picture: { layout: "under", shots: ["u-settings-rows"], line: "No hidden setting." } },
  "P40-en-X": { link: C, text: "Bought a clipboard app for your Mac, then found the iPhone one is a second purchase? Cutling is $4.99 once for iPhone, iPad and Mac.",
    picture: { layout: "stack", shots: ["c-store", "c-devices"], line: "One price, three devices." } },
  "P42-en-X": { link: C, text: "Gboard kept your pinned clips on Android. Cutling pins them to your iPhone keyboard: your address, your work email, the Wi-Fi password." },
  "P43-en-X": { link: U, text: "Tap Download, get a fake download page. Tap again, an \"Add Calendar Subscription\" pop-up. Then the same Download with Undirect on." },
  "P44-en-X": { link: C, text: "Reply guys: your wallet address and your X handle, one tap from the keyboard. No text-replacement codes to remember.",
    picture: { layout: "under", shots: ["c-tile-bio"], line: "One tap from the keyboard." } },
  "P46-en-X": { link: C, text: "Moved from Windows and miss Win+V? Cutling for Mac keeps your clipboard history, and concealed passwords stay out of it." },
  "P47-en-X": { link: U, text: "Safari opening tabs on its own? They came from the page you were on, and your iPhone is fine. Close them and install nothing they push.",
    picture: { layout: "pair", shots: ["u-stream", "u-landed"], line: "You pressed Play. You got this." } },
  "P48-en-X": { link: C, text: "Whichever it is, Cutling puts it on your keyboard, one tap away." },
  "P49-en-X": { link: C, text: "Texting yourself a door code to get it from your iPhone to your iPad? A code saved in Cutling shows up on both." },
  "P50-en-X": { link: "macpip.com/apps/undirect", kept: true, text: "Undirect's launch day on @macpiphq. If Safari on your Mac keeps opening tabs you never asked for, this is what stops them.",
    picture: { layout: "side-right", shots: ["u-mac-popup"], line: "Launch day on MacPip." } },
  "P51-en-X": { link: C, text: "Press Shift-Command-V on a Mac and your clipboard history is right there, with the cutlings you saved next to it.",
    picture: { layout: "under", shots: ["c-mac-hotkey"], line: "Everything you copied on your Mac." } },
  "P53-en-X": { link: C, text: "Managing three buildings means typing an address into every work order, 14 seconds a go. With Cutling each address is a tap." },
  "P55-en-X": { link: C, text: "Can an iPhone keep a clipboard history? No app can: iOS won't let one read what you copy in the background. On a Mac, Cutling can.",
    picture: { layout: "pair", shots: ["c-grid-4", "c-mac-history"], line: "Saved on iPhone. Full history on Mac." } },
  "P56-en-X": { link: U, text: "Looking for a free movie site with no pop-ups on iPad? It's the same sites. Switch Undirect on for one in Safari and the tabs stop." },
  "P57-en-X": { link: C, text: "iPhone and iPad on one Apple ID, and the text you saved is on both. Cutling syncs through iCloud, so there's no account to make." },
  "P58-en-X": { link: U, text: "Where Undirect can't help: home-screen web apps and the browser inside other apps. Safari extensions don't run there, so open the link in Safari.",
    picture: { layout: "under", shots: ["u-urlbar"], line: "Only in Safari." } },
  "P59-en-X": { link: C, text: "Switched from a Samsung and miss Gboard's pinned clips? Cutling puts yours on the iPhone keyboard, one tap into any chat." },
  "P60-en-X": { link: U, text: "POV: you're the ad on a free movie site. They tap Play, you open a tab. Then they switch Undirect on, and nothing you send gets through." },
  "P61-en-X": { link: C, text: "For the record, Cutling's keyboard can't go online: there is no network code in it." },
  "P62-en-X": { link: U, text: "Three Download buttons on a free file site and only one is real. With Undirect on, the two fakes go nowhere and the real one downloads." },
  "P63-en-X": { link: C, text: "Copy a flight number, a tracking code, then an address. Command-V only has the address. Shift-Command-V in Cutling for Mac has the other two as well." },
  "P64-en-X": { link: U, text: "A tab you never clicked opens when you press Play on your Mac. One click on Undirect's button for that site and it stops." },
  "P65-en-X": { link: C, text: "\"Is this still available?\" \"Where do you ship?\" \"How do I pay?\" Forty times a day. Save each answer in Cutling and tap it in.",
    picture: { layout: "side-right", shots: ["c-grid-4"], line: "Same answer, one tap." } },
  "P66-en-X": { link: U, text: "Chapter 41. You press Next and a casino opens. Close it, press Next again, and it's a crypto site. Undirect keeps Next on the chapter.",
    picture: { layout: "under", shots: ["u-everywhere"], line: "Blocked on every site." } },
  "P67-en-X": { link: C, text: "Someone asks when you're free and you go hunting for your booking link. Share it to Cutling once and it lives on your keyboard." },
  "P68-en-X": { link: U, kept: true, text: "Undirect is $1.99 once, with no account and nothing sent anywhere." },
  "P69-en-X": { link: C, text: "Cutling has no account and no server, so there's nothing to switch off on you. Your cutlings stay on your devices and in your own iCloud.",
    picture: { layout: "under", shots: ["c-icloud"], line: "Your iCloud. No account." } },
  "P71-en-X": { link: C, text: "Safari's share sheet has a Cutling button. Share a page to it, name it, and the next form that asks takes one tap." },
  "P72-en-X": { link: U, text: "Safari threw you into the App Store from a link? If a page's trick did it, Undirect stops it. A button that says it opens the App Store still works.",
    picture: { layout: "under", shots: ["u-fine"], line: "What you pressed still opens." } },
  "P73-en-X": { link: C, text: "Mum, the office, Aunt Rina: three addresses you type every December. Save each in Cutling and tap the right one into the parcel form.",
    picture: { layout: "under", shots: ["c-addr-field"], line: "The right address, one tap." } },
  "P74-en-X": { link: U, text: "Dad texts: \"my iphone says it has 12 viruses??\" It was the free movie site again. I switched Undirect on for it, and the movie just plays." },
  "P75-en-X": { link: C, text: "Copy on your iPhone, paste on your iPad, and nothing comes through? What you save in Cutling is on the iPad keyboard when you get there." },
  "P76-en-X": { link: U, text: "\"Your iPhone has been hacked\", says a tab on your iPad. Switch Undirect on for that movie site in Safari and Play opens no more tabs." },
  "P77-en-X": { link: C, text: "$29.99 a year. For a clipboard. Cutling is $4.99, once, for iPhone, iPad and Mac, with no account.",
    picture: { layout: "under", shots: ["c-store"], line: "$4.99. Once." } },
  "P78-en-X": { link: U, text: "Undirect hides nothing on the page, so it isn't an ad blocker. It stops the tabs and redirects your blocker misses, so keep both.",
    picture: { layout: "under", shots: ["u-menu"], line: "Next to your ad blocker." } },
  "P79-en-X": { link: C, text: "Seven forms, seven taps. In an email field the Cutling keyboard shows your email address first, so you don't go looking for it." },
  "P80-en-X": { link: U, text: "Press Play three times and get three traps: a VPN alert, a virus countdown, a prize page. The same press with Undirect on plays the video." },
  "P81-en-X": { link: C, kept: true, text: "Save it in Cutling on the iPhone. It syncs through iCloud and shows in the Mac picker." },
  "P83-en-X": { link: C, kept: true, text: "You copied a second thing and the first one is gone.\n\nOn a Mac, Cutling's history still has it." },
  "P84-en-X": { link: U, kept: true, text: "Each of those is a page taking your tap. Undirect sends the tap to what you pressed and lists the address." },
  "P85-en-X": { link: C, text: "\"Type out the same info over and over and over.\" That's one reviewer on what a paste keyboard is for. In Cutling you save it once." },
  "P86-en-X": { link: U, text: "Download button, fake \"download in progress\" page, every time. One press turns Undirect on there and the tab stays on the page." },
  "P87-en-X": { link: C, text: "A snippet app that won't keep images? In Cutling an image is a cutling too: save a screenshot once and paste it from the keyboard.",
    picture: { layout: "under", shots: ["c-newmenu"], line: "An image is a cutling too." } },
};

/** Rows the routine leaves without words: quotes are chosen on the day, the rest still wait for a writer. */
export const xPost = (id: string): XPost | undefined => X_POSTS[id];
