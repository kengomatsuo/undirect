# Localization

Fifty storefront languages plus English. Every locale is written from the screen,
never from the English string: `Support/i18n/brief-blind.json` describes each
screen and moment without the source text, and each locale's draft in
`Support/i18n/drafts/<code>.json` carries the string, a literal back-translation
and (for the first eighteen) a reason. English is a peer locale, not the master.

## Pipeline

- `python3 Support/i18n/merge.py` folds the drafts into `App/Localizable.xcstrings`,
  `Extension/Resources/_locales/<code>/messages.json` and, from
  `Support/i18n/store/<ASC code>.json`, into `Support/AppStore/locales.json`.
- `python3 Support/i18n/check.py` is the gate: every draft complete, every
  catalog key present in every locale with the same printf specifiers, every
  extension message with en's placeholders block and `$COUNT$`, store copy inside
  Apple's limits (name and subtitle 30, promo 170, description 4000 characters;
  keywords 100 UTF-8 bytes), no em or en dash, and no string in the code that the
  brief does not cover.
- Drafts write a count as `%lld`; merge turns it into `$COUNT$` for the extension.
  A count-sensitive noun is written as `Label: N` so the two-form popup plural
  works in languages with more than two forms.
- `xcodegen` reads the locales from the String Catalog, so `project.yml` lists none.

## Codes

| Surface | Codes |
| --- | --- |
| App (String Catalog, `.lproj`) | hyphenated: `fr-CA`, `es-MX`, `pt-PT`, `en-GB`, `en-AU`, `en-CA`, `nb`, `he`, `ms`, `bn`, `or`, `pa`, `ur`, plus `de-DE`, `fr-FR`, `es-ES`, `nl-NL`, `ar-SA` kept from the first pass |
| Extension (`_locales`) | underscored: `fr_CA`, `es_MX`, `pt_PT`, `en_GB`, `en_AU`, `en_CA`, `nb`, `he`, and so on; plain `es`, `fr`, `de`, `nl`, `ar` |
| App Store Connect | `bn-BD`, `gu-IN`, `kn-IN`, `ml-IN`, `mr-IN`, `or-IN`, `pa-IN`, `ta-IN`, `te-IN`, `ur-PK`, `sl-SI`, `no`, ... |

Safari picks the folder with Foundation's language matching (WebKit
`WebExtension::bestMatchLocale`, checked 2026-10-01), so `nb`, `he`, `ms`, `bn`,
`or`, `pa`, `ur` resolve for `nb-NO`/`no`, `he-IL`, `ms-MY` and the rest, and
`fr_CA`, `es_MX`, `pt_PT` win over their base language for their region.
`es-419` and `es-US` land on `es_MX` in the app and on `es` in the extension.

## Right to left

Hebrew, Arabic and Urdu set `dir="rtl"` on the popup from `@@bidi_dir`
(`popup.js`), and `popup.css` uses logical properties; the chevrons, the back
arrow and the switch knob flip under `:root[dir="rtl"]`. SwiftUI mirrors the app by itself.

## Review status

The 31 languages added on 2026-10-01 were first written in one pass that could
see the English. A second pass then gave each language to a reviewer who saw
only the screen brief and the current string, never the English, and 318
strings were rewritten (commits 13e83f4 and the one after it). The common
faults were Sanskritised words where Apple uses the loanword (Gujarati and Odia
"block"), gendered address (Polish, Czech, Slovak, Hebrew), plurals that broke
between 2-4 and 5+ (Polish), and an informal register where Apple's own
Greek and Hungarian guides are formal. Terms in dispute were checked against
Apple's localized support pages; Apple publishes none in Urdu, so the Urdu
terms rest on the reviewer alone.

`Support/i18n/store/<ASC code>.json` is the source of the store copy;
`merge.py` rebuilds `Support/AppStore/locales.json` from it, so an edit made
straight to `locales.json` is overwritten.

No native speaker has read any of it yet.
