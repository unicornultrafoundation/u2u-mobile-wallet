import { useInfiniteQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"
import { getConversationMessages } from "../service/chat"
import { signMessage } from "../util/wallet"
import { useWallet } from "./useWallet"

export const useConversationMessages = (userAddresses: string[]) => {
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()

  const {data, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['conversation-messages', userAddresses.sort(), networkConfig?.api_endpoint],
    queryFn: async ({pageParam = 1}) => {
      if (!networkConfig) return []
      const signature = await signMessage(
        `conversation-${userAddresses.sort().join('-')}`,
        wallet.privateKey
      )
      const now = Date.now()
      console.log('pageParam', pageParam)
      return [
        {
          conversationID: userAddresses.sort().join(''),
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: userAddresses.sort().join(''),
          from: '0x0F9a26667C7Eb21734509044B0f18629589C2Cf5',
          content: 'test content 2222',
          readBy: [],
          createdAt: new Date(now - 1000)
        },
        {
          conversationID: userAddresses.sort().join(''),
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: userAddresses.sort().join(''),
          from: '0x0F9a26667C7Eb21734509044B0f18629589C2Cf5',
          content: 'test content 2222',
          readBy: [],
          createdAt: new Date(now - 1000)
        },
        {
          conversationID: userAddresses.sort().join(''),
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: userAddresses.sort().join(''),
          from: '0x0F9a26667C7Eb21734509044B0f18629589C2Cf5',
          content: 'test content 2222',
          readBy: [],
          createdAt: new Date(now - 1000)
        },
        {
          conversationID: userAddresses.sort().join(''),
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: userAddresses.sort().join(''),
          from: '0x0F9a26667C7Eb21734509044B0f18629589C2Cf5',
          content: 'test content 2222',
          readBy: [],
          createdAt: new Date(now - 1000)
        },
        {
          conversationID: userAddresses.sort().join(''),
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: userAddresses.sort().join(''),
          from: '0x0F9a26667C7Eb21734509044B0f18629589C2Cf5',
          content: 'test content 2222',
          readBy: [],
          createdAt: new Date(now - 1000)
        }
      ]
      // const messages = await getConversationMessages(
      //   networkConfig.api_endpoint,
      //   {
      //     page: pageParam,
      //     limit: 20,
      //     signature,
      //     userAddresses
      //   }
      // )

      // return messages
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  return {
    data, fetchNextPage, isFetching
  }
}