import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PRODUCTS } from './lib/productCatalog.js';
import LauncherHome from './components/LauncherHome.jsx';
import ProductShell from './components/ProductShell.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LauncherHome products={PRODUCTS} />} />
      <Route path="/products/:productId" element={<ProductShell products={PRODUCTS} />} />
      <Route path="/quiz" element={<ProductShell products={PRODUCTS} route="/quiz" />} />
      {PRODUCTS.filter((p) => p.route !== '/quiz').map((p) => (
        <Route
          key={p.id}
          path={p.route}
          element={<ProductShell products={PRODUCTS} route={p.route} />}
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}