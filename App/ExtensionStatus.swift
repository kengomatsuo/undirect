import Foundation
import SafariServices
#if os(iOS)
import UIKit
#endif

let extensionBundleIdentifier = "com.matsuokengo.undirect.Extension"

@MainActor
@Observable
final class ExtensionStatus {
    enum State: Equatable {
        case checking
        case on
        case off
        case unavailable
        case failed(String)
    }

    private(set) var state: State = .checking

    func refresh() async {
        state = await Self.read()
    }

    // Safari gives no notification when the user flips the toggle in
    // Settings, so this is the only way the screen finds out on its own. A
    // manual button asking the reader to tell the app what it could have
    // found out itself is not a real recovery path.
    func watch() async {
        while !Task.isCancelled {
            try? await Task.sleep(for: .seconds(2))
            await refresh()
        }
    }

    // iOS gained both a link to an extension's own settings page and a way to
    // read whether it is on in 26.2. Before that (iOS 18 to 26.1) the app can
    // only open Safari on the demo page, where the page menu's Manage
    // Extensions turns Undirect on, and the screen says so in words.
    static var opensExtensionSettings: Bool {
        #if os(iOS)
        if #available(iOS 26.2, *) { return true }
        return false
        #else
        return true
        #endif
    }

    func openSafariSettings() {
        #if os(macOS)
        SFSafariApplication.showPreferencesForExtension(
            withIdentifier: extensionBundleIdentifier
        ) { _ in }
        #else
        if #available(iOS 26.2, *) {
            // One identifier opens that extension's own page under Safari
            // Extensions.
            SFSafariSettings.openExtensionsSettings(forIdentifiers: [extensionBundleIdentifier]) { _ in }
        } else if let demo = URL(string: "https://undirect.matsuokengo.com/demo/") {
            UIApplication.shared.open(demo)
        }
        #endif
    }

    private static func read() async -> State {
        #if os(macOS)
        return await ask()
        #else
        if #available(iOS 26.2, *) { return await ask() }
        // No way to ask before 26.2; the screen falls back to whether the
        // extension has written to the app yet.
        return .unavailable
        #endif
    }

    // The macOS call covers both extension kinds; iOS only has the
    // web-extension one, and only from 26.2, which is also when the state
    // type itself arrived there.
    @available(iOS 26.2, *)
    private static func ask() async -> State {
        await withCheckedContinuation { continuation in
            let answer: @Sendable (SFSafariExtensionState?, (any Error)?) -> Void = { state, error in
                if let error {
                    continuation.resume(returning: .failed(error.localizedDescription))
                } else {
                    continuation.resume(returning: state?.isEnabled == true ? .on : .off)
                }
            }
            #if os(macOS)
            SFSafariExtensionManager.getStateOfSafariExtension(
                withIdentifier: extensionBundleIdentifier,
                completionHandler: answer
            )
            #else
            SFSafariExtensionManager.getStateOfExtension(
                withIdentifier: extensionBundleIdentifier,
                completionHandler: answer
            )
            #endif
        }
    }
}
