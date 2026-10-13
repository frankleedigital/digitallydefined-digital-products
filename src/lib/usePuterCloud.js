// src/lib/usePuterCloud.js
// React hook: cloud auth + product persistence for every digital product.

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  isPuterAuthenticated,
  getPuterUser,
  signInWithPuter,
  signOutFromPuter,
  ProductStorage,
} from './puter-cloud.js';

export function usePuterCloud() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      const authenticated = await isPuterAuthenticated();
      if (authenticated) {
        setUser(await getPuterUser());
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const signIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currentUser = await signInWithPuter();
      setUser(currentUser);
      setIsAuthenticated(true);
      return currentUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await signOutFromPuter();
    } catch { /* signed out locally regardless */ }
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated, user, isLoading, error,
    signIn, signOut, checkAuth,
    setError,
  };
}

/**
 * Product-scoped persistence. Pass the product id once and every call is
 * automatically namespaced into that product's cloud folder.
 */
export function useProductCloud(productId) {
  const cloud = usePuterCloud();
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const pendingRef = useRef(null);

  const saveState = useCallback(
    async (state) => {
      if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
      setSaving(true);
      setSaveError(null);
      try {
        const res = await ProductStorage.saveState(productId, state);
        if (res.success) setLastSavedAt(new Date());
        return res;
      } catch (err) {
        setSaveError(err.message);
        return { success: false, error: err.message };
      } finally {
        setSaving(false);
      }
    },
    [productId],
  );

  /** Debounced save — used by auto-syncing forms so we don't hammer the API. */
  const queueSave = useCallback(
    (state, delay = 1200) => {
      if (pendingRef.current) clearTimeout(pendingRef.current);
      pendingRef.current = setTimeout(() => saveState(state), delay);
    },
    [saveState],
  );

  const loadState = useCallback(async () => {
    if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
    try {
      return await ProductStorage.loadState(productId);
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [productId]);

  const saveRun = useCallback(
    async (name, output) => {
      if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
      try {
        return await ProductStorage.saveRun(productId, name, output);
      } catch (err) {
        return { success: false, error: err.message };
      }
    },
    [productId],
  );

  const listRuns = useCallback(async () => {
    if (!productId) return { success: false, error: 'NO_PRODUCT_ID' };
    try {
      return await ProductStorage.listRuns(productId);
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [productId]);

  useEffect(() => () => { if (pendingRef.current) clearTimeout(pendingRef.current); }, []);

  return {
    ...cloud,
    saving,
    lastSavedAt,
    saveError,
    saveState,
    queueSave,
    loadState,
    saveRun,
    listRuns,
  };
}

export default usePuterCloud;