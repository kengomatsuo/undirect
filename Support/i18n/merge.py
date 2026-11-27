#!/usr/bin/env python3
"""Fold the blind-translation drafts into the two places the product reads.

    python3 Support/i18n/merge.py            # every draft in Support/i18n/drafts
    python3 Support/i18n/merge.py ja ko      # only these

App strings land in App/Localizable.xcstrings, keyed by the English source
string. Store copy (Support/i18n/store/<App Store Connect code>.json) lands in
Support/AppStore/locales.json. Extension strings land in Extension/Resources/_locales/<code>/messages.json,
where the folder name takes an underscore, never a hyphen (MDN, WebExtensions
Internationalization), and every placeholder block is carried over from en.
"""
import json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
DRAFTS = ROOT / "Support/i18n/drafts"
BRIEF = ROOT / "Support/i18n/brief.json"
CATALOG = ROOT / "App/Localizable.xcstrings"
# The name under the icon, in Safari's extension list and in its page menu row.
# Each locale's comes from its draft's ext.meta.name, the same value the popup
# and the setup sentences use, so every surface names the app one way.
INFO_PLISTS = [ROOT / "App/InfoPlist.xcstrings", ROOT / "Extension/InfoPlist.xcstrings"]
NAME_ID = "ext.meta.name"
LOCALES = ROOT / "Extension/Resources/_locales"
STORE = ROOT / "Support/i18n/store"

# App Store shortcode -> the folder name the extension uses.
EXT_FOLDER = {
    "zh-Hans": "zh_CN", "zh-Hant": "zh_TW", "pt-BR": "pt_BR", "pt-PT": "pt_PT",
    "es-ES": "es", "es-MX": "es_MX", "fr-FR": "fr", "fr-CA": "fr_CA",
    "de-DE": "de", "nl-NL": "nl", "ar-SA": "ar", "en-GB": "en_GB",
}


def ext_folder(code):
    return EXT_FOLDER.get(code, code.replace("-", "_"))


def main(only):
    brief = {e["id"]: e for e in json.loads(BRIEF.read_text())["entries"]}
    catalog = json.loads(CATALOG.read_text())
    en_messages = json.loads((LOCALES / "en/messages.json").read_text())

    names = {}
    for path in sorted(DRAFTS.glob("*.json")):
        code = path.stem
        draft = json.loads(path.read_text())["entries"]
        if NAME_ID in draft:
            names[code] = draft[NAME_ID]["s"]
        if only and code not in only:
            continue

        missing = sorted(set(brief) - set(draft))
        if missing:
            print(f"{code}: missing {len(missing)} ids, first {missing[:3]}")

        # Keys no draft covers (the method_* subtitles) were written straight
        # into the locale's file, so start from that file and fall back to en
        # only for a key it lacks; starting from en reset them to English.
        folder = LOCALES / ext_folder(code)
        existing = {}
        if (folder / "messages.json").exists():
            existing = json.loads((folder / "messages.json").read_text())
        messages, app_count = {}, 0
        for key, entry in en_messages.items():
            messages[key] = dict(entry)
            if key in existing and "message" in existing[key]:
                messages[key]["message"] = existing[key]["message"]

        for ident, spec in brief.items():
            got = draft.get(ident)
            if not got:
                continue
            value = got["s"]
            if spec["surface"] == "app":
                strings = catalog["strings"].setdefault(spec["en_key"], {})
                strings.setdefault("extractionState", "manual")
                strings.setdefault("localizations", {})[code] = {
                    "stringUnit": {"state": "translated", "value": value}
                }
                app_count += 1
            elif spec["en_key"] in en_messages:
                # en is the extension's key set: a brief entry whose message en
                # dropped (the popup's old prose rows) is not carried into a locale.
                out = messages[spec["en_key"]]
                # Drafts write a count as %lld; WebExtensions name it $COUNT$ and
                # bind it to substitution $1 through the placeholders block.
                out["message"] = value.replace("%lld", "$COUNT$")
                # description and placeholders stay as en wrote them
        ext_count = sum(1 for i, s in brief.items() if s["surface"] == "extension" and i in draft)

        folder.mkdir(parents=True, exist_ok=True)
        (folder / "messages.json").write_text(
            json.dumps(messages, ensure_ascii=False, indent=2) + "\n"
        )
        print(f"{code}: {app_count} app strings, {ext_count} extension strings -> {folder.name}")

    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
    print(f"catalog: {len(catalog['strings'])} keys")
    merge_names(names)
    merge_store()


def merge_names(names):
    """Write each locale's app name as CFBundleDisplayName and CFBundleName."""
    unit = lambda v: {"stringUnit": {"state": "translated", "value": v}}
    entry = {
        "extractionState": "manual",
        "localizations": {code: unit(names[code]) for code in sorted(names)},
    }
    info = {
        "sourceLanguage": "en",
        "strings": {"CFBundleDisplayName": entry, "CFBundleName": entry},
        "version": "1.0",
    }
    for path in INFO_PLISTS:
        path.write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n")
    local = sorted(c for c, n in names.items() if n != "Undirect")
    print(f"app name: {len(names)} locales, own script in {len(local)}: {' '.join(local)}")


def merge_store():
    """Fold Support/i18n/store/<ASC code>.json into Support/AppStore/locales.json."""
    path = ROOT / "Support/AppStore/locales.json"
    listing = json.loads(path.read_text())
    for entry in listing["locales"]:
        source = STORE / f"{entry['code']}.json"
        if source.exists():
            entry["copy"] = json.loads(source.read_text())
    path.write_text(json.dumps(listing, ensure_ascii=False, indent=2) + "\n")
    have = sum(1 for e in listing["locales"] if "copy" in e)
    print(f"store copy: {have}/{len(listing['locales'])} locales")


if __name__ == "__main__":
    main(set(sys.argv[1:]))
