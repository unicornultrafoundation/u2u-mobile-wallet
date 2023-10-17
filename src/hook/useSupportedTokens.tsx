import { useQuery } from '@tanstack/react-query'
import { fetchSupportedTokens } from '../service/remoteConfig'
import { useNetwork } from './useNetwork'
import { SUPPORTED_CHAINS } from '../config/chain'
import { useMemo } from 'react'

export function useSupportedTokens() {
  const {chainId} = useNetwork()

  const networkConfigItem = useMemo(() => {
    return SUPPORTED_CHAINS.find((i) => i.chainID === chainId)
  }, [chainId])

  const query = useQuery({
    queryKey: ['supported-tokens', chainId, networkConfigItem],
    queryFn: () => fetchSupportedTokens(networkConfigItem!.suppoted_tokens_endpoint),
  })
  
  return {
    loading: query.isLoading,
    supportedTokens: query.data || []
  }
};
