import { Modal, View } from "react-native";
import Text from "../../component/Text";
import { usePreference } from "../../hook/usePreference";
import { useTranslation } from "react-i18next";
import { typography } from "../../theme/typography";
import Separator from "../../component/Separator";
import TextButton from "../../component/Button/TextButton";

export default function WarningModal({modalVisible, onClose, onConfirm}: {
  modalVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()

  const handleBack = () => {
    onClose()
  }

  const handleAccept = () => {
    onConfirm()
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(24, 24, 24, 0.7)'
      }}>
        <View
          style={{
            backgroundColor: '#000000',
            opacity: 1,
            // backgroundColor: 'red',
            padding: 24,
            borderRadius: 16,
            width: '85%',
            alignItems: 'center'
          }}
        >
          <Text style={[typography.title2.bold, {color: preferenceTheme.text.title, textAlign: 'center', marginBottom: 24}]}>
            {t('askMarkAllRead')}
          </Text>

          <Separator style={{width: '100%'}} />
          <TextButton onPress={handleAccept}>
            {t('confirm')}
          </TextButton>
          <Separator style={{width: '100%'}} />
          <TextButton color="tertiary" onPress={handleBack}>
            {t('cancel')}
          </TextButton>
        </View>
      </View>
    </Modal>
  )
}