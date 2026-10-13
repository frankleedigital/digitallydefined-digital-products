// src/lib/productCatalog.js
// Single source of truth for every digital product sold in the Gumroad store.
// Each product is delivered as a route in this launcher and persists its work
// into the customer's own Puter cloud folder.

export const PRODUCTS = [
  {
    id: 'digital-superpower-quiz',
    name: 'Digital Superpower Quiz',
    tagline: 'Seven questions, one build sequence, no AI guessing.',
    description:
      'Scores your profile locally and deterministically, then saves the result and your personalized build sequence to your cloud.',
    route: '/quiz',
  },
  {
    id: 'niche-profitability-scorecard',
    name: 'Niche Profitability Scorecard',
    tagline: 'Validate a niche across six criteria in 60 seconds.',
    description:
      'Score any niche idea before you build. Every scoring run is saved to your cloud with the AI interpretation attached.',
    route: '/tools/niche',
  },
  {
    id: 'roadmap-builder',
    name: 'Roadmap Builder',
    tagline: 'Turn a superpower into a phased, actionable roadmap.',
    description:
      'Build and keep your roadmap in your own cloud so you can reopen it on any device and keep building on it.',
    route: '/tools/roadmap',
  },
  {
    id: 'product-builder',
    name: 'Digital Product Builder',
    tagline: 'Shape a product around a validated niche.',
    description:
      'Product ideas, format guidance, price ranges and launch steps — all saved per run in your cloud.',
    route: '/tools/product',
  },
  {
    id: 'social-content-pack',
    name: 'Social Content Pack',
    tagline: 'Turn a niche into a week of posts.',
    description:
      'Generate platform-specific content and keep every pack in your cloud for reuse and repurposing.',
    route: '/tools/social',
  },
  {
    id: 'trend-analyzer',
    name: 'Trend Analyzer',
    tagline: 'See what is rising before you commit.',
    description:
      'Run trend analysis for a niche and keep the snapshots in your cloud so you can compare over time.',
    route: '/tools/trends',
  },
  {
    id: 'competition-analyzer',
    name: 'Competition Analyzer',
    tagline: 'Know who you are up against.',
    description:
      'Analyze competitors in your niche and save each analysis as a timestamped run.',
    route: '/tools/competition',
  },
  {
    id: 'asset-recommender',
    name: 'Digital Asset Recommender',
    tagline: 'Which asset to build next.',
    description:
      'Get a ranked recommendation for your next digital asset, saved with the reasoning so you can revisit it.',
    route: '/tools/assets',
  },
];

export function findProduct(route) {
  return PRODUCTS.find((p) => p.route === route) || null;
}

export default PRODUCTS;