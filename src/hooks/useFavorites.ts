import { useState, useEffect } from "react";

const FAVORITES_KEY = "favorite_movies";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  const addFavorite = (id: string) => {
    const updated = [...favorites, id];
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((fav) => fav !== id);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
