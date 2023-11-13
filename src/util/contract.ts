import {Contract, ethers} from 'ethers'

export interface ContractOptions {
  contractAddress: string
  abi: any
}

export const contractCall = async (options: ContractOptions, rpc: string, method: string, params: any) => {
  const provider = new ethers.JsonRpcProvider(rpc)
  const contract = new Contract(options.contractAddress, options.abi, provider)
  return Array.isArray(params) ? contract[method](...params) : contract[method](params)
}

export const encodeTxData = async (options: ContractOptions, method: string, params: any) => {
  const iface = new ethers.Interface(options.abi);
  return iface.encodeFunctionData(method, params)
}

export const decodeTxData = (abi: Record<string, any>[], bytes: string) => {
  const iface = new ethers.Interface(abi);
  return iface._decodeParams(abi as any, bytes)
}

export const findABIFragment = (type: string, name: string, abi: Record<string, any>[]) => {
  return abi.find((i: any) => i.type === type && i.name === name)
}