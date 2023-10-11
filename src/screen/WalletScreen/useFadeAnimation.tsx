import {Animated, Easing} from 'react-native';
import {useEffect} from 'react';

export const useFadeAnimation = (showAnim: boolean) => {
  const animatedValue = new Animated.Value(1);

  const fadeOut = () => {
    animatedValue.setValue(1);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    });
  };

  const fadeIn = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    });
  };

  const getAnimatedStyle = (
    initialValue: number,
    transformedValue: number = 0,
  ) =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [initialValue, transformedValue],
      extrapolate: 'clamp',
    });

  useEffect(() => {
    showAnim ? fadeOut() : fadeIn();
  }, [showAnim]);

  return {
    animatedValue,
    getAnimatedStyle,
  };
};
