import { Scramble } from '../../components/Scramble'
import { RevealWords } from '../../components/RevealWords'
import { FrameMarkers } from '../../components/FrameMarkers'
import { CaseStudyNav } from '../../components/CaseStudyNav'

const meta = [
  { k: 'Year', v: '2026' },
  { k: 'Status', v: 'Private beta' },
  { k: 'Role', v: 'Product · Design · Engineering' },
  { k: 'Stack', v: 'React · TS · WebGPU' },
]

const features = [
  {
    n: '/01',
    title: 'Mask refinement',
    body: 'On-device segmentation with sub-pixel feathering. The mask updates as fast as you brush, no round-trip to a server.',
    bullets: ['SAM2 quantized to int8', 'WebGPU compute', 'Live brush feedback'],
  },
  {
    n: '/02',
    title: 'Prompt-driven edits',
    body: 'Type what you want changed. Diffusion runs in the page; nothing leaves the browser unless you ship the export.',
    bullets: ['Local SDXL turbo', 'Region-locked sampling', 'Seed lock per layer'],
  },
  {
    n: '/03',
    title: 'Batch export',
    body: 'Apply the same edit pipeline to a folder. Output is deterministic — same seed, same crop, same model, every time.',
    bullets: ['CLI + UI parity', 'Metadata sidecar', 'Resumable pipeline'],
  },
]

export function AiImageEditorPage() {
  return (
    <article className="relative">
      <header className="relative px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-20 border-b border-frost-300/10">
        <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60 flex items-center gap-3">
          <span className="block w-8 h-px bg-frost-300/40" />
          Case study · 01 of 03
        </div>

        <h1 className="mt-8 font-display font-light text-frost-50 text-[14vw] md:text-[9.6vw] lg:text-[8vw] leading-[0.92] tracking-tightest text-balance">
          <RevealWords
            wordDelay={40}
            duration={900}
            startDelay={120}
            segments={[
              { text: 'AI image editor\n' },
              { text: 'in the browser.', className: 'text-frost-300/60' },
            ]}
          />
        </h1>

        <div className="mt-12 grid md:grid-cols-4 gap-px bg-frost-300/10 border border-frost-300/10">
          {meta.map((m) => (
            <div key={m.k} className="bg-ink-900/70 backdrop-blur-sm px-5 py-4">
              <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">{m.k}</div>
              <div className="mt-1 font-display text-frost-50 text-base">{m.v}</div>
            </div>
          ))}
        </div>
      </header>

      <section className="relative px-6 md:px-10 py-16 md:py-24">
        <div className="relative border border-frost-300/15 bg-ink-950/85 backdrop-blur-md">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-frost-300/10 bg-ink-900/60">
            <span className="block w-2.5 h-2.5 rounded-full bg-frost-300/30" />
            <span className="block w-2.5 h-2.5 rounded-full bg-frost-300/30" />
            <span className="block w-2.5 h-2.5 rounded-full bg-frost-300/30" />
            <div className="ml-4 flex-1 font-mono text-[10px] tracking-widest2 text-frost-300/50">
              ./editor — masks/portrait_03.png
            </div>
            <span className="font-mono text-[10px] tracking-widest2 text-frost-300/40">webgpu · 60fps</span>
          </div>

          <div className="grid grid-cols-12 min-h-[420px] md:min-h-[560px]">
            <aside className="col-span-2 border-r border-frost-300/10 bg-ink-900/40 p-3 space-y-2">
              {['Brush', 'Mask', 'Erase', 'Prompt', 'Hand', 'Crop'].map((t, i) => (
                <div
                  key={t}
                  className={`font-mono text-[10px] uppercase tracking-widest2 px-2 py-2 border ${
                    i === 1 ? 'border-frost-100/30 text-frost-50 bg-ink-800/60' : 'border-transparent text-frost-300/50'
                  }`}
                >
                  {t}
                </div>
              ))}
            </aside>

            <div
              className="col-span-7 relative"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 35%, rgba(170, 140, 220, 0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(91, 143, 207, 0.2) 0%, transparent 55%), linear-gradient(180deg, #12172a 0%, #0a0e1a 100%)',
              }}
            >
              <div className="absolute inset-6 border border-dashed border-frost-300/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest2 text-frost-300/40">
                canvas · 4096 × 4096
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest2 text-frost-300/40">
                rgb · srgb · 16-bit
              </div>
              <div className="absolute top-3 right-3 font-mono text-[10px] tracking-widest2 text-frost-300/40">
                100% · fit
              </div>
            </div>

            <aside className="col-span-3 border-l border-frost-300/10 bg-ink-900/40 p-4 space-y-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">Layer</div>
                <div className="mt-1 text-frost-50 text-sm">portrait_03</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">Prompt</div>
                <div className="mt-1 text-frost-100/80 text-sm font-mono">
                  &gt; soft window light, slight rim
                </div>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-frost-300/10">
                {[
                  ['Strength', '0.62'],
                  ['Steps', '8'],
                  ['Seed', '4519'],
                  ['Model', 'sdxl-turbo'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between font-mono text-[10px] tracking-widest2">
                    <span className="text-frost-300/50 uppercase">{k}</span>
                    <span className="text-frost-50">{v}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">
          <span>Fig. 01 — primary editor surface</span>
          <span>2026.04</span>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-20 md:py-28 border-t border-frost-300/10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <span className="label-tag">/ The build</span>
            <h2 className="mt-5 font-display font-light text-frost-50 text-4xl md:text-5xl leading-[0.95] tracking-tight">
              <Scramble text={'Edits that\nstay local.'} duration={900} />
            </h2>
          </div>
          <div className="md:col-span-8 space-y-5 text-frost-100/80 leading-relaxed">
            <p>
              The premise is that the image never has to leave the page. Models load once into the browser&apos;s GPU memory; subsequent edits run in milliseconds. Privacy and latency stop being a tradeoff.
            </p>
            <p>
              The hard parts were three: getting SAM2 small enough to ship in a web bundle, scheduling diffusion against the user&apos;s wheel events without locking the canvas, and writing a layer engine that thinks in masks instead of pixels.
            </p>
            <p>
              The product surface is intentionally narrow. One canvas, six tools, one prompt field. Everything you do is reversible, including the prompts.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-20 md:py-28 border-t border-frost-300/10">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <span className="label-tag">/ Inside the canvas</span>
          <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">
            Three primary surfaces
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-frost-300/10 border border-frost-300/10">
          {features.map((f) => (
            <div key={f.n} className="bg-ink-900/70 backdrop-blur-sm p-7 md:p-8">
              <div className="font-mono text-[11px] tracking-widest2 text-frost-300/70">{f.n}</div>
              <h3 className="mt-7 font-display font-light text-frost-50 text-2xl md:text-3xl leading-tight tracking-tight">
                {f.title}
              </h3>
              <p className="mt-4 text-frost-100/75 leading-relaxed text-[15px]">{f.body}</p>
              <ul className="mt-7 space-y-2 border-t border-frost-300/10 pt-5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-widest2 text-frost-300/70">
                    <span className="text-frost-300/40">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-20 md:py-24 border-t border-frost-300/10">
        <div className="relative border border-frost-300/15 bg-ink-950/85 backdrop-blur-md p-8 md:p-12">
          <FrameMarkers />
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <span className="label-tag">/ Status</span>
              <h3 className="mt-4 font-display font-light text-frost-50 text-3xl md:text-4xl leading-tight tracking-tight">
                In private beta. Onboarding designers and photo retouchers one at a time.
              </h3>
            </div>
            <div className="md:col-span-5">
              <p className="text-frost-100/80 leading-relaxed">
                The beta cohort is closed for now. If you have a real workflow that gets stuck waiting on cloud round-trips and want to test against it, get in touch — we read every note.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyNav current="ai-image-editor" />
    </article>
  )
}
