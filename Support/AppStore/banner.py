#!/usr/bin/env python3
"""Banner images on App Store surfaces: the product page header and the search results asset, one image per locale.

    python3 Support/AppStore/banner.py upload <app-id> <prefix> <pattern>
        every file matching <pattern>, where {locale} stands for the locale folder or name
        (e.g. out/main/{locale}/banner.png), becomes Asset Library image "<prefix>-<locale>"; a rerun reuses an image
        already uploaded under that name
    python3 Support/AppStore/banner.py place <app-id> <prefix> (version|page) <id> [<id> ...]
        every localization of each App Store version (version) or custom product page version (page) shows image
        "<prefix>-<locale>" in both spots, in place of whatever held them
    python3 Support/AppStore/banner.py show <app-id> (version|page) <id> [<id> ...]
        prints which image each localization shows in both spots

Each spot holds one placement, and a placement can't be changed, so a replacement deletes the old placement and then
creates the new one; a spot that already shows the image is left alone, so a rerun finishes an interrupted run
(developer.apple.com/documentation/appstoreconnectapi/placing-assets-on-your-app-store-surfaces). Placements go
through App Review with their parent surface: a version or page still being prepared carries its new banners into its
own submission. An approved custom product page version refuses new placements; a live App Store version takes an
approved image without a new submission (Cutling 1.6.2, 2026-11-27). Every refusal is printed and fails the run.
"""
import glob, os, re, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import asc_api

SPOTS = ("PRODUCT_PAGE_HEADER_ASSET", "APP_STORE_SEARCH_RESULTS_ASSET")
SURFACE = {  # kind -> (localizations of one surface version, placement relationship, its type)
    "version": ("/v1/appStoreVersions/{}/appStoreVersionLocalizations",
                "appStoreVersionLocalization", "appStoreVersionLocalizations"),
    "page": ("/v1/appCustomProductPageVersions/{}/appCustomProductPageLocalizations",
             "appCustomProductPageLocalization", "appCustomProductPageLocalizations"),
}


def library(app):
    """referenceName -> image, for the app's creative images."""
    rows = asc_api.pages(f"/v1/appAssetLibraries/{app}/images?limit=200")
    return {x["attributes"].get("referenceName"): x for x in rows if x["attributes"].get("category") == "CREATIVE_ASSETS"}


def localizations(kind, ids):
    path, rel, typ = SURFACE[kind]
    for i in ids:
        for loc in asc_api.pages(path.format(i) + "?limit=200"):
            yield loc["attributes"]["locale"], f"/v1/{typ}/{loc['id']}", rel, typ, loc["id"]


def spots(loc_path):
    """spot -> [(placement id, image referenceName)] on one localization."""
    r = asc_api.call("GET", f"{loc_path}/placements?limit=50&include=image&fields[appAssetLibraryImages]=referenceName")
    names = {x["id"]: x["attributes"].get("referenceName") for x in r.get("included", [])}
    out = {s: [] for s in SPOTS}
    for p in r["data"]:
        s = p["attributes"]["placementType"]
        if s in out:
            img = ((p.get("relationships") or {}).get("image") or {}).get("data") or {}
            out[s].append((p["id"], names.get(img.get("id"))))
    return out


def upload(app, prefix, pattern):
    have = library(app)
    rx = re.compile("^" + re.escape(pattern).replace(re.escape("{locale}"), "(?P<locale>[^/]+)") + "$")
    for f in sorted(glob.glob(pattern.replace("{locale}", "*"))):
        loc = rx.match(f).group("locale")
        ref = f"{prefix}-{loc}"
        if ref in have:
            print(loc, "kept", have[ref]["attributes"]["state"], flush=True)
            continue
        r = subprocess.run(["asc", "asset-library", "images", "upload", "--library-id", app, "--file", f,
                            "--reference-name", ref, "--category", "CREATIVE_ASSETS", "--output", "json"],
                           capture_output=True, text=True, env={**os.environ, "ASC_TIMEOUT": "240s"})
        if r.returncode:
            sys.exit(f"{loc}: {r.stderr[-400:]}")
        print(loc, "uploaded", flush=True)


def place(app, prefix, kind, ids):
    have, bad = library(app), []
    for loc, loc_path, rel, typ, loc_id in localizations(kind, ids):
        img = have.get(f"{prefix}-{loc}")
        if not img:
            bad.append((loc, f"no image {prefix}-{loc}"))
            continue
        try:
            now = spots(loc_path)
            for s in SPOTS:
                if [n for _, n in now[s]] == [img["attributes"]["referenceName"]]:
                    continue
                for pid, _ in now[s]:
                    asc_api.call("DELETE", f"/v1/appAssetLibraryPlacements/{pid}")
                asc_api.call("POST", "/v1/appAssetLibraryPlacements", {"data": {
                    "type": "appAssetLibraryPlacements",
                    "attributes": {"placementType": s, "placementGroup": "DEFAULT_PROFILE"},
                    "relationships": {"image": {"data": {"type": "appAssetLibraryImages", "id": img["id"]}},
                                      rel: {"data": {"type": typ, "id": loc_id}}}}})
            print(loc, "ok", flush=True)
        except RuntimeError as e:
            bad.append((loc, str(e)[:300]))
            print(loc, "FAILED", str(e)[:300], flush=True)
    print(len(bad), "failed")
    for b in bad:
        print(*b)
    return not bad


def show(kind, ids):
    for loc, loc_path, *_ in localizations(kind, ids):
        print(loc, " ".join(f"{s.split('_')[0] if s.startswith('PRODUCT') else 'SEARCH'}={','.join(n or '?' for _, n in v) or '-'}"
                            for s, v in spots(loc_path).items()), flush=True)


if __name__ == "__main__":
    cmd, app, *rest = sys.argv[1:]
    if cmd == "upload":
        upload(app, *rest)
    elif cmd == "place":
        sys.exit(0 if place(app, rest[0], rest[1], rest[2:]) else 1)
    elif cmd == "show":
        show(rest[0], rest[1:])
    else:
        sys.exit(__doc__)
