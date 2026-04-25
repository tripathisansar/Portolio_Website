import { Scramble } from '../components/Scramble'

const steps = [
  {
    n: '01',
    title: 'Strategy intensive',
    days: 'Week 1 — 2',
    body: 'Two-week paid sprint. Stakeholder interviews, audit, positioning, narrative architecture. Ends in a written direction your team can act on whether or not we continue.',
  },
  {
    n: '02',
    title: 'Design system',
    days: 'Week 3 — 6',
    body: 'Type, motion, photography direction, component library. Built in Figma against the live front-end so what you see is what we ship.',
  },
  {
    n: '03',
    title: 'Build',
    days: 'Week 6 — 14',
    body: 'Production-grade code from day one — no throwaway prototypes. Weekly demos, async Slack standups, full ownership of the front-end repo.',
  },
  {
    n: '04',
    title: 'Launch & beyond',
    days: 'Week 14+',
    body: 'Performance audits, A/B test instrumentation, analytics integration. Optional retainer for ongoing creative direction.',
  },
]

export function Process() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="flex items-end justify-between mb-10 md:mb-14 border-b border-frost-300/10 pb-6">
        <div>
          <span className="label-tag">/ Process</span>
          <h2 className="mt-4 font-display font-light text-frost-50 text-[10vw] md:text-[5.2vw] leading-[0.95] tracking-tightest">
            <Scramble text="How we work." duration={900} />
          </h2>
        </div>
        <span className="hidden md:inline-block label-tag">Linear · Notion · Slack · Figma</span>
      </div>

      <ol className="grid md:grid-cols-4 gap-px bg-frost-300/10 border border-frost-300/10">
        {steps.map((s) => (
          <li key={s.n} className="bg-ink-900/70 backdrop-blur-sm p-7 md:p-8">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] tracking-widest2 text-frost-300/70">{s.n}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/40">{s.days}</span>
            </div>
            <h3 className="mt-6 font-display font-light text-frost-50 text-2xl tracking-tight leading-tight">
              {s.title}
            </h3>
            <p className="mt-4 text-frost-100/75 leading-relaxed text-[15px]">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
