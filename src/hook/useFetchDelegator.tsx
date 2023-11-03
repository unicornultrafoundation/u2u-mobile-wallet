import BigNumber from "bignumber.js"
import { Delegator, queryDelegatorDetail, queryStakingStats } from "../service/staking"
import { delegatorDataProcessor } from "../util/staking"
import { useQuery } from "@tanstack/react-query"

export const useFetchDelegator = (delAddress: string) => {
  // const [delegator, setDelegator] = useState<Delegator>({} as Delegator)

  const fetchDelegator = async (address: string) => {
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

  const { data: delegator } = useQuery<Delegator>({
    queryKey: ['fetchDelegator', delAddress],
    queryFn: () => fetchDelegator(delAddress),
  })

  return {
    delegator
  }
}