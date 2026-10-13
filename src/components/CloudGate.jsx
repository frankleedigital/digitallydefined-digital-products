// src/components/CloudGate.jsx
// Wraps any product with the "connect your cloud" screen.
// Unauthenticated visitors see the value proposition + connect button;
// authenticated users get the product.

import React from 'react';
import { usePuterCloud } from '../lib/usePuterCloud.js';

export default function CloudGate({ productName, productPitch, children }) {
  const { isAuthenticated, user, isLoading, signIn } = usePuterCloud();
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleConnect = async () => {
    setBusy(true);
    setError(null);
    try {
      await signIn();
    } catch (err) {
      setError(err.message || 'Could not connect to Puter.');
    } finally {
      setBusy(false);
    }
  };

  if (isLoading) {
    return (
      <div style={styles.wrap}>
        <p style={styles.loading}>Checking your cloud connection…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={styles.wrap}>
        <div style={styles.card}>
          <span style={styles.eyebrow}>Connect to continue</span>
          <h1 style={styles.title}>{productName || 'This product'} needs your cloud</h1>
          <p style={styles.pitch}>
            {productPitch ||
              'Connect a free Puter account so this product can save your work, your outputs, and your history in your own cloud drive.'}
          </p>

          <ul style={styles.list}>
            <li style={styles.listItem}>Your files stay in your own storage — never on our servers</li>
            <li style={styles.listItem}>Pick up where you left off on any device</li>
            <li style={styles.listItem}>Every run is saved with a timestamp you can reopen later</li>
          </ul>

          {error && <p style={styles.error}>{error}</p>}

          <button onClick={handleConnect} disabled={busy} style={styles.button}>
            {busy ? 'Connecting…' : 'Connect Puter Cloud'}
          </button>

          <p style={styles.footnote}>
            Free Puter account required. Sign-in happens in a Puter window and no password is ever shared with us.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={styles.bar}>
        <span style={styles.barDot} />
        <span style={styles.barText}>
          Connected{user?.email ? ` · ${user.email}` : ''}
        </span>
      </div>
      {children}
    </>
  );
}

const styles = {
  wrap: {
    minHeight: '100dvh',
    display: 'grid',
    placeItems: 'center',
    padding: '2rem 1.25rem',
    background: 'var(--color-bg)',
  },
  card: {
    width: 'min(560px, 100%)',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
  },
  eyebrow: {
    fontSize: '0.68rem',
    fontWeight: 800,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--color-accent)',
    fontFamily: 'var(--font-heading)',
    display: 'block',
    marginBottom: '0.6rem',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    margin: '0 0 0.85rem',
  },
  pitch: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'var(--color-text)',
    margin: '0 0 1.25rem',
  },
  list: { listStyle: 'none', margin: '0 0 1.5rem', padding: 0 },
  listItem: {
    fontSize: '0.9rem',
    lineHeight: 1.6,
    padding: '0.5rem 0 0.5rem 1.5rem',
    position: 'relative',
    color: 'var(--color-text)',
  },
  error: {
    fontSize: '0.85rem',
    color: 'var(--color-red)',
    border: '1px solid var(--color-red)',
    background: 'rgba(139,26,10,0.08)',
    padding: '0.6rem 0.75rem',
    margin: '0 0 1rem',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--color-border)',
    background: 'var(--color-accent)',
    color: '#111111',
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '0.95rem',
    letterSpacing: '-0.01em',
    padding: '0.85rem 1.5rem',
    cursor: 'pointer',
    width: '100%',
  },
  footnote: {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    marginTop: '1rem',
    lineHeight: 1.6,
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: '1px solid var(--color-border)',
    padding: '0.5rem 1rem',
    background: 'var(--color-surface)',
  },
  barDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--color-blue)',
  },
  barText: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
  },
};
