import SwiftUI

@main
struct UndirectApp: App {
    // One model for the window and the Settings window, so both show the same.
    @State private var rules = RulesModel()

    var body: some Scene {
        WindowGroup {
            ContentView(rules: rules)
        }
        #if os(macOS)
        // The rules list grows, so the window has to be resizable rather than
        // pinned to its content.
        .defaultSize(width: 520, height: 620)
        #endif

        #if os(macOS)
        // The HIG puts Mac settings behind the App menu's Settings item.
        Settings {
            SettingsView(rules: rules)
        }
        #endif
    }
}
