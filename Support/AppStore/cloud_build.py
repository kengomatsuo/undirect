#!/usr/bin/env python3
"""Start Undirect's Xcode Cloud "Release" workflow on main and follow it.

    python3 Support/AppStore/cloud_build.py          # start a run on origin/main, follow it, hand it to testers
    python3 Support/AppStore/cloud_build.py watch N  # follow run N to the end, then hand it to testers

The workflow archives iOS and macOS for App Store Connect; the builds land there
as Xcode Cloud uploads them, numbered by the run. Push first: the run builds
what is on GitHub, not this checkout.

A build Xcode Cloud uploads reaches no TestFlight group by itself, even one set
to see all builds, so a finished run's builds are added to every internal group
here; a release that stops at "uploaded" leaves the owner nothing to install.
"""
import os, sys, time
sys.path.insert(0, os.path.dirname(__file__))
import asc_api

WORKFLOW = "A1A64AAC-4894-4372-97BA-6F3899F8C497"
PRODUCT = "076b68e1-a739-4a49-a88e-4ab134c24e0e"
MAIN_REF = "1e62cfcc-e54b-4cc5-a9a7-849a7e520044"


def start():
    run = asc_api.call("POST", "/v1/ciBuildRuns", {"data": {"type": "ciBuildRuns", "relationships": {
        "workflow": {"data": {"type": "ciWorkflows", "id": WORKFLOW}},
        "sourceBranchOrTag": {"data": {"type": "scmGitReferences", "id": MAIN_REF}}}}})["data"]
    print(f"run {run['attributes']['number']} {run['id']} {run['attributes']['executionProgress']}")
    return run["attributes"]["number"]


def watch(number):
    while True:
        runs = asc_api.call("GET", f"/v1/ciProducts/{PRODUCT}/buildRuns?limit=20")["data"]
        run = next(r for r in runs if r["attributes"]["number"] == number)
        a = run["attributes"]
        print(number, a["executionProgress"], a.get("completionStatus") or "", flush=True)
        if a["executionProgress"] == "COMPLETE":
            if a.get("completionStatus") != "SUCCEEDED":
                sys.exit(1)
            to_testers(number)
            sys.exit(0)
        time.sleep(60)


def to_testers(number):
    """Wait until both platforms' builds of this run are processed, then add them to every internal group."""
    app = asc_api.call("GET", f"/v1/ciProducts/{PRODUCT}/app")["data"]["id"]
    for _ in range(60):
        builds = asc_api.call("GET", f"/v1/builds?filter[app]={app}&filter[version]={number}")["data"]
        if len(builds) >= 2 and all(b["attributes"]["processingState"] == "VALID" for b in builds):
            break
        time.sleep(60)
    else:
        sys.exit(f"build {number} never finished processing")
    groups = [g for g in asc_api.call("GET", f"/v1/apps/{app}/betaGroups")["data"] if g["attributes"]["isInternalGroup"]]
    for g in groups:
        asc_api.call("POST", f"/v1/betaGroups/{g['id']}/relationships/builds",
                     {"data": [{"type": "builds", "id": b["id"]} for b in builds]})
        print(f"build {number} ({len(builds)} platforms) added to TestFlight group {g['attributes']['name']}", flush=True)


if __name__ == "__main__":
    if sys.argv[1:2] == ["watch"]:
        watch(int(sys.argv[2]))
    else:
        watch(start())
