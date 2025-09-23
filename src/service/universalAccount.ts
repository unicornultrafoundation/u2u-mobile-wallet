import { EXPO_PUBLIC_UNIVERSAL_ACCOUNT_API_KEY } from "@/config/constant"
import { UA_GET_NONCE_ENDPOINT, UA_AUTH_WITH_MESSAGE_ENDPOINT } from "@/config/endpoint"
import { getWalletFromPrivateKey, signMessage } from "@/util/wallet"

export const authWithUniversalAccount = async (privateKey: string) => {
  if (!EXPO_PUBLIC_UNIVERSAL_ACCOUNT_API_KEY) {
    throw new Error('EXPO_PUBLIC_UNIVERSAL_ACCOUNT_API_KEY is not set')
  }
  // Get nonce and message for signature
  const rs = await fetch(UA_GET_NONCE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': EXPO_PUBLIC_UNIVERSAL_ACCOUNT_API_KEY,
      'Origin': 'http://localhost'
    },
    body: JSON.stringify({
      address: getWalletFromPrivateKey(privateKey).address
    })
  })
  const rsJSON = await rs.json()
  console.log('nonce', rsJSON)
  const signature = await signMessage(rsJSON.message, privateKey)
  const body = {
    signature,
    signer: getWalletFromPrivateKey(privateKey).address
  }

  // Auth with signature
  console.log('body', JSON.stringify(body))
  const authRS = await fetch(UA_AUTH_WITH_MESSAGE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'LkYwShFkC0d_lkVsl9F9YXl4n6m-gdI7Ec5PzZ7z0q4',
      'Origin': 'http://localhost'
    },
    body: JSON.stringify(body)
  })
  const authRSJSON = await authRS.json()
  return authRSJSON
}