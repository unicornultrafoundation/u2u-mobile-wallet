import {Animated, Easing} from 'react-native';

export const useFadeAnimation = () => {
  const animatedValue = new Animated.Value(1);

  const opacityStyle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const heightStyle = (height: number) =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
      extrapolate: 'clamp',
    });

  const fadeOut = () => {
    animatedValue.setValue(1);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    });
  };

  const fadeIn = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    });
  };

  return {
    opacityStyle,
    heightStyle,
    fadeIn,
    fadeOut,
  };
};
