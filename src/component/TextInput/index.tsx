import React from 'react';
import { TextInput as RNTextInput } from 'react-native'
import { TextInputProps } from 'react-native'
import styles from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

interface Props extends TextInputProps {}

const TextInput = ({style, ...rest}: Props) => {

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <RNTextInput
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background,
          borderColor: preferenceTheme.outline,
          color: preferenceTheme.text.title
        },
        style
      ]}
    />
  )
};

export default TextInput;