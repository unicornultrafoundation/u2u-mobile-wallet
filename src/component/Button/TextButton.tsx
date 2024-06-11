import React, { useMemo } from 'react';
import Text from '../Text';
import { color as colorConfig } from '../../theme/color';
import { TouchableOpacity } from 'react-native';
import { BaseButtonProps } from './type';

const TextButton = ({color, fullWidth, children, style, textStyle, ...rest}: BaseButtonProps) => {
  const textColor = useMemo(() => {
    switch (color) {
      case 'primary':
        return colorConfig.primary[500]
      case 'secondary':
        return colorConfig.secondary[500]
      case 'tertiary':
        return colorConfig.neutral[500]
      case 'error':
        return colorConfig.error[300]
      default:
        return colorConfig.primary[500]
    }
  }, [color])

  return (
    <TouchableOpacity
      {...rest}
      style={[
        {
          flexDirection: 'row',
          justifyContent: fullWidth ? 'space-between' : 'center'
        },
        style
      ]}
    >
      <Text style={[
        {color: textColor},
        textStyle
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
};

export default TextButton;
