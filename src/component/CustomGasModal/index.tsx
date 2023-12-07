import React, { useCallback, useRef, useMemo } from 'react'
import styles from './styles';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import GasPriceInput from './GasPriceInput';
import GasLimitInput from './GasLimitInput';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { usePreference } from '../../hook/usePreference';
import CustomBottomSheetModal from '../CustomBottomSheetModal';

const CustomGasModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {preferenceTheme} = usePreference()
  const { t } = useTranslation<string>()

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <CustomBottomSheetModal
      modalRef={bottomSheetModalRef}
      title='customizeGasFee'
      trigger={trigger()}
      triggerModal={
        <View style={{ flexDirection: 'column', flex: 1, paddingVertical: 10}}>
          <BottomSheetScrollView style={{flex: 1, width: '100%'}}>
            <View style={{gap: 16}}>
              <GasPriceInput />
              <GasLimitInput />
            </View>
          </BottomSheetScrollView>
          <Button
            fullWidth
            style={{
              borderRadius: 60,
              marginTop: 10,
            }}
            onPress={handleClose}
          >
            {t('continue')}
          </Button>
        </View>
      }
      snapPoints={snapPoints}
      hasSeparator={false}
    />
  )
};

export default CustomGasModal;
