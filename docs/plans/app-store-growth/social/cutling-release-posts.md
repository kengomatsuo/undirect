# Cutling 2.0 release posts: blanks, dates and room for 5,000 (ASG104)

Drafts for the owner's yes. Nothing is posted or scheduled until he says go, and nothing goes out before
the release that carries the change is on sale (it is built and committed, not yet sent to App Review).
Research: ~/Repositories/Cutling/docs/research/release-posts/README.md (28 rival posts). Words:
~/Repositories/undirect/docs/research/cutling-niche-language.md.

Facts each line rests on, read 2026-11-21:
- 5,000 text and 500 image cutlings, up from 100 and 25: `CutlingStore.maxTextCutlings`, `maxImageCutlings`
  (re-read 2026-11-21 after the caps were raised again); release_notes.txt "Room for 5,000 text cutlings and 500 images."
- 77 MB is what iOS gives a keyboard; 10,000 full-length texts peaked at 65 MB in the simulator, so 5,000
  leaves room (the comment above the limits in CutlingStore.swift).
- The release is Cutling 2.0.0 (MARKETING_VERSION, commit 52db5d28).
- Fill-ins: a blank or today's date is added from the editor's Add Fill-in or Date and shows as a pill; tapping
  the cutling asks for the blank and types the rest. Braces typed by hand stay text (FillInPills.swift), so no
  post says "write {Name}".
- A tap on any key types its text, Formatted keys included; a long press on a Formatted key offers Copy
  with the formatting (commit 06396315).
- $4.99 once, no subscription, the Mac app included (web/_generator/ai_facts.py).
- The MacPip review that asked for more room: "the caps of 100 snippets and 25 images may feel tight".

Shape choices from the research: one change per post (Things rows 16-17), a maker's plain voice, no
hashtags on X (Raycast, Things, CleanShot), the link in our own reply on X, the price stance last
(CleanShot row 12), Threads ending on a question a reader can answer from their own phone.

## X (three posts, one change each, morning, afternoon, evening)

Post 1, with a clip of adding a blank in the editor, then tapping the reply in Messages and typing the name:

> Most saved replies are the same except for one name. Cutling 2.0 lets you put a blank in a saved reply: tap it, type the name, and the rest is typed for you. A date blank puts in today's date.
>
> $4.99 once.

Post 2, with a 10-second clip scrolling the full keyboard:

> Cutling used to stop at 100 saved texts. A MacPip review called that tight, and it was.
>
> It now holds 5,000 texts and 500 images. I filled the iPhone keyboard with 10,000 full-length texts and measured it: 65 MB, under the 77 MB iOS allows a keyboard.

Post 3, with a clip of a tap on a bold, linked text typing it into Messages:

> A saved text with bold and a link used to copy when you tapped it, while every other key typed. Now every tap types. Hold a formatted one if you want the formatting copied.

Each gets our own reply with the App Store link and its campaign (`ct=x-release`).

## Threads (one post)

> Cutling 2.0's iPhone keyboard fills in blanks: add one to a saved reply, tap the reply, type the name. It also holds 5,000 saved texts and 500 images now, up from 100 and 25. Same one-time $4.99, Mac app included.
>
> What's the reply you send most, with only the name changed?

Topic tag: iPhone Apps. Link in a self-reply.

## Instagram (carousel, 3 slides, Meta Business Suite)

Caption (hook inside the first 125 characters):

> Same reply, different name? Cutling 2.0 lets you leave a blank in it. Tap the reply, type the name, and Cutling types the rest. Pay once, no subscription. Link in bio.
>
> #iphonetips #textreplacement #productivityapps #iosapps #macapps

Slides, all from real recordings on the green Cutling ground: (1) the editor's blank pill in a reply, then the reply sent with the name filled in; (2) the keyboard full of keys, headline "5,000 saved texts"; (3) "$4.99 once. iPhone, iPad and Mac."

## TikTok (one video, 12-15 s)

On screen in the first 3 s: "Same reply, different name every time?" Then: tap the cutling, type the name, the whole reply lands in the chat; a fast scroll through the keys; the price card. Spoken or on-screen search phrase: "text replacement with blanks".

Caption: "Saved replies that ask for the name. #iphonetips #iphonehacks #textreplacement #iosapps"

## Media still to make after his yes

The recordings come from the queue simulator with the `-MEMORY_TEST` and `-FILLIN_TEST` seeds, cut per
the `product-video` skill: brand green, one hero, words inside the safe box.
