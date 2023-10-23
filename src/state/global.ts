import { create } from 'zustand'

interface GlobalState {
  routeName: string;
  setRouteName: (routeName: string) => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  routeName: '',
  setRouteName: (routeName: string) => {
    set({ routeName })
  },
  searchKeyword: '',
  setSearchKeyword: (searchKeyword: string) => {
    set({ searchKeyword })
  },
}))