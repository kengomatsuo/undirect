import SwiftUI

// App-wide settings, kept out of the rules list. macOS opens this from the
// App menu (Command-Comma), as the HIG asks; iOS reaches it from the sidebar.
// Each row is a control where the app can edit and a plain value where it
// only mirrors the extension (iOS).
struct SettingsView: View {
    let rules: RulesModel

    private struct Choice: Identifiable {
        let tag: String
        let label: LocalizedStringKey
        var id: String { tag }
    }

    var body: some View {
        Form {
            Section {
                toggle("Guard", Binding(get: { rules.snapshot?.enabled ?? true }, set: { rules.setEnabled($0) }))
                choice("Where the guard runs", Binding(get: { rules.snapshot?.mode ?? "watched" }, set: { rules.setMode($0) }), [
                    Choice(tag: "watched", label: "Sites you turn on"),
                    Choice(tag: "everywhere", label: "Every site"),
                ])
            }
            Section {
                toggle("Note in the page", Binding(get: { rules.snapshot?.banner ?? false }, set: { rules.setBanner($0) }))
                choice("A destination with no rule", Binding(get: { rules.snapshot?.policy ?? "block" }, set: { rules.setPolicy($0) }), [
                    Choice(tag: "block", label: "Block it"),
                    Choice(tag: "allow", label: "Allow it"),
                ])
            }
        }
        .formStyle(.grouped)
        .navigationTitle("Settings")
        .task { rules.reload() }
    }

    @ViewBuilder
    private func toggle(_ title: LocalizedStringKey, _ value: Binding<Bool>) -> some View {
        if rules.canEdit {
            Toggle(title, isOn: value)
        } else {
            LabeledContent(title) { Text(value.wrappedValue ? "On" : "Off") }
        }
    }

    @ViewBuilder
    private func choice(_ title: LocalizedStringKey, _ value: Binding<String>, _ choices: [Choice]) -> some View {
        if rules.canEdit {
            Picker(title, selection: value) {
                ForEach(choices) { Text($0.label).tag($0.tag) }
            }
        } else {
            LabeledContent(title) {
                Text((choices.first { $0.tag == value.wrappedValue } ?? choices[0]).label)
            }
        }
    }
}
