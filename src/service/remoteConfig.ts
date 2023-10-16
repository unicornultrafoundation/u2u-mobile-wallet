export const fetchSupportedTokens = async (url: string) => {

  const rs = await fetch(url)
  const rsJSON = await rs.json()
  return rsJSON
};
