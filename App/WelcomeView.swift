import SwiftUI

// First launch. Says what the app does, then hands straight to switching it on.
struct WelcomeView: View {
    let start: () -> Void

    private struct Feature: Identifiable {
        let symbol: String
        let title: LocalizedStringKey
        let detail: LocalizedStringKey
        var id: String { symbol }
    }

    private let features: [Feature] = [
        Feature(
            symbol: "rectangle.on.rectangle.slash",
            title: "Invisible layers",
            detail: "A page can cover itself to catch a press meant for something else."
        ),
        Feature(
            symbol: "link",
            title: "Swapped links",
            detail: "Some pages rewrite a link between the press and the release."
        ),
        Feature(
            symbol: "macwindow",
            title: "Uninvited windows",
            detail: "A window opens only when the site's own code asks for it."
        ),
        Feature(
            symbol: "checklist",
            title: "Every destination",
            detail: "Each one is listed, to allow or block per site or everywhere."
        ),
    ]

    var body: some View {
        VStack(spacing: 0) {
            ScrollView {
                VStack(alignment: .leading, spacing: 32) {
                    Text("Welcome to Undirect")
                        .font(.largeTitle.weight(.bold))
                        .padding(.top, 44)

                    VStack(alignment: .leading, spacing: 26) {
                        ForEach(features) { feature in
                            row(feature)
                        }
                    }
                }
                .padding(.horizontal, 34)
                .padding(.bottom, 24)
                .frame(maxWidth: .infinity, alignment: .leading)
            }

            Button(action: start) {
                Text("Open Safari Settings")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)
            .padding(.horizontal, 34)
            .padding(.bottom, 28)
            .padding(.top, 12)
        }
    }

    private func row(_ feature: Feature) -> some View {
        HStack(alignment: .top, spacing: 18) {
            Image(systemName: feature.symbol)
                .font(.system(size: 28))
                .foregroundStyle(.tint)
                .frame(width: 38, alignment: .center)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 3) {
                Text(feature.title)
                    .font(.headline)
                Text(feature.detail)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
    }
}

#Preview {
    WelcomeView(start: {})
}
