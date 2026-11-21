// The two calculations in content/fx.js that no picture can check: the spring
// easings every move rides on, and the way a pane is cut into shards.
//   bun tests/fx.test.mjs
await import("../Extension/Resources/content/fx.js");
const { spring, fracture } = globalThis.UndirectFX;

// The jitter is random, so each run names its seed and can be replayed with SEED=<n>.
const seed = Number(process.env.SEED ?? Date.now() % 100000);
let state = seed;
const rand = () => ((state = (state * 1664525 + 1013904223) % 4294967296) / 4294967296);
console.log(`seed ${seed}`);

let passed = 0;
let failed = 0;
const ok = (name, pass, detail) => {
  pass ? passed++ : failed++;
  console.log(`${pass ? "ok  " : "FAIL"} ${name}${pass || detail === undefined ? "" : "  " + detail}`);
};

const stops = (s) => s.easing.slice(7, -1).split(",").map(Number);

// A damped spring passes rest once by exp(-pi z / sqrt(1 - z^2)), z = 1 - bounce.
for (const b of [0.15, 0.3, 0.409]) {
  const curve = stops(spring(0.5, b));
  const z = 1 - b;
  const past = Math.exp((-Math.PI * z) / Math.sqrt(1 - z * z));
  ok(`bounce ${b} starts at 0 and lands on 1`, curve[0] === 0 && curve.at(-1) === 1, `${curve[0]} .. ${curve.at(-1)}`);
  ok(`bounce ${b} passes rest by ${past.toFixed(3)}`, Math.abs(Math.max(...curve) - 1 - past) < 0.01, String(Math.max(...curve)));
}

// A spring with no bounce never passes rest and never turns back.
const calm = stops(spring(0.5, 0));
ok("no bounce never passes rest", Math.max(...calm) <= 1, String(Math.max(...calm)));
ok("no bounce only moves forward", calm.every((v, i) => i === 0 || v >= calm[i - 1]));
ok("no bounce is nearly there at its nominal time",
   calm[Math.round((0.5 / (spring(0.5, 0).duration / 1000)) * (calm.length - 1))] > 0.98);
ok("twice the duration takes twice as long", Math.abs(spring(1, 0.3).duration / spring(0.5, 0.3).duration - 2) < 0.01);

// Shards tile the pane: nothing outside it, nothing missing, nothing doubled.
const area = (pts) => Math.abs(pts.reduce((sum, [x, y], i) => {
  const [nx, ny] = pts[(i + 1) % pts.length];
  return sum + x * ny - nx * y;
}, 0)) / 2;

for (const [name, r, x, y] of [
  ["a phone screen pressed mid-page", { left: 0, top: 0, right: 390, bottom: 844 }, 200, 500],
  ["a desk window pressed in a corner", { left: 0, top: 0, right: 1440, bottom: 900 }, 3, 4],
  ["a pane that is not the whole screen", { left: 120, top: 80, right: 900, bottom: 560 }, 400, 300],
  ["a press that was outside the pane", { left: 100, top: 100, right: 500, bottom: 400 }, 900, 900],
]) {
  const shards = fracture(r, x, y, rand);
  const inside = shards.every((s) => s.pts.every(([px, py]) =>
    px >= r.left - 0.01 && px <= r.right + 0.01 && py >= r.top - 0.01 && py <= r.bottom + 0.01));
  const total = shards.reduce((sum, s) => sum + area(s.pts), 0);
  const whole = (r.right - r.left) * (r.bottom - r.top);
  ok(`${name}: every shard is inside the pane`, inside);
  ok(`${name}: the shards add up to the pane`, Math.abs(total / whole - 1) < 0.001, `${total} of ${whole}`);
  ok(`${name}: between 20 and 100 shards`, shards.length >= 20 && shards.length <= 100, String(shards.length));
  ok(`${name}: each shard knows how far it is from the press`, shards.every((s) => s.dist >= 0 && Number.isFinite(s.dist)));
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
