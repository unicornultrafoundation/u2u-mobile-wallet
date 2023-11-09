import BigNumber from "bignumber.js"
import { queryValidators, queryStakingStats, queryValidatorsApr, Validator } from "../service/staking"
import { validatorDataProcessor } from "../util/staking"
import { useQuery } from "@tanstack/react-query"

export const useFetchAllValidator = () => {
  const fetchValidators = async () => {
    try {
      console.log('here all validator 0')
      const { data } = await queryValidators()
      console.log('1')
      const { data: stakingStats } = await queryStakingStats()
      console.log('2')
      const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber(stakingStats.stakings[0].totalStaked || 0) : BigNumber(0)
      console.log('dddddd')
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

  const { data: validators } = useQuery<Validator[]>({
    queryKey: ['fetchValidators'],
    queryFn: fetchValidators,
  })

  return {
    validators: validators || []
  }
}