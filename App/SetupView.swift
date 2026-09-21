import SwiftUI

// The extension is off. ContentUnavailableView is the system's own screen for
// nothing-here-yet; the button sits in the bottom safe area, full width.
struct SetupView: View {
    let state: ExtensionStatus.State
    let openSettings: () -> Void

    var body: some View {
        ContentUnavailableView {
            Label(title, systemImage: "cursorarrow.slash")
        } description: {
            Text(detail)
        }
        .safeAreaInset(edge: .bottom) {
            OpenExtensionsButton(action: openSettings)
                .padding(.horizontal, 24)
                .padding(.bottom, 12)
        }
    }

    private var title: LocalizedStringKey {
        if case .failed = state { return "Undirect may not be on" }
        return "Turn on Undirect in Safari"
    }

    // A failed check says nothing the reader can act on differently, so it asks
    // for the same thing in plainer words. The reason it gave belongs in the
    // log, not on screen: "SFErrorDomain error 1" is not a sentence.
    private var detail: LocalizedStringKey {
        if case .failed = state {
            return "Safari did not answer. Switching it on there is picked up automatically."
        }
        return "Guarded sites no longer steal your clicks."
    }
}

// The one way into Safari's extension settings, shared by the welcome sheet
// and the setup screen so their label and style cannot drift apart.
struct OpenExtensionsButton: View {
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text("Open Safari Extensions")
                .frame(maxWidth: 420)
        }
        .modifier(ProminentGlass())
    }
}

private struct ProminentGlass: ViewModifier {
    func body(content: Content) -> some View {
        if #available(iOS 26.0, macOS 26.0, *) {
            content.buttonStyle(.glassProminent).controlSize(.extraLarge)
        } else {
            content.buttonStyle(.borderedProminent).controlSize(.large)
        }
    }
}

#Preview {
    SetupView(state: .off, openSettings: {})
}
