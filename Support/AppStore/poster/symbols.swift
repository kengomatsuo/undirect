// Renders SF Symbols as black-on-clear PNGs (used as CSS masks), so enlarged tiles carry the same glyphs the app shows.
//   swift assets/symbols.swift assets/sym house.fill envelope.fill ...
import AppKit
let args = CommandLine.arguments
let out = args[1]
for name in args.dropFirst(2) {
  let parts = name.split(separator: ":"); let sym = String(parts[0])
  let weight: NSFont.Weight = parts.count > 1 && parts[1] == "bold" ? .bold : (parts.count > 1 && parts[1] == "semibold" ? .semibold : .regular)
  guard let base = NSImage(systemSymbolName: sym, accessibilityDescription: nil),
        let img = base.withSymbolConfiguration(.init(pointSize: 400, weight: weight)) else { print("missing \(sym)"); continue }
  let s = img.size
  let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(s.width), pixelsHigh: Int(s.height), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
  img.draw(in: NSRect(origin: .zero, size: s))
  NSColor.black.set(); NSRect(origin: .zero, size: s).fill(using: .sourceIn)
  NSGraphicsContext.restoreGraphicsState()
  try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "\(out)/\(sym).png"))
  print(sym, Int(s.width), Int(s.height))
}
