#!/usr/bin/env python3
"""Each platform's App Store state for one version, read from App Store Connect.

    python3 Support/AppStore/asc_state.py 1.0.5      # IOS READY_FOR_SALE / MAC_OS WAITING_FOR_REVIEW ...

Exits 0 when iOS is READY_FOR_SALE, which is when a launch plan starts, else 1."""
import json, os, sys, urllib.request
sys.path.insert(0, os.path.dirname(__file__))
import asc_api

version = sys.argv[1]
req = urllib.request.Request(
    f"{asc_api.BASE}/v1/apps/6810513194/appStoreVersions?filter[versionString]={version}&limit=5",
    headers={"Authorization": "Bearer " + asc_api.token()})
rows = json.load(urllib.request.urlopen(req))["data"]
states = {r["attributes"]["platform"]: r["attributes"]["appStoreState"] for r in rows}
for platform, state in sorted(states.items()):
    print(platform, state)
sys.exit(0 if states.get("IOS") == "READY_FOR_SALE" else 1)
