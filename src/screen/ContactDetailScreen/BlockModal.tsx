import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import Modal from "../../component/Modal";
import { usePreference } from "../../hook/usePreference";
import Text from '../../component/Text';
import { useTranslation } from "react-i18next";
import Separator from "../../component/Separator";
import theme from "../../theme";
import { useChatBlockedAddress } from "@/hook/useBlockedContact";
import TextInput from "../../component/TextInput";
import { useState } from "react";

export default function BlockModal({ onRequestClose, visible, addressToBlock }: {
  visible: boolean;
  onRequestClose: () => void;
  addressToBlock: string;
}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()
  // const {blockAddress} = useChatBlockedAddress()

  const [loading, setLoading] = useState(false)

  const handleBlock = async () => {
    try {
      setLoading(true)
      // TODO: block by ermis SDK
      // await blockAddress(addressToBlock)
      setLoading(false)
      onRequestClose()
    } catch (error) {
      console.log(error)
    }
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
          {t('blockConfirmationTitle')}
        </Text>
        <Text type="caption1-regular" color="secondary" style={{marginVertical: 12, textAlign: 'center'}}>
          {t('blockConfirmation')}
        </Text>  

        <Separator style={{ width: '100%' }}/>
        <TouchableOpacity
          onPress={handleBlock}
          style={{ width: '100%', alignItems: 'center' }}
          disabled={loading}
        >
          {loading ? <ActivityIndicator /> : (
            <Text type="label-medium" style={{ color: theme.color.primary[500] }}>
              {t('block')}
            </Text>
          )}
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