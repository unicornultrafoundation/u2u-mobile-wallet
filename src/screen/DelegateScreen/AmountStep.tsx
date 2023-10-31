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
import { formatNumberString, getDigit, parseFormatedNumberInput } from '../../util/string';
import { useTransactionStore } from '../../state/transaction';
import { useTokenBalance } from '../../hook/useTokenBalance';
import { useWallet } from '../../hook/useWallet';
import { SvgUri } from 'react-native-svg';
import BigNumber from 'bignumber.js';
import { encodeTxData } from '../../util/contract';
import { ERC20_ABI } from '../../util/abis/erc20';
import { useNativeBalance } from '../../hook/useNativeBalance';
import { useNetwork } from '../../hook/useNetwork';
import { useStaking } from '../../hook/useStaking';
import { Validator } from '../../service/staking';
import { GAS_LIMIT_HARD } from '../../config/constant';

const AmountStep = ({onNextStep, onBack, validator}: {
  onNextStep: () => void;
  onBack: () => void;
  validator: Validator
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const {t} = useTranslation<string>()
  const {networkConfig} = useNetwork()

  const {setAmount, amount, setEstimatedGasLimit} = useTransactionStore()
  const {wallet} = useWallet()
  const {balance, loading: loadingBalance} = useNativeBalance(wallet.address)
  const {parseDelegate} = useStaking()

  const [internalAmount, setInternalAmount] = useState(amount)
  const [error, setError] = useState('')

  const handleContinue = async () => {
    // TODO: validate amount
    setError('')
    const amountDigit = getDigit(internalAmount)
    const rawAmountBN = BigNumber(amountDigit)

    if (rawAmountBN.gt(balance)) {
      setError('Insufficient balance')
      return
    }

    setAmount(amountDigit)
    setEstimatedGasLimit(GAS_LIMIT_HARD.toString())
    parseDelegate({amount: amountDigit, toValidatorID: Number(validator.valId)})

    onNextStep()
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
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
        <View style={{paddingVertical: 16, marginTop: 36, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            autoFocus
            onChangeText={(val) => {
              setInternalAmount(parseFormatedNumberInput(val))
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
          <Text style={theme.typography.largeTitle.medium}>U2U</Text>
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
                uri={"https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"}
                width="100%"
                height="100%"
              />
            </View>
            <View style={{flex: 1, paddingHorizontal: 11}}>
              <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.primary}]}>Balance</Text>
              <Text style={theme.typography.footnote.regular}>{formatNumberString(balance)} U2U</Text>
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
                setInternalAmount(parseFormatedNumberInput(balance))
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
                {error}
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
