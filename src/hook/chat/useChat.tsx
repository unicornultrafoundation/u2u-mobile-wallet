import { WalletConnect, ErmisChat, ErmisChatOptions } from 'ermis-chat-js-sdk';
import { useWallet } from '../useWallet';
import { ERMIS_API_KEY, ERMIS_BASE_URL, ERMIS_PROJECT_ID } from '../../config/constant';
import { signTypedData } from '../../util/wallet';
import { useCallback, useEffect, useMemo } from 'react';

const options: ErmisChatOptions = {
  timeout: 6000,
  baseURL: ERMIS_BASE_URL,
  // browser: false
};

export const useChat = () => {
  const {wallet} = useWallet()

  const chatClient = useMemo(() => {
    if (!ERMIS_API_KEY || !ERMIS_BASE_URL || !ERMIS_PROJECT_ID) return undefined
    
    return ErmisChat.getInstance(ERMIS_API_KEY, ERMIS_PROJECT_ID, options);
  }, [])

  const init = useCallback(async () => {
    if (!ERMIS_API_KEY || !ERMIS_BASE_URL || !chatClient || chatClient._user) return
    const authInstance = WalletConnect.getInstance(ERMIS_API_KEY, wallet.address, options);
    
    const challenge = await authInstance.startAuth();
    const challengeObj = JSON.parse(challenge.challenge)
    
    delete challengeObj.types.EIP712Domain

    try {
      const signature = await signTypedData(challengeObj, wallet.privateKey)
      const response = await authInstance.getAuth(signature);
      console.log(response)

      await chatClient.connectUser(
        {
          api_key: ERMIS_API_KEY,
          id: response.user_id, // your address
          name: wallet.address,
        },
        `Bearer ${response.token}`,
      );
    } catch (error) {
      console.log('sign message error', error)
    }
  }, [wallet, chatClient])

  useEffect(() => {
    if (!wallet) return
    init()
  }, [wallet, init])

  return {
    chatClient
  }
}