import { useWallet } from "./useWallet";
import { useSupportedTokens } from "./useSupportedTokens";
import { useOwnedToken } from "./useOwnedToken";
import { useMemo } from "react";
import { useNativeBalance } from "./useNativeBalance";
import { parseFromRaw } from "../util/bignum";

export function useWalletAssets() {
  const {wallet} = useWallet()
  const {supportedTokens, loading: loadingSupportedToken} = useSupportedTokens()
  const {loading: loadingOwnedToken, ownedToken} = useOwnedToken(wallet.address)
  const {loading: loadingNativeBalance, balance} = useNativeBalance(wallet.address)
  const assets = useMemo(() => {
    if (supportedTokens.length === 0) return []
    const rs: any[] = []
    supportedTokens.forEach((token: any) => {
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
  }, [ownedToken, supportedTokens, balance])

  return {
    supportedTokens,
    assets,
    loading: loadingSupportedToken || loadingOwnedToken || loadingNativeBalance
  }
}