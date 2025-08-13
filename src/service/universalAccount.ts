import { UA_GET_NONCE_ENDPOINT, UA_AUTH_WITH_MESSAGE_ENDPOINT } from "@/config/endpoint"
import { getWalletFromPrivateKey, signMessage } from "@/util/wallet"

export const authWithUniversalAccount = async (privateKey: string) => {
  // Get nonce and message for signature
  const rs = await fetch(UA_GET_NONCE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address: getWalletFromPrivateKey(privateKey).address
    })
  })
  const rsJSON = await rs.json()
  const signature = await signMessage(rsJSON.message, privateKey)
  const body = {
    signature,
    signer: getWalletFromPrivateKey(privateKey).address
  }

  // Auth with signature
  const authRS = await fetch(UA_AUTH_WITH_MESSAGE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const authRSJSON = await authRS.json()
  return authRSJSON
}