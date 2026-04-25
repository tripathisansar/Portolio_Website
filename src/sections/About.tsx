import { Scramble } from '../components/Scramble'

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="flex items-end justify-between mb-10 md:mb-14 border-b border-frost-300/10 pb-6">
        <div>
          <span className="label-tag">/ Studio</span>
          <h2 className="mt-4 font-display font-light text-frost-50 text-[10vw] md:text-[5.2vw] leading-[0.95] tracking-tightest">
            <Scramble text={'A studio with\na point of view.'} duration={1000} />
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-5 space-y-6">
          <p className="font-display text-frost-50 text-2xl md:text-3xl leading-snug font-light tracking-tight">
            Aurora is a design and engineering studio shipping premium digital products for category-defining brands.
          </p>
          <p className="text-frost-100/80 leading-relaxed">
            The studio works at the seam between visual systems and the code that animates them. Brand, interface, and motion — held to one standard, built end to end.
          </p>
          <p className="text-frost-100/80 leading-relaxed">
            No account managers. No sub-agencies. Direct collaboration from kickoff to launch.
          </p>
        </div>

        <div className="md:col-span-7 space-y-10">
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-frost-300/15 p-5 bg-ink-900/40 backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">Based in</div>
              <div className="mt-2 font-display text-frost-50 text-lg">Kathmandu &amp; Berlin</div>
            </div>
            <div className="border border-frost-300/15 p-5 bg-ink-900/40 backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">Time zone</div>
              <div className="mt-2 font-display text-frost-50 text-lg">UTC+5:45 / +1</div>
            </div>
            <div className="border border-frost-300/15 p-5 bg-ink-900/40 backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">Recognition</div>
              <div className="mt-2 font-display text-frost-50 text-lg">FWA · Awwwards SOTD ×7 · CSSDA</div>
            </div>
            <div className="border border-frost-300/15 p-5 bg-ink-900/40 backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">Stack</div>
              <div className="mt-2 font-display text-frost-50 text-lg">React · R3F · GLSL · Next · Rust</div>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50 mb-4">Selected clients</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-frost-300/10 border border-frost-300/10">
              {['Guardbase', 'Meridian Capital', 'Altruvian', 'Orbital Foods', 'Helix Health', 'NeuralPath'].map((c) => (
                <div key={c} className="bg-ink-900/70 px-4 py-5 font-display text-frost-100 text-sm md:text-base text-center tracking-tight">
                  {c}
                </div>
              ))}
            </div>
          </div>

          <blockquote className="border-l-2 border-frost-300/30 pl-5 py-1">
            <p className="font-display text-frost-100 text-xl md:text-2xl leading-snug font-light italic">
              &ldquo;Aurora reset what kind of company we look like in the room. Inbound now closes deals we used to chase for months.&rdquo;
            </p>
            <footer className="mt-3 font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60">
              — CEO, Series-B AI infra
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
