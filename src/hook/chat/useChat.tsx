import { ErmisAuth, ErmisChatOptions } from 'ermis-chat-js-sdk';
import { useWallet } from '../useWallet';
import { ERMIS_API_KEY, ERMIS_BASE_URL } from '../../config/constant';
import { signTypedData } from '../../util/wallet';
import { useEffect } from 'react';
import { parseJwt } from '../../util/string';
import { chatClient } from '../../util/chat';
import { useGlobalStore } from '@/state/global';

const options: ErmisChatOptions = {
  timeout: 6000,
  baseURL: ERMIS_BASE_URL,
  // browser: false
};

export const useChat = () => {
  const {wallet} = useWallet()
  const {chatToken, setChatRefreshToken, setChatToken} = useGlobalStore()

  const init = async () => {
    try {
      if (chatClient.user && chatClient.user.id === wallet.address.toLowerCase()) return
      
      if (chatClient.user && chatClient.user.id !== wallet.address.toLowerCase()) {
        console.log('disconnect user from chat', chatClient.user?.id)
        await chatClient.disconnectUser()
      }

      console.log('init chat sdk for user', wallet.address.toLowerCase())

      let token = chatToken[wallet.address]

      if (token) {
        console.log('chatToken', chatToken)
        const payload = parseJwt(token)
        console.log('old token exp', payload.exp)
        if (Date.now() > payload.exp) {
          // TODO: handle refresh token
          token = ''
        }
      }

      if (!token) {
        console.log('perform fresh login for user', wallet.address)
        const authInstance = ErmisAuth.getInstance(ERMIS_API_KEY!, wallet.address, options);
      
        const challenge = await authInstance.startAuth() as Record<string, any>;
        delete challenge.types.EIP712Domain

        console.log('challenge', challenge)

        const signature = await signTypedData(challenge as any, wallet.privateKey)
        console.log('signature', signature)
        const response = await authInstance.getAuth(signature);

        token = response.token

        setChatToken(wallet.address, response.token)
        setChatRefreshToken(wallet.address, response.refresh_token)
      }

      console.log('connect user with token', token)
      
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
  }

  useEffect(() => {
    if (!wallet) return
    init()
  }, [wallet.address])

  return {
    chatClient
  }
}