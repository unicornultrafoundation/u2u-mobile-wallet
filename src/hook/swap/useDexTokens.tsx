import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "../useNetwork"
import request from "graphql-request"
import { Schema } from "@/service/graph/schema"

export const useDexTokens = () => {
  const {networkConfig} = useNetwork()

  const {data, isFetching, refetch} = useQuery({
    queryKey: ['dex-tokens', networkConfig],
    queryFn: async () => {
      if (!networkConfig || !networkConfig.dexSubgraph || networkConfig.dexSubgraph === "") return []
      const rs = await request<{tokens: Record<string, any>[]}>(
        networkConfig.dexSubgraph,
        Schema().DEX_TOKENS
      )
      return rs.tokens.map((item) => {
        item.logo = `https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/${networkConfig.chainID}/${item.id.toLowerCase()}.png`
        item.address = item.id

        return item
      }) || []
    },
    initialData: []
  })

  return {
    data, isFetching, refetch
  }
}