import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface DexState {
  slippage: number;
  setSlippage: (slippage: number) => void;
  tokenFrom: string;
  setTokenFrom: (tokenFrom: string) => void;
  tokenTo: string;
  setTokenTo: (tokenTo: string) => void;
}

export const useDexStore = create<DexState>()(
  persist<DexState>(
    (set, get) => ({
      slippage: 10,
      setSlippage: (slippage) => set({ slippage }),
      tokenFrom: '0x4ebbe24182e9c14e1d2e02ab9459190f39c43b6f',
      setTokenFrom: (tokenFrom: string) => set({ tokenFrom }),
      tokenTo: '0xdfae88f8610a038afcdf47a5bc77c0963c65087c',
      setTokenTo: (tokenTo: string) => set({ tokenTo })
    }),
    {
      name: "dex-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)