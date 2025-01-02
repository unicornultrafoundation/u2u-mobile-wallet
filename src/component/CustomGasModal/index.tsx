import React, { useCallback, useRef, useMemo } from 'react'
import { View } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
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
  // const snapPoints = useMemo(() => ['50%'], []);

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
        <BottomSheetView style={{ flexDirection: 'column', flex: 1, paddingVertical: 10}}>
          <BottomSheetScrollView style={{flex: 1, width: '100%'}}>
            <BottomSheetView style={{gap: 16}}>
              <GasPriceInput />
              <GasLimitInput />
            </BottomSheetView>
          </BottomSheetScrollView>
          <Button
            fullWidth
            insideModal
            style={{
              borderRadius: 60,
              marginTop: 10,
            }}
            onPress={handleClose}
          >
            {t('continue')}
          </Button>
        </BottomSheetView>
      }
      snapPoints={['50%']}
      hasSeparator={false}
      triggerStyle={{flex: 1}}
    />
  )
};

export default CustomGasModal;
