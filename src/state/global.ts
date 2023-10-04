import { create } from 'zustand'

interface GlobalState {
  routeName: string;
  setRouteName: (routeName: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  routeName: '',
  setRouteName: (routeName: string) => {
    console.log('new route name', routeName)
    set({ routeName })
  },
}))