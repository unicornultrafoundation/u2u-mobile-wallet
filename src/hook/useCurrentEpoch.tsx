import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { fetchCurrentEpoch } from "../service/staking";
import BigNumber from "bignumber.js";
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
    console.log("fetch current epoch fail")
    return 0
  }
}

export const useCurrentEpoch = (stakingContractOptions?: ContractOptions) => {
  const {rpc} = useNetwork()

  const {data: epoch, refetch} = useQuery({
    queryKey: ['getCurrentEpoch', stakingContractOptions, rpc],
    queryFn: () => getCurrentEpoch(rpc, stakingContractOptions),
    initialData: 0,
    enabled: false
  })

  return {
    epoch: epoch || 0,
    fetchEpoch: refetch
  }
}