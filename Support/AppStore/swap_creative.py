#!/usr/bin/env python3
"""Replace the product page header and search results banners with approved Asset Library images,
on live or editable versions, in every locale.

    python3 Support/AppStore/swap_creative.py <app-id> <old-prefix> <new-prefix> <version-id> [version-id ...]

Each old image `<old-prefix>-<locale>` loses every placement it has, and the approved image
`<new-prefix>-<locale>` is placed as header and search results on each listed version. Apple lets a
live version take approved creative assets without a new version (help/app-store-connect/
manage-app-information/manage-your-app-store-assets). One request at a time; a rerun skips
placements that already exist.
"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(__file__))
import asc_api

app, old, new, *versions = sys.argv[1:]
TYPES = ("PRODUCT_PAGE_HEADER_ASSET", "APP_STORE_SEARCH_RESULTS_ASSET")

def asc(*a):
    r = subprocess.run(["asc", *a, "--output", "json"], capture_output=True, text=True,
                       env={**os.environ, "ASC_TIMEOUT": "240s"})
    if r.returncode: raise RuntimeError(r.stderr[-300:])
    return json.loads(r.stdout.splitlines()[0])

images = {x["attributes"].get("referenceName"): x for x in asc("asset-library", "images", "list", "--library-id", app, "--paginate")["data"]}
locs = [{x["attributes"]["locale"]: x["id"] for x in asc("localizations", "list", "--version", v)["data"]} for v in versions]
bad = []
for loc in sorted({l for m in locs for l in m}):
    n = images.get(f"{new}-{loc}")
    if not n or n["attributes"].get("state") != "APPROVED":
        bad.append((loc, "new image missing or not approved")); continue
    try:
        o = images.get(f"{old}-{loc}")
        if o:
            for p in asc("asset-library", "images", "placements", "--id", o["id"])["data"]:
                asc_api.call("DELETE", f"/v1/appAssetLibraryPlacements/{p['id']}")
        have = len(asc("asset-library", "images", "placements", "--id", n["id"])["data"])
        if have >= 2 * len(versions): print(loc, "already placed"); continue
        for m in locs:
            if loc not in m: continue
            for t in TYPES:
                try:
                    asc_api.call("POST", "/v1/appAssetLibraryPlacements", {"data": {"type": "appAssetLibraryPlacements",
                        "attributes": {"placementType": t, "placementGroup": "DEFAULT_PROFILE"},
                        "relationships": {"image": {"data": {"type": "appAssetLibraryImages", "id": n["id"]}},
                                          "appStoreVersionLocalization": {"data": {"type": "appStoreVersionLocalizations", "id": m[loc]}}}}})
                except RuntimeError as e:
                    if "409" not in str(e): raise
        print(loc, "ok", flush=True)
    except BaseException as e:
        bad.append((loc, repr(e)[:200]))
print(len(bad), "failed"); [print(*b) for b in bad]
