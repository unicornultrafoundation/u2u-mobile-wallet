import { TouchableOpacity, View } from "react-native";
import Modal from "../../component/Modal";
import { usePreference } from "../../hook/usePreference";
import Text from '../../component/Text';
import { useTranslation } from "react-i18next";
import Separator from "../../component/Separator";
import theme from "../../theme";
import { useChatBlockedAddress } from "../../hook/useBlockedContact";
import { useState } from "react";

export default function UnblockModal({ onRequestClose, visible, addressToUnblock }: {
  visible: boolean;
  onRequestClose: () => void;
  addressToUnblock: string;
}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()
  // const {unblockAddress} = useChatBlockedAddress()

  const [loading, setLoading] = useState(false)

  const handleUnblock = async () => {
    try {
      setLoading(true)
      // TODO: unblock by ermis SDK
      // await unblockAddress(addressToUnblock)
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
          width: 280,
          padding: 24,
          alignItems: 'center',
          backgroundColor: preferenceTheme.background.background,
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
          {t('unblockConfirmationTitle')}
        </Text>
        <Text type="caption1-regular" color="secondary" style={{marginVertical: 12, textAlign: 'center'}}>
          {t('unblockConfirmation')}
        </Text>  
        <Separator style={{ width: '100%' }}/>
        <TouchableOpacity
          onPress={handleUnblock}
          style={{ width: '100%', alignItems: 'center' }}>
          <Text type="label-medium" style={{ color: theme.color.primary[500] }}>
            {t('unblock')}
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