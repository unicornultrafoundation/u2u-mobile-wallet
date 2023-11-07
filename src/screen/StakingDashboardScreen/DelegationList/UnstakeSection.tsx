import React, { useState } from 'react'
import { View } from 'react-native';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { useTranslation } from 'react-i18next';
import TextInput from '../../../component/TextInput';
import { formatNumberString, getDigit, parseFormatedNumberInput } from '../../../util/string';
import { SvgUri } from 'react-native-svg';
import { useStaking } from '../../../hook/useStaking';
import Toast from 'react-native-toast-message';
import { useTransaction } from '../../../hook/useTransaction';
import Text from '../../../component/Text';
import { Validation } from '../../../service/staking';

const UnstakeSection = ({onCancel, item} : {
  onCancel: () => void
  item: Validation
}) => {
  const {t} = useTranslation<string>()
  const [unstaking, setUnstaking] = useState(false)
  const [unstakeAmount, setUnstakeAmount] = useState('')

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {undegegate} = useStaking()
  const {resetTxState} = useTransaction()

  const handleUnstake = async () => {
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
        text1: 'Unstake success',
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
        text1: 'Unstake fail',
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
        containerStyle={{marginBottom: 12}}
        style={{ height: 20 }}
        value={unstakeAmount}
        onChangeText={val => {
          setUnstakeAmount(parseFormatedNumberInput(val))
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 12}}>
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
