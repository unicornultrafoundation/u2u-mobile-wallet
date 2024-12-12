import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"
import { useStaking } from "./useStaking"
import { useWallet } from "./useWallet"
import { logErrorForMonitoring } from "./useCrashlytics"
import BigNumber from "bignumber.js"
import { useFetchAllValidator } from "./useFetchAllValidator"
import { Delegation, queryAllDelegationsOfWallet } from "@/service/staking"

export const useTotalStakedAmount = () => {
  const { validators } = useFetchAllValidator()
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {data, isFetching, refetch} = useQuery({
    queryKey: ['total-staked-amount', wallet.address, networkConfig?.sfcSubgraph],
    initialData: "0",
    enabled: !!wallet,
    queryFn: async () => {
      try {
        if (!networkConfig) return "0"
        // Calculate all staked amount
        const result = await queryAllDelegationsOfWallet(wallet.address.toLowerCase(), networkConfig.sfcSubgraph)
        
        const staked = result.delegations.reduce((pre: any, cur: any) => {
          return BigNumber(pre).plus(cur.stakedAmount).toFixed()
        }, "0")
        return BigNumber(staked).dividedBy(10 ** 18).toFixed()
      } catch (error) {
        logErrorForMonitoring(error as any, "get all pending rewards fail")
        return "0"
      }
    }
  })

  return {
    data, isFetching, refetch
  }
}