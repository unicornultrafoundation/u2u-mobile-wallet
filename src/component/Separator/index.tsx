import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from './styles';
import { usePreference } from '../../hook/usePreference';

const Separator = ({style}: {
  style?: StyleProp<ViewStyle>
}) => {
  const {preferenceTheme} = usePreference()

  return (
    <View style={[styles.separator, {borderBottomColor: preferenceTheme.outline}, style]}/>
  )
}

export default Separator;