import { create } from 'zustand'

interface WalletState {
  address: string;
  privateKey: string;
  currentBalance: string;
  fetchBalance: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  address: "",
  privateKey: "",
  currentBalance: "0",
  fetchBalance: () => set({ currentBalance: "1" }),
}))