import React from 'react';
import { usePreferenceStore } from '../../state/preferences';
import { StyleProp, View, ViewStyle } from 'react-native';
import { darkTheme, lightTheme } from '../../theme/color';
import { styles } from './styles';

const Separator = ({style}: {
  style?: StyleProp<ViewStyle>
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={[styles.separator, {borderBottomColor: preferenceTheme.outline}, style]}/>
  )
}

export default Separator;