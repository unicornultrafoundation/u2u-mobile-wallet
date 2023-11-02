import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native';
import {styles} from './styles'
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const ConfirmTxModal = ({ref, onCloseModal}: {
  ref: React.RefObject<BottomSheetMethods>;
  onCloseModal: () => void;
}) => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={ref}
      // index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onClose={onCloseModal}
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
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
  )
}

export default ConfirmTxModal;
