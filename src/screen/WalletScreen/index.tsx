import React, {useCallback, useRef, useState} from 'react';
import {styles} from './styles';
import { NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView } from 'react-native';
import {usePreferenceStore} from '../../state/preferences';
import {darkTheme, lightTheme} from '../../theme/color';
import WalletHeader from './WalletHeader';
import BalanceCard from './BalanceCard';
import Tab from '../../component/Tab';
import CryptoTab from './CryptoTab';
import NFTTab from './NFTTab';
import BannerSection from './BannerSection';
import Separator from '../../component/Separator';
import {useFocusEffect, useRoute} from '@react-navigation/core';
import {useGlobalStore} from '../../state/global';

const WalletScreen = () => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [tab, setTab] = useState('crypto');
  const [scrollOffset, setScrollOffset] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const route = useRoute();
  const {setRouteName} = useGlobalStore();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setScrollOffset(currentOffset);

    if (currentOffset > scrollOffset) {
      !collapsed && setCollapsed(true);
      return;
    } else {
      setCollapsed(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: preferenceTheme.background.background},
      ]}>
      <ScrollView scrollEventThrottle={16} onScroll={onScroll}>
        <WalletHeader collapsed={collapsed} />
        <BalanceCard />
        <Separator />
        <BannerSection />
        <Separator />

        <Tab
          tabs={[
            {
              label: 'Crypto',
              value: 'crypto',
            },
            {
              label: 'NFT',
              value: 'nft',
            },
          ]}
          selectedTab={tab}
          onChange={v => setTab(v)}
          tabStyle={{
            borderColor: 'transparent',

            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingLeft: 16,
            paddingRight: 12,
          }}
          containerStyle={{
            borderColor: 'transparent',
          }}
        />
        {tab === 'crypto' && <CryptoTab />}
        {tab === 'nft' && <NFTTab />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
