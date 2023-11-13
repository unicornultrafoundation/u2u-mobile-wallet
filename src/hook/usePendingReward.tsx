import { useCallback } from "react"
import { ContractOptions } from "../util/contract"
import BigNumber from "bignumber.js";
import { fetchPendingRewards } from "../service/staking";
import { useNetwork } from "./useNetwork";
import { useQuery } from "@tanstack/react-query";

interface Props {
  stakingContractOptions?: ContractOptions,
  delegatorAddress: string;
  validatorId: number
}

export const usePendingReward = ({stakingContractOptions, delegatorAddress, validatorId}: Props) => {
  const {rpc} = useNetwork()

  const getPendingRewards = useCallback(async() => {
    if (!delegatorAddress || !validatorId || !stakingContractOptions) return "0";
    try {
      const _rewards = await fetchPendingRewards(stakingContractOptions, delegatorAddress, validatorId, rpc)
      return BigNumber(_rewards).dividedBy(10 ** 18).toFixed()
    } catch (error) {
      console.log("get pending rewards fail")
      return "0"
    }
  }, [delegatorAddress, validatorId, stakingContractOptions, rpc])

  const {data: pendingRewards} = useQuery({
    queryKey: ['getPendingRewards', delegatorAddress, validatorId, stakingContractOptions, rpc],
    queryFn: getPendingRewards,
    refetchInterval: 30000,
    placeholderData: "0"
  })

  return {
    pendingRewards: pendingRewards || "0"
  }
}