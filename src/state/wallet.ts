import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWalletFromMnemonic } from '../util/wallet';

export interface Wallet {
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
  generatedPath: number[]
  generateNewPath: () => void;
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
        set({ seedPhrase, wallet: _wallet, generatedPath: [get().selectedIndex] })
      },
      savePathIndex: (index) => {
        const _wallet = getWalletFromMnemonic(get().seedPhrase, index)
        set({ selectedIndex: index, wallet: _wallet })
      },
      generatedPath: [],
      generateNewPath: () => {
        const currentPath = get().generatedPath
        let newPath = 1

        while (currentPath.includes(newPath)) {
          newPath += 1
        }

        const _wallet = getWalletFromMnemonic(get().seedPhrase, newPath)
        set({
          selectedIndex: newPath,
          wallet: _wallet,
          generatedPath: [...currentPath, newPath]
        })
      }
    }),
    {
      name: "wallet-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);