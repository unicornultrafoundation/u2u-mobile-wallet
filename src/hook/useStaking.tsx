import { useCallback, useMemo } from "react";
import Web3 from 'web3'
import { fetchCurrentEpoch, fetchEpochAccumulatedRewardPerToken, fetchStakedAmount } from "../service/staking";
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";
import { U2U_STAKING_ABI } from "../util/abis/staking";
import BigNumber from "bignumber.js";
import { useAPR } from "./useAPR";
import { useTotalSupply } from "./useTotalSupply";
import { useEpochRewards } from "./useEpochRewards";
import { useFetchAllValidator } from "./useFetchAllValidator";

export function useStaking() {
  const {wallet} = useWallet()
  const {rpc, networkConfig} = useNetwork()

  const stakingContractOptions = useMemo(() => {
    if (!networkConfig) return undefined
    return {
      contractAddress: networkConfig.stakingAddress,
      abi: U2U_STAKING_ABI
    }
  }, [networkConfig])

  const { accumulateRewardPerEpoch } = useAPR(stakingContractOptions)
  const { supply } = useTotalSupply(stakingContractOptions)
  const { rewardsPerEpoch } = useEpochRewards(stakingContractOptions)
  const { validators } = useFetchAllValidator()

  return {
    accumulateRewardPerEpoch,
    supply,
    rewardsPerEpoch,
    validators
  }
}
