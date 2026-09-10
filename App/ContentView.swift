import SwiftUI
import TipKit

struct ContentView: View {
    @State private var status = ExtensionStatus()
    @State private var rules = RulesModel()
    @State private var grouping: Grouping? = .everywhere
    // iPhone and Slide Over collapse the columns. Open on the rules, not on a
    // two-item menu in front of them.
    @State private var compactColumn = NavigationSplitViewColumn.detail

    var body: some View {
        screen
            .task {
                try? Tips.configure()
                #if DEBUG
                // Screenshot runs force the tip; display rules otherwise decide.
                if UserDefaults.standard.bool(forKey: "UndirectShowTips") {
                    Tips.showAllTipsForTesting()
                }
                #endif
                // The file is instant. Safari can take its time.
                rules.reload()
                await status.refresh()
            }
            #if os(macOS)
            .frame(minWidth: 640, minHeight: 440)
            #endif
    }

    @ViewBuilder
    private var screen: some View {
        switch shownState {
        case .checking:
            // Nothing while Safari is being asked. Showing the setup steps here
            // would be a guess, and it is usually wrong.
            Color.clear
        case .on:
            split
        case .off, .unavailable, .failed:
            SetupView(state: status.state, openSettings: status.openSafariSettings, recheck: recheck)
        }
    }

    private var split: some View {
        NavigationSplitView(preferredCompactColumn: $compactColumn) {
            List(Grouping.allCases, selection: $grouping) { item in
                Label(item.title, systemImage: item.symbol)
                    .tag(item)
            }
            .navigationTitle("Undirect")
            #if os(macOS)
            .navigationSplitViewColumnWidth(min: 170, ideal: 190, max: 240)
            #endif
        } detail: {
            RulesView(rules: rules, grouping: grouping ?? .everywhere, recheck: recheck)
        }
    }

    // Debug builds can be launched into a given state so every screen can be
    // captured without switching the extension off in Safari.
    private var shownState: ExtensionStatus.State {
        #if DEBUG
        switch UserDefaults.standard.string(forKey: "UndirectForceState") {
        case "off": return .off
        case "on": return .on
        case "checking": return .checking
        default: break
        }
        #endif
        return status.state
    }

    private func recheck() {
        rules.reload()
        Task { await status.refresh() }
    }
}

#Preview {
    ContentView()
}
