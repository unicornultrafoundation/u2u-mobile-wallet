import { useCallback } from "react"
import { useNetwork } from "./useNetwork"
import { useWallet } from "./useWallet"
import DeviceInfo from "react-native-device-info"
import { FETCH_CLAIM_REQUEST_ENDPOINT, SUBMIT_CLAIM_JUPITER_REQUEST_ENDPOINT } from "../config/endpoint"
import { useQuery } from "@tanstack/react-query"
import { useTracking } from "./useTracking"
import { logErrorForMonitoring } from "./useCrashlytics"

export const useClaimMembershipNFT = () => {
  const { networkConfig } = useNetwork()
  const {wallet} = useWallet()
  const {deviceID} = useTracking()

  const submitClaimRequest = useCallback(async () => {
    try {
      if (!networkConfig || !wallet || !networkConfig.api_endpoint) return
      const endpoint = `${networkConfig.api_endpoint}${SUBMIT_CLAIM_JUPITER_REQUEST_ENDPOINT}`
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
      return rs.json()
    } catch (error) {
      console.log('submitClaimRequest error', error)
      logErrorForMonitoring(error as any, 'submitClaimRequest error')
      return 
    }

  }, [networkConfig, wallet, deviceID])

  const {data, isRefetching, refetch} = useQuery({
    queryKey: ['fetchClaimNFTRequest', networkConfig],
    queryFn: async () => {
      try {
        if (!networkConfig || !networkConfig.api_endpoint) return []
        const deviceID = await DeviceInfo.syncUniqueId();
        const endpoint = `${networkConfig?.api_endpoint}${FETCH_CLAIM_REQUEST_ENDPOINT}?deviceID=${deviceID}&walletAddress=${wallet.address}`
        const requestOptions: Record<string, any> = {
          method: 'GET',
          redirect: 'follow'
        };

        const rs = await fetch(endpoint, requestOptions)
        const rsJSON = await rs.json()
        return rsJSON
      } catch (error) {
        console.log("error useClaimMembershipNFT", error)
        logErrorForMonitoring(error as any, 'error useClaimMembershipNFT')
        return [] 
      }
    },
    placeholderData: [],
    initialData: []
  })

  return {
    submitClaimRequest,
    claimRequest: data && data[0] ? data[0] : {},
    fetchingClaimRequest: isRefetching,
    refetchClaimRequest: refetch
  }
}
