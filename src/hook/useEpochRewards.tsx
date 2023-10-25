import { useCallback, useEffect, useState } from "react"
import BigNumber from "bignumber.js"
import { useNetwork } from "./useNetwork"
import { ContractOptions } from "../util/contract"
import { useCurrentEpoch } from "./useCurrentEpoch"
import { fetchCurrentEpochSnapShot } from "../service/staking"

export const useEpochRewards = (stakingContractOptions?: ContractOptions) => {
  const {rpc} = useNetwork()
  const {epoch} = useCurrentEpoch(stakingContractOptions)

  const [rewardsPerEpoch, setRewardsPerEpoch] = useState("0")

  const getEpochRewards = useCallback(async () => {
    if (!stakingContractOptions) {
      throw new Error("invalid staking contract options")
    }
    try {
      const _epochNumber = BigNumber(epoch).toNumber() - 1;

      if (_epochNumber < 0) return

      const rs = await fetchCurrentEpochSnapShot(stakingContractOptions, _epochNumber, rpc)
      const _u2uPerEpoch = BigNumber(rs[4]).multipliedBy(BigNumber(60*7)).plus(BigNumber(rs[1]))
      setRewardsPerEpoch(BigNumber(_u2uPerEpoch).dividedBy(10 ** 18).toFixed())
    } catch (error) {
      console.log("fetch epoch reward fail", error)
    }
  }, [stakingContractOptions, rpc, epoch])

  useEffect(() => {
    getEpochRewards()
  }, [stakingContractOptions, epoch])

  return {
    rewardsPerEpoch
  }
}