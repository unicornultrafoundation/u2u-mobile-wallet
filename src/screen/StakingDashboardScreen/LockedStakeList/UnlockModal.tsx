import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { LockedStake } from '../../../hook/useFetchLockedStake';
import Text from '../../../component/Text';
import theme from '../../../theme';
import { styles } from './styles';
import { formatNumberString, getDigit, parseNumberFormatter } from '../../../util/string';
import { parseFromRaw } from '../../../util/bignum';
import TextInput from '../../../component/TextInput';
import { formatDate, parseInterval } from '../../../util/date';
import { useCalcPenalty } from '../../../hook/useCalcPenalty';
import { useStaking } from '../../../hook/useStaking';
import Button from '../../../component/Button';
import { useUnlockStake } from '../../../hook/useUnlockStake';
import Toast from 'react-native-toast-message';
import { useTransaction } from '../../../hook/useTransaction';
import { TransactionReceipt } from 'ethers';
import { useFetchAllLockedStake } from '../../../hook/useFetchAllLockedStake';
import { useWallet } from '../../../hook/useWallet';
import { useTranslation } from 'react-i18next';

const UnlockModal = ({trigger, item}: {
  trigger: () => JSX.Element,
  item: LockedStake
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const { t } = useTranslation<string>()
  const {wallet} = useWallet()
  const { resetTxState } = useTransaction()
  const { stakingContractOptions } = useStaking()
  const { calcPen } = useCalcPenalty(stakingContractOptions)
  const { unlockStake } = useUnlockStake(stakingContractOptions)
  const {fetchLockedStake} = useFetchAllLockedStake(wallet.address)

  const [amount, setAmount] = useState('0')
  const [penalty, setPennalty] = useState('0')
  const [unlocking, setUnlocking] = useState(false)

  const [errorAmount, setErrorAmount] = useState('')

  const parsedStakedAmount = useMemo(() => {
    return parseFromRaw(item.lockedAmount.toFixed(), 18)
  }, [item])

  const handleInput = useCallback(async (value: any) => {
    const _pen = await calcPen(item.validatorId ? Number(item.validatorId) : 0, Number(value), item.lockedAmount)
    if (!_pen) return;
    setPennalty(parseFromRaw(_pen, 18))
  }, [item])

  useEffect(() => {
    handleInput(getDigit(amount))
  }, [amount, handleInput])

  const alertError = (error: any, withAmount = true) => {
    Toast.show({
      type: 'error',
      text1: t('msgUnlockStakeFail'),
      text2: (error as Error).message,
      onHide: resetTxState,
      props: {
        renderTrailing: () => {
          if (!withAmount) return null
          return (
            <Text
              style={[
                theme.typography.body.medium,
                {
                  color: preferenceTheme.text.title
                }
              ]}
            >
              {formatNumberString(amount, 6)} U2U
            </Text>
          )
        }
      }
    })
  }

  const alertSuccess = (tx: TransactionReceipt) => {
    fetchLockedStake()
    handleClose()
    Toast.show({
      type: 'success',
      text1: t('msgUnlockStakeSuccess'),
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
                amount, 6
              )} U2U
            </Text>
          )
        }
      }
    })
  }

  const validateAmount = (value: string) => {
    value = value.trim()
    if (value.length == 0) {
      setErrorAmount(t('msgFieldNotEmpty'))
      return false
    }
    const zeroFormatter = /^0*$/
    if (zeroFormatter.test(value)) {
      setErrorAmount(t('invalidValue'))
      return false
    }
    if (Number(getDigit(value)) > Number(parseFromRaw(item.lockedAmount.toFixed(), 18))) {
      setErrorAmount(t('insufficientBalance'))
      return false
    }
    setErrorAmount('')
    return true
  }

  const handleUnlock = async () => {
    if (!validateAmount(amount)) return
    setUnlocking(true)

    const params: any = {
      toValidatorID: Number(item.validatorId),
      amount: Number(amount)
    }
    try {
      const tx = await unlockStake(params)

      setUnlocking(false)
      if (!tx) return;
      if (tx.status !== 1) {
        alertError(new Error("execution reverted"))
        return
      }
      alertSuccess(tx);

    } catch (error) {
      console.log('handleUnlock error')
      setUnlocking(false)

      alertError(error)
    }
  }

  const renderItem = ({label, content} : {
    label: string,
    content: string,
  }) => {
    return (
      <View style={{flexDirection: 'row', gap: 8, marginBottom: 10}}>
        <Text
          style={[
            theme.typography.footnote.regular
          ]}
        >
          {t(label)}
        </Text>
        <Text
          style={[
            theme.typography.footnote.medium,
            {flex: 1, textAlign: 'right'}
          ]}
        >
          {content}
        </Text>
      </View>
    )
  }

  const renderForm = () => {
    return (
      <View style={{width: '100%', flex: 1}}>
        <View style={{flexDirection: 'row', gap: 8}}>
          <Text
            style={[
              theme.typography.footnote.regular
            ]}
          >
            {t('amount')}
          </Text>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setAmount(parsedStakedAmount)}
          >
            <Text
              style={[
                theme.typography.footnote.regular,
                {
                  textDecorationLine: 'underline',
                  textAlign: 'right',
                }
              ]}
            >
              {t('available')}: {formatNumberString(parsedStakedAmount, 4)} U2U
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={amount}
          error={errorAmount}
          onChangeText={(val) => {
            // setAmount(parseFormatedNumberInput(val.replaceAll(",", ".")))
            const newVal = parseNumberFormatter(val.replaceAll(",", "."))
            if (newVal != null) {
              setAmount(newVal)
            }
          }}
          keyboardType="numeric"
          containerStyle={{
            marginVertical: 8,
            marginBottom: 20,
          }}
          insideModal={true}
        />
        {renderItem({label: 'penalty', content: `${penalty} U2U`})}
        {renderItem({label: 'lockedDurationDays', content: parseInterval(0, item.duration)})}
        {renderItem({label: 'availableAt', content: formatDate(new Date(item.endTime), "HH:mm dd/MM/yyyy")})}
        <View style={{width: '100%', flex: 1, justifyContent: 'flex-end'}}>
          <Button
            fullWidth
            style={{
              borderRadius: 60
            }}
            onPress={handleUnlock}
            loading={unlocking}
            disabled={unlocking}
          >
            {t('unlock')}
          </Button>
        </View>
      </View>
    )
  }

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
      >
        {trigger()}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{
          backgroundColor: preferenceTheme.background.background,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16
        }}
        handleIndicatorStyle={{
          backgroundColor: '#F6F6F6'
        }}
        backdropComponent={({ style }) => {
          return (
            <View
              style={[
                style,
                {
                  backgroundColor: '#181818',
                  opacity: 0.9,
                }
              ]}
              onTouchEnd={handleClose}
            />
          )
        }}
      >
        <View style={[
          styles.contentContainer,
          {
            backgroundColor: preferenceTheme.background.background
          }
        ]}>
          {renderForm()}
        </View>
      </BottomSheetModal>
    </>
  )
}

export default UnlockModal;
