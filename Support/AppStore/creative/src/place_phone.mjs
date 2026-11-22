// Prints where pieces of the domino scene land in the picture, with pt.html's own camera maths:
// the four corners of the phone's lit glass (for laying the real screen capture on it) and the stone.
//   bun place_phone.mjs [width height]
await import("./scene-dominoes.glsl.js");
const D = globalThis.DOM, [W, H] = [+(process.argv[2] || 3960), +(process.argv[3] || 2868)];
const sub = (a, b) => a.map((v, i) => v - b[i]), dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => { const l = Math.hypot(...a); return a.map((v) => v / l); };
const f = norm(sub(D.cam.at, D.cam.pos)), r = norm(cross(f, [0, 1, 0])), u = cross(r, f);
const k = 2 * Math.tan((D.cam.fov * Math.PI) / 360);
export const project = (p) => { const d = sub(p, D.cam.pos), z = dot(d, f); return [W / 2 + (dot(d, r) / z / k) * H, H / 2 - (dot(d, u) / z / k) * H]; };
// a point given in a piece's own frame (x along the line, y up, z across) to the world
const fromLine = (a, twist, q) => {
  const c0 = Math.cos(twist), s0 = Math.sin(twist);              // undo p.xz *= rot(-twist)
  const x1 = q[0] * c0 + q[2] * s0, z1 = -q[0] * s0 + q[2] * c0;
  const c = Math.cos(a[2]), s = Math.sin(a[2]);
  return [a[0] + x1 * c - z1 * s, q[1], a[1] + x1 * s + z1 * c];
};
const [t, h, w] = D.phone, m = 0.22;                              // the lit glass sits 0.22 cm inside the edge
const glass = [[w / 2 - m, h - m], [-(w / 2 - m), h - m], [-(w / 2 - m), m], [w / 2 - m, m]].map(([z, y]) => project(fromLine(D.phoneAt, -D.phoneTwist, [t / 2, y, z])));
const out = { size: [W, H], glass, stone: project([D.stone[0], 2.3, D.stone[1]]), phoneAt: D.phoneAt, glassRadiusCm: 1.05, glassWidthCm: w - 2 * m };
if (import.meta.main) console.log(JSON.stringify(out));
