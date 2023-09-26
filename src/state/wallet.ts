import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WalletState {
  seedPhrase: string;
  selectedIndex: number;
  accessWallet: (seedPhrase: string) => void
  savePathIndex: (index: number) => void
}

export const useWalletStore = create(
  persist<WalletState>(
    (set) => ({
      seedPhrase: "",
      selectedIndex: 1,
      accessWallet: (seedPhrase) => set({ seedPhrase }),
      savePathIndex: (index) => set({ selectedIndex: index }),
    }),
    {
      name: "wallet-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);