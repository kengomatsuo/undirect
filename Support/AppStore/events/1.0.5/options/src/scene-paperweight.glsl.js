// "Paperweight": a river stone keeps a stack of pages where it is while the wind takes every loose sheet.
// Lengths are centimetres. The stack is 19 x 13.5, the stone about nine across.
window.SCENE_EXPO = 1.0;
window.SCENE_GLSL = `
#define NEPS .006
#define STEP .7
#define FAR 700.
#define THICK .1
float gT;
const vec2 HS = vec2(9.5, 6.75);   // half a sheet
const float SH = 1.6;              // height of the stack
const float YAW = .36;             // the stack is turned a little from the camera

Cam camera(){
  Cam c;
  c.pos = mix(vec3(-8, 21, 78), vec3(-6, 22, 96), TALL);
  c.at = mix(vec3(7.6, -.3, 0), vec3(2, 2.6, 0), TALL);
  c.fov = mix(22., 34., TALL);
  c.lens = .5;
  c.focus = dot(vec3(-2, 3, 2) - c.pos, normalize(c.at - c.pos));
  return c; }
// Camera space to world: s.xy is a place in the frame (-1 to 1, y up), s.z how far from the lens.
vec3 camDir(vec3 d){ Cam c = camera(); vec3 f = normalize(c.at - c.pos), r = normalize(cross(f, vec3(0, 1, 0))), u = cross(r, f); return d.x * r + d.y * u - d.z * f; }
vec3 scr(vec3 s){ Cam c = camera(); float t = tan(radians(c.fov) * .5); return c.pos + s.z * camDir(vec3(s.x * t * R.x / R.y, s.y * t, -1.)); }

// Flat-sheet coordinates of a point near a sheet that curls upward past x0 with curvature k (an isometry).
vec3 bendUp(vec3 p, float x0, float k){
  vec2 q = vec2(p.x - x0, p.y);
  if(k < 1e-4 || q.x <= 0.) return p;
  float Rr = 1. / k, th = atan(q.x, Rr - q.y), r = length(vec2(q.x, Rr - q.y));
  return vec3(x0 + Rr * th, Rr - r, p.z); }
float stack(vec3 p){
  // each half-millimetre layer sits a hair off the one below, as a stack squared up by hand does
  float l = floor(p.y / .05), d = 1e9;
  p.xz += (vec2(vnoise(vec2(l * .9, 3.)), vnoise(vec2(7., l * .9))) - .5) * .16;
  for(int i = 0; i < 5; i++){
    float f = float(i); vec3 q = p; q.xz *= rot(.014 * sin(f * 2.4 + .5));
    d = min(d, sdBox(q - vec3(.08 * sin(f * 1.7), .16 + .32 * f, .06 * cos(f * 2.9)), vec3(HS.x, .16, HS.y)));
  }
  return d - .012; }
float lifted(vec3 p, float y, float x0, float k, float tw, float yaw){
  p.y -= y; p.xz *= rot(yaw);
  float kk = k * (1. + tw * p.z / HS.y) * (1. + .1 * (gT - .5));
  vec3 q = bendUp(p, x0, max(kk, 0.));
  return sdBox(q, vec3(HS.x, .03, HS.y)) - .012; }
vec3 stoneP(vec3 p){ p -= vec3(-3.0, SH + .34 + 1.62, .3); p.xz *= rot(.5); return p; }
float stone(vec3 p){
  p = stoneP(p);
  float d = sdEll(p, vec3(4.7, 1.7, 3.5));
  return smin(d, sdEll(p - vec3(1.3, .12, .5), vec3(3.3, 1.5, 2.7)), 1.3); }
// A loose sheet: at s in the frame, facing n, its long side along a (both in camera space), curled with
// curvature k, moving along v while the shutter is open.
float flying(vec3 p, vec3 s, vec3 n, vec3 a, float k, vec3 v){
  p -= scr(s) + camDir(v) * (gT - .5);
  float bd = length(p) - 14.; if(bd > 3.) return bd;
  n = normalize(camDir(n)); a = camDir(a); a = normalize(a - n * dot(a, n)); vec3 b = cross(n, a);
  vec3 q = vec3(dot(p, a), dot(p, n), dot(p, b));
  q.y += k * 14.;                       // keep the curl centred
  q = bendUp(q, -HS.x, k);
  return sdBox(q, vec3(HS.x, .03, HS.y)) - .012; }
float sweep(vec3 p){
  vec2 q = vec2(p.y, p.z + 150.); const float r = 80.;
  return (q.x < r && q.y < r) ? r - length(r - q) : min(q.x, q.y); }
float map(vec3 p, out int id){
  float d = sweep(p); id = 0;
  vec3 s = p; s.xz *= rot(YAW);
  float b = length(s - vec3(3, 4, 0)) - 22.;
  if(b < d){
    float e = stack(s); if(e < d){ d = e; id = 2; }
    e = lifted(s, SH + .06, 2.4, .035, .5, .012);
    e = min(e, lifted(s, SH + .15, 2.8, .08, -.3, -.02));
    e = min(e, lifted(s, SH + .24, 3.1, .15, .45, .03));
    if(e < d){ d = e; id = 1; }
    e = stone(s); if(e < d){ d = e; id = 3; }
  }
  // the loose sheets, each further along the wind than the last
  float e = flying(p, mix(vec3(.41, .47, 100), vec3(.44, .29, 112), TALL), vec3(-.3, .5, .8), vec3(.85, .5, 0), .12, vec3(.08, .06, 0));
  e = min(e, flying(p, mix(vec3(.60, .64, 140), vec3(-.14, .50, 158), TALL), vec3(.35, .15, .9), vec3(.5, -.85, 0), .08, vec3(.14, .1, 0)));
  e = min(e, flying(p, mix(vec3(.80, .78, 185), vec3(.40, .68, 200), TALL), vec3(-.5, .6, .6), vec3(.9, .2, .3), .09, vec3(.2, .15, 0)));
  e = min(e, flying(p, mix(vec3(.93, .87, 225), vec3(-.02, .82, 240), TALL), vec3(.1, -.4, .9), vec3(.7, .7, 0), .07, vec3(.3, .2, 0)));
  if(e < d){ d = e; id = 4; }
  return d; }
Mat mat(int id, vec3 p, vec3 n){
  if(id == 0) return Mat(vec3(.70, .012, .03), .85, .03, 0.);
  if(id == 3){
    vec3 q = stoneP(vec3(p.xz * rot(YAW), p.y).xzy);
    float sp = vnoise(q.xz * 9.) * vnoise(q.xy * 23.);
    float vein = smoothstep(.16, .05, abs(q.x * .5 + q.z * .86 - .7 + .35 * vnoise(q.xy * 1.3) - .2 * q.y));
    return Mat(mix(vec3(.014, .014, .017) + .02 * sp, vec3(.62, .6, .57), vein * .9), .2, .05, 0.); }
  vec3 paper = vec3(.84, .83, .80) * (.985 + .03 * vnoise(p.xz * 40.));
  if(id == 2 && abs(n.y) < .5) paper *= .62 + .38 * smoothstep(.1, .6, fract(p.y / .05)) * (.9 + .1 * vnoise(vec2(floor(p.y / .05), 1.) * 3.));
  float tr = id == 4 ? .42 : (id == 1 && p.y > SH + .9 ? .42 : 0.);
  return Mat(paper, .8, .03, tr); }
const int NL = 2;
void lightDef(int i, out vec3 c, out vec3 at, out vec2 hs, out vec3 Le){
  if(i == 0){ c = vec3(-58, 78, -18); at = vec3(0, 4, 0); hs = vec2(30, 24); Le = vec3(30., 28.4, 26.); }
  else { c = vec3(70, 80, 120); at = vec3(10, 16, -20); hs = vec2(60, 50); Le = vec3(2.5, 2.7, 3.1); } }
vec3 sky(vec3 d){ return vec3(.03, .026, .028); }
`;
