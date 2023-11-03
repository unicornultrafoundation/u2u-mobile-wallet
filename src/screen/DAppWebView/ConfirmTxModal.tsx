import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native';
import {styles} from './styles'
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { SvgUri } from 'react-native-svg';
import theme from '../../theme';
import { formatNumberString } from '../../util/string';
import { parseFromRaw } from '../../util/bignum';
import { useTranslation } from 'react-i18next';
import Icon from '../../component/Icon';
import Separator from '../../component/Separator';
import { useTransaction } from '../../hook/useTransaction';
import CustomGasModal from '../../component/CustomGasModal';

const ConfirmTxModal = ({showModal, onCloseModal, txObj}: {
  onCloseModal: () => void;
  showModal: boolean;
  txObj: Record<string, any>
}) => {
  // ref
  const ref = useRef<BottomSheetModal>(null);
  const {estimateGasLimit, estimatedFee, maxFee} = useTransaction()

  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  // variables
  const snapPoints = useMemo(() => ['90%'], []);

  const {t} = useTranslation<string>()

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) onCloseModal()
  }, []);

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
  }, [txObj])

  return (
    <BottomSheetModal
      ref={ref}
      // index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
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
              {parseFromRaw(txObj.value, 18, true)} U2U
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
      </View>
    </BottomSheetModal>
  )
}

export default ConfirmTxModal;
