import { ALL_NOTI_ENDPOINT } from "../config/endpoint"

interface FetchAllNotiParams {
  page: number;
  limit: number;
  authObj: {
    wallet: string;
    timestamp: number;
    signature: string
  }
}
export const fetchAllNoti = async (backendURL: string, {page, limit, authObj}: FetchAllNotiParams) => {
  const url = `${backendURL}${ALL_NOTI_ENDPOINT}?page=${page}&limit=${limit}`

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