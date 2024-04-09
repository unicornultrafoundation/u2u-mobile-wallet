/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import '@ethersproject/shims';
import 'event-target-polyfill'
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
import messaging from '@react-native-firebase/messaging';
import NoInternetScreen from './src/screen/NoInternetScreen';
import { useTracking } from './src/hook/useTracking';
import MainTabNav from './src/stack/MainTab';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCrashlytics } from './src/hook/useCrashlytics';

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

const NAVIGATION_IDS = ['discover'];
function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId)
    return null;
  }
  // if (navigationId === 'home') {
  //   return 'u2umobilewallet://home';
  // }
  // if (navigationId === 'settings') {
  //   return 'u2umobilewallet://settings';
  // }
  const url = data?.url;
  if (typeof url === 'string') {
    return `u2umobilewallet://ecosystem/${url}`
  }
  console.warn('Missing url')
  return null
}

const linking = {
  prefixes: ['u2umobilewallet://'],
  config: {
    // initialRouteName: 'WalletStack',
    screens: {
      // WalletStack: 'wallet',
      EcosystemStack: {
        screens: {
          DAppWebView: 'ecosystem/:url'
        }
      },
      // SettingStack: 'setting'
    }
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data)
      if (typeof url === 'string') {
        listener(url)
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
}

function App(): JSX.Element {
  useCrashlytics()
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
              linking={linking}
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
