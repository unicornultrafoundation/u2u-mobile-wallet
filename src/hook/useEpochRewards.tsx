import { useCallback, useEffect, useState } from "react"
import BigNumber from "bignumber.js"
import { useNetwork } from "./useNetwork"
import { ContractOptions } from "../util/contract"
import { useCurrentEpoch } from "./useCurrentEpoch"
import { fetchCurrentEpochSnapShot } from "../service/staking"
import { logErrorForMonitoring } from "./useCrashlytics"

const getEpochRewards = async (epoch: number, rpc: string, stakingContractOptions?: ContractOptions) => {
  if (!stakingContractOptions) {
    console.log("invalid staking contract options")
    return "0"
  }
  try {
    if (!epoch) return "0"
    const _epochNumber = BigNumber(epoch).toNumber() - 1;

    if (_epochNumber < 0) return "0"
    const rs = await fetchCurrentEpochSnapShot(stakingContractOptions, _epochNumber, rpc)
    const _u2uPerEpoch = BigNumber(rs[4]).multipliedBy(BigNumber(60*7)).plus(BigNumber(rs[1]))
    return BigNumber(_u2uPerEpoch).dividedBy(10 ** 18).toFixed()
  } catch (error) {
    console.log("fetch epoch reward fail", error)
    logErrorForMonitoring(error as any, "fetch epoch reward fail")
    return "0"
  }
}

export const useEpochRewards = (stakingContractOptions?: ContractOptions) => {
  const {rpc} = useNetwork()

  const fetchRewardsPerEpoch = async (epoch: number) => {
    return getEpochRewards(epoch, rpc, stakingContractOptions)
  }

  return {
    fetchRewardsPerEpoch
  }
}