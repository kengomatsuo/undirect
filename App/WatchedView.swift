import SwiftUI

// Sites switched on from the Undirect button in Safari. The app can only
// remove one here, never add one - it has no way to know what page is open
// in Safari right now, so a text field here would be guessing.
struct WatchedView: View {
    let rules: RulesModel

    var body: some View {
        RecordList(
            reachedApp: rules.reachedApp,
            isEmpty: rules.watchedSites.isEmpty,
            emptyTitle: "No sites guarded yet",
            emptySymbol: "checkmark.shield",
            emptyDetail: "Press the Undirect button in Safari on a site that keeps redirecting."
        ) {
            ForEach(rules.watchedSites, id: \.self) { site in
                WatchedSiteRow(site: site, canEdit: rules.canEdit) {
                    rules.stopWatching(site)
                }
            }
        } footer: {
            if !rules.watchedSites.isEmpty {
                Text("Sites are added from the Undirect button in Safari.")
            }
        }
        .navigationTitle("Guarded sites")
    }
}

struct WatchedSiteRow: View {
    let site: String
    let canEdit: Bool
    let stop: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            HostIcon()

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
