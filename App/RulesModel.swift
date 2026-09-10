import Foundation
import SafariServices

struct Rule: Identifiable, Sendable, Equatable {
    var base: String
    var verdict: String
    var site: String? // nil means the rule applies everywhere

    var id: String { "\(site ?? "*")|\(base)" }
    var blocked: Bool { verdict == "block" }
}

@MainActor
@Observable
final class RulesModel {
    private(set) var snapshot: Snapshot?
    private(set) var reachedApp = false

    var everywhere: [Rule] {
        (snapshot?.everywhere ?? [:])
            .map { Rule(base: $0.key, verdict: $0.value, site: nil) }
            .sorted { $0.base < $1.base }
    }

    var bySite: [Rule] {
        (snapshot?.perSite ?? [:])
            .flatMap { site, rules in
                rules.map { Rule(base: $0.key, verdict: $0.value, site: site) }
            }
            .sorted { ($0.site ?? "", $0.base) < ($1.site ?? "", $1.base) }
    }

    var isEmpty: Bool { everywhere.isEmpty && bySite.isEmpty }

    func reload() {
        seedSampleIfAsked()
        snapshot = SharedStore.read()
        reachedApp = snapshot != nil
    }

    // The sandbox refuses a file an unsandboxed process wrote into the group
    // container, so a sample for screenshots has to be written by the app.
    private func seedSampleIfAsked() {
        #if DEBUG
        guard UserDefaults.standard.bool(forKey: "UndirectSeedSample") else { return }
        var sample = Snapshot()
        sample.everywhere = [
            "buildsstate.com": "block",
            "d2pf0ys5xus6n.cloudfront.net": "block",
            "propellerads.com": "block",
        ]
        sample.perSite = ["gogoanime.by": ["checkout.stripe.com": "allow"]]
        sample.counts = Snapshot.Counts(session: 12, lifetime: 340)
        sample.writtenAt = Date().timeIntervalSince1970 * 1000
        SharedStore.write(sample)
        #endif
    }

    // Only macOS can send to the extension. On iOS this list is a mirror.
    var canEdit: Bool {
        #if os(macOS)
        return true
        #else
        return false
        #endif
    }

    // An empty verdict clears the rule; JavaScript reads "" as no rule.
    func set(_ rule: Rule, to verdict: String?) {
        send([
            "action": "rule",
            "base": rule.base,
            "verdict": verdict ?? "",
            "scope": rule.site == nil ? "everywhere" : "here",
            "site": rule.site ?? "",
        ])
    }

    func setPolicy(_ policy: String) {
        send(["action": "settings", "settings": ["policy": policy]])
    }

    func setBanner(_ on: Bool) {
        send(["action": "settings", "settings": ["banner": on]])
    }

    private func send(_ payload: [String: Any]) {
        #if os(macOS)
        SFSafariApplication.dispatchMessage(
            withName: "undirect",
            toExtensionWithIdentifier: extensionBundleIdentifier,
            userInfo: payload
        ) { _ in
            Task { @MainActor in
                try? await Task.sleep(for: .milliseconds(600))
                self.reload()
            }
        }
        #endif
    }
}
