import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface DexState {
  slippage: number;
  setSlippage: (slippage: number) => void
}

export const useDexStore = create<DexState>()(
  persist<DexState>(
    (set, get) => ({
      slippage: 10,
      setSlippage: (slippage) => set({ slippage }),
    }),
    {
      name: "dex-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)