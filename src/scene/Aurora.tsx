import { useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls, folder } from 'leva'
import * as THREE from 'three'
import { mouseState } from './mouseState'

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uSoftness;
  uniform vec3  uLow;
  uniform vec3  uMid;
  uniform vec3  uHigh;
  uniform float uBandY;
  uniform float uBandHeight;
  uniform float uWaveFreq;
  uniform float uWaveAmp;
  uniform float uRayDensity;
  uniform float uRayContrast;
  uniform float uBottomFade;
  uniform float uTopFade;
  uniform vec2  uMouse;
  uniform float uMouseStrength;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * vnoise(p);
      p = p * 2.07 + vec2(13.1, 7.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float t = uTime;
    float x = vUv.x;
    float y = vUv.y;

    // Mouse influence: gaussian "swell" centered on cursor x, biased by y
    float mouseX = uMouse.x * 0.5 + 0.5;
    float mouseDx = x - mouseX;
    float mouseProx = exp(-(mouseDx * mouseDx) * 18.0);

    // Primary curtain centerline
    float wave =
        sin(x * 6.2831853 * uWaveFreq + t * 0.9) * 0.55
      + sin(x * 14.7 + t * 0.4) * 0.30
      + (fbm(vec2(x * 3.0, t * 0.18)) - 0.5) * 1.1;
    float center = uBandY + wave * uWaveAmp + mouseProx * uMouse.y * 0.06 * uMouseStrength;

    float dy = (y - center);
    float wUp = uBandHeight * 1.6;
    float wDn = uBandHeight * 0.65;
    float falloff = (y > center)
      ? exp(-(dy * dy) / (wUp * wUp))
      : exp(-(dy * dy) / (wDn * wDn));

    // Secondary curtain — offset, softer, for layered depth
    float wave2 =
        sin(x * 4.3 + t * 0.6 + 1.7) * 0.45
      + sin(x * 11.1 - t * 0.35) * 0.22
      + (fbm(vec2(x * 2.1 + 5.3, t * 0.22 + 2.1)) - 0.5) * 0.9;
    float center2 = uBandY + 0.07 + wave2 * uWaveAmp * 0.8;
    float dy2 = y - center2;
    float falloff2 = (y > center2)
      ? exp(-(dy2 * dy2) / (wUp * 1.3 * wUp * 1.3))
      : exp(-(dy2 * dy2) / (wDn * 1.05 * wDn * 1.05));

    // Coarse ray curtains (existing)
    float rayCoarse = fbm(vec2(x * uRayDensity + t * 0.6, y * 1.4 - t * 0.25));
    rayCoarse = pow(rayCoarse, uRayContrast);

    // Fine vertical striations — narrow filaments dropping from the band
    float rayFine = fbm(vec2(x * uRayDensity * 3.2 + t * 0.85, y * 0.55 - t * 0.08));
    rayFine = pow(rayFine, uRayContrast * 1.35);

    float rays = mix(rayCoarse, rayFine, 0.45);

    // Broad flow / chaos
    float flow = fbm(vec2(x * 2.2 - t * 0.18, y * 2.6 + t * 0.35));
    flow = smoothstep(0.15, 0.95, flow);

    // Hot core — thin bright slab at band center
    float coreW = max(uBandHeight * 0.32, 0.001);
    float core = exp(-(dy * dy) / (coreW * coreW));

    // High-freq shimmer — sparse bright flecks on the main band
    float shimmer = fbm(vec2(x * 26.0 + t * 1.7, y * 7.5 - t * 0.55));
    shimmer = pow(shimmer, 3.2);

    // Combined density
    float density1 = falloff * mix(0.18, 1.0, rays) * mix(0.5, 1.0, flow);
    float density2 = falloff2 * mix(0.3, 1.0, rayCoarse) * 0.55;
    float total = density1 + density2;
    total = pow(max(total, 0.0), uSoftness);
    total += core * rays * 0.6;
    total += shimmer * falloff * 0.32;

    // Color grading up the band + warm core highlight
    float gradT = clamp((y - (center - uBandHeight)) / (2.0 * uBandHeight), 0.0, 1.0);
    vec3 col = mix(uLow, uMid, smoothstep(0.0, 0.55, gradT));
    col = mix(col, uHigh, smoothstep(0.6, 1.0, gradT));
    col += core * rays * 0.45 * uMid;

    float hEdge = smoothstep(0.0, 0.18, x) * smoothstep(1.0, 0.82, x);
    float vBottom = smoothstep(0.0, max(uBottomFade, 0.0001), y);
    float vTop = smoothstep(1.0, 1.0 - max(uTopFade, 0.0001), y);
    float coverage = total * hEdge * vBottom * vTop;

    // Local brightness bump under cursor
    coverage *= 1.0 + mouseProx * 0.45 * uMouseStrength;

    vec3 outCol = col * uIntensity;
    float alpha = clamp(coverage, 0.0, 1.0);

    gl_FragColor = vec4(outCol, alpha);
  }
`

export function Aurora() {
  const ctrl = useControls('Aurora', {
    intensity: { value: 0.3, min: 0, max: 4, step: 0.05 },
    speed: { value: 0.1, min: 0, max: 1, step: 0.01 },
    softness: { value: 0.5, min: 0.2, max: 2, step: 0.05 },
    Colors: folder({
      lowColor: '#2fffba',
      midColor: '#5b8fff',
      highColor: '#924dd8',
    }),
    Shape: folder({
      bandY: { value: 0.46, min: 0, max: 1, step: 0.005 },
      bandHeight: { value: 0.325, min: 0.05, max: 0.8, step: 0.005 },
      waveFreq: { value: 5, min: 0.2, max: 5, step: 0.05 },
      waveAmp: { value: 0.16, min: 0, max: 0.4, step: 0.005 },
      rayDensity: { value: 28, min: 1, max: 30, step: 0.5 },
      rayContrast: { value: 2.7, min: 0.5, max: 5, step: 0.05 },
      bottomFade: { value: 0.35, min: 0, max: 0.6, step: 0.005 },
      topFade: { value: 0.05, min: 0, max: 0.6, step: 0.005 },
    }),
    Placement: folder({
      radius: { value: 167, min: 60, max: 260, step: 1 },
      heightY: { value: 65, min: 0, max: 80, step: 0.5 },
      cylHeight: { value: 86, min: 20, max: 200, step: 1 },
    }),
  })

  // Build the material ONCE. uniforms live on it, mutated in place every render.
  // This avoids any chance of R3F's declarative <shaderMaterial> recreating the
  // material (which would also throw away uniform updates).
  const material = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uIntensity: { value: 0.3 },
      uSoftness: { value: 0.5 },
      uLow: { value: new THREE.Color('#2fffba') },
      uMid: { value: new THREE.Color('#5b8fff') },
      uHigh: { value: new THREE.Color('#924dd8') },
      uBandY: { value: 0.46 },
      uBandHeight: { value: 0.325 },
      uWaveFreq: { value: 5 },
      uWaveAmp: { value: 0.16 },
      uRayDensity: { value: 28 },
      uRayContrast: { value: 2.7 },
      uBottomFade: { value: 0.35 },
      uTopFade: { value: 0.05 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 1 },
    }
    return new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      vertexShader: VERT,
      fragmentShader: FRAG,
    })
  }, [])

  // Cache geometry by placement values so it only rebuilds when those change,
  // not every slider tick.
  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(
      ctrl.radius,
      ctrl.radius,
      ctrl.cylHeight,
      128,
      1,
      true,
      Math.PI * (5 / 6),
      Math.PI * (4 / 3),
    )
  }, [ctrl.radius, ctrl.cylHeight])

  // Sync controls into the live material's uniforms each render.
  const u = material.uniforms
  u.uIntensity.value = ctrl.intensity
  u.uSoftness.value = ctrl.softness
  u.uLow.value.set(ctrl.lowColor)
  u.uMid.value.set(ctrl.midColor)
  u.uHigh.value.set(ctrl.highColor)
  u.uBandY.value = ctrl.bandY
  u.uBandHeight.value = ctrl.bandHeight
  u.uWaveFreq.value = ctrl.waveFreq
  u.uWaveAmp.value = ctrl.waveAmp
  u.uRayDensity.value = ctrl.rayDensity
  u.uRayContrast.value = ctrl.rayContrast
  u.uBottomFade.value = ctrl.bottomFade
  u.uTopFade.value = ctrl.topFade

  useFrame((_, dt) => {
    u.uTime.value += dt * ctrl.speed
    const m = u.uMouse.value as THREE.Vector2
    const lerp = 1 - Math.pow(0.001, dt)
    m.x += (mouseState.x - m.x) * lerp
    m.y += (mouseState.y - m.y) * lerp
  })

  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => () => material.dispose(), [material])

  return (
    <mesh
      position={[0, ctrl.heightY, 0]}
      renderOrder={-1}
      frustumCulled={false}
      geometry={geometry}
      material={material}
    />
  )
}
