import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useWallet } from "@/hook/useWallet"
import { chatClient } from "@/util/chat"
import { UserResponse } from "ermis-chat-js-sdk"

export const useContact = (search?: string) => {
  const {wallet} = useWallet()

  const {data, isLoading} = useQuery({
    queryKey: ['chat-contact', wallet.address],
    queryFn: async () => {
      if (!chatClient) return [] as UserResponse[]

      const rs = await chatClient.queryContacts()
      return rs.contact_users
    },
    initialData: [] as UserResponse[]
  })

  const filtered = useMemo(() => {
    return data.filter((item: any) => {
      if (!search || search === '') return true
      return item.id.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [data, search])

  return {
    contactList: filtered,
  }
}