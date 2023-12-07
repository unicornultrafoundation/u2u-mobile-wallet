import { useCallback, useEffect, useState } from "react"
import { SUBMIT_DEVICE_ID_ENDPOINT, SUBMIT_WALLET_ENDPOINT } from "../config/endpoint"
import { useNetwork } from "./useNetwork"
import DeviceInfo from "react-native-device-info"
import { useLocalStore } from "../state/local"
import { useWallet } from "./useWallet"
import { firebase } from "@react-native-firebase/app-check"
import appsFlyer from "react-native-appsflyer"
import { useQuery } from "@tanstack/react-query"

export const useTracking = () => {
  const { networkConfig } = useNetwork()
  const {wallet} = useWallet()
  const {alreadySubmitDeviceID, toggleAlreadySubmitDeviceID, registeredWallet, addRegisteredWalelt} = useLocalStore()

  const [deviceID, setDeviceID] = useState("")

  const getAppCheckToken = async (force = false) => {
    const { token } = await firebase.appCheck().getToken(force);
    return token
  }
  
  const getAppFlyerUID = async (): Promise<string> => {
    return new Promise((resolve) => {
      appsFlyer.getAppsFlyerUID((err, uid) => {
        if (err) {
          console.log(err)
          resolve("")
        } else {
          resolve(uid)
        }
      })
    })
  }

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

  useEffect(() => {
    (async () => {
      try {
        const rs = await DeviceInfo.syncUniqueId();
        setDeviceID(rs)
      } catch (error) {
        console.log("get device id error", error)
        setDeviceID("")
      }
    })()
  }, [])

  const submitDeviceID = useCallback(async () => {
    try {
      // if (!networkConfig || !networkConfig.api_endpoint || !toggleAlreadySubmitDeviceID || alreadySubmitDeviceID || !deviceID) return
      if (!networkConfig || !networkConfig.api_endpoint || !deviceID) return

      const endpoint = `${networkConfig?.api_endpoint}${SUBMIT_DEVICE_ID_ENDPOINT}`

      const appToken = await getAppCheckToken()
      const appFlyerUID = await getAppFlyerUID()

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-Firebase-AppCheck", appToken)
      myHeaders.append("X-App-Flyer-UID", appFlyerUID)
      
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
      const rs = await fetch(endpoint, requestOptions)
      console.log(rs)
      // toggleAlreadySubmitDeviceID()
      return rs
    } catch (error) {
      console.log('submit device id', error)
      return
    }
  }, [
    networkConfig,
    // alreadySubmitDeviceID,
    // toggleAlreadySubmitDeviceID,
    deviceID
  ])

  return {
    submitDeviceID,
    registerWallet,
    getAppCheckToken,
    getAppFlyerUID,
    deviceID
  }
}
