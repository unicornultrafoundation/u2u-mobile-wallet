import { create } from 'zustand'
interface GlobalState {
  routeName: string;
  setRouteName: (routeName: string) => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  unlocked: boolean;
  setUnlocked: (unlocked: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  routeName: '',
  setRouteName: (routeName: string) => {
    set({ routeName })
  },
  searchKeyword: '',
  setSearchKeyword: (searchKeyword: string) => {
    set({ searchKeyword })
  },
  unlocked: false,
  setUnlocked: (val: boolean) => {
    set({ unlocked: val })
  }
}))