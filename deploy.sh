#!/bin/bash
# App Store Connect pipeline for Undirect, modelled on Cutling's deploy.sh.
set -euo pipefail

export RUBYOPT="-EUTF-8"
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

FASTLANE="${FASTLANE:-/Users/hafang/.rbenv/shims/fastlane}"
REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_ROOT"

# The App Store Connect API key lives outside this repo. Default is Cutling's
# (same team, PM3K35YS39); override with UNDIRECT_ASC_KEY_FILE.
export UNDIRECT_ASC_KEY_FILE="${UNDIRECT_ASC_KEY_FILE:-/Users/hafang/Repositories/Cutling/fastlane/asc_api_key.json}"

usage() {
  cat <<EOF
Usage: ./deploy.sh [command]

Commands:
  bump [part]       Raise MARKETING_VERSION and CURRENT_PROJECT_VERSION in
                    project.yml, then run xcodegen
                    (part = patch (default) | minor | major | build; build keeps
                    the marketing version and only raises the build number)
  metadata          Generate fastlane/metadata from Support/AppStore/locales.json,
                    verify the limits, upload every locale's text to the editable
                    iOS version (creates it when none is editable)
  metadata_mac      The same for macOS (fastlane/metadata_mac, platform osx)
  verify            Generate and check the metadata folders, upload nothing
  build             Archive and export the iOS IPA (./build/ios/Undirect.ipa)
  binary            Upload the built IPA to App Store Connect / TestFlight; run
                    'build' first; does not submit for review
  mas               Archive the Mac App Store pkg and upload it to App Store
                    Connect / TestFlight; does not submit for review
  upload            metadata + metadata_mac (text only)
  screenshots       Upload Support/AppStore/iphone and ipad to every locale
  screenshots_mac   Upload Support/AppStore/mac to every locale
                    (neither screenshot command runs as part of another one)
  previews          Upload the App Store preview videos (Support/AppStore/upload_previews.py)
                    to every locale of the editable iOS and macOS versions; takes
                    its flags (--locales, --platform, --verify-only), needs the
                    renders in ../undirect-promo/out, and reads every set back
  status            Print versions and builds per platform from App Store Connect
  help              Show this help

A release in order:
  ./deploy.sh bump && ./deploy.sh metadata && ./deploy.sh metadata_mac
  ./deploy.sh build && ./deploy.sh binary && ./deploy.sh mas
EOF
}

bump() {
  local part="${1:-patch}"
  python3 - "$part" <<'PY'
import re, sys
part = sys.argv[1]
p = "project.yml"
s = open(p, encoding="utf-8").read()
mv = re.search(r'MARKETING_VERSION:\s*"([\d.]+)"', s)
bv = re.search(r'CURRENT_PROJECT_VERSION:\s*"(\d+)"', s)
if not mv or not bv:
    sys.exit("ERROR: MARKETING_VERSION or CURRENT_PROJECT_VERSION not found in project.yml")
a = [int(x) for x in mv.group(1).split(".")] + [0, 0, 0]
major, minor, patch = a[:3]
if part == "major": major, minor, patch = major + 1, 0, 0
elif part == "minor": minor, patch = minor + 1, 0
elif part == "patch": patch += 1
elif part != "build": sys.exit(f"ERROR: bump takes major|minor|patch|build (got '{part}')")
version = mv.group(1) if part == "build" else f"{major}.{minor}.{patch}"
build = int(bv.group(1)) + 1
s = s.replace(mv.group(0), f'MARKETING_VERSION: "{version}"').replace(bv.group(0), f'CURRENT_PROJECT_VERSION: "{build}"')
open(p, "w", encoding="utf-8").write(s)
print(f"==> {mv.group(1)} ({bv.group(1)}) -> {version} ({build})")
print("    Check the number is above the highest build on App Store Connect: ./deploy.sh status")
PY
  xcodegen generate
}

gen_metadata() { python3 fastlane/generate_metadata.py && ./fastlane/verify_metadata.sh; }

case "${1:-help}" in
  bump)             bump "${2:-patch}" ;;
  verify)           gen_metadata ;;
  metadata)         gen_metadata && $FASTLANE ios upload_metadata ;;
  metadata_mac)     gen_metadata && $FASTLANE mac upload_metadata_mac ;;
  upload)           gen_metadata && $FASTLANE ios upload_metadata && $FASTLANE mac upload_metadata_mac ;;
  build)            xcodegen generate && $FASTLANE ios build ;;
  binary)           $FASTLANE ios upload_binary ;;
  mas)
    xcodegen generate && $FASTLANE mac upload_mas
    # The archive registers its own Safari extension. A second copy can make
    # Safari swap extensions and wipe the owner's storage (2026-10-01).
    find build -name "Undirect.app" -maxdepth 6 2>/dev/null | while read -r app; do
      pluginkit -r "$app/Contents/PlugIns/Undirect Extension.appex" 2>/dev/null
      /System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -u "$app"
    done
    rm -rf build/mas
    pluginkit -mAvvv -D -i com.matsuokengo.undirect.Extension | grep "Path" ;;
  screenshots)      $FASTLANE ios upload_screenshots ;;
  screenshots_mac)  $FASTLANE mac upload_screenshots_mac ;;
  previews)
    ASC_KEY_ID="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["key_id"])' "$UNDIRECT_ASC_KEY_FILE")"
    ASC_ISSUER_ID="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["issuer_id"])' "$UNDIRECT_ASC_KEY_FILE")"
    ASC_PRIVATE_KEY_PATH="$(dirname "$UNDIRECT_ASC_KEY_FILE")/AuthKey_$ASC_KEY_ID.p8"
    export ASC_KEY_ID ASC_ISSUER_ID ASC_PRIVATE_KEY_PATH
    shift
    python3 Support/AppStore/upload_previews.py "$@" ;;
  status)
    # asc takes the key from the environment; the .p8 sits beside the json.
    ASC_KEY_ID="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["key_id"])' "$UNDIRECT_ASC_KEY_FILE")"
    ASC_ISSUER_ID="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["issuer_id"])' "$UNDIRECT_ASC_KEY_FILE")"
    ASC_PRIVATE_KEY_PATH="$(dirname "$UNDIRECT_ASC_KEY_FILE")/AuthKey_$ASC_KEY_ID.p8"
    export ASC_KEY_ID ASC_ISSUER_ID ASC_PRIVATE_KEY_PATH
    asc status --app 6810513194 ;;
  help|*)           usage ;;
esac
