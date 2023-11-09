import { useCallback, useEffect, useMemo, useState } from "react";
import { Delegation, fetchPendingRewards } from "../service/staking";
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";
import { U2U_STAKING_ABI } from "../util/abis/staking";
import BigNumber from "bignumber.js";
import { useAPR } from "./useAPR";
import { useTotalSupply } from "./useTotalSupply";
import { useEpochRewards } from "./useEpochRewards";
import { useFetchAllValidator } from "./useFetchAllValidator";
import { useDelegate } from "./useDelegate";
import { usePendingReward } from "./usePendingReward";
import { useClaimRewards } from "./useClaimRewards";
import { useUndelegate } from "./useUndelegate";

export function useStaking() {
  const [allPendingRewards, setAllPendingRewards] = useState("0")
  const [totalStakedAmount, setTotalStakedAmount] = useState("0")

  const {wallet} = useWallet()
  const {rpc, networkConfig} = useNetwork()

  const stakingContractOptions = useMemo(() => {
    if (!networkConfig) return undefined
    return {
      contractAddress: networkConfig.stakingAddress,
      abi: U2U_STAKING_ABI
    }
  }, [networkConfig])

  const getPendingRewards = useCallback(async(delegatorAddress: string, validatorId: number) => {
    if (!stakingContractOptions) return "0";
    try {
      const _rewards = await fetchPendingRewards(stakingContractOptions, delegatorAddress, validatorId, rpc)
      return BigNumber(_rewards).dividedBy(10 ** 18).toFixed()
    } catch (error) {
      console.log("get pending rewards fail")
      return "0"
    }
  }, [stakingContractOptions])

  const { accumulateRewardPerEpoch } = useAPR(stakingContractOptions)
  const { supply } = useTotalSupply(stakingContractOptions)
  const { rewardsPerEpoch } = useEpochRewards(stakingContractOptions)
  const { validators, fetch: fetchAllValidators } = useFetchAllValidator()
  const { parseDelegate, submitDelegate } = useDelegate(stakingContractOptions)
  const { claimRewards } = useClaimRewards(stakingContractOptions)
  const { undegegate } = useUndelegate(stakingContractOptions)

  useEffect(() => {
    (async () => {
      try {
        // Calculate all pending rewards
        const promiseArr = validators.map((v) => getPendingRewards(wallet.address, Number(v.valId)))
        const rs = await Promise.all(promiseArr)
        const total = rs.reduce((pre, cur) => {
          return BigNumber(pre).plus(cur).toFixed()
        }, "0")
        setAllPendingRewards(total)

        // Calculate all staked amount
        const allDelegations: Delegation[] = []
        validators.forEach(({delegations}) => {
          delegations?.forEach((i) => {
            if (i.delegatorAddress.toLowerCase() === wallet.address.toLowerCase()) {
              allDelegations.push(i)
            }
          })
        })
        const staked = allDelegations.reduce((pre, cur) => {
          return BigNumber(pre).plus(cur.stakedAmount).toFixed()
        }, "0")
        setTotalStakedAmount(
          BigNumber(staked).dividedBy(10 ** 18).toFixed()
        )
      } catch (error) {
        console.log("get all pending rewards fail", error)
      }
    })()
  }, [validators, wallet])

  return {
    stakingContractOptions,
    accumulateRewardPerEpoch,
    supply,
    rewardsPerEpoch,
    validators,
    fetchAllValidators,
    allPendingRewards,
    totalStakedAmount,
    parseDelegate,
    submitDelegate,
    claimRewards,
    undegegate
  }
}
