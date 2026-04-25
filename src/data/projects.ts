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
    id: 'ai-image-editor',
    index: '01',
    title: 'AI Image Editor',
    client: 'Independent product · AI tooling',
    year: '2026',
    category: 'Product · AI',
    description:
      'AI image editor taken from product spec to ship. Browser-native canvas, in-page model inference, real-time tooling for masks and edits.',
    tags: ['Product', 'AI', 'React', 'TypeScript'],
    accent: 'rgba(170, 140, 220, 0.5)',
  },
  {
    id: 'nepalnexus',
    index: '02',
    title: 'NepalNexus',
    client: 'Premium Himalayan trekking · Kathmandu',
    year: '2025',
    category: 'Brand · Web',
    description:
      'Brand and booking site for a Kathmandu-based Himalayan trekking outfit. Interactive route maps, expedition pages, an inquiry flow built for travelers who plan trips a year out.',
    tags: ['Brand', 'Web', 'Maps', 'WebGL'],
    accent: 'rgba(141, 200, 211, 0.5)',
  },
  {
    id: 'envelope',
    index: '03',
    title: 'Envelope Weddings',
    client: 'Luxury wedding photography & film · Nepal',
    year: '2024',
    category: 'Brand · Editorial',
    description:
      'Portfolio site for a Nepal-based wedding photography and film studio. Full-bleed editorial gallery, an integrated film player, archives sorted by venue and season.',
    tags: ['Brand', 'Editorial', 'Web', 'Media'],
    accent: 'rgba(220, 195, 175, 0.45)',
  },
]
