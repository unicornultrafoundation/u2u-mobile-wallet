import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { color as themeColor } from '../../theme/color';
import styles from './styles'

interface BadgeProps extends ViewProps {
  color?: string
  label?: string
  disabled?: boolean
}

const Badge = ({children, style, color, disabled}: BadgeProps) => {

  const textColor = useMemo(() => {
    if (!disabled) return themeColor.neutral[0]
    switch (color) {
      case 'success':
        return themeColor.positive[600]
      case 'info':
        return themeColor.informative[600]
      default:
        return ''
    }
  }, [color, disabled])

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
};

export default Badge;