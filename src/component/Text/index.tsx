import React, { useMemo } from 'react'
import { Text as RNText, TextProps, TextStyle } from 'react-native'
import { typography } from '../../theme/typography';
import { usePreferenceStore } from '../../state/preferences';
import theme from '../../theme';
import { darkTheme, lightTheme } from '../../theme/color';

interface Props extends TextProps {
  type?: string;
  style?: TextStyle
}

const Text = ({children, style, type = 'label-regular', ...rest}: Props) => {
  const {darkMode} = usePreferenceStore()
  const [typoType, variant] = useMemo(() => {
    return type.split('-')
  }, [type])

  const defaultStyle = useMemo(() => {
    return typography[typoType][variant]
  }, [typoType, variant])

  const textColor = useMemo(() => {
    if (darkMode) return darkTheme.text.title
    return lightTheme.text.title
  }, [darkMode])

  return (
    <RNText
      {...rest}
      style={[
        defaultStyle,
        {color: textColor},
        style
      ]}
    >
      {children}
    </RNText>
  )
};

export default Text;