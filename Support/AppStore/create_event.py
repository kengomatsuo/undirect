#!/usr/bin/env python3
"""Create one In-App Event from Support/AppStore/events/<name>/event.json, upload its two images, and
submit it for review in its own review submission.

    python3 Support/AppStore/create_event.py 1.0.5 [--no-submit]

Apple's limits (developer.apple.com/app-store/in-app-events, read 2026-11-20): name 30 characters in
title case, short description 50, long description 120, both in sentence case; card image 16:9 at least
1920x1080, details image 9:16 at least 1080x1920, no text or logos in either; an event lasts at most
31 days and is published at most 14 days before it starts."""
import hashlib, json, os, sys, urllib.request
sys.path.insert(0, os.path.dirname(__file__))
import asc_api

APP = "6810513194"
here = os.path.join(os.path.dirname(__file__), "events", sys.argv[1])
spec = json.load(open(os.path.join(here, "event.json")))

def req(method, path, body=None, raw=None, headers=None, absolute=False):
    url = path if absolute else asc_api.BASE + path
    h = headers or {"Authorization": "Bearer " + asc_api.token(), "Content-Type": "application/json"}
    r = urllib.request.Request(url, method=method, data=raw if raw is not None else (json.dumps(body).encode() if body else None), headers=h)
    try:
        with urllib.request.urlopen(r) as x:
            t = x.read(); return json.loads(t) if t and not absolute else {}
    except urllib.error.HTTPError as e:
        sys.exit(f"{method} {path[:80]} -> {e.code} {e.read().decode()[:1500]}")

for loc in spec["localizations"].values():
    assert len(loc["name"]) <= 30 and len(loc["shortDescription"]) <= 50 and len(loc["longDescription"]) <= 120, loc

existing = req("GET", f"/v1/apps/{APP}/appEvents?limit=50")["data"]
event = next((e for e in existing if e["attributes"]["referenceName"] == spec["referenceName"]), None)
if not event:
    territories = []
    url = "/v1/territories?limit=200"
    while url:
        page = req("GET", url); territories += [t["id"] for t in page["data"]]
        nxt = page.get("links", {}).get("next"); url = nxt.replace(asc_api.BASE, "") if nxt else None
    event = req("POST", "/v1/appEvents", {"data": {"type": "appEvents", "attributes": {
        "referenceName": spec["referenceName"], "badge": spec["badge"], "priority": spec["priority"],
        "purpose": spec["purpose"], "primaryLocale": spec["primaryLocale"],
        "territorySchedules": [{"territories": territories, "publishStart": spec["publishStart"],
                                "eventStart": spec["eventStart"], "eventEnd": spec["eventEnd"]}]},
        "relationships": {"app": {"data": {"type": "apps", "id": APP}}}}})["data"]
    print("event", event["id"], "created")
else:
    print("event", event["id"], "exists", event["attributes"].get("eventState"))
# Required before review although the create request takes neither (App Store Connect, 2026-11-20).
# A Safari extension's event happens in Safari, so the link opens the site's demo there.
req("PATCH", f"/v1/appEvents/{event['id']}", {"data": {"type": "appEvents", "id": event["id"], "attributes": {
    "deepLink": spec["deepLink"], "purchaseRequirement": spec["purchaseRequirement"]}}})

locs = {l["attributes"]["locale"]: l for l in req("GET", f"/v1/appEvents/{event['id']}/localizations")["data"]}
for code, text in spec["localizations"].items():
    if code in locs:
        req("PATCH", f"/v1/appEventLocalizations/{locs[code]['id']}", {"data": {"type": "appEventLocalizations", "id": locs[code]["id"], "attributes": text}})
        loc_id = locs[code]["id"]
    else:
        loc_id = req("POST", "/v1/appEventLocalizations", {"data": {"type": "appEventLocalizations", "attributes": {"locale": code, **text},
            "relationships": {"appEvent": {"data": {"type": "appEvents", "id": event["id"]}}}}})["data"]["id"]
    have = {s["attributes"]["appEventAssetType"] for s in req("GET", f"/v1/appEventLocalizations/{loc_id}/appEventScreenshots")["data"]}
    for kind, name in spec["media"].items():
        if kind in have: continue
        data = open(os.path.join(here, name), "rb").read()
        shot = req("POST", "/v1/appEventScreenshots", {"data": {"type": "appEventScreenshots", "attributes": {
            "fileName": name, "fileSize": len(data), "appEventAssetType": kind},
            "relationships": {"appEventLocalization": {"data": {"type": "appEventLocalizations", "id": loc_id}}}}})["data"]
        for op in shot["attributes"]["uploadOperations"]:
            part = data[op["offset"]:op["offset"] + op["length"]]
            req(op["method"], op["url"], raw=part, headers={h["name"]: h["value"] for h in op["requestHeaders"]}, absolute=True)
        req("PATCH", f"/v1/appEventScreenshots/{shot['id']}", {"data": {"type": "appEventScreenshots", "id": shot["id"],
            "attributes": {"uploaded": True}}})
        print(code, kind, "uploaded")

if "--no-submit" not in sys.argv:
    drafts = req("GET", f"/v1/reviewSubmissions?filter[app]={APP}&filter[platform]=IOS&filter[state]=READY_FOR_REVIEW")["data"]
    sub = drafts[0] if drafts else req("POST", "/v1/reviewSubmissions", {"data": {"type": "reviewSubmissions", "attributes": {"platform": "IOS"},
        "relationships": {"app": {"data": {"type": "apps", "id": APP}}}}})["data"]
    if drafts: print("reusing draft submission", sub["id"])
    req("POST", "/v1/reviewSubmissionItems", {"data": {"type": "reviewSubmissionItems", "relationships": {
        "reviewSubmission": {"data": {"type": "reviewSubmissions", "id": sub["id"]}},
        "appEvent": {"data": {"type": "appEvents", "id": event["id"]}}}}})
    out = req("PATCH", f"/v1/reviewSubmissions/{sub['id']}", {"data": {"type": "reviewSubmissions", "id": sub["id"], "attributes": {"submitted": True}}})
    print("submitted", sub["id"], out["data"]["attributes"]["state"])
print("EVENT_ID", event["id"])
