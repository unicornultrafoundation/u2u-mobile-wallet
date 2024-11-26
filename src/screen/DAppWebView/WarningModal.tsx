import { Image, Modal, View } from "react-native";
import Text from "../../component/Text";
import { usePreference } from "../../hook/usePreference";
import { useTranslation } from "react-i18next";
import { typography } from "../../theme/typography";
import ILLUS from "../../asset/images/safety_illus.png"
import { useState } from "react";
import CheckBox from "../../component/Checkbox";
import Separator from "../../component/Separator";
import TextButton from "../../component/Button/TextButton";
import { useNavigation } from "@react-navigation/native";
import { handleGoBack } from "../../util/navigation";
import { useDebounce } from "@/hook/useDebounce";
import { useGlobalStore } from "@/state/global";

export default function WarningModal({modalVisible, onClose, onAccept}: {
  modalVisible: boolean;
  onClose: () => void;
  onAccept: (acceptTerm: boolean) => void;
}) {
  const navigation = useNavigation<any>()
  const {t} = useTranslation()
  const {preferenceTheme, setShowSafetyWarning, showSafetyWarning} = usePreference()
  const {unlocked} = useGlobalStore()

  const visible = useDebounce(modalVisible, 100)

  const [acceptTerm, setAcceptTerm] = useState(false)
  const [showWarning, setShowWarning] = useState(true)

  const handleBack = () => {
    handleGoBack(navigation)
  }

  const handleAccept = () => {
    if (!acceptTerm) return
    setShowSafetyWarning(showWarning)
    onAccept(acceptTerm)
    onClose()
  }

  const shouldShow = () => {
    if (!unlocked) return false
    if (!showSafetyWarning) return false
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
          <View style={{flexDirection: 'row', width: '100%', gap: 16, marginBottom: 16}}>
            <CheckBox checked={acceptTerm} onToggle={() => setAcceptTerm(!acceptTerm)} />
            <View style={{flexShrink: 1}}>
              <Text style={[typography.body2.medium, {color: preferenceTheme.text.primary}]}>
                {t('acceptResponsibility')}
              </Text>
              <Text style={[typography.caption1.regular, {flexWrap: 'wrap', flexShrink: 1, color: preferenceTheme.text.secondary}]}>
                {t('acceptResponsibilityDetail')}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', width: '100%', gap: 16, marginBottom: 16}}>
            <CheckBox checked={!showWarning} onToggle={() => setShowWarning(!showWarning)} />
            <View style={{flexShrink: 1}}>
              <Text style={[typography.body2.medium, {color: preferenceTheme.text.primary}]}>
                {t('doNotShowMessage')}
              </Text>
            </View>
          </View>

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