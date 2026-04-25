export const aiEditorFrag = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 muv = u_mouse;

  vec2 center = uv - 0.5;
  center.x *= aspect.x;

  float d = distance(uv * aspect, muv * aspect);

  // mouse-reactive violet glow
  float glow = exp(-d * 3.0);

  vec3 base = vec3(0.025, 0.028, 0.052);
  vec3 violet = vec3(0.55, 0.4, 0.95);
  vec3 col = base;
  col += violet * glow * 0.22;

  // slow ambient pulse, dimmed near the cursor
  float pulse = 0.5 + 0.5 * sin(u_time * 0.4);
  col += vec3(0.04, 0.05, 0.10) * pulse * (1.0 - glow);

  // gentle horizontal hue drift, far below visible-line frequency
  float drift = 0.5 + 0.5 * sin(uv.y * 6.0 + u_time * 0.15);
  col += vec3(0.025, 0.02, 0.05) * drift * (1.0 - glow * 0.5);

  // vignette
  float vig = 1.0 - dot(center, center) * 0.35;
  col *= clamp(vig, 0.5, 1.0);

  gl_FragColor = vec4(col, 1.0);
}`
