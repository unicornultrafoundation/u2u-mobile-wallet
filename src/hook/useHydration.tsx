import { useEffect, useState } from "react"
import { useWalletStore } from "../state/wallet"
import { useLocalStore } from "../state/local"

export const useHydration = () => {
  const [hydratedWallet, setHydratedWallet] = useState(false)
  const [hydratedAppSetting, setHydratedAppSetting] = useState(false)

  useEffect(() => {
    // Wallet
    const unsubHydrateWallet = useWalletStore.persist.onHydrate(() => setHydratedWallet(false))
    const unsubFinishHydrationWallet = useWalletStore.persist.onFinishHydration(() => setHydratedWallet(true))
    setHydratedWallet(useWalletStore.persist.hasHydrated())

    // App setting
    const unsubHydrateAppSetting = useLocalStore.persist.onHydrate(() => setHydratedAppSetting(false))
    const unsubFinishHydrationAppSetting = useLocalStore.persist.onFinishHydration(() => setHydratedAppSetting(true))
    setHydratedAppSetting(useLocalStore.persist.hasHydrated())

    return () => {
      unsubHydrateWallet()
      unsubFinishHydrationWallet()

      unsubHydrateAppSetting()
      unsubFinishHydrationAppSetting()
    }
  }, [])

  return {
    hydratedWallet,
    hydratedAppSetting,
    loaded: hydratedWallet && hydratedAppSetting
  }
}