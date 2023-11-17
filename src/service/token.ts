import { ERC20_ABI } from "../util/abis/erc20"
import { parseFromRaw } from "../util/bignum"
import { ContractOptions, contractCall } from "../util/contract"

export const fetchOwnedToken = async (explorerURL: string, address: string) => {
  const url = `${explorerURL}/api?module=account&action=tokenlist&address=${address}`
  const rs = await fetch(url)
  const rsJSON = await rs.json()
  return rsJSON.result || []
}

export const fetchNativeBalance = async (explorerURL: string, address: string) => {
  const url = `${explorerURL}/api?module=account&action=eth_get_balance&address=${address}`
  const rs = await fetch(url)
  const rsJSON = await rs.json()

  if (rsJSON.result) {
    return parseFromRaw(rsJSON.result, 18)
  }

  return "0"
}

export const fetchURC20Balance = async (explorerURL: string, address: string, tokenAddress: string, decimals = 18) => {
  const url = `${explorerURL}/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}`
  const rs = await fetch(url)
  const rsJSON = await rs.json()

  if (rsJSON.result) {
    return parseFromRaw(rsJSON.result, decimals)
  }

  return "0"
}

export const fetchURC20MetaFromContract = async (address: string, rpc: string) => {
  const options: ContractOptions = {
    contractAddress: address,
    abi: ERC20_ABI
  }

  const [name, decimals, symbol] = await Promise.all([
    contractCall(options, rpc, "name", []),
    contractCall(options, rpc, "decimals", []),
    contractCall(options, rpc, "symbol", [])
  ])

  return {name, decimals, symbol}
}