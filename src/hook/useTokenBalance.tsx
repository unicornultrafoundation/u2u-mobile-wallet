import { useQueries } from "@tanstack/react-query"
import { useNativeBalance } from "./useNativeBalance"
import { useURC20TokenBalance } from "./useURC20TokenBalance"
import { useNetworkStore } from "../state/network"
import { fetchNativeBalance, fetchURC20Balance } from "../service/token"
import { useWallet } from "./useWallet"

export const useTokenBalance = (address: string, tokenAddress: string, decimals = 18) => {
  if (tokenAddress !== '' && tokenAddress !== '0x') return useURC20TokenBalance(address, tokenAddress, decimals)
  return useNativeBalance(address)
}

interface TokenMeta {
  tokenAddress: string
  decimals: number
}

export const useMultipleTokenBalance = (tokenAddress: TokenMeta[]) => {
  const {blockExplorer} = useNetworkStore()
  const {wallet} = useWallet()

  const address = wallet.address

  const queries = useQueries({
    queries: tokenAddress.map((i) => {
      return {
        queryKey: ["token-balance", i.tokenAddress, i.decimals],
        queryFn: () => {
          if (i.tokenAddress !== '' && i.tokenAddress !== '0x') return fetchURC20Balance(blockExplorer, address, i.tokenAddress, i.decimals)
          return fetchNativeBalance(blockExplorer, address)
        }
      }
    })
  })

  return queries.map((result, index) => ({
    address: tokenAddress[index].tokenAddress,
    balance: result.data || "0"
  }))
}