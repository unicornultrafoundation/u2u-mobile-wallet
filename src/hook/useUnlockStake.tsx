import { useCallback } from "react";
import { ethers } from "ethers";
import { ContractOptions, encodeTxData } from "../util/contract";
import BigNumber from "bignumber.js";
import { useNetwork } from "./useNetwork";
import { useTransaction } from "./useTransaction";
import { GAS_LIMIT_HARD } from "../config/constant";

export interface UnlockStakeParams {
  toValidatorID: number
  amount: number
}

export const useUnlockStake = (stakingContractOptions?: ContractOptions) => {
  const {estimateGasPrice, submitRawTx} = useTransaction()
  const {networkConfig} = useNetwork()

  const unlockStake = useCallback(async (params: UnlockStakeParams) => {
    if (!stakingContractOptions || !networkConfig) return
    const amountDec = BigNumber(params.amount.toString()).multipliedBy(10 ** 18).toFixed();

    const txData = await encodeTxData(
      stakingContractOptions,
      "unlockStake",
      [params.toValidatorID, amountDec]
    )

    const gasPrice = await estimateGasPrice()

    const tx = await submitRawTx({
      gasLimit: GAS_LIMIT_HARD.toString(),
      receiveAddress: networkConfig.stakingAddress,
      amount: "0",
      txData: txData,
      gasPrice: gasPrice
    })
    console.log('sented', tx?.hash)

    return tx
  }, [stakingContractOptions, networkConfig])
  return {
    unlockStake
  }
}