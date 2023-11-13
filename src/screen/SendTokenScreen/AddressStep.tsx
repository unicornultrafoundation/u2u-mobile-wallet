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
import Scanner from '../../component/QRCodeScanner';

const AddressStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const {t} = useTranslation<string>()
  const { receiveAddress, setReceiveAddress, setTokenMeta, setAmount } = useTransactionStore()

  const [address, setAddress] = useState(receiveAddress)
  const [errorAddress, setErrorAddress] = useState('')
  const [showScanner, setShowScanner] = useState(false)

  const handleConfirm = () => {
    setErrorAddress('')
    if (!isAddress(address)) {
      setErrorAddress('Invalid address')
      return
    }
    setReceiveAddress(address)
    onNextStep()
  }

  const handleScanSuccess = (value: string) => {
    setErrorAddress('')
    console.log(value)
    try {
      const dataObj = JSON.parse(value)
      if (!dataObj.address || !dataObj.amount || !dataObj.tokenMeta) {
        console.log('invalid QR data')
        return;
      }

      setReceiveAddress(dataObj.address)
      setTokenMeta(dataObj.tokenMeta)
      setAmount(dataObj.amount)
      onNextStep()
    } catch (error) {
      if (!isAddress(value)) {
        console.log('invalid QR data')
        return;
      }
      setReceiveAddress(value)
      onNextStep()
    }
  }

  if (showScanner) {
    return (
      <Scanner
        onCancel={() => setShowScanner(false)}
        onSuccess={handleScanSuccess}
      />
    )
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
          postIcon={() => {
            return (
              <TouchableOpacity onPress={() => setShowScanner(true)}>
                <Icon name="scan" width={18} height={18} />
              </TouchableOpacity>
            )
          }}
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
