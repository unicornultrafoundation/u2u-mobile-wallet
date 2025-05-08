import { fetchU2UPrice } from "@/service/token"
import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"

export const useU2UPrice = () => {
  const {networkConfig} = useNetwork()
  const {data, isFetching, refetch} = useQuery({
    queryKey: ['u2u-price', networkConfig?.api_endpoint],
    queryFn: async () => {
      if (!networkConfig || !networkConfig.api_endpoint) return 0
      return fetchU2UPrice(networkConfig.api_endpoint)
    },
    refetchInterval: 2 * 60 * 1000,
    placeholderData: 0
  })

  return {
    data, isFetching, refetch
  }
}