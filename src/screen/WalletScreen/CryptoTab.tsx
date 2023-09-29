import React, { useEffect } from 'react';
import Text from '../../component/Text';
import { useWalletAssets } from '../../hook/useWalletAssets';

const CryptoTab = () => {
  const {supportedTokens} = useWalletAssets()

  return (
    <Text>Crypto tab</Text>
  )
}

export default CryptoTab;
