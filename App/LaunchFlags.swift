import Foundation

// Debug builds can be launched into a given state, so every screen can be
// captured without switching the extension off in Safari. Release builds
// read none of these.
//   -UndirectPane everywhere|bysite|sites|settings
//   -UndirectForceState on|off|checking
//   -UndirectShowWelcome YES
//   -UndirectReviewNow YES
enum LaunchFlags {
    #if DEBUG
    private static func string(_ key: String) -> String? {
        UserDefaults.standard.string(forKey: key)
    }

    static var forcedState: ExtensionStatus.State? {
        switch string("UndirectForceState") {
        case "off": .off
        case "on": .on
        case "checking": .checking
        default: nil
        }
    }

    static var showWelcome: Bool { UserDefaults.standard.bool(forKey: "UndirectShowWelcome") }

    static var reviewNow: Bool { UserDefaults.standard.bool(forKey: "UndirectReviewNow") }

    // Picked after launch, so on iPhone the pane is pushed and keeps its title.
    static func pane() async -> Pane? {
        guard let raw = string("UndirectPane") else { return nil }
        try? await Task.sleep(for: .milliseconds(700))
        switch raw {
        case "bysite": return .rules(.bySite)
        case "sites": return .sites
        case "settings": return .settings
        default: return .rules(.everywhere)
        }
    }
    #else
    static var forcedState: ExtensionStatus.State? { nil }
    static var showWelcome: Bool { false }
    static var reviewNow: Bool { false }
    static func pane() async -> Pane? { nil }
    #endif
}
