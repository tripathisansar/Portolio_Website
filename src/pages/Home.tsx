import { Hero } from '../sections/Hero'
import { Manifesto } from '../sections/Manifesto'
import { Work } from '../sections/Work'
import { Services } from '../sections/Services'
import { Process } from '../sections/Process'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Work />
      <Services />
      <Process />
      <About />
      <Contact />
    </>
  )
}
