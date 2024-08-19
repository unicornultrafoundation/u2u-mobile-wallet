import { TouchableOpacity, View } from "react-native";
import Modal from "../../component/Modal";
import Text from "../../component/Text";
import { usePreference } from "../../hook/usePreference";
import { useTranslation } from "react-i18next";
import TextInput from "../../component/TextInput";
import { useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { styles } from "./styles";
import Separator from "../../component/Separator";
import theme from "../../theme";
import { isAddress } from "ethers";
import { useContact } from "../../hook/useContact";

export default function AddContactModal({ onRequestClose, visible }: {
  visible: boolean;
  onRequestClose: () => void;
}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()

  const [name, setName] = useState('')
  const [walletAddress, setWaleltAddress] = useState('')
  const [errWalletAddress, setErrWalletAddress] = useState('')

  const {addContact} = useContact()

  const handleAdd = () => {
    setErrWalletAddress('')
    if (!isAddress(walletAddress)) {
      setErrWalletAddress(t('invalidAddress'))
      return
    }

    addContact({
      name,
      address: walletAddress,
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
          style={{marginBottom: 36}}
        >
          {t('addContactTitle')}
        </Text>
        <View style={{width: '100%', alignItems: 'flex-start', gap: 6, marginBottom: 18}}>
          <Text
            type="label2-medium"
            color="secondary"
          >
            {t('contactName')}
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t('contactName')}
            containerStyle={{width: '100%'}}
            error={errWalletAddress}
          />
        </View>
        <View style={{width: '100%', alignItems: 'flex-start', gap: 6}}>
          <Text
            type="label2-medium"
            color="secondary"
          >
            {t('walletAddress')}
          </Text>
          <TextInput
            value={walletAddress}
            onChangeText={setWaleltAddress}
            placeholder={t('walletAddress')}
            containerStyle={{width: '100%'}}
          />
        </View>
        <Separator style={{ width: '100%' }}/>
        <TouchableOpacity
          onPress={handleAdd}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <Text type="label-medium" style={{ color: theme.color.primary[500] }}>
            {t('addContact')}
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