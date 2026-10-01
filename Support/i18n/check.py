#!/usr/bin/env python3
"""Check that every locale is complete and well formed.

    python3 Support/i18n/check.py

Reads the drafts as the list of locales, then confirms for each one:
  - the draft has every id in brief.json
  - the String Catalog has every app key, with the same printf specifiers as the key
  - the extension folder has every message key of en, the same placeholders block,
    and $COUNT$ wherever en has it (a singular "_one" form may drop the number)
  - no em dash or en dash in any string (house copy rule)
  - the store copy, where present, stays inside Apple's limits
Also scans the code for user-facing strings that no brief entry covers.
Exits 1 on any failure.
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "Support/i18n"))
from merge import ext_folder  # noqa: E402

DRAFTS = ROOT / "Support/i18n/drafts"
LOCALES = ROOT / "Extension/Resources/_locales"
SPEC = re.compile(r"%(?:\d+\$)?(?:lld|ld|d|@|f|s)")
DASHES = ("—", "–")
LIMITS = {"name": 30, "subtitle": 30, "promo": 170, "description": 4000, "whatsNew": 4000}

problems = []


def bad(msg):
    problems.append(msg)


def load(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001
        bad(f"{path.relative_to(ROOT)}: invalid JSON ({exc})")
        return None


def main():
    brief = load(ROOT / "Support/i18n/brief.json")["entries"]
    ids = [e["id"] for e in brief]
    catalog = load(ROOT / "App/Localizable.xcstrings")
    en = load(LOCALES / "en/messages.json")
    codes = sorted(p.stem for p in DRAFTS.glob("*.json"))

    app_keys = {e["en_key"] for e in brief if e["surface"] == "app"}
    if set(catalog["strings"]) != app_keys:
        bad(f"catalog keys differ from brief: {sorted(set(catalog['strings']) ^ app_keys)[:5]}")

    for code in codes:
        draft = load(DRAFTS / f"{code}.json")
        if draft is None:
            continue
        entries = draft["entries"]
        missing = [i for i in ids if i not in entries or not entries[i]["s"].strip()]
        if missing:
            bad(f"{code}: draft missing/empty {missing[:5]}")

        # app strings
        for key, spec in catalog["strings"].items():
            unit = spec.get("localizations", {}).get(code, {}).get("stringUnit")
            if not unit or not unit.get("value", "").strip():
                bad(f"{code}: catalog missing '{key}'")
                continue
            if sorted(SPEC.findall(key)) != sorted(SPEC.findall(unit["value"])):
                bad(f"{code}: specifier mismatch in '{key}' -> '{unit['value']}'")
            if any(d in unit["value"] for d in DASHES):
                bad(f"{code}: dash in catalog value '{unit['value']}'")

        # extension strings
        folder = LOCALES / ext_folder(code) / "messages.json"
        if not folder.exists():
            bad(f"{code}: no {folder.relative_to(ROOT)}")
            continue
        messages = load(folder)
        if messages is None:
            continue
        if set(messages) != set(en):
            bad(f"{code}: message keys differ from en: {sorted(set(messages) ^ set(en))[:5]}")
        for key, base in en.items():
            got = messages.get(key)
            if not got or not got.get("message", "").strip():
                bad(f"{code}: empty message {key}")
                continue
            if got.get("placeholders") != base.get("placeholders"):
                bad(f"{code}: placeholders differ in {key}")
            if "%lld" in got["message"]:
                bad(f"{code}: %lld left in extension message {key}")
            if "$COUNT$" in base["message"] and "$COUNT$" not in got["message"] and not key.endswith("_one"):
                bad(f"{code}: {key} lost $COUNT$")
            if any(d in got["message"] for d in DASHES):
                bad(f"{code}: dash in {key}")
            # App Store Connect refuses the upload past 112 characters (build 6, 2026-10-01)
            if key == "extension_description" and len(got["message"]) > 112:
                bad(f"{code}: extension_description is {len(got['message'])} chars (limit 112)")

    # store copy
    listing = load(ROOT / "Support/AppStore/locales.json")
    for entry in listing["locales"]:
        copy = entry.get("copy")
        if not copy:
            bad(f"store: no copy for {entry['code']}")
            continue
        for field, limit in LIMITS.items():
            if len(copy.get(field, "")) > limit or not copy.get(field):
                bad(f"store {entry['code']}: {field} is {len(copy.get(field, ''))} chars (limit {limit})")
        keywords = copy.get("keywords", "")
        if not keywords or len(keywords.encode("utf-8")) > 100:
            bad(f"store {entry['code']}: keywords are {len(keywords.encode('utf-8'))} bytes (limit 100)")
        for field, value in copy.items():
            if any(d in value for d in DASHES):
                bad(f"store {entry['code']}: dash in {field}")

    # code strings no brief entry covers
    swift_hits = []
    for path in sorted((ROOT / "App").glob("*.swift")):
        text = path.read_text(encoding="utf-8")
        for m in re.finditer(
            r'(?:Text|Label|Button|navigationTitle|Section|Toggle|Picker|LabeledContent|ContentUnavailableView|help|TextField|Link)\(\s*"((?:[^"\\]|\\.)+)"',
            text,
        ):
            if m.group(1) not in app_keys and not m.group(1).startswith("\\("):
                swift_hits.append(f"{path.name}: {m.group(1)}")
    for hit in swift_hits:
        bad(f"uncovered app string {hit}")
    used = set()
    for path in [*(ROOT / "Extension/Resources").rglob("*.js"), *(ROOT / "Extension/Resources").rglob("*.html")]:
        if "_locales" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        used |= set(re.findall(r'data-i18n(?:-label)?="([a-z_]+)"', text))
        used |= set(re.findall(r'\bt\(\s*"([a-z_]+)"', text))
        used |= set(re.findall(r'getMessage\(\s*"([a-z_]+)"', text))
    for key in sorted(used - set(en)):
        bad(f"extension code asks for '{key}' which en does not define")

    print(f"{len(codes)} locales checked, {len(ids)} entries each, {len(listing['locales'])} storefronts")
    if problems:
        print(f"{len(problems)} problems")
        for p in problems[:80]:
            print(" -", p)
        sys.exit(1)
    print("all complete")


if __name__ == "__main__":
    main()
