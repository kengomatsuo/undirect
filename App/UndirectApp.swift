import SwiftUI
#if os(macOS)
import AppKit
#endif

@main
struct UndirectApp: App {
    // One model for the window and the Settings window, so both show the same.
    @State private var rules = RulesModel()

    #if DEBUG && os(macOS)
    // Screenshot runs: -UndirectSnapshotDark YES draws the app dark whatever the
    // system appearance, because every Undirect listing image is dark.
    init() {
        if UserDefaults.standard.bool(forKey: "UndirectSnapshotDark") {
            NSApplication.shared.appearance = NSAppearance(named: .darkAqua)
        }
    }
    #endif

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
        // Sized here, not in the view: inside the main window's
        // detail column a fixed size floated in the middle.
        Settings {
            SettingsView(rules: rules)
                .frame(width: 440)
                .fixedSize(horizontal: false, vertical: true)
        }
        #endif
    }
}
