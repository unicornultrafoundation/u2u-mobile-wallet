import { TouchableOpacity, View } from "react-native";
import Modal from "../../component/Modal";
import { usePreference } from "../../hook/usePreference";
import Text from '../../component/Text';
import { useTranslation } from "react-i18next";
import Separator from "../../component/Separator";
import theme from "../../theme";
import { useChatBlockedAddress } from "../../hook/useBlockedContact";

export default function UnblockModal({ onRequestClose, visible, addressToUnblock }: {
  visible: boolean;
  onRequestClose: () => void;
  addressToUnblock: string;
}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()
  const {unblockAddress} = useChatBlockedAddress()

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <View
        style={{
          width: 280,
          padding: 24,
          alignItems: 'center',
          backgroundColor: preferenceTheme.background.surface,
          borderRadius: 16,
          shadowColor: 'rgba(0, 0, 0, 0.50)',
          shadowOffset: {
            width: 5,
            height: 4,
          },
          shadowOpacity: 13,
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
          onPress={async () => {
            await unblockAddress(addressToUnblock)
            onRequestClose()
          }}
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