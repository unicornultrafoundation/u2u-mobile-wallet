import { Image, Modal, View } from "react-native";
import Text from "../../component/Text";
import { usePreference } from "../../hook/usePreference";
import { useTranslation } from "react-i18next";
import { typography } from "../../theme/typography";
import ILLUS from "../../asset/images/safety_illus.png"
import { useState } from "react";
import CheckBox from "../../component/Checkbox";

export default function WarningModal({modalVisible, onClose}: {
  modalVisible: boolean;
  onClose: () => void
}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()

  const [acceptTerm, setAcceptTerm] = useState(false)

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
          <Text style={[typography.title2.bold, {color: preferenceTheme.text.title}]}>
            {t('safetyWarning')}
          </Text>
          <Image
            source={ILLUS}
            style={{
              width: 80,
              height: 80,
              marginVertical: 8
            }}
          />
          <Text style={[typography.footnote.medium, {color: preferenceTheme.text.primary, marginVertical: 32}]}>
            {t('safetyDescription')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <CheckBox checked={false} onToggle={() => {}} />
          </View>
        </View>
      </View>
    </Modal>
  )
}