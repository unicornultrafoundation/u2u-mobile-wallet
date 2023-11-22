import React from 'react'
import { useWallet } from './useWallet'
import { NFTCollectionMeta } from './useSupportedNFT'
import { useQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import { Schema } from '../service/graph/schema'

export interface OwnedNFT {
  id: string;
  tokenID: string;
  tokenURI: string;
  owner: string;
}

export const useOwnedNFT = (collection: NFTCollectionMeta) => {
  const {wallet} = useWallet()

  const {data, isLoading} = useQuery({
    queryKey: ['fetchOwnedNFT', collection.id, wallet.address],
    queryFn: () => request<{items: OwnedNFT[]}>(collection.graph, Schema().OWNED_NFT, {address: wallet.address.toLowerCase()}),
    refetchInterval: 60000,
    placeholderData: {items: [] as OwnedNFT[]}
  })

  const items = data ? data.items : [] as OwnedNFT[]

  return {
    items,
    isLoading
  }
}