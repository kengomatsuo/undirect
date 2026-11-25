#!/usr/bin/env python3
"""Submit the next Undirect version for review on each platform as soon as the version before it
is on the store. Safe to run again and again: a platform already submitted is left alone.

    python3 Support/AppStore/submit_version.py 1.1.0 19 1.0.5 [--dry] [--only IOS|MAC_OS]

Per platform: wait until <previous> reads READY_FOR_SALE (Apple takes one version at a time), create
<version> with build <build> attached, release on approval, put Support/AppStore/releases/<version>/
whatsnew.json into every language's What's New, check the screenshots came over from the previous
version, and submit. Prints one line per platform; exits 0 once every platform is submitted.
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
import asc_api

APP = "6810513194"
DONE = {"WAITING_FOR_REVIEW", "IN_REVIEW", "PENDING_DEVELOPER_RELEASE", "PROCESSING_FOR_DISTRIBUTION",
        "READY_FOR_DISTRIBUTION", "READY_FOR_SALE"}
TEXT = ("description", "keywords", "promotionalText", "marketingUrl", "supportUrl")

version, build_no, previous = sys.argv[1:4]
dry = "--dry" in sys.argv
notes = json.load(open(os.path.join(os.path.dirname(__file__), "releases", version, "whatsnew.json")))
call = asc_api.call


def one(platform, kind):
    q = f"/v1/apps/{APP}/appStoreVersions?filter[platform]={platform}&filter[versionString]="
    prev = call("GET", q + previous)["data"]
    if not prev or prev[0]["attributes"]["appStoreState"] != "READY_FOR_SALE":
        return f"WAIT {platform}: {previous} is {prev[0]['attributes']['appStoreState'] if prev else 'missing'}"
    cur = call("GET", q + version)["data"]
    if cur and cur[0]["attributes"]["appStoreState"] in DONE:
        return f"SUBMITTED {platform}: {version} is {cur[0]['attributes']['appStoreState']}"
    builds = call("GET", f"/v1/builds?filter[app]={APP}&filter[version]={build_no}"
                         f"&filter[preReleaseVersion.platform]={platform}&filter[preReleaseVersion.version]={version}")["data"]
    if not builds or builds[0]["attributes"]["processingState"] != "VALID":
        return f"ERROR {platform}: build {build_no} of {version} is not VALID"
    build = builds[0]["id"]
    prev_locs = {l["attributes"]["locale"]: l["attributes"] for l in
                 asc_api.pages(f"/v1/appStoreVersions/{prev[0]['id']}/appStoreVersionLocalizations?limit=200")}
    missing = sorted(set(prev_locs) - set(notes))
    if missing:
        return f"ERROR {platform}: no What's New for {', '.join(missing)}"
    if dry:
        return f"DRY {platform}: would create {version} with build {build}, {len(prev_locs)} languages"

    if cur:
        vid = cur[0]["id"]
        call("PATCH", f"/v1/appStoreVersions/{vid}/relationships/build", {"data": {"type": "builds", "id": build}})
        # a version made earlier by hand (to carry new screenshots) releases on approval like the ones made here
        call("PATCH", f"/v1/appStoreVersions/{vid}", {"data": {"type": "appStoreVersions", "id": vid,
            "attributes": {"releaseType": "AFTER_APPROVAL"}}})
    else:
        vid = call("POST", "/v1/appStoreVersions", {"data": {"type": "appStoreVersions",
            "attributes": {"platform": platform, "versionString": version, "releaseType": "AFTER_APPROVAL"},
            "relationships": {"app": {"data": {"type": "apps", "id": APP}},
                              "build": {"data": {"type": "builds", "id": build}}}}})["data"]["id"]
    locs = {l["attributes"]["locale"]: l for l in
            asc_api.pages(f"/v1/appStoreVersions/{vid}/appStoreVersionLocalizations?limit=200")}
    for code, old in prev_locs.items():
        if code in locs:
            call("PATCH", f"/v1/appStoreVersionLocalizations/{locs[code]['id']}", {"data": {
                "type": "appStoreVersionLocalizations", "id": locs[code]["id"], "attributes": {"whatsNew": notes[code]}}})
        else:
            attrs = {k: old[k] for k in TEXT if old.get(k)}
            call("POST", "/v1/appStoreVersionLocalizations", {"data": {"type": "appStoreVersionLocalizations",
                "attributes": {"locale": code, "whatsNew": notes[code], **attrs},
                "relationships": {"appStoreVersion": {"data": {"type": "appStoreVersions", "id": vid}}}}})
    # Apple copies the previous version's screenshots into a new version; never submit one without them.
    locs = {l["attributes"]["locale"]: l for l in
            asc_api.pages(f"/v1/appStoreVersions/{vid}/appStoreVersionLocalizations?limit=200")}
    bare = [c for c, l in locs.items()
            if not call("GET", f"/v1/appStoreVersionLocalizations/{l['id']}/appScreenshotSets")["data"]]
    if bare:
        return f"ERROR {platform}: {version} created but has no screenshots in {', '.join(sorted(bare))}; not submitted"

    drafts = call("GET", f"/v1/reviewSubmissions?filter[app]={APP}&filter[platform]={platform}&filter[state]=READY_FOR_REVIEW")["data"]
    sub = drafts[0] if drafts else call("POST", "/v1/reviewSubmissions", {"data": {"type": "reviewSubmissions",
        "attributes": {"platform": platform}, "relationships": {"app": {"data": {"type": "apps", "id": APP}}}}})["data"]
    call("POST", "/v1/reviewSubmissionItems", {"data": {"type": "reviewSubmissionItems", "relationships": {
        "reviewSubmission": {"data": {"type": "reviewSubmissions", "id": sub["id"]}},
        "appStoreVersion": {"data": {"type": "appStoreVersions", "id": vid}}}}})
    state = call("PATCH", f"/v1/reviewSubmissions/{sub['id']}", {"data": {"type": "reviewSubmissions",
        "id": sub["id"], "attributes": {"submitted": True}}})["data"]["attributes"]["state"]
    return f"SUBMITTED {platform}: {version} build {build_no} in submission {sub['id']} ({state}), just now"


lines = []
# --only: a release that changes one platform's app (1.1.2 changed only the iPhone and iPad sidebar) goes to review there alone.
only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
for platform, kind in (("IOS", "iOS"), ("MAC_OS", "Mac")):
    if only and platform != only:
        continue
    try:
        lines.append(one(platform, kind))
    except RuntimeError as e:
        lines.append(f"ERROR {platform}: {e}")
print("\n".join(lines))
sys.exit(0 if all(l.startswith("SUBMITTED") for l in lines) else 1)
