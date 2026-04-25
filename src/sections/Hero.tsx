export function Hero() {
  return (
    <section id="top" className="relative h-screen w-full flex items-center px-6 md:px-10">
      <div className="absolute top-24 md:top-28 left-6 md:left-10 z-10">
        <div className="space-y-1.5">
          <span className="label-tag block w-fit">Aurora · Studio</span>
          <span className="label-tag block w-fit">2026 Showcase</span>
        </div>
      </div>

      <div className="absolute top-24 md:top-28 right-6 md:right-10 z-10 text-right">
        <div className="space-y-1.5 flex flex-col items-end">
          <span className="label-tag w-fit">Premium Web Design & Development</span>
          <span className="label-tag w-fit">3D · WebGL · Brand</span>
          <span className="label-tag w-fit">Available · Q3 2026</span>
        </div>
      </div>

      <div className="relative z-10 w-full">
        <h1 className="font-display font-light text-frost-50 leading-[0.88] tracking-tightest text-balance text-[14vw] md:text-[12vw] lg:text-[11vw]">
          Aurora
        </h1>
        <div className="mt-6 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="bg-ink-950/70 backdrop-blur-sm border border-frost-300/15 px-4 py-3 max-w-md">
            <p className="text-frost-100 font-display text-base md:text-lg leading-snug">
              Premium web design & development<br />for ambitious brands and operators.
            </p>
          </div>

          <div className="flex items-center gap-3 text-frost-300 font-mono text-[11px] uppercase tracking-widest2">
            <span className="w-8 h-px bg-frost-300/40" />
            <span>Scroll</span>
            <span className="block w-1 h-1 rounded-full bg-frost-100 animate-pulse-slow" />
          </div>
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
