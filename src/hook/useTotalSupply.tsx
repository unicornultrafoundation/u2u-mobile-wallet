import { useCallback, useEffect, useState } from "react";
import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { fetchTotalSupply } from "../service/staking";
import BigNumber from "bignumber.js";

export const useTotalSupply = (stakingContractOptions?: ContractOptions) => {
  const {rpc} = useNetwork()
  const [supply, setSupply] = useState("")

  const getTotalSupply = useCallback(async () => {
    if (!stakingContractOptions) {
      throw new Error("invalid staking contract options")
    }
    try {
      const _rewards = await fetchTotalSupply(stakingContractOptions, rpc)
      setSupply(
        BigNumber(_rewards).dividedBy(10 ** 18).toFixed()
      )
    } catch (error) {
      console.log("fetch total supply fail")
    }
  }, [stakingContractOptions, rpc])

  useEffect(() => {
    getTotalSupply()
    const interval = setInterval(async () => {
      getTotalSupply()
    }, 20000)

    return () => clearInterval(interval)
  }, [stakingContractOptions, getTotalSupply]);

  return {
    supply
  }
}