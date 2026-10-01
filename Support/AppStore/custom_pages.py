#!/usr/bin/env python3
"""Create or update the App Store custom product pages from custom_pages.json.

  custom_pages.py [--locales en-US,ja] [--pages popups] [--no-screenshots] [--verify-only]

Per page: creates it when no page has that name, adds a localization per locale that
has promo text, sets the promo text, assigns the keywords Apple will accept, uploads
the iPhone and iPad frames in the page's order, then reads everything back.
Nothing is submitted for review. Pages are iPhone and iPad only (Apple has no Mac
custom product page). Idempotent: rerun after any change.
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile, time
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import asc_api as api

HERE = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(HERE, "custom_pages.json"), encoding="utf-8"))
APP = CFG["app"]
DEVICES = [("iphone", "IPHONE_67"), ("ipad", "IPAD_PRO_3GEN_129")]  # API names for 6.9" iPhone and 13" iPad
LIMIT = 170
os.environ.setdefault("ASC_MAX_DELAY", "900")  # let asc wait out a 429 instead of failing
os.environ.setdefault("ASC_KEY_ID", api.KEY_ID)
os.environ.setdefault("ASC_ISSUER_ID", api.ISSUER)
os.environ.setdefault("ASC_PRIVATE_KEY_PATH", api.KEY_PATH)


def asc(*args):
    for attempt in range(8):
        p = subprocess.run(["asc", *args], capture_output=True, text=True)
        if not p.returncode:
            return json.loads(p.stdout) if p.stdout.strip() else {}
        msg = (p.stderr or p.stdout).strip()
        m = re.search(r"wait (?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?", msg)
        if "rate limit" in msg and m and attempt < 7:
            h, mi, sec = (int(x or 0) for x in m.groups())
            time.sleep(min(h * 3600 + mi * 60 + sec + 20, 3900))  # App Store Connect's hourly quota
            continue
        raise RuntimeError(msg[:400])


def find_page(name):
    for p in api.pages(f"/v1/apps/{APP}/appCustomProductPages?limit=50"):
        if p["attributes"]["name"] == name:
            return p
    return None


def ensure_page(page, first_locale):
    p = find_page(page["name"])
    if p:
        return p
    promo = CFG["promo"][page["key"]][first_locale]
    body = {"data": {"type": "appCustomProductPages", "attributes": {"name": page["name"]},
            "relationships": {"app": {"data": {"type": "apps", "id": APP}},
                "appCustomProductPageVersions": {"data": [{"type": "appCustomProductPageVersions", "id": "${v1}"}]}}},
            "included": [
              {"type": "appCustomProductPageVersions", "id": "${v1}", "attributes": {},
               "relationships": {"appCustomProductPageLocalizations": {"data": [{"type": "appCustomProductPageLocalizations", "id": "${l1}"}]}}},
              {"type": "appCustomProductPageLocalizations", "id": "${l1}",
               "attributes": {"locale": first_locale, "promotionalText": promo}}]}
    return api.call("POST", "/v1/appCustomProductPages", body)["data"]


def editable_version(page_id):
    vs = api.call("GET", f"/v1/appCustomProductPages/{page_id}/appCustomProductPageVersions")["data"]
    vs.sort(key=lambda v: int(v["attributes"]["version"]))
    v = vs[-1]
    if v["attributes"]["state"] != "PREPARE_FOR_SUBMISSION":
        sys.exit(f"page {page_id}: newest version is {v['attributes']['state']}, not editable; create a new version in App Store Connect first")
    return v["id"]


def locs(version_id):
    rows = api.pages(f"/v1/appCustomProductPageVersions/{version_id}/appCustomProductPageLocalizations?limit=200")
    return {r["attributes"]["locale"]: r for r in rows}


def stage(page, code, kind):
    src = os.path.join(HERE, code, kind)
    if not os.path.isdir(src):
        src = os.path.join(HERE, kind)  # the English set lives beside the locale folders
    tmp = tempfile.mkdtemp(prefix="undirect_cpp_")
    for i, n in enumerate(page["screenshotOrder"], 1):
        shutil.copy(os.path.join(src, f"{n:02d}.png"), os.path.join(tmp, f"{i:02d}.png"))
    return tmp


def released_keywords():
    """locale -> keywords of the released iOS version, the only ones Apple lets a page use."""
    vs = api.call("GET", f"/v1/apps/{APP}/appStoreVersions?filter[platform]=IOS&filter[appStoreState]=READY_FOR_SALE")["data"]
    if not vs:
        return {}
    rows = api.pages(f"/v1/appStoreVersions/{vs[0]['id']}/appStoreVersionLocalizations?limit=200")
    return {r["attributes"]["locale"]: [k.strip() for k in (r["attributes"].get("keywords") or "").split(",") if k.strip()]
            for r in rows}


def page_keywords(page, code, released, claimed):
    """Candidates for this page and locale ("*" applies to every locale), kept only
    when the released keyword field holds them and no other page took them first."""
    cand = page.get("keywords", {}).get("*", []) + page.get("keywords", {}).get(code, [])
    have = released.get(code)
    if have is None:
        return [], [f"{page['key']} {code}: no released keyword field, skipped {cand}"] if cand else []
    keep, log = [], []
    for w in dict.fromkeys(cand):
        if w not in have:
            log.append(f"{page['key']} {code}: '{w}' not in released field, skipped")
        elif claimed.get((code, w), page["key"]) != page["key"]:
            log.append(f"{page['key']} {code}: '{w}' already on page {claimed[(code, w)]}, skipped")
        else:
            claimed[(code, w)] = page["key"]; keep.append(w)
    return keep, log


def work(job):
    page, code, loc_id, shots, kws = job
    out = []
    if shots:
        have = {}
        for st in api.call("GET", f"/v1/appCustomProductPageLocalizations/{loc_id}/appScreenshotSets?include=appScreenshots&limit=50")["data"]:
            have[st["attributes"]["screenshotDisplayType"]] = len(st["relationships"]["appScreenshots"].get("data", []))
        for kind, dev in DEVICES:
            if have.get("APP_" + dev) == 5:
                continue  # already uploaded; delete the set in App Store Connect to force a redo
            tmp = stage(page, code, kind)
            try:
                asc("product-pages", "custom-pages", "localizations", "screenshot-sets", "sync",
                    "--localization-id", loc_id, "--path", tmp, "--device-type", dev, "--confirm")
            finally:
                shutil.rmtree(tmp, ignore_errors=True)
    for w in kws:
        try:
            asc("product-pages", "custom-pages", "localizations", "search-keywords", "add",
                "--localization-id", loc_id, "--keywords", w)
        except RuntimeError as e:
            out.append(f"{page['key']} {code} keyword '{w}' refused: {str(e)[-110:]}")
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--locales"); ap.add_argument("--pages")
    ap.add_argument("--list-released", action="store_true"); ap.add_argument("--no-screenshots", action="store_true"); ap.add_argument("--verify-only", action="store_true")
    a = ap.parse_args()
    only_pages = set(a.pages.split(",")) if a.pages else None
    only_locales = set(a.locales.split(",")) if a.locales else None
    notes, jobs, report = [], [], []
    released, claimed = released_keywords(), {}
    if a.list_released:
        for c, k in sorted(released.items()):
            print(c, ",".join(k))
        return
    for page in CFG["pages"]:
        if only_pages and page["key"] not in only_pages:
            continue
        promo = CFG["promo"][page["key"]]
        for c, t in promo.items():
            if len(t) > LIMIT:
                sys.exit(f"{page['key']} {c}: {len(t)} characters, limit {LIMIT}")
        codes = [c for c in promo if not only_locales or c in only_locales]
        if a.verify_only:
            p = find_page(page["name"])
            if not p:
                report.append(f"{page['name']}: missing"); continue
        else:
            # Apple wants the first localization in the app's released (primary) locale
            first = next((c for c in released if c in promo), "en-GB" if "en-GB" in promo else codes[0])
            p = ensure_page(page, first)
        v = editable_version(p["id"])
        have = locs(v)
        if not a.verify_only:
            for c in codes:
                if c not in have:
                    r = api.call("POST", "/v1/appCustomProductPageLocalizations", {"data": {
                        "type": "appCustomProductPageLocalizations",
                        "attributes": {"locale": c, "promotionalText": promo[c]},
                        "relationships": {"appCustomProductPageVersion": {"data": {"type": "appCustomProductPageVersions", "id": v}}}}})
                    have[c] = r["data"]
                elif have[c]["attributes"].get("promotionalText") != promo[c]:
                    api.call("PATCH", f"/v1/appCustomProductPageLocalizations/{have[c]['id']}", {"data": {
                        "type": "appCustomProductPageLocalizations", "id": have[c]["id"],
                        "attributes": {"promotionalText": promo[c]}}})
            for c in codes:
                kws, log = page_keywords(page, c, released, claimed)
                notes += log
                jobs.append((page, c, have[c]["id"], not a.no_screenshots, kws))
        else:
            have = locs(v)
        report.append((page, p, v, codes))
    if jobs:
        with ThreadPoolExecutor(max_workers=int(os.environ.get("UNDIRECT_CPP_WORKERS", "2"))) as ex:
            for r in ex.map(work, jobs):
                notes += r
    # read back
    for item in report:
        if isinstance(item, str):
            print(item); continue
        page, p, v, codes = item
        have = locs(v)
        print(f"\n{page['name']}  {p['attributes']['url']}  version state {v and 'ok'}")
        for c in codes:
            row = have.get(c)
            if not row:
                print(f"  {c}: MISSING"); continue
            sets = api.call("GET", f"/v1/appCustomProductPageLocalizations/{row['id']}/appScreenshotSets?include=appScreenshots&limit=50")
            n = {}
            for s in sets["data"]:
                kids = s["relationships"]["appScreenshots"].get("data", [])
                n[s["attributes"]["screenshotDisplayType"].replace("APP_", "")] = len(kids)
            kws = [k["id"] for k in api.call("GET", f"/v1/appCustomProductPageLocalizations/{row['id']}/searchKeywords")["data"]]
            ok = row["attributes"].get("promotionalText") == CFG["promo"][page["key"]][c]
            print(f"  {c}: promo {'ok' if ok else 'DIFFERS'} ({len(row['attributes'].get('promotionalText') or '')}), shots {n}, keywords {kws}")
    for n in notes:
        print("note:", n)


if __name__ == "__main__":
    main()
