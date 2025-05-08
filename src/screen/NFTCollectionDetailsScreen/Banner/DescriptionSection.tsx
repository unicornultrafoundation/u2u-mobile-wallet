import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { styles } from '../styles';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import Text from '../../../component/Text';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useState } from 'react';
import theme from '../../../theme';

const DescriptionSection = ({description, style}: {
  description: string,
  style?: StyleProp<ViewStyle> | undefined
}) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [showFullDesc, setShowFullDesc] = useState(false);
  return (
    <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
      <View style={[style, styles.descriptionSection]}>
        <Text
          style={[
            theme.typography.caption1.regular,
            {
              flex: 1,
              color: preferenceTheme.text.secondary,
              textAlign: 'justify',
            }
          ]}
          ellipsizeMode="tail"
          numberOfLines={showFullDesc ? undefined : 1}
        >
          {description}
        </Text>
        <FontAwesome6Icon
          name={showFullDesc ? "chevron-up" : "chevron-down"}
          solid
          style={{
            color: preferenceTheme.text.secondary,
            fontSize: 12,
            paddingVertical: 2,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DescriptionSection;
