import { Scramble } from '../components/Scramble'
import { RevealWords } from '../components/RevealWords'

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-screen w-full flex flex-col justify-end px-6 md:px-10 pb-24 md:pb-28"
    >
      <div className="absolute top-24 md:top-28 left-6 md:left-10 z-10">
        <div className="space-y-1.5">
          <span className="label-tag block w-fit">Aurora · Studio</span>
          <span className="label-tag block w-fit">Vol. 01 · 2026</span>
        </div>
      </div>

      <div className="absolute top-24 md:top-28 right-6 md:right-10 z-10 text-right">
        <span className="label-tag inline-flex items-center gap-2">
          <span className="block w-1.5 h-1.5 rounded-full bg-glacier-400 animate-pulse-slow" />
          Available · Q3 2026
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[1400px]">
        <div className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-[10px] md:text-[11px] uppercase tracking-widest2 text-frost-300/70">
          <span className="block w-8 h-px bg-frost-300/40" />
          <Scramble text="Design + engineering studio" trigger="mount" duration={900} />
        </div>

        <h1 className="font-display font-light text-frost-50 leading-[1.02] tracking-tightest text-balance text-[12vw] md:text-[8.4vw] lg:text-[7.2vw]">
          <RevealWords
            wordDelay={45}
            duration={900}
            startDelay={150}
            segments={[
              { text: 'End-to-end web design\n' },
              { text: '+ development.', className: 'text-frost-300/60' },
            ]}
          />
        </h1>

        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
          <p className="font-display text-frost-100 text-lg md:text-xl leading-snug max-w-xl">
            Strategy, design, and production code — from the same studio.
          </p>

          <a
            href="#work"
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-frost-300 hover:text-frost-50 transition-colors w-fit md:self-end"
          >
            <span className="block w-8 h-px bg-frost-300/40 group-hover:bg-frost-50 group-hover:w-12 transition-all" />
            Selected work
            <span className="block w-1 h-1 rounded-full bg-frost-100 animate-pulse-slow" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-10 right-6 md:right-10 flex items-end justify-between text-frost-300/70 font-mono text-[10px] uppercase tracking-widest2 z-10">
        <div className="flex gap-6">
          <span>Lat 27°59′ N</span>
          <span>Lon 86°55′ E</span>
        </div>
        <div className="flex gap-6">
          <span>Index 01 / 06</span>
          <span>Section · Hero</span>
        </div>
      </div>
    </section>
  )
}
