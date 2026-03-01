import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextValue {
  favorites: number[];
  add: (id: number) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  isFav: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return ctx;
};

export const FavoritesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const add = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev : [...prev, id]);
  };
  const remove = (id: number) => {
    setFavorites(prev => prev.filter(x => x !== id));
  };
  const toggle = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const isFav = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, toggle, isFav }}>
      {children}
    </FavoritesContext.Provider>
  );
};
