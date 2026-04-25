import { useEffect, useState } from 'react'

function ktmTime(d: Date): string {
  const totalMinutes = d.getUTCHours() * 60 + d.getUTCMinutes() + 5 * 60 + 45
  const wrapped = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60)
  const h = Math.floor(wrapped / 60)
  const m = wrapped % 60
  const s = d.getUTCSeconds()
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

const segments = (clock: string) => [
  { k: 'STATUS', v: 'AVAILABLE · Q3 2026' },
  { k: 'KTM', v: `${clock} · UTC+5:45` },
  { k: 'CAPACITY', v: '2 / 6 SLOTS REMAINING' },
  { k: 'BUILD', v: '2026.04.25' },
  { k: 'STACK', v: 'R3F · GLSL · NEXT' },
  { k: 'COORD', v: 'N 27°59′ · E 86°55′' },
  { k: 'LIGHTHOUSE', v: '98 / 100' },
  { k: 'INQUIRIES', v: 'OPEN · 48H RESPONSE' },
]

function Strip({ items }: { items: ReturnType<typeof segments> }) {
  return (
    <div className="flex items-center gap-8 px-4 shrink-0">
      {items.map((s, i) => (
        <span key={i} className="flex items-center gap-2 shrink-0">
          <span className="text-frost-300/55">{s.k}</span>
          <span className="text-frost-50">{s.v}</span>
          <span className="text-frost-300/30 ml-4">·</span>
        </span>
      ))}
    </div>
  )
}

export function StatusTicker() {
  const [clock, setClock] = useState(() => ktmTime(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setClock(ktmTime(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  const items = segments(clock)

  return (
    <div className="fixed left-0 right-0 bottom-0 z-40 pointer-events-none">
      <div className="relative flex items-center h-7 border-t border-frost-300/10 bg-ink-950/85 backdrop-blur-md overflow-hidden font-mono text-[10px] uppercase tracking-widest2">
        <div className="absolute inset-y-0 left-0 z-10 flex items-center px-4 bg-ink-950/95 border-r border-frost-300/10 text-frost-50">
          <span className="block w-1.5 h-1.5 rounded-full bg-glacier-400 animate-pulse-slow mr-2.5" />
          <span>LIVE</span>
        </div>

        <div className="flex animate-marquee whitespace-nowrap pl-28">
          <Strip items={items} />
          <Strip items={items} />
        </div>

        <div className="absolute inset-y-0 right-0 z-10 hidden md:flex items-center px-4 bg-ink-950/95 border-l border-frost-300/10 text-frost-300/60">
          <span>v1.0 · {clock}</span>
        </div>
      </div>
    </div>
  )
}
