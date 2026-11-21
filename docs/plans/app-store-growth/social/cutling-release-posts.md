# Cutling release posts: the update with 1,000 saved texts (ASG104)

Drafts for the owner's yes. Nothing is posted or scheduled until he says go, and nothing goes out before
the release that carries the change is on sale (it is built and committed, not yet sent to App Review).
Research: ~/Repositories/Cutling/docs/research/release-posts/README.md (28 rival posts). Words:
~/Repositories/undirect/docs/research/cutling-niche-language.md.

Facts each line rests on, read 2026-11-21:
- 1,000 text and 50 image cutlings, up from 100 and 25: `CutlingStore.maxTextCutlings`, `maxImageCutlings`;
  release_notes.txt "Room for 1,000 text cutlings and 50 images."
- 77 MB is what iOS gives a keyboard on the smallest supported iPhones; 1,000 full-length texts and 50
  photos peaked at 69 MB in the simulator (commit 19884a9d, .claude/rules/app-code.md).
- A tap on any key types its text, Formatted keys included; a long press on a Formatted key offers Copy
  with the formatting (commit 06396315).
- $4.99 once, no subscription, the Mac app included (web/_generator/ai_facts.py).
- The MacPip review that asked for more room: "the caps of 100 snippets and 25 images may feel tight".
- Fill-ins are off in every build, so no post mentions them.

Shape choices from the research: one change per post (Things rows 16-17), a maker's plain voice, no
hashtags on X (Raycast, Things, CleanShot), the link in our own reply on X, the price stance last
(CleanShot row 12), Threads ending on a question a reader can answer from their own phone.

## X (two posts, hours apart)

Post 1, release day, morning slot, with a 10-second screen recording scrolling the full keyboard:

> Cutling used to stop at 100 saved texts. A MacPip review called that tight, and it was.
>
> The new version holds 1,000 texts and 50 images. I filled the iPhone keyboard to the top and measured it: 69 MB, under the 77 MB iOS allows a keyboard.
>
> $4.99 once.

Reply under it: the App Store link with its campaign (`ct=x-release`).

Post 2, same day, evening slot, with a clip of a tap on a bold, linked text typing it into Messages:

> A saved text with bold and a link used to copy when you tapped it, while every other key typed. Now every tap types. Hold a formatted one if you want the formatting copied.

## Threads (one post)

> Cutling's iPhone keyboard now holds 1,000 saved texts and 50 images, up from 100 and 25. Same keyboard, same one-time $4.99, Mac app included.
>
> What do you paste most often? Mine is my email address.

Topic tag: iPhone Apps. Link in a self-reply.

## Instagram (carousel, 3 slides, Meta Business Suite)

Caption (hook inside the first 125 characters):

> Your iPhone keyboard can hold 1,000 saved texts now. Tap one, it types. Pay once, no subscription. Link in bio.
>
> #iphonetips #textreplacement #productivityapps #iosapps #macapps

Slides, all from real recordings on the green Cutling ground: (1) the keyboard full of keys, headline "1,000 saved texts"; (2) a tap typing a saved reply into Messages; (3) "$4.99 once. iPhone, iPad and Mac."

## TikTok (one video, 12-15 s)

On screen in the first 3 s: "My iPhone keyboard holds 1,000 saved texts". Then a fast scroll through the keys, a tap that types an address into a delivery app's field, and the price card at the end. Spoken or on-screen search phrase: "clipboard keyboard for iPhone".

Caption: "Saved texts on the iPhone keyboard, 1,000 of them now. #iphonetips #iphonehacks #textreplacement #iosapps"

## Media still to make after his yes

The recordings come from the queue simulator with the 1,000-text seed (`-MEMORY_TEST` launch), cut per
the `product-video` skill: brand green, one hero, words inside the safe box.
