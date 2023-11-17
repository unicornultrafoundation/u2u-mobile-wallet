import React, { useEffect } from 'react';
import { useWalletAssets } from '../../../hook/useWalletAssets';
import { ScrollView } from 'react-native';
import TokenRow from './TokenRow';
import { useGlobalStore } from '../../../state/global';
import { useLocalStore } from '../../../state/local';

const CryptoTab = () => {
  const {assets, assetsToShow} = useWalletAssets()
  const {searchKeyword} = useGlobalStore()

  const {selectedToken, tokenListInitted, saveSelectedToken, setTokenListInitted} = useLocalStore()

  useEffect(() => {
    if (tokenListInitted) return

    if (selectedToken.length === 0) {
      const addressList = assets.map((i) => i.address)
      if (addressList.length === 0) return
      saveSelectedToken(addressList)
      setTokenListInitted(true)
    }

  }, [tokenListInitted, selectedToken, assets])

  return (
    <ScrollView>
      {assetsToShow.filter((i) => {
        return (i.address as string).toLowerCase().includes(searchKeyword.toLowerCase()) ||
          (i.symbol as string).toLowerCase().includes(searchKeyword.toLowerCase()) || 
          (i.name as string).toLowerCase().includes(searchKeyword.toLowerCase())
      }).map((tokenObj: any) => {
        return (
          <TokenRow tokenObj={tokenObj} key={`token-asset-${tokenObj.symbol}`} />
        )
      })}
    </ScrollView>
  )
}

export default CryptoTab;
