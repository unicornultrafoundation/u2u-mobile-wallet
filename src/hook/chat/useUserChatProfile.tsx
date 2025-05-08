// import { useQuery } from "@tanstack/react-query"
// import { useChat } from "./useChat"

// export const useUserChatProfile = (userID: string) => {
//   const {chatClient} = useChat()

//   const {data, isFetching, refetch} = useQuery({
//     queryKey: ['user-chat-profile', userID],
//     queryFn: async () => {
//       if (!chatClient) return null
//       const allUsers = chatClient.state.users

//       return allUsers[userID] || null
//     }
//   })

//   return {
//     data,
//     isFetching,
//     refetch
//   }
// }