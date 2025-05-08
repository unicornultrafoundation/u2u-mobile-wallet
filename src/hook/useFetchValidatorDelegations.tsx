import { queryValidatorDelegations } from "@/service/staking"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"
import { delegationDataProcessor } from "@/util/staking"

export const useFetchValidatorDelegations = (validatorId: number) => {
  const {networkConfig} = useNetwork()

  const {data, isFetching, fetchNextPage, refetch} = useInfiniteQuery({
    queryKey: ['validator-delegations', validatorId],
    queryFn: async ({pageParam = 1}) => {
      if (!networkConfig) return []
      const rs = await queryValidatorDelegations(validatorId, pageParam, networkConfig.sfcSubgraph)
      return rs.delegations.map((i: any) => delegationDataProcessor(i))
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  return {
    data, isFetching, fetchNextPage, refetch
  }
}