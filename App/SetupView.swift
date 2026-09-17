import SwiftUI

// The extension is off. ContentUnavailableView is the system's own screen for
// nothing-here-yet, and it takes the action button in its own slot.
struct SetupView: View {
    let state: ExtensionStatus.State
    let openSettings: () -> Void

    var body: some View {
        ContentUnavailableView {
            Label(title, systemImage: "cursorarrow.slash")
        } description: {
            Text(detail)
        } actions: {
            Button("Open Safari Settings", action: openSettings)
                .buttonStyle(.borderedProminent)
        }
    }

    private var title: LocalizedStringKey {
        if case .failed = state { return "Undirect may not be on" }
        return "Undirect is not on"
    }

    // A failed check says nothing the reader can act on differently, so it asks
    // for the same thing in plainer words. The reason it gave belongs in the
    // log, not on screen: "SFErrorDomain error 1" is not a sentence.
    private var detail: LocalizedStringKey {
        if case .failed = state {
            return "Safari did not answer. Switching it on there is picked up automatically."
        }
        #if os(macOS)
        return "Safari has not switched it on."
        #else
        return "Settings, then Apps, then Safari, then Extensions."
        #endif
    }
}

#Preview {
    SetupView(state: .off, openSettings: {})
}
