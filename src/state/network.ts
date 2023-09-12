import { create } from 'zustand'

interface NetworkState {
  name: string;
  rpc: string;
  chainId: string;
  blockExplorer: string;
  totalStakedAmount: string;
  fetchTotalStakedAmount: () => void;
  circulatingSupply: string;
  fetchCirculatingSupply: () => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  name: "",
  rpc: "",
  chainId: "",
  blockExplorer: "",
  totalStakedAmount: "0",
  fetchTotalStakedAmount: () => set({ totalStakedAmount: "1" }),
  circulatingSupply: "0",
  fetchCirculatingSupply: () => set({ circulatingSupply: "1" })
}))