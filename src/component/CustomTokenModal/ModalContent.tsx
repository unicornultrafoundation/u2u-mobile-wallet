import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import TextInput from '../TextInput';
import Button from '../Button';
import { isAddress } from 'ethers';
import { useDebounce } from '../../hook/useDebounce';
import { useNetwork } from '../../hook/useNetwork';
import { fetchURC20MetaFromContract } from '../../service/token';
import { useLocalStore } from '../../state/local';

const ModalContent = ({onClose}: {
  onClose: () => void
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {rpc} = useNetwork()
  const {t} = useTranslation()
  const { addCustomToken } = useLocalStore()

  const [address, setAddress] = useState('')
  const debouncedAddress = useDebounce(address, 300);
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [decimals, setDecimals] = useState('')

  useEffect(() => {
    (async () => {
      if (!isAddress(debouncedAddress) || !rpc) return

      const rs = await fetchURC20MetaFromContract(debouncedAddress, rpc)

      setName(rs.name)
      setSymbol(rs.symbol)
      setDecimals(rs.decimals.toString())
    })()
  }, [debouncedAddress, rpc])

  const handleImport = () => {
    addCustomToken({
      name,
      decimals: Number(decimals),
      symbol,
      address
    })
    onClose()
  }

  return (
    <View style={[
      styles.contentContainer,
      {
        backgroundColor: preferenceTheme.background.background
      }
    ]}>
      <Text
        style={[
        theme.typography.headline.medium,
        {
          color: preferenceTheme.text.title,
          marginBottom: 16
        }
      ]}>
        {t('addCustomToken')}
      </Text>
      <View style={{width: '100%', gap: 8, marginBottom: 16}}>
        <Text>{t('address')}</Text>
        <TextInput
          insideModal
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <View style={{width: '100%', gap: 8, marginBottom: 16}}>
        <Text>{t('tokenName')}</Text>
        <TextInput
          insideModal
          value={name}
        />
      </View>
      <View style={{width: '100%', gap: 8, marginBottom: 16}}>
        <Text>{t('symbol')}</Text>
        <TextInput
          insideModal
          value={symbol}
        />
      </View>
      <View style={{width: '100%', gap: 8, marginBottom: 16}}>
        <Text>{t('decimals')}</Text>
        <TextInput
          insideModal
          value={decimals}
        />
      </View>
      <View style={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
        <Button
          style={{
            borderRadius: 60
          }}
          onPress={handleImport}
        >
          {t('continue')}
        </Button>
      </View>
    </View>
  )
}

export default ModalContent;
