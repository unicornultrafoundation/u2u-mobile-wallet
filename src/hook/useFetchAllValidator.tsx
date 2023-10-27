import { useEffect, useState } from "react"
import BigNumber from "bignumber.js"
import { queryValidators, queryStakingStats, queryValidatorsApr, Validator } from "../service/staking"
import { validatorDataProcessor } from "../util/staking"

export const useFetchAllValidator = () => {
  const [validators, setValidators] = useState<Validator[]>([])

  const fetchValidators = async () => {
    try {
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
        }
        setValidators(data.validators.map((v: any) => {
          let apr = dataApr[`apr${v.validatorId}`] || 0
          return validatorDataProcessor(v, totalNetworkStaked, Number(apr))
        }))
      }
    } catch (error) {
      console.log("fetch validators fail")
    }
  }

  useEffect(() => {
    fetchValidators()
    const interval = setInterval(async () => {
      fetchValidators()
    }, 20000)

    return () => clearInterval(interval)
  }, [])
  return {
    validators
  }
}