import { useCallback, useEffect, useState } from "react"
import { ContractOptions } from "../util/contract"
import BigNumber from "bignumber.js";
import { fetchPendingRewards } from "../service/staking";
import { useNetwork } from "./useNetwork";

interface Props {
  stakingContractOptions?: ContractOptions,
  delegatorAddress: string;
  validatorId: number
}

export const usePendingReward = ({stakingContractOptions, delegatorAddress, validatorId}: Props) => {
  const {rpc} = useNetwork()
  const [pendingRewards, setPendingRewards] = useState("")

  const getPendingRewards = useCallback(async() => {
    if (!delegatorAddress || !validatorId || !stakingContractOptions) return;
    try {
      const _rewards = await fetchPendingRewards(stakingContractOptions, delegatorAddress, validatorId, rpc)
      setPendingRewards(
        BigNumber(_rewards).dividedBy(10 ** 18).toFixed()
      )
    } catch (error) {
      console.log("get pending rewards fail")
    }
  }, [delegatorAddress, validatorId, stakingContractOptions])

  useEffect(() => {
    getPendingRewards()
    const interval = setInterval(async () => {
      getPendingRewards()
    }, 5000)

    return () => clearInterval(interval)
  }, [delegatorAddress, stakingContractOptions, validatorId]);
  return {
    pendingRewards
  }
}