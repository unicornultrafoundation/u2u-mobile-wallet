/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Dimensions, StatusBar, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "./src/i18n"
import DiscoverStackScreen from './src/stack/DiscoverStack';
import CustomBottomTab from './src/component/CustomBottomTab';
import WalletStackScreen from './src/stack/WalletStack';
import BrowserStackScreen from './src/stack/BrowserStack';
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

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient()

function App(): JSX.Element {
  const {darkMode: isDarkMode} = usePreferenceStore()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkTheme.background.background : lightTheme.background.background,
    flex: 1,
  };

  const {wallet} = useWallet()
  const {loaded} = useHydration()

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}

export default App;
