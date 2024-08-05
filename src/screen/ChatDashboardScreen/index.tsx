import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import { useGlobalStore } from "../../state/global";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { usePreference } from "../../hook/usePreference";
import { styles } from "./styles";
import Icon from "../../component/Icon";

export default function ChatDashboardScreen() {
  const {t} = useTranslation()
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headerText, {color: preferenceTheme.text.title}]}>{t('chat')}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ChatSetting')}>
          <Icon name="setting" width={24} height={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}