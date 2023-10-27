import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteState {
  items: {title: string; isFavorite: boolean}[];
  toggleFavorite: (title: string) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist<FavoriteState>(
    set => ({
      items: [],
      toggleFavorite: (title: string) => {
        set(state => {
          // Check if item with the same title already exists
          const existingItemIndex = state.items.findIndex(
            item => item.title === title,
          );
          // If item exists, update its 'isFavorite' property
          if (existingItemIndex !== -1) {
            state.items[existingItemIndex].isFavorite =
              !state.items[existingItemIndex].isFavorite;
            return {items: [...state.items]}; // return new array reference to ensure update
          }
          // If item doesn't exist, add new item to the array
          return {items: [...state.items, {title, isFavorite: true}]};
        });
      },
    }),
    {
      name: 'favorite-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
