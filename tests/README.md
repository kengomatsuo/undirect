# Trap harness

Nine checks against the three click-stealing patterns, run in a browser.

```bash
python3 tests/build.py
python3 tests/serve.py &
open http://127.0.0.1:8766/run.html
```

`build.py` copies the extension scripts here and relaxes one thing: the guard
ignores events it did not see the browser generate, so the copy accepts the
harness's own pointer events. Everything else is the shipping code.

`shim.js` stands in for the extension APIs, and for a viewport. A browser pane
that is hidden reports a viewport of zero, which collapses percentage layout, so
the harness sizes its traps in pixels and overrides `innerWidth` to match.

Re-run `build.py` after any edit to `Extension/Resources`. The copies here are
build output and are not edited by hand.
