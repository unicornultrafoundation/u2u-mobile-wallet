import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native';
import {styles} from './styles'
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { SvgUri } from 'react-native-svg';
import theme from '../../theme';
import { formatNumberString, shortenAddress } from '../../util/string';
import { parseFromRaw } from '../../util/bignum';
import { useTranslation } from 'react-i18next';
import Icon from '../../component/Icon';
import Separator from '../../component/Separator';
import { useTransaction } from '../../hook/useTransaction';
import CustomGasModal from '../../component/CustomGasModal';
import { useNetwork } from '../../hook/useNetwork';
import { useWallet } from '../../hook/useWallet';
import Button from '../../component/Button';
import { useNativeBalance } from '../../hook/useNativeBalance';
import BigNumber from 'bignumber.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ConfirmTxModal = ({showModal, onCloseModal, txObj, onConfirm}: {
  onCloseModal: () => void;
  showModal: boolean;
  txObj: Record<string, any>
  onConfirm: (txHash: string) => void
}) => {
  // ref
  const ref = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const {estimateGasLimit, estimatedGasLimit, estimateGasPrice, gasPrice, estimatedFee, maxFee, submitRawTx} = useTransaction()

  const {name: networkName} = useNetwork()
  const {wallet} = useWallet()
  const {balance} = useNativeBalance(wallet.address)

  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // variables
  const snapPoints = useMemo(() => ['90%'], []);

  const {t} = useTranslation<string>()

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) onCloseModal()
  }, []);
  const handleClose = useCallback(() => {
    ref.current?.close();
  }, []);

  const handleConfirm = async () => {
    try {
      setError("")

      const balanceBN = BigNumber(balance)
      const rawAmount = BigNumber(txObj.value).dividedBy(10 ** 18)

      if (balanceBN.minus(estimatedFee).minus(rawAmount).lt(0)) {
        setError('Insufficient balance for transaction fee')
        return;
      }

      txObj.gasLimit = estimatedGasLimit
      setLoading(true)
      const tx = await submitRawTx({
        gasLimit: estimatedGasLimit,
        receiveAddress: txObj.to,
        amount: rawAmount,
        txData: txObj.data,
        gasPrice: gasPrice
      })
      setLoading(false)

      if (!tx) {
        setError('Insufficient balance for transaction fee')
        return
      }

      console.log('sented', tx?.hash)
      onConfirm(tx?.hash)
    } catch (error) {
      setLoading(false)
      console.log("error", error)
      setError("Transaction failed")
    }
  }

  useEffect(() => {
    if (!ref || !ref.current) return;
    if (showModal) {
      ref.current.present()
    } else {
      ref.current.close()
    }
  }, [showModal, ref])

  useEffect(() => {
    estimateGasLimit(txObj)
    estimateGasPrice()
  }, [txObj])

  return (
    <BottomSheetModal
      ref={ref}
      // index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: preferenceTheme.background.background,
      }}
      topInset={insets.top + 60}
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
      <View
        style={[
          styles.confirmTxContentContainer,
          {
            backgroundColor: preferenceTheme.background.background
          }
        ]}
      >
        <View style={[styles.cardContainer, {backgroundColor: preferenceTheme.background.surface, width: '100%'}]}>
          <Text style={theme.typography.caption2.regular}>{t('send')}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 8, width: '100%'}}>
            <View style={{width: 24, height: 24}}>
              <SvgUri
                uri={"https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"}
                width="100%"
                height="100%"
              />
            </View>
            <Text style={[theme.typography.footnote.medium, {paddingHorizontal: 8}]}>
              {txObj.value ? parseFromRaw(txObj.value, 18, true) : 0} U2U
            </Text>
          </View>
          <Separator />
            <Text style={theme.typography.caption2.regular}>{t('to')}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 8}}>
              <Icon name="wallet-icon" width={24} height={24} />
              <Text style={[theme.typography.footnote.medium, {paddingHorizontal: 8, flex: 1}]}>
                {txObj.to}
              </Text>
            </View>
        </View>

        <View style={[styles.cardContainer, {backgroundColor: preferenceTheme.background.surface, width: '100%'}]}>
          <View style={styles.cardRow}>
            <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>{t('estFee')}</Text>
            <Text style={[theme.typography.footnote.regular]}>{estimatedFee} U2U</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>{t('maxFee')}</Text>
            <CustomGasModal
              trigger={() => {
                return (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[theme.typography.footnote.regular]}>{maxFee} U2U</Text>
                    <Icon name="chevron-right" />
                  </View>
                )
              }}
            />
          </View>
        </View>
        {error && (
          <View style={{flexDirection: 'row', paddingBottom: 8, alignItems: 'center', justifyContent: 'flex-start', width: '100%'}}>
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
        <View style={[styles.cardContainer, {backgroundColor: preferenceTheme.background.surface, width: '100%'}]}>
          <View style={styles.cardRow}>
            <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>{t('from')}</Text>
            <Text style={[theme.typography.footnote.regular]}>{shortenAddress(wallet.address, 8, 8)}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>{t('network')}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name='u2u' width={16} height={16} />
              <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.title, paddingLeft: 4}]}>
                {networkName}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Button
        style={{borderRadius: 60, marginBottom: insets.bottom}}
        textStyle={theme.typography.label.medium}
        onPress={handleConfirm}
        loading={loading}
      >
        {t('confirm')}
      </Button>
    </BottomSheetModal>
  )
}

export default ConfirmTxModal;
