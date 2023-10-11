import { REMOTE_CONFIG_BASE_URL } from "../config/endpoint";

export const fetchSupportedTokens = async () => {
  const url = `${REMOTE_CONFIG_BASE_URL}/mobile_config/supported_tokens.json`

  const rs = await fetch(url)
  const rsJSON = await rs.json()
  return rsJSON
};
