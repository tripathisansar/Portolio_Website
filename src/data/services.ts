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
    copy: 'Names, marks, tone, motion principles, photography direction. The strategic substrate every screen and page is built on.',
    deliverables: ['Strategy intensives', 'Identity system', 'Brand guidelines', 'Voice & messaging'],
  },
  {
    id: 'web',
    number: '/02',
    title: 'Web Design & Development',
    copy: 'End-to-end. From wireframe to deploy. Custom interactions, immersive 3D, performance budgets that hold up under audit.',
    deliverables: ['Design systems', 'Bespoke front-end', 'WebGL & R3F', 'CMS architecture'],
  },
  {
    id: 'product',
    number: '/03',
    title: 'Product UX',
    copy: 'For SaaS, fintech, and AI tooling. Information-dense, decision-critical interfaces designed for daily-active power users.',
    deliverables: ['Information architecture', 'UX research', 'Prototype validation', 'Production handoff'],
  },
  {
    id: 'engineering',
    number: '/04',
    title: 'Creative Engineering',
    copy: 'When the off-the-shelf stack runs out of road. GLSL, custom motion systems, generative assets, ML-aided personalization.',
    deliverables: ['Shader development', 'Performance tuning', 'Generative tooling', 'Accessibility audits'],
  },
]
