import { Image, Modal, View } from "react-native";
import Text from "../../component/Text";
import { usePreference } from "../../hook/usePreference";
import { useTranslation } from "react-i18next";
import { typography } from "../../theme/typography";
import ILLUS from "../../asset/images/safety_illus.png"
import { useState } from "react";
import Separator from "../../component/Separator";
import TextButton from "../../component/Button/TextButton";
import { useNavigation } from "@react-navigation/native";
import { handleGoBack } from "../../util/navigation";

export default function SetProfileModal({modalVisible, onClose, onAccept}: {
  modalVisible: boolean;
  onClose: () => void;
  onAccept: () => void;
}) {
  const navigation = useNavigation<any>()
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()

  const [visible, setVisible] = useState(modalVisible)

  const handleBack = () => {
    handleGoBack(navigation)
  }

  const handleAccept = () => {
    onAccept()
    setVisible(false)
  }

  const shouldShow = () => {
    return visible
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={shouldShow()}
      onRequestClose={onClose}
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
            {t('setChatProfile')}
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
            {t('setChatProfileDescription')}
          </Text>

          <Separator style={{width: '100%'}} />
          <TextButton onPress={handleAccept}>
            {t('continue')}
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