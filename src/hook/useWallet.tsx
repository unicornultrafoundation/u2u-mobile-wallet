import React, { useMemo } from "react";
import { useWalletStore } from "../state/wallet";
import { getWalletFromMnemonic } from "../util/wallet";

export function useWallet() {
  const { seedPhrase, selectedIndex, accessWallet } = useWalletStore()

  const wallet = useMemo(() => {
    if (!seedPhrase) {
      return {
        address: "",
        privateKey: "",
        mnemonic: "",
        path: ""
      }
    }
    return getWalletFromMnemonic(seedPhrase, selectedIndex)
  }, [seedPhrase, selectedIndex])

  return {wallet, accessWallet}
}