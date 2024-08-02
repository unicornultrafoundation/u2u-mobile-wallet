import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { useGlobalStore } from "../../state/global";
import { useCallback } from "react";
import Icon from "../../component/Icon";
import Text from '../../component/Text';
import { styles } from "./styles";

export default function SessionDetail() {
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
          <Text style={styles.headerText}>{t('sessionDetail')}</Text>
        </View>
        <View style={{width: 24}} />
      </View>
    </SafeAreaView>
  )
}