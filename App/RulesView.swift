import SwiftUI

// A collection of data, so a List with sections rather than stacks.
struct RulesView: View {
    let rules: RulesModel
    let recheck: () -> Void

    var body: some View {
        List {
            if !rules.reachedApp {
                Section {
                    ContentUnavailableView(
                        "Nothing from the extension yet",
                        systemImage: "arrow.triangle.2.circlepath",
                        description: Text("Open a page in Safari once and this fills in.")
                    )
                }
            } else if rules.isEmpty {
                Section {
                    ContentUnavailableView(
                        "No rules yet",
                        systemImage: "checklist",
                        description: Text("A destination shows up here once you allow or block it.")
                    )
                }
            } else {
                if !rules.everywhere.isEmpty {
                    Section("Set everywhere") {
                        ForEach(rules.everywhere) { rule in
                            RuleRow(rule: rule, canEdit: rules.canEdit, apply: rules.set)
                        }
                    }
                }
                if !rules.bySite.isEmpty {
                    Section("Set for one site") {
                        ForEach(rules.bySite) { rule in
                            RuleRow(rule: rule, canEdit: rules.canEdit, apply: rules.set)
                        }
                    }
                }
            }

            Section {
                policyRow
            } header: {
                Text("Default")
            } footer: {
                if let counts = rules.snapshot?.counts {
                    Text("\(counts.lifetime) stopped in all, \(counts.session) since the browser started.")
                }
            }
        }
        #if os(macOS)
        .listStyle(.inset)
        #else
        .listStyle(.insetGrouped)
        #endif
        .toolbar {
            ToolbarItem {
                Button("Check Again", systemImage: "arrow.clockwise", action: recheck)
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

struct RuleRow: View {
    let rule: Rule
    let canEdit: Bool
    let apply: (Rule, String?) -> Void

    // A stack rather than LabeledContent: LabeledContent drops its value onto a
    // second line once the label is wide, and these hosts are wide.
    var body: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(rule.base)
                    .font(.body.monospaced())
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

            if canEdit {
                Menu {
                    Button(rule.blocked ? "Allow" : "Block") {
                        apply(rule, rule.blocked ? "allow" : "block")
                    }
                    Button("Use Default") { apply(rule, nil) }
                } label: {
                    verdict
                }
                .fixedSize()
            } else {
                verdict
                    .foregroundStyle(.secondary)
                    .fixedSize()
            }
        }
    }

    private var verdict: some View {
        HStack(spacing: 4) {
            Image(systemName: rule.blocked ? "nosign" : "checkmark")
                .imageScale(.small)
            Text(rule.blocked ? "Blocked" : "Allowed")
        }
    }
}
