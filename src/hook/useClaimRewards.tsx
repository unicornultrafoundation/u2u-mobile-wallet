import { useCallback } from "react";
import { ContractOptions, encodeTxData } from "../util/contract";
import { GAS_LIMIT_HARD } from "../config/constant";
import { useNetwork } from "./useNetwork";
import { useTransaction } from "./useTransaction";

export interface ClaimRewardsParams {
  toValidatorID: number
}

export const useClaimRewards = (stakingContractOptions?: ContractOptions) => {
  const {estimateGasPrice, submitRawTx} = useTransaction()
  const {networkConfig} = useNetwork()

  const claimRewards = useCallback(async (params: ClaimRewardsParams) => {
    if (!stakingContractOptions || !networkConfig) return
    
    const txData = await encodeTxData(
      stakingContractOptions,
      "claimRewards",
      [params.toValidatorID]
    )

    const gasPrice = await estimateGasPrice()

    const tx = await submitRawTx({
      gasLimit: GAS_LIMIT_HARD.toString(),
      receiveAddress: networkConfig.stakingAddress,
      amount: "0",
      txData: txData,
      gasPrice: gasPrice
    })
    console.log('sented', tx?.transactionHash)

    return tx
  }, [stakingContractOptions, networkConfig])

  return {
    // parseClaim,
    claimRewards
  }
}