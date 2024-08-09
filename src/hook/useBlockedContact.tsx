import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";
import { blockContact, getBlockedContacts, unblockContact } from "../service/chat";
import { signMessage } from "../util/wallet";

interface ChatBlockedAddress {
  walletAddress: string;
}

export const useChatBlockedAddress = () => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {data, isFetching, fetchNextPage} = useInfiniteQuery({
    queryKey: ['fetchChatBlockedAddress-infinite', wallet.address, networkConfig?.api_endpoint],
    queryFn: async ({pageParam = 1}) => {
      if (!networkConfig || !networkConfig.api_endpoint) return []
      const rs = await getBlockedContacts(networkConfig.api_endpoint, {
        page: pageParam,
        limit: 20,
        address: wallet.address
      })

      return rs.data.map((i: Record<string, any>) => {
        return {
          walletAddress: i.to
        }
      })
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  const {mutateAsync: blockAddress} = useMutation({
    mutationKey: ['block-address', wallet.address, networkConfig?.api_endpoint],
    mutationFn: async (address: string) => {
      if (!networkConfig) return
      const signature = await signMessage(
        `${wallet.address.toLowerCase()}-block-${address.toLowerCase()}`,
        wallet.privateKey
      )
      return blockContact(networkConfig.api_endpoint, {from: wallet.address, to: address, signature})
    }
  })

  const {mutateAsync: unblockAddress} = useMutation({
    mutationKey: ['unblock-address', wallet.address, networkConfig?.api_endpoint],
    mutationFn: async (address: string) => {
      if (!networkConfig) return
      const signature = await signMessage(
        `${wallet.address.toLowerCase()}-unblock-${address.toLowerCase()}`,
        wallet.privateKey
      )
      return unblockContact(networkConfig.api_endpoint, {from: wallet.address, to: address, signature})
    }
  })

  return {
    data, isFetching, fetchNextPage,
    blockAddress,
    unblockAddress
  }
}