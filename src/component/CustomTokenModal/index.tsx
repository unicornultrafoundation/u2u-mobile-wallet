import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { usePreferenceStore } from '../../state/preferences';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { darkTheme, lightTheme } from '../../theme/color';
import { Keyboard, Platform, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import ModalContent from './ModalContent';

const CustomTokenModal = ({trigger, triggerStyle}: {
  trigger: () => JSX.Element,
  triggerStyle?: StyleProp<ViewStyle>
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={triggerStyle}
      >
        {trigger()}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        // index={0}
        enableDynamicSizing
        // snapPoints={snapPoints}
        android_keyboardInputMode="adjustResize"
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
        <ModalContent onClose={handleClose} />
      </BottomSheetModal>
    </>
  )
}

export default CustomTokenModal;
