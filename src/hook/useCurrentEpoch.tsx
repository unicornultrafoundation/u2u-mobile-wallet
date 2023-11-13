import { ContractOptions } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { fetchCurrentEpoch } from "../service/staking";
import BigNumber from "bignumber.js";

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

  const fetchEpoch = async () => {
    return await getCurrentEpoch(rpc, stakingContractOptions)
  }

  return {
    fetchEpoch
  }
}