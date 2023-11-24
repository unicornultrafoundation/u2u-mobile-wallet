import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import Button from '../../component/Button';
import { formatNumberString, getDigit, parseNumberFormatter } from '../../util/string';
import { useTransactionStore } from '../../state/transaction';
import { useTokenBalance } from '../../hook/useTokenBalance';
import { useWallet } from '../../hook/useWallet';
import { SvgUri } from 'react-native-svg';
import BigNumber from 'bignumber.js';
import { encodeTxData } from '../../util/contract';
import { ERC20_ABI } from '../../util/abis/erc20';
import { getPhonePaddingBottom } from '../../util/platform';

const AmountStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const {t} = useTranslation<string>()

  const {setAmount, tokenMeta, amount, receiveAddress, setTxData} = useTransactionStore()
  const {wallet} = useWallet()
  const {balance, loading: loadingBalance} = useTokenBalance(wallet.address, tokenMeta.address)

  const [internalAmount, setInternalAmount] = useState(amount)
  const [error, setError] = useState('')

  const handleContinue = async () => {
    setError('')
    const amountDigit = getDigit(internalAmount)
    const rawAmountBN = BigNumber(amountDigit)

    if (rawAmountBN.toNumber() === 0) {
      setError('invalidAmount')
      return
    }

    if (rawAmountBN.gt(balance)) {
      setError('insufficientBalance')
      return
    }

    setAmount(amountDigit)
    const isNativeTx = tokenMeta.address.toLowerCase() === "0x" || tokenMeta.address.toLowerCase() === ""
    if (!isNativeTx) {
      try {
        const data = await encodeTxData(
          {contractAddress: tokenMeta.address, abi: ERC20_ABI},
          "transfer",
          [
            receiveAddress.toLowerCase(),
            getDigit(
              BigNumber(amountDigit).multipliedBy(10 ** tokenMeta.decimals).toFormat()
            )
          ]
        )
        console.log("data", data)
        setTxData(data)
      } catch (error) {
        console.log(error)
      }
    }

    onNextStep()
  }

  return (
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
          <Text style={styles.headerText}>{t('setAmountForTransaction')}</Text>
        </View>
        <View />
      </View>

      <View style={styles.bodyContainer}>
        <View style={{
          paddingHorizontal: 16, 
          marginTop: 50, 
          alignItems: 'center', 
          flexDirection: 'row', 
          justifyContent: 'center',
        }}>
          <View style={{flexWrap: 'nowrap', flexShrink: 1}}>
            <TextInput
              autoFocus
              onChangeText={(val) =>{
                const newVal = parseNumberFormatter(val.replaceAll(",", "."))
                if (newVal != null) {
                  setInternalAmount(newVal)
                }
              }}
              value={internalAmount}
              keyboardType="numeric"
              style={[
                theme.typography.largeTitle.medium,
                {
                  marginRight: 4,
                  color: preferenceTheme.text.title
                }
              ]}
            />
          </View>
          <Text style={theme.typography.largeTitle.medium}>{tokenMeta.symbol}</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 14,
              padding: 8,
              borderRadius: 8,
              backgroundColor: preferenceTheme.background.surface,
              alignItems: 'center',
            }}
          >
            <View style={{width: 28, height: 28}}>
              <SvgUri
                uri={tokenMeta.logo}
                width="100%"
                height="100%"
              />
            </View>
            <View style={{flex: 1, paddingHorizontal: 11}}>
              <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.primary}]}>Balance</Text>
              <Text style={theme.typography.footnote.regular}>{formatNumberString(balance)} {tokenMeta.symbol}</Text>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: preferenceTheme.outline
              }}
              onPress={() => {
                setInternalAmount(balance)
              }}
            >
              <Text
                style={[
                  theme.typography.caption1.medium,
                  {
                    color: theme.color.neutral[500]
                  }
                ]}
              >
                Max
              </Text>
            </TouchableOpacity>
          </View>
          {error && (
            <View style={{flexDirection: 'row', paddingBottom: 8, alignItems: 'center'}}>
              <Icon name='error' width={18} height={18} />
              <Text style={[
                theme.typography.caption2.regular,
                {
                  color: theme.accentColor.error.normal,
                  paddingLeft: 4
                }
              ]}>
                {t(error)}
              </Text>
            </View>
          )}
          <Button
            style={{borderRadius: 60}}
            textStyle={theme.typography.label.medium}
            onPress={handleContinue}
          >
            {t('continue')}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
};

export default AmountStep;
