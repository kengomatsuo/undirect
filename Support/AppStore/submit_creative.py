#!/usr/bin/env python3
"""Upload one universal creative per locale to the Asset Library and send them to App Review as a
standalone submission, with no new app version. Apple: "you can upload and get creative assets
approved without updating your app's version" (help/app-store-connect/manage-app-information/
manage-your-app-store-assets). Once approved, place_creative.py (or App Store Connect's Publish)
puts them on the live version.

    python3 Support/AppStore/submit_creative.py <app-id> <creative-dir> <reference-prefix>

Runs one request at a time to stay well under App Store Connect's rate limit. A rerun reuses
images already uploaded under the same reference name.
"""
import json, os, subprocess, sys

app, root, prefix = sys.argv[1:4]

def asc(*a):
    r = subprocess.run(["asc", *a, "--output", "json"], capture_output=True, text=True,
                       env={**os.environ, "ASC_TIMEOUT": "240s"})
    if r.returncode: raise SystemExit(f"asc {' '.join(a[:3])}: {r.stderr[-400:]}")
    line = r.stdout.splitlines()[0] if r.stdout else "{}"
    return json.loads(line)

def first_id(r, kind):
    if isinstance(r, dict):
        if r.get("type") == kind and r.get("id"): return r["id"]
        for v in r.values():
            i = first_id(v, kind)
            if i: return i
    if isinstance(r, list):
        for v in r:
            i = first_id(v, kind)
            if i: return i
    return None

listed = asc("asset-library", "images", "list", "--library-id", app, "--paginate")
have = {x["attributes"].get("referenceName"): x["id"] for x in listed["data"]}
ids = []
for loc in sorted(os.listdir(root)):
    f = os.path.join(root, loc, "universal.png")
    if not os.path.exists(f): continue
    ref = f"{prefix}-{loc}"
    i = have.get(ref) or first_id(asc("asset-library", "images", "upload", "--library-id", app, "--file", f, "--reference-name", ref), "appAssetLibraryImages")
    print(loc, i, flush=True); ids.append(i)

sub = first_id(asc("review", "submissions-create", "--app", app, "--platform", "IOS"), "reviewSubmissions")
for i in ids:
    asc("review", "items", "add", "--submission", sub, "--item-type", "appAssetLibraryImages", "--item-id", i)
asc("review", "submissions-submit", "--id", sub, "--confirm")
print("submitted", sub, len(ids), "images")
