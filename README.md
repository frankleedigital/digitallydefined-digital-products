# digital-products

Storefront launcher and **single manifest** for every DigitallyDefined digital
product. It is the front door buyers see: a React + Vite app that renders one
route per product, and one shared `products.js` that is the source of truth for
how every product is categorized, priced, and where its code lives.

Persisted work is saved into each buyer's own Puter cloud folder via the shared
`saveState()` hook, so every product gets identical behavior with zero
boilerplate.

---

## Product organization

Products are grouped into exactly three buckets, matching the audited catalog:

| Bucket | Meaning | Entry count |
|---|---|---|
| **Live & Monetizable** | Ship this week — already selling or ready to list | 9 |
| **Backend Microservices** | Built, surfaced to buyers later | 12 |
| **Placeholders** | Front-end "coming soon" cards only; backend exists | 4 |

---

## Full product manifest (`src/lib/products.js`)

| # | id | Name | Status | Route | Implementation ref |
|---|---|---:|---|---|---|
| 1 | `digital-superpower-quiz` | Digital Superpower Quiz → Personalized Roadmap | Live | `/quiz` | `digitallydefined-os-backend/src/agents/quiz.js` |
| 2 | `niche-profitability-scorecard` | Niche Profitability Scorecard | Live | `/tools/niche` | `digitallydefined-os-backend/src/agents/scorecard.js` |
| 3 | `hermes-ai-mentor` | Hermes AI Mentor | Live | `/hermes` | `Hermes/skills` + `antigravity.js` |
| 4 | `tenx-roi-calculator` | 10x ROI Calculator | Live | `/calculators/roi` | `dashboard` + `online-local` |
| 5 | `digital-business-os` | Digital Business OS (Notion system) | Live | `/business-os` | `dashboard` (NotionTab) |
| 6 | `intelligence-package` | Intelligence Package | Live | `/intelligence` | `intelligencePipeline.js` + dashboard |
| 7 | `ai-business-partner` | AI Business Partner | Live | `/ai-partner` | `Hermes/skills` + `antigravity.js` |
| 8 | `analytics-dashboard` | Analytics Dashboard + AI recs | Live | `/analytics` | `dashboard` (DashboardPage…) |
| 9 | `reputation-command-center` | Reputation Command Center + Automation Monitor | Live | `/reputation` | `dashboard` + `reputation-intelligence` |
| 10 | `wealth-calculator` | Wealth Calculator | Backend | `/calculators/wealth` | `buzz-agents/digital-wealth-calculator` |
| 11 | `trends-api` | Trends API | Backend | `/api/trends` | `trends.js` + `buzz-agents` |
| 12 | `rank-and-rent-analyzer` | Rank-and-Rent Analyzer | Backend | `/analyzers/rankandrent` | `ai-rankand-rent-builder` + `os-backend` |
| 13 | `product-generator` | Product Generator | Backend | `/tools/product` | `os-backend/src/agents/product.js` |
| 14 | `offer-architect` | Offer Architect | Backend | `/tools/offer` | `os-backend` (offer schemas) |
| 15 | `domain-analyzer` | Domain (WHOIS) Analyzer | Backend | `/tools/domain` | *(needs build)* |
| 16 | `authority-blueprint-generator` | Authority Blueprint Generator | Backend | `/tools/blueprint` | *(needs build)* |
| 17 | `asset-plan` | Asset Plan (Freedom Number + 10x ROI) | Backend | `/calculators/asset-plan` | `online-local` + `os-backend` |
| 18 | `affiliate-flipper` | Affiliate Flipper | Backend | `/tools/affiliate` | *(needs build)* |
| 19 | `schema-validator` | Schema Validator | Backend | `/tools/schema` | `json-schema-generator` + `os-backend` |
| 20 | `hermes-mcp` | Hermes MCP | Backend | `/mcp/hermes` | `os-backend/scripts/hermes-mcp-server.mjs` |
| 21 | `antigravity-mcp` | Antigravity MCP | Backend | `/mcp/antigravity` | `buzz-agents/lib/anti-gravity.js` + `antigravity.js` |
| 22 | `roadmap-builder` | Roadmap Builder | Placeholder | `/tools/roadmap` | `os-backend` + `buzz-agents/roadmap-generator` |
| 23 | `product-designer` | Product Designer | Placeholder | `/tools/designer` | *(needs build)* |
| 24 | `social-content` | Social Content / Product Designer | Placeholder | `/tools/social` | `buzz-agents/content-repurposer` |
| 25 | `trend-analyzer` | Trends Explorer | Placeholder | `/tools/trends` | `trends.js` + `buzz-agents` |

---

## How the launcher routes to each product

`src/App.jsx` reads `PRODUCTS` from `src/lib/productCatalog.js` and registers one
route per product. The registration loop is:

```jsx
{PRODUCTS.filter((p) => p.route !== '/quiz').map((p) => (
  <Route key={p.id} path={p.route} element={<ProductShell products={PRODUCTS} route={p.route} />} />
))}
```

- `/` → `LauncherHome` (list of all products)
- `/quiz` → `ProductShell` for `digital-superpower-quiz` explicitly
- every other product gets its own route from its `route` field

`ProductShell` wraps each product in the cloud-gate header and delegates persistence
to `saveState(product.id)` / `saveRun(product.id, ...)`, so every product is
automatically namespaced into its own Puter cloud folder.

---

## Adding a new product

1. Add a `{ id, name, tagline, description, category, status, audience, monetization, route, implementation }` entry to `src/lib/products.js`.
2. Make sure its `route` does not collide with an existing route.
3. If it is a new route, no other change is needed — the launcher auto-registers it.

## Notes

- Backend microservices are "not surfaced to buyers" yet by design — they become
  live products once a paid front-end/funnel is wired.
- Placeholders are front-end cards only; the backend exists but must be wrapped.
- The `src/calculators/`, `src/tools/`, and `src/agents/` folders are reserved
  slots in the launcher tree for future product pages.
