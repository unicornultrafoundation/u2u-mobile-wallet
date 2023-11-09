import BigNumber from "bignumber.js"
import { queryValidators, queryStakingStats, queryValidatorsApr, Validator } from "../service/staking"
import { validatorDataProcessor } from "../util/staking"
import { useQuery } from "@tanstack/react-query"

export const useFetchAllValidator = () => {
  const fetchValidators = async () => {
    try {
      console.log('fetch all validator')
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
        return data.validators.map((v: any) => {
          let apr = dataApr[`apr${v.validatorId}`] || 0
          return validatorDataProcessor(v, totalNetworkStaked, Number(apr))
        })
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
    enabled: false
  })

  return {
    validators: validators || [],
    fetch: refetch
  }
}