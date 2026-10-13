// src/components/SaveStatus.jsx
// Small save indicator + explicit save button for product pages.

import React from 'react';
import { useProductCloud } from '../lib/usePuterCloud.js';

export function SaveStatus({ saving, lastSavedAt, saveError }) {
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
    <span
      aria-live="polite"
      style={{
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color,
      }}
    >
      {label}
    </span>
  );
}

export function SaveButton({ productId, state, runName, onSaved }) {
  const { saving, lastSavedAt, saveError, saveState, saveRun } = useProductCloud(productId);

  const handleClick = async () => {
    const res = await saveState(state);
    if (runName && res.success) {
      await saveRun(runName, state);
    }
    onSaved?.(res);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
      <button onClick={handleClick} disabled={saving} style={styles.button}>
        {saving ? 'Saving…' : 'Save to my cloud'}
      </button>
      <SaveStatus saving={saving} lastSavedAt={lastSavedAt} saveError={saveError} />
    </div>
  );
}

const styles = {
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    border: '1px solid var(--color-border)',
    background: 'var(--color-accent)',
    color: '#111111',
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '0.78rem',
    letterSpacing: '-0.01em',
    padding: '0.5rem 0.9rem',
    cursor: 'pointer',
  },
};

export default SaveButton;