import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View, Image } from "react-native";
import { useGlobalStore } from "../../state/global";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePreference } from "../../hook/usePreference";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import EMPTY_ILLUS from '../../asset/images/empty_chat_illus.png'
import { typography } from "../../theme/typography";
import Button from "../../component/Button";
import TextInput from "../../component/TextInput";
import { useAllConversation } from "../../hook/chat/useAllConversation";

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

  const {data: conversationPaged} = useAllConversation()
  const allConversations = useMemo(() => {
    if (!conversationPaged) return []
    return conversationPaged.pages.flat()
  }, [conversationPaged])

  const [search, setSearch] = useState('')

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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {allConversations.length === 0 ? (
          <View style={{width: 243, gap: 14, alignItems: 'center'}}>
            <Image
              source={EMPTY_ILLUS}
              width={200}
            />
            <Text style={[typography.caption1.medium, {color: preferenceTheme.text.secondary, textAlign: 'center'}]}>
              {t('noConversationDescription')}
            </Text>
            <Button
              fullWidth
              style={{
                borderRadius: 60,
                marginTop: 10,
              }}
              textStyle={[typography.label.medium]}
              // onPress={handleClose}
            >
              {t('startNewConversation')}
            </Button>
          </View>
        ) : (
          <View style={{flex: 1, width: '100%'}}>
            <TextInput
              containerStyle={{height: 48, margin: 16}}
              placeholder={t('Search')}
              placeholderTextColor={'#363636'}
              onChangeText={text => {
                setSearch(text);
              }}
              value={search}
              preIcon={() => {
                return (
                  <Icon name="search" width={24} height={24} />
                );
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}