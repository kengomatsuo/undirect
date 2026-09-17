import SwiftUI

// Sites switched on from the Undirect button in Safari. The app can only
// remove one here, never add one - it has no way to know what page is open
// in Safari right now, so a text field here would be guessing.
struct WatchedView: View {
    let rules: RulesModel

    var body: some View {
        container
            .navigationTitle("Guarded sites")
    }

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
            } else if rules.watchedSites.isEmpty {
                ContentUnavailableView(
                    "No sites guarded yet",
                    systemImage: "checkmark.shield",
                    description: Text("Press the Undirect button in Safari on a site that keeps redirecting.")
                )
            } else {
                ForEach(rules.watchedSites, id: \.self) { site in
                    WatchedSiteRow(site: site, canEdit: rules.canEdit) {
                        rules.stopWatching(site)
                    }
                }
            }
        } footer: {
            if !rules.watchedSites.isEmpty {
                Text("Sites are added from the Undirect button in Safari.")
            }
        }
    }
}

struct WatchedSiteRow: View {
    let site: String
    let canEdit: Bool
    let stop: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "globe")
                .foregroundStyle(.tint)
                .frame(width: 20)
                .accessibilityHidden(true)

            Text(site)
                .lineLimit(1)
                .truncationMode(.middle)
                .frame(maxWidth: .infinity, alignment: .leading)

            if canEdit {
                Button("Stop", action: stop)
                    .help("Stop guarding this site")
            } else {
                Text("Guarded")
                    .foregroundStyle(.secondary)
            }
        }
    }
}

#Preview {
    WatchedView(rules: RulesModel())
}
