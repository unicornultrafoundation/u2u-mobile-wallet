import { useQuery } from "@tanstack/react-query"
import { chatClient } from "@/util/chat"

export const useUserProfile = (id: string) => {
  const {data, isLoading, isFetching, refetch} = useQuery({
    queryKey: ['user-profile', id],
    queryFn: async () => {
      if (!chatClient) return

      const rs = await chatClient.queryUser(id)
      return rs
    },
  })

  return {
    data, isLoading, refetch, isFetching
  }
}