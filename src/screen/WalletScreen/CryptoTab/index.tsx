import React, { useEffect } from 'react';
import { useWalletAssets } from '../../../hook/useWalletAssets';
import { ScrollView } from 'react-native';
import TokenRow from './TokenRow';

const CryptoTab = () => {
  const {assets} = useWalletAssets()

  return (
    <ScrollView>
      {assets.map((tokenObj: any) => {
        return (
          <TokenRow tokenObj={tokenObj} key={`token-asset-${tokenObj.symbol}`} />
        )
      })}
    </ScrollView>
  )
}

export default CryptoTab;
