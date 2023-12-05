import { useCallback } from "react"
import { SUBMIT_DEVICE_ID_ENDPOINT, SUBMIT_WALLET_ENDPOINT } from "../config/endpoint"
import { useNetwork } from "./useNetwork"
import DeviceInfo from "react-native-device-info"
import { useLocalStore } from "../state/local"
import { useWallet } from "./useWallet"
import { firebase } from "@react-native-firebase/app-check"

export const useTracking = () => {
  const { networkConfig } = useNetwork()
  const {wallet} = useWallet()
  const {alreadySubmitDeviceID, toggleAlreadySubmitDeviceID, registeredWallet, addRegisteredWalelt} = useLocalStore()

  const getAppCheckToken = async (force = false) => {
    const { token } = await firebase.appCheck().getToken(force);
    return token
  }

  const submitDeviceID = useCallback(async () => {
    try {
      if (!networkConfig || !networkConfig.api_endpoint || !toggleAlreadySubmitDeviceID || alreadySubmitDeviceID) return
      const deviceID = await DeviceInfo.syncUniqueId();
      const endpoint = `${networkConfig?.api_endpoint}${SUBMIT_DEVICE_ID_ENDPOINT}`

      const appToken = await getAppCheckToken()

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-Firebase-AppCheck", appToken)
      
      const raw = JSON.stringify({
        deviceID
      });
      
      const requestOptions: Record<string, any> = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log('register device id', deviceID)
      console.log(endpoint)
      const rs = await fetch(endpoint, requestOptions)
      toggleAlreadySubmitDeviceID()
      return rs
    } catch (error) {
      console.log('error 123', error)
      return
    }
  }, [networkConfig, alreadySubmitDeviceID, toggleAlreadySubmitDeviceID])

  const registerWallet = useCallback(async () => {
    try {
      if (!networkConfig || !networkConfig.api_endpoint || !wallet) return

      if (registeredWallet.includes(wallet.address)) return

      const deviceID = await DeviceInfo.syncUniqueId();
      const endpoint = `${networkConfig?.api_endpoint}${SUBMIT_WALLET_ENDPOINT}`

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        address: wallet.address,
        deviceIDs: [deviceID]
      });
      
      const requestOptions: Record<string, any> = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log('register wallet', wallet.address)
      const rs = await fetch(endpoint, requestOptions)
      addRegisteredWalelt(wallet.address)

      return rs
    } catch (error) {
      return
    }
  }, [networkConfig, wallet, registeredWallet])

  return {
    submitDeviceID,
    registerWallet,
    getAppCheckToken
  }
}
