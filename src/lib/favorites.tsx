"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, MOCK_PRODUCTS } from '@/src/lib/supabase';

interface FavoritesContextType {
  favorites: Product[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'koza_favorites_list';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
          setIsLoaded(true);
          return;
        }
      }
      // Seed with 2 curated starter favorites if first visit
      const seed = MOCK_PRODUCTS.slice(0, 2);
      setFavorites(seed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    } catch {
      // Fallback
      setFavorites(MOCK_PRODUCTS.slice(0, 2));
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveFavorites = (newFavs: Product[]) => {
    setFavorites(newFavs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
    } catch {
      // Handle quota / private mode
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      saveFavorites(favorites.filter((item) => item.id !== product.id));
    } else {
      saveFavorites([product, ...favorites]);
    }
  };

  const removeFavorite = (id: string) => {
    saveFavorites(favorites.filter((item) => item.id !== id));
  };

  const clearFavorites = () => {
    saveFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        count: isLoaded ? favorites.length : 0,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
