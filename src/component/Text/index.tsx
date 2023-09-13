import React, { useMemo } from 'react'
import { Text as RNText, TextProps, TextStyle } from 'react-native'
import { typography } from '../../theme/typography';

interface Props extends TextProps {
  type?: string;
  style?: TextStyle
}

const Text = ({children, style, type = 'label-regular', ...rest}: Props) => {
  const [typoType, variant] = useMemo(() => {
    return type.split('-')
  }, [type])

  const defaultStyle = useMemo(() => {
    return typography[typoType][variant]
  }, [typoType, variant])

  return (
    <RNText
      {...rest}
      style={[defaultStyle, style]}
    >
      {children}
    </RNText>
  )
};

export default Text;