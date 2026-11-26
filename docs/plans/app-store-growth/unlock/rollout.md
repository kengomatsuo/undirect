# Free to download, unlock once: rollout

Card ASG240. Cutling becomes free to download on **2026-12-10** (`Unlock.freeSince` in `Cutling/CutlingStore.swift`).
A free copy holds 5 cutlings; the one-time purchase `com.matsuokengo.Cutling.unlock` (US $4.99) unlocks the rest on
iPhone, iPad and Mac. A copy acquired before 2026-12-10 was bought, so `AppTransaction.originalPurchaseDate` keeps it
unlocked for good.

The order matters: the app version that knows about the unlock must be live **before** the price drops, and the price
must drop **on** `freeSince`. Until that day the binary unlocks everyone, so it can ship early with no change for buyers.

| When | Step | Who |
|---|---|---|
| Now | App code: free limit, purchase, restore, unlock screen, keyboard and share hand-off | this card |
| Now | Create the in-app purchase `com.matsuokengo.Cutling.unlock`, non-consumable, US $4.99, with its review screenshot | App Store Connect, owner's yes |
| After 2.0 is out (Nov 30) | Submit the next version (2.1) with the in-app purchase attached | owner's yes |
| Before Dec 10 | Schedule the app price to Free from 2026-12-10, after the Black Friday price (Nov 27 to Dec 1) ends | App Store Connect, owner's yes |
| Dec 10 | Store descriptions, promotional text and the website switch to the free-download wording (`docs/plans/unlock/public-copy.md`) | site deploy + metadata upload |
| Dec 10 | Directory listings that show a price (MacPip, Mac Browse, Mac App Index, Get Indie Apps, AlternativeTo, MacBase, NativeShelf, Indie App Catalog, MacNative, LaunchIgniter) say "Free, one-time unlock" instead of "$4.99 once" | per site; MacPip has a maker MCP |
| Dec 10 | Social posts from then on can say "free to try"; earlier posts name no price, so none needs changing | posts |

## If the date moves

Move `Unlock.freeSince` and the price schedule together. A buyer who pays the old price after `freeSince` would be
asked to pay again; a copy acquired before `freeSince` while the price is already free would stay unlocked for nothing.
