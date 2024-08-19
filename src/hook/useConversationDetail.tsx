import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"
import { Conversation, getConversationByParticipants } from "../service/chat"
import { signMessage } from "../util/wallet"
import { useWallet } from "./useWallet"

export const useConversationDetail = (userAddresses: string[]) => {
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()

  const {data, isFetching, refetch, error} = useQuery<Conversation>({
    queryKey: ['conversation-detail', userAddresses.sort(), networkConfig?.api_endpoint, wallet.address],
    queryFn: async () => {
      if (!networkConfig) return {} as Conversation
      const signature = await signMessage(
        `conversation-${userAddresses.sort().join('-')}`,
        wallet.privateKey
      )
      const rs = await getConversationByParticipants(networkConfig.api_endpoint, {userAddresses, signature})
      return rs
    }
  })

  return {
    data, isFetching, refetch, error
  }
}