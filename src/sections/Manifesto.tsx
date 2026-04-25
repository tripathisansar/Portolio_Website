import { RevealWords } from '../components/RevealWords'

export function Manifesto() {
  return (
    <section className="relative py-32 md:py-44 px-6 md:px-10">
      <div className="absolute top-0 left-6 md:left-10">
        <span className="label-tag">/ Manifesto</span>
      </div>

      <div className="max-w-5xl">
        <p className="font-display font-light text-frost-50 leading-[1.05] tracking-tight text-balance text-[6vw] md:text-[3.6vw] lg:text-[3vw]">
          <RevealWords
            wordDelay={28}
            duration={820}
            segments={[
              { text: 'The internet is full of templated work. ' },
              { text: "Our clients aren't templated brands. ", className: 'text-frost-300/70' },
              { text: 'Every site we ship is engineered to feel inevitable — visually authoritative, technically pristine, load-tested for the boardroom.' },
            ]}
          />
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-frost-300/10 pt-10">
        {[
          { k: '11', v: 'years shipping' },
          { k: '47', v: 'engagements' },
          { k: '0', v: 'templates shipped' },
          { k: '98', v: 'avg. lighthouse' },
        ].map((m) => (
          <div key={m.v}>
            <div className="font-display text-3xl md:text-4xl text-frost-50">{m.k}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60 mt-2">{m.v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
