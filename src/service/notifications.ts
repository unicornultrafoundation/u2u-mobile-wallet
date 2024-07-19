import { ALL_NOTI_ENDPOINT, MARK_ALL_NOTI_READ_ENDPOINT, MARK_SINGLE_NOTI_READ } from "../config/endpoint"

interface AuthObj {
  wallet: string;
  timestamp: number;
  signature: string
}
interface FetchAllNotiParams {
  page: number;
  limit: number;
  authObj: AuthObj;
  status: string
}
export const fetchAllNoti = async (backendURL: string, {page, limit, authObj, status}: FetchAllNotiParams) => {
  let url = `${backendURL}${ALL_NOTI_ENDPOINT}?page=${page}&limit=${limit}`

  if (status && status !== 'all') {
    url += `&status=${status}`
  }

  const myHeaders = new Headers();
  myHeaders.append("wallet", authObj.wallet);
  myHeaders.append("signature", authObj.signature);
  myHeaders.append("timestamp", authObj.timestamp.toString());
  
  const requestOptions: Record<string, any> = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const rs = await fetch(url, requestOptions)

  return rs.json()
}

export const markAllNotiRead = async (backendURL: string, authObj: AuthObj) => {
  const url = `${backendURL}${MARK_ALL_NOTI_READ_ENDPOINT}`

  const myHeaders = new Headers();
  myHeaders.append("wallet", authObj.wallet);
  myHeaders.append("signature", authObj.signature);
  myHeaders.append("timestamp", authObj.timestamp.toString());
  
  const requestOptions: Record<string, any> = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  };

  const rs = await fetch(url, requestOptions)

  return rs.json()
}

export const markNotiRead = async (backendURL: string, authObj: AuthObj, notiID: string) => {
  const url = `${backendURL}${MARK_SINGLE_NOTI_READ}`

  const myHeaders = new Headers();
  myHeaders.append("wallet", authObj.wallet);
  myHeaders.append("signature", authObj.signature);
  myHeaders.append("timestamp", authObj.timestamp.toString());

  const raw = JSON.stringify({
    id: notiID
  });
  
  const requestOptions: Record<string, any> = {
    method: 'PATCH',
    headers: myHeaders,
    redirect: 'follow',
    body: raw,
  };

  const rs = await fetch(url, requestOptions)

  return rs.json()
}