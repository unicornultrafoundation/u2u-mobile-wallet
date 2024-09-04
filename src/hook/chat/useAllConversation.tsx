import { useInfiniteQuery } from "@tanstack/react-query";
import { useWallet } from "../useWallet";
import { useNetwork } from "../useNetwork";
import { useChat } from "./useChat";

interface Conversation {
  id: string;
  user: string[2];
  newMessage: number;
  pinned: boolean;
  avatar: string;
  updatedAt: Date;
}

const PAGE_SIZE = 20

export const useAllConversation = () => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {chatClient} = useChat()

  const {data, isFetching, fetchNextPage} = useInfiniteQuery({
    queryKey: ['fetchAllConversation-infinite', wallet.address, networkConfig?.chainID, chatClient?._getToken()],
    queryFn: async ({pageParam = 1}) => {
      if (!chatClient) return [] as Conversation[]

      const rs = await chatClient.queryChannels({
        // @ts-ignore
        type: ['messaging', 'team'],
        // roles: ['owner', 'moder', 'member', 'pending'],
        limit: PAGE_SIZE,
        offset: (pageParam - 1) * PAGE_SIZE
      })
      console.log(rs)
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