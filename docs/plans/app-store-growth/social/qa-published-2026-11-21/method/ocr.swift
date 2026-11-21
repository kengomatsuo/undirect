import Foundation
import Vision
import AppKit
// usage: ocr <out.json> <img>...   boxes in top-left origin pixels of the image
let args = CommandLine.arguments
let outPath = args[1]
var results: [[String: Any]] = []
for p in args.dropFirst(2) {
    guard let img = NSImage(contentsOfFile: p), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
    let W = Double(cg.width), H = Double(cg.height)
    let req = VNRecognizeTextRequest()
    req.recognitionLevel = .accurate
    req.recognitionLanguages = (ProcessInfo.processInfo.environment["LANGS"] ?? "en-US,id-ID,ja-JP").split(separator: ",").map(String.init)
    req.usesLanguageCorrection = false
    try? VNImageRequestHandler(cgImage: cg).perform([req])
    var boxes: [[String: Any]] = []
    for o in req.results ?? [] {
        guard let c = o.topCandidates(1).first else { continue }
        let b = o.boundingBox
        boxes.append(["t": c.string, "c": c.confidence, "x": b.minX * W, "y": (1 - b.maxY) * H, "w": b.width * W, "h": b.height * H])
    }
    results.append(["f": (p as NSString).lastPathComponent, "W": W, "H": H, "boxes": boxes])
}
let d = try JSONSerialization.data(withJSONObject: results)
try d.write(to: URL(fileURLWithPath: outPath))
