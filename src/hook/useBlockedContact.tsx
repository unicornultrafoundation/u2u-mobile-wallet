import { useInfiniteQuery } from "@tanstack/react-query";
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";
import { getBlockedContacts } from "../service/chat";

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

  const blockAddress = (address: string) => {

  }

  const unblockAddress = (address: string) => {

  }

  return {
    data, isFetching, fetchNextPage,
    blockAddress,
    unblockAddress
  }
}