import SwiftUI
import TipKit

struct ContentView: View {
    @State private var status = ExtensionStatus()
    @State private var rules = RulesModel()

    var body: some View {
        NavigationStack {
            screen
                .navigationTitle("Undirect")
        }
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
        .frame(minWidth: 460, minHeight: 420)
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
            RulesView(rules: rules, recheck: recheck)
        case .off, .unavailable, .failed:
            SetupView(state: status.state, openSettings: status.openSafariSettings, recheck: recheck)
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
