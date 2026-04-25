import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { mouseState } from './mouseState'

const KEYFRAMES = [
  { pos: new THREE.Vector3(0, 4, 48), look: new THREE.Vector3(0, 7, 0) },
  { pos: new THREE.Vector3(7, 6, 44), look: new THREE.Vector3(-1, 7, -1) },
  { pos: new THREE.Vector3(13, 9, 39), look: new THREE.Vector3(-2, 8, -2) },
  { pos: new THREE.Vector3(17, 13, 34), look: new THREE.Vector3(-3, 9, -2) },
  { pos: new THREE.Vector3(19, 18, 30), look: new THREE.Vector3(-4, 10, -2) },
]

export function CameraRig() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 6, 0))
  const tmpPos = useRef(new THREE.Vector3())
  const tmpLook = useRef(new THREE.Vector3())
  const scroll = useScrollProgress()

  useFrame((state, delta) => {
    const sections = KEYFRAMES.length - 1
    const p = THREE.MathUtils.clamp(scroll.current, 0, 1) * sections
    const i = Math.floor(p)
    const f = p - i
    const a = KEYFRAMES[Math.min(i, sections)]
    const b = KEYFRAMES[Math.min(i + 1, sections)]

    const ease = f * f * (3 - 2 * f)

    tmpPos.current.lerpVectors(a.pos, b.pos, ease)
    tmpLook.current.lerpVectors(a.look, b.look, ease)

    const drift = state.clock.elapsedTime * 0.15
    tmpPos.current.x += Math.sin(drift) * 0.35
    tmpPos.current.y += Math.cos(drift * 0.7) * 0.2

    const px = mouseState.x * 0.6
    const py = mouseState.y * 0.35
    tmpPos.current.x += px
    tmpPos.current.y += py

    camera.position.lerp(tmpPos.current, 1 - Math.pow(0.001, delta))
    target.current.lerp(tmpLook.current, 1 - Math.pow(0.001, delta))
    camera.lookAt(target.current)
  })

  return null
}
