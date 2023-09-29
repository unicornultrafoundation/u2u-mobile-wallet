import React, { useEffect, useMemo } from "react";
import { useWalletStore } from "../state/wallet";
import { getWalletFromMnemonic } from "../util/wallet";
import { useWallet } from "./useWallet";
import { useSupportedTokens } from "./useSupportedTokens";

export function useWalletAssets() {
  const {wallet} = useWallet()
  const {supportedTokens, loading} = useSupportedTokens()

  // useEffect(() => {
  //   if (loading) return;

  // }, [loading, supportedTokens])

  return {supportedTokens}
}