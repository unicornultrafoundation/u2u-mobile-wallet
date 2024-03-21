import { useQuery } from '@tanstack/react-query'
import { fetchSupportedTokens } from '../service/remoteConfig'
import { useNetwork } from './useNetwork'
import { SUPPORTED_CHAINS } from '../config/chain'
import { useCallback, useMemo } from 'react'

export function useSupportedTokens() {
  const {chainId} = useNetwork()

  const networkConfigItem = useMemo(() => {
    return SUPPORTED_CHAINS.find((i) => i.chainID === chainId)
  }, [chainId])

  const {data, isLoading} = useQuery({
    queryKey: ['supported-tokens', chainId, networkConfigItem],
    queryFn: () => fetchSupportedTokens(networkConfigItem!.suppoted_tokens_endpoint),
  })

  const getLogo = useCallback((tokenAddress: string) => {
    if (!data) return ""
    const item = data.find((i: any) => i.address === tokenAddress)
    return item ? item.logo : ""
  }, [data])
  
  return {
    loading: isLoading,
    supportedTokens: data || [],
    getLogo
  }
};
