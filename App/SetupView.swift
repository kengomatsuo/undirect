import SwiftUI
#if os(iOS)
import UIKit
#endif

// Shown until Safari says the extension is on. One screen, one job.
struct SetupView: View {
    let state: ExtensionStatus.State
    let openSettings: () -> Void
    let recheck: () -> Void

    private struct Step: Identifiable {
        let symbol: String
        let text: LocalizedStringKey
        var id: String { symbol }
    }

    var body: some View {
        VStack(spacing: 28) {
            Spacer(minLength: 0)

            Image(systemName: "cursorarrow.slash")
                .font(.system(size: 72, weight: .light))
                .foregroundStyle(.tint)
                .accessibilityHidden(true)

            VStack(spacing: 8) {
                Text(headline)
                    .font(.title2.weight(.semibold))
                Text(subhead)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }

            VStack(alignment: .leading, spacing: 16) {
                ForEach(steps) { step in
                    Label(step.text, systemImage: step.symbol)
                        .labelStyle(StepLabelStyle())
                }
            }

            actions

            Spacer(minLength: 0)
        }
        .padding(32)
        .frame(maxWidth: 400)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var headline: LocalizedStringKey {
        if case .failed = state { return "Safari did not answer" }
        return "Undirect is not on yet"
    }

    private var subhead: LocalizedStringKey {
        if case .failed(let reason) = state { return "\(reason)" }
        return "Turn it on once and it works on every page after that."
    }

    private var steps: [Step] {
        #if os(macOS)
        [
            Step(symbol: "safari", text: "Open Safari Settings, then Extensions."),
            Step(symbol: "checkmark.square", text: "Tick Undirect."),
            Step(symbol: "globe", text: "Allow it on every website."),
        ]
        #else
        [
            Step(symbol: "gearshape", text: "Open Settings, then Apps, then Safari."),
            Step(symbol: "puzzlepiece.extension", text: "Tap Extensions."),
            Step(symbol: "switch.2", text: "Turn on Undirect and allow every website."),
        ]
        #endif
    }

    @ViewBuilder
    private var actions: some View {
        #if os(macOS)
        HStack(spacing: 12) {
            Button("Open Safari Settings", action: openSettings)
                .buttonStyle(.borderedProminent)
            Button("Check Again", action: recheck)
        }
        #else
        VStack(spacing: 12) {
            if let url = URL(string: UIApplication.openSettingsURLString) {
                Link("Open Settings", destination: url)
                    .buttonStyle(.borderedProminent)
            }
            Button("Check Again", action: recheck)
        }
        #endif
    }
}

// Icon and label on one baseline, with the icons in a column of their own.
private struct StepLabelStyle: LabelStyle {
    func makeBody(configuration: Configuration) -> some View {
        HStack(alignment: .firstTextBaseline, spacing: 14) {
            configuration.icon
                .font(.body)
                .foregroundStyle(.tint)
                .frame(width: 22, alignment: .center)
            configuration.title
        }
    }
}

#Preview {
    SetupView(state: .off, openSettings: {}, recheck: {})
}
