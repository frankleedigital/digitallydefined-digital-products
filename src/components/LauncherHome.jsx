// src/components/LauncherHome.jsx
// Storefront-style home that lists every digital product in the customer's library.

import React from 'react';
import { Link } from 'react-router-dom';

export default function LauncherHome({ products }) {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          Digitally<span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Defined</span>
        </div>
        <p style={styles.headerSub}>Your digital products</p>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Everything you own, in one place.</h1>
        <p style={styles.lead}>
          Open any product below. Your work is saved to your own Puter cloud account, so it is available
          on every device and never depends on a server.
        </p>

        <div style={styles.grid}>
          {products.map((product) => (
            <Link key={product.id} to={product.route} style={styles.card}>
              <span style={styles.cardEyebrow}>Product</span>
              <h2 style={styles.cardTitle}>{product.name}</h2>
              <p style={styles.cardTagline}>{product.tagline}</p>
              <p style={styles.cardDesc}>{product.description}</p>
              <span style={styles.cardCta}>Open →</span>
            </Link>
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        DigitallyDefined · Products run on your cloud · No server storage
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--color-bg)',
  },
  header: {
    borderBottom: '1px solid var(--color-border)',
    padding: '1.25rem clamp(1.25rem, 5vw, 2.5rem)',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap',
    background: 'var(--color-surface)',
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '1.15rem',
    letterSpacing: '-0.04em',
    border: '1px solid var(--color-border)',
    padding: '0.4rem 0.7rem',
  },
  headerSub: {
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
  },
  main: {
    flex: 1,
    width: 'min(1100px, 100%)',
    margin: '0 auto',
    padding: 'clamp(2rem, 6vw, 3.5rem) clamp(1.25rem, 5vw, 2.5rem)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    margin: '0 0 0.75rem',
  },
  lead: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'var(--color-text-muted)',
    margin: '0 0 2.5rem',
    maxWidth: '60ch',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.25rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
    padding: '1.25rem',
    textDecoration: 'none',
    color: 'var(--color-text)',
  },
  cardEyebrow: {
    fontSize: '0.62rem',
    fontWeight: 800,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--color-accent)',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '1.1rem',
    letterSpacing: '-0.03em',
    margin: 0,
  },
  cardTagline: {
    fontSize: '0.9rem',
    fontWeight: 700,
    lineHeight: 1.5,
    margin: 0,
  },
  cardDesc: {
    fontSize: '0.85rem',
    lineHeight: 1.6,
    color: 'var(--color-text-muted)',
    margin: '0 0 0.5rem',
  },
  cardCta: {
    marginTop: 'auto',
    fontSize: '0.78rem',
    fontWeight: 800,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--color-blue)',
  },
  footer: {
    borderTop: '1px solid var(--color-border)',
    padding: '1.25rem',
    textAlign: 'center',
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
  },
};