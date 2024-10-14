import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "../../state/global";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { isToday } from "date-fns";
import { useSubscribeMessage } from "../../hook/chat/useSubscribeMessage";
import { getUniqueByField } from "../../util/array";

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

  // const userAddresses: string[] = route.params?.userAddresses || []
  const conversationID: string = route.params?.conversationID || ''
  const {data} = useConversationDetail(conversationID)

  const [lastMessageID, setLastMessageID] = useState('')
  const {data: messages, isFetching} = useConversationMessages(conversationID, lastMessageID)
  const {messages: latestMessages} = useSubscribeMessage(conversationID)

  const otherContact = useMemo(() => {
    if (!data || !data.user) return ''
    return data.user.filter((i) => i !== wallet.address.toLowerCase())[0]
  }, [wallet, data])

  const optionStyles = {
    optionsContainer: [styles.optionsContainer, {backgroundColor: preferenceTheme.background.background}],
    optionWrapper: styles.optionWrapper,
    optionTouchable: styles.optionTouchable,
  }

  const [allMessagesHistory, setAllMessageHistory] = useState<Record<string, any>[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    setAllMessageHistory([...messages, ...allMessagesHistory])
  }, [messages])

  const allMessages = useMemo(() => {
    const value = getUniqueByField([...allMessagesHistory, ...latestMessages], 'id')
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    return value
  }, [allMessagesHistory, latestMessages])


  const handleLoadMore = () => {
    if (isFetching || !allMessages) return;
    if (allMessages[allMessages.length - 1].id.toLowerCase() !== lastMessageID) {
      setLastMessageID(allMessages[allMessages.length - 1].id)
    }
  }

  const handleSelectMenuAction = (value: number) => {
    
  }

  const handleSendMessage = async () => {
    try {
      if (!data) return
      await data.sendMessage({
        text: newMessage,
        attachments: [],
        // quoted_message_id: '',
      });

      setNewMessage('')
    } catch (error) {
      console.log('send message error', error)
    }
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
          data={allMessages}
          inverted
          renderItem={({item, index}) => {
            const fromMe = item.from === wallet.address.toLowerCase()
            return (
              <View style={[styles.messageRow, {alignItems: fromMe ? 'flex-end' : 'flex-start'}]} key={`messages=${index}`}>
                <Text
                  type="caption2-medium"
                  color="secondary"
                >
                  {isToday(item.createdAt) ? formatDate(item.createdAt, 'HH:mm') : formatDate(item.createdAt, 'dd/MM HH:mm')}
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
          <TouchableOpacity onPress={handleSendMessage}>
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