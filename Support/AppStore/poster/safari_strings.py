#!/usr/bin/env python3
"""Safari's own page-menu strings per store language, read from the iOS Simulator runtime's MobileSafari frameworks,
so the drawn page menu says what Safari says in that language. Writes safari-strings.json (committed; the build reads
only that file).

    python3 safari_strings.py
"""
import json, subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
LPROJ = {"ar-SA": "ar", "bn-BD": "bn", "de-DE": "de", "en-US": "en", "en-AU": "en_AU", "en-CA": "en_CA", "en-GB": "en_GB",
         "es-ES": "es", "es-MX": "es_419", "fr-CA": "fr_CA", "fr-FR": "fr", "gu-IN": "gu", "kn-IN": "kn", "ml-IN": "ml",
         "mr-IN": "mr", "nl-NL": "nl", "or-IN": "or", "pa-IN": "pa", "pt-BR": "pt", "pt-PT": "pt_PT", "sl-SI": "sl",
         "ta-IN": "ta", "te-IN": "te", "ur-PK": "ur", "zh-Hans": "zh_CN", "zh-Hant": "zh_TW"}
KEYS = {  # what -> (framework, key)
    "translate": ("MobileSafari", "Translate Website…"),
    "hide": ("MobileSafari", "Hide Distracting Items"),
    "bookmark_to": ("MobileSafariUI", "Add Bookmark to…"),
    "extensions": ("MobileSafariUI", "Extensions (Menu button)"),
}


def runtime_root():
    j = json.loads(subprocess.check_output(["xcrun", "simctl", "list", "runtimes", "-j"]))
    return Path([r for r in j["runtimes"] if r["platform"] == "iOS"][-1]["runtimeRoot"])


def main():
    fw = runtime_root() / "System/Library/PrivateFrameworks"
    store = [l["code"] for l in json.loads((HERE.parent / "locales.json").read_text())["locales"]]
    cache, out = {}, {}
    for loc in store:
        lp = LPROJ.get(loc, loc)
        row = {}
        for what, (f, key) in KEYS.items():
            p = fw / f"{f}.framework" / f"{lp}.lproj" / "Localizable.strings"
            if p not in cache:
                cache[p] = json.loads(subprocess.check_output(["plutil", "-convert", "json", "-o", "-", str(p)]))
            row[what] = cache[p][key]
        out[loc] = row
    (HERE / "safari-strings.json").write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
    print(len(out), "languages")


if __name__ == "__main__":
    main()
