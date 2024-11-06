import { useMutation } from "@tanstack/react-query";
import { UserResponse } from "ermis-chat-js-sdk";
import { useWallet } from "../useWallet";
import { chatClient } from "@/util/chat";
import { useUserProfile } from "./useUserProfile";

export const useUpdateProfile = () => {
  const {wallet} = useWallet()
  const {data: currentProfile} = useUserProfile(wallet.address.toLowerCase())

  const {mutateAsync} = useMutation({
    mutationKey: ['update-profile', wallet.address, currentProfile],
    mutationFn: async (newProfile: Partial<UserResponse>) => {
      if (!chatClient || !currentProfile) return

      return chatClient.updateProfile(newProfile.name || currentProfile.name || '', newProfile.about_me || currentProfile.about_me || '')
    }
  })

  return {
    mutateAsync
  }
}