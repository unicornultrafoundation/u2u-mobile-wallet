import { useQuery } from "@tanstack/react-query"
import BigNumber from "bignumber.js"
import { useStaking } from "./useStaking"
import { useCallback, useMemo } from "react"
import { fetchPendingRewards } from "@/service/staking"
import { logErrorForMonitoring } from "./useCrashlytics"
import { useFetchAllValidator } from "./useFetchAllValidator"
import { useWallet } from "./useWallet"
import { useNetwork } from "./useNetwork"
import { ContractOptions } from "@/util/contract"

const getPendingRewards = async (
  delegatorAddress: string,
  validatorId: number,
  rpc: string,
  stakingContractOptions: ContractOptions
) => {
  if (!stakingContractOptions) return "0";
  try {
    const _rewards = await fetchPendingRewards(stakingContractOptions, delegatorAddress, validatorId, rpc)
    return BigNumber(_rewards).dividedBy(10 ** 18).toFixed()
  } catch (error) {
    logErrorForMonitoring(error as any, "get pending rewards fail")
    return "0"
  }
}

export const useAllPendingRewards = () => {
  const { validators } = useFetchAllValidator()
  const {wallet} = useWallet()
  const {rpc} = useNetwork()

  const {stakingContractOptions} = useStaking()

  const {data, isFetching, refetch} = useQuery({
    queryKey: ['pending-reward', wallet.address, validators, rpc, stakingContractOptions],
    queryFn: async () => {
      try {
        if (!stakingContractOptions) return "0"
        // Calculate all pending rewards
        const promiseArr = validators.map((v) => getPendingRewards(wallet.address, Number(v.valId), rpc, stakingContractOptions))

        const rs = await Promise.all(promiseArr)

        const total = rs.reduce((pre, cur) => {
          return BigNumber(pre).plus(cur).toFixed()
        }, "0")
        return total
      } catch (error) {
        logErrorForMonitoring(error as any, "get all pending rewards fail")
        return "0"
      }
    },
    initialData: "0",
    // enabled: !!wallet && !stakingContractOptions
  })

  return {
    data, isFetching, refetch
  }
}