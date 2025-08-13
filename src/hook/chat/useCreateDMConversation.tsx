import { useCallback } from "react"
import { useChat } from "./useChat"
import { useWallet } from "../useWallet"
import { useNetwork } from "../useNetwork"

export const useCreateDMConversation = () => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {chatClient} = useChat()

  const createConversation = useCallback(async (receiverAddress: string) => {
    if (!chatClient) return
    const channel = chatClient.channel('messaging', {
      members: [wallet.address.toLowerCase(), receiverAddress.toLowerCase()],
    });
    await channel.create();
  }, [wallet, networkConfig, chatClient])

  return {
    createConversation
  }
}