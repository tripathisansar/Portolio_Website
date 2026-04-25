import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#%@&01ABCDEFGHIJKLMNOPQRSTUVWXYZ'

type ScrambleProps = {
  text: string
  className?: string
  duration?: number
  delay?: number
  trigger?: 'view' | 'mount'
  threshold?: number
}

export function Scramble({
  text,
  className,
  duration = 900,
  delay = 0,
  trigger = 'view',
  threshold = 0.25,
}: ScrambleProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [output, setOutput] = useState<string>(() =>
    trigger === 'view' ? text.replace(/\S/g, ' ') : text,
  )
  const startedRef = useRef(false)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    const cleanups: Array<() => void> = []

    const run = () => {
      if (startedRef.current) return
      startedRef.current = true

      if (reduced) {
        setOutput(text)
        return
      }

      const start = performance.now() + delay
      const lines = text.split('\n')
      const positions: { line: number; col: number; final: string; revealAt: number }[] = []
      const totalChars = lines.reduce((acc, l) => acc + l.length, 0)
      let cursor = 0
      lines.forEach((line, li) => {
        for (let ci = 0; ci < line.length; ci++) {
          positions.push({
            line: li,
            col: ci,
            final: line[ci],
            revealAt: (cursor / Math.max(totalChars, 1)) * (duration * 0.7),
          })
          cursor++
        }
      })

      const tick = (now: number) => {
        const elapsed = now - start
        if (elapsed < 0) {
          raf = requestAnimationFrame(tick)
          return
        }
        const buffers = lines.map((l) => l.split(''))
        let done = true
        positions.forEach((p) => {
          if (p.final === ' ') {
            buffers[p.line][p.col] = ' '
            return
          }
          if (elapsed >= p.revealAt + duration * 0.25) {
            buffers[p.line][p.col] = p.final
          } else {
            done = false
            buffers[p.line][p.col] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
        })
        setOutput(buffers.map((b) => b.join('')).join('\n'))
        if (!done) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    if (trigger === 'mount') {
      run()
    } else {
      const node = ref.current
      if (!node) return
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run()
              io.disconnect()
            }
          })
        },
        { threshold },
      )
      io.observe(node)
      cleanups.push(() => io.disconnect())
    }

    return () => {
      cancelAnimationFrame(raf)
      cleanups.forEach((c) => c())
    }
  }, [text, duration, delay, trigger, threshold])

  const lines = output.split('\n')

  return (
    <span ref={ref} className={className} aria-label={text}>
      {lines.map((line, i) => (
        <span key={i} className="block" aria-hidden="true">
          {line || ' '}
        </span>
      ))}
    </span>
  )
}
