import { useCallback, useEffect, useState } from "react"
import { SUBMIT_DEVICE_ID_ENDPOINT, SUBMIT_DEVICE_NOTIFICATION_TOKEN, SUBMIT_WALLET_ENDPOINT } from "../config/endpoint"
import { useNetwork } from "./useNetwork"
import DeviceInfo from "react-native-device-info"
import { useLocalStore } from "../state/local"
import { useWallet } from "./useWallet"
import { firebase } from "@react-native-firebase/app-check"
import messaging from '@react-native-firebase/messaging';
import { logErrorForMonitoring } from "./useCrashlytics"

export const useTracking = () => {
  const { networkConfig } = useNetwork()
  const {wallet} = useWallet()
  const {registeredWallet, addRegisteredWalelt} = useLocalStore()

  const [deviceID, setDeviceID] = useState("")

  const getAppCheckToken = async (force = false) => {
    const { token } = await firebase.appCheck().getToken(force);
    return token
  }

  const registerWallet = useCallback(async () => {
    try {
      if (!networkConfig || !networkConfig.api_endpoint || !wallet) return

      // if (registeredWallet.includes(wallet.address)) return

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

      const rs = await fetch(endpoint, requestOptions)
      addRegisteredWalelt(wallet.address)

      return rs
    } catch (error) {
      logErrorForMonitoring(error as any, "register wallet error")
      return
    }
  }, [networkConfig, wallet, registeredWallet])

  useEffect(() => {
    (async () => {
      try {
        const rs = await DeviceInfo.syncUniqueId();
        setDeviceID(rs)
      } catch (error) {
        logErrorForMonitoring(error as any, "get device id error")
        setDeviceID("")
      }
    })()
  }, [])

  const submitDeviceID = useCallback(async () => {
    try {
      // if (!networkConfig || !networkConfig.api_endpoint || !toggleAlreadySubmitDeviceID || alreadySubmitDeviceID || !deviceID) return
      if (!networkConfig || !networkConfig.api_endpoint) return
      const deviceID = await DeviceInfo.syncUniqueId();
      const endpoint = `${networkConfig?.api_endpoint}${SUBMIT_DEVICE_ID_ENDPOINT}`

      // const appToken = await getAppCheckToken()

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("X-Firebase-AppCheck", appToken)
      
      const raw = JSON.stringify({
        deviceID
      });
      const requestOptions: Record<string, any> = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      // console.log('register device id', deviceID)
      const rs = await fetch(endpoint, requestOptions)
      // toggleAlreadySubmitDeviceID()
      return rs
    } catch (error) {
      logErrorForMonitoring(error as any, "submite device id error")
      return
    }
  }, [
    networkConfig,
    // alreadySubmitDeviceID,
    // toggleAlreadySubmitDeviceID,
  ])

  const submitDeviceNotiToken = useCallback(async () => {
    try {
      if (!networkConfig || !networkConfig.api_endpoint) return
      const token = await messaging().getToken();

      const endpoint = `${networkConfig.api_endpoint}${SUBMIT_DEVICE_NOTIFICATION_TOKEN}`

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        tokens: [token],
        address: wallet.address
      });
      const requestOptions: Record<string, any> = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      // console.log('register device token', token)
      const rs = await fetch(endpoint, requestOptions)
      // toggleAlreadySubmitDeviceID()
      return rs

    } catch (error) {
      logErrorForMonitoring(error as any, "get device noti token error")
    }
  }, [wallet, networkConfig])

  return {
    submitDeviceID,
    submitDeviceNotiToken,
    registerWallet,
    getAppCheckToken,
    deviceID
  }
}
