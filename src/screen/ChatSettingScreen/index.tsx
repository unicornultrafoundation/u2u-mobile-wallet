import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useGlobalStore } from "../../state/global";
import { usePreference } from "../../hook/usePreference";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import theme from "@/theme";
import { useWallet } from "@/hook/useWallet";

export default function ChatSettingScreen() {
  const {wallet} = useWallet()
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

  const renderTrigger = ({icon, title} : {
    icon: string,
    title: string,
  }) => {
    return (
      <View style={[styles.settingItem, {borderColor: preferenceTheme.divider}]}>
        <Icon name={icon} width={20} height={20} color="#8D8D8D" />
        <View style={styles.settingItemTextContainer}>
          <Text style={theme.typography.body.medium}>
            {t(title)}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headerText, {color: preferenceTheme.text.title}]}>{t('chatSetting')}</Text>
        </View>
        <View style={{width: 24}} />
      </View>
      <ScrollView
        bounces={false}
        style={{flex: 1, paddingTop: 24}}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('ContactDetail', {address: wallet.address.toLowerCase()})}
        >
          {
            renderTrigger({
              icon: 'u2u', 
              title: 'profile',
            })
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ContactList')}
        >
          {
            renderTrigger({
              icon: 'contact', 
              title: 'manageListContact',
            })
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ArchivedConversations')}
        >
          {
            renderTrigger({
              icon: 'archived', 
              title: 'archivedConversations',
            })
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('BlockedContact')}
        >
          {
            renderTrigger({
              icon: 'block', 
              title: 'blockedContacts',
            })
          }
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}