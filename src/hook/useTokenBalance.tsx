import { useNativeBalance } from "./useNativeBalance"
import { useURC20TokenBalance } from "./useURC20TokenBalance"

export const useTokenBalance = (address: string, tokenAddress: string) => {
  if (tokenAddress !== '' && tokenAddress !== '0x') return useURC20TokenBalance(address, tokenAddress)
  return useNativeBalance(address)
}