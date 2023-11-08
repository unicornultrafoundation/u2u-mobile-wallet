import { useCallback } from "react";
import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { fetchCurrentEpoch } from "../service/staking";
import BigNumber from "bignumber.js";
import { useQuery } from "@tanstack/react-query";

export const useCurrentEpoch = (stakingContractOptions?: ContractOptions) => {
  const {rpc} = useNetwork()

  const getCurrentEpoch = useCallback(async () => {
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
  }, [stakingContractOptions, rpc])

  const {data: epoch} = useQuery({
    queryKey: ['getCurrentEpoch', stakingContractOptions, rpc],
    queryFn: getCurrentEpoch,
    refetchInterval: 60000,
    placeholderData: 0
  })

  return {
    epoch
  }
}