import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react'
import { TouchableOpacity, View } from 'react-native';

import ModalContent from './ModalContent';
import { usePreference } from '../../hook/usePreference';

const ManageTokenModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {preferenceTheme} = usePreference()

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['75%'], []);

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
      >
        {trigger()}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
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
        <ModalContent />
      </BottomSheetModal>
    </>
  )
}

export default ManageTokenModal;
