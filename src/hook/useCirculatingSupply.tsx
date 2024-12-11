import { useCallback, useEffect, useState } from "react";
import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { useQuery } from "@tanstack/react-query";

export const useCirculatingSupply = (stakingContractOptions?: ContractOptions) => {
  const {rpc, networkConfig} = useNetwork()

  const {data: supply} = useQuery({
    queryKey: ['getTotalSupply', stakingContractOptions, rpc, networkConfig?.circulatingSupplyEndpoint],
    queryFn: async () => {
      // return "0"
      if (!networkConfig || !networkConfig.circulatingSupplyEndpoint) return "0"
      const rs = await fetch(networkConfig?.circulatingSupplyEndpoint)
      const rsJSON = await rs.json()
      return rsJSON.supply || "0"
    },
    // refetchInterval: 60000,
    placeholderData: "0",
    enabled: !!stakingContractOptions
  })

  return {
    supply
  }
}