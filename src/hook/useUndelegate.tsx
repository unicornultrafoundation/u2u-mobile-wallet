import { useCallback } from "react";
import { GAS_LIMIT_HARD } from "../config/constant";
import BigNumber from "bignumber.js";
import { ContractOptions, encodeTxData } from "../util/contract";
import { useTransaction } from "./useTransaction";
import { useNetwork } from "./useNetwork";

export interface UnDelegateParams {
  toValidatorID: number
  amount: number
}

export const useUndelegate = (stakingContractOptions?: ContractOptions) => {
  const {estimateGasPrice, submitRawTx} = useTransaction()
  const {networkConfig} = useNetwork()

  const undegegate = useCallback(async (params: UnDelegateParams) => {
    if (!stakingContractOptions || !networkConfig) return

    const amountDec = BigNumber(params.amount.toString()).multipliedBy(10 ** 18).toFixed();
    // Random wrID
    const _wrID = Math.floor(Math.random() * 100000)
    const txData = await encodeTxData(
      stakingContractOptions,
      "undelegate",
      [params.toValidatorID, _wrID, amountDec]
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
    undegegate
  }
}