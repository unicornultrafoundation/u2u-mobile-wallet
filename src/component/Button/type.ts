import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";

export interface BaseButtonProps extends TouchableOpacityProps {
  type?: 'fill' | 'text' | 'status' | 'link'
  color?:
    'primary' | 'primary-subtle' | 'secondary' | 'secondary-subtle' | 'tertiary' | 'error' | 'error-subtle' |
    'info' | 'info-subtle' | 'success' | 'success-subtle' | 'warning' | 'warning-subtle'
  fullWidth?: boolean
  withIcon?: boolean
  textStyle?: StyleProp<TextStyle>
  loading?: boolean
  insideModal?: boolean
}