import { fetchURC20Balance } from "../service/token"
import { useNetworkStore } from "../state/network"
import { useQuery } from '@tanstack/react-query'

export const useURC20TokenBalance = (address: string, tokenAddress: string) => {
  const {blockExplorer} = useNetworkStore()

  const query = useQuery({
    queryKey: ['urc20-balance', blockExplorer, address, tokenAddress],
    queryFn: () => fetchURC20Balance(blockExplorer, address, tokenAddress),
  })
  
  return {
    loading: query.isLoading,
    balance: query.data || "0"
  }
}