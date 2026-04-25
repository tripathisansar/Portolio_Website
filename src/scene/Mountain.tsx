import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls, folder } from 'leva'
import { createNoise2D } from 'simplex-noise'
import * as THREE from 'three'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'

type MountainProps = {
  size?: number
  segments?: number
  heightScale?: number
}

const TRAIL_LENGTH = 16

function generateRockNormalMap(resolution = 256, strength = 1.7): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = resolution
  const ctx = canvas.getContext('2d')!
  const imgData = ctx.createImageData(resolution, resolution)

  const n1 = createNoise2D(() => 0.31)
  const n2 = createNoise2D(() => 0.79)
  const n3 = createNoise2D(() => 0.55)

  const heights = new Float32Array(resolution * resolution)
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const u = (x / resolution) * 6
      const v = (y / resolution) * 6
      const h =
        n1(u, v) * 0.55 +
        n2(u * 2.3, v * 2.3) * 0.3 +
        n3(u * 5.1, v * 5.1) * 0.15
      heights[y * resolution + x] = h
    }
  }

  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const xL = (x - 1 + resolution) % resolution
      const xR = (x + 1) % resolution
      const yU = (y - 1 + resolution) % resolution
      const yD = (y + 1) % resolution
      const dx = (heights[y * resolution + xR] - heights[y * resolution + xL]) * strength
      const dy = (heights[yD * resolution + x] - heights[yU * resolution + x]) * strength
      let nx = -dx
      let ny = -dy
      let nz = 1
      const len = Math.hypot(nx, ny, nz)
      nx /= len
      ny /= len
      nz /= len
      const idx = (y * resolution + x) * 4
      imgData.data[idx] = (nx * 0.5 + 0.5) * 255
      imgData.data[idx + 1] = (ny * 0.5 + 0.5) * 255
      imgData.data[idx + 2] = (nz * 0.5 + 0.5) * 255
      imgData.data[idx + 3] = 255
    }
  }

  ctx.putImageData(imgData, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(7, 7)
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

export function Mountain({ size = 70, segments = 360, heightScale = 11 }: MountainProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<LineSegments2>(null)
  const { camera, raycaster } = useThree()

  const trail = useMemo(() => {
    const positions: THREE.Vector3[] = []
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      positions.push(new THREE.Vector3(99999, 99999, 99999))
    }
    const ages = new Float32Array(TRAIL_LENGTH)
    ages.fill(1)
    return {
      positions,
      ages,
      write: 1,
      lastPos: new THREE.Vector3(99999, 99999, 99999),
    }
  }, [])

  const trailUniforms = useMemo(
    () => ({
      uTrail: { value: trail.positions },
      uTrailAge: { value: trail.ages },
      uGlowColor: { value: new THREE.Color('#86d4ff') },
      uGlowRadius: { value: 0.8 },
      uGlowSoftness: { value: 1.85 },
    }),
    [trail],
  )

  const wire = useControls('Wireframe', {
    linewidth: { value: 2.1, min: 0.5, max: 6, step: 0.1 },
    baseColor: '#7da3d4',
    baseOpacity: { value: 0.05, min: 0, max: 1, step: 0.01 },
    glowColor: '#86d4ff',
    glowRadius: { value: 0.8, min: 0.2, max: 15, step: 0.1 },
    glowSoftness: { value: 1.85, min: 0.2, max: 4, step: 0.05 },
    trailLifetime: { value: 0.9, min: 0.2, max: 6, step: 0.1 },
    trailSpacing: { value: 0.15, min: 0.05, max: 3, step: 0.05 },
  })

  const surface = useControls('Mountain Surface', {
    Albedo: folder({
      albedo: '#4c6897',
      roughness: { value: 1, min: 0, max: 1, step: 0.01 },
      metalness: { value: 0, min: 0, max: 1, step: 0.01 },
    }),
    Glow: folder({
      emissive: '#556585',
      emissiveIntensity: { value: 0.15, min: 0, max: 3, step: 0.05 },
    }),
    Detail: folder({
      normalScale: { value: 0.5, min: 0, max: 3, step: 0.05 },
    }),
  })

  const { geometry, lineSegments, normalMap } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments)
    geo.rotateX(-Math.PI / 2)

    const noise2D = createNoise2D(() => 0.42)
    const ridge = createNoise2D(() => 0.71)
    const detail = createNoise2D(() => 0.93)
    const positions = geo.attributes.position as THREE.BufferAttribute

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const z = positions.getZ(i)

      const dist = Math.sqrt(x * x + z * z)
      const peakBias = Math.exp(-Math.pow(dist / (size * 0.32), 2))

      const base = noise2D(x * 0.04, z * 0.04) * 0.6 + 0.4
      const ridges = Math.abs(ridge(x * 0.09, z * 0.09)) * 0.85
      const fine = detail(x * 0.32, z * 0.32) * 0.18
      const micro = detail(x * 1.1, z * 1.1) * 0.05

      let h = (base * 0.45 + ridges * 0.85 + fine + micro) * peakBias

      const peakSharp = Math.pow(peakBias, 1.6) * 1.4
      h += peakSharp

      const valleyDip = (1 - peakBias) * -0.18
      h += valleyDip

      positions.setY(i, h * heightScale)
    }

    positions.needsUpdate = true
    geo.computeVertexNormals()

    const wireGeoSrc = new THREE.WireframeGeometry(geo)
    const lineGeo = new LineSegmentsGeometry().fromWireframeGeometry(wireGeoSrc)
    wireGeoSrc.dispose()

    const lineMat = new LineMaterial({
      color: '#7da3d4',
      transparent: true,
      depthWrite: false,
      linewidth: 2.1,
    } as ConstructorParameters<typeof LineMaterial>[0])
    lineMat.opacity = 0.05

    Object.assign(lineMat.uniforms, trailUniforms)

    lineMat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, trailUniforms)

      shader.vertexShader =
        `uniform vec3 uTrail[${TRAIL_LENGTH}];
         uniform float uTrailAge[${TRAIL_LENGTH}];
         uniform float uGlowRadius;
         uniform float uGlowSoftness;
         varying float vGlow;\n` +
        shader.vertexShader.replace(
          '#include <clipping_planes_vertex>',
          `#include <clipping_planes_vertex>
           {
             vec3 mid = (instanceStart + instanceEnd) * 0.5;
             float glow = 0.0;
             float invSoftPow = 2.0 / max(uGlowSoftness, 0.01);
             for (int i = 0; i < ${TRAIL_LENGTH}; i++) {
               float age = uTrailAge[i];
               if (age >= 1.0) continue;
               vec3 d = mid - uTrail[i];
               float t = length(d) / max(uGlowRadius, 0.001);
               float falloff = exp(-pow(t, invSoftPow));
               float life = 1.0 - age;
               glow = max(glow, falloff * life * life);
             }
             vGlow = clamp(glow, 0.0, 1.0);
           }`,
        )

      shader.fragmentShader =
        `uniform vec3 uGlowColor;
         varying float vGlow;\n` +
        shader.fragmentShader.replace(
          'gl_FragColor = vec4( diffuseColor.rgb, alpha );',
          `vec3 _col = mix(diffuseColor.rgb, uGlowColor, vGlow);
           _col += vGlow * vGlow * vec3(0.35, 0.55, 0.78);
           float _a = alpha + vGlow * 0.55;
           gl_FragColor = vec4(_col, _a);`,
        )
    }

    const ls2 = new LineSegments2(lineGeo, lineMat)
    ls2.computeLineDistances()

    const map = generateRockNormalMap()
    return { geometry: geo, lineSegments: ls2, normalMap: map }
  }, [size, segments, heightScale, trail, trailUniforms])

  useEffect(() => {
    trailUniforms.uGlowColor.value.set(wire.glowColor)
    trailUniforms.uGlowRadius.value = wire.glowRadius
    trailUniforms.uGlowSoftness.value = wire.glowSoftness
  }, [wire.glowColor, wire.glowRadius, wire.glowSoftness, trailUniforms])

  useEffect(() => {
    const mat = lineSegments.material as LineMaterial & { linewidth: number }
    mat.linewidth = wire.linewidth
    mat.color.set(wire.baseColor)
    mat.opacity = wire.baseOpacity
  }, [wire.linewidth, wire.baseColor, wire.baseOpacity, lineSegments])

  const lifetimeRef = useRef(wire.trailLifetime)
  const spacingRef = useRef(wire.trailSpacing)
  useEffect(() => {
    lifetimeRef.current = wire.trailLifetime
  }, [wire.trailLifetime])
  useEffect(() => {
    spacingRef.current = wire.trailSpacing
  }, [wire.trailSpacing])

  const ndc = useRef(new THREE.Vector2(-99, -99))
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ndc.current.x = (e.clientX / window.innerWidth) * 2 - 1
      ndc.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onLeave = () => {
      ndc.current.set(-99, -99)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  useEffect(
    () => () => {
      normalMap.dispose()
      geometry.dispose()
      lineSegments.geometry.dispose()
      ;(lineSegments.material as LineMaterial).dispose()
    },
    [normalMap, geometry, lineSegments],
  )

  const tmpLocal = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.012
    }
    if (wireRef.current && meshRef.current) {
      wireRef.current.rotation.y = meshRef.current.rotation.y
    }

    const ageStep = delta / lifetimeRef.current
    for (let i = 0; i < trail.ages.length; i++) {
      if (trail.ages[i] < 1) {
        trail.ages[i] = Math.min(1, trail.ages[i] + ageStep)
      }
    }

    if (!meshRef.current) return
    if (ndc.current.x < -1 || ndc.current.x > 1 || ndc.current.y < -1 || ndc.current.y > 1) return

    raycaster.setFromCamera(ndc.current, camera)
    const hits = raycaster.intersectObject(meshRef.current, false)
    if (hits.length === 0) return

    tmpLocal.copy(hits[0].point)
    meshRef.current.worldToLocal(tmpLocal)

    // Slot 0 = persistent head: pinned to current cursor while hovering
    trail.positions[0].copy(tmpLocal)
    trail.ages[0] = 0

    // Slots 1..N-1 = aging trail
    if (tmpLocal.distanceTo(trail.lastPos) < spacingRef.current) return
    trail.lastPos.copy(tmpLocal)

    const slot = trail.write
    trail.positions[slot].copy(tmpLocal)
    trail.ages[slot] = 0
    trail.write = slot + 1 >= TRAIL_LENGTH ? 1 : slot + 1
  })

  return (
    <group position={[0, -4, 0]}>
      <mesh ref={meshRef} geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial
          color={surface.albedo}
          roughness={surface.roughness}
          metalness={surface.metalness}
          flatShading={false}
          emissive={surface.emissive}
          emissiveIntensity={surface.emissiveIntensity}
          normalMap={normalMap}
          normalScale-x={surface.normalScale}
          normalScale-y={surface.normalScale}
        />
      </mesh>

      <primitive ref={wireRef} object={lineSegments} />
    </group>
  )
}
