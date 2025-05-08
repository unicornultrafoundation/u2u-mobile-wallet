import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { fetchCurrentEpoch, fetchEpochAccumulatedRewardPerToken } from "../service/staking";

export const useAPR = (stakingContractOptions?: ContractOptions) => {
  const {rpc} = useNetwork()

  const getCurrentEpoch = useCallback(() => {
    if (!stakingContractOptions) {
      throw new Error("invalid staking contract options")
    }
    return fetchCurrentEpoch(stakingContractOptions, rpc)
  }, [stakingContractOptions])

  const getEpochAccumulatedRewardPerToken = useCallback((epoch: number, validatorID: number) => {
    if (!stakingContractOptions) {
      throw new Error("invalid staking contract options")
    }
    return fetchEpochAccumulatedRewardPerToken(stakingContractOptions, epoch, validatorID, rpc)
  }, [stakingContractOptions])

  const accumulateRewardPerEpoch = useCallback(async (validatorID: number) => {
    if (!validatorID) return BigNumber(0).toFixed();
    const _epoch = await getCurrentEpoch()
    const _epochNumber = BigNumber(_epoch).toNumber();
    const _fromEpoch = await getEpochAccumulatedRewardPerToken(_epochNumber - 2, validatorID)
    const _toEpoch = await getEpochAccumulatedRewardPerToken(_epochNumber - 1, validatorID)
      return BigNumber(_toEpoch).minus(_fromEpoch)
  }, [stakingContractOptions])

  return {
    accumulateRewardPerEpoch
  }
}