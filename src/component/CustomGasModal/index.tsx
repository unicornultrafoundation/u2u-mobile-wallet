import React, { useCallback, useRef, useMemo } from 'react'
import {
  BottomSheetModal, BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import styles from './styles';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { darkTheme, lightTheme } from '../../theme/color';
import { usePreferenceStore } from '../../state/preferences';
import GasPriceInput from './GasPriceInput';
import theme from '../../theme';
import GasLimitInput from './GasLimitInput';
import Button from '../Button';
import { useTranslation } from 'react-i18next';

const CustomGasModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const { t } = useTranslation<string>()

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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
        // enableDynamicSizing
        onChange={handleSheetChanges}
        android_keyboardInputMode="adjustResize"
        backgroundStyle={{
          backgroundColor: preferenceTheme.background.background,
        }}
        enablePanDownToClose={true}
        handleStyle={{
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
          styles.contentContainer
        ]}>
          <Text style={[
            theme.typography.headline.medium,
            {
              color: preferenceTheme.text.title,
              marginBottom: 28
            }
          ]}>
            {t('customizeGasFee')}
          </Text>
          <View style={{flex: 1, width: '100%', gap: 16}}>
            <GasPriceInput />
            <GasLimitInput />
          </View>
          <Button
            fullWidth
            style={{
              borderRadius: 60,
              marginTop: 10
            }}
            onPress={handleClose}
          >
            {t('continue')}
          </Button>
        </View>
      </BottomSheetModal>
    </>
  )
};

export default CustomGasModal;
