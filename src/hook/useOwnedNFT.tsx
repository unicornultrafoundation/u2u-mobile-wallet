import React, { useEffect } from 'react'
import { useWallet } from './useWallet'
import { NFTCollectionMeta } from './useSupportedNFT'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import { Schema } from '../service/graph/schema'
import { useTokenBalance } from './useTokenBalance'
import BigNumber from 'bignumber.js'

export interface OwnedNFT {
  id: string;
  tokenID: string;
  tokenURI: string;
  balance: number;
  owner: {
    id: string;
    balance: number;
  }[];
}

const PAGE_SIZE = 10

export const useOwnedNFT = (collection: NFTCollectionMeta, page = 1) => {
  const {wallet} = useWallet()

  const {data, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['fetchOwnedNFT-infinite', collection.id, wallet.address],
    queryFn: async ({pageParam = 1}) => {
      const rs = await request<{items: OwnedNFT[]}>(
        collection.graph,
        collection.is1155 ? Schema().OWNED_NFT_1155 : Schema().OWNED_NFT,
        {
          address: wallet.address.toLowerCase(),
          first: PAGE_SIZE,
          skip: (pageParam - 1) * PAGE_SIZE
        }
      )
      return rs.items.map((i) => {
        if (!Array.isArray(i.owner)) {
          i.owner = [i.owner]
        }
        if (collection.is1155) {
          i.owner = i.owner.map((ownerItem) => {
            return {
              id: ownerItem.id.split('-')[1],
              balance: ownerItem.balance ? Number(ownerItem.balance) : 1
            }
          })
        }
        i.balance = i.balance ? Number(i.balance) : 0
        return i
      })
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  const {balance} = useTokenBalance(wallet.address, collection.id)

  return {
    items: data,
    isLoading: isFetching,
    owned: BigNumber(balance).multipliedBy(10 ** 18).toString(),
    fetchNextPage
  }
}