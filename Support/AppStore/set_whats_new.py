#!/usr/bin/env python3
"""Set What's New on every localization of one editable App Store version.

    python3 Support/AppStore/set_whats_new.py <version-id> <notes.json>

notes.json maps each App Store locale to its text."""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
import asc_api
version, path = sys.argv[1:3]
notes = json.load(open(path, encoding="utf-8"))
rows = asc_api.pages(f"/v1/appStoreVersions/{version}/appStoreVersionLocalizations?limit=200")
missing = [r["attributes"]["locale"] for r in rows if r["attributes"]["locale"] not in notes]
if missing: raise SystemExit(f"no text for {missing}")
for r in rows:
    asc_api.call("PATCH", f"/v1/appStoreVersionLocalizations/{r['id']}", {"data": {"type": "appStoreVersionLocalizations", "id": r["id"], "attributes": {"whatsNew": notes[r["attributes"]["locale"]]}}})
print(len(rows), "set")
