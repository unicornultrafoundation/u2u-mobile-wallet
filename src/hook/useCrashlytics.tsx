import { useEffect } from "react";
import { useWallet } from "./useWallet"
import DeviceInfo from "react-native-device-info"
import crashlytics from '@react-native-firebase/crashlytics';
import { Platform } from "react-native";

export const logErrorForMonitoring = (error: Error, jsErrorName?: string) => {
  console.error(jsErrorName, error)
  crashlytics().recordError(error, jsErrorName)
}

export const useCrashlytics = () => {
  const {wallet} = useWallet()

  useEffect(() => {
    crashlytics().setUserId(wallet.address)
  }, [wallet])

  useEffect(() => {
    (async () => {
      const deviceID = await DeviceInfo.syncUniqueId();
      const platform = Platform.OS
      const version = Platform.Version

      await crashlytics().setAttributes({
        deviceID,
        platform,
        version: version.toString(),
        appVersion: DeviceInfo.getVersion()
      })

    })()
  }, [])

  return {
    logErrorForMonitoring
  }

}