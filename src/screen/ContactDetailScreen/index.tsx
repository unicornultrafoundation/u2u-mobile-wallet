import { SafeAreaView, TouchableOpacity, View, TextInput } from "react-native";
import { usePreference } from "@/hook/usePreference";
import { styles } from "./styles";
import Icon from "@/component/Icon";
import Text from "@/component/Text";
import Clipboard from "@react-native-clipboard/clipboard";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useGlobalStore } from "@/state/global";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import theme from "@/theme";
import Separator from "@/component/Separator";
import { shortenAddress } from "@/util/string";
import Toast from "react-native-toast-message";
import BlockModal from "./BlockModal";
import { useWallet } from "@/hook/useWallet";
import { useUserProfile } from "@/hook/chat/useUserProfile";
import UpdateNameModal from "./UpdateNameModal";
import CustomTextInput from "@/component/TextInput";
import { useUpdateProfile } from "@/hook/chat/useUpdateProfile";

export default function ContactDetailScreen() {
  const {wallet} = useWallet()
  const {t} = useTranslation()
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const address = route.params?.address || ""
  const isMe = address.toLowerCase() === wallet.address.toLowerCase()

  const {data: contactItem, refetch} = useUserProfile(address.toLowerCase())
  const {mutateAsync: updateProfile} = useUpdateProfile()

  const [showBlockModal, setShowBlockModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const [aboutMe, setAboutMe] = useState('')
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!contactItem) return
    setAboutMe(contactItem.about_me || '')
  }, [contactItem])

  const handleCopy = (value: string) => {
    Clipboard.setString(value);
    Toast.show({
      type: "simpleNoti",
      text1: t('msgCopied'),
      props: {
        width: "45%"
      }
    });
  };

  if (!contactItem) return null

  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', alignItems: 'center', justifyContent: "center", gap: 12}}>
        <View style={{width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.color.primary[500]}}>
          <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
            {contactItem.name ? contactItem.name[0].toUpperCase() : 'U'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <Text type="body-medium" color="title">
            {contactItem.name}
          </Text>
          {isMe && (
            <TouchableOpacity
              onPress={() => setShowUpdateModal(true)}
            >
              <Icon
                name="edit"
                width={24}
                height={24}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{paddingHorizontal: 16, width: '100%'}}>
          <Separator style={{ width: '100%' }}/>
          <View style={{paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text type="headline-medium" color="primary">
              {shortenAddress(contactItem.id, 12, 12)}
            </Text>
            <TouchableOpacity onPress={() => handleCopy(contactItem.id)}>
              <Icon name="copy" width={24} height={24}/>
            </TouchableOpacity>
          </View>
          <Separator style={{ width: '100%' }}/>
        </View>
        <View style={{paddingHorizontal: 16, width: '100%'}}>
          <View style={{width: '100%', alignItems: 'flex-start', gap: 6}}>
            <Text
              type="label2-medium"
              color="secondary"
            >
              {t('description')}
            </Text>
            <CustomTextInput
              ref={inputRef}
              multiline
              numberOfLines={4}
              value={aboutMe}
              onChangeText={(newText) => {
                if (!isMe) return
                setAboutMe(newText)
              }}
              placeholder={t('description')}
              containerStyle={{width: '100%'}}
              style={{height: 120}}
              editable={isMe}
            />
          </View>
          {
            contactItem.about_me !== aboutMe && isMe && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: 6,
                  paddingTop: 4
                }}
              >
                <TouchableOpacity
                  onPress={async () => {
                    inputRef && inputRef.current && inputRef.current.blur()
                    await updateProfile({
                      about_me: aboutMe
                    })
                    await refetch()
                  }}
                  style={{ alignItems: 'center' }}
                >
                  <Text type="label-medium" style={{ color: theme.color.primary[500] }}>
                    {t('update')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => {
                    setAboutMe(contactItem.about_me || '')
                  }}
                >
                  <Text type="label-medium" color="disabled">
                    {t('cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            style={[styles.actionRow, {borderColor: preferenceTheme.divider}]}
            onPress={() => {
              navigation.navigate('ChatDetail', {userAddresses: [contactItem.address, wallet.address]})
            }}
          >
            <Icon name="chat" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
            <Text type="body-medium" color="title">
              {t('chat')}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.actionRow, {borderColor: preferenceTheme.divider}]}>
            <Icon name="archived" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
            <Text type="body-medium" color="title">
              {t('archivedConversations')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionRow, {borderColor: preferenceTheme.divider}]}
            onPress={() => setShowBlockModal(true)}
          >
            <Icon name="block" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
            <Text type="body-medium" color="title">
              {t('addToBlockList')}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <BlockModal
        visible={showBlockModal}
        onRequestClose={() => setShowBlockModal(false)}
        addressToBlock={contactItem.id}
      />
      <UpdateNameModal
        visible={showUpdateModal}
        onRequestClose={() => setShowUpdateModal(false)}
      />
    </SafeAreaView>
  )
}