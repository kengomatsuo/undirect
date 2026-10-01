#!/usr/bin/env python3
"""Write fastlane/metadata and fastlane/metadata_mac from Support/AppStore/locales.json.

locales.json is built by Support/i18n/merge.py from Support/i18n/store/<code>.json;
edit those, never this output. The locale codes in locales.json are the App Store
Connect codes already (zh-Hans, no, ta-IN, ...), checked against Apple's list
"Managing metadata in your app by using locale shortcodes" on 2026-10-01.

Both platforms get the same copy. macOS has its own folder because deliver reads
one metadata_path per platform and the release notes may diverge later.
"""
import json, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "Support/AppStore/locales.json"
SUPPORT_URL = "https://undirect.matsuokengo.com/support/"
PRIVACY_URL = "https://undirect.matsuokengo.com/privacy/"
COPYRIGHT = "2026 Kenneth Fang"

FILES = {
    "name": "name.txt",
    "subtitle": "subtitle.txt",
    "promo": "promotional_text.txt",
    "keywords": "keywords.txt",
    "description": "description.txt",
    "whatsNew": "release_notes.txt",
}

locales = json.loads(SRC.read_text(encoding="utf-8"))["locales"]
for folder in ("metadata", "metadata_mac"):
    out = ROOT / "fastlane" / folder
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    (out / "copyright.txt").write_text(COPYRIGHT + "\n", encoding="utf-8")
    for loc in locales:
        d = out / loc["code"]
        d.mkdir()
        for key, fname in FILES.items():
            (d / fname).write_text(loc["copy"][key].strip() + "\n", encoding="utf-8")
        (d / "support_url.txt").write_text(SUPPORT_URL + "\n", encoding="utf-8")
        (d / "privacy_url.txt").write_text(PRIVACY_URL + "\n", encoding="utf-8")
print(f"wrote {len(locales)} locales to metadata and metadata_mac")
