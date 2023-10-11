import { parseFromRaw } from "../util/bignum"

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

export const fetchURC20Balance = async (explorerURL: string, address: string, tokenAddress: string) => {
  const url = `${explorerURL}/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}`
  const rs = await fetch(url)
  const rsJSON = await rs.json()

  if (rsJSON.result) {
    console.log(rsJSON)
    return parseFromRaw(rsJSON.result, 18)
  }

  return "0"
}