import { GET_SESSION_BY_WALLET } from "../config/endpoint"

export const getAllSession = async (endpoint: string, walletAddress: string) => {
  const url = `${endpoint}${GET_SESSION_BY_WALLET}/${walletAddress}`
  const requestOptions: Record<string, any> = {
    method: 'GET',
    redirect: 'follow'
  };
  const rs = await fetch(url, requestOptions)
  const rsJSON = await rs.json()

  if (rsJSON.statusCode && rsJSON.statusCode !== 200) return []

  return rsJSON
}