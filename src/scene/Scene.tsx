import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  HueSaturation,
  BrightnessContrast,
} from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import { useControls, folder } from 'leva'
import * as THREE from 'three'
import { Mountain } from './Mountain'
import { Particles } from './Particles'
import { Atmosphere } from './Atmosphere'
import { Aurora } from './Aurora'
import { Lighting } from './Lighting'
import { CameraRig } from './CameraRig'

function ExposureBinder({ value }: { value: number }) {
  const gl = useThree((s) => s.gl)
  useEffect(() => {
    gl.toneMappingExposure = value
  }, [gl, value])
  return null
}

export function Scene() {
  const atmos = useControls('Atmosphere', {
    exposure: { value: 0.52, min: 0, max: 2, step: 0.01 },
    Fog: folder({
      fogColor: '#070d1c',
      fogNear: { value: 49, min: 0, max: 200, step: 1 },
      fogFar: { value: 33, min: 10, max: 400, step: 1 },
    }),
  })

  const bloom = useControls('Bloom', {
    intensity: { value: 2.1, min: 0, max: 3, step: 0.05 },
    threshold: { value: 0.53, min: 0, max: 1, step: 0.01 },
    smoothing: { value: 1, min: 0, max: 1, step: 0.01 },
    kernelSize: {
      value: KernelSize.LARGE,
      options: {
        VERY_SMALL: KernelSize.VERY_SMALL,
        SMALL: KernelSize.SMALL,
        MEDIUM: KernelSize.MEDIUM,
        LARGE: KernelSize.LARGE,
        VERY_LARGE: KernelSize.VERY_LARGE,
        HUGE: KernelSize.HUGE,
      },
    },
  })

  const grade = useControls('Color Grade', {
    saturation: { value: 0.42, min: -1, max: 1, step: 0.01 },
    hue: { value: -0.29, min: -3.14, max: 3.14, step: 0.01 },
    brightness: { value: 0.12, min: -1, max: 1, step: 0.01 },
    contrast: { value: 0.03, min: -1, max: 1, step: 0.01 },
  })

  const fx = useControls('FX', {
    Vignette: folder({
      vignetteOffset: { value: 0.17, min: 0, max: 1, step: 0.01 },
      vignetteDarkness: { value: 0.95, min: 0, max: 1, step: 0.01 },
    }),
    Grain: folder({
      noiseOpacity: { value: 0.06, min: 0, max: 0.3, step: 0.005 },
    }),
  })

  return (
    <Canvas
      className="canvas-fixed"
      shadows
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 4, 48], fov: 42, near: 0.1, far: 500 }}
    >
      <ExposureBinder value={atmos.exposure} />
      <fog attach="fog" args={[atmos.fogColor, atmos.fogNear, atmos.fogFar]} />

      <Suspense fallback={null}>
        <Atmosphere />
        <Aurora />
        <Lighting />
        <Mountain />
        <Particles />
        <CameraRig />
      </Suspense>

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={bloom.intensity}
          luminanceThreshold={bloom.threshold}
          luminanceSmoothing={bloom.smoothing}
          kernelSize={bloom.kernelSize}
          mipmapBlur
        />
        <HueSaturation saturation={grade.saturation} hue={grade.hue} />
        <BrightnessContrast brightness={grade.brightness} contrast={grade.contrast} />
        <Vignette eskil={false} offset={fx.vignetteOffset} darkness={fx.vignetteDarkness} />
        <Noise opacity={fx.noiseOpacity} blendFunction={BlendFunction.OVERLAY} />
      </EffectComposer>
    </Canvas>
  )
}
