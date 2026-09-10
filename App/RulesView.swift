import SwiftUI
import TipKit

// Shaped after System Settings > Login Items & Extensions, which is the pane
// that lists Safari extensions: a sentence-case title, one line of explanation,
// a segmented control for the grouping, then one card of rows.
struct RulesView: View {
    let rules: RulesModel
    let recheck: () -> Void

    private enum Grouping: String, CaseIterable {
        case everywhere, bySite
    }

    @State private var grouping: Grouping = .everywhere
    private let changeRuleTip = ChangeRuleTip()

    private var shown: [Rule] {
        grouping == .everywhere ? rules.everywhere : rules.bySite
    }

    var body: some View {
        List {
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
                    // Apple's own example places the tip inline beside the
                    // feature rather than anchoring a popover to it.
                    if rules.canEdit {
                        TipView(changeRuleTip)
                    }
                    ForEach(shown) { rule in
                        RuleRow(rule: rule, canEdit: rules.canEdit, apply: applied)
                    }
                }
            } header: {
                header
            }
            .textCase(nil)

            Section {
                policyRow
            } header: {
                Text("Default")
                    .font(.headline)
                    .foregroundStyle(.primary)
            } footer: {
                if let counts = rules.snapshot?.counts {
                    Text("\(counts.lifetime) stopped in all, \(counts.session) since the browser started.")
                }
            }
            .textCase(nil)
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

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Rules")
                .font(.headline)
                .foregroundStyle(.primary)
            Text("Where a page may send you, and where it may not.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
            Picker("Grouping", selection: $grouping) {
                Text("Everywhere").tag(Grouping.everywhere)
                Text("By site").tag(Grouping.bySite)
            }
            .pickerStyle(.segmented)
            .labelsHidden()
        }
        .padding(.bottom, 6)
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
        changeRuleTip.invalidate(reason: .actionPerformed)
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
        } else {
            Text(rule.blocked ? "Blocked" : "Allowed")
                .foregroundStyle(.secondary)
                .fixedSize()
        }
    }
}
