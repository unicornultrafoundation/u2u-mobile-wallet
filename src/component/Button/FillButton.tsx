import React, { useMemo } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import {
  TouchableOpacity as ModalTouchableOpacity,
} from '@gorhom/bottom-sheet';
import styles from './styles'
import { color as colorConfig } from '../../theme/color';
import Text from '../Text';
import { BaseButtonProps } from './type';


const FillButton = ({color = 'primary', insideModal = false, disabled, fullWidth, children, style, textStyle, loading, ...rest}: BaseButtonProps) => {
  const [bgColor, textColor] = useMemo(() => {
    if (disabled) {
      return [colorConfig.primary[600], colorConfig.primary[300]]
    }
    switch (color) {
      case 'primary':
        return [colorConfig.primary[500], '#EDEDFD']
      case 'primary-subtle':
        return [colorConfig.primary[200], colorConfig.primary[600]]
      case 'secondary':
        return [colorConfig.secondary[500], colorConfig.neutral[0]]
      case 'secondary-subtle':
        return [colorConfig.secondary[100], colorConfig.secondary[500]]
      case 'tertiary':
        return [colorConfig.neutral[25], colorConfig.neutral[800]]
      case 'error':
        return [colorConfig.error[300], colorConfig.error[50]]
      case 'error-subtle':
        return [colorConfig.error[100], colorConfig.error[300]]
      default:
        return [colorConfig.primary[500], '#EDEDFD']
    }
  }, [color, disabled])

  const Component = insideModal ? ModalTouchableOpacity : TouchableOpacity

  return (
    <Component
      {...rest}
      style={[
        styles.buttonStyle,
        {
          backgroundColor: bgColor,
          flexDirection: 'row',
        },
        fullWidth ? {width: '100%'} : {},
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[
          {
            color: textColor
          },
          styles.textSyle,
          textStyle
        ]}>
          {children}
        </Text>
      )}
    </Component>
  )
}

export default FillButton;