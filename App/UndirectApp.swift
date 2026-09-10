import SwiftUI

@main
struct UndirectApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        #if os(macOS)
        // The rules list grows, so the window has to be resizable rather than
        // pinned to its content.
        .defaultSize(width: 520, height: 620)
        #endif
    }
}
