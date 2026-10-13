// src/lib/puter-cloud.js
// Puter.js cloud OS integration for DigitallyDefined Digital Products.
//
// Every product (agent, tool, calculator) reads and writes through this module
// so a customer's work is always stored in THEIR OWN Puter cloud account — no
// server storage, no database, and the files follow them between devices.
//
// Folder layout inside the customer's Puter cloud drive:
//   digitallydefined/products/<productId>/...      one folder per product
//   digitallydefined/products/<productId>/state.json    latest saved state
//   digitallydefined/products/<productId>/runs/         timestamped outputs

let puterInstance = null;
let puterPromise = null;

export const PRODUCTS_ROOT = 'digitallydefined/products';

async function getPuter() {
  if (puterInstance) return puterInstance;
  if (!puterPromise) {
    puterPromise = import('@heyputer/puter.js').then((mod) => mod.default ?? mod);
  }
  puterInstance = await puterPromise;
  return puterInstance;
}

/* ------------------------------------------------------------------ *
 * Authentication
 * ------------------------------------------------------------------ */

export async function isPuterAuthenticated() {
  try {
    const puter = await getPuter();
    const user = await puter.auth.getUser();
    return !!user;
  } catch {
    return false;
  }
}

export async function getPuterUser() {
  try {
    const puter = await getPuter();
    return await puter.auth.getUser();
  } catch {
    return null;
  }
}

export async function signInWithPuter() {
  const puter = await getPuter();
  await puter.auth.signIn();
  return puter.auth.getUser();
}

export async function signOutFromPuter() {
  const puter = await getPuter();
  await puter.auth.signOut();
}

/* ------------------------------------------------------------------ *
 * Low-level file operations
 * ------------------------------------------------------------------ */

async function ensureFolder(puter, folder) {
  try {
    await puter.fs.stat(folder);
  } catch {
    await puter.fs.mkdir(folder, { recursive: true });
  }
  return folder;
}

function productFolder(productId) {
  return `${PRODUCTS_ROOT}/${productId}`;
}

export async function writeCloudFile(path, content, options = {}) {
  const { mimeType = 'application/json', overwrite = true } = options;
  const puter = await getPuter();
  const folder = path.split('/').slice(0, -1).join('/');
  if (folder) await ensureFolder(puter, folder);
  const file = await puter.fs.write(path, content, { overwrite, mimeType });
  return { success: true, path: file.path, url: file.url, id: file.id };
}

export async function readCloudFile(path) {
  const puter = await getPuter();
  try {
    const content = await puter.fs.read(path);
    return { success: true, content, path };
  } catch (err) {
    const message = String(err?.message || err);
    if (/not found|ENOENT|does not exist/i.test(message)) {
      return { success: false, error: 'FILE_NOT_FOUND', message: 'File not found' };
    }
    throw err;
  }
}

export async function listCloudFiles(folder) {
  const puter = await getPuter();
  try {
    const entries = await puter.fs.readdir(folder);
    return {
      success: true,
      files: (entries || []).map((e) => ({
        name: e.name,
        path: e.path,
        type: e.type,
        size: e.size,
        modified: e.modified,
      })),
    };
  } catch {
    return { success: true, files: [] };
  }
}

export async function deleteCloudFile(path) {
  const puter = await getPuter();
  await puter.fs.delete(path);
  return { success: true, message: `Deleted ${path}` };
}

/* ------------------------------------------------------------------ *
 * Product-level persistence API
 * ------------------------------------------------------------------ */

export const ProductStorage = {
  /** Save the latest state for a product (overwrites state.json). */
  async saveState(productId, state) {
    const payload = JSON.stringify({ ...state, savedAt: new Date().toISOString() }, null, 2);
    return writeCloudFile(`${productFolder(productId)}/state.json`, payload);
  },

  /** Load the latest saved state for a product. */
  async loadState(productId) {
    const res = await readCloudFile(`${productFolder(productId)}/state.json`);
    if (!res.success) return res;
    try {
      return { success: true, data: JSON.parse(res.content) };
    } catch {
      return { success: false, error: 'INVALID_JSON', message: 'Saved state could not be parsed' };
    }
  },

  /** Save a timestamped run/output inside runs/. */
  async saveRun(productId, name, output) {
    const safe = String(name).replace(/[^a-zA-Z0-9-_]+/g, '-').toLowerCase();
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${stamp}-${safe}.json`;
    const payload = JSON.stringify({ name, output, createdAt: new Date().toISOString() }, null, 2);
    return writeCloudFile(`${productFolder(productId)}/runs/${filename}`, payload);
  },

  /** List saved runs for a product, newest first. */
  async listRuns(productId) {
    const res = await listCloudFiles(`${productFolder(productId)}/runs`);
    if (!res.success) return res;
    return {
      success: true,
      runs: res.files
        .filter((f) => f.type === 'file' || f.type === 'file-item' || !f.is_dir)
        .sort((a, b) => new Date(b.modified) - new Date(a.modified)),
    };
  },

  /** Read one saved run by filename. */
  async loadRun(productId, filename) {
    const res = await readCloudFile(`${productFolder(productId)}/runs/${filename}`);
    if (!res.success) return res;
    try {
      return { success: true, data: JSON.parse(res.content) };
    } catch {
      return { success: false, error: 'INVALID_JSON', message: 'Run could not be parsed' };
    }
  },

  /** Export any file to the root of the customer's drive for easy access. */
  async exportToRoot(productId, filename, content, mimeType) {
    return writeCloudFile(`${filename}`, content, { mimeType });
  },

  /** Wipe every saved run for a product (state.json is kept). */
  async clearRuns(productId) {
    const res = await this.listRuns(productId);
    if (!res.success) return res;
    for (const run of res.runs) {
      await deleteCloudFile(run.path).catch(() => {});
    }
    return { success: true, cleared: res.runs.length };
  },
};

/** Re-export the shared CloudStorage shape used by the dashboard. */
export const CloudStorage = ProductStorage;

export default {
  getPuter,
  isPuterAuthenticated,
  getPuterUser,
  signInWithPuter,
  signOutFromPuter,
  writeCloudFile,
  readCloudFile,
  listCloudFiles,
  deleteCloudFile,
  ProductStorage,
  CloudStorage,
};