import { useCallback, useEffect, useMemo, useState } from "react";
import { Delegation, fetchPendingRewards } from "../service/staking";
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";
import { U2U_STAKING_ABI } from "../util/abis/staking";
import BigNumber from "bignumber.js";
import { useFetchAllValidator } from "./useFetchAllValidator";
import { logErrorForMonitoring } from "./useCrashlytics";
import { useAllPendingRewards } from "./useAllPendingRewards";

export function useStaking() {
  const {data: allPendingRewards} = useAllPendingRewards()
  // const [allPendingRewards, setAllPendingRewards] = useState("0")
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

  // const { validators } = useFetchAllValidator()

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // Calculate all staked amount
  //       const allDelegations: Delegation[] = []
  //       validators.forEach(({delegations}) => {
  //         delegations?.forEach((i) => {
  //           if (i.delegatorAddress.toLowerCase() === wallet.address.toLowerCase()) {
  //             allDelegations.push(i)
  //           }
  //         })
  //       })
  //       const staked = allDelegations.reduce((pre, cur) => {
  //         return BigNumber(pre).plus(cur.stakedAmount).toFixed()
  //       }, "0")
  //       setTotalStakedAmount(
  //         BigNumber(staked).dividedBy(10 ** 18).toFixed()
  //       )
  //     } catch (error) {
  //       logErrorForMonitoring(error as any, "get all pending rewards fail")
  //     }
  //   })()
  // }, [validators, wallet])

  return {
    stakingContractOptions,
    allPendingRewards,
    totalStakedAmount,
  }
}
