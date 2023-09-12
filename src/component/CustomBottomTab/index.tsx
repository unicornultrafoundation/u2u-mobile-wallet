import React, { useMemo } from 'react';
import { Image, Platform, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Icon from '../Icon';
import styles from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const TABBAR_HEIGHT = 80

export default ({ state, descriptors, navigation }: any) => {
  const {width: viewportWidth} = useWindowDimensions();
  const {darkMode} = usePreferenceStore()

  const theme = useMemo(() => {
    if (darkMode) {
      return darkTheme
    }
    return lightTheme
  }, [darkMode])

  return (
    <View 
      style={{ 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', 
        height: TABBAR_HEIGHT,
        width: viewportWidth,
        backgroundColor: darkMode ? '#181818' : '#FFFFFF',
        // borderTopColor: theme.backgroundFocusColor,
      }}
    >
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
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
          if (route.name === 'HomeStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? '#1EAA7F' : '#646464'}]}>
                Home
              </Text>
            )
          } else if (route.name === 'DappStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? '#1EAA7F' : '#646464'}]}>
                Dapp
              </Text>
            )
          } else if (route.name === 'U2UStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? '#1EAA7F' : '#646464'}]}>
                U2U
              </Text>
            )
          } else if (route.name === 'InvestmentStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? '#1EAA7F' : '#646464'}]}>
                Investment
              </Text>
            )
          } else if (route.name === 'WalletStack') {
            return (
              <Text style={[styles.tabTitle, {color: focused ? '#1EAA7F' : '#646464'}]}>
                Wallet
              </Text>
            )
          }
        }

        const renderIcon = ({size, focused}: {size: number, focused: boolean}) => {
          let iconName = '';
          if (route.name === 'HomeStack') {
            iconName = focused ? 'home-active' : 'home'
          } else if (route.name === 'DappStack') {
            iconName = focused ? 'dapp-active' : 'dapp'
          } else if (route.name === 'U2UStack') {
            iconName = focused ? 'u2u-active' : 'u2u'
          } else if (route.name === 'InvestmentStack') {
            iconName = focused ? 'investment-active' : 'investment'
          } else if (route.name === 'WalletStack') {
            iconName = focused ? 'wallet-active' : 'wallet'
          }

          // You can return any component that you like here!
          return <Icon name={iconName} width={size} height={size} />;
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
              width: viewportWidth / 5 ,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopColor: isFocused ? '#1EAA7F' : 'transparent',
              borderTopWidth: 2,
              height: '100%'
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