import { Modal, Text, View, TouchableOpacity } from "react-native";
import { usePreferenceStore } from "../../state/preferences";
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme } from "../../theme/color";
import theme from '../../theme';
import Separator from "../Separator";
import style from "./style";

const ConfirmationModal = ({visible, message, description, onConfirm, onCancel} : {
  visible: boolean, 
  message: string,
  description?: string,
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const { darkMode } = usePreferenceStore();
  const { t } = useTranslation();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={style.container}>
        <View
          style={[
            style.contentContainer,
            {
              backgroundColor: preferenceTheme.background.surface,
              shadowColor: preferenceTheme.shadowColor,
            }
          ]}>      
          <Text style={[
            theme.typography.label.medium, 
            {
              color: preferenceTheme.text.primary, 
              textAlign: 'center',
            }
          ]}>
            {message}
          </Text>
          {description && <Text style={[
            theme.typography.caption1.regular, 
            {
              color: preferenceTheme.text.secondary, 
              marginTop: 3, 
              textAlign: 'center'
            }
          ]}>
            {description}
          </Text>}
          <Separator style={{width: '100%', marginTop: 16}}/>
          <TouchableOpacity
            onPress={onConfirm}>
            <Text style={[theme.typography.label.medium, {color: theme.color.primary[500]}]}>
              {t('confirm')}
            </Text>
          </TouchableOpacity>
          <Separator style={{width: '100%'}}/>
          <TouchableOpacity
            onPress={onCancel}>
            <Text style={[theme.typography.label.medium, {color: preferenceTheme.text.secondary}]}>
              {t('cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmationModal;
