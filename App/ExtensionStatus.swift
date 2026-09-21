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

    func openSafariSettings() {
        #if os(macOS)
        SFSafariApplication.showPreferencesForExtension(
            withIdentifier: extensionBundleIdentifier
        ) { _ in }
        #else
        // One identifier opens that extension's own page under Safari
        // Extensions. It arrived in iOS 26.2, which is also the first version
        // that will say whether the extension is on, so the app asks for both.
        SFSafariSettings.openExtensionsSettings(forIdentifiers: [extensionBundleIdentifier]) { _ in }
        #endif
    }

    private static func read() async -> State {
        await withCheckedContinuation { continuation in
            let answer: @Sendable (SFSafariExtensionState?, (any Error)?) -> Void = { state, error in
                if let error {
                    continuation.resume(returning: .failed(error.localizedDescription))
                } else {
                    continuation.resume(returning: state?.isEnabled == true ? .on : .off)
                }
            }
            // The macOS call covers both extension kinds; iOS only has the
            // web-extension one.
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
