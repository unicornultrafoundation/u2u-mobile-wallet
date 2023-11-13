import { useCallback } from "react";
import { ContractOptions, encodeTxData } from "../util/contract";
import { useTransaction } from "./useTransaction";
import { useNetwork } from "./useNetwork";
import BigNumber from "bignumber.js";
import { GAS_LIMIT_HARD } from "../config/constant";

export interface LockStakeParams {
  toValidatorID: number
  lockupDuration: number
  amount: number
}

export const useLockStake = (stakingContractOptions?: ContractOptions) => {
  const {estimateGasPrice, submitRawTx} = useTransaction()
  const {networkConfig} = useNetwork()

  const relockStake = useCallback(async (params: LockStakeParams) => {
    if (!stakingContractOptions || !networkConfig) return

    const amountDec = BigNumber(params.amount.toString()).multipliedBy(10 ** 18).toFixed();
    const txData = await encodeTxData(
      stakingContractOptions,
      "relockStake",
      [params.toValidatorID, params.lockupDuration, amountDec]
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
  }, [stakingContractOptions])

  const lockStake = useCallback(async (params: LockStakeParams) => {
    if (!stakingContractOptions || !networkConfig) return

    const amountDec = BigNumber(params.amount.toString()).multipliedBy(10 ** 18).toFixed();
    const txData = await encodeTxData(
      stakingContractOptions,
      "lockStake",
      [params.toValidatorID, params.lockupDuration, amountDec]
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
  }, [stakingContractOptions])

  return {
    relockStake,
    lockStake
  }
}
