export const envelopeFrag = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // warm cream gradient — dark below, soft cream above
  vec3 dark = vec3(0.025, 0.018, 0.012);
  vec3 cream = vec3(0.20, 0.14, 0.10);
  vec3 col = mix(dark, cream, smoothstep(0.0, 1.0, uv.y * 0.9 + 0.1));

  // film grain — animated, dense, per-pixel (no scan structure)
  float grain = hash(floor(gl_FragCoord.xy) + floor(u_time * 30.0)) - 0.5;
  col += grain * 0.045;

  // mouse warm pool
  float d = distance(uv, u_mouse);
  vec3 warm = vec3(0.55, 0.32, 0.20);
  col += warm * 0.10 * smoothstep(0.45, 0.0, d);

  // slow projector flicker (brightness only)
  float flicker = sin(u_time * 18.0) * 0.005 + 0.995;
  col *= flicker;

  // warm vignette
  vec2 c = uv - 0.5;
  col *= 1.0 - dot(c, c) * 0.65;

  gl_FragColor = vec4(col, 1.0);
}`
