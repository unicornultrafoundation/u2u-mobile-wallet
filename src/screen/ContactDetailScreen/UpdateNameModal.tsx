import { TouchableOpacity, View } from "react-native";
import Modal from "../../component/Modal";

import { usePreference } from "../../hook/usePreference";
import Separator from "../../component/Separator";
import TextInput from "../../component/TextInput";
import Text from "../../component/Text";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import theme from "@/theme";
import { useWallet } from "@/hook/useWallet";
import { useUserProfile } from "@/hook/chat/useUserProfile";
import { useUpdateProfile } from "@/hook/chat/useUpdateProfile";

export default function UpdateNameModal({visible, onRequestClose}: {
  visible: boolean;
  onRequestClose: () => void;
}) {
  const { t } = useTranslation()
  const { preferenceTheme } = usePreference()
  const { wallet } = useWallet()

  const {data} = useUserProfile(wallet.address.toLowerCase())
  const {mutateAsync: updateProfile} = useUpdateProfile()

  const [name, setName] = useState('')

  useEffect(() => {
    if (!data) return
    setName(data.name || '')
  }, [data])

  const handleUpdate = async () => {
    await updateProfile({
      name
    })
    onRequestClose()
  }

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <View
        style={{
          width: 320,
          padding: 24,
          alignItems: 'center',
          backgroundColor: preferenceTheme.background.background,
          borderRadius: 16,
          shadowColor: 'rgb(0, 0, 0)',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10
        }}
      >
        <Text
          type="title2-bold"
          color="title"
        >
          {t('updateContactTitle')}
        </Text>
        {/* <Text type="caption1-regular" color="secondary" style={{marginVertical: 12, textAlign: 'center'}}>
          {t('blockConfirmation')}
        </Text> */}
        <TextInput
          value={name}
          onChangeText={setName}
          // placeholder={t('searchTokenPlaceholder')}
          containerStyle={{width: '100%', marginVertical: 12}}
        />
        <Separator style={{ width: '100%' }}/>
        <TouchableOpacity
          onPress={handleUpdate}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <Text type="label-medium" style={{ color: theme.color.primary[500] }}>
            {t('update')}
          </Text>
        </TouchableOpacity>

        <Separator style={{ width: '100%' }}/>
        <TouchableOpacity
          style={{ width: '100%', alignItems: 'center' }}
          onPress={onRequestClose}>
          <Text type="label-medium" color="disabled">
            {t('cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}