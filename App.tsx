/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, { useEffect, useMemo } from 'react';
import { Dimensions, Linking, StatusBar, TouchableOpacity, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "./src/i18n"
import DiscoverStackScreen from './src/stack/DiscoverStack';
import CustomBottomTab from './src/component/CustomBottomTab';
import WalletStackScreen from './src/stack/WalletStack';
import EcosystemStackScreen from './src/stack/EcosystemStack';
import StakingStackScreen from './src/stack/StakingStack';
import { useWallet } from './src/hook/useWallet';
import OnboardingStackScreen from './src/stack/OnboardingStack';
import { usePreferenceStore } from './src/state/preferences';
import { darkTheme, lightTheme } from './src/theme/color';
import { useHydration } from './src/hook/useHydration';
import SplashScreen from './src/screen/SplashScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import MoreStackScreen from './src/stack/MoreStack';
import { MenuProvider } from 'react-native-popup-menu';
import Toast, { BaseToast } from 'react-native-toast-message';
import theme from './src/theme';
import Text from './src/component/Text';
import Icon from './src/component/Icon';
import { useNetwork } from './src/hook/useNetwork';

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient()

function App(): JSX.Element {
  const {darkMode: isDarkMode} = usePreferenceStore()
  const preferenceTheme = isDarkMode ? darkTheme : lightTheme

  const {blockExplorer} = useNetwork()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkTheme.background.background : lightTheme.background.background,
    flex: 1,
  };

  const {wallet} = useWallet()
  const {loaded} = useHydration()

  const toastConfig = useMemo(() => {
    return {
      success: ({text1, text2, props}: any) => {
        return (
          <View
            style={{
              height: 60,
              width: '85%',
              padding: 12,
              borderRadius: 16,
              backgroundColor: preferenceTheme.background.surface,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16
            }}
          >
            <View style={{padding: 10, paddingRight: 0}}>
              <Icon name='success' height={32} width={32} />
            </View>
            <View style={{flex: 1, paddingHorizontal: 12}}>
              <Text
                style={[
                  theme.typography.body.bold,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {text1}
              </Text>
              {props.txHash && (
                <TouchableOpacity
                  style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
                  onPress={() => {
                    Linking.openURL(`${blockExplorer}/tx/${props.txHash.toLowerCase()}`)
                  }}
                >
                  <Text
                    style={[
                      theme.typography.body.medium,
                      {
                        color: preferenceTheme.text.disabled
                      }
                    ]}
                  >
                    Detail
                  </Text>
                  <Icon name="chevron-right" width={18} height={18} />
                </TouchableOpacity>
              )}
            </View>
            {props.renderTrailing && props.renderTrailing()}
          </View>
        )
      },
      error: ({text1, text2, props}: any) => {
        return (
          <View
            style={{
              height: 60,
              width: '85%',
              padding: 12,
              borderRadius: 16,
              backgroundColor: preferenceTheme.background.surface,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16
            }}
          >
            <View style={{padding: 10}}>
              <Icon name='error' height={32} width={32} />
            </View>
            <View style={{flex: 1, paddingHorizontal: 12}}>
              <Text
                style={[
                  theme.typography.body.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {text1}
              </Text>
              <Text
                style={[
                  theme.typography.body.medium,
                  {
                    color: preferenceTheme.text.disabled
                  }
                ]}
              >
                {text2}
              </Text>
            </View>
            {props.renderTrailing && props.renderTrailing()}
          </View>
        )
      }
    }
  }, [preferenceTheme])

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MenuProvider>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
                // backgroundColor="transparent"
              />
              {wallet.address === "" ? (
                <OnboardingStackScreen />
              ) : (
                <Tab.Navigator
                  tabBar={({state, descriptors, navigation}) => <CustomBottomTab state={state} descriptors={descriptors} navigation={navigation} />}
                  screenOptions={{ headerShown: false }}
                  initialRouteName='WalletStack'
                >
                  <Tab.Screen name="DiscoverStack" component={DiscoverStackScreen} />
                  <Tab.Screen name="EcosystemStack" component={EcosystemStackScreen} />
                  <Tab.Screen name="WalletStack" component={WalletStackScreen} />
                  <Tab.Screen name="StakingStack" component={StakingStackScreen} />
                  {/* <Tab.Screen name="BrowserStack" component={BrowserStackScreen} /> */}
                  <Tab.Screen name="MoreStack" component={MoreStackScreen} />
                </Tab.Navigator>
              )}
            </NavigationContainer>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </MenuProvider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}

export default App;
