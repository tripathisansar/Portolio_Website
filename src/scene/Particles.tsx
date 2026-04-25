import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type ParticlesProps = {
  count?: number
  spread?: number
}

export function Particles({ count = 1800, spread = 80 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, sizes, opacities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const opacities = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.6) * spread
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI * 0.6

      positions[i * 3 + 0] = Math.cos(theta) * Math.cos(phi) * r
      positions[i * 3 + 1] = Math.sin(phi) * r * 0.6 + 6
      positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r

      sizes[i] = Math.random() * 0.06 + 0.015
      opacities[i] = Math.random() * 0.7 + 0.15
    }

    return { positions, sizes, opacities }
  }, [count, spread])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1))
    return geo
  }, [positions, sizes, opacities])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute float aOpacity;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vOpacity;

        void main() {
          vec3 p = position;
          float ph = position.x * 0.4 + position.z * 0.3;
          p.y += sin(uTime * 0.4 + ph) * 0.4;
          p.x += cos(uTime * 0.25 + ph) * 0.25;

          vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPos;

          float dist = length(mvPos.xyz);
          gl_PointSize = aSize * 200.0 * uPixelRatio / dist;

          vOpacity = aOpacity * (1.0 - smoothstep(40.0, 90.0, dist));
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vOpacity;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float alpha = (1.0 - smoothstep(0.15, 0.5, d)) * vOpacity;
          vec3 col = mix(vec3(0.36, 0.56, 0.81), vec3(0.85, 0.92, 1.0), 1.0 - d * 1.6);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    })
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      ;(pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        state.clock.elapsedTime
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}
