import { useInfiniteQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"
import { getConversationMessages } from "../service/chat"
import { signMessage } from "../util/wallet"
import { useWallet } from "./useWallet"

export const useConversationMessages = (conversationID: string) => {
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()

  const {data, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['conversation-messages', conversationID, networkConfig?.api_endpoint],
    queryFn: async ({pageParam = 1}) => {
      if (!networkConfig) return []
      const signature = await signMessage(
        `conversation-${conversationID}`,
        wallet.privateKey
      )
      const now = Date.now()
      
      return [
        {
          conversationID: conversationID,
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: conversationID,
          from: '0x0F9a26667C7Eb21734509044B0f18629589C2Cf5',
          content: 'test content 2222',
          readBy: [],
          createdAt: new Date(now - 1000)
        },
        {
          conversationID: conversationID,
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: conversationID,
          from: '0x0F9a26667C7Eb21734509044B0f18629589C2Cf5',
          content: 'test content 2222',
          readBy: [],
          createdAt: new Date(now - 1000)
        },
        {
          conversationID: conversationID,
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: conversationID,
          from: '0x0F9a26667C7Eb21734509044B0f18629589C2Cf5',
          content: 'test content 2222',
          readBy: [],
          createdAt: new Date(now - 1000)
        },
        {
          conversationID: conversationID,
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: conversationID,
          from: '0x0F9a26667C7Eb21734509044B0f18629589C2Cf5',
          content: 'test content 2222',
          readBy: [],
          createdAt: new Date(now - 1000)
        },
        {
          conversationID: conversationID,
          from: wallet.address,
          content: 'test content',
          readBy: [],
          createdAt: new Date(now)
        },
        {
          conversationID: conversationID,
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