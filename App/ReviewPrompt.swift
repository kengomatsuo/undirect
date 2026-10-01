import StoreKit
import SwiftUI

// Apple's own review request, asked for once per app version after the
// extension has stopped something. The system decides whether a sheet
// appears at all (three a year, none for someone who already reviewed).
// Full account: docs/review-prompt.md.
private struct ReviewPrompt: ViewModifier {
    // True while the rules list is on screen with nothing laid over it.
    let ready: Bool

    @Environment(\.requestReview) private var requestReview
    @Environment(\.scenePhase) private var scenePhase

    private static let key = "reviewRequestedVersion"

    func body(content: Content) -> some View {
        content.task(id: ready && scenePhase == .active) {
            guard ready, scenePhase == .active, !Self.alreadyAsked else { return }
            // A pause, so the request never lands on the launch animation or
            // on a tap. The task is cancelled if the screen changes first.
            try? await Task.sleep(for: .seconds(4))
            guard !Task.isCancelled else { return }
            UserDefaults.standard.set(Self.version, forKey: Self.key)
            requestReview()
        }
    }

    private static var version: String {
        Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? ""
    }

    private static var alreadyAsked: Bool {
        UserDefaults.standard.string(forKey: key) == version
    }
}

extension View {
    func reviewPrompt(when ready: Bool) -> some View {
        modifier(ReviewPrompt(ready: ready))
    }
}

extension RulesModel {
    // The extension has stopped something at least once. Debug builds can
    // skip that with -UndirectReviewNow, to see the system sheet.
    var hasBlockedSomething: Bool {
        LaunchFlags.reviewNow || (snapshot?.counts.lifetime ?? 0) > 0
    }
}
