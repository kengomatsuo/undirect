#!/usr/bin/env python3
"""Fold the blind-translation drafts into the two places the product reads.

    python3 Support/i18n/merge.py            # every draft in Support/i18n/drafts
    python3 Support/i18n/merge.py ja ko      # only these

App strings land in App/Localizable.xcstrings, keyed by the English source
string. Extension strings land in Extension/Resources/_locales/<code>/messages.json,
where the folder name takes an underscore, never a hyphen (MDN, WebExtensions
Internationalization), and every placeholder block is carried over from en.
"""
import json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
DRAFTS = ROOT / "Support/i18n/drafts"
BRIEF = ROOT / "Support/i18n/brief.json"
CATALOG = ROOT / "App/Localizable.xcstrings"
LOCALES = ROOT / "Extension/Resources/_locales"

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

    for path in sorted(DRAFTS.glob("*.json")):
        code = path.stem
        if only and code not in only:
            continue
        draft = json.loads(path.read_text())["entries"]

        missing = sorted(set(brief) - set(draft))
        if missing:
            print(f"{code}: missing {len(missing)} ids, first {missing[:3]}")

        messages, app_count = {}, 0
        for key, entry in en_messages.items():
            messages[key] = dict(entry)

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
            else:
                out = messages.setdefault(spec["en_key"], {})
                out["message"] = value
                # description and placeholders stay as en wrote them
        ext_count = sum(1 for i, s in brief.items() if s["surface"] == "extension" and i in draft)

        folder = LOCALES / ext_folder(code)
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "messages.json").write_text(
            json.dumps(messages, ensure_ascii=False, indent=2) + "\n"
        )
        print(f"{code}: {app_count} app strings, {ext_count} extension strings -> {folder.name}")

    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
    print(f"catalog: {len(catalog['strings'])} keys")


if __name__ == "__main__":
    main(set(sys.argv[1:]))
