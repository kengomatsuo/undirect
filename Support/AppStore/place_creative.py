#!/usr/bin/env python3
"""Upload one universal creative image per locale to the Asset Library and place it as the
product page header and the search results asset on an editable App Store version.

    python3 Support/AppStore/place_creative.py <app-id> <version-id> <creative-dir>

<creative-dir>/<locale>/universal.png is a 5244x2950 PNG. Apple's guide:
developer.apple.com/documentation/appstoreconnectapi/placing-assets-on-your-app-store-surfaces
"""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, os.path.dirname(__file__))
import asc_api

app, version, root = sys.argv[1:4]
TYPES = ("PRODUCT_PAGE_HEADER_ASSET", "APP_STORE_SEARCH_RESULTS_ASSET")

def asc(*a):
    r = subprocess.run(["asc", *a, "--output", "json"], capture_output=True, text=True)
    if r.returncode: raise SystemExit(r.stderr[-400:])
    return json.loads(r.stdout)

locs = {d["attributes"]["locale"]: d["id"] for d in asc("localizations", "list", "--version", version)["data"]}

def rows(d):
    return d["data"] if isinstance(d, dict) and "data" in d else d

# one upload per locale: a rerun reuses what an earlier run already uploaded
have = {x["attributes"].get("referenceName"): x["id"] for x in rows(asc("asset-library", "images", "list", "--library-id", app, "--paginate"))
        if x["attributes"].get("category") == "CREATIVE_ASSETS"}

def uploaded_id(r):
    if isinstance(r, dict):
        if r.get("type") == "appAssetLibraryImages" and r.get("id"): return r["id"]
        for v in r.values():
            i = uploaded_id(v)
            if i: return i
    return None

def place(loc):
    f = os.path.join(root, loc, "universal.png")
    if not os.path.exists(f): return loc, "no image"
    try:
        image = have.get(f"creative-{loc}") or uploaded_id(asc("asset-library", "images", "upload", "--library-id", app, "--file", f, "--reference-name", f"creative-{loc}"))
        for t in TYPES:
            asc_api.call("POST", "/v1/appAssetLibraryPlacements", {"data": {"type": "appAssetLibraryPlacements",
                "attributes": {"placementType": t, "placementGroup": "DEFAULT_PROFILE"},
                "relationships": {"image": {"data": {"type": "appAssetLibraryImages", "id": image}},
                                  "appStoreVersionLocalization": {"data": {"type": "appStoreVersionLocalizations", "id": locs[loc]}}}}})
        return loc, "ok"
    except BaseException as e:
        return loc, repr(e)[:300]

with ThreadPoolExecutor(4) as ex:
    res = list(ex.map(place, sorted(locs)))
bad = [r for r in res if r[1] != "ok"]
print(len(res) - len(bad), "placed;", len(bad), "failed")
for r in bad: print(*r)
sys.exit(1 if bad else 0)
