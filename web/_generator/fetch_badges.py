#!/usr/bin/env python3
"""Download Apple's official black "Download on the App Store" badge for each site language.

    python3 web/_generator/fetch_badges.py

The service answers 404 for a language Apple has no artwork for; those fall back to
en-us and are listed in badges.json under "fallback". Apple's rules (checked
2026-10-01, developer.apple.com/app-store/marketing/guidelines): use the artwork
as supplied, black badge preferred, at least 40 px tall on screen, clear space of a
quarter of the badge height, one badge per layout, never translate "App Store"."""
import json
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
URL = "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/{}"
# site language -> Apple badge locale (first that exists wins)
WANT = {
    "ar-SA": ["ar-sa", "ar-ar"], "bn-BD": ["bn-bd", "bn-in"], "ca": ["ca-es"], "cs": ["cs-cz"], "da": ["da-dk"],
    "de-DE": ["de-de"], "el": ["el-gr"], "en-AU": ["en-au", "en-us"], "en-CA": ["en-ca", "en-us"],
    "en-GB": ["en-gb", "en-us"], "en-US": ["en-us"], "es-ES": ["es-es"], "es-MX": ["es-mx"], "fi": ["fi-fi"],
    "fr-CA": ["fr-ca"], "fr-FR": ["fr-fr"], "gu-IN": ["gu-in"], "he": ["he-il"], "hi": ["hi-in"], "hr": ["hr-hr"],
    "hu": ["hu-hu"], "id": ["id-id"], "it": ["it-it"], "ja": ["ja-jp"], "kn-IN": ["kn-in"], "ko": ["ko-kr"],
    "ml-IN": ["ml-in"], "mr-IN": ["mr-in"], "ms": ["ms-my"], "nl-NL": ["nl-nl"], "no": ["no-no"], "or-IN": ["or-in"],
    "pa-IN": ["pa-in"], "pl": ["pl-pl"], "pt-BR": ["pt-br"], "pt-PT": ["pt-pt"], "ro": ["ro-ro"], "ru": ["ru-ru"],
    "sk": ["sk-sk"], "sl-SI": ["sl-si"], "sv": ["sv-se"], "ta-IN": ["ta-in"], "te-IN": ["te-in"], "th": ["th-th"],
    "tr": ["tr-tr"], "uk": ["uk-ua"], "ur-PK": ["ur-pk", "ur-in"], "vi": ["vi-vn"], "zh-Hans": ["zh-cn"], "zh-Hant": ["zh-tw"],
}


def fetch(code):
    r = subprocess.run(["curl", "-s", "-L", "-A", "Mozilla/5.0", "-w", "\n%{http_code}", URL.format(code)], capture_output=True)
    body, _, status = r.stdout.rpartition(b"\n")
    return body if status.strip() == b"200" and b"<svg" in body[:400] else None


def main():
    mapping, fallback, cache = {}, [], {}
    for site, options in WANT.items():
        got = None
        for code in options:
            if code not in cache:
                cache[code] = fetch(code)
            if cache[code]:
                got = code
                break
        if not got:
            got = "en-us"
            fallback.append(site)
            cache.setdefault("en-us", fetch("en-us"))
        mapping[site] = got
    (HERE / "badges").mkdir(exist_ok=True)
    for code in sorted(set(mapping.values())):
        (HERE / "badges" / f"{code}.svg").write_bytes(cache[code])
    (HERE / "badges.json").write_text(json.dumps({"map": mapping, "fallback_to_en_us": sorted(fallback)}, indent=1) + "\n")
    print(len(set(mapping.values())), "badges; english fallback:", sorted(fallback))
    print({k: v for k, v in mapping.items() if v != WANT[k][0]})


main()
