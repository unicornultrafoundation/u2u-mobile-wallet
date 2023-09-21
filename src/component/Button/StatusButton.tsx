import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native';
import { color as colorConfig } from '../../theme/color';
import { BaseButtonProps } from './type';
import Text from '../Text';
import styles from './styles';

const StatusButton = ({color = 'primary', fullWidth, children, style, ...rest}: BaseButtonProps) => {
  const [bgColor, textColor] = useMemo(() => {
    switch (color) {
      case 'info':
        return [colorConfig.informative[300], colorConfig.informative[50]]
      case 'info-subtle':
        return [colorConfig.informative[100], colorConfig.informative[300]]
      case 'success':
        return [colorConfig.positive[300], colorConfig.positive[50]]
      case 'success-subtle':
        return [colorConfig.positive[100], colorConfig.positive[300]]
      case 'warning':
        return [colorConfig.notice[300], colorConfig.notice[50]]
      case 'warning-subtle':
        return [colorConfig.notice[100], colorConfig.notice[300]]
      default:
        return [colorConfig.informative[300], colorConfig.informative[50]]
    }
  }, [color])

  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.buttonStyle,
        {
          backgroundColor: bgColor,
          flexDirection: 'row',
        },
        style
      ]}
    >
      <Text style={{color: textColor}}>{children}</Text>
    </TouchableOpacity>
  )
};

export default StatusButton;
