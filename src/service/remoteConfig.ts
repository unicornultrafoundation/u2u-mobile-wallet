import { REMOTE_CONFIG_BASE_URL } from "../config/endpoint";

export const fetchSupportedTokens = async () => {
  const url = `${REMOTE_CONFIG_BASE_URL}/supported_tokens.json`

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const rs = await fetch(url, requestOptions)
  const rsJSON = await rs.json()
  console.log('rsJSON', rsJSON)
  return rsJSON
};
