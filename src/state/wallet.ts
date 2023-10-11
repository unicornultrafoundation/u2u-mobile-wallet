import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWalletFromMnemonic } from '../util/wallet';

interface Wallet {
  address: string
  privateKey: string
  mnemonic: string
  path: string
}

interface WalletState {
  wallet: Wallet;
  seedPhrase: string;
  selectedIndex: number;
  accessWallet: (seedPhrase: string) => void
  savePathIndex: (index: number) => void
}

export const useWalletStore = create(
  persist<WalletState>(
    (set, get) => ({
      wallet: {
        address: "",
        privateKey: "",
        mnemonic: "",
        path: ""
      },
      seedPhrase: "",
      selectedIndex: 1,
      accessWallet: (seedPhrase) => {
        const _wallet = getWalletFromMnemonic(seedPhrase, get().selectedIndex)
        set({ seedPhrase, wallet: _wallet })
      },
      savePathIndex: (index) => set({ selectedIndex: index }),
    }),
    {
      name: "wallet-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);