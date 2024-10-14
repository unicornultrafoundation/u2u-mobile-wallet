import { ErmisAuth, ErmisChat, ErmisChatOptions } from 'ermis-chat-js-sdk';
import { useWallet } from '../useWallet';
import { ERMIS_API_KEY, ERMIS_BASE_URL, ERMIS_PROJECT_ID } from '../../config/constant';
import { signTypedData } from '../../util/wallet';
import { useCallback, useEffect } from 'react';
import { useLocalStore } from '../../state/local';
import { parseJwt } from '../../util/string';
import { chatClient } from '../../util/chat';

const options: ErmisChatOptions = {
  timeout: 6000,
  baseURL: ERMIS_BASE_URL,
  // browser: false
};

export const useChat = () => {
  const {wallet} = useWallet()
  const {chatToken, setChatRefreshToken, setChatToken} = useLocalStore()

  const init = useCallback(async () => {
    try {
      if (chatClient.user && chatClient.user.id === wallet.address.toLowerCase()) return
      
      if (chatClient.user && chatClient.user.id !== wallet.address.toLowerCase()) {
        console.log('before disconnect', chatClient.user?.id)
        await chatClient.disconnectUser()
      }

      let token = chatToken[wallet.address]

      if (token) {
        const payload = parseJwt(token)
        if (Date.now() > payload.exp) {
          // TODO: handle refresh token
          token = ''
        }
      }

      if (!token) {
        const authInstance = ErmisAuth.getInstance(ERMIS_API_KEY!, wallet.address, options);
      
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
  }, [wallet.address, chatToken, setChatRefreshToken, setChatToken])

  useEffect(() => {
    if (!wallet) return
    init()
  }, [wallet.address, init])

  return {
    chatClient
  }
}