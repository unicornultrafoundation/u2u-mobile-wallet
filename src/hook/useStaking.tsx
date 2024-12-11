import { useMemo } from "react";
import { useNetwork } from "./useNetwork";
import { U2U_STAKING_ABI } from "../util/abis/staking";

export function useStaking() {
  const {networkConfig} = useNetwork()

  const stakingContractOptions = useMemo(() => {
    if (!networkConfig) return undefined
    return {
      contractAddress: networkConfig.stakingAddress,
      abi: U2U_STAKING_ABI
    }
  }, [networkConfig])

  return {
    stakingContractOptions,
  }
}
