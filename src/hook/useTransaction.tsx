import React, { useCallback, useMemo } from 'react'
import { useTransactionStore } from '../state/transaction'
import { useNetworkStore } from '../state/network'
import { estimateGasLimitUtil, estimateGasPriceUtil, getTxDetail, getTxReceipt } from '../util/blockchain'
import { useWallet } from './useWallet'
import BigNumber from 'bignumber.js'
import { getNonce, sendSignedTransaction, signTransaction } from '../util/wallet'
import { getDigit } from '../util/string'
import { encodeTxData } from '../util/contract'
import { ERC20_ABI } from '../util/abis/erc20'

export const useTransaction = () => {
  const txStore = useTransactionStore()
  const {wallet} = useWallet()
  const {rpc, chainId} = useNetworkStore()
  
  const estimateGasPrice = useCallback(async () => {
    const rs = await estimateGasPriceUtil(rpc)
    txStore.setEstimatedGasPrice(rs.toString())
    return rs.toString()
  }, [txStore])

  const estimateGasLimit = useCallback(async (txObject?: Record<string, any>) => {
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

    try {
      const gasLimit = await estimateGasLimitUtil(mergedTxObject, rpc)
      txStore.setEstimatedGasLimit(gasLimit.toString())
      return gasLimit.toString()
    } catch (error) {
      console.log('mergedTxObject', mergedTxObject)
      console.log('estimate gas limit error', error)
      return "0"
    }
  }, [txStore])

  const estimatedFee = useMemo(() => {
    return BigNumber(txStore.estimatedGasLimit).multipliedBy(txStore.estimatedGasPrice).dividedBy(10 ** 18).toFormat()
  }, [txStore.estimatedGasLimit, txStore.estimatedGasPrice])

  const maxFee = useMemo(() => {
    return BigNumber(txStore.gasLimit).multipliedBy(txStore.gasPrice).dividedBy(10 ** 18).toFormat()
  }, [txStore.gasLimit, txStore.gasPrice])

  const submitTx = useCallback(async () => {
    if (txStore.txHash) {
      return
    }
    const isNativeTx = txStore.tokenMeta.address.toLowerCase() === "0x" || txStore.tokenMeta.address.toLowerCase() === ""

    const rawTxObj: Record<string, any> = {
      from: wallet.address,
      to: txStore.receiveAddress,
      gas: txStore.gasLimit,
      gasPrice: txStore.gasPrice,
      chainId,
      nonce: await getNonce(rpc, wallet.address)
    }

    if (isNativeTx) {
      rawTxObj.value = getDigit(
        BigNumber(txStore.amount).multipliedBy(10 ** 18).toFormat()
      )
    } else {
      rawTxObj.value = "0"
      rawTxObj.to = txStore.tokenMeta.address
      rawTxObj.data = await encodeTxData(
        {contractAddress: txStore.tokenMeta.address, abi: ERC20_ABI},
        "transfer",
        [
          txStore.receiveAddress,
          getDigit(
            BigNumber(txStore.amount).multipliedBy(10 ** txStore.tokenMeta.decimals).toFormat()
          )
        ]
      )
    }
    const signedTx = await signTransaction(rawTxObj, wallet.privateKey, rpc)
    txStore.setTxStatus('sending')
    const rs = await sendSignedTransaction(rpc, signedTx)
    txStore.resetTxState()
    txStore.setTxStatus(rs.status.toString() === "1" ? 'success' : 'fail')
    txStore.setTxHash(rs.transactionHash.toString())
    return rs
  }, [wallet.privateKey, wallet.address, rpc, txStore])

  const submitRawTx = useCallback(async (overrideTx: Record<string, any> = {}) => {
    if (txStore.txHash) {
      return
    }

    const rawTxObj: Record<string, any> = {
      from: wallet.address,
      to: overrideTx.receiveAddress || txStore.receiveAddress,
      gas: overrideTx.gasLimit || txStore.gasLimit,
      gasPrice: overrideTx.gasPrice || txStore.gasPrice,
      chainId,
      nonce: await getNonce(rpc, wallet.address),
      data: overrideTx.txData || txStore.txData,
      value: getDigit(
        BigNumber(overrideTx.amount || txStore.amount).multipliedBy(10 ** 18).toFormat()
      )
    }

    const signedTx = await signTransaction(rawTxObj, wallet.privateKey, rpc)
    txStore.setTxStatus('sending')
    const rs = await sendSignedTransaction(rpc, signedTx)
    txStore.resetTxState()
    txStore.setTxStatus(rs.status.toString() === "1" ? 'success' : 'fail')
    txStore.setTxHash(rs.transactionHash.toString())
    return rs
  }, [wallet.privateKey, wallet.address, rpc, txStore])

  const fetchTxReceipt = useCallback(async (hash: string) => {
    return getTxReceipt(hash, rpc)
  }, [rpc])

  const fetchTxDetail = useCallback(async (hash: string) => {
    return getTxDetail(hash, rpc)
  }, [rpc])

  return {
    ...txStore,
    estimatedFee,
    maxFee,
    estimateGasPrice,
    estimateGasLimit,
    submitTx,
    submitRawTx,
    fetchTxReceipt,
    fetchTxDetail
  }
}