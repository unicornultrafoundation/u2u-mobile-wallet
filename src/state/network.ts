import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NetworkState {
  name: string;
  rpc: string;
  chainId: string;
  blockExplorer: string;
  totalStakedAmount: string;
  fetchTotalStakedAmount: () => void;
  circulatingSupply: string;
  fetchCirculatingSupply: () => void;
  resetToDefault: () => void;
}

export const useNetworkStore = create<NetworkState>()(
  persist<NetworkState>(
    (set) => ({
      name: "Testnet",
      rpc: "https://rpc-nebulas-testnet.uniultra.xyz",
      chainId: "2484",
      blockExplorer: "https://testnet.u2uscan.xyz",
      totalStakedAmount: "0",
      fetchTotalStakedAmount: () => set({ totalStakedAmount: "1" }),
      circulatingSupply: "0",
      fetchCirculatingSupply: () => set({ circulatingSupply: "1" }),
      resetToDefault: () => set({
        name: "Testnet",
        rpc: "https://rpc-nebulas-testnet.uniultra.xyz",
        chainId: "2484",
        blockExplorer: "https://testnet.u2uscan.xyz",
        totalStakedAmount: "0",
        circulatingSupply: "0",
      })
    }),
    {
      name: "network-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)