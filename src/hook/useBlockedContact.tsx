import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";
import { signMessage } from "../util/wallet";
import { chatClient } from "../util/chat";

interface ChatBlockedAddress {
  walletAddress: string;
}

export const useChatBlockedAddress = (search?: string) => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {data, isFetching, fetchNextPage, refetch} = useInfiniteQuery({
    queryKey: ['fetchChatBlockedAddress-infinite', wallet.address, chatClient?._getToken(), search],
    queryFn: async ({pageParam = 1}) => {
      if (!chatClient) return [] as ChatBlockedAddress[]
      const rs = await chatClient.queryChannels(
        {
          // @ts-ignore
          type: ['messaging'],
          // @ts-ignore
          // roles: filter === 'all' || filter === 'block' ? ['owner', 'moder', 'member'] : ['pending'],
          // @ts-ignore
          blocked: true,
        },
        [{ last_message_at: -1 }],
        {
          message_limit: 2,
        }
      )
      
      return rs.map((channel) => {
        const user = Object.keys(channel.state.members)
        const blockedContact = user.find((i) => i.toLowerCase() !== wallet.address.toLowerCase())
        return {
          walletAddress: blockedContact
        } as ChatBlockedAddress
      })
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  return {
    data, isFetching, fetchNextPage,
  }
}