import { useEffect, useRef, useState } from 'react'

export type RevealSegment = {
  text: string
  className?: string
}

type RevealWordsProps = {
  segments?: RevealSegment[]
  text?: string
  className?: string
  wordDelay?: number
  duration?: number
  threshold?: number
  startDelay?: number
}

export function RevealWords({
  segments,
  text,
  className,
  wordDelay = 35,
  duration = 750,
  threshold = 0.2,
  startDelay = 0,
}: RevealWordsProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const r =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(r)
    if (r) setVisible(true)
  }, [])

  useEffect(() => {
    if (reduced) return
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [reduced, threshold])

  const source: RevealSegment[] = segments ?? (text ? [{ text }] : [])
  const ariaLabel = source.map((s) => s.text).join('')

  let wordIndex = 0
  const renderedSegments = source.map((seg, segIdx) => {
    const tokens = seg.text.split(/(\s+)/)
    return (
      <span key={segIdx} className={seg.className}>
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) {
            if (tok.includes('\n')) return <br key={i} />
            return <span key={i}>{tok}</span>
          }
          if (tok.length === 0) return null
          const idx = wordIndex++
          const delay = startDelay + idx * wordDelay
          return (
            <span key={i} className="inline-block overflow-hidden align-baseline">
              <span
                className="inline-block will-change-transform"
                style={{
                  transform: visible ? 'translateY(0)' : 'translateY(110%)',
                  opacity: visible ? 1 : 0,
                  transition: `transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity ${duration}ms ease ${delay}ms`,
                }}
              >
                {tok}
              </span>
            </span>
          )
        })}
      </span>
    )
  })

  return (
    <span ref={ref} className={className} aria-label={ariaLabel}>
      {renderedSegments}
    </span>
  )
}
