import { useNetwork } from "./useNetwork"

export const useActiveChainId = () => {
  const { networkConfig } = useNetwork()

  const chainId = Number(networkConfig?.chainID)
  return {chainId}
}