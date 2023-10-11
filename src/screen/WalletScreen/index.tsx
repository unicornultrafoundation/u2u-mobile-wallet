import React, {useCallback, useState} from 'react';
import {styles} from './styles';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
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
import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';

const WalletScreen = () => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const windowWidth = Dimensions.get('window').width;

  const [tab, setTab] = useState('crypto');
  const [collapsed, setCollapsed] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [firstTouch, setFirstTouch] = useState(0);
  const COLLAPSED_OFFSET = 10;

  const route = useRoute();
  const {setRouteName} = useGlobalStore();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setScrollOffset(currentOffset);

    if (scrollOffset > COLLAPSED_OFFSET) {
      !collapsed && setCollapsed(true);
    }
  };

  // Handle Swipe event
  const handleTouchEnd = (e: GestureResponderEvent) => {
    // get touch position and screen size
    const positionY = e.nativeEvent.pageY;
    const range = COLLAPSED_OFFSET;

    // check if position is growing positively and has reached specified range
    if (positionY - firstTouch > range) {
      console.log('down')
      collapsed && setCollapsed(false);
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionY > range) {
      console.log('up')
      // !collapsed && setCollapsed(true);
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
      <WalletHeader onGoBack={() => setCollapsed(false)} collapsed={collapsed} action={tab} />
      <BalanceCard collapsed={collapsed} />
      <BannerSection collapsed={collapsed} />
      <Separator />
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        onTouchStart={e => setFirstTouch(e.nativeEvent.pageY)}
        onTouchEnd={e => handleTouchEnd(e)}>
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
