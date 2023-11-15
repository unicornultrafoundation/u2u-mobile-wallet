import React from 'react'
import { useWallet } from './useWallet'
import { NFTCollectionMeta } from './useSupportedNFT'
import { useQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import { Schema } from '../service/graph/schema'
import { OwnedNFT } from './useOwnedNFT'

export const useAllNFT = (collection: NFTCollectionMeta) => {

  const {data} = useQuery({
    queryKey: ['fetchAllNFT', collection.id],
    queryFn: () => request<{items: OwnedNFT[]}>(collection.graph, Schema().ALL_NFT),
    refetchInterval: 60000,
    placeholderData: {items: [] as OwnedNFT[]}
  })

  const items = data ? data.items : [] as OwnedNFT[]

  return {
    items
  }
}