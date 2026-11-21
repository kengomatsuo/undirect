# @monholtco test log

One row per delivery, filled at 48 hours. Plan and thresholds: `docs/research/posting-times-countries.md` section 4. Every test is a matched pair: same content type, same week, differing in one thing. A variant wins only at 7 of 8 pairs (or 6 of 6); anything less is "no difference yet" and the cheaper option stays. Compare medians, never totals. Installs decide over views.

| Date (WIB) | Post | Lang | Platform | Format | Test | Arm or variant | Paired with | Views 48 h | 3-s hold | Avg watch | Saves | Shares | Replies | Profile visits | Link taps | App Store taps (ct) | Installs that day (ct) | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | | | | | | | | |

## Tests running

- **T1 time slot:** every platform and language track has two or three slot arms. Read each arm's median views and App Store taps at 48 hours; after two weeks keep the winner and open a new challenger.
- **T2 hook:** Facebook reels use Business Suite's A/B test (caption A as written against B opening on the question; goal average time watched; 24 h). Instagram uses three trial reels per film (claim, hook, number) only once @monholtco has 1,000 followers; until then a normal Reel and no Instagram hook test.
- **T3 language:** the same film in two languages on the same platform in the same week. App Store taps per language decide, since iPhone share is 21% in Indonesia and 52-54% in the US and Japan.
- **T4 format, weeks 3-4:** X and Threads, film against image against text or poll on the same pain, same slot arm.
- **T5 Arabic on X:** Undirect only; `ct=x-ar` taps. Stop if under 1 tap a week after 3 weeks (GUESS threshold).
- **Help, no pitch:** at least 3 posts in 10. Read saves, shares and profile visits.

## Weekly checks

- [ ] ASC Sales by territory (needs the Sales role on API key 8R8JCJZUNJ and the vendor number).
- [ ] App Store Connect Campaigns: taps and installs per `ct` (counts show once a campaign passes 5 installs).
- [ ] Instagram follower count (trial reels at 1,000).
- [ ] TikTok Studio: most active times and top locations.
- [ ] YouTube Studio: Geography (and which channel carries the Shorts).
- [ ] A platform whose posts stay under a few hundred views for a week pauses two or three days and changes format.
