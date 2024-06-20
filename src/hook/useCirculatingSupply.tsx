import { useCallback, useEffect, useState } from "react";
import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { fetchTotalSupply } from "../service/staking";
import BigNumber from "bignumber.js";
import { useQuery } from "@tanstack/react-query";
import { logErrorForMonitoring } from "./useCrashlytics";
import { getBalance } from "../util/wallet";

export const useCirculatingSupply = (stakingContractOptions?: ContractOptions) => {
  const {rpc, networkConfig} = useNetwork()

  const getCirculatingSupply = useCallback(async () => {
    if (!stakingContractOptions || !networkConfig) {
      console.log("invalid staking contract options")
      return "0"
    }
    try {
      const totalSupply = await fetchTotalSupply(stakingContractOptions, rpc)
      const genesisBalances = await Promise.all(
        networkConfig.genesisWallet.map((walletAddress) => {
          return getBalance(rpc, walletAddress)
        })
      )

      const result = genesisBalances.reduce((pre, cur) => {
        return BigNumber(pre).minus(BigNumber(cur))
      }, totalSupply)

      return BigNumber(result).dividedBy(10 ** 18).toFixed()
    } catch (error) {
      logErrorForMonitoring(error as any, "fetch total supply fail")
      return "0"
    }
  }, [stakingContractOptions, rpc, networkConfig])

  const {data: supply} = useQuery({
    queryKey: ['getTotalSupply', stakingContractOptions, rpc],
    queryFn: getCirculatingSupply,
    refetchInterval: 60000,
    placeholderData: "0"
  })

  return {
    supply
  }
}