import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text, StyleProp, ViewStyle } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import Separator from '../Separator';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from 'react-native-reanimated';

interface Props {
  modalRef?: React.RefObject<BottomSheetModalMethods>;
  title?: string;
  trigger: JSX.Element;
  triggerModal: JSX.Element;
  snapPoints: (string | number)[];
  // | Array<string | number>
  // | SharedValue<Array<string | number>>
  // | Readonly<(string | number)[] | SharedValue<(string | number)[]>>;
  hasSeparator?: boolean;
  triggerStyle?: StyleProp<ViewStyle>;
  name?: string
}

const CustomBottomSheetModal = ({modalRef, name, title, trigger, triggerModal, snapPoints, hasSeparator = true, triggerStyle} : Props) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const insets = useSafeAreaInsets();

  const { t } = useTranslation<string>()
  const reducedMotion = useReducedMotion();

  // ref
  const bottomSheetModalRef = modalRef ?? useRef<BottomSheetModal>(null);

  // variables
  const _snapPoints = useMemo(() => snapPoints, []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useEffect(() => {
    bottomSheetModalRef.current?.snapToIndex(_snapPoints.length - 1)
  }, [bottomSheetModalRef.current])

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={triggerStyle}
      >
        {trigger}
      </TouchableOpacity>
      <BottomSheetModal
        animateOnMount={!reducedMotion}
        ref={bottomSheetModalRef}
        name={name}
        index={_snapPoints.length - 1}
        snapPoints={_snapPoints}
        // onChange={handleSheetChanges}
        enablePanDownToClose={true}
        topInset={insets.top + 60}
        keyboardBlurBehavior={'restore'}
        backgroundStyle={{
          backgroundColor: preferenceTheme.background.surface,
        }}
        handleStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingVertical: 10,
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
                  backgroundColor: '#181818',
                  opacity: 0.9,
                }
              ]}
              onTouchEnd={handleClose}
            />
          )
        }}
      >
        <BottomSheetView 
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
          <BottomSheetView style={{flex: 1, marginBottom: insets.bottom}}>
            {triggerModal}
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}

export default CustomBottomSheetModal;
