import { FrameMarkers } from '../components/FrameMarkers'
import { Scramble } from '../components/Scramble'

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="relative border border-frost-300/15 bg-ink-950/85 backdrop-blur-xl p-8 md:p-16">
        <FrameMarkers />

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-7">
            <span className="label-tag">/ Contact</span>
            <h2 className="mt-5 font-display font-light text-frost-50 text-[12vw] md:text-[6.5vw] leading-[0.9] tracking-tightest">
              <Scramble text={"Let's build\nsomething inevitable."} duration={1100} />
            </h2>
            <p className="mt-8 text-frost-100/85 leading-relaxed max-w-xl">
              Tell us who you are, what you&apos;re building, and the stakes. Every inquiry gets a personal response within forty-eight hours.
            </p>

            <div className="mt-12 space-y-6">
              <a href="mailto:hello@aurora.studio" className="block group">
                <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">Email</div>
                <div className="mt-1 font-display text-frost-50 text-2xl md:text-3xl tracking-tight group-hover:text-glacier-400 transition-colors">
                  hello@aurora.studio →
                </div>
              </a>
              <a href="#" className="block group">
                <div className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">Schedule</div>
                <div className="mt-1 font-display text-frost-50 text-2xl md:text-3xl tracking-tight group-hover:text-glacier-400 transition-colors">
                  cal.com/aurora →
                </div>
              </a>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="md:col-span-5 space-y-5 md:border-l md:border-frost-300/10 md:pl-12"
          >
            <Field label="Name" name="name" />
            <Field label="Company" name="company" />
            <Field label="Email" name="email" type="email" />
            <Field label="Budget" name="budget" />
            <Field label="Tell me about your project" name="brief" textarea />

            <button
              type="submit"
              className="w-full mt-2 font-mono text-[11px] uppercase tracking-widest2 border border-frost-100/40 text-frost-50 px-4 py-3.5 hover:bg-frost-50 hover:text-ink-950 transition-colors"
            >
              Send inquiry ↗
            </button>
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/40 leading-relaxed">
              Or email directly. Either is fine. Inquiries reviewed personally.
            </p>
          </form>
        </div>
      </div>

      <footer className="mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-frost-300/60 font-mono text-[10px] uppercase tracking-widest2">
        <div>
          <div className="text-frost-100">Aurora Studio</div>
          <div className="mt-1">© 2026 · Crafted in Kathmandu &amp; Berlin</div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#" className="hover:text-frost-50">Read.cv</a>
          <a href="#" className="hover:text-frost-50">Twitter</a>
          <a href="#" className="hover:text-frost-50">Are.na</a>
          <a href="#" className="hover:text-frost-50">GitHub</a>
        </div>
        <div>
          <span>v1.0 · WebGL · Lighthouse 98</span>
        </div>
      </footer>
    </section>
  )
}

type FieldProps = {
  label: string
  name: string
  type?: string
  placeholder?: string
  textarea?: boolean
}

function Field({ label, name, type = 'text', placeholder, textarea }: FieldProps) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest2 text-frost-300/50">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          placeholder={placeholder}
          className="mt-2 w-full bg-transparent border-b border-frost-300/15 focus:border-frost-100 outline-none py-2 text-frost-50 placeholder:text-frost-300/30 text-[15px] resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="mt-2 w-full bg-transparent border-b border-frost-300/15 focus:border-frost-100 outline-none py-2 text-frost-50 placeholder:text-frost-300/30 text-[15px]"
        />
      )}
    </label>
  )
}
