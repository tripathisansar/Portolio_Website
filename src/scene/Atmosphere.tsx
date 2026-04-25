import { useMemo } from 'react'
import * as THREE from 'three'

export function Atmosphere() {
  const skyMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTopColor: { value: new THREE.Color('#020410') },
        uMidColor: { value: new THREE.Color('#0a1428') },
        uBottomColor: { value: new THREE.Color('#1a2a4a') },
      },
      vertexShader: /* glsl */ `
        varying vec3 vWorldPos;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uTopColor;
        uniform vec3 uMidColor;
        uniform vec3 uBottomColor;
        varying vec3 vWorldPos;
        void main() {
          float h = normalize(vWorldPos).y;
          vec3 col;
          if (h > 0.0) {
            col = mix(uMidColor, uTopColor, smoothstep(0.0, 0.7, h));
          } else {
            col = mix(uMidColor, uBottomColor, smoothstep(0.0, -0.5, h));
          }
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  }, [])

  return (
    <mesh material={skyMaterial}>
      <sphereGeometry args={[400, 40, 40]} />
    </mesh>
  )
}
