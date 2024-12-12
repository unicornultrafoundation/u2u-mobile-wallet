import { TouchableOpacity, View } from "react-native"
import { Conversation, useAllConversation } from "../../hook/chat/useAllConversation"
import Jazzicon from "react-native-jazzicon"
import { useWallet } from "../../hook/useWallet"
import { useMemo, useState } from "react"
import { styles } from "./styles"
import { usePreference } from "../../hook/usePreference"
import Button from "../../component/Button"
import Text from "../../component/Text"
import { shortenAddress, truncate } from "../../util/string"
import { formatDate } from "../../util/date"
import { isToday } from "date-fns"
import theme from "../../theme"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import { useUserChatProfile } from "@/hook/chat/useUserChatProfile"

export default function ConversationRow({item}: {
  item: Conversation
}) {
  const navigation = useNavigation<any>()
  const {t} = useTranslation()
  const {wallet} = useWallet()
  const {preferenceTheme} = usePreference()
  const otherAddress = useMemo(() => {
    return item.user.filter((i) => i !== wallet.address.toLowerCase())[0]
  }, [wallet, item])

  const {data: otherProfile} = useUserChatProfile(otherAddress.toLowerCase())

  const {refetch} = useAllConversation('pending')

  const [accepting, setAccepting] = useState(false)
  const [rejecting, setRejecting] = useState(false)

  const handleAccept = async () => {
    try {
      setAccepting(true)
      await item.handleAccept()
      await refetch()
      setAccepting(false)
    } catch (error) {
      console.log('accept error', error)
      setAccepting(false)
    }
  }

  const handleReject = async () => {
    try {
      setRejecting(true)
      await item.handleReject()
      await refetch()
      setRejecting(false)
    } catch (error) {
      console.log('accept error', error)
      setRejecting(false)
    }
  }
  
  return (
    <TouchableOpacity
      style={[styles.chatRowItem, {borderColor: preferenceTheme.outline, backgroundColor: preferenceTheme.background.background}]}
      onPress={() => {
        navigation.navigate('ChatDetail', {conversationID: item.id})
      }}
    >
      <Jazzicon size={42} address={otherAddress}/>
      <View style={{flex: 1, justifyContent: 'space-between', gap: item.role === 'pending' ? 12 : 0}}>
        <Text
          type="body-medium"
          color="title"
        >
          {otherProfile ? `${truncate(otherProfile.name || otherProfile.id, 12)}` : shortenAddress(otherAddress, 12, 12)}
        </Text>
        {item.role === 'pending' ? (
          <View style={{flexDirection: 'row', gap: 12, alignItems: 'flex-end'}}>
            <Button 
              color="primary"
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6
              }}
              disabled={accepting || rejecting}
              loading={accepting}
              onPress={handleAccept}
            >
              {t('accept')}
            </Button>
            <Button
              color="error"
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6
              }}
              disabled={accepting || rejecting}
              loading={rejecting}
              onPress={handleReject}
            >
              {t('reject')}
            </Button>
          </View>
        ) : (
          <Text
            type="body2-regular"
            color="secondary"
          >
            {truncate(item.lastMessageContent, 40)}
          </Text>
        )}
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
}