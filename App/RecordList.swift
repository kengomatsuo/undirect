import SwiftUI

// One grouped card of rows, shared by the rules and the guarded sites. It
// shows the system's empty state until the extension has written anything,
// and again when there is nothing to list.
//
// A grouped Form draws the rounded card that System Settings uses on the Mac.
// A plain inset List draws bare hairlines, which is not what a Mac pane looks
// like. iOS keeps .insetGrouped, which already draws cards.
struct RecordList<Rows: View, Footer: View>: View {
    let reachedApp: Bool
    let isEmpty: Bool
    let emptyTitle: LocalizedStringKey
    let emptySymbol: String
    let emptyDetail: LocalizedStringKey
    @ViewBuilder let rows: Rows
    @ViewBuilder let footer: Footer

    var body: some View {
        #if os(macOS)
        Form { section }
            .formStyle(.grouped)
        #else
        List { section }
            .listStyle(.insetGrouped)
        #endif
    }

    private var section: some View {
        Section {
            if !reachedApp {
                ContentUnavailableView(
                    "Nothing from the extension yet",
                    systemImage: "arrow.triangle.2.circlepath",
                    description: Text("Open a page in Safari once and this fills in.")
                )
            } else if isEmpty {
                ContentUnavailableView(
                    emptyTitle,
                    systemImage: emptySymbol,
                    description: Text(emptyDetail)
                )
            } else {
                rows
            }
        } footer: {
            footer
        }
    }
}

// The leading icon of a row naming a host.
struct HostIcon: View {
    var body: some View {
        Image(systemName: "globe")
            .foregroundStyle(.tint)
            .frame(width: 20)
            .accessibilityHidden(true)
    }
}
