import React, { useState } from 'react';
import { styles } from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import WalletHeader from './WalletHeader';
import BalanceCard from './BalanceCard';
import Tab from '../../component/Tab';
import CryptoTab from './CryptoTab';
import NFTTab from './NFTTab';
import BannerSection from './BannerSection';

const Separator = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={[styles.separator, {borderBottomColor: preferenceTheme.outline}]}/>
  )
}

const WalletScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  
  const [tab, setTab] = useState('crypto')

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
