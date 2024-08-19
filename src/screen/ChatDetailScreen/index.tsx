import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "../../state/global";
import { useCallback, useMemo, useState } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useConversationDetail } from "../../hook/useConversationDetail";
import { useConversationMessages } from "../../hook/useConversationMessages";
import TextInput from "../../component/TextInput";
import theme from "../../theme";
import { useWallet } from "../../hook/useWallet";
import { formatDate } from "../../util/date";
import { shortenAddress } from "../../util/string";
import Separator from "../../component/Separator";

export default function ChatDetailScreen() {
  const { t } = useTranslation()
  const {wallet} = useWallet()
  const navigation = useNavigation()
  const { preferenceTheme } = usePreference()

  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const userAddresses: string[] = route.params?.userAddresses || []
  // const {data} = useConversationDetail(userAddresses)
  const {data: messagesPaged, fetchNextPage, isFetching} = useConversationMessages(userAddresses)

  const messages = useMemo(() => {
    if (!messagesPaged) return []
    return messagesPaged.pages.flat()
  }, [messagesPaged])

  const otherContact = useMemo(() => {
    const filtered = userAddresses.filter((item) => item !== wallet.address)
    return filtered[0]
  }, [userAddresses, wallet])

  const optionStyles = {
    optionsContainer: [styles.optionsContainer, {backgroundColor: preferenceTheme.background.background}],
    optionWrapper: styles.optionWrapper,
    optionTouchable: styles.optionTouchable,
  }

  const [newMessage, setNewMessage] = useState('')

  const handleLoadMore = () => {
    if (isFetching) return;
    fetchNextPage()
  }

  const handleSelectMenuAction = (value: number) => {
    
  }

  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={[styles.headerContainer, {borderColor: preferenceTheme.outline, gap: 8}]}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', flex: 1}}>
          <Text
            type="subheadline-medium"
            color="primary"
          >
            {shortenAddress(otherContact, 10, 10)}
          </Text>
        </View>
        <Menu onSelect={handleSelectMenuAction}>
          <MenuTrigger>
            <Icon
              name="vertical-dot"
              width={24}
              height={24}
              color={preferenceTheme.text.surfaceDisable}
            />
          </MenuTrigger>
          <MenuOptions customStyles={optionStyles}>
            <MenuOption value="ar">
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text
                  color="title"
                  type="label2-medium"
                >
                  {t('pinConversation')}
                </Text>
                <Icon name="pin" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
              </View>
            </MenuOption>
            <MenuOption value="archive">
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text
                  color="title"
                  type="label2-medium"
                >
                  {t('archivedConversations')}
                </Text>
                <Icon name="archived" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
              </View>
            </MenuOption>
            <Separator />
            <MenuOption value="block">
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text
                  color="title"
                  type="label2-medium"
                >
                  {t('addToBlockList')}
                </Text>
                <Icon name="block" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={24}
      >
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={messages}
          inverted
          renderItem={({item, index}) => {
            const fromMe = item.from === wallet.address
            return (
              <View style={[styles.messageRow, {alignItems: fromMe ? 'flex-end' : 'flex-start'}]} key={`messages=${index}`}>
                <Text
                  type="caption2-medium"
                  color="secondary"
                >
                  {formatDate(item.createdAt, 'HH:mm')}
                </Text>
                <View style={[styles.messageContainer, {backgroundColor: fromMe ? theme.color.primary[600] : preferenceTheme.background.surface}]}>
                  <Text>{item.content}</Text>
                </View>
              </View>
            )
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={.3}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16}}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder={t('newMessagePlaceholder')}
            containerStyle={{flex: 1}}
          />
          <TouchableOpacity>
            <Icon
              name="send-chat"
              width={24}
              height={24}
              color={theme.color.primary[500]}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}