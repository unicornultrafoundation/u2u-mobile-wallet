import { useCallback, useMemo } from "react"
import { useNetwork } from "./useNetwork"
import { DEX_SUPPORTED_TOKEN, DexToken } from "../config/dex"

export const useDexTokens = () => {
  const {networkConfig} = useNetwork()

  const defaultTokens: DexToken[] = useMemo(() => {
    if (!networkConfig?.chainID) return []
    return DEX_SUPPORTED_TOKEN[Number(networkConfig.chainID)]
  }, [networkConfig?.chainID])

  const getLogo = useCallback((tokenAddress: string) => {
    if (!defaultTokens) return ""
    const item = defaultTokens.find((i: any) => i.address === tokenAddress)
    return item ? item.logoURI : ""
  }, [defaultTokens])

  return {
    defaultTokens,
    getLogo
  }
}