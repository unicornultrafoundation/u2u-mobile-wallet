import React, { useMemo } from 'react';
import {Dimensions, Animated, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Separator from '../../../component/Separator';
import {useFadeAnimation} from '../useFadeAnimation';
import { useTranslation } from 'react-i18next';
import AppViewStep from './AppViewStep';
import { useNavigation } from '@react-navigation/native';
import { useNetwork } from '@/hook/useNetwork';
import { useRemoteConfig } from '@/hook/useRemoteConfig';

const BannerSection = ({collapsed}: {collapsed: boolean}) => {
  const {networkConfig} = useNetwork()
  const width = Dimensions.get('window').width || 375; // Fallback width

  const {getAnimatedStyle} = useFadeAnimation(collapsed);
  const { i18n } = useTranslation();
  const navigation = useNavigation<any>()

  const {remoteConfig} = useRemoteConfig()

  const BANNER_CONFIG = remoteConfig.bannerConfig[i18n.language] || []

  const filteredBanner = useMemo(() => {
    if (!BANNER_CONFIG || !Array.isArray(BANNER_CONFIG)) return []
    return BANNER_CONFIG.filter((item) => !networkConfig ? false : item.network.includes(Number(networkConfig?.chainID)))
  }, [networkConfig, BANNER_CONFIG])

  return (
    <Animated.View
      style={{
        height: getAnimatedStyle(170),
        opacity: getAnimatedStyle(1),
      }}>
      <Separator />
      {filteredBanner && filteredBanner.length > 0 && (
        <Carousel
          loop
          width={width}
          height={147}
          data={filteredBanner}
          scrollAnimationDuration={400}
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({item, index}) => {
            return (
              <AppViewStep
                {...item}
                position={`${index + 1}/${filteredBanner.length}`}
                buttonOnPress={() => {
                  if (item.type === 'AppViewStep') {
                    navigation.navigate(item.screen, item.screenParams)
                  }
                }}
              />
            )
          }}
        />
      )}
    </Animated.View>
  );
};

export default BannerSection;
