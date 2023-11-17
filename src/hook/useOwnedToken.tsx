import { useQuery } from '@tanstack/react-query'
import { useNetworkStore } from '../state/network'
import { fetchOwnedToken } from '../service/token'
export const useOwnedToken = (address: string) => {
  const {blockExplorer} = useNetworkStore()

  const query = useQuery({
    queryKey: ['owned-tokens', address],
    queryFn: () => fetchOwnedToken(blockExplorer, address),
    refetchInterval: 30000
  })
  
  return {
    loading: query.isLoading,
    ownedToken: query.data || []
  }
}