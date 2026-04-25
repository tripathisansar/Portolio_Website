import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls, folder } from 'leva'
import * as THREE from 'three'

function AuroraBounce() {
  const topRef = useRef<THREE.DirectionalLight>(null)
  const rimRef = useRef<THREE.PointLight>(null)

  const ctrl = useControls('Aurora Bounce', {
    Top: folder({
      topColor: '#4affb8',
      topIntensity: { value: 6.05, min: 0, max: 8, step: 0.05 },
    }),
    Rim: folder({
      rimColor: '#7a9bff',
      rimIntensity: { value: 3.85, min: 0, max: 6, step: 0.05 },
      rimHeight: { value: 20, min: 5, max: 80, step: 1 },
      rimDistance: { value: 124, min: 20, max: 300, step: 2 },
    }),
    Hemi: folder({
      hemiTop: '#2fffba',
      hemiGround: '#07101f',
      hemiIntensity: { value: 1.25, min: 0, max: 3, step: 0.05 },
    }),
    Flicker: folder({
      flickerAmount: { value: 0.57, min: 0, max: 1, step: 0.01 },
      flickerSpeed: { value: 2.7, min: 0, max: 3, step: 0.05 },
    }),
  })

  useFrame((state) => {
    const t = state.clock.elapsedTime * ctrl.flickerSpeed
    // Smooth pseudo-random pulse from overlapping sines
    const n =
      Math.sin(t * 1.7) * 0.5 +
      Math.sin(t * 3.1 + 1.3) * 0.3 +
      Math.sin(t * 0.9 + 2.2) * 0.2
    const pulse = 1 - ctrl.flickerAmount * 0.5 + n * 0.5 * ctrl.flickerAmount

    if (topRef.current) topRef.current.intensity = ctrl.topIntensity * pulse
    if (rimRef.current) rimRef.current.intensity = ctrl.rimIntensity * (0.85 + pulse * 0.15)
  })

  return (
    <>
      <directionalLight
        ref={topRef}
        position={[0, 60, 8]}
        intensity={ctrl.topIntensity}
        color={ctrl.topColor}
      />

      <pointLight
        ref={rimRef}
        position={[0, ctrl.rimHeight, 40]}
        intensity={ctrl.rimIntensity}
        color={ctrl.rimColor}
        distance={ctrl.rimDistance}
        decay={1.6}
      />

      <hemisphereLight
        args={[ctrl.hemiTop, ctrl.hemiGround, ctrl.hemiIntensity]}
      />
    </>
  )
}

export function Lighting() {
  const keyRef = useRef<THREE.DirectionalLight>(null)

  useFrame((state) => {
    if (keyRef.current) {
      const t = state.clock.elapsedTime * 0.04
      keyRef.current.position.x = Math.cos(t) * 6 + 14
      keyRef.current.position.z = Math.sin(t) * 4 + 22
    }
  })

  return (
    <>
      <ambientLight intensity={0.55} color="#8aa8d6" />

      <directionalLight
        ref={keyRef}
        position={[14, 22, 22]}
        intensity={4.8}
        color="#eaf2ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={120}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0005}
      />

      <directionalLight
        position={[-22, 16, 6]}
        intensity={2.0}
        color="#5b8fcf"
      />

      <directionalLight
        position={[0, 10, -18]}
        intensity={1.2}
        color="#a8c8ff"
      />

      <pointLight
        position={[0, 24, 10]}
        intensity={1.6}
        color="#cde0ff"
        distance={70}
      />

      <hemisphereLight args={['#5a78aa', '#0a1428', 0.85]} />

      <AuroraBounce />
    </>
  )
}
