// "The chain stops here": a toppling line of tiles runs into one stone and stops; the tiles past it,
// and the phone at the end of the line, never move. Direction 1 of the iPhone store strip (ASG148).
// One wide picture, 3960x2868, cut into frames 1-3. Lengths are centimetres.
// ?v=red puts the set on the brand-red sweep with the black veined stone of the event art; the default
// is a graphite sweep with a red stone.
// The file also loads in bun (place_phone.mjs), which reads DOM to find where the phone's glass lands.
const G = globalThis;
const V = (G.location ? new URLSearchParams(G.location.search).get("v") : null) || "dark";
const D = G.DOM = {
  s: 3.5,                         // spacing along the line
  tile: [1.0, 7.6, 3.8],          // thickness, height, width
  nFall: 24, nStand: 6,
  stoneAt: [-4, 0], head0: 0.44,  // where the stone sits (x, z) and the heading of the straight run
  stoneGap: 5.4, afterStone: 8.4, phoneGap: 8.0,
  rho: 28,                        // radius of the bend the standing tiles follow
  phone: [0.84, 16.3, 7.8],       // thickness, height, width
  phoneTwist: 0.12,
  cam: { pos: [10, 21, 92], at: [0.4, 8.2, 0], fov: 28, lens: 0.14, focus: 84 },
};
{
  // Walk the line: straight through the fallen tiles and the stone, then a steady bend toward the camera.
  let x = 0, z = 0, h = D.head0;
  const step = (len, bend) => { const n = 40; for (let i = 0; i < n; i++) { if (bend) h += len / n / D.rho; x += Math.cos(h) * len / n; z += Math.sin(h) * len / n; } };
  D.fall = []; D.stand = [];
  for (let i = 0; i < D.nFall; i++) { D.fall.push([x, z, h]); if (i < D.nFall - 1) step(D.s, false); }
  step(D.stoneGap, false); D.stone = [x, z, h];
  step(D.afterStone, false);
  for (let i = 0; i < D.nStand; i++) { D.stand.push([x, z, h]); if (i < D.nStand - 1) step(D.s, true); }
  step(D.phoneGap, true); D.phoneAt = [x, z, h];
  const dx = D.stoneAt[0] - D.stone[0], dz = D.stoneAt[1] - D.stone[1];
  for (const a of [...D.fall, ...D.stand, D.stone, D.phoneAt]) { a[0] += dx; a[1] += dz; }
}
const f = (x) => Number(x).toFixed(4);
const v3 = (a) => `vec3(${a.map(f).join(",")})`;
G.SCENE_EXPO = 1.0;
G.SCENE_GLSL = `
#define NEPS .004
#define STEP .8
#define FAR 700.
#define THICK .1
#define RED ${V === "red" ? 1 : 0}
float gT;
const vec3 TILE = ${v3(D.tile.map((x) => x / 2))};
const vec3 PHONE = ${v3(D.phone.map((x) => x / 2))};
const int NFALL = ${D.nFall}, NSTAND = ${D.nStand};
const vec3 FALL[${D.nFall}] = vec3[](${D.fall.map(v3).join(",")});
const vec3 STAND[${D.nStand}] = vec3[](${D.stand.map(v3).join(",")});
const vec3 STONE = ${v3(D.stone)}, PHAT = ${v3(D.phoneAt)};

Cam camera(){
  Cam c;
  c.pos = ${v3(D.cam.pos)};
  c.at = ${v3(D.cam.at)};
  c.fov = ${f(D.cam.fov)};
  c.lens = ${f(D.cam.lens)};
  c.focus = ${f(D.cam.focus)};
  return c; }
// p in the frame of a piece standing at a.xy (x, z) heading a.z: x along the line, y up, z across it
vec3 toLine(vec3 p, vec3 a){ p.xz -= a.xy; float c = cos(a.z), s = sin(a.z); return vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c); }
// a tile hinged on its leading bottom edge, tipped a radians toward the next one
float tile(vec3 q, float a){
  q.x -= TILE.x; float c = cos(a), s = sin(a);
  q.xy = vec2(q.x * c - q.y * s, q.x * s + q.y * c); q.x += TILE.x;
  return sdBox(q - vec3(0, TILE.y, 0), TILE - .09) - .09; }
float fallA(int i){
  // lying on its neighbour, except the last three, which the stone props up
  int k = NFALL - 1 - i;
  float w = hash21(vec2(float(i), 2.)) - .5;
  if(k == 0) return .80;
  if(k == 1) return 1.00;
  if(k == 2) return 1.13;
  return 1.215 + .012 * w; }
float sdRR(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - r; }
vec3 stoneP(vec3 p){ p = toLine(p, STONE); p -= vec3(1.2, 2.3, .2); p.xz *= rot(.35); return p; }
float stone(vec3 p){
  p = stoneP(p);
  float d = sdEll(p, vec3(5.2, 2.3, 4.2));
  return smin(d, sdEll(p - vec3(1.3, .15, .5), vec3(3.8, 2.05, 3.2)), 1.3); }
vec3 phoneP(vec3 p){ p = toLine(p, PHAT); p.xz *= rot(${f(-D.phoneTwist)}); p.y -= PHONE.y; return p; }
float phone(vec3 p){
  p = phoneP(p);
  float d2 = sdRR(p.zy, PHONE.zy, 1.25);
  vec2 w = vec2(d2, abs(p.x) - PHONE.x + .12);
  return min(max(w.x, w.y), 0.) + length(max(w, 0.)) - .12; }
float sweep(vec3 p){
  vec2 q = vec2(p.y, p.z + 170.); const float r = 90.;
  return (q.x < r && q.y < r) ? r - length(r - q) : min(q.x, q.y); }
float map(vec3 p, out int id){
  float d = sweep(p); id = 0;
  if(p.y < 20.){
    float e = 1e9;
    for(int i = 0; i < NFALL; i++){
      vec3 q = toLine(p, FALL[i]);
      float b = length(q - vec3(3., 3., 0.));
      if(b > 9.) { e = min(e, b - 7.5); continue; }
      q.xz *= rot(.05 * (hash21(vec2(float(i), 5.)) - .5));
      e = min(e, tile(q, fallA(i)));
    }
    for(int i = 0; i < NSTAND; i++){
      vec3 q = toLine(p, STAND[i]);
      float b = length(q - vec3(0., 3.8, 0.));
      if(b > 7.) { e = min(e, b - 5.6); continue; }
      q.xz *= rot(.06 * (hash21(vec2(float(i), 15.)) - .5));
      e = min(e, tile(q, 0.));
    }
    if(e < d){ d = e; id = 1; }
    e = stone(p); if(e < d){ d = e; id = 3; }
    e = phone(p); if(e < d){ d = e; id = 5; }
  }
  return d; }
Mat mat(int id, vec3 p, vec3 n){
  if(id == 0){
#if RED
    return Mat(vec3(.70, .012, .03), .85, .03, 0.);
#else
    return Mat(vec3(.030, .029, .033), .85, .03, 0.);
#endif
  }
  if(id == 3){
    vec3 q = stoneP(p);
    float sp = vnoise(q.xz * 9.) * vnoise(q.xy * 23.);
#if RED
    float vein = smoothstep(.16, .05, abs(q.x * .5 + q.z * .86 - .7 + .35 * vnoise(q.xy * 1.3) - .2 * q.y));
    return Mat(mix(vec3(.014, .014, .017) + .02 * sp, vec3(.62, .6, .57), vein * .9), .2, .05, 0.);
#else
    return Mat(vec3(.62, .012, .02) * (.8 + .5 * sp), .16, .05, 0.);
#endif
  }
  if(id == 5){
    vec3 q = phoneP(p);
    // the glass face is the side that looks down the line, away from the tiles
    if(q.x > PHONE.x - .13 && sdRR(q.zy, PHONE.zy, 1.25) < -.02){
      bool lit = sdRR(q.zy, PHONE.zy - .22, 1.05) < 0.;
      return Mat(lit ? vec3(.0) : vec3(.004), .04, lit ? .045 : .04, 0.);
    }
    return Mat(vec3(.045, .045, .05), .32, .22, 0.);
  }
  vec3 bone = vec3(.86, .84, .80) * (.97 + .05 * vnoise(p.xz * 30. + p.y * 11.));
  return Mat(bone, .42, .045, 0.); }
const int NL = 3;
void lightDef(int i, out vec3 c, out vec3 at, out vec2 hs, out vec3 Le){
  if(i == 0){ c = vec3(-70, 85, 10); at = vec3(0, 4, 0); hs = vec2(34, 26); Le = vec3(30., 28.4, 26.) * 1.15; }
  else if(i == 1){ c = vec3(80, 70, 110); at = vec3(10, 12, -10); hs = vec2(60, 50); Le = vec3(2.5, 2.7, 3.1) * 1.2; }
  else { c = vec3(60, 150, -90); at = vec3(0, 5, 0); hs = vec2(50, 24); Le = vec3(9., 8.6, 8.2); } }
vec3 sky(vec3 d){ return vec3(.03, .026, .028); }
`;
