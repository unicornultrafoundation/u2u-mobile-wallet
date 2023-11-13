export const fetchNativeTokenTransaction = async (explorerURL: string, address: string) => {
  const url = `${explorerURL}/api?module=account&action=txlist&address=${address}&page=1&offset=10`
  console.log('eee', url)
  const rs = await fetch(url)
  const rsJSON = await rs.json()
  return rsJSON.result || []
}

export const fetchURC20TokenTransaction = async (explorerURL: string, address: string, tokenAddress: string) => {
  const url = `${explorerURL}/api?module=account&action=tokentx&address=${address}&contractaddress=${tokenAddress}&page=1&offset=10`
  const rs = await fetch(url)
  const rsJSON = await rs.json()
  return rsJSON.result || []
}
