#!/usr/bin/env python3
"""Copy the extension scripts next to the harness, with the trusted-gesture
checks relaxed so the tests can dispatch their own pointer events."""
import pathlib

here = pathlib.Path(__file__).parent
src = here.parent / "Extension" / "Resources"

for name in ("content/bridge.js", "sites/recipes.js", "lib/site.js"):
    (here / pathlib.Path(name).name).write_text((src / name).read_text())

guard = (src / "content" / "guard.js").read_text()
guard = guard.replace("|| !e.isTrusted) return;", "|| !(e.isTrusted || e.__fake)) return;")
guard = guard.replace("if (!e.isTrusted) return;", "if (!(e.isTrusted || e.__fake)) return;")
# The synthetic-click veto steps aside for real clicks; it must step aside
# for the harness's clicks too, or it eats them before the swap check runs.
guard = guard.replace("|| e.isTrusted || forwarding) return;", "|| e.isTrusted || e.__fake || forwarding) return;")
guard = guard.replace("if (e.isTrusted) clickedAt", "if (e.isTrusted || e.__fake) clickedAt")
(here / "guard.test.js").write_text(guard)

# The popup, with the extension APIs stubbed so it can be rendered on its own.
import json
import shutil

shutil.copy(src / "popup" / "popup.css", here / "popup.css")
shutil.copy(src / "popup" / "popup.js", here / "popup.js")
messages = json.loads((src / "_locales" / "en" / "messages.json").read_text())
sample = json.loads((here / "popup-state.json").read_text())

stub = (
    "<script>\n"
    "const MESSAGES = " + json.dumps(messages) + ";\n"
    "const STATE = " + json.dumps(sample) + ";\n"
    + (here / "popup-stub.js").read_text()
    + "</script>\n"
)
popup = (src / "popup" / "popup.html").read_text()
popup = popup.replace('<script src="popup.js"></script>', stub + '<script src="popup.js"></script>')
(here / "popup.html").write_text(popup)

print("harness refreshed from Extension/Resources")
