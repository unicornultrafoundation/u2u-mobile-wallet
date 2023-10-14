import { useCallback } from "react"
import { useNetworkStore } from "../state/network"
import { getBlockDetail } from "../util/blockchain"

export const useNetwork = () => {
  const networkStore = useNetworkStore()
  const {rpc, chainId} = useNetworkStore()

  const fetchBlock = useCallback(async (blockHash: string) => {
    return getBlockDetail(blockHash, rpc)
  }, [rpc])
  
  return {
    ...networkStore,
    fetchBlock
  }
}
