import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { fetchCurrentEpoch } from "../service/staking";
import BigNumber from "bignumber.js";
import { logErrorForMonitoring } from "./useCrashlytics";
import { useQuery } from "@tanstack/react-query";

const getCurrentEpoch = async (rpc: string, stakingContractOptions?: ContractOptions) => {
  if (!stakingContractOptions) {
    console.log("invalid staking contract options")
    return 0
  }
  try {
    const rs = await fetchCurrentEpoch(stakingContractOptions, rpc)
    return BigNumber(rs).toNumber()
  } catch (error) {
    logErrorForMonitoring(error as any, 'fetch current epoch fail')
    return 0
  }
}

export const useCurrentEpoch = (stakingContractOptions?: ContractOptions) => {
  const {rpc} = useNetwork()

  const {data, isFetching, refetch} = useQuery({
    queryKey: ['current-epoch', stakingContractOptions?.contractAddress],
    queryFn: () => {
      return getCurrentEpoch(rpc, stakingContractOptions)
    }
  })

  return {
    data, isFetching, refetch
  }
}