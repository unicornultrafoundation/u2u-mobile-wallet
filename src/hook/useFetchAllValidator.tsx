import { useEffect, useState } from "react"
import BigNumber from "bignumber.js"
import { queryValidators, queryStakingStats, queryValidatorsApr, Validator } from "../service/staking"
import { validatorDataProcessor } from "../util/staking"

export const useFetchAllValidator = () => {
  const [validators, setValidators] = useState<Validator[]>([])

  const fetchValidators = async () => {
    const { data } = await queryValidators()
    const { data: stakingStats } = await queryStakingStats()
    const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber(stakingStats.stakings[0].totalStaked || 0) : BigNumber(0)
    if (data && data.validators.length > 0) {
      let valIds: number[] = data.validators.map((v: any) => Number(v.validatorId))
      const { data: dataApr } = await queryValidatorsApr(valIds)
      setValidators(data.validators.map((v: any) => {
        let apr = dataApr[`apr${v.validatorId}`]
        return validatorDataProcessor(v, totalNetworkStaked, Number(apr))
      }))
    }
  }

  useEffect(() => {
    fetchValidators()
    const interval = setInterval(async () => {
      fetchValidators()
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  return {
    validators
  }
}