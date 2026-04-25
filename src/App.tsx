import { useEffect, Suspense, lazy } from 'react'
import Lenis from '@studio-freight/lenis'
import { Leva } from 'leva'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { DevTools } from './components/DevTools'
import { Nav } from './components/Nav'
import { StatusTicker } from './components/StatusTicker'
import { RouteScroll } from './components/RouteScroll'
import { ShaderBackground } from './components/ShaderBackground'
import { aiEditorFrag } from './shaders/aiEditor'
import { nepalNexusFrag } from './shaders/nepalNexus'
import { envelopeFrag } from './shaders/envelope'
import { Home } from './pages/Home'
import { AiImageEditorPage } from './pages/work/AiImageEditor'
import { NepalNexusPage } from './pages/work/NepalNexus'
import { EnvelopePage } from './pages/work/Envelope'

const Scene = lazy(() => import('./scene/Scene').then((m) => ({ default: m.Scene })))

function RouteBackground() {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return (
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    )
  }
  if (pathname === '/work/ai-image-editor') {
    return <ShaderBackground frag={aiEditorFrag} />
  }
  if (pathname === '/work/nepalnexus') {
    return <ShaderBackground frag={nepalNexusFrag} />
  }
  if (pathname === '/work/envelope') {
    return <ShaderBackground frag={envelopeFrag} />
  }
  return null
}

function AppContent() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-frost-100">
      <Leva collapsed hidden={import.meta.env.PROD} />
      {!import.meta.env.PROD && <DevTools />}

      <RouteBackground />

      <div className="pointer-events-none fixed inset-0 z-[1] grain opacity-[0.02] mix-blend-overlay" />
      <div className="pointer-events-none fixed inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at 50% 35%, transparent 0%, transparent 30%, rgba(5,7,13,0.35) 75%, rgba(5,7,13,0.7) 100%)'
      }} />

      <RouteScroll />

      <div className="relative z-10">
        <Nav />
        <main className="pb-7">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/ai-image-editor" element={<AiImageEditorPage />} />
            <Route path="/work/nepalnexus" element={<NepalNexusPage />} />
            <Route path="/work/envelope" element={<EnvelopePage />} />
          </Routes>
        </main>
      </div>

      <StatusTicker />
    </div>
  )
}

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
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
