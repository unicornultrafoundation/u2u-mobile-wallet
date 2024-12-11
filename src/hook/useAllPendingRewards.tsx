import { useQuery } from "@tanstack/react-query"
import BigNumber from "bignumber.js"
import { useStaking } from "./useStaking"
import { useCallback, useMemo } from "react"
import { fetchPendingRewards } from "@/service/staking"
import { logErrorForMonitoring } from "./useCrashlytics"
import { useFetchAllValidator } from "./useFetchAllValidator"
import { useWallet } from "./useWallet"
import { useNetwork } from "./useNetwork"
import { U2U_STAKING_ABI } from "@/util/abis/staking"

export const useAllPendingRewards = () => {
  const { validators } = useFetchAllValidator()
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
      logErrorForMonitoring(error as any, "get pending rewards fail")
      return "0"
    }
  }, [stakingContractOptions])

  const {data, isFetching, refetch} = useQuery({
    queryKey: ['pending-reward', wallet.address],
    queryFn: async () => {
      try {
        console.log('in here 123')
        // Calculate all pending rewards
        const promiseArr = validators.map((v) => getPendingRewards(wallet.address, Number(v.valId)))
        const rs = await Promise.all(promiseArr)
        console.log(rs)
        const total = rs.reduce((pre, cur) => {
          return BigNumber(pre).plus(cur).toFixed()
        }, "0")
        return total
      } catch (error) {
        logErrorForMonitoring(error as any, "get all pending rewards fail")
      }
    },
    enabled: !!wallet
  })

  return {
    data, isFetching, refetch
  }
}