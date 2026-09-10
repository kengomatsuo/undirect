import SwiftUI
#if os(iOS)
import UIKit
#endif

// Shown until Safari says the extension is on. The HIG asks onboarding to stay
// on what the app does, so this says what happens next and offers the shortest
// way there. It does not teach anyone how to use Safari.
struct SetupView: View {
    let state: ExtensionStatus.State
    let openSettings: () -> Void
    let recheck: () -> Void

    var body: some View {
        VStack(spacing: 24) {
            Spacer(minLength: 0)

            Image(systemName: "cursorarrow.slash")
                .font(.system(size: 64, weight: .light))
                .foregroundStyle(.tint)
                .accessibilityHidden(true)

            VStack(spacing: 8) {
                Text(headline)
                    .font(.title2.weight(.semibold))
                Text(subhead)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }

            actions

            Spacer(minLength: 0)
        }
        .padding(32)
        .frame(maxWidth: 380)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var headline: LocalizedStringKey {
        if case .failed = state { return "Safari did not answer" }
        return "Undirect is not on yet"
    }

    private var subhead: LocalizedStringKey {
        if case .failed(let reason) = state { return "\(reason)" }
        #if os(macOS)
        return "Switch it on once and it guards every page after that."
        #else
        return "Switch it on in Settings, under Apps, Safari, Extensions. It guards every page after that."
        #endif
    }

    @ViewBuilder
    private var actions: some View {
        VStack(spacing: 10) {
            #if os(macOS)
            Button("Open Safari Extension Settings", action: openSettings)
                .buttonStyle(.borderedProminent)
            #else
            if let url = URL(string: UIApplication.openSettingsURLString) {
                Link("Open Settings", destination: url)
                    .buttonStyle(.borderedProminent)
            }
            #endif
            Button("Check Again", action: recheck)
                .buttonStyle(.borderless)
        }
    }
}

#Preview {
    SetupView(state: .off, openSettings: {}, recheck: {})
}
