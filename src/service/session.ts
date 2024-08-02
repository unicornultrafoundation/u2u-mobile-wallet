import { GET_SESSION_BY_WALLET, GET_SIGNREQUEST } from "../config/endpoint"

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

export const getSignRequestFromSession = async (endpoint: string, sessionID: string, page: number, limit: number) => {
  const url = `${endpoint}${GET_SIGNREQUEST}?session=${sessionID}&page=${page}&limit=${limit}`

  const requestOptions: Record<string, any> = {
    method: 'GET',
    redirect: 'follow'
  };
  const rs = await fetch(url, requestOptions)
  const rsJSON = await rs.json()

  if (rsJSON.statusCode && rsJSON.statusCode !== 200) return []

  return rsJSON
}