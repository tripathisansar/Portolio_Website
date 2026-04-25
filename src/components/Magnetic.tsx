import { useEffect, useRef, type ReactNode } from 'react'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  innerStrength?: number
  block?: boolean
}

export function Magnetic({
  children,
  className,
  strength = 0.35,
  radius = 1.6,
  innerStrength = 0.4,
  block = false,
}: MagneticProps) {
  const wrapRef = useRef<HTMLSpanElement | null>(null)
  const innerRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      const r = Math.max(rect.width, rect.height) * radius
      if (dist < r) {
        const k = (1 - dist / r) * strength
        targetX = dx * k
        targetY = dy * k
      } else {
        targetX = 0
        targetY = 0
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = () => {
      curX += (targetX - curX) * 0.18
      curY += (targetY - curY) * 0.18
      wrap.style.transform = `translate3d(${curX}px, ${curY}px, 0)`
      inner.style.transform = `translate3d(${curX * innerStrength}px, ${curY * innerStrength}px, 0)`
      if (Math.abs(curX - targetX) > 0.05 || Math.abs(curY - targetY) > 0.05) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      wrap.style.transform = ''
      inner.style.transform = ''
    }
  }, [strength, radius, innerStrength])

  const displayClass = block ? 'block w-full' : 'inline-block'

  return (
    <span ref={wrapRef} className={`${displayClass} ${className ?? ''}`}>
      <span ref={innerRef} className={displayClass}>
        {children}
      </span>
    </span>
  )
}
