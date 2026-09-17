import SwiftUI

// App-wide settings, kept out of the rules list. macOS opens this from the
// App menu (Command-Comma), as the HIG asks; iOS reaches it from the sidebar.
struct SettingsView: View {
    let rules: RulesModel

    var body: some View {
        Form {
            Section {
                guardRow
                modeRow
            }
            Section {
                bannerRow
                policyRow
            }
        }
        .formStyle(.grouped)
        .navigationTitle("Settings")
        .task { rules.reload() }
        #if os(macOS)
        .frame(width: 440)
        .fixedSize(horizontal: false, vertical: true)
        #endif
    }

    @ViewBuilder
    private var guardRow: some View {
        let on = rules.snapshot?.enabled ?? true
        if rules.canEdit {
            Toggle("Guard", isOn: Binding(
                get: { on },
                set: { rules.setEnabled($0) }
            ))
        } else {
            LabeledContent("Guard") {
                Text(on ? "On" : "Off")
            }
        }
    }

    @ViewBuilder
    private var modeRow: some View {
        let mode = rules.snapshot?.mode ?? "watched"
        if rules.canEdit {
            Picker("Where the guard runs", selection: Binding(
                get: { mode },
                set: { rules.setMode($0) }
            )) {
                Text("Sites you turn on").tag("watched")
                Text("Every site").tag("everywhere")
            }
        } else {
            LabeledContent("Where the guard runs") {
                Text(mode == "everywhere" ? "Every site" : "Sites you turn on")
            }
        }
    }

    @ViewBuilder
    private var bannerRow: some View {
        let on = rules.snapshot?.banner ?? false
        if rules.canEdit {
            Toggle("Note in the page", isOn: Binding(
                get: { on },
                set: { rules.setBanner($0) }
            ))
        } else {
            LabeledContent("Note in the page") {
                Text(on ? "On" : "Off")
            }
        }
    }

    @ViewBuilder
    private var policyRow: some View {
        let policy = rules.snapshot?.policy ?? "block"
        if rules.canEdit {
            Picker("A destination with no rule", selection: Binding(
                get: { policy },
                set: { rules.setPolicy($0) }
            )) {
                Text("Block it").tag("block")
                Text("Allow it").tag("allow")
            }
        } else {
            LabeledContent("A destination with no rule") {
                Text(policy == "block" ? "Block it" : "Allow it")
            }
        }
    }
}
