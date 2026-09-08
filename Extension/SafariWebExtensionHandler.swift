import SafariServices
import os.log

private let log = Logger(subsystem: "com.matsuokengo.undirect", category: "extension")

// The extension's JavaScript sends its state here, and this writes it into the
// group container so the app can show it. Nothing else crosses.
final class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    func beginRequest(with context: NSExtensionContext) {
        let item = context.inputItems.first as? NSExtensionItem
        let message = item?.userInfo?[SFExtensionMessageKey] as? [String: Any]

        var ok = false
        if let payload = message?["snapshot"] as? [String: Any] {
            ok = store(payload)
        }

        let response = NSExtensionItem()
        response.userInfo = [SFExtensionMessageKey: ["stored": ok]]
        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

    private func store(_ payload: [String: Any]) -> Bool {
        guard
            let data = try? JSONSerialization.data(withJSONObject: payload),
            let snapshot = try? JSONDecoder().decode(Snapshot.self, from: data)
        else {
            log.error("snapshot from the extension did not decode")
            return false
        }
        let written = SharedStore.write(snapshot)
        if !written { log.error("could not write the snapshot to the group container") }
        return written
    }
}
