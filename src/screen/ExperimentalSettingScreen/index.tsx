import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useGlobalStore } from "../../state/global";
import { useCallback } from "react";
import Icon from "../../component/Icon";
import Text from "../../component/Text"
import { styles } from "./styles";
import { typography } from "../../theme/typography";
import { useTranslation } from "react-i18next";
import { useLocalStore } from "../../state/local";
import theme from "../../theme";
import Toggle from "../../component/Toggle";

export default function ExperimentalSettingScreen() {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()
  const navigation = useNavigation()
  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: preferenceTheme.background.background}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={typography.title3.bold}
          >
            {t('experimentalFeatures')}
          </Text>
        </View>
        <View />
      </View>
      {/* <View>
        <View style={styles.settingItem}>
          <View style={styles.settingItemTextContainer}>
            <Text style={theme.typography.body.medium}>
              {t('u2uConnect')}
            </Text>
            <Text
              style={[
                theme.typography.caption1.medium,
                {color: preferenceTheme.text.secondary}
              ]}
            >
              {t('u2uConnectDesc')}
            </Text>
          </View>
          <View>
            <Toggle
              isOn={enableU2UConnect}
              onToggle={() => {
                setEnableU2UConnect(!enableU2UConnect)
              }}
            />
          </View>
        </View>
      </View> */}
    </SafeAreaView>
  )
}