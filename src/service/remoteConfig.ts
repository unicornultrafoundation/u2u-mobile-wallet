import { APP_REMOTE_CONFIG } from "../config/constant";

export const fetchSupportedTokens = async (url: string) => {

  const rs = await fetch(url)
  const rsJSON = await rs.json()
  return rsJSON
};

export const fetchRemoteConfig = async () => {
  if (!APP_REMOTE_CONFIG) return {}

  const rs = await fetch(APP_REMOTE_CONFIG)
  const rsJSON = await rs.json()
  return rsJSON
}
