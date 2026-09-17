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
        #if os(macOS)
        state = await Self.read()
        #else
        if #available(iOS 26.2, *) {
            state = await Self.read()
        } else {
            state = .unavailable
        }
        #endif
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
        // iOS has no link to the Extensions pane, so this lands in Settings.
        if let url = URL(string: UIApplication.openSettingsURLString) {
            UIApplication.shared.open(url)
        }
        #endif
    }

    @available(macOS 10.12, iOS 26.2, *)
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
