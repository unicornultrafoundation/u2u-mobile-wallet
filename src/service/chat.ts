import { GET_BLOCKED_CONTACTS } from "../config/endpoint"

export const getBlockedContacts = async (backendURL: string, dto: {page: number, limit: number, address: string}) => {
  const url = `${backendURL}${GET_BLOCKED_CONTACTS}?page=${dto.page}&limit=${dto.limit}&address=${dto.address}`
  const rs = await fetch(url)
  const rsJSON = await rs.json()
  return rsJSON
}