// recaption <in.png> <out.png> <bandHeight> <fontSize> <left|center> <title>
// Repaints rows 0..<bandHeight with each row's own edge colour (keeps a vertical
// gradient), then sets the title in heavy system type inside that band.
import AppKit
import CoreText

let a = CommandLine.arguments
let src = NSImage(contentsOfFile: a[1])!.cgImage(forProposedRect: nil, context: nil, hints: nil)!
let band = Int(a[3])!, size = CGFloat(Double(a[4])!), centered = a[5] == "center", title = a[6]
let w = src.width, h = src.height
let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                    space: CGColorSpace(name: CGColorSpace.sRGB)!,
                    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.draw(src, in: CGRect(x: 0, y: 0, width: w, height: h))
let px = ctx.data!.bindMemory(to: UInt8.self, capacity: w * h * 4)
for row in 0..<band {            // row 0 is the top of the picture
    let base = row * w * 4, sample = base + 6 * 4
    for x in 0..<w { for c in 0..<4 { px[base + x * 4 + c] = px[sample + c] } }
}
let font = NSFont.systemFont(ofSize: size, weight: .heavy)
let para = NSMutableParagraphStyle()
para.alignment = centered ? .center : .left
para.lineHeightMultiple = 0.92
let str = NSAttributedString(string: title, attributes: [.font: font, .foregroundColor: NSColor.white, .paragraphStyle: para])
let inset = CGFloat(w) * 0.075
let setter = CTFramesetterCreateWithAttributedString(str)
let fit = CTFramesetterSuggestFrameSizeWithConstraints(setter, CFRange(), nil, CGSize(width: CGFloat(w) - 2 * inset, height: .greatestFiniteMagnitude), nil)
let top = (CGFloat(band) - fit.height) / 2           // centred in the band, measured from the top
let rect = CGRect(x: inset, y: CGFloat(h) - top - fit.height, width: CGFloat(w) - 2 * inset, height: fit.height + 4)
CTFrameDraw(CTFramesetterCreateFrame(setter, CFRange(), CGPath(rect: rect, transform: nil), nil), ctx)
let out = NSBitmapImageRep(cgImage: ctx.makeImage()!)
try! out.representation(using: .jpeg, properties: [.compressionFactor: 0.82])!.write(to: URL(fileURLWithPath: a[2]))
