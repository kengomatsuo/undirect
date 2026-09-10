import SwiftUI

// The extension is off. ContentUnavailableView is the system's own screen for
// nothing-here-yet, and it takes the action button in its own slot.
struct SetupView: View {
    let state: ExtensionStatus.State
    let openSettings: () -> Void
    let recheck: () -> Void

    var body: some View {
        ContentUnavailableView {
            Label(title, systemImage: "cursorarrow.slash")
        } description: {
            Text(detail)
        } actions: {
            Button("Open Safari Settings", action: openSettings)
                .buttonStyle(.borderedProminent)
            Button("Check Again", action: recheck)
        }
    }

    private var title: LocalizedStringKey {
        if case .failed = state { return "Safari did not answer" }
        return "Undirect is not on"
    }

    private var detail: LocalizedStringKey {
        if case .failed(let reason) = state { return "\(reason)" }
        #if os(macOS)
        return "Safari has not switched it on."
        #else
        return "Settings, then Apps, then Safari, then Extensions."
        #endif
    }
}

#Preview {
    SetupView(state: .off, openSettings: {}, recheck: {})
}
