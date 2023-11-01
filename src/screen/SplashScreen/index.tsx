import React from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './styles';
import SPLASH_BG from '../../asset/images/splash_screen.png'
import LottieView from "lottie-react-native";

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