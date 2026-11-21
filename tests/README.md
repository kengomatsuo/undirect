# Trap harness

Checks against the click-stealing patterns, run in a browser, plus the
background half run on its own.

```bash
python3 tests/build.py
python3 tests/serve.py &
open http://127.0.0.1:8766/run.html
bun tests/background.test.mjs
```

**Turn the extension off in the browser you run this in.** The shipping guard
refuses a click the page dispatched itself on a cross-site `_blank` link, which
is what the swap test's release looks like from the outside, so with the
extension enabled it vetoes the harness's own clicks before any test listener
sees them. Three checks fail that way, and the veto is the guard working.

`run-notap.html` stages a redirect with no press (in the first script, on a
timer, by `location.replace`), stacked copies of the same address, and Back
answered with another site. It needs the Navigation API (Safari 26.2). Each
check passes by the page staying put; a redirect that gets through lands on
`landed.html`, which says FAIL.

`background.test.mjs` runs `background.js` against stub extension APIs. It is
separate because the case that matters most cannot be staged in a page: Safari
unloads the background page, and a navigation that arrives while the record is
still being restored has to be judged anyway.

`fx.test.mjs` (`bun tests/fx.test.mjs`) checks the two calculations in
`content/fx.js` that no picture can: the spring easings, and that the shards a
pane breaks into tile it exactly. The jitter is random, so the run prints its
seed; `SEED=<n>` replays it. How the note and the effects look is judged from
frames, in `docs/screenshots/page-effects/`.

`build.py` copies the extension scripts here and relaxes one thing: the guard
ignores events it did not see the browser generate, so the copy accepts the
harness's own pointer events. Everything else is the shipping code.

`shim.js` stands in for the extension APIs, and for a viewport. A browser pane
that is hidden reports a viewport of zero, which collapses percentage layout, so
the harness sizes its traps in pixels and overrides `innerWidth` to match. It
also forces `mode: "everywhere"`, since the shipping default guards no site
until a toolbar press turns it on, and this harness has no toolbar.

Re-run `build.py` after any edit to `Extension/Resources`. The copies here are
build output and are not edited by hand.

`sites/` holds copies of real pages' traps for a device run, served by
`serve.py` at `http://127.0.0.1:8766/sites/<name>.html`. Use one when the real
site sits behind a bot check. Open it with Undirect on for 127.0.0.1, and once
on `localhost:8767` as a baseline with the guard off, so each host keeps its
own cookies. `reelfren.html` is reelfren.net's 800×600 pop under an
`opacity:0.01` layer; passed in the iOS 27.2 Simulator on 2026-11-07.
