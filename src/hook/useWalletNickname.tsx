import { Wallet } from "ethers";
import { useWallet } from "./useWallet";
import { useNetwork } from "./useNetwork";
import { useCallback } from "react";
import { GET_WALLET_NICKNAME_ENDPOINT, SUBMIT_WALLET_NICKNAME_ENDPOINT } from "../config/endpoint";
import { logErrorForMonitoring } from "./useCrashlytics";
import { useQuery } from "@tanstack/react-query";


export const useWalletNickname = () => {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const {data: nickname} = useQuery({
    queryKey: ['wallet-nickname', wallet.address, networkConfig],
    queryFn: async () => {
      if (!networkConfig || !wallet || !networkConfig.api_endpoint) return
      const endpoint = `${networkConfig.api_endpoint}${GET_WALLET_NICKNAME_ENDPOINT}`
      try {
        const rs = await fetch(endpoint)
        const rsJSON = await rs.json()
        
        return rsJSON.nickname
      } catch (error) {
        console.log('getWalletNickname error', error)
        logErrorForMonitoring(error as any, 'getWalletNickname error')
        return ''
      }
    },
    placeholderData: ''
  })

  const submitWalletNickname = useCallback(async (nickname: string) => {
    if (!networkConfig || !wallet || !networkConfig.api_endpoint) return
    const signer = new Wallet(wallet.privateKey)
    const rawMessage = `change-nickname-to-${nickname}`
    const signature = await signer.signMessage(rawMessage);

    const endpoint = `${networkConfig.api_endpoint}${SUBMIT_WALLET_NICKNAME_ENDPOINT}`

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      address: wallet.address,
      signature,
      nickname
    });
    
    const requestOptions: Record<string, any> = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const rs = await fetch(endpoint, requestOptions)
      const rsJSON = await rs.json()
      if (rsJSON.statusCode === 400) {
        throw new Error(rsJSON.message)
      }
      return rsJSON
    } catch (error) {
      console.log('submitWalletNickname error', error)
      logErrorForMonitoring(error as any, 'submitWalletNickname error')
      throw error
    }
  }, [networkConfig, wallet])

  return {
    submitWalletNickname,
    nickname
  }
}