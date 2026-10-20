// src/lib/products.js
// Comprehensive manifest of every digital product from the DigitallyDefined
// audited catalog. Every product is organized into one of three buckets,
// matching the audited list you provided:
//   1. Live & Monetizable  - ship this week, already selling or ready to list
//   2. Backend Microservices - built, not yet surfaced to buyers
//   3. Placeholders        - coming soon (front-end cards only, backend exists)
//
// Each product carries: id, name, tagline, description, category, status,
// audience, monetization, route, implementation.
//
// The storefront launcher (App.jsx) reads PRODUCTS from this file and renders
// one route per product. Persistence is delegated to the shared saveState()
// hook so every product keeps its own namespace.

export const PRODUCT_CATEGORIES = {
  LIVE: 'Live & Monetizable',
  BACKEND: 'Backend Microservices',
  PLACEHOLDER: 'Placeholders',
};

export const PRODUCT_STATUS = {
  LIVE: 'live',
  BACKEND: 'backend',
  PLACEHOLDER: 'placeholder',
};

export const PRODUCTS = [
  {
    id: 'digital-superpower-quiz',
    name: 'Digital Superpower Quiz -> Personalized Roadmap',
    tagline: 'Seven questions, one build sequence, no AI guessing.',
    description:
      'Scores your profile locally and deterministically, then saves the result and your personalized build sequence to your cloud.',
    category: PRODUCT_CATEGORIES.LIVE,
    status: PRODUCT_STATUS.LIVE,
    audience: 'Gen X women, career-changers, self-directed learners',
    monetization: 'Free quiz (lead magnet) -> paid personalized roadmap report',
    route: '/quiz',
    implementation: 'digitallydefined-os-backend/src/agents/quiz.js',
  },
  {
    id: 'niche-profitability-scorecard',
    name: 'Niche Profitability Scorecard',
    tagline: 'Validate a niche across six criteria in 60 seconds.',
    description:
      'Score any niche idea before you build. Every scoring run is saved to your cloud with the AI interpretation attached.',
    category: PRODUCT_CATEGORIES.LIVE,
    status: PRODUCT_STATUS.LIVE,
    audience: 'Faceless founders, affiliate marketers, niche researchers',
    monetization: 'Free -> Pro $9-19/mo',
    route: '/tools/niche',
    implementation: 'digitallydefined-os-backend/src/agents/scorecard.js',
  },
  {
    id: 'hermes-ai-mentor',
    name: 'Hermes AI Mentor',
    tagline: 'A proactive coach that probes status before it asks.',
    description:
      'Live-analytics-grounded mentoring agent with a persistent state probe. License-gated today, subscription-ready.',
    category: PRODUCT_CATEGORIES.LIVE,
    status: PRODUCT_STATUS.LIVE,
    audience: 'Coaches, service businesses, creators',
    monetization: '$29-99/mo subscription (license-gated today)',
    route: '/hermes',
    implementation: 'Hermes/skills/digital-wealth-tools + digitallydefined-os-backend/src/services/antigravity.js',
  },
  {
    id: 'tenx-roi-calculator',
    name: '10x ROI Calculator',
    tagline: 'Free tier / Full tier on Gumroad.',
    description:
      'Instant ROI projection that doubles as the dashboard lead-capture engine. Free snapshot, paid full report.',
    category: PRODUCT_CATEGORIES.LIVE,
    status: PRODUCT_STATUS.LIVE,
    audience: 'Small-business owners, local service providers',
    monetization: 'Free tier -> paid full tier $27-47 (Gumroad)',
    route: '/calculators/roi',
    implementation: 'digitallydefined-dashboard/src/pages/ThankYouCalculatorPage.jsx + digitallydefined-online-local',
  },
  {
    id: 'digital-business-os',
    name: 'Digital Business OS (Notion system)',
    tagline: 'Eight databases + workspace architect, packaged for Gumroad.',
    description:
      'The master Notion workspace: 8 databases, setup checklist, 90-day content plan, and a walkthrough video. Top price tier ($67-197).',
    category: PRODUCT_CATEGORIES.LIVE,
    status: PRODUCT_STATUS.LIVE,
    audience: 'Faceless creators, freelancers, coaches (women 40+)',
    monetization: 'One-time $97-197 + $19-39/mo subscription box',
    route: '/business-os',
    implementation: 'digitallydefined-dashboard (NotionTab) + digitallydefined-os-backend (notion.js)',
  },
  {
    id: 'intelligence-package',
    name: 'Intelligence Package',
    tagline: 'Ten views into trends, competition, opportunities, audience, roadmap.',
    description:
      'A differentiated 10-view intelligence report delivered behind the quiz funnel. License-gated report, high differentiation.',
    category: PRODUCT_CATEGORIES.LIVE,
    status: PRODUCT_STATUS.LIVE,
    audience: 'Digital sellers, product creators, coaches',
    monetization: 'Free quiz -> paid 10-view report $49-99 (license-gated)',
    route: '/intelligence',
    implementation: 'digitallydefined-os-backend/src/workflows/intelligencePipeline.js + digitallydefined-dashboard/src/pages/IntelligencePage.jsx',
  },
  {
    id: 'ai-business-partner',
    name: 'AI Business Partner',
    tagline: 'Live-analytics-grounded assistant, premium-gated.',
    description:
      'Premium AI assistant that grounds answers in live data. Subscription-guarded today; will become a dedicated license checkout.',
    category: PRODUCT_CATEGORIES.LIVE,
    status: PRODUCT_STATUS.LIVE,
    audience: 'Coaches, service businesses, creators',
    monetization: '$29-99/mo subscription (license-gated today)',
    route: '/ai-partner',
    implementation: 'Hermes/skills/digital-wealth-tools + digitallydefined-os-backend/src/services/antigravity.js',
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard + AI recommendations',
    tagline: 'Live telemetry, automated recommendations, white-labellable.',
    description:
      'Paid SaaS app surface: live analytics, growth tabs, automation monitor, and AI recommendations. Doubles as the 10x ROI lead engine.',
    category: PRODUCT_CATEGORIES.LIVE,
    status: PRODUCT_STATUS.LIVE,
    audience: 'Small businesses, local service providers',
    monetization: '$19-49/mo subscription + bundle offers',
    route: '/analytics',
    implementation: 'digitallydefined-dashboard (DashboardPage, AnalyticsPage, GrowthTab, AutomationsPage)',
  },
  {
    id: 'reputation-command-center',
    name: 'Reputation Command Center + Automation Monitor',
    tagline: 'Local-reputation suite, white-label ready.',
    description:
      'Reputation command center, automation monitor, and white-label config system in one package. Monetized as a bundle or B2B subscription.',
    category: PRODUCT_CATEGORIES.LIVE,
    status: PRODUCT_STATUS.LIVE,
    audience: 'Local businesses, agencies (white-label)',
    monetization: '$29-99/mo + B2B contracts',
    route: '/reputation',
    implementation: 'digitallydefined-dashboard (AutomationsPage, Reputation) + workspace/buzz-agents/reputation-intelligence',
  },
  {
    id: 'wealth-calculator',
    name: 'Wealth Calculator',
    tagline: 'Retirement gap and wealth accumulation, in one place.',
    description:
      'Deterministic calculator for wealth accumulation and the retirement gap. Turns the retirement gap narrative into a first-party lead magnet.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Digital sellers, pre-retirees (Gen X women 45-59)',
    monetization: 'Bundle with Asset Plan / 10x ROI',
    route: '/calculators/wealth',
    implementation: 'workspace/buzz-agents/digital-wealth-calculator',
  },
  {
    id: 'trends-api',
    name: 'Trends API',
    tagline: 'Up-and-coming topics, surfaced before you commit.',
    description:
      'Trend analysis engine for a niche, snapshotted and timestamped. API already built; front-end subscription dashboard needed.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Niche researchers, product creators, agencies',
    monetization: 'Subscription $19-39/mo + lifetime',
    route: '/api/trends',
    implementation: 'digitallydefined-os-backend/src/agents/trends.js + workspace/buzz-agents',
  },
  {
    id: 'rank-and-rent-analyzer',
    name: 'Rank-and-Rent Analyzer',
    tagline: 'Local SEO opportunity scoring, ready for white-label.',
    description:
      'Scores local rank-and-rent opportunities and produces a plan. Built; needs clearer positioning before direct sales.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Local SEO practitioners, rank-and-rent builders',
    monetization: 'One-time $49-99 or white-label API',
    route: '/analyzers/rankandrent',
    implementation: 'workspace/buzz-agents/ai-rankand-rent-builder + digitallydefined-os-backend',
  },
  {
    id: 'product-generator',
    name: 'Product Generator',
    tagline: 'Validate a product around a validated niche.',
    description:
      'Product ideas, format guidance, price ranges, and launch steps - saved per run in the customer cloud.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'New digital sellers',
    monetization: 'Free (lead magnet) + paid batch reports',
    route: '/tools/product',
    implementation: 'digitallydefined-os-backend/src/agents/product.js',
  },
  {
    id: 'offer-architect',
    name: 'Offer Architect',
    tagline: 'Shape a high-converting offer around any niche.',
    description:
      'Generates offers, pricing, and launch steps for course creators, coaches, and service businesses.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Course creators, coaches, service businesses',
    monetization: 'One-time $39-77 + subscription',
    route: '/tools/offer',
    implementation: 'digitallydefined-os-backend/src/agents/product.js (offer schemas)',
  },
  {
    id: 'domain-analyzer',
    name: 'Domain (WHOIS) Analyzer',
    tagline: 'Due-diligence tool for domain buyers and flippers.',
    description:
      'Analyzes domain history, valuation signals, and ownership for quick, copyable due-diligence reports.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Domain buyers, site flippers',
    monetization: 'One-time $19-39 (Gumroad)',
    route: '/tools/domain',
    implementation: '(needs build - WHOIS / valuation micro-service)',
  },
  {
    id: 'authority-blueprint-generator',
    name: 'Authority Blueprint Generator',
    tagline: 'Authority content blueprint for service businesses.',
    description:
      'Generates authority blueprints and content plans for service businesses looking to own a niche.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Service businesses, coaches',
    monetization: 'One-time $49-99 or agency deliverable',
    route: '/tools/blueprint',
    implementation: '(needs build - authority content micro-service)',
  },
  {
    id: 'asset-plan',
    name: 'Asset Plan (Freedom Number + 10x ROI)',
    tagline: 'Retirement gap report + freedom number, bundled.',
    description:
      'Extends the calculator into a paid report: retirement gap, freedom number, and a 10x ROI view. Free lead magnet behind a paid $29-77 report.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Gen X women 45-59, self-directed retirement planners',
    monetization: 'Free lead magnet -> paid report $29-77 + coaching upsell',
    route: '/calculators/asset-plan',
    implementation: 'digitallydefined-online-local/src/pages/RetirementGapPage.jsx + digitallydefined-os-backend',
  },
  {
    id: 'affiliate-flipper',
    name: 'Affiliate Flipper',
    tagline: 'Affiliate content flipper for faceless income.',
    description:
      'Turns affiliate products into a content pipeline: comms, posts, and orchestration for the faceless model.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Affiliate marketers, content creators',
    monetization: 'One-time $29-49 + Pro tier',
    route: '/tools/affiliate',
    implementation: '(needs build - affiliate content micro-service)',
  },
  {
    id: 'schema-validator',
    name: 'Schema Validator',
    tagline: 'Validates agent and MCP schemas before deploy.',
    description:
      'JSON-schema validation tool for agents and MCP servers so every payload matches the contract before it ships.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Developers, agents, MCP consumers',
    monetization: 'Bundle with other tools',
    route: '/tools/schema',
    implementation: 'workspace/buzz-agents/json-schema-generator + digitallydefined-os-backend',
  },
  {
    id: 'hermes-mcp',
    name: 'Hermes MCP',
    tagline: 'Model Context Protocol server for the AI business partner.',
    description:
      'Standards-compliant MCP server exposing the Hermes mentoring capabilities to any MCP client.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Developers, agent builders',
    monetization: 'Bundle with other tools',
    route: '/mcp/hermes',
    implementation: 'digitallydefined-os-backend/scripts/hermes-mcp-server.mjs',
  },
  {
    id: 'antigravity-mcp',
    name: 'Antigravity MCP',
    tagline: 'MCP server for the Antigravity workspace architect.',
    description:
      'MCP server exposing the Antigravity workspace orchestration so agents can architect, publish, and route work.',
    category: PRODUCT_CATEGORIES.BACKEND,
    status: PRODUCT_STATUS.BACKEND,
    audience: 'Developers, agent builders',
    monetization: 'Bundle with other tools',
    route: '/mcp/antigravity',
    implementation: 'workspace/buzz-agents/lib/anti-gravity.js + digitallydefined-os-backend/src/services/antigravity.js',
  },
  {
    id: 'roadmap-builder',
    name: 'Roadmap Builder',
    tagline: 'Turn a superpower into a phased, actionable roadmap.',
    description:
      'Front-end coming soon card only. Backend agent already exists - build the page shell and wire persistence.',
    category: PRODUCT_CATEGORIES.PLACEHOLDER,
    status: PRODUCT_STATUS.PLACEHOLDER,
    audience: 'New digital-business owners, creators',
    monetization: 'Bundle with OS / subscription',
    route: '/tools/roadmap',
    implementation: 'digitallydefined-os-backend/src/agents/roadmap.js + workspace/buzz-agents/roadmap-generator',
  },
  {
    id: 'product-designer',
    name: 'Product Designer',
    tagline: 'White-label design QA + brand builder.',
    description:
      'Placeholder. Combines Brand Guard + white-label design QA. Needs full build before it becomes a product.',
    category: PRODUCT_CATEGORIES.PLACEHOLDER,
    status: PRODUCT_STATUS.PLACEHOLDER,
    audience: 'Agencies, devs, faceless creators',
    monetization: 'Empire tier / $19-29',
    route: '/tools/designer',
    implementation: '(needs build - design QA micro-service)',
  },
  {
    id: 'social-content',
    name: 'Social Content Pack',
    tagline: 'Turn a niche into a week of platform-specific posts.',
    description:
      'Front-end coming soon card for social content packs. Backend content-repurposer and community agents already exist.',
    category: PRODUCT_CATEGORIES.PLACEHOLDER,
    status: PRODUCT_STATUS.PLACEHOLDER,
    audience: 'Faceless creators, community owners',
    monetization: 'Empire tier / $19-29',
    route: '/tools/social',
    implementation: 'workspace/buzz-agents/content-repurposer + facebook-community-agent',
  },
  {
    id: 'trend-analyzer',
    name: 'Trends Explorer',
    tagline: 'See what is rising before you commit (coming soon cards only).',
    description:
      'Front-end coming soon card for the Trends-as-a-Service product. API already built; front-end dashboard needed for the $19-39/mo subscription.',
    category: PRODUCT_CATEGORIES.PLACEHOLDER,
    status: PRODUCT_STATUS.PLACEHOLDER,
    audience: 'Niche researchers, product creators, agencies',
    monetization: 'Subscription $19-39/mo + lifetime',
    route: '/tools/trends',
    implementation: 'digitallydefined-os-backend/src/agents/trends.js + workspace/buzz-agents',
  },
];

// Group products by category for the launcher sidebar and the README.
export function groupByCategory(list = PRODUCTS) {
  return Object.values(PRODUCT_CATEGORIES).reduce((acc, cat) => {
    acc[cat] = list.filter((p) => p.category === cat);
    return acc;
  }, {});
}

// Find a product by route (kept for backward compatibility with App.jsx).
export function findProduct(route) {
  return PRODUCTS.find((p) => p.route === route) || null;
}

export default PRODUCTS;
