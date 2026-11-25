# Threads bio for @monholtco (2026-11-25)

The job: someone liked a reply from @monholtco, taps the avatar, and decides in about a second
whether to follow. The bio has to tell them three things: one person is talking, what that
person makes, and what the apps do for *them*. Today's line, "Apps that do exactly what they
say.", says only the second, and it says it like a brand (`docs/research/threads-brand-growth.md`,
sections 5 and 6.1).

Threads caps a bio at 150 characters. The counts below include the line breaks.

## The three options, ranked

### 1. Ship this one (143 characters)

```
Just me, making apps that do exactly what they say.
Undirect: Safari opens what you tapped.
Cutling: what you type over and over, one tap away.
```

Why it works: "Just me" says one person in two words, it keeps the owner's own line, and each app is named
next to what the reader gets from it, not next to what it does.

### 2. (136 characters)

```
One person, two Apple apps. I post what building them is like: the sales, the bugs, App Review.
Undirect for Safari, Cutling for typing.
```

Why it works: it tells the visitor what their feed gets if they follow (sales, bugs, App
Review), the same thing @muizahg's "Sharing what I build and learn" and @xilantra's download
count promise.

### 3. (110 characters)

```
One person making small Apple apps that each do one job, and do it exactly. Pay once, no subscription, no ads.
```

Why it works: it is the strictest reading of the house rule against listing app names. It
leaves the names to the link field and adds the one trust point both apps share, which is that
you pay once.

## Why 1 over 2 and 3

- The visitor arrives from a reply about Safari ad tabs or retyping. Option 1 is the only one
  that tells them, in their own terms, that the next app solves the thing they were reading
  about. Option 2 says "for Safari" and "for typing", which are categories, not results. Option 3
  says neither.
- It changes the least of what the owner wrote: his line stays word for word, and "Just me,
  making" turns it from a brand's tagline into a person talking.
- On Threads, makers name their apps: "made goSolat. 100K downloads in 9 days." (@xilantra),
  "Maker of Widgetsmith, Pedometer++, Sleep++ and Watchsmith." (@_davidsmith), "Developer of
  Apollo, Pixel Pals, and Amplosion!" (@christianselig). The house rule against listing app
  names (`public-copy-no-country-general-bio`) is about bare names nobody knows. In option 1,
  each name comes with what the reader gets from it. That is the "I make Resettle, a Mac menu bar
  app that ..." form the same memory accepts for a maker profile.
- Option 2 becomes the better bio once the posts really are build stories (routine 6.2, item
  2). Until then its promise of "the sales, the bugs" has nothing to show for it.

## Rule check (all three)

| Rule | 1 | 2 | 3 |
|---|---|---|---|
| Under 150 characters, line breaks counted | 143 | 136 | 110 |
| First person singular, never "we" (`social-voice-i`) | "Just me" | "One person", "I" | "One person" |
| No country or city (`public-copy-no-country-general-bio`) | none | none | none |
| Sells the result, not the mechanism (`copy-sells-results`) | "opens what you tapped", "one tap away" | categories only | "pay once" only |
| No maker-side words (blocked, caught, trap, detects) | none | none | none |
| True to the product | Undirect acts on taps, so "what you tapped" claims no more than it does (`undirect-voice-of-customer.md`, line 12). "Over and over" is the buyers' own phrase (`cutling-voice-of-customer.md`, A1). | yes | Both apps: paid once, no subscription, no ads (`web/_generator/ai_facts.py`, line 35) |
| No emoji | yes | yes | yes |

## The other profile fields

- **Links field.** Threads lists several links: @muizahg shows "+1", @thedizzyhub "+3",
  @jakemarsh "+4". Put monholt.com first, then undirect.matsuokengo.com and
  cutling.matsuokengo.com, so the bio can spend its characters on the person and not on URLs.
- **Name field.** It stays "Monholt", and the bio carries the person. Whether to show his own
  name or face is the owner's call (research, section 5). With the logo avatar kept, the "Just
  me" in option 1 does that job.
- **Other platforms.** `studio-bios.md` found that studios use one line everywhere, and the memory
  says a change to Monholt's line is the owner's call. This draft is for Threads only. If he picks
  option 1, he decides whether X and Instagram change with it.

## What was read (2026-11-25, Chrome, signed in as @monholtco)

| Account | Followers | Bio, as shown |
|---|---|---|
| @xilantra (goSolat) | 5,477 | "made goSolat. 100K downloads in 9 days." then "now building onTime app, because clocks never worked for me." |
| @muizahg (Postgres client for Mac) | 972 | "Programmer learning marketing" / "Sharing what I build and learn" / "Dms open for freelance work" |
| @thedizzyhub (ASOblick) | 31 | "I build stuff, currently focusing on iOS and macOS apps." |
| @_davidsmith (Widgetsmith) | 2,457 | "Independent app developer. Independent in general. Maker of Widgetsmith, Pedometer++, Sleep++ and Watchsmith." |
| @christianselig (Apollo) | 8,081 | "Developer of Apollo, Pixel Pals, and Amplosion! He/him" |
| @marcoarment (Overcast) | 16.6K | "Overcast. Formerly Tumblr, Instapaper." |
| @jakemarsh (Runheed, Multimeter) | 623 | an emoji list of roles, then "Co-founder/CTO of @shopsavvy and a bunch of other cool things." |
| @halideapp (company, team) | 11.5K | "📸 The best pro camera apps for iPhone and iPad ... We feature your best Halide & Kino shots ✨" |

What they share:

- Every one-person maker writes as a person, and none writes as a brand.
- The strongest bios are one fact plus one hook. Proof ("100K downloads in 9 days") or a reason
  ("because clocks never worked for me") beats a list of roles. Compare @xilantra with @jakemarsh.
- App names show up with something that makes them mean something to a reader, such as fame,
  proof or a reason. A bare list only works for names people already know (Selig, Smith,
  Arment).
- The one team account, Halide, uses "we" and sells the result ("get better photos and videos
  with a tap"). That is the brand voice @monholtco is moving away from.

Off Threads: Sindre Sorhus, who works alone on dozens of Mac apps, says on his about page that an
app should do one thing well (sindresorhus.com/about). That is the idea behind the owner's line,
and the reason option 1 keeps it.
