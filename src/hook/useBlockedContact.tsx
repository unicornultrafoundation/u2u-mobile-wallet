import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";
import { signMessage } from "../util/wallet";

interface ChatBlockedAddress {
  walletAddress: string;
}

export const useChatBlockedAddress = (search?: string) => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {data, isFetching, fetchNextPage, refetch} = useInfiniteQuery({
    queryKey: ['fetchChatBlockedAddress-infinite', wallet.address, networkConfig?.api_endpoint, search],
    queryFn: async ({pageParam = 1}) => {
      if (!networkConfig || !networkConfig.api_endpoint) return []
      // const rs = await getBlockedContacts(networkConfig.api_endpoint, {
      //   page: pageParam,
      //   limit: 20,
      //   address: wallet.address,
      //   search
      // })

      // return rs.data.map((i: Record<string, any>) => {
      //   return {
      //     walletAddress: i.to
      //   }
      // })
      return []
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  return {
    data, isFetching, fetchNextPage,
  }
}