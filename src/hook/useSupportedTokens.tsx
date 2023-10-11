import { useQuery } from '@tanstack/react-query'
import { fetchSupportedTokens } from '../service/remoteConfig'

export function useSupportedTokens() {
  const query = useQuery({
    queryKey: ['supported-tokens'],
    queryFn: fetchSupportedTokens,
  })
  
  return {
    loading: query.isLoading,
    supportedTokens: query.data || []
  }
};
