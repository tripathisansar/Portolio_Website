import { Link } from 'react-router-dom'

type ShotData = {
  src: string
  w: number
  h: number
  label: string
  caption: string
}

type Chapter = {
  num: string
  name: string
  line: string
  shots: ShotData[]
}

const meta = [
  { k: 'Client', v: 'Nepal Nexus · Kathmandu' },
  { k: 'Year', v: '2025' },
  { k: 'Discipline', v: 'Brand & website' },
  { k: 'Scope', v: 'Marketing site · CMS' },
]

const chapters: Chapter[] = [
  {
    num: '01',
    name: 'Home',
    line: 'One unbroken scroll that earns the inquiry — founder, routes, process and a planner, paced like a magazine.',
    shots: [
      {
        src: '/work/nepalnexus/home-founder.jpg',
        w: 2000,
        h: 1331,
        label: 'Home — the founder',
        caption:
          'The scroll opens on the founder: one portrait, three decades of guiding, and a name set large in Fraunces beside a saffron caption card.',
      },
      {
        src: '/work/nepalnexus/home-treks.jpg',
        w: 2000,
        h: 1843,
        label: 'Home — signature routes',
        caption:
          'Featured routes as cards — altitude, grade and season surfaced on the face of each one, every card a door into a deeper page.',
      },
      {
        src: '/work/nepalnexus/home-howitworks.jpg',
        w: 2000,
        h: 853,
        label: 'Home — how it works',
        caption:
          'A dark band interrupts the parchment scroll: five numbered steps, threaded on a single hairline, from first message to arrival.',
      },
      {
        src: '/work/nepalnexus/home-planner.jpg',
        w: 2000,
        h: 1113,
        label: 'Home — the planner',
        caption:
          'The inquiry is staged as a conversation — a chat mock that reframes a form as the start of a 48-hour reply.',
      },
    ],
  },
  {
    num: '02',
    name: 'Treks',
    line: 'The route index — every Himalayan trek the company runs, held in one editorial grid.',
    shots: [
      {
        src: '/work/nepalnexus/treks-intro.jpg',
        w: 2000,
        h: 565,
        label: 'Treks — the index',
        caption:
          'The catalogue opens on the house heading style — a dark line closed by a lighter saffron clause, the device repeated on every page.',
      },
      {
        src: '/work/nepalnexus/treks-grid.jpg',
        w: 2000,
        h: 2100,
        label: 'Treks — the catalogue',
        caption:
          'Six routes in one measured grid; the white card and Fraunces title hold steady whether the photograph behind is bright snow or dark rock.',
      },
    ],
  },
  {
    num: '03',
    name: 'Trek page',
    line: 'A single expedition, page-deep — a cinematic hero, the walk in long form, and a day-by-day itinerary.',
    shots: [
      {
        src: '/work/nepalnexus/trek-hero.jpg',
        w: 2000,
        h: 1065,
        label: 'Trek page — the hero',
        caption:
          'Each route opens full-bleed on its own mountain, the key figures — days, altitude, grade, price — laid across the foot of the image.',
      },
      {
        src: '/work/nepalnexus/trek-overview.jpg',
        w: 2000,
        h: 1211,
        label: 'Trek page — the walk',
        caption:
          'Route notes run in one readable column, with a sticky summary card that keeps the estimate and the inquiry in reach the whole way down.',
      },
      {
        src: '/work/nepalnexus/trek-itinerary.jpg',
        w: 2000,
        h: 2115,
        label: 'Trek page — day by day',
        caption:
          'A fourteen-day itinerary drawn from one content model — an altitude profile up top, every day expandable, the summit day flagged in saffron.',
      },
    ],
  },
  {
    num: '04',
    name: 'About',
    line: 'Who Nepal Nexus are — thirty years of guiding, set as a quiet editorial spread.',
    shots: [
      {
        src: '/work/nepalnexus/about-opening.jpg',
        w: 2000,
        h: 1794,
        label: 'About — the founder',
        caption:
          'The About page gives the founder story its own spread: a single portrait set against unhurried Fraunces headlines.',
      },
      {
        src: '/work/nepalnexus/about-certs.jpg',
        w: 2000,
        h: 707,
        label: 'About — what we can confirm',
        caption:
          'A dark panel closes the page with a deliberately honest list — what the company will stand behind, experience over inflated claims.',
      },
    ],
  },
  {
    num: '05',
    name: 'Blog',
    line: 'Field notes — route guides and seasonal advice that bring travellers in before they ask.',
    shots: [
      {
        src: '/work/nepalnexus/blog-opening.jpg',
        w: 2000,
        h: 1422,
        label: 'Blog — field notes',
        caption:
          'The journal index leads with the latest entry — a full-bleed photograph beside an editorial summary and a single read link.',
      },
      {
        src: '/work/nepalnexus/blog-featured.jpg',
        w: 2000,
        h: 1371,
        label: 'Blog — the planning guide',
        caption:
          'A slate promo panel anchors the index, carrying the cover mock of the planning guide the whole site quietly routes toward.',
      },
    ],
  },
]

const build = [
  { k: 'Framework', v: 'Next.js · React · App Router' },
  { k: 'Styling', v: 'Hand-built CSS system' },
  { k: 'Type', v: 'Fraunces · Geist · JetBrains Mono' },
  { k: 'Content', v: 'File-based content model' },
  { k: 'Data', v: 'Supabase' },
  { k: 'Images', v: 'sharp · AVIF / WebP' },
]

// running Fig. numbers across the whole showcase — computed once
let figN = 0
const numbered = chapters.map((ch) => ({
  ...ch,
  shots: ch.shots.map((s) => {
    figN += 1
    return { ...s, fig: String(figN).padStart(2, '0') }
  }),
}))

function Shot({ src, w, h, label, caption, fig }: ShotData & { fig: string }) {
  return (
    <figure className="mt-16 first:mt-12 md:mt-24 md:first:mt-16">
      <div className="overflow-hidden border border-[#15171a]/15 bg-white shadow-[0_30px_64px_-44px_rgba(21,23,26,0.5)]">
        <img
          src={src}
          width={w}
          height={h}
          alt={`Nepal Nexus website — ${label}`}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-5 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.26em] text-[#b56f1a]">
          Fig. {fig} — {label}
        </span>
        <span className="max-w-xl text-[13px] leading-relaxed text-[#15171a]/60 md:text-sm">
          {caption}
        </span>
      </figcaption>
    </figure>
  )
}

export function NepalNexusPage() {
  return (
    <article className="relative bg-[#f5f1e8] font-geist text-[#15171a]">
      {/* ——— title ——— */}
      <header className="px-6 pb-14 pt-36 md:px-10 md:pb-20 md:pt-44 lg:px-16">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#b56f1a]">
          <span className="h-px w-10 bg-[#15171a]/25" />
          Case study · Brand &amp; website
        </div>

        <h1 className="mt-10 font-fraunces text-7xl leading-[0.95] tracking-tight text-[#15171a] md:mt-14 md:text-8xl lg:text-[9.5rem]">
          Nepal Nexus
        </h1>

        <p className="mt-6 font-fraunces text-2xl italic text-[#b56f1a] md:text-3xl">
          Private Nepal treks, planned with care.
        </p>

        <dl className="mt-14 grid grid-cols-2 gap-px border border-[#15171a]/12 bg-[#15171a]/12 md:mt-20 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k} className="bg-[#f5f1e8] px-5 py-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#b56f1a]">
                {m.k}
              </dt>
              <dd className="mt-2 font-fraunces text-lg text-[#15171a] md:text-xl">{m.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ——— cover: the live home page ——— */}
      <div className="border-y border-[#15171a]/12">
        <img
          src="/work/nepalnexus/home-hero.jpg"
          width={2000}
          height={1204}
          alt="Nepal Nexus website — the home page in full"
          className="block h-auto w-full"
        />
      </div>
      <div className="px-6 pt-5 md:px-10 lg:px-16">
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#b56f1a]">
            nepalnexus.com — the home page
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#15171a]/40">
            Brand &amp; marketing site · 2025
          </span>
        </div>
      </div>

      {/* ——— overview ——— */}
      <section className="px-6 py-24 md:px-10 md:py-36 lg:px-16">
        <div className="max-w-3xl">
          <p className="font-fraunces text-3xl leading-[1.22] md:text-[2.65rem]">
            <span className="text-[#15171a]">
              Nepal Nexus plan serious treks for travellers who decide a year out.
            </span>{' '}
            <span className="font-light text-[#b56f1a]">
              The website had to read the same way — warm, unhurried, built to be trusted.
            </span>
          </p>
          <div className="mt-10 max-w-2xl space-y-5 text-[15px] leading-relaxed text-[#15171a]/65 md:text-base">
            <p>
              We designed and built the site end to end — the brand, a long marketing home, a
              full route catalogue, deep expedition pages and a journal, all set on warm
              parchment in a Fraunces and Geist type system.
            </p>
            <p>
              Every trek and journal entry is a file — ordered itinerary days, altitude, grade,
              season. The team adds a route or rewrites a price by editing content, and the
              cards, the altitude profiles and the page redraw themselves.
            </p>
          </div>
        </div>
      </section>

      {/* ——— page-by-page showcase ——— */}
      {numbered.map((ch) => (
        <section key={ch.num} className="px-6 pb-24 md:px-10 md:pb-36 lg:px-16">
          <div className="border-t border-[#15171a]/15 pt-10 md:pt-14">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#b56f1a]">
                {ch.num}
              </span>
              <h2 className="font-fraunces text-5xl leading-none text-[#15171a] md:text-7xl">
                {ch.name}
              </h2>
            </div>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#15171a]/60 md:text-base">
              {ch.line}
            </p>
          </div>

          <div className="mx-auto max-w-[1180px]">
            {ch.shots.map((s) => (
              <Shot key={s.src} {...s} />
            ))}
          </div>
        </section>
      ))}

      {/* ——— build ——— */}
      <section className="bg-[#15171a] px-6 py-24 text-[#f5f1e8] md:px-10 md:py-32 lg:px-16">
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#d68a2b]">
            06
          </span>
          <h2 className="font-fraunces text-5xl leading-none text-[#f5f1e8] md:text-7xl">
            The build
          </h2>
        </div>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="max-w-xl space-y-5 text-[15px] leading-relaxed text-[#f5f1e8]/65 md:text-base">
              <p>
                The site is a Next.js application — React with server components on the App
                Router, rendered statically so every route page loads fast and stays fully
                crawlable.
              </p>
              <p>
                There is no UI kit and no Tailwind. The interface runs on a hand-written CSS
                design system: a small set of custom properties for the parchment, ink and
                saffron palette, and one Fraunces / Geist / JetBrains Mono stack — so every page
                speaks in a single voice.
              </p>
              <p>
                Treks and journal posts are a file-based content model; Supabase backs the admin
                tools and the inquiry pipeline. Photography is pre-processed through a sharp
                pipeline into AVIF and WebP.
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <dl className="border-t border-[#f5f1e8]/15">
              {build.map((b) => (
                <div
                  key={b.k}
                  className="flex items-baseline justify-between gap-6 border-b border-[#f5f1e8]/15 py-3.5"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#d68a2b]">
                    {b.k}
                  </dt>
                  <dd className="text-right font-fraunces text-[15px] text-[#f5f1e8] md:text-base">
                    {b.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ——— next ——— */}
      <footer className="bg-[#15171a] px-6 pb-16 pt-2 text-[#f5f1e8] md:px-10 md:pb-24 lg:px-16">
        <div className="flex flex-col gap-10 border-t border-[#f5f1e8]/15 pt-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#d68a2b]">
              Next case study
            </span>
            <Link to="/work/envelope" className="group mt-3 block">
              <span className="font-fraunces text-4xl text-[#f5f1e8] transition-colors group-hover:text-[#d68a2b] md:text-6xl">
                Envelope
              </span>
            </Link>
          </div>
          <Link
            to="/#work"
            className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-[#f5f1e8]/55 transition-colors hover:text-[#f5f1e8]"
          >
            <span className="h-px w-6 bg-[#f5f1e8]/30" />
            All work
          </Link>
        </div>
      </footer>
    </article>
  )
}
