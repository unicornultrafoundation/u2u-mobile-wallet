import { useQuery } from "@tanstack/react-query";
import { OwnedNFT } from "./useOwnedNFT";
import { NFTCollectionMeta } from "./useSupportedNFT";
import request from "graphql-request";
import { Schema } from "../service/graph/schema";

export interface NFTHistoryItem {
  txHash: string
  transferAt: string
  from: {
    id: string
  }
  to: {
    id: string
  }
}

export const useNFTHistory = (nftItem: OwnedNFT, nftCollection: NFTCollectionMeta) => {
  const {data, isFetching} = useQuery<NFTHistoryItem[]>({
    queryKey: ['fetchNFTHistory', nftCollection.id, nftItem.id],
    queryFn: async () => {
      const rs = await request<{transferHistories: any[]}>(
        nftCollection.graph,
        Schema().NFT_HISTORY, 
        {
          tokenID: nftItem.id,
        }
      )
      return rs.transferHistories || []
    },
    initialData: [] as NFTHistoryItem[]
  })

  return {
    history: data,
    isFetching
  }
}