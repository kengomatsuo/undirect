import SwiftUI

// A sidebar row: a slice of the rules, or the settings pane on iOS.
enum Pane: Hashable {
    case rules(Grouping)
    case sites
    case settings
}

struct ContentView: View {
    let rules: RulesModel
    @State private var status = ExtensionStatus()
    // iPhone opens on the sidebar, like Settings and Mail: a detail shown at
    // launch in a collapsed split view loses its navigation title, and a
    // selected row pushes one. So compact width starts with nothing selected
    // (seen on iOS 26, 2026-09-10). Regular width selects in `.task`.
    #if os(macOS)
    @State private var pane: Pane? = .rules(.everywhere)
    #else
    @State private var pane: Pane?
    @Environment(\.horizontalSizeClass) private var sizeClass
    #endif
    @AppStorage("welcomeShown") private var welcomeShown = false
    @State private var showWelcome = false

    var body: some View {
        screen
            .task {
                #if !os(macOS)
                if pane == nil, sizeClass != .compact { pane = .rules(.everywhere) }
                #endif
                showWelcome = !welcomeShown || forcedWelcome
                // The file is instant. Safari can take its time.
                rules.reload()
                await status.refresh()
            }
            .task { await rules.watch() }
            .task { await status.watch() }
            .sheet(isPresented: $showWelcome) {
                WelcomeView {
                    welcomeShown = true
                    showWelcome = false
                    status.openSafariSettings()
                }
                // .form is a fixed size and clips the fourth row on macOS.
                #if os(macOS)
                .presentationSizing(.fitted)
                #else
                .presentationSizing(.form)
                #endif
                .interactiveDismissDisabled()
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
        case .failed, .unavailable:
            // Safari would not say. If the extension has been here, a record in
            // hand beats a screen asking for something already done.
            if rules.reachedApp {
                split
            } else {
                SetupView(state: status.state, openSettings: status.openSafariSettings)
            }
        case .off:
            SetupView(state: status.state, openSettings: status.openSafariSettings)
        }
    }

    private var split: some View {
        NavigationSplitView {
            List(selection: $pane) {
                Section {
                    ForEach(Grouping.allCases) { item in
                        Label(item.title, systemImage: item.symbol)
                            .tag(Pane.rules(item))
                    }
                    Label("Guarded sites", systemImage: "checkmark.shield")
                        .tag(Pane.sites)
                }
                // macOS keeps settings in the App menu's Settings window.
                #if !os(macOS)
                Section {
                    Label("Settings", systemImage: "gearshape")
                        .tag(Pane.settings)
                }
                #endif
            }
            .navigationTitle("Undirect")
            #if os(macOS)
            .navigationSplitViewColumnWidth(min: 170, ideal: 190, max: 240)
            #endif
            .task { await pickDebugPane() }
        } detail: {
            switch pane ?? .rules(.everywhere) {
            case .rules(let grouping):
                RulesView(rules: rules, grouping: grouping)
            case .sites:
                WatchedView(rules: rules)
            case .settings:
                SettingsView(rules: rules)
            }
        }
    }

    // Debug builds can open a pane for screenshots. It is picked after
    // launch, so on iPhone it is pushed and keeps its title.
    private func pickDebugPane() async {
        #if DEBUG
        guard let raw = UserDefaults.standard.string(forKey: "UndirectPane") else { return }
        try? await Task.sleep(for: .milliseconds(700))
        switch raw {
        case "bysite": pane = .rules(.bySite)
        case "sites": pane = .sites
        case "settings": pane = .settings
        default: pane = .rules(.everywhere)
        }
        #endif
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

    private var forcedWelcome: Bool {
        #if DEBUG
        return UserDefaults.standard.bool(forKey: "UndirectShowWelcome")
        #else
        return false
        #endif
    }

}

#Preview {
    ContentView(rules: RulesModel())
}
