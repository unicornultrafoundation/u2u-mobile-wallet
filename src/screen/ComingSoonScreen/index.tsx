import React from 'react'
import { View } from 'react-native';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const ComingSoonScreen = () => {
  const {darkMode} = usePreferenceStore()

  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: preferenceTheme.background.background,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text>Coming soon</Text>
    </View>
  )
}

export default ComingSoonScreen;
