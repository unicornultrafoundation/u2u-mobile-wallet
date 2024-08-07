import { useInfiniteQuery } from "@tanstack/react-query";
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";

interface ChatBlockedAddress {
  walletAddress: string;
}

export const useChatBlockedAddress = () => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {data, isFetching, fetchNextPage} = useInfiniteQuery({
    queryKey: ['fetchChatBlockedAddress-infinite', wallet.address, networkConfig?.chainID],
    queryFn: async ({pageParam = 1}) => {
      return [
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
        {walletAddress: '0x01B3232Bc2AdfBa8c39Ba4A4002924d62e39aE5d'},
      ] as ChatBlockedAddress[]
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