import React, { useMemo } from 'react';
import { Platform, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Icon from '../Icon';
import styles from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { color } from '../../theme/color';
import { useGlobalStore } from '../../state/global';
import { useTranslation } from 'react-i18next';

export const TABBAR_HEIGHT = 100
export const TABBAR_ITEM_HEIGHT = 80

const SHOW_BOTTOM_TAB_ROUTE = [
  'Home',
  'Wallet',
  'StakingDashboard',
  'U2UEcoDashboard',
  'Setting'
]

export default ({ state, descriptors, navigation }: any) => {
  const {width: viewportWidth} = useWindowDimensions();
  const {darkMode} = usePreferenceStore()

  const { routeName } = useGlobalStore()
  const showTabBar = useMemo(() => {
    return SHOW_BOTTOM_TAB_ROUTE.includes(routeName)
  }, [routeName])

  const {t} = useTranslation<string>()

  if (!showTabBar) return null

  return (
    <View 
      style={{ 
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row', 
        height: Platform.OS === "ios" ? TABBAR_HEIGHT : TABBAR_ITEM_HEIGHT,
        width: viewportWidth,
        backgroundColor: darkMode ? '#181818' : '#FFFFFF',
        position: 'absolute',
        bottom: 0
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const renderLabel = ({focused}: {
          focused: boolean;
        }) => {
          if (route.name === 'DiscoverStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? color.primary[500] : color.neutral[500]}]}>
                {t('discover')}
              </Text>
            )
          } else if (route.name === 'EcosystemStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? color.primary[500] : color.neutral[500]}]}>
                {t('Ecosystem')}
              </Text>
            )
          } else if (route.name === 'WalletStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? color.primary[500] : color.neutral[500]}]}>
                {t('walletTab')}
              </Text>
            )
          } else if (route.name === 'StakingStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? color.primary[500] : color.neutral[500]}]}>
                {t('stakingTab')}
              </Text>
            )
          } else if (route.name === 'MoreStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? color.primary[500] : color.neutral[500]}]}>
               {t('More')}
              </Text>
            )
          } else if (route.name === 'SettingStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? color.primary[500] : color.neutral[500]}]}>
                {t('settingTab')}
              </Text>
            )
          }
        }

        const renderIcon = ({size, focused}: {size: number, focused: boolean}) => {
          let iconName = '';
          if (route.name === 'DiscoverStack') {
            iconName = focused ? 'discover-active' : 'discover'
          } else if (route.name === 'EcosystemStack') {
            iconName = 'box'
          } else if (route.name === 'WalletStack') {
            iconName = 'wallet'
          } else if (route.name === 'StakingStack') {
            iconName = 'coin'
          } else if (route.name === 'MoreStack') {
            iconName = 'category'
          } else if (route.name === 'SettingStack') {
            iconName= 'setting'
          }

          // You can return any component that you like here!
          return <Icon name={iconName} width={size} height={size} color={focused ? color.primary[500] : color.neutral[500]} />;
        }

        return (
          <TouchableOpacity
            key={`tab-item-${index}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ 
              width: viewportWidth / state.routes.length ,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopColor: isFocused ? color.primary[500] : 'transparent',
              borderTopWidth: 2,
              height: TABBAR_ITEM_HEIGHT
            }}
          >
            {renderIcon({size: 22, focused: isFocused})}
            {renderLabel({focused: isFocused})}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}