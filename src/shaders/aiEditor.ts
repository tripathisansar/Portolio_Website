export const aiEditorFrag = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 muv = u_mouse;

  vec2 center = uv - 0.5;
  center.x *= aspect.x;

  float d = distance(uv * aspect, muv * aspect);

  // technical grid (subtle)
  vec2 gridUV = uv * vec2(80.0, 40.0);
  vec2 gridLine = abs(fract(gridUV) - 0.5);
  float grid = smoothstep(0.49, 0.5, max(gridLine.x, gridLine.y));

  // scanline drift
  float scan = sin(uv.y * 900.0 - u_time * 0.4) * 0.5 + 0.5;
  scan = pow(scan, 12.0);

  // mouse-reactive violet glow
  float glow = exp(-d * 3.0);

  // rare horizontal displacement bands
  float band = step(0.997, hash(vec2(floor(uv.y * 200.0), floor(u_time * 18.0))));

  vec3 base = vec3(0.025, 0.028, 0.052);
  vec3 violet = vec3(0.55, 0.4, 0.95);
  vec3 col = base;
  col += violet * glow * 0.18;
  col += vec3(0.5, 0.4, 0.7) * grid * 0.022;
  col += vec3(0.6, 0.5, 0.9) * scan * 0.04;
  col += violet * band * 0.12;

  // slow color drift far from mouse
  float pulse = 0.5 + 0.5 * sin(u_time * 0.4);
  col += vec3(0.04, 0.05, 0.10) * pulse * (1.0 - glow);

  // vignette
  float vig = 1.0 - dot(center, center) * 0.35;
  col *= clamp(vig, 0.5, 1.0);

  gl_FragColor = vec4(col, 1.0);
}`
