import React from 'react';
import { useWalletAssets } from '../../../hook/useWalletAssets';
import { ScrollView } from 'react-native';
import TokenRow from './TokenRow';
import { useGlobalStore } from '../../../state/global';

const CryptoTab = () => {
  const {assets} = useWalletAssets()
  const {searchKeyword} = useGlobalStore()

  return (
    <ScrollView>
      {assets.filter((i) => {
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
