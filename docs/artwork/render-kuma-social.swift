import AppKit
import CoreText
let base = CommandLine.arguments[1]
let out = CommandLine.arguments[2]
var fonts: [Int: String] = [:]
for weight in [400, 500, 600, 700] {
 let url = URL(fileURLWithPath: base + "/assets/fonts/RefugeSlab\(weight).ttf")
 CTFontManagerRegisterFontsForURL(url as CFURL, .process, nil)
 let desc = (CTFontManagerCreateFontDescriptorsFromURL(url as CFURL) as! [CTFontDescriptor])[0]
 fonts[weight] = CTFontDescriptorCopyAttribute(desc, kCTFontNameAttribute) as? String
}
func color(_ hex: Int) -> NSColor { NSColor(srgbRed: CGFloat((hex >> 16) & 255)/255, green: CGFloat((hex >> 8) & 255)/255, blue: CGFloat(hex & 255)/255, alpha: 1) }
let paper = color(0xf8f4e9), ink = color(0x34372d), gold = color(0xffda5b)
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 1200, pixelsHigh: 630, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
let ctx = NSGraphicsContext.current!.cgContext
ctx.translateBy(x: 0, y: 630); ctx.scaleBy(x: 1, y: -1)
func rect(_ x: CGFloat,_ y: CGFloat,_ w: CGFloat,_ h: CGFloat,_ c: NSColor) { c.setFill(); NSBezierPath(rect: NSRect(x:x,y:y,width:w,height:h)).fill() }
func text(_ value: String,_ x: CGFloat,_ y: CGFloat,_ size: CGFloat,_ weight: Int = 500,_ c: NSColor = ink) {
 let s = NSAttributedString(string: value, attributes: [.font: NSFont(name: fonts[weight]!, size: size)!, .foregroundColor: c, .kern: -size * 0.035])
 NSGraphicsContext.saveGraphicsState()
 ctx.translateBy(x:x,y:y); ctx.scaleBy(x:1,y:-1)
 s.draw(at:NSPoint(x:0,y: -s.size().height))
 NSGraphicsContext.restoreGraphicsState()
}
rect(0,0,1200,630,paper)
text("Kuma",56,33,62,700)
color(0xecb522).setFill(); NSBezierPath(ovalIn:NSRect(x:222,y:80,width:12,height:12)).fill()
text("A quiet companion for meditation",58,124,22,400,color(0x646255))
text("A little room",54,213,76)
text("for",54,299,76)
rect(173,367,355,13,gold)
text("being here.",174,299,76)
text("Your practice. Your pace.",58,421,26,400,color(0x646255))
// Reuse the website hero's arched framing and unchanged approved source artwork.
NSGraphicsContext.saveGraphicsState()
let art=NSImage(contentsOfFile:base + "/assets/kuma/kuma-recessed-arch.png")!
ctx.translateBy(x:654,y:531); ctx.scaleBy(x:1,y:-1)
art.draw(in:NSRect(x:0,y:0,width:490,height:490),from:.zero,operation:.sourceOver,fraction:1)
NSGraphicsContext.restoreGraphicsState()
rect(56,563,1088,1,color(0xd9cfbb))
text("Meditation timer for iPhone",58,585,20,400,color(0x646255))
text("kumatimer.com",963,583,22,500)
NSGraphicsContext.restoreGraphicsState()
try bitmap.representation(using:.jpeg,properties:[.compressionFactor:0.92])!.write(to: URL(fileURLWithPath:out))
