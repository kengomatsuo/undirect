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
    var everywhere: [String: String] = [:]
    var perSite: [String: [String: String]] = [:]
    var counts = Counts()
    var writtenAt: Double = 0
}

enum SharedStore {
    #if os(macOS)
    static let appGroup = "5MPWBL8F42.undirect"
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
        guard let url = fileURL, let data = try? JSONEncoder().encode(snapshot) else {
            return false
        }
        return (try? data.write(to: url, options: .atomic)) != nil
    }
}
