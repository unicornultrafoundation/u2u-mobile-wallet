import React from 'react'
import { useWallet } from './useWallet'
import { NFTCollectionMeta } from './useSupportedNFT'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import { Schema } from '../service/graph/schema'
import { OwnedNFT } from './useOwnedNFT'

const PAGE_SIZE = 4

export const useAllNFT = (collection: NFTCollectionMeta) => {

  const {data, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['fetchAllNFT-infinite', collection.id],
    queryFn: async ({pageParam = 1}) => {
      const rs = await request<{items: OwnedNFT[]}>(
        collection.graph,
        Schema().ALL_NFT, 
        {
          first: PAGE_SIZE,
          skip: (pageParam - 1) * PAGE_SIZE
        }
      )
      return rs.items
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  // const {data} = useQuery({
  //   queryKey: ['fetchAllNFT', collection.id],
  //   queryFn: () => request<{items: OwnedNFT[]}>(collection.graph, Schema().ALL_NFT),
  //   refetchInterval: 60000,
  //   placeholderData: {items: [] as OwnedNFT[]}
  // })

  return {
    items: data,
    isFetching,
    fetchNextPage
  }
}