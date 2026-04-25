import { Scramble } from '../../components/Scramble'
import { RevealWords } from '../../components/RevealWords'
import { CaseStudyNav } from '../../components/CaseStudyNav'

const gallery = [
  { span: 'col-span-12 md:col-span-8 row-span-2', aspect: 'aspect-[4/3]', tone: 'rgba(220, 195, 175, 0.6)', label: 'Pokhara · Lakeside · 2024' },
  { span: 'col-span-6 md:col-span-4', aspect: 'aspect-square', tone: 'rgba(238, 218, 200, 0.5)', label: 'Bhaktapur · Patan' },
  { span: 'col-span-6 md:col-span-4', aspect: 'aspect-[3/4]', tone: 'rgba(199, 162, 130, 0.5)', label: 'Gokarna Forest' },
  { span: 'col-span-12 md:col-span-5', aspect: 'aspect-[4/5]', tone: 'rgba(232, 207, 188, 0.5)', label: 'Nagarkot Sunrise' },
  { span: 'col-span-12 md:col-span-7', aspect: 'aspect-[16/10]', tone: 'rgba(214, 184, 158, 0.55)', label: 'Boudha · Ceremonial' },
  { span: 'col-span-6 md:col-span-3', aspect: 'aspect-square', tone: 'rgba(245, 222, 199, 0.55)', label: 'Detail · Hands' },
  { span: 'col-span-6 md:col-span-3', aspect: 'aspect-square', tone: 'rgba(208, 178, 154, 0.5)', label: 'Detail · Knot' },
  { span: 'col-span-12 md:col-span-6', aspect: 'aspect-[3/2]', tone: 'rgba(225, 199, 178, 0.5)', label: 'Reception · Dwarika&apos;s' },
]

export function EnvelopePage() {
  return (
    <article className="relative">
      <header className="relative px-6 md:px-10 pt-32 md:pt-44 pb-24 md:pb-32">
        <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60 flex items-center gap-3">
          <span className="block w-8 h-px bg-frost-300/40" />
          Case study · 03 of 03 · Photography & film
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-10 md:gap-12 items-end">
          <div className="md:col-span-7">
            <h1 className="font-display font-light text-frost-50 text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[0.86] tracking-tightest">
              <RevealWords
                wordDelay={50}
                duration={1000}
                startDelay={150}
                segments={[
                  { text: 'Envelope', className: 'italic' },
                ]}
              />
            </h1>
            <p className="mt-6 font-display font-light text-frost-100/80 text-2xl md:text-3xl tracking-tight italic">
              Weddings &middot; Nepal &middot; 2024
            </p>
          </div>

          <div className="md:col-span-5">
            <div
              className="relative aspect-[3/4] w-full"
              style={{
                background:
                  'linear-gradient(160deg, rgba(245, 222, 199, 0.65) 0%, rgba(199, 162, 130, 0.5) 60%, rgba(120, 90, 70, 0.4) 100%)',
              }}
            >
              <div className="absolute inset-4 border border-frost-50/20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-widest2 text-frost-50/80">
                <span>Plate 01</span>
                <span>Frame · 6 × 4.5</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative px-6 md:px-10 py-24 md:py-32 border-t border-frost-300/10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="label-tag">/ The brief</span>
          <p className="mt-8 font-display font-light text-frost-50 text-2xl md:text-3xl leading-relaxed tracking-tight">
            <RevealWords
              wordDelay={28}
              duration={820}
              text="A site that reads like a magazine and feels like a film. Built for couples who book a year out and want to spend an evening reading every page."
            />
          </p>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-12 md:py-16">
        <div className="flex items-end justify-between mb-8">
          <span className="label-tag">/ Gallery — Spring &apos;24</span>
          <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">
            Eight plates · selected
          </span>
        </div>

        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {gallery.map((g, i) => (
            <figure
              key={i}
              className={`${g.span} group relative overflow-hidden`}
            >
              <div
                className={`relative ${g.aspect} w-full`}
                style={{
                  background: `linear-gradient(${135 + i * 12}deg, ${g.tone} 0%, rgba(120, 90, 70, 0.35) 100%)`,
                }}
              >
                <div className="absolute inset-3 border border-frost-50/15 group-hover:border-frost-50/40 transition-colors" />
                <figcaption className="absolute bottom-3 left-3 right-3 flex items-end justify-between font-mono text-[9px] uppercase tracking-widest2 text-frost-50/75">
                  <span>{`Plate · ${(i + 1).toString().padStart(2, '0')}`}</span>
                  <span className="opacity-70">{g.label}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-32 md:py-44">
        <blockquote className="max-w-4xl mx-auto text-center">
          <div className="font-display font-light text-frost-300/40 text-7xl leading-none mb-6">&ldquo;</div>
          <p className="font-display font-light text-frost-50 text-3xl md:text-5xl leading-[1.15] tracking-tight italic text-balance">
            <RevealWords
              wordDelay={40}
              duration={900}
              text="The site finishes the wedding for you. Half our guests went home and read it the way you read a book."
            />
          </p>
          <footer className="mt-10 font-mono text-[10px] uppercase tracking-widest2 text-frost-300/60">
            — Couple, Patan ceremony · 2024
          </footer>
        </blockquote>
      </section>

      <section className="relative px-6 md:px-10 py-20 md:py-24 border-t border-frost-300/10">
        <div className="flex items-end justify-between mb-8">
          <span className="label-tag">/ Film</span>
          <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">
            One per ceremony · 4 — 7 minutes
          </span>
        </div>

        <div
          className="relative aspect-[16/9] w-full border border-frost-300/15"
          style={{
            background:
              'linear-gradient(135deg, rgba(80, 60, 50, 0.85) 0%, rgba(120, 90, 70, 0.7) 50%, rgba(40, 28, 22, 0.95) 100%)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-frost-50/40 flex items-center justify-center backdrop-blur-sm bg-ink-950/30">
              <div className="w-0 h-0 border-l-[18px] border-l-frost-50 border-y-[12px] border-y-transparent ml-1" />
            </div>
          </div>

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest2 text-frost-50/70">
            <span>Reel · 04</span>
            <span>4K · 24 fps · ProRes</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest2 text-frost-50/70">
            <span>Pokhara · 06.04.2024</span>
            <span>06:42</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/2]"
              style={{
                background: `linear-gradient(${120 + i * 10}deg, rgba(214, 184, 158, ${0.35 + (i % 3) * 0.1}) 0%, rgba(80, 60, 50, 0.6) 100%)`,
              }}
            />
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-24 md:py-28 border-t border-frost-300/10">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="label-tag">/ How it&apos;s organized</span>
            <h2 className="mt-5 font-display font-light text-frost-50 text-3xl md:text-4xl leading-tight tracking-tight italic">
              <Scramble text={'Plates, not posts.'} duration={900} />
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-frost-100/80 leading-relaxed">
            <p>
              The CMS thinks in plates and ceremonies, not in blog posts. Each ceremony is a single object with photo plates, film reels, location, season, and the names of the couple. The site composes everything else.
            </p>
            <p>
              Photos load progressively from a Cloudflare edge cache. Films stream from Mux. Both stay sharp on the kind of widescreen displays the studio shoots for, and stay light on a phone in a cab.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-frost-300/70">
              Sanity · Next 14 · Mux · Cloudflare Images · GSAP
            </p>
          </div>
        </div>
      </section>

      <CaseStudyNav current="envelope" />
    </article>
  )
}
