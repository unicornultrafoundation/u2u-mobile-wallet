import { ErmisAuth, ErmisChat, ErmisChatOptions } from 'ermis-chat-sdk';
import { useWallet } from '../useWallet';
import { ERMIS_API_KEY, ERMIS_BASE_URL, ERMIS_PROJECT_ID } from '../../config/constant';
import { signTypedData } from '../../util/wallet';
import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStore } from '../../state/local';
import { parseJwt } from '../../util/string';

const options: ErmisChatOptions = {
  timeout: 6000,
  baseURL: ERMIS_BASE_URL,
  // browser: false
};

export const useChat = () => {
  const {wallet} = useWallet()
  const {chatToken, setChatRefreshToken, setChatToken} = useLocalStore()

  const chatClient = useMemo(() => {
    if (!ERMIS_API_KEY || !ERMIS_BASE_URL || !ERMIS_PROJECT_ID) return undefined
    
    return ErmisChat.getInstance(ERMIS_API_KEY, ERMIS_PROJECT_ID, options);
  }, [])

  const init = useCallback(async () => {
    try {
      if (!ERMIS_API_KEY || !ERMIS_BASE_URL || !chatClient || chatClient._user) return

      let token = chatToken[wallet.address]

      if (token) {
        const payload = parseJwt(token)
        if (Date.now() > payload.exp) {
          // TODO: handle refresh token
          token = ''
        }
      }

      if (!token) {
        const authInstance = ErmisAuth.getInstance(ERMIS_API_KEY, wallet.address, options);
      
        const challenge = await authInstance.startAuth() as Record<string, any>;
        delete challenge.types.EIP712Domain
        const signature = await signTypedData(challenge as any, wallet.privateKey)
        const response = await authInstance.getAuth(signature);

        token = response.token

        setChatToken(wallet.address, response.token)
        setChatRefreshToken(wallet.address, response.refresh_token)
      }
      
      await chatClient.connectUser(
        {
          api_key: ERMIS_API_KEY,
          id: wallet.address.toLowerCase(), // your address
          name: wallet.address,
        },
        `Bearer ${token}`,
      );
    } catch (error) {
      console.log('init chat error', error)
    }
  }, [wallet, chatClient, chatToken, setChatRefreshToken, setChatToken])

  useEffect(() => {
    if (!wallet) return
    init()
  }, [wallet, init])

  return {
    chatClient
  }
}