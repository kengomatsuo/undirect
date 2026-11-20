# Pain films v2: storyboard (ASG81)

Use: four social films, 1080 x 1920, 30 fps, for TikTok, Instagram Reels and X, plus a 7 s one-joke cut of each Undirect film. Not App Store previews (those ban prices and hands; these may show the price).

Replaces storyboard.md (v1), which the owner rejected: flat gradient background, small centred phone, small captions, plain icon end card. Every rule below cites docs/research/promo-video-research.md (U = Undirect section, C = Cutling section, G = general) and a still in docs/research/promo-video-refs/.

## What changes from v1, and why

| v1 | v2 | Reference |
|---|---|---|
| Small phone on a dark or pastel gradient | Phone screen fills the frame, full-bleed, no device mockup and no tilt | C rule 2 (every high-save tip video), U rule 6 (AutoClose in our old format: 336 views; Paste Shorts in it: 115 and 237), C rule 9 (Apple's marketing rules bar animated or angled Apple devices) |
| "Undirect off / on" as a faded subtitle | RTX-style badge pair, same corner and size in every shot: dark plate with a lime bar, OFF in grey, ON in lime | U rule 1, u-nvidia-tiktok-1.png, u-kym-rtx-1.png |
| A calm single tap on the OFF side | OFF is exaggerated: tab after tab, a cut every 1.2-1.6 s | U rule 2 (meme's overdone side, Adblock Plus cut rate, AdGuard header) |
| Cross-fade between off and on | A lime line wipes across the frame on the music's drop, with a whoosh and a hit | U rule 3, u-nvidia-tiktok-wipe.png, G44, G46 |
| Small heading | Big full-width words at the top in the buyer's own phrase, one line per beat, 5-10 words a second | U rule 5 (Pinchify BEFORE/AFTER, Total Adblock block caption), C rule 4 |
| Product wording ("Play opens another site") | The viewer's sites and words: streaming, manga, "every tap", "your bank number, again" | U rule 7, voice-of-customer files |
| Promise at 5-9 s | OFF and ON both shown by 5 s | U rule 4 (Pinchify BEFORE 2.3 s, AFTER 4.0 s), TikTok's first-3-s guidance |
| Icon end card with price | No end card: the ON result keeps playing and the last 2 s add one line "$1.99 once. No subscription." and the App Store badge, small | U rule 10, C rule 8 (no rival ends on a price; only Total Adblock shows "$1.99", which is their trial) |
| One 13 s cut | 13 s main cut, plus a 7 s one-joke cut for Undirect | U rule 9 (blob.h 8 s 4.3M, Opera GX 9 s 2.4M, Brave 5 s 552K) |
| Mixkit "Talent in the Air" with the drop on the press | A 110-130 BPM track with an instant groove, the drop on the wipe; owner picks from the sample reel | G40-G43; Mixkit licence covers all four platforms (G1) |

Also from the general craft lane: words sit between y 240 and 840 with lines of about 25 characters and nothing in the bottom 660 px (G38, G68-G70); one keyword per line gets a lime box (G13); the camera pushes in until the button pressed is the biggest thing on screen (G8, G11, G14); plain cuts everywhere except the one wipe (G55-G58); the last frame loops into the first (G83).

Still true from the research: the film shows the real way Undirect is switched on (the page menu's Undirect row), and every page in a take is a labelled fictional demo on a .example address (the "localhost" and striped stand-in takes are not used).

## Music

Sample reel: ~/Downloads/film-music-A-371-then-B-473.mp3 (12 s around each drop). A: Mixkit #371, 129 BPM, drop at 13 s. B: Mixkit #473 "Talent in the Air", 123 BPM, drop at 63 s (v1's track). Tempo measured from the files this session. Default A unless the owner picks B.

## Beat tables (seconds)

### U1 "Every tap opens another ad" (Undirect, 13 s)
| Time | Picture, full-bleed | Words (top) | Badge |
|---|---|---|---|
| 0.0-1.3 | A streaming page; tap Play; "YOU WON!" page slams in | Every tap opens another ad | OFF |
| 1.3-2.6 | Back, tap again: "CLAIM NOW" | (same) + tab counter "2" | OFF |
| 2.6-3.9 | Again: "FREE SPINS", counter "3" | "Block Pop-ups is on." | OFF |
| 3.9-5.0 | The page menu, the Undirect row pressed (real take) | One press for this site | wipe lands at 4.4 |
| 5.0-10.5 | Same tap: Night Harbor plays; the Undirect list shows prize-hub.example Blocked | Now play just plays | ON |
| 10.5-13.0 | Result held | $1.99 once. No subscription. + App Store badge | ON |

### U2 "Tap anything. Sent somewhere else." (Undirect, 13 s; the download-button complaint)
Same grammar: OFF cuts through three trips away (FREE SPINS, JACKPOT, a fake download host), switch at 4.4, ON: the tab comes straight back and the list shows the address it tried. Words: "Tap Download. Land on a casino." / "One press for this site" / "Now you stay put" / price line.

### U1-7s and U2-7s (one-joke cuts)
OFF 0-3 s (two slams), wipe on the drop at 3.0, ON 3.3-6 s, price line 6-7 s. No middle beat.

### C1 "Your bank number, again" (Cutling, 13 s)
| Time | Picture, full-bleed | Words (top) | Badge |
|---|---|---|---|
| 0.0-1.2 | Messages: "Can you send me your bank details?" arrives | Your bank number, again | OFF |
| 1.2-5.0 | The slow way at real speed, sped 2x: Notes, scroll, copy, back, paste (NEW TAKE needed) | Open Notes. Scroll. Copy. Paste. | OFF |
| 5.0-5.6 | Lime wipe on the drop | | ON |
| 5.6-9.5 | Same chat: hold the globe key, Cutling, tap Bank Account, the IBAN lands, Send | One tap | ON |
| 9.5-13.0 | Reply sent, "thanks!" arrives | $4.99 once. iPhone, iPad and Mac. + badge | ON |

### C2 "Your address, every checkout" (Cutling, 13 s)
OFF: k1-pain take (thumb-typing Street, flat, postcode letter by letter), the "localhost" chip covered. Wipe on the drop. ON: k2-tap take, one tap fills it. Words: "Typing your address. Again." / "One tap" / price line.

## Takes

- Undirect: the v9 App Store preview's takes and its fictional scam pages (wire/src/explainer2/pages.ts, Preview.tsx), re-staged full-bleed at 1080 x 1920. No new capture.
- Cutling C2: existing k1-pain and k2-tap. C1: one new iPhone take of the slow Notes way, recorded on the film simulator.
- Hands: the research favours a real hand on a real phone for social (C rule 10, U rule 6). We have no hand footage; full-bleed screen is the next best. A hand version needs the owner to film one.
