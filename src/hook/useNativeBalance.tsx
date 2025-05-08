import { fetchNativeBalance } from "../service/token"
import { useNetworkStore } from "../state/network"
import { useQuery } from '@tanstack/react-query'

export const useNativeBalance = (address: string) => {
  const {blockExplorer} = useNetworkStore()

  const query = useQuery({
    queryKey: ['native-balance', blockExplorer, address],
    queryFn: () => fetchNativeBalance(blockExplorer, address),
    refetchInterval: 30000
  })
  
  return {
    loading: query.isLoading,
    balance: query.data || "0"
  }
}