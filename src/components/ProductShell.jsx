// src/components/ProductShell.jsx
// The frame every product renders inside: cloud gate, header, save status.
// Products supply their own <ProductBody> — this shell owns authentication and
// persistence so every product gets identical behavior with zero boilerplate.

import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CloudGate from './CloudGate.jsx';
import { saveState, loadState, listRuns, loadRun, saveRun } from '../lib/saveState.js';
import { findProduct } from '../lib/productCatalog.js';

export default function ProductShell({ products, route }) {
  const product = findProduct(route);

  if (!product) {
    return (
      <div style={styles.missing}>
        <h1 style={styles.missingTitle}>Product not found</h1>
        <Link to="/" style={styles.link}>Back to your products</Link>
      </div>
    );
  }

  return (
    <CloudGate
      productName={product.name}
      productPitch={`${product.tagline} Connect your Puter cloud so ${product.name} can save your inputs, outputs and run history.`}
    >
      <ProductLayout product={product} />
    </CloudGate>
  );
}

/**
 * Cloud persistence React hook. Pass the product id once and every call is
 * automatically namespaced into that product's folder.
 */
function ProductLayout({ product }) {
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [restored, setRestored] = useState(false);

  const save = useCallback(
    async (state, runLabel) => {
      setSaving(true);
      setSaveError(null);
      try {
        const res = await saveState(product.id, state);
        if (res.success) setLastSavedAt(new Date());
        if (res.success && runLabel) {
          await saveRun(product.id, runLabel, state);
        }
        return res;
      } catch (err) {
        setSaveError(err.message);
        return { success: false, error: err.message };
      } finally {
        setSaving(false);
      }
    },
    [product.id],
  );

  // Restore the latest saved state when the product opens.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await loadState(product.id);
      if (!cancelled && res.success) setRestored(res.data);
    })();
    return () => { cancelled = true; };
  }, [product.id]);

  const contextValue = {
    product,
    restored,
    save,
    saving,
    lastSavedAt,
    saveError,
    loadState: () => loadState(product.id),
    saveRun: async (label, state) => save(state, label),
    listRuns: () => listRuns(product.id),
    loadRun: (filename) => loadRun(product.id, filename),
  };

  return (
    <ProductFrame product={product} saving={saving} lastSavedAt={lastSavedAt} saveError={saveError}>
      {typeof product.renderBody === 'function'
        ? product.renderBody(contextValue)
        : <ProductBodyFallback product={product} />}
    </ProductFrame>
  );
}

function ProductFrame({ product, saving, lastSavedAt, saveError, children }) {
  const label = saving
    ? 'Saving…'
    : saveError
      ? `Save failed: ${saveError}`
      : lastSavedAt
        ? `Saved ${lastSavedAt.toLocaleTimeString()}`
        : 'Not saved yet';

  const color = saving
    ? 'var(--color-accent)'
    : saveError
      ? 'var(--color-red)'
      : lastSavedAt
        ? 'var(--color-blue)'
        : 'var(--color-text-muted)';

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <span style={styles.eyebrow}>Digital product</span>
          <h1 style={styles.title}>{product.name}</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span aria-live="polite" style={{ ...styles.status, color }}>{label}</span>
          <Link to="/" style={styles.backBtn}>All products</Link>
        </div>
      </header>
      <main style={styles.main}>{children}</main>
    </div>
  );
}

function ProductBodyFallback({ product }) {
  return (
    <div style={styles.placeholder}>
      <span style={styles.eyebrow}>{product.tagline}</span>
      <p style={styles.placeholderText}>{product.description}</p>
      <div style={styles.placeholderBox}>
        <strong style={styles.placeholderStrong}>Product engine</strong>
        <p style={styles.placeholderText}>
          Connect the {product.id} implementation here. Cloud save and restore are wired automatically —
          call <code style={styles.code}>save(state)</code> from the injected context to persist work into the
          customer's own Puter drive.
        </p>
      </div>
    </div>
  );
}

const styles = {
  missing: { minHeight: '100dvh', display: 'grid', placeItems: 'center', gap: '1rem', padding: '2rem' },
  missingTitle: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.03em' },
  link: { color: 'var(--color-accent)', fontWeight: 700 },
  page: { minHeight: '100dvh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' },
  header: {
    borderBottom: '1px solid var(--color-border)',
    padding: '1.25rem clamp(1.25rem, 5vw, 2.5rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap',
    background: 'var(--color-surface)',
  },
  eyebrow: {
    fontSize: '0.62rem',
    fontWeight: 800,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--color-accent)',
    display: 'block',
    marginBottom: '0.35rem',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(1.4rem, 4vw, 2rem)',
    letterSpacing: '-0.03em',
    margin: 0,
  },
  status: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  backBtn: {
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
    padding: '0.45rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: 800,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--color-text)',
    textDecoration: 'none',
  },
  main: {
    flex: 1,
    width: 'min(1100px, 100%)',
    margin: '0 auto',
    padding: 'clamp(1.5rem, 5vw, 2.5rem)',
  },
  placeholder: { display: 'grid', gap: '0.75rem' },
  placeholderText: { fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text-muted)', margin: 0 },
  placeholderBox: {
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
    padding: '1.5rem',
    display: 'grid',
    gap: '0.5rem',
  },
  placeholderStrong: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '0.72rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--color-blue)',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: '0.85em',
    background: 'rgba(17,17,17,0.06)',
    padding: '0.1rem 0.3rem',
  },
};