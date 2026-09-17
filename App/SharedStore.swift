import Foundation
import os.log

private let log = Logger(subsystem: "com.matsuokengo.undirect", category: "store")

// What the extension knows, written where the app can read it. A file in the
// group container rather than UserDefaults, which keeps this off the
// required-reason API list and out of the privacy manifest.
struct Snapshot: Codable, Sendable, Equatable {
    struct Counts: Codable, Sendable, Equatable {
        var session = 0
        var lifetime = 0
    }

    var policy: String = "block"
    var enabled: Bool = true
    var mode: String = "watched"
    var banner: Bool = false
    var everywhere: [String: String] = [:]
    var perSite: [String: [String: String]] = [:]
    var watched: [String: Bool] = [:]
    var counts = Counts()
    var writtenAt: Double = 0

    init() {}

    // Swift's synthesized init(from:) ignores a property's default value: a
    // key missing from the JSON throws instead of falling back. Written out
    // so a snapshot written by an older extension still decodes, rather than
    // the whole app reading it as "extension not reached" for a field it
    // never asked about.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        policy = try c.decodeIfPresent(String.self, forKey: .policy) ?? "block"
        enabled = try c.decodeIfPresent(Bool.self, forKey: .enabled) ?? true
        mode = try c.decodeIfPresent(String.self, forKey: .mode) ?? "watched"
        banner = try c.decodeIfPresent(Bool.self, forKey: .banner) ?? false
        everywhere = try c.decodeIfPresent([String: String].self, forKey: .everywhere) ?? [:]
        perSite = try c.decodeIfPresent([String: [String: String]].self, forKey: .perSite) ?? [:]
        watched = try c.decodeIfPresent([String: Bool].self, forKey: .watched) ?? [:]
        counts = try c.decodeIfPresent(Counts.self, forKey: .counts) ?? Counts()
        writtenAt = try c.decodeIfPresent(Double.self, forKey: .writtenAt) ?? 0
    }
}

enum SharedStore {
    #if os(macOS)
    static let appGroup = "PM3K35YS39.undirect"
    #else
    static let appGroup = "group.com.matsuokengo.undirect"
    #endif

    static var fileURL: URL? {
        FileManager.default
            .containerURL(forSecurityApplicationGroupIdentifier: appGroup)?
            .appendingPathComponent("snapshot.json")
    }

    static func read() -> Snapshot? {
        guard let url = fileURL else {
            log.error("no group container for \(appGroup, privacy: .public)")
            return nil
        }
        do {
            let data = try Data(contentsOf: url)
            return try JSONDecoder().decode(Snapshot.self, from: data)
        } catch {
            log.error("snapshot unreadable at \(url.path, privacy: .public): \(error, privacy: .public)")
            return nil
        }
    }

    @discardableResult
    static func write(_ snapshot: Snapshot) -> Bool {
        guard let url = fileURL else {
            log.error("no group container for \(appGroup, privacy: .public)")
            return false
        }
        do {
            try JSONEncoder().encode(snapshot).write(to: url, options: .atomic)
            return true
        } catch {
            log.error("snapshot not written to \(url.path, privacy: .public): \(error, privacy: .public)")
            return false
        }
    }

    // When the extension last wrote. The app watches this: a snapshot that
    // arrives after launch is the normal case, since the extension only has
    // something to say once a page has tried something.
    static func writtenAt() -> Date? {
        guard let url = fileURL else { return nil }
        return try? FileManager.default
            .attributesOfItem(atPath: url.path)[.modificationDate] as? Date
    }
}
