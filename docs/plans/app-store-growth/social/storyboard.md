# Pain cuts, week 1: storyboard (ASG73)

Use: social films for X, Instagram Reels and TikTok, 1080 x 1920, 30 fps, English. Not App Store previews. Posted on the dates in `pains-calendar.md` (P2, P3, P5, P6).

Brief: each film answers one complaint from the voice-of-customer files in under 15 seconds: the complaint as it happens on screen, the same press with the app, then the price. The headline is the complaint in the buyer's words; the screen proves the second line.

## Directions considered

| | Direction | Taken? |
|---|---|---|
| A | The approved App Store preview layout: words in a band, the real recording below at its own aspect, end card with icon and price | Yes. The same takes and layout the store previews already use, so the films match the listing, and each renders in about a minute on the Mac |
| B | The 3D explainer (phone on a moving rig, as in the YouTube films) | No: 3D renders are heavy on the Mac's memory, and the explainer already covers the story at length |
| C | Full-bleed screen recording with captions over it | No: TikTok's and Reels' own buttons would sit over the app's controls |

Music: Mixkit "Talent in the Air" (#473) for both apps, free for social use and not registered with Content ID; Pixabay "Revival" was claimed on YouTube (see cutling-promo `src/music.ts`). The drop lands on the press that fixes the problem. Tap sounds on every press.

Safe box: words sit between y 150 and 480, clear of TikTok's and Reels' top and bottom bars; the right 130 px stay empty for their buttons.

## Beat tables (seconds)

### U1 An ad tab on every tap (Undirect, 13.2 s, `undirect-promo` Pain-AdTabEveryTap)
| Time | Picture (take) | Words |
|---|---|---|
| 0.0-4.6 | Undirect off: Reelhouse, tap Play at 2.3, a stranger's page loads (take3/reel-off) | An ad tab on every tap / Undirect off: Play opens another site |
| 4.6-9.6 | Undirect on: same tap, the page stays and the popup shows pulse2 Blocked (take3/reel-on) | Undirect on / Play stays put, and the ad shows as blocked |
| 9.6-13.2 | End card | Undirect / $1.99 once / Safari on iPhone, iPad and Mac |

### U7 Download sends the tab away (Undirect, 12.4 s, Pain-DownloadButton)
| Time | Picture | Words |
|---|---|---|
| 0.0-4.8 | Quickpatch, tap Download now at 2.0, the tab lands on another site (take3/qp-off) | Download sends the tab away / Undirect off: you land on another site |
| 4.8-8.8 | Undirect on: same tap, the tab is pulled straight back (take3/qp-on) | Undirect on / The tab comes straight back |
| 8.8-12.4 | End card | as above |

### C5 Your bank number, again (Cutling, 13.8 s, `cutling-promo` Pain-BankNumber)
| Time | Picture | Words |
|---|---|---|
| 0.0-2.9 | Messages: Maya asks for the bank number, tap the field (rec3/en/iphone-tap 0.5-3.4) | Your bank number, again / Someone asks for it in a chat |
| 2.9-5.1 | Hold the globe key, pick Cutling (7.6-9.8) | Switch to Cutling / Hold the globe key |
| 5.1-10.2 | Tap Bank Account; the IBAN lands in the field (13.4-18.2) | Tap it in / Saved once, there in any app |
| 10.2-13.8 | End card | Cutling / $4.99 once / iPhone, iPad and Mac |

### C5 Typing your address again (Cutling, 14.8 s, Pain-DeliveryAddress)
| Time | Picture | Words |
|---|---|---|
| 0.0-5.5 | Delivery form, the address typed by hand letter by letter (rec/k1-pain) | Typing your address again / Street, flat, city, postcode |
| 5.5-11.2 | Cutling keyboard, tap Home Address; the full address fills the field (rec/k2-tap) | Or tap it in / From the Cutling keyboard, all of it at once |
| 11.2-14.8 | End card | as above |

Stills of every row: `storyboard/*.png`. Every take is a real Simulator recording already used in the approved store previews; no screen is drawn.
