import Foundation
import SafariServices
import os.log

private let log = Logger(subsystem: "com.matsuokengo.undirect", category: "app")

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

    // Sites switched on from the Undirect button in Safari. The app can only
    // read and remove this list, never add to it: it has no way to know what
    // page is open in Safari right now.
    var watchedSites: [String] {
        (snapshot?.watched ?? [:]).filter(\.value).keys.sorted()
    }

    private var lastSeenWrite: Date?

    func reload() {
        snapshot = sampleIfAsked() ?? SharedStore.read()
        reachedApp = snapshot != nil
        lastSeenWrite = SharedStore.writtenAt()
    }

    // The extension writes the snapshot when a page tries something, which is
    // usually long after this window opened. Reading once at launch left the
    // list empty for the rest of the session.
    func watch() async {
        while !Task.isCancelled {
            try? await Task.sleep(for: .seconds(2))
            let written = SharedStore.writtenAt()
            guard written != lastSeenWrite else { continue }
            reload()
        }
    }

    // Screenshot sample, held in memory: an ad-hoc build cannot always
    // reach the group container. RFC 2606 reserves .example, so no real
    // company is shown as blocked.
    private func sampleIfAsked() -> Snapshot? {
        #if DEBUG
        guard UserDefaults.standard.bool(forKey: "UndirectSeedSample") else { return nil }
        var sample = Snapshot()
        sample.everywhere = [
            "adserver.example": "block",
            "clicktrack.example": "block",
            "maps.example": "allow",
            "popunder.example": "block",
            "redirector.example": "block",
            "tabunder.example": "block",
        ]
        sample.perSite = [
            "news.example": ["checkout.example": "allow", "survey.example": "block"],
            "video.example": ["player.example": "allow"],
        ]
        sample.watched = ["news.example": true, "video.example": true]
        sample.writtenAt = Date().timeIntervalSince1970 * 1000
        return sample
        #else
        return nil
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

    func setMode(_ mode: String) {
        send(["action": "settings", "settings": ["mode": mode]])
    }

    func setEnabled(_ on: Bool) {
        send(["action": "settings", "settings": ["enabled": on]])
    }

    // The app has no tabId, so unlike the popup this never reloads a page -
    // it only takes effect the next time that site loads.
    func stopWatching(_ site: String) {
        send(["action": "watch", "site": site, "on": false])
    }

    private func send(_ payload: [String: Any]) {
        #if os(macOS)
        // Safari accepting the dispatch says nothing about whether the
        // background page - unloaded whenever idle - has read it yet. A single
        // reload after a fixed wait showed stale state whenever that round trip
        // ran long, which read as the toggle having done nothing. Polling for
        // the extension's own writtenAt to move past this moment turns "did it
        // work" from a guess into an answer, however long the round trip takes.
        let before = SharedStore.writtenAt()
        SFSafariApplication.dispatchMessage(
            withName: "undirect",
            toExtensionWithIdentifier: extensionBundleIdentifier,
            userInfo: payload
        ) { error in
            if let error {
                log.error("dispatchMessage failed: \(error, privacy: .public)")
            }
            Task { @MainActor in
                await self.waitForChange(after: before)
            }
        }
        #endif
    }

    // Up to 4 seconds, in short steps: long enough for the background page to
    // wake from being unloaded and write back, short enough that a message
    // that truly never arrives still lets go and shows what did happen.
    private func waitForChange(after: Date?) async {
        for _ in 0..<20 {
            try? await Task.sleep(for: .milliseconds(200))
            let written = SharedStore.writtenAt()
            if written != after {
                reload()
                return
            }
        }
        log.error("no snapshot arrived after a rule change; the extension may not have received it")
        reload()
    }
}
