import { useCallback } from "react"
import BigNumber from "bignumber.js"
import { ContractOptions, encodeTxData } from "../util/contract"
import { useTransaction } from "./useTransaction"
import { useNetwork } from "./useNetwork"

export interface DelegateParams {
  toValidatorID: number
  amount: string
}

export const useDelegate = (stakingContractOptions?: ContractOptions) => {
  const {setReceiveAddress, setGasLimit, estimateGasPrice, setTxData, setAmount, submitRawTx} = useTransaction()
  const {networkConfig} = useNetwork()

  const parseDelegate = useCallback(async (params: DelegateParams) => {
    if (!stakingContractOptions || !networkConfig) return
    
    const txData = await encodeTxData(
      stakingContractOptions,
      "delegate",
      [params.toValidatorID]
    )
      
    setReceiveAddress(networkConfig?.stakingAddress)
    setGasLimit("1000000")
    setTxData(txData)
    setAmount(params.amount)
    await estimateGasPrice()
  }, [stakingContractOptions, networkConfig])

  const submitDelegate = useCallback(async () => {
    const tx = await submitRawTx()
    console.log('sented', tx?.hash)
    return tx
  }, [])

  return {
    parseDelegate,
    submitDelegate
  }
}
