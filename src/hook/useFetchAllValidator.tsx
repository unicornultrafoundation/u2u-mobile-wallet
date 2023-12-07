import BigNumber from "bignumber.js"
import { queryValidators, queryStakingStats, queryValidatorsApr, Validator } from "../service/staking"
import { validatorDataProcessor } from "../util/staking"
import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"

export const useFetchAllValidator = () => {
  const fetchValidators = async () => {
    try {
      console.log('fetchValidators')
      const { data } = await queryValidators()
      const { data: stakingStats } = await queryStakingStats()
      const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber(stakingStats.stakings[0].totalStaked || 0) : BigNumber(0)
      if (data && data.validators.length > 0) {
        let valIds: number[] = data.validators.map((v: any) => Number(v.validatorId))
        let dataApr: Record<string, any> = {}
        try {
          const { data } = await queryValidatorsApr(valIds)
          dataApr = data
        } catch (error) {
          console.log("queryValidatorsApr fail")
          return []
        }
        
        const promiseArr = await Promise.all(
          data.validators.map((v: any) => {
            let apr = dataApr[`apr${v.validatorId}`] || 0
            return validatorDataProcessor(v, totalNetworkStaked, Number(apr))
          })
        )

        return promiseArr
      }
      return []
    } catch (error) {
      console.log("fetch validators fail", error)
      return []
    }
  }

  const { data: validators, refetch } = useQuery<Validator[]>({
    queryKey: ['fetchValidators'],
    queryFn: fetchValidators,
    // enabled: false
    refetchInterval: 60000
  })

  return {
    validators: validators || [],
    fetch: refetch
  }
}