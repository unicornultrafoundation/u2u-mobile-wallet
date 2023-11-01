import { useCallback } from "react";
import { ContractOptions, encodeTxData } from "../util/contract";
import { useNetwork } from "./useNetwork";
import { useTransaction } from "./useTransaction";
import { GAS_LIMIT_HARD } from "../config/constant";

export interface WithdrawParams {
  toValidatorID: number
  wrID: number
}

export const useWithdraw = (stakingContractOptions?: ContractOptions) => {
  const {estimateGasPrice, submitRawTx} = useTransaction()
  const {networkConfig} = useNetwork()

  const withdraw = useCallback(async (params: WithdrawParams) => {
    if (!stakingContractOptions || !networkConfig) return

    const txData = await encodeTxData(
      stakingContractOptions,
      "withdraw",
      [params.toValidatorID, params.wrID]
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
  }, [stakingContractOptions])

  return {
    withdraw
  }
}