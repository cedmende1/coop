import React, { useCallback, useState, createContext, useContext } from 'react';
interface CacheItem {
  data: any;
  timestamp: number;
}
interface CacheContextType {
  getItem: <T>(key: string) => T | null;
  setItem: <T>(key: string, data: T, expirationInMinutes?: number) => void;
  removeItem: (key: string) => void;
  clearCache: () => void;
}
const CacheContext = createContext<CacheContextType | undefined>(undefined);
// Default cache expiration time in minutes
const DEFAULT_CACHE_EXPIRATION = 15;
export const CacheProvider: React.FC<{
  children: ReactNode;
}> = ({
  children
}) => {
  const [cache, setCache] = useState<Record<string, CacheItem>>({});
  // Get an item from cache
  const getItem = useCallback(<T,>(key: string): T | null => {
    const item = cache[key];
    // If item doesn't exist in cache
    if (!item) return null;
    // Check if item has expired
    const now = Date.now();
    if (now > item.timestamp) {
      // Remove expired item
      removeItem(key);
      return null;
    }
    return item.data as T;
  }, [cache]);
  // Set an item in cache
  const setItem = useCallback(<T,>(key: string, data: T, expirationInMinutes = DEFAULT_CACHE_EXPIRATION): void => {
    const timestamp = Date.now() + expirationInMinutes * 60 * 1000;
    setCache(prevCache => ({
      ...prevCache,
      [key]: {
        data,
        timestamp
      }
    }));
  }, []);
  // Remove an item from cache
  const removeItem = useCallback((key: string): void => {
    setCache(prevCache => {
      const newCache = {
        ...prevCache
      };
      delete newCache[key];
      return newCache;
    });
  }, []);
  // Clear entire cache
  const clearCache = useCallback((): void => {
    setCache({});
  }, []);
  return <CacheContext.Provider value={{
    getItem,
    setItem,
    removeItem,
    clearCache
  }}>
      {children}
    </CacheContext.Provider>;
};
export const useCache = (): CacheContextType => {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};