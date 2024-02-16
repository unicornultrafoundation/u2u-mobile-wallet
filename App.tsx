/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import '@ethersproject/shims';
import 'event-target-polyfill'
import '@walletconnect/react-native-compat'
import React, { useEffect, useMemo } from 'react';
import { Linking, StatusBar, TouchableOpacity, View } from 'react-native';

import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import "./src/i18n"
import { useWallet } from './src/hook/useWallet';
import OnboardingStackScreen from './src/stack/OnboardingStack';
import { usePreferenceStore } from './src/state/preferences';
import { darkTheme, lightTheme } from './src/theme/color';
import { useHydration } from './src/hook/useHydration';
import SplashScreen from './src/screen/SplashScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNetInfo } from "@react-native-community/netinfo";
// import appsFlyer from 'react-native-appsflyer';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import theme from './src/theme';
import Text from './src/component/Text';
import Icon from './src/component/Icon';
import { useNetwork } from './src/hook/useNetwork';
import { useGlobalStore } from './src/state/global';
import AuthScreen from './src/screen/AuthScreen';
import { useNetworkStore } from './src/state/network';
import { SUPPORTED_CHAINS } from './src/config/chain';
import { useTranslation } from 'react-i18next';
// import { APP_FLYERS_DEV_KEY, APP_FLYERS_IOS_APP_ID } from './src/config/constant';
import NoInternetScreen from './src/screen/NoInternetScreen';
import { useTracking } from './src/hook/useTracking';
import MainTabNav from './src/stack/MainTab';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCrashlytics } from './src/hook/useCrashlytics';
import { useWalletConnect } from './src/hook/useWalletConnect';
import WCSessionProposal from './src/screen/WCSessionProposalScreen';

//@ts-ignore
global.CustomEvent = global.Event

const queryClient = new QueryClient()

// appsFlyer.initSdk(
//   {
//     devKey: APP_FLYERS_DEV_KEY!,
//     isDebug: true,
//     appId: APP_FLYERS_IOS_APP_ID,
//     onInstallConversionDataListener: true, //Optional
//     onDeepLinkListener: true, //Optional
//     timeToWaitForATTUserAuthorization: 10 //for iOS 14.5
//   },
//   (result) => {
//     console.log(result);
//   },
//   (error) => {
//     console.error(error);
//   }
// );

function App(): JSX.Element {
  useCrashlytics()
  useWalletConnect()
  const {unlocked} = useGlobalStore()
  const { type, isConnected } = useNetInfo();
  const {darkMode: isDarkMode, language} = usePreferenceStore()
  const preferenceTheme = isDarkMode ? darkTheme : lightTheme
  const {t} = useTranslation()

  const {blockExplorer, chainId} = useNetwork()
  const networkStore = useNetworkStore()

  const routeNameRef = React.useRef<string>();
  const navigationRef = React.useRef<NavigationContainerRef<any>>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkTheme.background.background : lightTheme.background.background,
    flex: 1,
  };

  const {wallet} = useWallet()
  const {loaded} = useHydration()

  const {i18n} = useTranslation<string>()

  const {submitDeviceID} = useTracking()
  
  useEffect(() => {
    submitDeviceID()
  }, [submitDeviceID])

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
                    {t('detail')}
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
      },
      simpleNoti: ({text1, text2, props}: any) => {
        return (
          <View
            style={{
              height: 40,
              padding: 8,
              borderRadius: 12,
              backgroundColor: preferenceTheme.background.surface,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16
            }}
          >
            <View style={{flex: 1, paddingHorizontal: 12}}>
              <Text
                style={[
                  theme.typography.body.bold,
                  {
                    color: preferenceTheme.text.title,
                    textAlign: 'center'
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
                    {t('detail')}
                  </Text>
                  <Icon name="chevron-right" width={18} height={18} />
                </TouchableOpacity>
              )}
            </View>
            {props.renderTrailing && props.renderTrailing()}
          </View>
        )
      }
    }
  }, [preferenceTheme])

  useEffect(() => {
    if (!loaded) return 
    const networkItem = SUPPORTED_CHAINS.find((i) => i.chainID === chainId)
    if (!networkItem) return;
    networkStore.switchNetwork(networkItem)
    
  }, [loaded, chainId])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  if (!loaded) {
    return <SplashScreen />
  }

  if (!isConnected && type !== "unknown") {
    return <NoInternetScreen />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <MenuProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                if (!navigationRef || !navigationRef.current) return
                routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
              }}
              onStateChange={async () => {
                if (!navigationRef || !navigationRef.current) return
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute()?.name;

                if (!currentRouteName) return
        
                if (previousRouteName !== currentRouteName) {
                  await analytics().logScreenView({
                    screen_name: currentRouteName,
                    screen_class: currentRouteName,
                  });
                }
                routeNameRef.current = currentRouteName;
              }}
            >
              <BottomSheetModalProvider>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  backgroundColor={backgroundStyle.backgroundColor}
                  // backgroundColor="transparent"
                />
                {wallet.address === "" ? (
                  <OnboardingStackScreen />
                ) : (
                  <>
                    <MainTabNav />
                    {!unlocked && (<AuthScreen />)}
                  </>
                )}
              </BottomSheetModalProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </MenuProvider>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
