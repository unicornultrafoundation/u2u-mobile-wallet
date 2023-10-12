import React, { useCallback, useMemo } from 'react'
import { useTransactionStore } from '../state/transaction'
import { useNetworkStore } from '../state/network'
import { estimateGasLimitUtil, estimateGasPriceUtil } from '../util/blockchain'
import { useWallet } from './useWallet'
import BigNumber from 'bignumber.js'
import { getNonce, sendSignedTransaction, signTransaction } from '../util/wallet'
import { getDigit } from '../util/string'

export const useTransaction = () => {
  const txStore = useTransactionStore()
  const {wallet} = useWallet()
  const {rpc, chainId} = useNetworkStore()
  
  const estimateGasPrice = async () => {
    const rs = await estimateGasPriceUtil(rpc)
    txStore.setEstimatedGasPrice(rs.toString())
    return rs.toString()
  }

  const estimateGasLimit = async (txObject?: Record<string, any>) => {
    const internalTx = {
      from: wallet.address,
      to: txStore.receiveAddress,
      gasPrice: await estimateGasPrice(),
      data: txStore.txData
    }

    const mergedTxObject = {
      ...internalTx,
      ...txObject
    }

    const gasLimit = await estimateGasLimitUtil(mergedTxObject, rpc)
    txStore.setEstimatedGasLimit(gasLimit.toString())
    return gasLimit.toString()
  }

  const estimatedFee = useMemo(() => {
    return BigNumber(txStore.estimatedGasLimit).multipliedBy(txStore.estimatedGasPrice).dividedBy(10 ** 18).toFormat()
  }, [txStore.estimatedGasLimit, txStore.estimatedGasPrice])

  const maxFee = useMemo(() => {
    return BigNumber(txStore.gasLimit).multipliedBy(txStore.gasPrice).dividedBy(10 ** 18).toFormat()
  }, [txStore.gasLimit, txStore.gasPrice])

  const submitTx = useCallback(async () => {
    const rawTxObj: Record<string, any> = {
      from: wallet.address,
      to: txStore.receiveAddress,
      gas: txStore.gasLimit,
      gasPrice: txStore.gasPrice,
      chainId,
      nonce: await getNonce(rpc, wallet.address)
    }

    if (txStore.tokenMeta.address === "0x" || txStore.tokenMeta.address === "") {
      rawTxObj.value = getDigit(
        BigNumber(txStore.amount).multipliedBy(10 ** 18).toFormat()
      )
    } else {
      rawTxObj.value = "0"
    }
    const signedTx = await signTransaction(rawTxObj, wallet.privateKey, rpc)
    console.log('rawTxObj', rawTxObj)
    console.log('signedTx', signedTx)
    // return sendSignedTransaction(rpc, signedTx)
  }, [wallet.privateKey, wallet.address, rpc])

  return {
    ...txStore,
    estimatedFee,
    maxFee,
    estimateGasPrice,
    estimateGasLimit,
    submitTx,
  }
}