import { useState } from 'react'
import { projects } from '../data/projects'
import { FrameMarkers } from '../components/FrameMarkers'

export function Work() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="work" className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="flex items-end justify-between mb-10 md:mb-14 border-b border-frost-300/10 pb-6">
        <div>
          <span className="label-tag">/ Selected work</span>
          <h2 className="mt-4 font-display font-light text-frost-50 text-[10vw] md:text-[5.2vw] leading-[0.95] tracking-tightest">
            Selected<br />engagements.
          </h2>
        </div>
        <div className="hidden md:block text-right">
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60">2024 — 2026 · Premium clients only</span>
        </div>
      </div>

      <ol className="divide-y divide-frost-300/10 border-y border-frost-300/10">
        {projects.map((p) => (
          <li
            key={p.id}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
            className="group relative grid grid-cols-12 gap-4 py-6 md:py-8 cursor-pointer-link transition-colors"
          >
            <div
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, ${p.accent} 0%, transparent 70%)`,
                opacity: active === p.id ? 0.18 : 0,
              }}
            />
            <div className="col-span-1 font-mono text-[11px] tracking-widest2 text-frost-300/60 group-hover:text-frost-50 transition-colors pt-2">
              {p.index}
            </div>
            <div className="col-span-11 md:col-span-5">
              <div className="font-display font-light text-frost-50 text-3xl md:text-5xl tracking-tight leading-none">
                {p.title}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-frost-300/70">
                {p.client}
              </div>
            </div>
            <div className="col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-widest2 text-frost-300/60 pt-2">
              {p.category}
            </div>
            <div className="col-span-12 md:col-span-2 font-mono text-[11px] uppercase tracking-widest2 text-frost-300/60 pt-2">
              {p.year}
            </div>
            <div className="col-span-12 md:col-span-1 flex items-start justify-end pt-2">
              <span className="font-mono text-frost-300/60 group-hover:text-frost-50 group-hover:translate-x-1 transition-all">↗</span>
            </div>

            <div
              className={`col-span-12 md:col-start-2 md:col-span-11 grid md:grid-cols-3 gap-6 md:gap-10 overflow-hidden transition-[max-height,opacity,padding] duration-500 ${
                active === p.id ? 'max-h-96 opacity-100 pt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="md:col-span-2 text-frost-100/85 leading-relaxed text-[15px] max-w-2xl">
                {p.description}
              </p>
              <div className="space-y-3">
                {p.metrics?.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between border-b border-frost-300/10 pb-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60">{m.label}</span>
                    <span className="font-display text-frost-50 text-xl">{m.value}</span>
                  </div>
                ))}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.tags.map((t) => (
                    <span key={t} className="label-tag !text-[9px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="relative mt-16 md:mt-24 border border-frost-300/15 bg-ink-950/80 backdrop-blur-md p-8 md:p-12">
        <FrameMarkers />
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <span className="label-tag inline-block">Currently accepting Q3 2026 projects</span>
            <h3 className="mt-4 font-display text-frost-50 text-3xl md:text-5xl leading-[0.95] tracking-tight font-light">
              Selective engagements.<br />By referral or fit.
            </h3>
          </div>
          <div>
            <p className="text-frost-100/80 leading-relaxed">
              Engagements begin with a paid two-week strategy intensive. If our work clearly maps onto yours, get in touch — we respond within forty-eight hours.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 border border-frost-100/40 text-frost-50 px-4 py-2.5 hover:bg-frost-50 hover:text-ink-950 transition-colors"
            >
              Start the conversation <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
