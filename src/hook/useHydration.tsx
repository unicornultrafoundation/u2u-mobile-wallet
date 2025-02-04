import { useEffect, useState } from "react"
import { WALLET_STORE_KEY, useWalletStore } from "../state/wallet"
import { useLocalStore } from "../state/local"
import AsyncStorage from "@react-native-async-storage/async-storage"
import EncryptedStorage from "react-native-encrypted-storage"
import { Platform } from "react-native"
import { isAlreadyInited } from "../util/platform"
import { logErrorForMonitoring } from "./useCrashlytics"

export const useHydration = () => {
  const [hydratedWallet, setHydratedWallet] = useState(false)
  const [hydratedAppSetting, setHydratedAppSetting] = useState(false)

  const migrateWalletData = async () => {
    if (!(await isAlreadyInited())) {
      try {
        const oldWalletData = await EncryptedStorage.getItem(WALLET_STORE_KEY)
        
        if (oldWalletData) {
          await EncryptedStorage.removeItem(WALLET_STORE_KEY)
        }
      } catch (error) {
        console.log(error)
        // @ts-ignore
        console.log(error.code)
        logErrorForMonitoring(error as any, "migrateWalletData fail")
      }
      await useWalletStore.persist.rehydrate()
      setHydratedWallet(true) 
      return;
    }

    const newData = await EncryptedStorage.getItem(WALLET_STORE_KEY)
    const oldData = await AsyncStorage.getItem(WALLET_STORE_KEY)
    if (newData) {
      if (newData === oldData) {
        await AsyncStorage.removeItem(WALLET_STORE_KEY)
      }

      const newDataObj = JSON.parse(newData)
      if (newDataObj.state.seedPhrase) {
        setHydratedWallet(true)
        return
      }
    };
    
    if (!oldData) {
      setHydratedWallet(true)
      return;
    }
    await EncryptedStorage.setItem(WALLET_STORE_KEY, oldData)
    await useWalletStore.persist.rehydrate()
    setHydratedWallet(true)
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await migrateWalletData()
      }

      // Wallet
      const unsubHydrateWallet = useWalletStore.persist.onHydrate(() => setHydratedWallet(false))
      const unsubFinishHydrationWallet = useWalletStore.persist.onFinishHydration(() => setHydratedWallet(true))
      setHydratedWallet(useWalletStore.persist.hasHydrated())

      // App setting
      const unsubHydrateAppSetting = useLocalStore.persist.onHydrate(() => setHydratedAppSetting(false))
      const unsubFinishHydrationAppSetting = useLocalStore.persist.onFinishHydration(() => setHydratedAppSetting(true))
      setHydratedAppSetting(useLocalStore.persist.hasHydrated())
      
      if (Platform.OS === 'ios') {
        migrateWalletData()
      }

      return () => {
        unsubHydrateWallet()
        unsubFinishHydrationWallet()

        unsubHydrateAppSetting()
        unsubFinishHydrationAppSetting()
      }
    })()
  }, [])

  return {
    hydratedWallet,
    hydratedAppSetting,
    loaded: hydratedWallet && hydratedAppSetting
  }
}