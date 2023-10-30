import { useEffect, useState } from "react"
import BigNumber from "bignumber.js"
import { Delegator, queryDelegatorDetail, queryStakingStats } from "../service/staking"
import { delegatorDataProcessor } from "../util/staking"

export const useFetchDelegator = (delAddress: string) => {
  const [delegator, setDelegator] = useState<Delegator>({} as Delegator)

  const fetchDelegator = async (address: string) => {
    if(!address) return
  
    const {data} = await queryDelegatorDetail(address.toLowerCase())
    const {data: stakingStats} = await queryStakingStats()
    const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber(stakingStats.stakings[0].totalStaked || 0) : BigNumber(0)
    if (data && data?.delegators) {
      setDelegator(
        delegatorDataProcessor(data?.delegators[0], totalNetworkStaked)
      );
    }
  }

  useEffect(() => {
    fetchDelegator(delAddress)
  }, [delAddress])
  return {
    delegator
  }
}