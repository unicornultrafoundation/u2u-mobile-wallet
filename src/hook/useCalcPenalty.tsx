import { useCallback } from "react";
import { ethers } from "ethers";
import { ContractOptions, contractCall } from "../util/contract";
import BigNumber from "bignumber.js";
import { useWallet } from "./useWallet";
import { useNetwork } from "./useNetwork";

export const useCalcPenalty = (stakingContractOptions?: ContractOptions) => {
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()
  const calcPen = useCallback(async (validator: number, unLockAmount: number, lockedAmount: BigNumber) => {
    if (!stakingContractOptions || !networkConfig) return "0"
    try {
      if (validator && wallet.address && unLockAmount && lockedAmount) {
        const [lockupExtraReward, lockupBaseReward,] = await contractCall(stakingContractOptions, networkConfig.rpc, "getStashedLockupRewards", [wallet.address, validator])
        const unlockBigNum = BigNumber(unLockAmount).multipliedBy(10 ** 18)
        const lockupExtraRewardShare = BigNumber(lockupExtraReward).multipliedBy(unlockBigNum).div(lockedAmount)
        const lockupBaseRewardShare = BigNumber(lockupBaseReward).multipliedBy(unlockBigNum).div(lockedAmount).div(2)
        const penalty = lockupExtraRewardShare.plus(lockupBaseRewardShare)        
        return penalty.toFixed()
      }
    } catch (error) { 
      return "0"
    }
  }, [stakingContractOptions, wallet, networkConfig])

  return {
    calcPen
  }
}