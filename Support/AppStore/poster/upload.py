#!/usr/bin/env python3
"""Puts the poster frames on an App Store version through the App Store Connect API, then reads every set back.

    python3 upload.py <version> [--after <previous>] [--only IOS|MAC_OS] [--locales a,b] [--readback-only]

Per platform: when <version> is editable it is used; when it does not exist and <previous> reads READY_FOR_SALE it is
created (no build, nothing submitted; App Store Connect copies text from the live version); otherwise the platform
waits. Each display type in each language is compared with disk by MD5 (sourceFileChecksum) in order, and a set that
differs is emptied and uploaded again from Support/AppStore/<locale>/<device>/ (English locales: the default sets
Support/AppStore/<device>/). The readback after it fails the run when any set differs from disk; a checksum held twice
is a duplicate from a retried upload and is deleted by its id. Runs on the Mac or in the App Store shots workflow.
Prints one line per platform; exits 0 once every platform's sets match disk.
"""
import hashlib, json, os, sys, urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
APPSTORE = HERE.parent
sys.path.insert(0, str(APPSTORE))
import asc_api  # noqa: E402

APP = "6810513194"
STORE = [l["code"] for l in json.loads((APPSTORE / "locales.json").read_text())["locales"]]
EDITABLE = {"PREPARE_FOR_SUBMISSION", "DEVELOPER_REJECTED", "REJECTED", "METADATA_REJECTED"}
# display type -> (folder, file filter)
SETS = {
    "IOS": {"APP_IPHONE_67": ("iphone", ""), "APP_IPAD_PRO_3GEN_129": ("ipad", ""),
            "APP_IPHONE_DUO": ("duo", "")},
    "MAC_OS": {"APP_DESKTOP": ("mac", "")},
}


def files(loc, folder):
    d = APPSTORE / loc / folder
    if not d.is_dir():
        d = APPSTORE / folder
    fs = sorted(d.glob("*.png"))
    if folder == "duo":   # the outer screen's frames first, then the inner's
        fs = sorted(fs, key=lambda f: (not f.name.startswith("outer"), f.name))
    return fs


def md5(p):
    return hashlib.md5(p.read_bytes()).hexdigest()


def version(platform, vs, after):
    rows = asc_api.pages(f"/v1/apps/{APP}/appStoreVersions?filter[platform]={platform}&limit=50")
    by = {r["attributes"]["versionString"]: r for r in rows}
    if vs in by:
        st = by[vs]["attributes"]["appStoreState"]
        return (by[vs]["id"], st) if st in EDITABLE else (None, f"{vs} is {st}, not editable")
    prev = by.get(after, {}).get("attributes", {}).get("appStoreState") if after else None
    if after and prev != "READY_FOR_SALE":
        return None, f"waiting: {after} is {prev}"
    r = asc_api.call("POST", "/v1/appStoreVersions", {"data": {"type": "appStoreVersions", "attributes": {
        "platform": platform, "versionString": vs, "releaseType": "AFTER_APPROVAL"},
        "relationships": {"app": {"data": {"type": "apps", "id": APP}}}}})
    return r["data"]["id"], "created"


def sets_of(lid):
    out = {}
    for s in asc_api.pages(f"/v1/appStoreVersionLocalizations/{lid}/appScreenshotSets?limit=50"):
        shots = asc_api.pages(f"/v1/appScreenshotSets/{s['id']}/appScreenshots?limit=50")
        out[s["attributes"]["screenshotDisplayType"]] = (s["id"], shots)
    return out


def upload(set_id, f):
    data = f.read_bytes()
    r = asc_api.call("POST", "/v1/appScreenshots", {"data": {"type": "appScreenshots",
        "attributes": {"fileName": f.name, "fileSize": len(data)},
        "relationships": {"appScreenshotSet": {"data": {"type": "appScreenshotSets", "id": set_id}}}}})
    sid = r["data"]["id"]
    for op in r["data"]["attributes"]["uploadOperations"]:
        chunk = data[op["offset"]:op["offset"] + op["length"]]
        req = urllib.request.Request(op["url"], data=chunk, method=op["method"],
                                     headers={h["name"]: h["value"] for h in op["requestHeaders"]})
        urllib.request.urlopen(req, timeout=300).read()
    asc_api.call("PATCH", f"/v1/appScreenshots/{sid}", {"data": {"type": "appScreenshots", "id": sid,
        "attributes": {"uploaded": True, "sourceFileChecksum": hashlib.md5(data).hexdigest()}}})
    return sid


def sync(platform, vid, locs, write=True):
    """Returns how many sets differ from disk after this run."""
    bad = 0
    locz = {l["attributes"]["locale"]: l["id"] for l in asc_api.pages(f"/v1/appStoreVersions/{vid}/appStoreVersionLocalizations?limit=200")}
    for loc in locs:
        lid = locz.get(loc)
        if not lid:
            print(f"{loc}: no localization on this version"); bad += 1; continue
        have = sets_of(lid)
        for dtype, (folder, _) in SETS[platform].items():
            fs = files(loc, folder)
            want = [md5(f) for f in fs]
            set_id, shots = have.get(dtype, (None, []))
            sums = [(s.get("attributes") or {}).get("sourceFileChecksum") for s in shots]
            seen = set()
            for s, c in zip(shots, sums):   # a checksum twice: a retried upload landed twice
                if c in seen:
                    asc_api.call("DELETE", f"/v1/appScreenshots/{s['id']}"); print(f"{loc} {dtype}: removed duplicate {s['id']}")
                seen.add(c)
            if [c for c in dict.fromkeys(sums)] == want:
                continue
            if not write:
                print(f"{loc} {dtype}: differs from disk ({len(sums)} there, {len(want)} here)"); bad += 1; continue
            if not set_id:
                set_id = asc_api.call("POST", "/v1/appScreenshotSets", {"data": {"type": "appScreenshotSets",
                    "attributes": {"screenshotDisplayType": dtype},
                    "relationships": {"appStoreVersionLocalization": {"data": {"type": "appStoreVersionLocalizations", "id": lid}}}}})["data"]["id"]
            for s in shots:
                asc_api.call("DELETE", f"/v1/appScreenshots/{s['id']}")
            ids = [upload(set_id, f) for f in fs]
            asc_api.call("PATCH", f"/v1/appScreenshotSets/{set_id}/relationships/appScreenshots",
                         {"data": [{"type": "appScreenshots", "id": i} for i in ids]})
            print(f"{loc} {dtype}: uploaded {len(ids)}")
    return bad


def main():
    a = sys.argv[1:]
    vs = a[0]
    opt = lambda k: a[a.index(k) + 1] if k in a else None
    plats = [opt("--only")] if opt("--only") else ["IOS", "MAC_OS"]
    locs = opt("--locales").split(",") if opt("--locales") else STORE
    done = 0
    for p in plats:
        vid, st = version(p, vs, opt("--after"))
        if not vid:
            print(f"{p}: {st}"); continue
        if "--readback-only" not in a:
            sync(p, vid, locs)
        bad = sync(p, vid, locs, write=False)
        print(f"{p} {vs} ({st}): {'every set matches disk' if not bad else f'{bad} sets differ from disk'}")
        done += not bad
    sys.exit(0 if done == len(plats) else 1)


if __name__ == "__main__":
    main()
