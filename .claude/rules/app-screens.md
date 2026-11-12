---
paths:
  - "App/**"
---

One `NavigationSplitView` for all three: sidebar on iPad and Mac, collapsing to
a stack on iPhone that opens on the sidebar. Rows follow
System Settings, the app this one sits beside. Setup is one sentence and a
button, never a tutorial: the HIG says onboarding must not teach the system.
Debug builds take `-UndirectForceState`, `-UndirectSeedSample` and `-UndirectPane`. Full account:
[docs/rules-and-record.md](../../docs/rules-and-record.md).

- **macOS needs a grouped `Form`, not an inset `List`.** `.listStyle(.inset)`
  draws bare hairlines; `.formStyle(.grouped)` draws the rounded card System
  Settings uses. iOS keeps `.insetGrouped`, which already draws cards. Same doc.
- **A tip that points at one control is a popover or an annotation, never a hint
  card in the list.** The control here is macOS-only, and macOS describes a
  control with `help(_:)`, so there is no tip framework in this project.
- **First run is two screens, not one.** A welcome sheet says what the app does
  and its button switches the extension on; the not-on-yet screen is
  `ContentUnavailableView` with its `actions:` slot. `presentationSizing(.form)`
  clips on macOS, so that one uses `.fitted`. Same doc.
- **A detail shown at launch in a collapsed split view has no title on iOS 26**,
  so iPhone starts with nothing selected and opens on the sidebar. Every screen
  sets `.navigationTitle`. Same doc.
- **Settings live in `SettingsView`, never in the rules list**: the App menu's
  Settings window on macOS, a sidebar section on iOS. Same doc.
- **`RuleRow` is a plain `HStack`**, because `LabeledContent` wraps its value
  under a wide label and a `Label` in its value position triples row height.
- **The sandbox will not read a group-container file the app did not write.**
  `com.apple.provenance` survives `xattr -c`, so a shell-written sample fails
  with POSIX 1. The debug sample lives in memory. Same doc.
