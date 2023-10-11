import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import Button from '../../component/Button';
import TextInput from '../../component/TextInput';
import { isAddress } from 'ethers';
import { useTransactionStore } from '../../state/transaction';

const AddressStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const {t} = useTranslation<string>()
  const { receiveAddress, setReceiveAddress } = useTransactionStore()

  const [address, setAddress] = useState(receiveAddress)
  const [errorAddress, setErrorAddress] = useState('')

  const handleConfirm = () => {
    setErrorAddress('')
    if (!isAddress(address)) {
      setErrorAddress('Invalid address')
      return
    }
    setReceiveAddress(address)
    onNextStep()
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{t('recipientAddress')}</Text>
        </View>
        <View />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 8}}>
        <Text style={[theme.typography.caption2.medium, {color: preferenceTheme.text.secondary}]}>
          You are about to send to the U2U network.
        </Text>
        <Text style={[theme.typography.caption2.medium, {color: preferenceTheme.text.secondary}]}>
          Make sure you enter the correct address.
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 36}}>
        <TextInput
          placeholder="Enter wallet address"
          value={address}
          onChangeText={(val) => setAddress(val)}
          error={errorAddress}
        />
        <Button
          style={{borderRadius: 60}}
          onPress={handleConfirm}
        >
          Confirm
        </Button>
      </View>
    </View>
  )
}

export default AddressStep;