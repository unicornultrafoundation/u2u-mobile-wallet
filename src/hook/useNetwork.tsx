import { useCallback } from "react"
import { useNetworkStore } from "../state/network"
import { getBlockDetail } from "../util/blockchain"
import { SUPPORTED_CHAINS } from "../config/chain"

export const useNetwork = () => {
  const networkStore = useNetworkStore()
  const {rpc, chainId} = useNetworkStore()

  const fetchBlock = useCallback(async (blockHash: string) => {
    return getBlockDetail(blockHash, rpc)
  }, [rpc])

  const switchNetwork = useCallback((newChainID: string) => {
    const networkItem = SUPPORTED_CHAINS.find((i) => i.chainID === newChainID)

    if (!networkItem) return;
    networkStore.switchNetwork(networkItem)
  }, [])
  
  return {
    ...networkStore,
    fetchBlock,
    switchNetwork
  }
}
