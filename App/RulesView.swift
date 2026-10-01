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

// The detail column: one card of rules under the grouping's title. Settings
// live in SettingsView, never in this list.
struct RulesView: View {
    let rules: RulesModel
    let grouping: Grouping

    private var shown: [Rule] {
        grouping == .everywhere ? rules.everywhere : rules.bySite
    }

    var body: some View {
        RecordList(
            reachedApp: rules.reachedApp,
            isEmpty: shown.isEmpty,
            emptyTitle: "No rules here",
            emptySymbol: "checklist",
            emptyDetail: "A destination shows up once you allow or block it."
        ) {
            ForEach(shown) { rule in
                RuleRow(rule: rule, canEdit: rules.canEdit, apply: applied)
            }
        } footer: {
            if grouping == .everywhere, let counts = rules.snapshot?.counts, counts.lifetime > 0 {
                Text("\(counts.lifetime) stopped in all.")
            }
        }
        .navigationTitle(grouping.title)
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
            HostIcon()

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
