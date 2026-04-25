export type Project = {
  id: string
  index: string
  title: string
  client: string
  year: string
  category: string
  description: string
  tags: string[]
  metrics?: { label: string; value: string }[]
  accent: string
}

export const projects: Project[] = [
  {
    id: 'guardbase',
    index: '01',
    title: 'Guardbase',
    client: 'AI Agent Security Startup',
    year: '2026',
    category: 'Brand · Web · 3D',
    description:
      'Identity and launch site for an AI agent security platform. The hero is an interactive 3D terrain that reacts to live threat telemetry.',
    tags: ['Branding', 'WebGL', 'Next.js', 'R3F'],
    metrics: [
      { label: 'Lighthouse', value: '98' },
      { label: 'Conversion', value: '+220%' },
    ],
    accent: 'rgba(91, 143, 207, 0.55)',
  },
  {
    id: 'meridian',
    index: '02',
    title: 'Meridian Capital',
    client: 'Boutique Asset Management',
    year: '2025',
    category: 'Web · Editorial',
    description:
      'Editorial site and investor portal for a $4B AUM fund. Custom chart engine, scroll-driven research notes, gated quarterly letters.',
    tags: ['Editorial', 'D3', 'Next.js', 'TypeScript'],
    metrics: [
      { label: 'AUM impact', value: '$140M' },
      { label: 'Bounce rate', value: '−48%' },
    ],
    accent: 'rgba(192, 211, 255, 0.5)',
  },
  {
    id: 'altruvian',
    index: '03',
    title: 'Altruvian',
    client: 'Sustainable Architecture Studio',
    year: '2025',
    category: 'Brand · Web',
    description:
      'Portfolio site for a Pritzker-shortlisted architecture studio. WebGL parallax through building cross-sections, a GLSL material library, semantic search across the project archive.',
    tags: ['WebGL', 'GLSL', 'Vector animation'],
    metrics: [
      { label: 'Press features', value: '17' },
      { label: 'RFPs', value: '3.4×' },
    ],
    accent: 'rgba(166, 195, 168, 0.45)',
  },
  {
    id: 'orbital',
    index: '04',
    title: 'Orbital Foods',
    client: 'D2C Functional Nutrition',
    year: '2024',
    category: 'E-commerce · Brand',
    description:
      'Shopify Hydrogen storefront built like an editorial magazine. AR previews on every SKU, subscription engine that took 38% of revenue inside ninety days.',
    tags: ['Hydrogen', 'GraphQL', 'AR'],
    metrics: [
      { label: 'Revenue', value: '+312%' },
      { label: 'AOV', value: '+47%' },
    ],
    accent: 'rgba(217, 147, 95, 0.45)',
  },
  {
    id: 'helix',
    index: '05',
    title: 'Helix Health',
    client: 'Clinical AI Platform',
    year: '2024',
    category: 'Product · UX',
    description:
      'Redesigned the clinician dashboard now used at twelve US health systems. User studies clocked a 41% drop in time-to-decision.',
    tags: ['Design system', 'React', 'Charting'],
    metrics: [
      { label: 'Hospitals', value: '12' },
      { label: 'NPS lift', value: '+39' },
    ],
    accent: 'rgba(141, 200, 211, 0.45)',
  },
]
