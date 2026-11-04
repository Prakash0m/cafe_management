import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // array of food item IDs
  toggleFavorite: (itemId: string) => boolean;
  isFavorite: (itemId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (itemId: string) => {
        const { favorites } = get();
        const exists = favorites.includes(itemId);
        if (exists) {
          set({ favorites: favorites.filter((id) => id !== itemId) });
          return false;
        } else {
          set({ favorites: [...favorites, itemId] });
          return true;
        }
      },

      isFavorite: (itemId: string) => {
        return get().favorites.includes(itemId);
      },
    }),
    {
      name: "beans-bites-favorites-storage",
    }
  )
);

