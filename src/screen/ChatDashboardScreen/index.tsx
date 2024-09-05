import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View, Image, FlatList, ActivityIndicator } from "react-native";
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
import { Conversation, useAllConversation } from "../../hook/chat/useAllConversation";
import NewConversationModal from "./NewConversationModal";
import Jazzicon from "react-native-jazzicon";
import { useWallet } from "../../hook/useWallet";
import { shortenAddress, truncate } from "../../util/string";
import theme from "../../theme";
import { isToday } from "date-fns";
import { formatDate } from "../../util/date";
import SwipeableFlatList from 'react-native-swipeable-list';
import ConfirmationModal from "../../component/ConfirmationModal";

export default function ChatDashboardScreen() {
  const {t} = useTranslation()
  const {wallet} = useWallet()
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const {data: conversationPaged, refetch} = useAllConversation()
  const allConversations = useMemo(() => {
    if (!conversationPaged) return []
    return conversationPaged.pages.flat()
  }, [conversationPaged])

  const [search, setSearch] = useState('')
  const [showCreateConversationModal, setShowConversationModal] = useState(false)
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
  const [conversationToDelete, setConversationToDelete] = useState<Conversation>()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      if (!conversationToDelete || deleting) return
      setDeleting(true)
      setShowConfirmDeleteModal(false)
      await conversationToDelete?.handleDelete()
      
      await refetch()
      setDeleting(false)
    } catch (error) {
      console.log('delete error', error)
      setShowConfirmDeleteModal(false)
    }
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
              onPress={() => setShowConversationModal(true)}
            >
              {t('startNewConversation')}
            </Button>
            <NewConversationModal
              visible={showCreateConversationModal}
              onRequestClose={() => setShowConversationModal(false)}
            />
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
            <SwipeableFlatList
              data={allConversations}
              renderItem={({item}: {item: Conversation, index: number}) => {
                const otherAddress = item.user.filter((i) => i !== wallet.address)[0]
                return (
                  <TouchableOpacity
                    style={[styles.chatRowItem, {borderColor: preferenceTheme.outline, backgroundColor: preferenceTheme.background.background}]}
                    // key={`conversation-${index}`}
                  >
                    <Jazzicon size={42} address={otherAddress}/>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                      <Text
                        type="body-medium"
                        color="title"
                      >
                        {shortenAddress(otherAddress, 12, 12)}
                      </Text>
                      <Text
                        type="body2-regular"
                        color="secondary"
                      >
                        {truncate(item.lastMessageContent, 40)}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'space-between'}}>
                      <Text
                        type="caption1-medium"
                        color="secondary"
                      >
                        {formatDate(item.updatedAt, isToday(item.updatedAt) ? 'HH:mm' : 'dd/MM/yyyy')}
                      </Text>
                      {item.newMessage > 0 ? (
                        <View style={[styles.unreadContainer, {backgroundColor: theme.color.primary[500]}]}>
                          <Text
                            type="caption1-medium"
                            color="title"
                          >
                            {item.newMessage}
                          </Text>
                        </View>
                      ) : (
                        <View style={{height: 22}} />
                      )}
                    </View>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={(item: Conversation) => item.id}
              renderQuickActions={({index, item}: {index: number; item: Conversation}) => {
                return (
                  <View style={styles.qaContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setConversationToDelete(item)
                        setShowConfirmDeleteModal(true)
                      }}
                    >
                      {deleting && conversationToDelete?.id === item.id ? (
                        <ActivityIndicator color={preferenceTheme.text.title} />
                      ) : (
                        <Icon width={24} height={24} name="trash" color={preferenceTheme.text.title} />
                      )}
                    </TouchableOpacity>
                  </View>
                )
              }}
              maxSwipeDistance={56}
              bounceFirstRowOnMount={false}
              contentContainerStyle={{flexGrow: 1}}
            />
            <ConfirmationModal
              visible={showConfirmDeleteModal}
              onCancel={() => setShowConfirmDeleteModal(false)}
              onConfirm={handleDelete}
              message={t('deleteConversationConfirmMessage')}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}