export type Service = {
  id: string
  number: string
  title: string
  copy: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    id: 'brand',
    number: '/01',
    title: 'Brand & Identity',
    copy: 'Names, marks, voice, motion principles, photography direction. Set first — everything else inherits from it.',
    deliverables: ['Strategy intensives', 'Identity system', 'Brand guidelines', 'Voice & messaging'],
  },
  {
    id: 'web',
    number: '/02',
    title: 'Web Design & Development',
    copy: 'Wireframe to production. Custom interactions, real 3D when it earns its place, performance budgets the engineering review will not kick back.',
    deliverables: ['Design systems', 'Bespoke front-end', 'WebGL & R3F', 'CMS architecture'],
  },
  {
    id: 'product',
    number: '/03',
    title: 'Product UX',
    copy: 'For SaaS, fintech, and AI tooling. Dense interfaces that operators live inside for eight hours a day.',
    deliverables: ['Information architecture', 'UX research', 'Prototype validation', 'Production handoff'],
  },
  {
    id: 'engineering',
    number: '/04',
    title: 'Creative Engineering',
    copy: 'For the work the standard stack cannot reach. GLSL, custom motion, generative assets, ML-assisted personalization.',
    deliverables: ['Shader development', 'Performance tuning', 'Generative tooling', 'Accessibility audits'],
  },
]
