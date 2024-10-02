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
import React, { useEffect } from 'react';
import { Linking, StatusBar } from 'react-native';

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
import ToastComponent from './src/component/Toast';

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

const NAVIGATION_IDS = ['discover', 'ecosystem', 'external-sign', 'chat-detail'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  console.log('buildDeepLinkFromNotificationData', data)
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.log('Unverified navigationId', navigationId)
    return null;
  }
  if (navigationId === 'external-sign') {
    const signRequestID = data?.signRequestId
    return `u2umobilewallet://wallet/external-sign/${signRequestID}`;
  }
  if (navigationId === 'chat-detail') {
    const conversationID = data?.conversationID;
    return `u2umobilewallet://wallet/chat-detail/${conversationID}`;
  }
  if (navigationId === 'discover') {
    const newsId = data?.newsId
    if (newsId) return `u2umobilewallet://discover/detail/${newsId}`
    return 'u2umobilewallet://discover/dashboard';
  }
  const url = data?.url;
  if (typeof url === 'string') {
    return `u2umobilewallet://ecosystem/${url}`
  }
  console.log('Missing url')
  return null
}

const linking = {
  prefixes: ['u2umobilewallet://'],
  config: {
    // initialRouteName: 'WalletStack',
    screens: {
      WalletStack: {
        screens: {
          WCSignRequest: 'wallet/external-sign/:signRequestID',
          WCScanQRCode: 'wallet/session-approval/:sessionID',
          ChatDetail: 'wallet/chat-detail/:conversationID'
        }
      },
      EcosystemStack: {
        screens: {
          DAppWebView: 'ecosystem/:url'
        }
      },
      DiscoverStack: {
        screens: {
          Home: 'discover/dashboard',
          NewsDetails: 'discover/detail/:id'
        }
      }
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

  const {chainId} = useNetwork()
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

  const {submitDeviceID, submitDeviceNotiToken} = useTracking()
  
  useEffect(() => {
    submitDeviceID()
  }, [submitDeviceID])

  useEffect(() => {
    submitDeviceNotiToken()
  }, [submitDeviceNotiToken])

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
        <ToastComponent />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
