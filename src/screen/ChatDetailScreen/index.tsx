import { FlatList, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
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
import { useConversationDetail } from "../../hook/chat/useConversationDetail";
import TextInput from "../../component/TextInput";
import theme from "../../theme";
import { useWallet } from "../../hook/useWallet";
import { shortenAddress } from "../../util/string";
import Separator from "../../component/Separator";
import { useUserChatProfile } from "@/hook/chat/useUserChatProfile";
import MessageList from "./MessageList";
import { useTransactionStore } from "@/state/transaction";
import TxInput from "./TxInput";

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

  const conversationID: string = route.params?.conversationID || ''
  const {data} = useConversationDetail(conversationID)

  const {setTokenMeta, setReceiveAddress} = useTransactionStore()

  const otherContact = useMemo(() => {
    if (!data || !data.user) return ''
    return data.user.filter((i) => i !== wallet.address.toLowerCase())[0]
  }, [wallet, data])

  const {data: otherProfile} = useUserChatProfile(otherContact.toLowerCase())

  const optionStyles = {
    optionsContainer: [styles.optionsContainer, {backgroundColor: preferenceTheme.background.background}],
    optionWrapper: styles.optionWrapper,
    optionTouchable: styles.optionTouchable,
  }

  const [newMessage, setNewMessage] = useState('')
  const [showMessageMenu, setShowMessageMenu] = useState(false)
  const [inputMode, setInputMode] = useState<'text' | 'tx' | 'nft'>('text')

  const handleSelectMenuAction = async (value: string) => {
    if (!data) return
    switch (value) {
      case 'block':
        try {
          await data.handleBlock()
          navigation.goBack()
          return
        } catch (error) {
          console.log(error) 
          return;
        }
      case 'archive':
        try {
          await data.handleArchive()
          navigation.goBack()
          return
        } catch (error) {
          console.log(error) 
          return;
        }
      case 'delete':
        try {
          await data.handleDelete()
          navigation.goBack()
          return
        } catch (error) {
          console.log(error) 
          return;
        }
      default:
        return;
    }
  }

  const handleSendMessage = async () => {
    if (!data) return
    try {
      await data.sendMessage({
        text: newMessage,
        attachments: [],
        // quoted_message_id: '',
      });

    } catch (error) {
      console.log('send message error', error)
      console.log((error as Error).message)
    }

    setNewMessage('')
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
            {otherProfile ? (
              `${otherProfile.name}`
            ) : 
              shortenAddress(otherContact, 10, 10)
            }
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
            <MenuOption value="pin">
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
                  {t('archive')}
                </Text>
                <Icon name="archived" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
              </View>
            </MenuOption>
            <MenuOption value="delete">
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text
                  color="title"
                  type="label2-medium"
                >
                  {t('deleteChat')}
                </Text>
                <Icon name="trash" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
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
        <View style={{flex: 1, position: 'relative'}}>
          <MessageList />
          {
            showMessageMenu && (
              <Pressable
                style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}
                onPress={() => {
                  setShowMessageMenu(false)
                  setInputMode('text')
                }}
              />
            )
          }
        </View>
        {showMessageMenu && inputMode === 'text' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 48,
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: preferenceTheme.background.surface
            }}
          >
            <TouchableOpacity
              style={{alignItems: 'center', gap: 6}}
              onPress={() => {
                if (!otherProfile) return
                setTokenMeta({
                  name: 'Ultra Unicorn',
                  symbol: 'U2U',
                  decimals: 18,
                  address: '0x',
                  logo: 'https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/public_assets/token_logos/u2u.svg',
                })
                setInputMode('tx')
                setReceiveAddress(otherProfile.id)
              }}
            >
              <View
                style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: preferenceTheme.background.surfaceHover}}
              >
                <Icon
                  name="arrow-up"
                  width={24}
                  height={24}
                  color={preferenceTheme.text.title}
                />
              </View>
              <Text>Quick TX</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', gap: 6}} onPress={() => setInputMode('nft')}>
              <View
                style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: preferenceTheme.background.surfaceHover}}
              >
                <Icon
                  name="image"
                  width={24}
                  height={24}
                  color={preferenceTheme.text.title}
                />
              </View>
              <Text>NFT</Text>
            </TouchableOpacity>
          </View>
        )}
        {inputMode === 'text' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8, paddingHorizontal: 16, paddingVertical: 8,
              backgroundColor: preferenceTheme.background.surface,
            }}>
            <TouchableOpacity
              onPress={() => setShowMessageMenu(!showMessageMenu)}
            >
              <Icon
                name={showMessageMenu ? "minus-circle" : "plus-circle"}
                width={24}
                height={24}
                color={preferenceTheme.background.surfaceDisable}
              />
            </TouchableOpacity>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder={t('newMessagePlaceholder')}
              containerStyle={{flex: 1}}
              placeholderTextColor={preferenceTheme.text.secondary}
              textWrapperStyle={{
                borderColor: theme.accentColor.primary.normal
              }}
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
        )}
        {inputMode === 'tx' && (
          <TxInput
            onComplete={() => {
              setInputMode('text')
              setShowMessageMenu(false)
            }}
            conversationID={conversationID}
          />
        )}
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}