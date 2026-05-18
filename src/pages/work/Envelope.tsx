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
  { k: 'Studio', v: 'Envelope · Kathmandu' },
  { k: 'Year', v: '2024' },
  { k: 'Discipline', v: 'Design & development' },
  { k: 'Scope', v: 'Five pages · CMS' },
]

const chapters: Chapter[] = [
  {
    num: '01',
    name: 'Home',
    line: 'One continuous scroll — from the opening still to a dense contact sheet of frames.',
    shots: [
      {
        src: '/work/envelope/home-intro.jpg',
        w: 1440,
        h: 768,
        label: 'Home — editorial intro',
        caption:
          'Two Playfair lines bracket the studio’s voice, set justified like a page of a book.',
      },
      {
        src: '/work/envelope/home-stories.jpg',
        w: 1440,
        h: 612,
        label: 'Home — featured stories',
        caption:
          'Each couple’s name is set large across the frame, lifted from the films themselves.',
      },
      {
        src: '/work/envelope/home-gallery.jpg',
        w: 1440,
        h: 1300,
        label: 'Home — contact sheet',
        caption:
          'A full-bleed grid of frames closes the page, and carries unchanged into the Gallery.',
      },
    ],
  },
  {
    num: '02',
    name: 'Stories',
    line: 'The archive — every wedding the studio has filmed, held in one quiet grid.',
    shots: [
      {
        src: '/work/envelope/stories.jpg',
        w: 1440,
        h: 1018,
        label: 'Stories — the archive',
        caption: 'Story tiles in a measured masonry; hovering lifts each name forward.',
      },
    ],
  },
  {
    num: '03',
    name: 'About',
    line: 'Who Envelope are — a single line of type, set against their own frames.',
    shots: [
      {
        src: '/work/envelope/about.jpg',
        w: 1440,
        h: 792,
        label: 'About — opening',
        caption: 'A split layout drops one quiet statement beside a motion-blurred dance frame.',
      },
      {
        src: '/work/envelope/about-team.jpg',
        w: 1440,
        h: 880,
        label: 'About — the team',
        caption: 'The studio, in matched black-and-white portraits.',
      },
    ],
  },
  {
    num: '04',
    name: 'Contact',
    line: 'An inquiry, treated as the start of a story rather than a form to fill in.',
    shots: [
      {
        src: '/work/envelope/contact.jpg',
        w: 1440,
        h: 765,
        label: 'Contact — opening',
        caption: 'Get in touch opens on a Himalayan panorama.',
      },
      {
        src: '/work/envelope/contact-form.jpg',
        w: 1440,
        h: 1240,
        label: 'Contact — the brief',
        caption:
          'A long brief with collapsing labels and custom selects, wired straight to the studio’s inbox.',
      },
    ],
  },
]

const build = [
  { k: 'Framework', v: 'Next.js · React · TypeScript' },
  { k: 'Styling', v: 'Tailwind CSS' },
  { k: 'Motion', v: 'Motion — motion/react' },
  { k: 'Content', v: 'Custom CMS · Vercel Blob' },
  { k: 'Inquiries', v: 'Resend' },
  { k: 'Images', v: 'sharp pipeline' },
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
      <div className="overflow-hidden border border-[#2a221a]">
        <img
          src={src}
          width={w}
          height={h}
          alt={`Envelope website — ${label}`}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-5 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
        <span className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-[#a8967a]">
          Fig. {fig} — {label}
        </span>
        <span className="max-w-xl text-[13px] leading-relaxed text-[#8a7a63] md:text-sm">
          {caption}
        </span>
      </figcaption>
    </figure>
  )
}

export function EnvelopePage() {
  return (
    <article className="relative bg-black text-[#e8d9c0]">
      {/* ——— title ——— */}
      <header className="px-6 pb-14 pt-36 md:px-10 md:pb-20 md:pt-48 lg:px-16">
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.34em] text-[#a8967a]">
          <span className="h-px w-10 bg-[#3a2e1f]" />
          Case study · Brand &amp; website
        </div>

        <h1 className="mt-10 font-serif text-7xl leading-[0.95] text-[#e8d9c0] md:mt-14 md:text-8xl lg:text-[9.5rem]">
          Envelope
        </h1>

        <p className="mt-6 font-serif text-2xl italic text-[#c9b48f] md:text-3xl">
          Timeless creations for iconic stories.
        </p>

        <dl className="mt-14 grid grid-cols-2 gap-px border border-[#2a221a] bg-[#2a221a] md:mt-20 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k} className="bg-black px-5 py-5">
              <dt className="text-[10px] uppercase tracking-[0.3em] text-[#a8967a]">{m.k}</dt>
              <dd className="mt-2 font-serif text-lg text-[#e8d9c0] md:text-xl">{m.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ——— cover: the live home page ——— */}
      <div className="border-y border-[#2a221a]">
        <img
          src="/work/envelope/home-hero.jpg"
          width={1440}
          height={880}
          alt="Envelope website — the home page in full"
          className="block h-auto w-full"
        />
      </div>
      <div className="px-6 pt-5 md:px-10 lg:px-16">
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#a8967a]">
            weareenvelope.com — the home page
          </span>
          <a
            href="https://weareenvelope.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.3em] text-[#c9b48f] transition-colors hover:text-[#e8d9c0]"
          >
            Visit the live site ↗
          </a>
        </div>
      </div>

      {/* ——— overview ——— */}
      <section className="px-6 py-24 md:px-10 md:py-36 lg:px-16">
        <div className="max-w-3xl">
          <p className="font-serif text-3xl leading-[1.22] text-[#e8d9c0] md:text-[2.65rem]">
            Envelope shoots weddings like cinema. Their website had to hold the same
            restraint — a dark, unhurried space that reads like a printed story.
          </p>
          <div className="mt-10 max-w-2xl space-y-5 text-[15px] leading-relaxed text-[#a8967a] md:text-base">
            <p>
              We designed and built the site end to end — five pages on a pure-black canvas,
              set in Playfair Display, paced like editorial rather than a template.
            </p>
            <p>
              Behind it runs a custom CMS. The studio publishes new stories, reorders the
              gallery, swaps photographs, and reads every inquiry themselves — with no
              developer in the loop and nothing to redeploy.
            </p>
          </div>
        </div>
      </section>

      {/* ——— page-by-page showcase ——— */}
      {numbered.map((ch) => (
        <section key={ch.num} className="px-6 pb-24 md:px-10 md:pb-36 lg:px-16">
          <div className="border-t border-[#2a221a] pt-10 md:pt-14">
            <div className="flex items-baseline gap-5">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#a8967a]">
                {ch.num}
              </span>
              <h2 className="font-serif text-5xl leading-none text-[#e8d9c0] md:text-7xl">
                {ch.name}
              </h2>
            </div>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#a8967a] md:text-base">
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
      <section className="px-6 pb-28 md:px-10 md:pb-40 lg:px-16">
        <div className="border-t border-[#2a221a] pt-10 md:pt-14">
          <div className="flex items-baseline gap-5">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#a8967a]">05</span>
            <h2 className="font-serif text-5xl leading-none text-[#e8d9c0] md:text-7xl">
              The build
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="max-w-xl space-y-5 text-[15px] leading-relaxed text-[#a8967a] md:text-base">
              <p>
                The site is a Next.js application — React and TypeScript, styled with
                Tailwind and animated with Motion. The whole interface speaks one set of
                easing curves, so a reveal feels the same on every page.
              </p>
              <p>
                Content is editable everywhere. A custom CMS on Vercel Blob lets the studio
                rewrite copy, reorder the gallery, and publish new stories. Inquiries are
                delivered by Resend; photographs are processed through a sharp pipeline.
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <dl className="border-t border-[#2a221a]">
              {build.map((b) => (
                <div
                  key={b.k}
                  className="flex items-baseline justify-between gap-6 border-b border-[#2a221a] py-3.5"
                >
                  <dt className="text-[10px] uppercase tracking-[0.28em] text-[#a8967a]">
                    {b.k}
                  </dt>
                  <dd className="text-right font-serif text-[15px] text-[#e8d9c0] md:text-base">
                    {b.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ——— next ——— */}
      <footer className="border-t border-[#2a221a] px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#a8967a]">
              Next case study
            </span>
            <Link to="/work/ai-image-editor" className="group mt-3 block">
              <span className="font-serif text-4xl text-[#e8d9c0] transition-colors group-hover:text-[#c9b48f] md:text-6xl">
                AI Image Editor
              </span>
            </Link>
          </div>
          <Link
            to="/#work"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#a8967a] transition-colors hover:text-[#e8d9c0]"
          >
            <span className="h-px w-6 bg-[#3a2e1f]" />
            All work
          </Link>
        </div>
      </footer>
    </article>
  )
}
