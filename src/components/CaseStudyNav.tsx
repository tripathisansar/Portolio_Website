import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { Magnetic } from './Magnetic'

type Props = {
  current: string
}

export function CaseStudyNav({ current }: Props) {
  const idx = projects.findIndex((p) => p.id === current)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  return (
    <nav className="relative border-t border-frost-300/10 mt-32 md:mt-40">
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-frost-300/10">
        <Link
          to={`/work/${prev.id}`}
          className="group block px-6 md:px-10 py-10 md:py-14 hover:bg-ink-900/40 transition-colors"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">
            ← Previous · {prev.index}
          </div>
          <div className="mt-3 font-display font-light text-frost-50 text-3xl md:text-4xl tracking-tight leading-tight group-hover:-translate-x-1 transition-transform">
            {prev.title}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60">
            {prev.client}
          </div>
        </Link>

        <Link
          to={`/work/${next.id}`}
          className="group block px-6 md:px-10 py-10 md:py-14 hover:bg-ink-900/40 transition-colors text-right"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">
            Next · {next.index} →
          </div>
          <div className="mt-3 font-display font-light text-frost-50 text-3xl md:text-4xl tracking-tight leading-tight group-hover:translate-x-1 transition-transform">
            {next.title}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60">
            {next.client}
          </div>
        </Link>
      </div>

      <div className="border-t border-frost-300/10 px-6 md:px-10 py-8 flex items-center justify-between">
        <Magnetic strength={0.3} radius={1.6}>
          <Link
            to="/#work"
            className="font-mono text-[11px] uppercase tracking-widest2 text-frost-300 hover:text-frost-50 transition-colors inline-flex items-center gap-3"
          >
            <span className="block w-6 h-px bg-frost-300/40" />
            All work
          </Link>
        </Magnetic>
        <Magnetic strength={0.3} radius={1.6}>
          <Link
            to="/#contact"
            className="font-mono text-[11px] uppercase tracking-widest2 border border-frost-100/40 text-frost-50 px-4 py-2.5 hover:bg-frost-50 hover:text-ink-950 transition-colors"
          >
            Start a conversation ↗
          </Link>
        </Magnetic>
      </div>
    </nav>
  )
}
