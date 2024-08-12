import { View } from "react-native";
import Modal from "../../component/Modal";
import { usePreference } from "../../hook/usePreference";

export default function AddContactModal({ onRequestClose, visible }: {
  visible: boolean;
  onRequestClose: () => void;
}) {
  const {preferenceTheme} = usePreference()
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
        
      </View>
    </Modal>
  )
}