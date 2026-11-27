#!/usr/bin/env python3
"""Uploads the poster frames to an editable App Store version, then reads every set back and removes duplicates by id.

    python3 upload.py ios|mac [--version-id ID] [--locales a,b] [--only iphone,ipad,duo] [--readback-only]

Frames come from the published folders (Support/AppStore/<locale>/<device>/, English locales from the default sets
Support/AppStore/<device>/), the same ones fastlane's lanes read. Each device's set in each language is replaced whole
(asc screenshots upload --replace). The readback compares each set's screenshots with the files on disk by MD5
(App Store Connect's sourceFileChecksum): a set holding a checksum twice has a duplicate from a retried upload, which
is deleted by its id, never by file name, since both copies share one. Exits 1 when any set does not match disk.
"""
import hashlib, json, os, shutil, subprocess, sys, tempfile, time
from pathlib import Path

HERE = Path(__file__).resolve().parent
APPSTORE = HERE.parent
APP = "6810513194"
STORE = [l["code"] for l in json.loads((APPSTORE / "locales.json").read_text())["locales"]]
# device -> (folder, file prefix, asc device type, API display type)
DEVICES = {
    "iphone": ("iphone", "", "IPHONE_69", "APP_IPHONE_67"),
    "ipad": ("ipad", "", "IPAD_PRO_3GEN_129", "APP_IPAD_PRO_3GEN_129"),
    "duo": ("duo", "", "IPHONE_DUO", "APP_IPHONE_DUO"),
    "mac": ("mac", "", "DESKTOP", "APP_DESKTOP"),
}
PLATFORM = {"ios": ["iphone", "ipad", "duo"], "mac": ["mac"]}


def asc(*args, retries=3):
    last = ""
    for i in range(retries):
        p = subprocess.run(["asc", *args], capture_output=True, text=True)
        if p.returncode == 0:
            return json.loads(p.stdout) if p.stdout.strip() else {}
        last = (p.stderr or p.stdout).strip()
        time.sleep(3 * (i + 1))
    raise RuntimeError(last[-1500:])


def files(loc, dev):
    folder = DEVICES[dev][0]
    d = APPSTORE / loc / folder
    if not d.is_dir():
        d = APPSTORE / folder
    fs = sorted(d.glob("*.png"))
    if dev == "duo":   # outer screen first, then inner, as the store shows the outer screen when the phone is closed
        fs = sorted(fs, key=lambda f: (not f.name.startswith("outer"), f.name))
    return fs


def md5(p):
    return hashlib.md5(p.read_bytes()).hexdigest()


def stage(dev, locs):
    root = Path(tempfile.mkdtemp(prefix=f"und-{dev}-"))
    for loc in locs:
        d = root / loc
        d.mkdir()
        for k, f in enumerate(files(loc, dev)):
            shutil.copy(f, d / f"{k + 1:02d}_{f.name}")
    return root


def readback(version_id, devs, locs):
    bad = 0
    r = asc("screenshots", "list", "--version", version_id, "--output", "json")
    by_loc = {x["locale"]: x for x in r.get("localizations", [])}
    for loc in locs:
        sets = {s["set"]["attributes"]["screenshotDisplayType"]: s for s in by_loc.get(loc, {}).get("sets", [])}
        for dev in devs:
            want = [md5(f) for f in files(loc, dev)]
            s = sets.get(DEVICES[dev][3])
            shots = (s or {}).get("screenshots", [])
            have = [(x["id"], (x.get("attributes") or {}).get("sourceFileChecksum")) for x in shots]
            seen = set()
            for sid, sum_ in have:
                if sum_ in seen:
                    asc("screenshots", "delete", "--id", sid, "--confirm")
                    print(f"{loc} {dev}: removed duplicate {sid}")
                seen.add(sum_)
            sums = [x for _, x in have]
            ok = sorted(set(sums)) == sorted(set(want)) and len(set(sums)) == len(want)
            if not ok:
                bad += 1
                print(f"{loc} {dev}: MISMATCH {len(set(sums))} on ASC, {len(want)} on disk")
    print(f"readback: {len(locs) * len(devs) - bad}/{len(locs) * len(devs)} sets match disk")
    return bad


def main():
    a = sys.argv[1:]
    plat = a[0]
    opt = lambda k: a[a.index(k) + 1] if k in a else None
    devs = opt("--only").split(",") if opt("--only") else PLATFORM[plat]
    locs = opt("--locales").split(",") if opt("--locales") else STORE
    vid = opt("--version-id")
    if not vid:
        r = asc("versions", "list", "--app", APP, "--platform", "IOS" if plat == "ios" else "MAC_OS", "--output", "json")
        ed = [v for v in r["data"] if v["attributes"]["appStoreState"] in ("PREPARE_FOR_SUBMISSION", "DEVELOPER_REJECTED", "REJECTED", "METADATA_REJECTED")]
        if len(ed) != 1:
            sys.exit(f"{plat}: expected one editable version, found {len(ed)}")
        vid = ed[0]["id"]
        print(plat, ed[0]["attributes"]["versionString"], vid)
    if "--readback-only" not in a:
        for dev in devs:
            root = stage(dev, locs)
            for loc in locs:   # one language at a time, so a failure names its language and the rest still land
                try:
                    asc("screenshots", "upload", "--app", APP, "--version-id", vid, "--locale", loc, "--path", str(root / loc),
                        "--device-type", DEVICES[dev][2], "--replace", "--confirm", "--output", "json")
                    print(f"{loc} {dev}: uploaded {len(list((root / loc).glob('*.png')))}")
                except RuntimeError as e:
                    print(f"{loc} {dev}: FAILED {e}")
            shutil.rmtree(root)
    sys.exit(1 if readback(vid, devs, locs) else 0)


if __name__ == "__main__":
    main()
