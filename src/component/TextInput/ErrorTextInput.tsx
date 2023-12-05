import { View, Text, StyleProp, ViewStyle } from "react-native";
import Icon from "../Icon";
import theme from "../../theme";

const ErrorTextInput = ({error, style} : {error: string, style?: StyleProp<ViewStyle>}) => {
  return (
    <View style={[style, {flexDirection: 'row', alignItems: 'center'}]}>
      <Icon name='error' width={18} height={18} />
      <Text style={[
        theme.typography.caption2.regular,
        {
          color: theme.accentColor.error.normal,
          paddingLeft: 4,
          flexShrink: 1,
        }
      ]}>
        {error}
      </Text>
    </View>
  )
}

export default ErrorTextInput;
