import { View, ViewStyle } from "react-native";
import styles from "./styles";
import { color } from "../../theme/color";

interface StepsProps {
  steps: number
  current: number
  style?: ViewStyle
  stepItemStyle?: ViewStyle
}
const Steps = ({steps, current, style, stepItemStyle}: StepsProps) => {
  return (
    <View style={[styles.container, style]}>
      {
        Array(steps).fill(1).map((_, index) => {
          return (
            <View
              style={[
                styles.stepItem,
                {
                  backgroundColor: current >= index ? color.neutral[0] : color.neutral[500]
                },
                stepItemStyle
              ]}
              key={`step-${index}`}
            />
          )
        })
      }
    </View>
  )
}

export default Steps;
