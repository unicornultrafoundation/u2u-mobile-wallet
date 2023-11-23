import { useCallback } from "react"
import { useNetwork } from "./useNetwork"
import { useWallet } from "./useWallet"
import DeviceInfo from "react-native-device-info"
import { FETCH_CLAIM_REQUEST_ENDPOINT, SUBMIT_CLAIM_REQUEST_ENDPOINT } from "../config/endpoint"
import { useQuery } from "@tanstack/react-query"

export const useClaimMembershipNFT = () => {
  const { networkConfig } = useNetwork()
  const {wallet} = useWallet()

  const submitClaimRequest = useCallback(async () => {
    if (!networkConfig || !wallet) return
    const deviceID = await DeviceInfo.syncUniqueId();
    const endpoint = `${networkConfig?.api_endpoint}${SUBMIT_CLAIM_REQUEST_ENDPOINT}`
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      deviceID,
      walletToReceive: wallet.address
    });
    
    const requestOptions: Record<string, any> = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const rs = await fetch(endpoint, requestOptions)
    return rs

  }, [networkConfig, wallet])

  const {data} = useQuery({
    queryKey: ['fetchClaimNFTRequest', networkConfig],
    queryFn: async () => {
      if (!networkConfig) return []
      const deviceID = await DeviceInfo.syncUniqueId();
      const endpoint = `${networkConfig?.api_endpoint}${FETCH_CLAIM_REQUEST_ENDPOINT}?deviceID=${deviceID}`
      
      const requestOptions: Record<string, any> = {
        method: 'GET',
        redirect: 'follow'
      };

      const rs = await fetch(endpoint, requestOptions)
      return rs.json()
    },
    refetchInterval: 60000,
    placeholderData: []
  })

  return {
    submitClaimRequest,
    claimRequest: data[0]
  }
}
