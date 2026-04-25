export function Nav() {
  const links = [
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 pt-6 mix-blend-difference">
      <div className="flex items-center justify-between text-frost-50">
        <a href="#top" className="font-mono text-[11px] uppercase tracking-widest2">
          <span className="block leading-tight">Aurora Studio</span>
          <span className="block leading-tight text-frost-300/80">Design & Engineering</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest2">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-frost-100 hover:text-frost-50 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="font-mono text-[11px] uppercase tracking-widest2 border border-frost-100/40 px-3 py-1.5 hover:bg-frost-50 hover:text-ink-950 transition-colors"
        >
          Book a call ↗
        </a>
      </div>
    </header>
  )
}
