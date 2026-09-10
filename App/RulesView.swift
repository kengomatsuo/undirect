import SwiftUI

// Which slice of the rules a column is showing. The sidebar picks it on iPad
// and Mac; on iPhone the split view collapses and the back button does.
enum Grouping: String, CaseIterable, Identifiable, Hashable {
    case everywhere, bySite

    var id: String { rawValue }

    var title: LocalizedStringKey {
        self == .everywhere ? "Everywhere" : "By site"
    }

    var symbol: String {
        self == .everywhere ? "globe" : "list.bullet"
    }
}

// The detail column. Shaped after System Settings > Login Items & Extensions,
// which is the pane that lists Safari extensions: one line of explanation, then
// a single card of rows.
struct RulesView: View {
    let rules: RulesModel
    let grouping: Grouping
    let recheck: () -> Void

    private var shown: [Rule] {
        grouping == .everywhere ? rules.everywhere : rules.bySite
    }

    var body: some View {
        container
            .toolbar {
                ToolbarItem {
                    Button("Check Again", systemImage: "arrow.clockwise", action: recheck)
                }
            }
            // macOS only: this names the window, which is a platform requirement
            // rather than decoration. On iOS the header below carries the name.
            #if os(macOS)
            .navigationTitle(grouping.title)
            #endif
    }

    // A grouped Form draws the rounded card that System Settings uses. A plain
    // inset List draws bare hairlines, which is not what a Mac pane looks like.
    @ViewBuilder
    private var container: some View {
        #if os(macOS)
        Form { sections }
            .formStyle(.grouped)
        #else
        List { sections }
            .listStyle(.insetGrouped)
        #endif
    }

    @ViewBuilder
    private var sections: some View {
        Section {
            if !rules.reachedApp {
                ContentUnavailableView(
                    "Nothing from the extension yet",
                    systemImage: "arrow.triangle.2.circlepath",
                    description: Text("Open a page in Safari once and this fills in.")
                )
            } else if shown.isEmpty {
                ContentUnavailableView(
                    "No rules here",
                    systemImage: "checklist",
                    description: Text("A destination shows up once you allow or block it.")
                )
            } else {
                ForEach(shown) { rule in
                    RuleRow(rule: rule, canEdit: rules.canEdit, apply: applied)
                }
            }
        } header: {
            header
        }
        .textCase(nil)

        Section {
            bannerRow
            policyRow
        } header: {
            Text("Settings")
                .font(.headline)
                .foregroundStyle(.primary)
        } footer: {
            if let counts = rules.snapshot?.counts {
                Text("\(counts.lifetime) stopped in all, \(counts.session) since the browser started.")
            }
        }
        .textCase(nil)
    }

    // The screen names itself here rather than in the navigation bar: a
    // collapsed split view discards the detail column's title, so the bar is
    // empty on iPhone.
    private var header: some View {
        VStack(alignment: .leading, spacing: 4) {
            // macOS names the window, so repeating it here would say it twice.
            #if !os(macOS)
            Text(grouping.title)
                .font(.headline)
                .foregroundStyle(.primary)
            #endif
            Text(grouping == .everywhere
                 ? "Rules that apply on every site."
                 : "Rules that apply to one site only.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .padding(.bottom, 4)
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

    private func applied(_ rule: Rule, _ verdict: String?) {
        rules.set(rule, to: verdict)
    }
}

struct RuleRow: View {
    let rule: Rule
    let canEdit: Bool
    let apply: (Rule, String?) -> Void

    // A stack, not LabeledContent: LabeledContent drops its value onto a second
    // line once the label is wide, and these labels are hostnames.
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "globe")
                .foregroundStyle(.tint)
                .frame(width: 20)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 1) {
                Text(rule.base)
                    .lineLimit(1)
                    .truncationMode(.middle)
                if let site = rule.site {
                    Text(site)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            state
        }
    }

    @ViewBuilder
    private var state: some View {
        if canEdit {
            Menu {
                Button(rule.blocked ? "Allow" : "Block") {
                    apply(rule, rule.blocked ? "allow" : "block")
                }
                Button("Use Default") { apply(rule, nil) }
            } label: {
                Text(rule.blocked ? "Blocked" : "Allowed")
            }
            .fixedSize()
            // The Mac way to say what a control does, per the help guidance.
            .help("Allow or block this destination")
        } else {
            Text(rule.blocked ? "Blocked" : "Allowed")
                .foregroundStyle(.secondary)
                .fixedSize()
        }
    }
}
