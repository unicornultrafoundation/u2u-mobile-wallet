// import { useQuery } from "@tanstack/react-query"
// import { useNetwork } from "./useNetwork"
// import { useWallet } from "./useWallet"
// import { useChat } from "./chat/useChat"
// // import { MessagePaginationOptions } from "ermis-chat-js-sdk"

// const LIMIT = 50

// export const useConversationMessages = (conversationID: string, lastMessageID?: string) => {
//   const {networkConfig} = useNetwork()
//   const {wallet} = useWallet()

//   const {chatClient} = useChat()

//   const {data, isFetching, isLoading} = useQuery({
//     queryKey: ['conversation-messages', conversationID, wallet.address, networkConfig?.api_endpoint, chatClient?._getToken(), lastMessageID],
//     queryFn: async () => {
//       if (!networkConfig || !chatClient) return []
//       const channel = chatClient.channel("messaging", conversationID);
//       const messageCondition: MessagePaginationOptions = {
//         limit: LIMIT
//       }

//       if (lastMessageID) {
//         messageCondition.id_lt = lastMessageID
//       }
//       const detail = await channel.query({
//         messages: messageCondition
//       });

//       return detail.messages.map((message) => {

//         return {
//           id: message.id,
//           conversationID: conversationID,
//           from: message.user?.id,
//           content: message.text,
//           readBy: [message.user_id],
//           createdAt: new Date(message.created_at!)
//         }
//       })
//     },
//     initialData: []
//   })

//   return {
//     data, isFetching, isLoading
//   }
// }