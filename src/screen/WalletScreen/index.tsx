import React, { useCallback, useEffect, useState, useRef } from 'react';
import { styles } from './styles';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import { TABBAR_HEIGHT } from '../../component/CustomBottomTab';
import theme from '../../theme';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import ManageTokenModal from '../../component/ManageTokenModal';
import { useTranslation } from 'react-i18next';
import { useTracking } from '../../hook/useTracking';
import { Gesture } from 'react-native-gesture-handler';

const WalletScreen = () => {
  const { t } = useTranslation()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [tab, setTab] = useState('crypto');
  const [collapsed, setCollapsed] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [firstTouch, setFirstTouch] = useState(0);
  const scrollViewRef = useRef(null);
  let touchY = 0;

  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  const { registerWallet } = useTracking()

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setScrollOffset(currentOffset);

    if (scrollOffset > 200 && !collapsed) {
      setCollapsed(true);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  // Handle Swipe event
  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y == 0 && firstTouch == 0 && collapsed) {
      setCollapsed(false);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setFirstTouch(e.nativeEvent.contentOffset.y);
  };

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  useEffect(() => {
    registerWallet()
  }, [registerWallet])

  const resetCollapsed = () => {
    setCollapsed(false)
    setScrollOffset(0)
  }


  if (!collapsed) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: preferenceTheme.background.background },
        ]}>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={100}
          nestedScrollEnabled={true}
          onScrollBeginDrag={e => onScrollBeginDrag(e)}
          onScrollEndDrag={e => onScrollEndDrag(e)}
          ref={scrollViewRef}
        >
          <WalletHeader onGoBack={() => setCollapsed(false)} collapsed={collapsed} action={tab} />
          <BalanceCard collapsed={collapsed} />
          <BannerSection collapsed={collapsed} />
          <Separator />
          <Tab
            tabs={[
              {
                label: t('Crypto'),
                value: 'crypto',
              },
              {
                label: t('NFTs'),
                value: 'nfts',
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
          {tab === 'crypto' && <CryptoTab collapsed={collapsed} onResetParentView={() => resetCollapsed()} />}
          {tab === 'nfts' && <NFTTab collapsed={collapsed} onResetParentView={() => resetCollapsed()} />}
        </ScrollView>
        <View style={{ position: 'absolute', bottom: TABBAR_HEIGHT + 16, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <ManageTokenModal
            trigger={() => {
              return (
                <View
                  style={{
                    borderRadius: 80,
                    backgroundColor: preferenceTheme.background.surface,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    gap: 8
                  }}
                >
                  <Icon
                    name="filter"
                    width={15}
                    height={15}
                  />
                  <Text
                    style={[
                      theme.typography.caption1.medium,
                      {
                        color: preferenceTheme.text.disabled,
                      }
                    ]}
                  >
                    {t('manageToken')}
                  </Text>
                </View>
              )
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: preferenceTheme.background.background },
        ]}>
        <View
          onTouchStart={e => touchY = e.nativeEvent.pageY}
          onTouchEnd={e => {
            if (touchY - e.nativeEvent.pageY < -20) {
              resetCollapsed();
            }
          }}
        >
          <WalletHeader onGoBack={() => resetCollapsed()} collapsed={collapsed} action={tab} />
          <BalanceCard collapsed={collapsed} />
          <BannerSection collapsed={collapsed} />
          <Separator />
        </View>
        <Tab
          tabs={[
            {
              label: t('Crypto'),
              value: 'crypto',
            },
            {
              label: t('NFTs'),
              value: 'nfts',
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
        {tab === 'crypto' && <CryptoTab collapsed={collapsed} onResetParentView={() => resetCollapsed()} />}
        {tab === 'nfts' && <NFTTab collapsed={collapsed} onResetParentView={() => resetCollapsed()} />}
        <View style={{ position: 'absolute', bottom: TABBAR_HEIGHT + 16, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <ManageTokenModal
            trigger={() => {
              return (
                <View
                  style={{
                    borderRadius: 80,
                    backgroundColor: preferenceTheme.background.surface,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    gap: 8
                  }}
                >
                  <Icon
                    name="filter"
                    width={15}
                    height={15}
                  />
                  <Text
                    style={[
                      theme.typography.caption1.medium,
                      {
                        color: preferenceTheme.text.disabled,
                      }
                    ]}
                  >
                    {t('manageToken')}
                  </Text>
                </View>
              )
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

};

export default WalletScreen;
