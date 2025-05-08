import React, { useCallback, useMemo, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import Button from '../../component/Button';
import TextInput from '../../component/TextInput';
import { isAddress } from 'ethers';
import { useWallet } from '../../hook/useWallet';
import { useTransactionStore } from '../../state/transaction';
import Scanner from '../../component/QRCodeScanner';
import RecentAddress from '../../component/RecentAddress';
import { usePreference } from '../../hook/usePreference';
import { getPhonePaddingBottom } from '../../util/platform';
import ErrorTextInput from '../../component/TextInput/ErrorTextInput';
import { useWalletNickname } from '../../hook/useWalletNickname';
import { useSupportedTokens } from '../../hook/useSupportedTokens';
import Toast from 'react-native-toast-message';

const AddressStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const { wallet } = useWallet()
  const {preferenceTheme} = usePreference()
  const {t} = useTranslation<string>()
  const { receiveAddress, setReceiveAddress, setTokenMeta, setAmount } = useTransactionStore()
  const {supportedTokens} = useSupportedTokens()

  const [address, setAddress] = useState(receiveAddress)
  const [errorAddress, setErrorAddress] = useState('')
  const [showScanner, setShowScanner] = useState(false)

  // const {searchByNickname} = useWalletNickname()
  const searchByNickname = useCallback(async (nickname: string) => {
    return {} as any
  }, [])

  const validateAdress = async (value: string) => {
    if (value == wallet.address) {
      setErrorAddress('recipientAddressCannotBeTheSameAsSendingAddress')
      return false
    }
    if (!isAddress(value)) {
      const walletByNickname = await searchByNickname(value)
      if (!walletByNickname) {
        setErrorAddress('invalidAddress')
        return false
      }
    }
    setErrorAddress('')
    return true
  }

  const isWhitelistedToken = useCallback((tokenMeta: Record<string, any>) => {
    if (!Array.isArray(supportedTokens)) return false

    const index = supportedTokens.findIndex((item) => {
      return (
        item.name === tokenMeta.name &&
        item.symbol === tokenMeta.symbol &&
        item.decimals === tokenMeta.decimals &&
        item.address === tokenMeta.address &&
        item.logo === tokenMeta.logo
      )
    })

    return index !== -1
  }, [supportedTokens])

  const handleConfirm = async (value: string) => {
    if (await validateAdress(value)) {
      if (!isAddress(value)) {
        const walletByNickname = await searchByNickname(value)
        if (walletByNickname) {
          setReceiveAddress(walletByNickname.address)
        }
      } else {
        setReceiveAddress(value)
      }
      onNextStep()
    }
  }

  const handleScanSuccess = (value: string) => {
    setErrorAddress('')
    try {
      const dataObj = JSON.parse(value)
      if (!dataObj.address || !dataObj.amount || !dataObj.tokenMeta) {
        console.log('invalid QR data')
        setShowScanner(false)
        Toast.show({
          type: 'error',
          text1: t('invalidQR'),
        })
        return;
      }

      if (!isWhitelistedToken(dataObj.tokenMeta)) {
        setShowScanner(false)
        Toast.show({
          type: 'error',
          text1: t('unsupportedToken'),
        })
        return;
      }

      setReceiveAddress(dataObj.address)
      setTokenMeta(dataObj.tokenMeta)
      setAmount(dataObj.amount)
      onNextStep()
    } catch (error) {
      if (!isAddress(value)) {
        console.log('invalid QR data')
        Toast.show({
          type: 'error',
          text1: t('invalidQR'),
        })
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        style={{flex: 1, paddingBottom: getPhonePaddingBottom()}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={24}
      >
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
          <Text style={[theme.typography.caption2.medium, {color: preferenceTheme.text.secondary, textAlign: 'center'}]}>
            {t('msgAddressStepNotice')}
          </Text>
        </View>
        <View style={{marginTop: 36, marginHorizontal: 16}}>
          <TextInput
            placeholder={t('enterWalletAddress')}
            value={address}
            onChangeText={(val) => setAddress(val)}
            autoCapitalize='none'
            postIcon={() => {
              return (
                <TouchableOpacity onPress={() => setShowScanner(true)}>
                  <Icon name="scan" width={18} height={18} style={{marginLeft: 5}} />
                </TouchableOpacity>
              )
            }}
          />
          {errorAddress && <ErrorTextInput error={t(errorAddress)} style={{justifyContent: 'center', marginTop: 8}}/>}
        </View>
        <View style={{flex: 1, marginTop: 20, marginHorizontal: 16}}>
          <RecentAddress
            onItemClick={(selectedAddress) => {
              setAddress(selectedAddress)
              handleConfirm(selectedAddress)
            }}
          />
        </View>
        <Button
            style={{borderRadius: 60, marginHorizontal: 16}}
            onPress={() => handleConfirm(address)}
          >
            {t('confirm')}
          </Button>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default AddressStep;
