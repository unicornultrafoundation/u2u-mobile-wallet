import { useEffect, useRef, useState } from "react"
import { useNetwork } from "../useNetwork"
import { useWallet } from "../useWallet"
import { useChat } from "./useChat"

export const useSubscribeMessage = (conversationID: string) => {
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()

  const {chatClient} = useChat()

  const messagesRef = useRef<Record<string, any>[]>([])
  const [messages, setMessages] = useState<Record<string, any>[]>([])

  useEffect(() => {
    if (!networkConfig || !chatClient) return
    const channel = chatClient.channel("messaging", conversationID);

    const {unsubscribe} = channel.on('message.new', (event) => {
      const newMessage = event.message
      if (!newMessage) return

      const currentMessages = [...messages]
      const existed = currentMessages.findIndex((m) => m.id === newMessage.id)
      
      if (existed === -1) {
        currentMessages.push({
          id: newMessage.id,
          conversationID: conversationID,
          from: newMessage.user?.id,
          content: newMessage.text,
          readBy: [newMessage.user_id],
          createdAt: new Date(newMessage.created_at!)
        })

        setMessages([...currentMessages])
      }
    })

    return () => {
      unsubscribe()
    }

  }, [conversationID, chatClient, wallet])

  return {
    messagesRef: messagesRef,
    messages
  }
}