import React, { useState } from 'react'
import { View } from 'react-native';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { useTranslation } from 'react-i18next';
import TextInput from '../../../component/TextInput';
import { formatNumberString, getDigit, parseNumberFormatter } from '../../../util/string';
import { SvgUri } from 'react-native-svg';
import { useStaking } from '../../../hook/useStaking';
import Toast from 'react-native-toast-message';
import { useTransaction } from '../../../hook/useTransaction';
import Text from '../../../component/Text';
import { Validation } from '../../../service/staking';
import { useUndelegate } from '../../../hook/useUndelegate';
import Icon from '../../../component/Icon';
import BigNumber from 'bignumber.js';
import { usePreference } from '../../../hook/usePreference';

const UnstakeSection = ({onCancel, item, actualStakedAmount} : {
  onCancel: () => void
  item: Validation
  actualStakedAmount: BigNumber
}) => {
  const {t} = useTranslation<string>()
  const [unstaking, setUnstaking] = useState(false)
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [errorUnstakeAmount, setErrorUnstakeAmount] = useState('')

  const {preferenceTheme} = usePreference()

  const {stakingContractOptions} = useStaking()
  const { undegegate } = useUndelegate(stakingContractOptions)
  const {resetTxState} = useTransaction()

  const validateAmount = (value: string) => {
    value = value.trim()
    if (value.length == 0) {
      setErrorUnstakeAmount(t('msgFieldNotEmpty'))
      return false
    }
    const zeroFormatter = /^0*$/
    if (zeroFormatter.test(value)) {
      setErrorUnstakeAmount(t('invalidValue'))
      return false
    }
    if (BigNumber(value) > actualStakedAmount) {
      setErrorUnstakeAmount(t('msgInsufficientStakeAmount'))
      return false
    }
    setErrorUnstakeAmount('')
    return true
  }

  const handleUnstake = async () => {
    if (!validateAmount(unstakeAmount)) return
    try {
      setUnstaking(true)
      const tx = await undegegate({toValidatorID: Number(item.validator.valId), amount: Number(getDigit(unstakeAmount))})
      console.log(tx)
      setUnstaking(false) 

      if (!tx) {
        return
      }

      Toast.show({
        type: 'success',
        text1: t('msgUnstakeSuccess'),
        onHide: resetTxState,
        props: {
          txHash: tx.hash,
          renderTrailing: () => {
            return (
              <Text
                style={[
                  theme.typography.body.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {formatNumberString(
                  unstakeAmount, 6
                )} U2U
              </Text>
            )
          }
        }
      })
    } catch (error) {
      console.log(error)
      setUnstaking(false)
      Toast.show({
        type: 'error',
        text1: t('msgUnstakeFail'),
        text2: (error as Error).message,
        onHide: resetTxState,
        props: {
          renderTrailing: () => {
            return (
              <Text
                style={[
                  theme.typography.body.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {formatNumberString(
                  unstakeAmount, 6
                )} U2U
              </Text>
            )
          }
        }
      })
    }
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <View>
      <TextInput
        autoFocus
        value={unstakeAmount}
        placeholder={t('unstakeAmount')}
        onChangeText={val => {
          // setUnstakeAmount(parseFormatedNumberInput(val.replaceAll(",", ".")))
          const newVal = parseNumberFormatter(val.replaceAll(",", "."))
          if (newVal != null) {
            setUnstakeAmount(newVal)
          }
        }}
        keyboardType="numeric"
        postIcon={() => {
          return (
            <View style={{width: 18, height: 18}}>
              <SvgUri
                uri={"https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"}
                width="100%"
                height="100%"
              />
            </View>
          )
        }}
      />
      {errorUnstakeAmount && (
        <View style={{flexDirection: 'row', paddingTop: 8, alignItems: 'center', gap: 2}}>
        <Icon name='error' width={16} height={16}/>
        <Text style={[
          theme.typography.caption2.regular,
          {
            flex: 1,
            color: theme.accentColor.error.normal,
            paddingLeft: 4
          }
        ]}>
          {t(errorUnstakeAmount)}
        </Text>
      </View>
      )}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 16}}>
        <Button
          onPress={handleUnstake}
          loading={unstaking}
          disabled={unstaking}
          color='primary'
          style={{
            borderRadius: 60,
            flex: 1,
            paddingVertical: 8
          }}
          textStyle={[
            theme.typography.label.medium,
            {
              color: preferenceTheme.text.title
            }
          ]}
        >
          {t('confirm')}
        </Button>
        <Button
          disabled={unstaking}
          onPress={handleCancel}
          style={{
            borderRadius: 60,
            flex: 1,
            paddingVertical: 8,
            backgroundColor: preferenceTheme.background.surface
          }}
          textStyle={[
            theme.typography.label.medium,
            {
              color: preferenceTheme.text.disabled
            }
          ]}
        >
          {t('cancel')}
        </Button>
      </View>
    </View>
  )
}

export default UnstakeSection;
