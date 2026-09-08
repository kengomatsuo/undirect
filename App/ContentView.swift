import SwiftUI

struct ContentView: View {
    @State private var status = ExtensionStatus()
    @State private var rules = RulesModel()

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                header
                statusRow
                Divider()
                instructions
                Divider()
                rulesSection
            }
            .padding(24)
            .frame(maxWidth: 560, alignment: .leading)
        }
        #if os(macOS)
        // A minimum the window is clamped to, so a frame restored from an
        // older build cannot leave the rules list cut off.
        .frame(minWidth: 480, minHeight: 600)
        #endif
        .task {
            // Reading the file is instant. Safari can take its time, and the
            // rules should not wait behind it.
            rules.reload()
            await status.refresh()
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Undirect")
                .font(.largeTitle.weight(.semibold))
            Text("Pages stop taking your clicks.")
                .font(.title3)
                .foregroundStyle(.secondary)
        }
    }

    @ViewBuilder
    private var statusRow: some View {
        switch status.state {
        case .checking:
            Label {
                Text("Asking Safari.")
            } icon: {
                ProgressView().controlSize(.small)
            }
        case .on:
            Label("The extension is on in Safari.", systemImage: "checkmark.circle.fill")
                .foregroundStyle(.green)
        case .off:
            Label("The extension is off in Safari.", systemImage: "xmark.circle.fill")
                .foregroundStyle(.red)
        case .unavailable:
            Label("Open Safari settings to see whether it is on.", systemImage: "info.circle")
                .foregroundStyle(.secondary)
        case .failed(let reason):
            Label {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Safari did not answer.")
                    Text(reason).font(.footnote).foregroundStyle(.secondary)
                }
            } icon: {
                Image(systemName: "exclamationmark.triangle.fill")
            }
            .foregroundStyle(.orange)
        }
    }

    @ViewBuilder
    private var instructions: some View {
        #if os(macOS)
        VStack(alignment: .leading, spacing: 12) {
            Text(status.state == .on
                 ? "Nothing else to do. Open a page and it works."
                 : "Turn it on in Safari, then keep browsing.")
            HStack(spacing: 16) {
                Button("Open Safari Extension Settings") {
                    status.openSafariSettings()
                }
                .buttonStyle(.borderedProminent)
                Button("Check again") {
                    rules.reload()
                    Task { await status.refresh() }
                }
            }
        }
        #else
        VStack(alignment: .leading, spacing: 12) {
            Text(status.state == .on
                 ? "Nothing else to do. Open a page and it works."
                 : "Turn it on in Settings.")
            VStack(alignment: .leading, spacing: 8) {
                stepRow(1, "Open Settings, then Apps, then Safari.")
                stepRow(2, "Tap Extensions.")
                stepRow(3, "Turn on Undirect and allow it on every site.")
            }
            Button("Check again") {
                rules.reload()
                Task { await status.refresh() }
            }
        }
        #endif
    }

    @ViewBuilder
    private var rulesSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .firstTextBaseline) {
                Text("Rules").font(.headline)
                Spacer()
                if let counts = rules.snapshot?.counts {
                    Text("\(counts.lifetime) stopped in all")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                        .monospacedDigit()
                }
            }

            if !rules.reachedApp {
                ContentUnavailableView(
                    "Nothing from the extension yet",
                    systemImage: "arrow.triangle.2.circlepath",
                    description: Text("Open a page in Safari once and this fills in.")
                )
            } else if rules.isEmpty {
                ContentUnavailableView(
                    "No rules set",
                    systemImage: "checklist",
                    description: Text("Blocked destinations appear here once you allow or block one.")
                )
            } else {
                if !rules.everywhere.isEmpty {
                    ruleGroup("Set everywhere", rules.everywhere)
                }
                if !rules.bySite.isEmpty {
                    ruleGroup("Set for one site", rules.bySite)
                }
            }

            if rules.reachedApp {
                policyPicker
            }

            if !rules.canEdit {
                Text("Changes are made in the extension button in Safari.")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
        }
    }

    private func ruleGroup(_ title: LocalizedStringKey, _ list: [Rule]) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)
                .textCase(.uppercase)
            ForEach(list) { rule in
                ruleRow(rule)
            }
        }
    }

    private func ruleRow(_ rule: Rule) -> some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 1) {
                Text(rule.base)
                    .font(.callout.monospaced())
                    .lineLimit(1)
                    .truncationMode(.middle)
                if let site = rule.site {
                    Text(site)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
            }
            Spacer(minLength: 8)
            Text(rule.blocked ? "Blocked" : "Allowed")
                .font(.caption)
                .foregroundStyle(rule.blocked ? .red : .secondary)
            if rules.canEdit {
                Button(rule.blocked ? "Allow" : "Block") {
                    rules.set(rule, to: rule.blocked ? "allow" : "block")
                }
                Button("Use default") {
                    rules.set(rule, to: nil)
                }
            }
        }
        .frame(height: 32)
    }

    @ViewBuilder
    private var policyPicker: some View {
        let policy = rules.snapshot?.policy ?? "block"
        HStack(spacing: 12) {
            Text("A destination with no rule")
            if rules.canEdit {
                Picker("", selection: Binding(
                    get: { policy },
                    set: { rules.setPolicy($0) }
                )) {
                    Text("Block it").tag("block")
                    Text("Allow it").tag("allow")
                }
                .labelsHidden()
                .pickerStyle(.segmented)
                .frame(width: 180)
            } else {
                Text(policy == "block" ? "Block it" : "Allow it")
                    .foregroundStyle(.secondary)
            }
        }
        .font(.callout)
    }

    private func stepRow(_ number: Int, _ text: LocalizedStringKey) -> some View {
        HStack(alignment: .firstTextBaseline, spacing: 10) {
            Text(number.formatted())
                .font(.callout.monospacedDigit().weight(.semibold))
                .foregroundStyle(.secondary)
                .frame(width: 16, alignment: .trailing)
            Text(text)
        }
    }
}

#Preview {
    ContentView()
}
