// src/lib/productCatalog.js
// Single source of truth for every digital product in the Gumroad store.
// The full catalog lives in products.js and is organized into three buckets:
//   Live & Monetizable | Backend Microservices | Placeholders
// Each product persists its own state under a namespaced folder.
//
// Backward-compatible API: PRODUCTS (named), findProduct(route), default export.
// Plus: groupByCategory() for the launcher sidebar and README.

import { PRODUCTS, groupByCategory, findProduct } from './products.js';

export { PRODUCTS, groupByCategory, findProduct };
export { PRODUCTS as default };

