import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Text from '../../component/Text';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const SplashScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: preferenceTheme.background.background
      }
    ]}>
      <ActivityIndicator />
      <Text>Loading</Text>
    </View>
  )
};

export default SplashScreen;