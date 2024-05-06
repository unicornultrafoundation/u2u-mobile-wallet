import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from '../../component/Text';
import { useGlobalStore } from "../../state/global";
import { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import theme from "../../theme";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import { useTranslation } from "react-i18next";

export default function SignExternalRequestScreen() {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const {t} = useTranslation()
  
  const navigation = useNavigation<any>()

  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();
  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );
  const signRequestID = route.params?.signRequestID || ""

  return (
    <SafeAreaView>
      <View style={[styles.screenHeader, {paddingTop: 16, paddingBottom: 16}]}>
        <Text
          style={[
            theme.typography.title3.bold,
            { flex: 1, textAlign: 'center', color: preferenceTheme.text.title }
          ]}>
          {t('signExternalRequest')}
        </Text>
      </View>
    </SafeAreaView>
  )
}