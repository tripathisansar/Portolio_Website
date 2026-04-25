import { services } from '../data/services'

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="flex items-end justify-between mb-10 md:mb-14 border-b border-frost-300/10 pb-6">
        <div>
          <span className="label-tag">/ Services</span>
          <h2 className="mt-4 font-display font-light text-frost-50 text-[10vw] md:text-[5.2vw] leading-[0.95] tracking-tightest">
            Capabilities.
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-frost-300/10 border border-frost-300/10">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-ink-900/70 backdrop-blur-sm p-8 md:p-10 group hover:bg-ink-800/70 transition-colors"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] tracking-widest2 text-frost-300/70">{s.number}</span>
              <span className="font-mono text-[11px] tracking-widest2 text-frost-300/40 group-hover:text-frost-50 group-hover:translate-x-1 transition-all">↗</span>
            </div>
            <h3 className="mt-8 font-display font-light text-frost-50 text-3xl md:text-4xl leading-tight tracking-tight">
              {s.title}
            </h3>
            <p className="mt-5 text-frost-100/80 leading-relaxed max-w-md">
              {s.copy}
            </p>
            <ul className="mt-8 space-y-2 border-t border-frost-300/10 pt-5">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-widest2 text-frost-300/70">
                  <span className="text-frost-300/40">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6 font-mono text-[11px] uppercase tracking-widest2 text-frost-300/70">
        {[
          { k: 'Engagement', v: '6 — 18 weeks' },
          { k: 'Disciplines', v: 'Brand · Web · Product' },
          { k: 'Output', v: 'Strategy → Production → Launch' },
        ].map((m) => (
          <div key={m.k} className="border border-frost-300/15 p-5 bg-ink-900/40 backdrop-blur-sm">
            <div className="text-frost-300/40">{m.k}</div>
            <div className="text-frost-50 mt-2 text-base normal-case font-display tracking-normal">{m.v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
