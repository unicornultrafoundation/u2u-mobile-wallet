import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"
import { fetchURC20MetaFromContract } from "../service/token"
import { useSupportedTokens } from "./useSupportedTokens"

export const useURC20Metadata = (tokenAddress: string) => {
  const {rpc} = useNetwork()

  const {data} = useQuery({
    queryKey: ['getURC20Metadata', tokenAddress, rpc],
    queryFn: async () => {
      if (tokenAddress === "0x" || tokenAddress === "") {
        return {
          name: "Unicorn Ultra",
          decimals: 18,
          symbol: "U2U"
        }
      }
      const rs = await fetchURC20MetaFromContract(tokenAddress, rpc)
      return rs
    },
    placeholderData: {
      name: "",
      decimals: 18,
      symbol: ""
    }
  })

  return {
    address: tokenAddress,
    decimals: 18,
    name: data?.name,
    symbol: data?.symbol
  }
}