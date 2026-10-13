// src/lib/saveState.js
// Framework-free cloud persistence for a product. ProductShell renders the UI
// and this module owns every Puter call so both can be used independently.

import { ProductStorage } from './puter-cloud.js';

/** Save the latest state for a product (overwrites state.json). */
export async function saveState(productId, state) {
  if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
  try {
    return await ProductStorage.saveState(productId, state);
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/** Load the latest saved state for a product. */
export async function loadState(productId) {
  if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
  try {
    return await ProductStorage.loadState(productId);
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/** Save a timestamped run inside runs/. */
export async function saveRun(productId, name, output) {
  if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
  try {
    return await ProductStorage.saveRun(productId, name, output);
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/** List saved runs for a product, newest first. */
export async function listRuns(productId) {
  if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
  try {
    return await ProductStorage.listRuns(productId);
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/** Read one saved run by filename. */
export async function loadRun(productId, filename) {
  if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
  try {
    return await ProductStorage.loadRun(productId, filename);
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/** Wipe every saved run for a product (state.json is kept). */
export async function clearRuns(productId) {
  if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
  try {
    return await ProductStorage.clearRuns(productId);
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export default { saveState, loadState, saveRun, listRuns, loadRun, clearRuns };