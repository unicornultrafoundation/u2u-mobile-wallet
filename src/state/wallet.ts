import { create } from 'zustand'

interface WalletState {
  seedPhrase: string;
  selectedIndex: number;
  accessWallet: (seedPhrase: string) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  seedPhrase: "",
  selectedIndex: 1,
  accessWallet: (seedPhrase) => set({ seedPhrase }),
}))