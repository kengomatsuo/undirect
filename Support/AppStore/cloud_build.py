#!/usr/bin/env python3
"""Start Undirect's Xcode Cloud "Release" workflow on main and follow it.

    python3 Support/AppStore/cloud_build.py          # start a run on origin/main, print its number
    python3 Support/AppStore/cloud_build.py watch N  # print run N's state until it ends

The workflow archives iOS and macOS for App Store Connect; the builds land there
as Xcode Cloud uploads them, numbered by the run. Push first: the run builds
what is on GitHub, not this checkout.
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
            sys.exit(0 if a.get("completionStatus") == "SUCCEEDED" else 1)
        time.sleep(60)


if __name__ == "__main__":
    if sys.argv[1:2] == ["watch"]:
        watch(int(sys.argv[2]))
    else:
        start()
