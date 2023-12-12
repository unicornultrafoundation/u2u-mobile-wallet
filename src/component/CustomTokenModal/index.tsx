import React, { useCallback, useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import ModalContent from './ModalContent';
import { usePreference } from '../../hook/usePreference';

const CustomTokenModal = ({trigger, triggerStyle}: {
  trigger: () => JSX.Element,
  triggerStyle?: StyleProp<ViewStyle>
}) => {
  const {preferenceTheme} = usePreference()

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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
        enablePanDownToClose={true}
        topInset={100}
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior={'restore'}
        backgroundStyle={{
          backgroundColor: preferenceTheme.background.background,
        }}
        handleStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 10,
          paddingBottom: 20,
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
