import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './styles';
import SPLASH_BG from '../../asset/images/splash_screen.png'
import LottieView from "lottie-react-native";
import { useTracking } from '../../hook/useTracking';
import { firebase } from '@react-native-firebase/app-check';

const rnfbProvider = firebase.appCheck().newReactNativeFirebaseAppCheckProvider();
rnfbProvider.configure({
  android: {
    provider: __DEV__ ? 'debug' : 'playIntegrity',
    debugToken: '85A55CF9-F52A-4840-B249-127B2676AE7D',
  },
  apple: {
    provider: __DEV__ ? 'debug' : 'deviceCheck',
    debugToken: '70E4CA83-2056-4C42-A104-61E6EBACA843',
  },
  // web: {
  //   provider: 'reCaptchaV3',
  //   siteKey: 'unknown',
  // },
});

firebase.appCheck().initializeAppCheck({ provider: rnfbProvider, isTokenAutoRefreshEnabled: true });

const SplashScreen = () => {
  return (
    <ImageBackground
      source={SPLASH_BG}
      style={[
        styles.container,
      ]}
    >
      <LottieView
        style={{ height:250, width: 400}}
        source={require("./loading.json")}
        autoPlay
        loop
      />
    </ImageBackground>
  )
};

export default SplashScreen;