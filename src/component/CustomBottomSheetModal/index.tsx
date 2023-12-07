import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import Separator from '../Separator';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedValue } from 'react-native-reanimated';

interface Props {
  modalRef?: React.RefObject<BottomSheetModalMethods>;
  title?: string;
  trigger: JSX.Element;
  triggerModal: JSX.Element;
  snapPoints: 
  | Array<string | number>
  | SharedValue<Array<string | number>>
  | Readonly<(string | number)[] | SharedValue<(string | number)[]>>;
  hasSeparator?: boolean
}

const CustomBottomSheetModal = ({modalRef, title, trigger, triggerModal, snapPoints, hasSeparator = true} : Props) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const insets = useSafeAreaInsets();

  const { t } = useTranslation<string>()

  // ref
  const bottomSheetModalRef = modalRef ?? useRef<BottomSheetModal>(null);

  // variables
  // const snapPoints = useMemo(() => snapPoint, []);

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
        {trigger}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        topInset={insets.top + 60}
        keyboardBlurBehavior={'restore'}
        backgroundStyle={{
          backgroundColor: preferenceTheme.background.background,
        }}
        handleStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingVertical: 10,
          paddingBottom: 10,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#F6F6F6',
        }}
        backdropComponent={({ style }) => {
          return (
            <View
              style={[
                style,
                {
                  backgroundColor: 'black',//#181818
                  opacity: 0.5,//0.9
                }
              ]}
              onTouchEnd={handleClose}
            />
          )
        }}
      >
        <View 
          style={{ 
            flex: 1,
            flexDirection: 'column',
            marginHorizontal: 16,
          }}
        >
          {title && <Text style={[
            theme.typography.headline.medium,
            {
              color: preferenceTheme.text.title,
              textAlign: 'center',
              marginTop: 8,
              marginBottom: 20,
            }
          ]}>
            {t(title)}
          </Text>}
          {hasSeparator && <Separator style={{width: '100%', marginVertical: 2}} />}
          <View style={{flex: 1, marginBottom: insets.bottom}}>
            {triggerModal}
          </View>
        </View>
      </BottomSheetModal>
    </>
  )
}

export default CustomBottomSheetModal;
