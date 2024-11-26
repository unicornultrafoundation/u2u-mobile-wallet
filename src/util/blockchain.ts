import { SUPPORTED_CHAINS } from '@/config/chain'
import {ethers} from 'ethers'

export const estimateGasPriceUtil = async (rpc: string) => {
  const provider = new ethers.JsonRpcProvider(rpc)
  const feeData = await provider.getFeeData()
  return feeData.gasPrice ? feeData.gasPrice.toString() : "0"
}

export const estimateGasLimitUtil = async (txObject: Record<string, any>, rpc: string) => {
  const {gasPrice, ...rest} = txObject
  const provider = new ethers.JsonRpcProvider(rpc)
  const rs = await provider.estimateGas(rest)

  return rs.toString()
}

export const getTxReceipt = async (txHash: string, rpc: string) => {
  const provider = new ethers.JsonRpcProvider(rpc)
  const receipt = await provider.getTransactionReceipt(txHash)
  return receipt || undefined
}

export const getTxDetail = async (txHash: string, rpc: string) => {
  const provider = new ethers.JsonRpcProvider(rpc)
  const receipt = await provider.getTransaction(txHash)
  return receipt || undefined
}

export const getBlockDetail = async (blockHash: string, rpc: string) => {
  const provider = new ethers.JsonRpcProvider(rpc)
  return provider.getBlock(blockHash)
}

export const isSupportedNetwork = (chainId: number) => {
  const networkItem = SUPPORTED_CHAINS.find((item) => {
    return Number(item.chainID) === chainId
  })

  return !!networkItem
}
