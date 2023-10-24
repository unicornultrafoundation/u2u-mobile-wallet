import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NetworkConfig, SUPPORTED_CHAINS } from '../config/chain';
import { apolloClient, apolloStakingClient, apolloU2UNetworkClient } from '../service/graph/client';
import { HttpLink } from "@apollo/client";

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
  switchNetwork: (config: NetworkConfig) => void;
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
      resetToDefault: () => {
        const item = SUPPORTED_CHAINS.find((i) => i.chainID === "2484")

        const httpLink = new HttpLink({ uri: item?.sfcSubgraph })
        apolloClient.setLink(httpLink)

        const httpStakingLink = new HttpLink({ uri: item?.stakingGraphql })
        apolloStakingClient.setLink(httpStakingLink)

        const httpU2UNetworkLink = new HttpLink({ uri: item?.u2uNetworkSubgraph })
        apolloU2UNetworkClient.setLink(httpU2UNetworkLink)

        set({
          name: "Testnet",
          rpc: "https://rpc-nebulas-testnet.uniultra.xyz",
          chainId: "2484",
          blockExplorer: "https://testnet.u2uscan.xyz",
          totalStakedAmount: "0",
          circulatingSupply: "0",
        })
      },
      switchNetwork: (config) => {
        const item = SUPPORTED_CHAINS.find((i) => i.chainID === config.chainID)

        const httpLink = new HttpLink({ uri: item?.sfcSubgraph })
        apolloClient.setLink(httpLink)

        const httpStakingLink = new HttpLink({ uri: item?.stakingGraphql })
        apolloStakingClient.setLink(httpStakingLink)

        const httpU2UNetworkLink = new HttpLink({ uri: item?.u2uNetworkSubgraph })
        apolloU2UNetworkClient.setLink(httpU2UNetworkLink)

        set({
          name: config.name,
          rpc: config.rpc,
          chainId: config.chainID,
          blockExplorer: config.explorerURL,
          totalStakedAmount: "0",
          circulatingSupply: "0"
        })
      }
    }),
    {
      name: "network-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)