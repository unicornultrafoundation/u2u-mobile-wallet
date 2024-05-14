import { useQuery } from '@tanstack/react-query'
import { fetchSupportedTokens } from '../service/remoteConfig'
import { useNetwork } from './useNetwork'
import { SUPPORTED_CHAINS } from '../config/chain'
import { useMemo } from 'react'

export interface NFTCollectionMeta {
  id: string;
  image: string;
  banner: string;
  name: string;
  category: string;
  graph: string;
  description: string;
  is1155: boolean;
  isGroup: boolean;
}

export interface NFTCollectionGroups {
  isGroup: boolean;
  name: string;
  collections: NFTCollectionMeta[]
}

export interface NFTItemMeta {
  id: number;
  name: string;
  image: string
}

export function useSupportedNFT() {
  const {chainId} = useNetwork()

  const networkConfigItem = useMemo(() => {
    return SUPPORTED_CHAINS.find((i) => i.chainID === chainId)
  }, [chainId])

  const query = useQuery<(NFTCollectionMeta | NFTCollectionGroups)[]>({
    queryKey: ['supported-nft', chainId, networkConfigItem],
    queryFn: () => fetchSupportedTokens(networkConfigItem!.suppoted_nfts_endpoint),
    initialData: [] as (NFTCollectionMeta | NFTCollectionGroups)[]
  })
  
  return {
    loading: query.isLoading,
    supportedNFT: query.data
  }
};
