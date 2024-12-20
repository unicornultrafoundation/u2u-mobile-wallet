import { useInfiniteQuery } from "@tanstack/react-query";
import { useWallet } from "../useWallet";
import { useNetwork } from "../useNetwork";
import { useChat } from "./useChat";
import { APIResponse, DefaultGenerics, DeleteChannelAPIResponse, Message, MessageResponse, SendMessageAPIResponse } from "ermis-chat-js-sdk";

export interface Conversation {
  id: string;
  key: string;
  user: string[];
  newMessage: number;
  lastMessageContent: string;
  pinned: boolean;
  role: string;
  avatar: string;
  updatedAt: Date;
  handleDelete: () => Promise<DeleteChannelAPIResponse<DefaultGenerics>>;
  handleAccept: () => Promise<APIResponse>,
  handleReject: () => Promise<APIResponse>,
  handleArchive: () => Promise<APIResponse>,
  handleBlock: () => Promise<any>,
  markRead: () => Promise<any>,
  sendMessage: (message: Message) => Promise<SendMessageAPIResponse>,
  messages: MessageResponse<DefaultGenerics>[]
}

const PAGE_SIZE = 20

export const useAllConversation = (filter: string) => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {chatClient} = useChat()

  const {data, isFetching, fetchNextPage, refetch} = useInfiniteQuery({
    queryKey: ['fetchAllConversation-infinite', wallet.address, networkConfig?.chainID, chatClient?._getToken(), filter],
    queryFn: async ({pageParam = 1}) => {
      if (!chatClient) return [] as Conversation[]
      const rs = await chatClient.queryChannels(
        {
          // @ts-ignore
          type: ['messaging', 'team'],
          // @ts-ignore
          roles: filter === 'all' || filter === 'block' ? ['owner', 'moder', 'member'] : ['pending'],
          // @ts-ignore
          blocked: filter === 'block',
          limit: PAGE_SIZE,
          offset: (pageParam - 1) * PAGE_SIZE,
        },
        [{ last_message_at: -1 }],
        {
          message_limit: 2,
        }
      )
      
      return rs.map((channel) => {
        return {
          id: channel.id,
          key: channel.id,
          user: Object.keys(channel.state.members),
          newMessage: channel.countUnread(),
          pinned: false,
          avatar: '',
          role: channel.state.members[wallet.address.toLowerCase()].channel_role,
          lastMessageContent: channel.lastMessage() ? channel.lastMessage().text : '',
          updatedAt: new Date(channel.lastMessage() ? channel.lastMessage().updated_at : channel.data?.created_at as any),
          handleDelete: () => channel.delete({hard_delete: true}),
          handleArchive: () => channel.delete({hard_delete: false}),
          handleAccept: () => channel.acceptInvite('accept'),
          handleReject: () => channel.rejectInvite(),
          handleBlock: () => channel.blockUser(),
          sendMessage: (message: Message) => channel.sendMessage(message),
          messages: [],
          markRead: () => channel.markRead()
        } as Conversation
      })
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
    refetchInterval: 5000
  })

  return {
    data, isFetching, fetchNextPage, refetch
  }
}