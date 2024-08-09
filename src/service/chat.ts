import { BLOCK_CONTACTS, GET_BLOCKED_CONTACTS, UNBLOCK_CONTACTS } from "../config/endpoint"

export const getBlockedContacts = async (backendURL: string, dto: {page: number, limit: number, address: string}) => {
  const url = `${backendURL}${GET_BLOCKED_CONTACTS}?page=${dto.page}&limit=${dto.limit}&address=${dto.address}`
  const rs = await fetch(url)
  const rsJSON = await rs.json()
  return rsJSON
}

export const blockContact = async (
  backendURL: string,
  dto: {
    from: string;
    to: string;
    signature: string;
  }
) => {
  const myHeaders = new Headers();
  const raw = JSON.stringify(dto);
  const url = `${backendURL}${BLOCK_CONTACTS}`
  const requestOptions: Record<string, any> = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: raw,
  };

  const rs = await fetch(url, requestOptions)

  return rs.json()
}

export const unblockContact = async (
  backendURL: string,
  dto: {
    from: string;
    to: string;
    signature: string;
  }
) => {
  const myHeaders = new Headers();
  const raw = JSON.stringify(dto);
  const url = `${backendURL}${UNBLOCK_CONTACTS}`
  const requestOptions: Record<string, any> = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: raw,
  };

  const rs = await fetch(url, requestOptions)

  return rs.json()
}