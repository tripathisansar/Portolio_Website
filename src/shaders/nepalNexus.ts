export const nepalNexusFrag = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += noise(p) * amp;
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // sky gradient — night to glacier dawn
  vec3 deep = vec3(0.012, 0.022, 0.055);
  vec3 mid = vec3(0.07, 0.16, 0.28);
  vec3 high = vec3(0.55, 0.78, 0.83);

  vec3 col = mix(deep, mid, smoothstep(0.0, 0.55, uv.y));
  col = mix(col, high * 0.42, smoothstep(0.45, 0.95, uv.y));

  // slow drifting aurora-ish noise high in the sky
  vec2 np = uv * 2.5 + vec2(u_time * 0.04, u_time * 0.018);
  float n = fbm(np);
  col += vec3(0.10, 0.20, 0.26) * pow(n, 2.0) * smoothstep(0.25, 0.95, uv.y);

  // mouse warm spotlight (sun-on-snow)
  float d = distance(uv, u_mouse);
  vec3 warm = vec3(0.95, 0.72, 0.48);
  col += warm * 0.06 * exp(-d * 4.5);

  // subtle stars high up
  float starField = step(0.9985, hash(floor(uv * vec2(800.0, 600.0))));
  col += vec3(starField) * smoothstep(0.5, 1.0, uv.y);

  // soft horizon haze near bottom
  col += vec3(0.04, 0.06, 0.10) * smoothstep(0.3, 0.0, uv.y);

  gl_FragColor = vec4(col, 1.0);
}`
