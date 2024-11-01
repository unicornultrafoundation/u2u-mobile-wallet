import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "../useNetwork"
import { useWallet } from "../useWallet"
import { Conversation } from "./useAllConversation"
import { useChat } from "./useChat"
import { ChannelMemberResponse, Message } from "ermis-chat-js-sdk"

export const useConversationDetail = (conversationID: string) => {
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()

  const {chatClient} = useChat()

  const {data, isFetching, refetch, error} = useQuery<Conversation>({
    queryKey: ['conversation-detail', conversationID, networkConfig?.api_endpoint, chatClient?._getToken(), wallet.address],
    queryFn: async () => {
      if (!networkConfig || !chatClient) return {} as Conversation
      const channel = chatClient.channel("messaging", conversationID);
      const detail = await channel.query({
        messages: {
          limit: 20
        }
      });

      return {
        id: channel.id,
        key: channel.id,
        // user: Object.keys(channel.state.members),
        user: channel.data!.members?.map((i) => {
          if (typeof i === 'string') return i
          return i.user_id
        }),
        newMessage: channel.countUnread(),
        pinned: false,
        avatar: '',
        role: channel.state.members[wallet.address.toLowerCase()].channel_role,
        // role: memberObj?.channel_role ? memberObj?.channel_role : '',
        lastMessageContent: channel.lastMessage() ? channel.lastMessage().text : '',
        updatedAt: new Date(channel.lastMessage() ? channel.lastMessage().updated_at : channel.data?.created_at as any),
        handleDelete: () => channel.delete({hard_delete: true}),
        handleArchive: () => channel.delete({ hard_delete: false }),
        handleAccept: () => channel.acceptInvite(),
        handleReject: () => channel.rejectInvite(),
        handleBlock: () => channel.blockUser(),
        sendMessage: (message: Message) => channel.sendMessage(message),
        markRead: () => channel.markRead(),
        messages: detail.messages
      } as Conversation
    }
  })

  return {
    data, isFetching, refetch, error
  }
}