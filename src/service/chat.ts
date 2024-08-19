import { BLOCK_CONTACTS, GET_BLOCKED_CONTACTS, GET_CONVERSATION_BY_USERS, UNBLOCK_CONTACTS } from "../config/endpoint"

export const getBlockedContacts = async (backendURL: string, dto: {page: number, limit: number, address: string, search?: string}) => {
  let url = `${backendURL}${GET_BLOCKED_CONTACTS}?page=${dto.page}&limit=${dto.limit}&address=${dto.address}`
  if (dto.search) {
    url += `&search=${dto.search}`
  }
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
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(dto);
  const url = `${backendURL}${BLOCK_CONTACTS}`

  const requestOptions: Record<string, any> = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: raw,
  };

  const rs = await fetch(url, requestOptions)
  const rsJSON = await rs.json()

  return rsJSON
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
  myHeaders.append("Content-Type", "application/json");

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

export interface Conversation {
  id: string;
  users: string[];
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
}

export interface Message {
  conversationID: string;
  from: string;
  content: string;
  readBy: string[];
  createdAt: Date;
}

export const getConversationByParticipants = async (
  backendURL: string,
  dto: {
    userAddresses: string[];
    signature: string;
  }
) => {
  let url = `${backendURL}${GET_CONVERSATION_BY_USERS}/${dto.userAddresses.sort().join('-')}`
  const myHeaders = new Headers();
  myHeaders.append("signature", dto.signature);

  const requestOptions: Record<string, any> = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const rs = await fetch(url, requestOptions)
  const rsJSON = await rs.json()
  return rsJSON as Conversation
}

export const getConversationMessages = async (
  backendURL: string,
  dto: {
    page: number;
    limit: number;
    userAddresses: string[];
    signature: string;
  }
) => {
  let url = `${backendURL}${GET_CONVERSATION_BY_USERS}/${dto.userAddresses.sort().join('-')}/messages?page=${dto.page}&limit=${dto.limit}`

  const myHeaders = new Headers();
  myHeaders.append("signature", dto.signature);

  const requestOptions: Record<string, any> = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const rs = await fetch(url, requestOptions)
  const rsJSON = await rs.json()
  return rsJSON as Message[]
}