import { useCallback, useEffect, useState } from "react";
import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { fetchTotalSupply } from "../service/staking";
import BigNumber from "bignumber.js";
import { useQuery } from "@tanstack/react-query";

export const useTotalSupply = (stakingContractOptions?: ContractOptions) => {
  const {rpc} = useNetwork()

  const getTotalSupply = useCallback(async () => {
    if (!stakingContractOptions) {
      console.log("invalid staking contract options")
      return "0"
    }
    try {
      const _rewards = await fetchTotalSupply(stakingContractOptions, rpc)
      return BigNumber(_rewards).dividedBy(10 ** 18).toFixed()
    } catch (error) {
      console.log("fetch total supply fail", error)
      return "0"
    }
  }, [stakingContractOptions, rpc])

  const {data: supply} = useQuery({
    queryKey: ['getTotalSupply', stakingContractOptions, rpc],
    queryFn: getTotalSupply,
    refetchInterval: 60000,
    placeholderData: "0"
  })

  return {
    supply
  }
}