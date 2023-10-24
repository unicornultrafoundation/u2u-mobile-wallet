import { useCallback, useEffect, useState } from "react";
import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { fetchCurrentEpoch } from "../service/staking";
import BigNumber from "bignumber.js";

export const useCurrentEpoch = (stakingContractOptions?: ContractOptions) => {
  const {rpc} = useNetwork()
  const [epoch, setEpoch] = useState<number>(0)

  const getCurrentEpoch = useCallback(async () => {
    if (!stakingContractOptions) {
      throw new Error("invalid staking contract options")
    }
    try {
      const rs = await fetchCurrentEpoch(stakingContractOptions, rpc)
      setEpoch(
        BigNumber(rs).toNumber()
      )
    } catch (error) {
      console.log("fetch current epoch fail")
    }
  }, [stakingContractOptions])

  useEffect(() => {
    getCurrentEpoch()
    const interval = setInterval(async () => {
      getCurrentEpoch()
    }, 60000)

    return () => clearInterval(interval)
  }, [stakingContractOptions]);

  return {
    epoch
  }
}