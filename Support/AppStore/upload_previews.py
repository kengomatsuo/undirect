#!/usr/bin/env python3
"""Upload the App Store preview videos to every locale of the editable versions.

Uses the asc CLI. For each localization of the iOS and macOS versions it
replaces the preview set's contents with one video and sets the poster frame,
then reads every set back and reports its processing state.

  upload_previews.py [--locales en-US,de-DE] [--platform ios|mac] [--verify-only]

Auth comes from ASC_KEY_ID, ASC_ISSUER_ID and ASC_PRIVATE_KEY_PATH, which
default to the team key that lives in the Cutling repo. Nothing is submitted,
and builds, text and screenshots are not touched.
"""
import argparse, json, os, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor

APP_ID = "6810513194"
PROMO = os.environ.get("UNDIRECT_PROMO_OUT", "/Users/hafang/Repositories/undirect-promo/out")
VERSION = os.environ.get("UNDIRECT_PREVIEW_VERSION", "v6")  # the render to upload: ../undirect-promo/out/<name>-<version>.mp4
POSTER = os.environ.get("UNDIRECT_POSTER_FRAME", "00:00:03:00")
WORKERS = int(os.environ.get("UNDIRECT_PREVIEW_WORKERS", "4"))

# platform -> (ASC platform, [(device type, English file)])
PLATFORMS = {
    "ios": ("IOS", [("IPHONE_69", f"AppStorePreview-{VERSION}.mp4"),
                    ("IPAD_PRO_3GEN_129", f"AppStorePreviewIPad-{VERSION}.mp4")]),
    "mac": ("MAC_OS", [("DESKTOP", f"MacPreview-{VERSION}.mp4")]),
}
# device type -> the name of a locale's own file: <out>/locales/<locale>/<name>.mp4 (undirect-promo/wire/tools/locales-all.sh).
# A locale with no such file gets the English master above.
LOCALE_FILE = {"IPHONE_69": "iphone", "IPAD_PRO_3GEN_129": "ipad", "DESKTOP": "mac"}


def source(loc, device, fname):
    """(path, name Apple will list) for one locale and device: its own localized file, else the English master."""
    own = os.path.join(PROMO, "locales", loc, LOCALE_FILE[device] + ".mp4") if loc else ""
    if own and os.path.exists(own) and os.environ.get("UNDIRECT_ENGLISH_ONLY") != "1":
        return own, os.path.basename(own)
    return os.path.join(PROMO, fname), fname

# the API calls the 6.9" iPhone set IPHONE_67
API_TYPE = {"IPHONE_69": "IPHONE_67"}

os.environ.setdefault("ASC_KEY_ID", "8R8JCJZUNJ")
os.environ.setdefault("ASC_ISSUER_ID", "79deecfa-75ef-43ad-80c2-e25e55f38f41")
os.environ.setdefault("ASC_PRIVATE_KEY_PATH",
                      "/Users/hafang/Repositories/Cutling/fastlane/AuthKey_8R8JCJZUNJ.p8")


def asc(*args, retries=3):
    last = ""
    for i in range(retries):
        p = subprocess.run(["asc", *args], capture_output=True, text=True)
        if p.returncode == 0:
            return json.loads(p.stdout) if p.stdout.strip() else {}
        last = (p.stderr or p.stdout).strip()
        time.sleep(3 * (i + 1))
    raise RuntimeError(last)


EDITABLE = {"PREPARE_FOR_SUBMISSION", "DEVELOPER_REJECTED", "REJECTED", "METADATA_REJECTED"}


def editable_version(platform):
    # A cancelled submission leaves the version DEVELOPER_REJECTED, still editable.
    d = asc("versions", "list", "--app", APP_ID, "--platform", PLATFORMS[platform][0], "--output", "json")
    rows = [v for v in d.get("data", []) if v["attributes"].get("appStoreState") in EDITABLE]
    if len(rows) != 1:
        sys.exit(f"{platform}: expected one editable version, found {len(rows)}")
    return rows[0]["id"], rows[0]["attributes"]["versionString"]


def localizations(version_id):
    d = asc("localizations", "list", "--version", version_id, "--paginate", "--output", "json")
    return {x["attributes"]["locale"]: x["id"] for x in d["data"]}


def read_back(loc_id):
    """Return {previewType: [preview attributes]} for one localization."""
    d = asc("video-previews", "list", "--version-localization", loc_id)
    return {x["set"]["attributes"]["previewType"]: [dict(p["attributes"], id=p["id"]) for p in x["previews"]]
            for x in d.get("sets", [])}


def upload_one(loc_id, device, fname, loc=None):
    path, listed = source(loc, device, fname)
    # a localized file is already its own bytes (composite.sh tags each with its locale); only the shared English master needs a variant
    if path.endswith(fname) and os.environ.get("UNDIRECT_UNIQUE_FILES", "1") != "0" and loc:
        # A copy whose bytes differ by one metadata tag per locale: Apple's processing failed sets at random while
        # many locales shared one file, and replacing one locale's preview seemed to take another's with it.
        d = f"/tmp/undirect-preview-variants/{loc}"
        os.makedirs(d, exist_ok=True)
        path = os.path.join(d, fname)
        if not os.path.exists(path):
            subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", os.path.join(PROMO, fname), "-c", "copy",
                            "-metadata", f"comment=undirect {loc}", "-movflags", "+faststart", path], check=True)
    r = asc("video-previews", "upload", "--version-localization", loc_id, "--path", path,
            "--device-type", device, "--replace", "--confirm")
    res = r.get("results", [])
    if len(res) != 1 or not res[0].get("assetId"):
        raise RuntimeError(json.dumps(r)[:400])
    return res[0]["assetId"]


def set_poster(preview_id, timeout=1200):
    """The poster frame only takes once Apple has processed the video."""
    end = time.time() + timeout
    while True:
        try:
            asc("video-previews", "set-poster-frame", "--id", preview_id,
                "--time-code", POSTER, retries=1)
            return
        except RuntimeError as e:
            if "Complete state" not in str(e) or time.time() > end:
                raise
            time.sleep(15)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--locales", help="comma-separated, default all")
    ap.add_argument("--platform", choices=list(PLATFORMS))
    ap.add_argument("--verify-only", action="store_true")
    ap.add_argument("--fix-posters", action="store_true",
                    help="after a run whose poster requests failed: wait for each set to finish processing, then set the poster frame where it is missing")
    a = ap.parse_args()
    start = time.time()
    only = set(a.locales.split(",")) if a.locales else None
    failures = []
    for platform in ([a.platform] if a.platform else list(PLATFORMS)):
        vid, vs = editable_version(platform)
        locs = localizations(vid)
        if only:
            locs = {k: v for k, v in locs.items() if k in only}
        print(f"{platform} {vs}: {len(locs)} localizations", flush=True)
        jobs = [(loc, lid, dev, f) for loc, lid in locs.items() for dev, f in PLATFORMS[platform][1]]

        def run(j):
            loc, lid, dev, f = j
            try:
                pid = upload_one(lid, dev, f, loc)
                print(f"  uploaded {platform} {loc} {dev}", flush=True)
                set_poster(pid)
                print(f"  poster   {platform} {loc} {dev}", flush=True)
            except Exception as e:
                failures.append((platform, loc, dev, str(e)))
                print(f"  FAIL {platform} {loc} {dev}: {e}", flush=True)

        if a.fix_posters:
            want0 = {dev: f for dev, f in PLATFORMS[platform][1]}
            for rnd in range(40):
                todo = 0
                for loc, lid in locs.items():
                    got = read_back(lid)
                    for dev, f in want0.items():
                        ps = got.get(API_TYPE.get(dev, dev), [])
                        if len(ps) != 1 or ps[0]["fileName"] != source(loc, dev, f)[1]:
                            todo += 1
                            continue
                        if ps[0]["assetDeliveryState"]["state"] != "COMPLETE":
                            todo += 1
                            continue
                        if ps[0].get("previewFrameTimeCode", "")[:8] != POSTER[:8]:
                            try:
                                asc("video-previews", "set-poster-frame", "--id", ps[0]["id"], "--time-code", POSTER, retries=2)
                                print(f"  poster   {platform} {loc} {dev}", flush=True)
                            except RuntimeError as e:
                                print(f"  retry later {platform} {loc} {dev}: {str(e)[:80]}", flush=True)
                            todo += 1
                print(f"round {rnd}: {todo} sets not yet right", flush=True)
                if not todo:
                    break
                time.sleep(60)
        if not a.verify_only and not a.fix_posters:
            with ThreadPoolExecutor(WORKERS) as ex:
                list(ex.map(run, jobs))

        want = {dev: f for dev, f in PLATFORMS[platform][1]}
        counts = {}
        for loc, lid in locs.items():
            got = read_back(lid)
            for dev, f in want.items():
                ps = got.get(API_TYPE.get(dev, dev), [])
                ok = (len(ps) == 1 and ps[0]["fileName"] == source(loc, dev, f)[1]
                      and ps[0]["assetDeliveryState"]["state"] == "COMPLETE"
                      and ps[0].get("previewFrameTimeCode", "")[:8] == POSTER[:8])
                counts.setdefault(dev, {}).setdefault(
                    "COMPLETE" if ok else "NOT OK", []).append(loc)
                if not ok:
                    failures.append((platform, loc, dev, f"read back: {ps}"))
        for dev, c in counts.items():
            print(f"{platform} {dev}:", {k: len(v) for k, v in c.items()}, f"{len(c.get('COMPLETE', []))}/{len(locs)} COMPLETE", flush=True)
    print(f"uploads done in {time.time() - start:.0f}s, {len(failures)} failures")
    for f in failures:
        print("FAILED", *f)
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
