import React from 'react';
import { Image, Platform, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const TABBAR_HEIGHT = 80

export default ({ state, descriptors, navigation, theme }: any) => {
  const {width: viewportWidth} = useWindowDimensions();

  // const showTabBar = useRecoilValue(showTabBarAtom);

  // if (!showTabBar) {
  //   return null
  // }

  return (
    <View 
      style={{ 
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row', 
        height: TABBAR_HEIGHT,
        width: viewportWidth,
        backgroundColor: '#121212',
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
              <Text style={{fontSize: 12, color: focused ? '#1EAA7F' : '#646464'}}>
                Home
              </Text>
            )
          } else if (route.name === 'DappStack') {
            return (
              <Text style={{fontSize: 12, color: focused ? '#1EAA7F' : '#646464'}}>
                Dapp
              </Text>
            )
          } else if (route.name === 'U2UStack') {
            return (
              <Text style={{fontSize: 12, color: focused ? '#1EAA7F' : '#646464'}}>
                U2U
              </Text>
            )
          } else if (route.name === 'InvestmentStack') {
            return (
              <Text style={{fontSize: 12, color: focused ? '#1EAA7F' : '#646464'}}>
                Investment
              </Text>
            )
          } else if (route.name === 'WalletStack') {
            return (
              <Text style={{fontSize: 12, color: focused ? '#1EAA7F' : '#646464'}}>
                Wallet
              </Text>
            )
          }
        }

        // const renderIcon = ({color, size, focused}: {color: string, size: number, focused: boolean}) => {
        //   let iconName = '';

        //   if (route.name === 'Home') {
        //     return (
        //       <Image
        //         style={{width: 24, height: 24, marginTop: 12, marginBottom: 2}}
        //         source={
        //           focused
        //             ? require('../../assets/icon/home_dark.png')
        //             : require('../../assets/icon/home_dark_inactive.png')
        //         }
        //       />
        //     );
        //   } else if (route.name === 'News') {
        //     iconName = 'newspaper-o';
        //   } else if (route.name === 'Transaction') {
        //     return (
        //       <Image
        //         style={{width: 24, height: 24, marginTop: 12, marginBottom: 2}}
        //         source={
        //           focused
        //             ? require('../../assets/icon/transaction_dark.png')
        //             : require('../../assets/icon/transaction_dark_inactive.png')
        //         }
        //       />
        //     );
        //   } else if (route.name === 'Setting') {
        //     return (
        //       <Image
        //         style={{width: 24, height: 24, marginTop: 12, marginBottom: 2}}
        //         source={
        //           focused
        //             ? require('../../assets/icon/setting_dark.png')
        //             : require('../../assets/icon/setting_dark_inactive.png')
        //         }
        //       />
        //     );
        //   } else if (route.name === 'DualNode') {
        //     return (
        //       <Image
        //         style={{width: 24, height: 24, marginTop: 12, marginBottom: 2}}
        //         source={
        //           focused
        //             ? require('../../assets/icon/dual_node.png')
        //             : require('../../assets/icon/dual_node_inactive.png')
        //         }
        //       />
        //     );
        //   } else if (route.name === 'Staking') {
        //     return (
        //       <Image
        //         style={{width: 24, height: 24, marginTop: 12, marginBottom: 2}}
        //         source={
        //           focused
        //             ? require('../../assets/icon/staking_dark.png')
        //             : require('../../assets/icon/staking_dark_inactive.png')
        //         }
        //       />
        //     );
        //   } else if (route.name === 'Address') {
        //     return (
        //       <Image
        //         style={{width: 24, height: 24, marginTop: 12, marginBottom: 2}}
        //         source={
        //           focused
        //             ? require('../../assets/icon/address_book_dark.png')
        //             : require('../../assets/icon/address_book_dark_inactive.png')
        //         }
        //       />
        //     );
        //   } else if (route.name === 'DEX') {
        //     return (
        //       <Image
        //         style={{width: 24, height: 24, marginTop: 12, marginBottom: 2}}
        //         source={
        //           focused
        //             ? require('../../assets/icon/kai_dex_dark.png')
        //             : require('../../assets/icon/kai_dex_dark_inactive.png')
        //         }
        //       />
        //     )
        //   } else if (route.name === 'DApp') {
        //     return (
        //       <Image
        //         style={{width: 24, height: 24, marginTop: 12, marginBottom: 2}}
        //         source={
        //           focused
        //             ? require('../../assets/icon/dapp.png')
        //             : require('../../assets/icon/dapp_inactive.png')
        //         }
        //       />
        //     )
        //   }

        //   // You can return any component that you like here!
        //   return <Icon name={iconName} size={size} color={color} />;
        // }

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
            }}
          >
            {/* {renderIcon({color: 'transparent', size: 24, focused: isFocused})} */}
            {renderLabel({focused: isFocused})}
          </TouchableOpacity>
        );
      })}
      {/* </ScrollView> */}
    </View>
  );
}