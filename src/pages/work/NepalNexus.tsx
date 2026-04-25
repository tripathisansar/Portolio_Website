import { Scramble } from '../../components/Scramble'
import { RevealWords } from '../../components/RevealWords'
import { CaseStudyNav } from '../../components/CaseStudyNav'

const itinerary = [
  { day: 'Day 01', loc: 'Kathmandu → Lukla', alt: '2,860 m', body: 'Mountain flight at first light. Acclimatization walk to Phakding along the Dudh Koshi.' },
  { day: 'Day 03', loc: 'Namche Bazaar', alt: '3,440 m', body: 'Rest day. Hike up to the Everest View Hotel for the first sight of the peak.' },
  { day: 'Day 06', loc: 'Tengboche', alt: '3,860 m', body: 'Through rhododendron forest to the monastery. Evening puja with the resident monks.' },
  { day: 'Day 09', loc: 'Lobuche', alt: '4,940 m', body: 'Past the Khumbu memorials. Slow approach as oxygen drops below 60%.' },
  { day: 'Day 12', loc: 'Everest Base Camp', alt: '5,364 m', body: 'Arrival on the glacier. Two hours at the icefall before descent to Gorak Shep.' },
  { day: 'Day 14', loc: 'Kala Patthar · Sunrise', alt: '5,545 m', body: 'Pre-dawn ascent. Highest point of the trek; the only place where Everest stops hiding.' },
]

const peaks = [
  { name: 'Everest', alt: '8,849' },
  { name: 'Lhotse', alt: '8,516' },
  { name: 'Cho Oyu', alt: '8,188' },
  { name: 'Ama Dablam', alt: '6,812' },
]

export function NepalNexusPage() {
  return (
    <article className="relative">
      <header
        className="relative px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-32 min-h-[78vh] flex flex-col justify-end overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(141, 200, 211, 0.18) 0%, rgba(91, 143, 207, 0.12) 35%, rgba(5, 7, 13, 0.85) 100%)',
        }}
      >
        <svg
          className="absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          style={{ height: '40%' }}
        >
          <path
            d="M0,280 L0,180 L120,80 L210,140 L320,40 L430,160 L540,90 L660,30 L780,130 L890,70 L1010,170 L1130,90 L1250,150 L1360,80 L1440,180 L1440,280 Z"
            fill="rgba(5,7,13,0.85)"
          />
          <path
            d="M0,280 L0,220 L160,160 L260,200 L380,120 L490,200 L610,150 L740,200 L860,150 L990,210 L1120,160 L1250,210 L1360,170 L1440,220 L1440,280 Z"
            fill="rgba(5,7,13,0.95)"
          />
        </svg>

        <div className="relative z-10 max-w-6xl">
          <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-100/70 flex items-center gap-3">
            <span className="block w-8 h-px bg-frost-100/40" />
            Case study · 02 of 03 · 27°59′ N · 86°55′ E
          </div>

          <h1 className="mt-8 font-display font-light text-frost-50 text-[16vw] md:text-[10.5vw] lg:text-[8.4vw] leading-[0.92] tracking-tightest text-balance">
            <RevealWords
              wordDelay={45}
              duration={950}
              startDelay={150}
              segments={[
                { text: 'A trekking outfit\n' },
                { text: 'with the routes to match.', className: 'text-frost-100/70' },
              ]}
            />
          </h1>

          <p className="mt-10 font-display text-frost-100 text-lg md:text-xl leading-snug max-w-2xl">
            Brand and booking site for a Kathmandu-based outfitter running guided expeditions across the Khumbu, Annapurna, and Manaslu regions.
          </p>
        </div>

        <div className="relative z-10 mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 border-t border-frost-100/15 pt-6">
          {peaks.map((p) => (
            <div key={p.name}>
              <div className="font-display text-frost-50 text-2xl md:text-3xl tracking-tight">{p.alt}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-frost-100/60">{p.name} · m</div>
            </div>
          ))}
        </div>
      </header>

      <section className="relative px-6 md:px-10 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <span className="label-tag">/ The brief</span>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="font-display text-frost-50 text-2xl md:text-3xl leading-snug font-light tracking-tight">
              <RevealWords
                wordDelay={30}
                duration={780}
                text="The client guides clients who plan trips a year out and ask harder questions than most outfitters answer."
              />
            </p>
            <p className="text-frost-100/80 leading-relaxed max-w-2xl">
              The brief was to look as serious as the routes. Long-form expedition pages, real altitude profiles, and an inquiry flow that respects the fact that an EBC trek is a six-month decision, not an impulse booking.
            </p>
            <p className="text-frost-100/80 leading-relaxed max-w-2xl">
              We also rebuilt the visual identity from the ground up — wordmark, motion principles, photographic direction. Everything was held against one question: would this still feel right at 5,000 metres in February.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-16 md:py-20 border-t border-frost-300/10">
        <div className="flex items-end justify-between mb-8">
          <span className="label-tag">/ Routes — primary view</span>
          <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">
            EBC · 14 days
          </span>
        </div>

        <div
          className="relative h-[420px] md:h-[520px] border border-frost-300/15 overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(141, 200, 211, 0.08) 0%, rgba(91, 143, 207, 0.04) 50%, #05070d 100%)',
          }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 520" preserveAspectRatio="none">
            <defs>
              <linearGradient id="route-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(141,200,211,0.85)" />
                <stop offset="100%" stopColor="rgba(141,200,211,0.2)" />
              </linearGradient>
            </defs>

            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={i}
                x1={i * (1200 / 14)}
                y1={0}
                x2={i * (1200 / 14)}
                y2={520}
                stroke="rgba(199, 215, 240, 0.04)"
                strokeWidth={1}
              />
            ))}

            <path
              d="M40,420 L130,400 L220,360 L310,330 L400,310 L490,260 L580,250 L670,220 L760,200 L850,150 L940,130 L1030,90 L1120,140 L1170,100"
              fill="none"
              stroke="url(#route-line)"
              strokeWidth={2}
              strokeDasharray="6 4"
            />

            {[
              { x: 40, y: 420, name: 'Lukla', alt: '2,860' },
              { x: 220, y: 360, name: 'Namche', alt: '3,440' },
              { x: 400, y: 310, name: 'Tengboche', alt: '3,860' },
              { x: 580, y: 250, name: 'Dingboche', alt: '4,410' },
              { x: 760, y: 200, name: 'Lobuche', alt: '4,940' },
              { x: 940, y: 130, name: 'Gorak Shep', alt: '5,164' },
              { x: 1120, y: 140, name: 'EBC', alt: '5,364' },
              { x: 1170, y: 100, name: 'Kala Patthar', alt: '5,545' },
            ].map((p) => (
              <g key={p.name}>
                <circle cx={p.x} cy={p.y} r={4} fill="#f5f7fb" />
                <text
                  x={p.x}
                  y={p.y - 14}
                  fill="#e7ecf5"
                  fontSize={10}
                  fontFamily='"JetBrains Mono", monospace'
                  letterSpacing={2}
                  textAnchor="middle"
                >
                  {p.name.toUpperCase()}
                </text>
                <text
                  x={p.x}
                  y={p.y + 18}
                  fill="rgba(148, 163, 192, 0.7)"
                  fontSize={9}
                  fontFamily='"JetBrains Mono", monospace'
                  letterSpacing={2}
                  textAnchor="middle"
                >
                  {p.alt} M
                </text>
              </g>
            ))}
          </svg>

          <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">
            Elevation profile · m a.s.l.
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">
            Khumbu · Spring window
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-24 md:py-32 border-t border-frost-300/10">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <span className="label-tag">/ Sample itinerary</span>
            <h2 className="mt-5 font-display font-light text-frost-50 text-4xl md:text-5xl leading-[0.95] tracking-tight">
              <Scramble text={'Fourteen days,\nin order.'} duration={900} />
            </h2>
          </div>
          <div className="md:col-span-8 self-end">
            <p className="text-frost-100/75 leading-relaxed max-w-xl">
              Every itinerary on the site renders from the same content model: ordered days, altitude, location, and a few lines about what happens. Easy for the team to update; impossible to break.
            </p>
          </div>
        </div>

        <ol className="border-t border-frost-300/10">
          {itinerary.map((s) => (
            <li
              key={s.day}
              className="grid md:grid-cols-12 gap-4 md:gap-8 py-7 md:py-8 border-b border-frost-300/10 group"
            >
              <div className="md:col-span-2 font-mono text-[11px] uppercase tracking-widest2 text-frost-300/60">
                {s.day}
              </div>
              <div className="md:col-span-3">
                <div className="font-display text-frost-50 text-xl md:text-2xl tracking-tight">{s.loc}</div>
              </div>
              <div className="md:col-span-2 font-mono text-[11px] uppercase tracking-widest2 text-glacier-400">
                {s.alt}
              </div>
              <div className="md:col-span-5 text-frost-100/75 leading-relaxed text-[15px] max-w-prose">
                {s.body}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative px-6 md:px-10 py-24 md:py-28 border-t border-frost-300/10">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <blockquote className="border-l-2 border-frost-300/30 pl-6 py-2">
              <p className="font-display text-frost-50 text-2xl md:text-3xl leading-snug font-light italic">
                &ldquo;The new site is the first piece of marketing we&apos;ve had that the senior guides actually point clients to. Most outfitter websites lose them at the booking form. This one finishes the conversation.&rdquo;
              </p>
              <footer className="mt-5 font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60">
                — Operations lead, NepalNexus
              </footer>
            </blockquote>
          </div>
          <div className="md:col-span-5 md:border-l md:border-frost-300/10 md:pl-12 space-y-5">
            <span className="label-tag">/ Build notes</span>
            <ul className="space-y-3 font-mono text-[11px] uppercase tracking-widest2 text-frost-300/70">
              {[
                'Next.js · Sanity CMS',
                'Mapbox GL · custom style',
                'GSAP scroll telemetry',
                'Cal.com inquiry routing',
                'Vercel · ISR for itineraries',
              ].map((t) => (
                <li key={t} className="flex items-baseline gap-3">
                  <span className="text-frost-300/40">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CaseStudyNav current="nepalnexus" />
    </article>
  )
}
