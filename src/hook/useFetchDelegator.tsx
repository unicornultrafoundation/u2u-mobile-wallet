import BigNumber from "bignumber.js"
import { Delegator, queryDelegatorDetail, queryStakingStats } from "../service/staking"
import { delegatorDataProcessor } from "../util/staking"
import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"

export const useFetchDelegator = (delAddress: string) => {
  const {networkConfig} = useNetwork()
  const fetchDelegator = async (address: string) => {
    console.log('fetchDelegator')
    if(!address) return {} as Delegator
    try {
      const {data} = await queryDelegatorDetail(address.toLowerCase())

      const {data: stakingStats} = await queryStakingStats()
      const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber(stakingStats.stakings[0].totalStaked || 0) : BigNumber(0)
      if (data && data?.delegators) {
        return delegatorDataProcessor(data?.delegators[0], totalNetworkStaked)
      }
      return {} as Delegator
    } catch (error) {
      console.log('fetchDelegator fail')
      return {} as Delegator
    }
  }

  const { data: delegator, isLoading, refetch } = useQuery<Delegator>({
    queryKey: ['fetchDelegator', delAddress, networkConfig],
    queryFn: () => fetchDelegator(delAddress),
    placeholderData: {} as Delegator,
    refetchInterval: 30000
  })

  return {
    delegator: delegator || {} as Delegator,
    fetchDelegator: refetch,
    isLoading
  }
}