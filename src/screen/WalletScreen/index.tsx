import React, { useCallback, useState } from 'react';
import { styles } from './styles';
import { View } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import WalletHeader from './WalletHeader';
import BalanceCard from './BalanceCard';
import Tab from '../../component/Tab';
import CryptoTab from './CryptoTab';
import NFTTab from './NFTTab';
import BannerSection from './BannerSection';
import Separator from '../../component/Separator';
import { useFocusEffect, useRoute } from '@react-navigation/core';
import { useGlobalStore } from '../../state/global';

const WalletScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  
  const [tab, setTab] = useState('crypto')

  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  return (
    <View style={[
      styles.container,
      {backgroundColor: preferenceTheme.background.background}
    ]}>
      <WalletHeader />
      <BalanceCard />
      <Separator/>
      <BannerSection />
      <Separator />
      <Tab
        tabs={[
          {
            label: 'Crypto',
            value: 'crypto'
          },
          {
            label: 'NFT',
            value: 'nft'
          }
        ]}
        selectedTab={tab}
        onChange={(v) => setTab(v)}
        tabStyle={{
          borderColor: 'transparent',
          
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingLeft: 16,
          paddingRight: 12
        }}
        containerStyle={{
          borderColor: 'transparent'
        }}
      />
      {tab === 'crypto' && (
        <CryptoTab />
      )}
      {tab === 'nft' && (
        <NFTTab />
      )}
    </View>
  );
};

export default WalletScreen;
