import { useWallet } from "./useWallet";
import { useSupportedTokens } from "./useSupportedTokens";
import { useOwnedToken } from "./useOwnedToken";
import { useMemo } from "react";
import { useNativeBalance } from "./useNativeBalance";
import { parseFromRaw } from "../util/bignum";
import { useLocalStore } from "../state/local";

export function useWalletAssets() {
  const {wallet} = useWallet()
  const {supportedTokens, loading: loadingSupportedToken} = useSupportedTokens()
  const {customTokenList, selectedToken} = useLocalStore()
  const {loading: loadingOwnedToken, ownedToken} = useOwnedToken(wallet.address)
  const {loading: loadingNativeBalance, balance} = useNativeBalance(wallet.address)

  const assets = useMemo(() => {
    if (supportedTokens.length === 0 && customTokenList.length === 0) return []
    const mergedList = [...supportedTokens, ...customTokenList]
    const rs: any[] = []
    mergedList.forEach((token: any) => {
      if (token.address == "" || token.address == "0x") {
        rs.push({
          ...token,
          ...{
            balance: balance
          }
        })
      } else {
        const existedItem = ownedToken.find((i: any) => i.contractAddress.toLowerCase() === token.address.toLowerCase())
        if (existedItem) {
          rs.push({
            ...token,
            ...{
              balance: parseFromRaw(existedItem.balance, existedItem.decimals)
            }
          })
        }
      }
    })

    return rs
  }, [ownedToken, supportedTokens, balance, customTokenList, selectedToken])

  const assetsToShow = useMemo(() => {
    return assets.filter((i) => {
      if (i.address == "" || i.address == "0x") return true
      return selectedToken.includes(i.address)
    })
  }, [assets, selectedToken])

  return {
    supportedTokens,
    assets,
    assetsToShow,
    loading: loadingSupportedToken || loadingOwnedToken || loadingNativeBalance
  }
}