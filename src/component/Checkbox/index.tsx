import { useMemo } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import styles from "./styles";

export default function CheckBox({checked, onToggle, style}: {
  checked: boolean;
  onToggle: () => void;
  style?: StyleProp<ViewStyle>
}) {
  const componentStyle = useMemo(() => {
    if (checked) {
      return {
        backgroundColor: '#4C4AEF',
        borderColor: 'transparent'
      }
    }

    return {
      backgroundColor: 'transparent',
      borderColor: '#B4B4B4'
    }
  }, [checked])

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.container, componentStyle, style]}
    >

    </TouchableOpacity>
  )
}