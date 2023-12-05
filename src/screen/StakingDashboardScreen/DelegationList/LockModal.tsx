import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import Text from '../../../component/Text';
import theme from '../../../theme';
import { styles } from './styles';
import { SvgUri } from 'react-native-svg';
import { Validation } from '../../../service/staking';
import { formatNumberString, shortenAddress, parseNumberFormatter } from '../../../util/string';
import { useTranslation } from 'react-i18next';
import Separator from '../../../component/Separator';
import BigNumber from 'bignumber.js';
import { useFetchLockedStake } from '../../../hook/useFetchLockedStake';
import { useWallet } from '../../../hook/useWallet';
import { formatDate } from '../../../util/date';
import TextInput from '../../../component/TextInput';
import Button from '../../../component/Button';
import { useStaking } from '../../../hook/useStaking';
import { usePendingReward } from '../../../hook/usePendingReward';
import { MIN_LOCKUP_DURATION } from '../../../config/constant';
import { useLockStake } from '../../../hook/useLockStake';
import Toast from 'react-native-toast-message';
import { useTransaction } from '../../../hook/useTransaction';
import { TransactionReceipt } from 'ethers';
import { parseFromRaw } from '../../../util/bignum';

const LockModal = ({trigger, item}: {
  trigger: () => JSX.Element,
  item: Validation
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {t} = useTranslation<string>()

  const { wallet } = useWallet()
  const {stakingContractOptions} = useStaking()

  const {lockedStake: valLockedStake} = useFetchLockedStake(item.validator.auth.toLowerCase(), Number(item.validator.valId))
  const {lockedStake: myLockedStake, fetchLockedStake} = useFetchLockedStake(wallet.address.toLowerCase(), Number(item.validator.valId))
  const {lockedAmount, penalty} = myLockedStake
  const {lockStake, relockStake} = useLockStake(stakingContractOptions)
  const {resetTxState} = useTransaction()

  const maxDuration = useMemo(() => {
    if (!valLockedStake || !valLockedStake.endTime) return 0
    const endTime = valLockedStake.endTime
    let now = Math.ceil((new Date()).getTime())
    if (endTime < now) return 0
    let duration = Math.ceil((endTime - now) / 86400000) - 1
    if (duration < MIN_LOCKUP_DURATION) return 0
    return duration
  }, [valLockedStake])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const [amount, setAmount] = useState('0')
  const [duration, setDuration] = useState('0')
  const [errorAmount, setErrorAmount] = useState('')
  const [errorDuration, setErrorDuration] = useState('')
  const [locking, setLocking] = useState(false)

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const actualStakedAmount = useMemo(() => {
    if (item.stakedAmount && !item.stakedAmount.isZero()) {
      let _amount = item.stakedAmount.minus(BigNumber(lockedAmount || 0))
      if (penalty) {
        _amount = _amount.minus(penalty)
      }
      return _amount
    }
    return BigNumber(0)
  }, [item, lockedAmount, penalty])

  const parsedStakedAmount = useMemo(() => {
    return parseFromRaw(actualStakedAmount.toFixed(), 18)
  }, [actualStakedAmount])

  const alertError = (error: any, withAmount = true) => {
    Toast.show({
      type: 'error',
      text1: t('msgLockStakeFail'),
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
    Toast.show({
      type: 'success',
      text1: t('msgLockStakeSuccess'),
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
      return t('msgFieldNotEmpty')
    }
    const zeroFormatter = /^0*$/
    if (zeroFormatter.test(value)) {
      return t('invalidAmount')
    }
    return ''
  }

  const validateDuration = (value: string) => {
    value = value.trim()
    if (value.length == 0) {
      return t('msgFieldNotEmpty')
    }
    const valDuration = Number(value)
    if (valDuration < MIN_LOCKUP_DURATION) {
      return t('msgMinimumLockup').replace('{value}', MIN_LOCKUP_DURATION.toString())
    }
    if (valDuration > maxDuration) {
      return t('msgLockedDurationCannotBeGreaterThanMax').replace('{value}', `${formatNumberString(maxDuration.toString())}`)
    }
    return ''
  }

  const validateForm = () => {
    const amountErr = validateAmount(amount)
    const durationErr = validateDuration(duration)
    setErrorAmount(amountErr)
    setErrorDuration(durationErr)
    return !amountErr && !durationErr
  }

  const handleLock = async () => {
    if (!validateForm()) return
    setLocking(true)

    const params: any = {
      toValidatorID: Number(item.validator.valId),
      lockupDuration: Number(duration) * 86400,
      amount: Number(amount)
    }
    try {
      const isLockedUp = myLockedStake ? myLockedStake.isLockedUp : false
      const tx = isLockedUp ? await relockStake(params) : await lockStake(params)

      setLocking(false)
      if (!tx) return;
      if (tx.status !== 1) {
        alertError(new Error("execution reverted"))
        return
      }
      
      alertSuccess(tx);

    } catch (error) {
      console.log('handleLock error')
      setLocking(false)

      alertError(error)
    }
  }

  const renderForm = () => {
    return (
      <View style={{width: '100%', flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              theme.typography.footnote.regular
            ]}
          >
            {t('amount')}
          </Text>
          <TouchableOpacity
            onPress={() => setAmount(parsedStakedAmount)}
          >
            <Text
              style={[
                theme.typography.footnote.regular,
                {
                  textDecorationLine: 'underline'
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
          placeholder={t('amount')}
          onChangeText={(val) => {
            // setAmount(parseFormatedNumberInput(val.replaceAll(",", ".")))
            const newVal = parseNumberFormatter(val.replaceAll(",", "."))
            if (newVal != null) {
              setAmount(newVal)
            }
          }}
          keyboardType="numeric"
          containerStyle={{
            marginVertical: 8
          }}
          insideModal={true}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
          <Text
            style={[
              theme.typography.footnote.regular
            ]}
          >
            {t('lockedDurationDays')}
          </Text>
          <Text
            style={[
              theme.typography.footnote.regular,
              {flex: 1, textAlign: 'right'}
            ]}
          >
            {t('max')}: {formatNumberString(maxDuration.toString())} {t('days')}
          </Text>
        </View>
        <TextInput
          value={duration}
          error={errorDuration}
          placeholder={t('lockedDurationDays')}
          onChangeText={(val) => {
            // const valNumber = Number(val)
            // if (valNumber > maxDuration) return;
            // setDuration(parseFormatedNumberInput(val.replaceAll(",", ".")))
            const newVal = parseNumberFormatter(val.replaceAll(",", "."))
            if (newVal != null) {
              setDuration(newVal)
            }
          }}
          keyboardType="numeric"
          containerStyle={{
            marginVertical: 8
          }}
          insideModal={true}
        />
        <View
          style={{width: '100%', flex: 1, justifyContent: 'flex-end'}}
        >
          <Button
            fullWidth
            style={{
              borderRadius: 60
            }}
            onPress={handleLock}
            loading={locking}
            disabled={locking}
          >
            {t('lock')}
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
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: preferenceTheme.background.background,
        }}
        handleStyle={{
          // backgroundColor: preferenceTheme.background.background,
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: 34, height: 34, marginRight: 8}}>
              <SvgUri
                uri={"https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"}
                width="100%"
                height="100%"
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'space-between'}}
            >
              <Text
                style={[
                  theme.typography.caption1.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {item.validator.name}
              </Text>
              <Text
                style={[
                  theme.typography.caption1.regular,
                  {
                    color: preferenceTheme.text.primary
                  }
                ]}
              >
                {shortenAddress(item.validator.auth, 8, 8)}
              </Text>
            </View>
          </View>
          <Separator style={{width: '100%'}} />
          {renderForm()}
        </View>
      </BottomSheetModal>
    </>
  )
}

export default LockModal;
