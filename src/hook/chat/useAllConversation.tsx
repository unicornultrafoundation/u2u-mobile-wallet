import { useInfiniteQuery } from "@tanstack/react-query";
import { useWallet } from "../useWallet";
import { useNetwork } from "../useNetwork";

interface Conversation {
  id: string;
  user: string[2];
  newMessage: number;
  pinned: boolean;
  avatar: string;
  updatedAt: Date;
}

export const useAllConversation = () => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {data, isFetching, fetchNextPage} = useInfiniteQuery({
    queryKey: ['fetchAllConversation-infinite', wallet.address, networkConfig?.chainID],
    queryFn: async ({pageParam = 1}) => {
      return [] as Conversation[]
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  return {
    data, isFetching, fetchNextPage
  }
}