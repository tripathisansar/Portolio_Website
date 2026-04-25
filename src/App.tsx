import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Leva } from 'leva'
import { Scene } from './scene/Scene'
import { DevTools } from './components/DevTools'
import { Nav } from './components/Nav'
import { StatusTicker } from './components/StatusTicker'
import { Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { Work } from './sections/Work'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Contact } from './sections/Contact'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-ink-950 text-frost-100">
      <Leva collapsed hidden={import.meta.env.PROD} />
      {!import.meta.env.PROD && <DevTools />}
      <Scene />

      <div className="pointer-events-none fixed inset-0 z-[1] grain opacity-[0.02] mix-blend-overlay" />
      <div className="pointer-events-none fixed inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at 50% 35%, transparent 0%, transparent 30%, rgba(5,7,13,0.35) 75%, rgba(5,7,13,0.7) 100%)'
      }} />

      <div className="relative z-10">
        <Nav />
        <main className="pb-7">
          <Hero />
          <Manifesto />
          <Work />
          <Services />
          <Process />
          <About />
          <Contact />
        </main>
      </div>

      <StatusTicker />
    </div>
  )
}

export default App
