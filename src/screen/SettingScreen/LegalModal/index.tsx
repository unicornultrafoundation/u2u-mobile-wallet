import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import styles from './styles';
import Text from '../../../component/Text';
import theme from '../../../theme';
import Separator from '../../../component/Separator';
import Icon from '../../../component/Icon';

const LegalModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const { t } = useTranslation<string>()

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%'], []);

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
        onChange={handleSheetChanges}
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
        <View style={[
          styles.contentContainer,
          {
            backgroundColor: preferenceTheme.background.background
          }
        ]}>
          <Text style={[
            theme.typography.headline.medium,
            {
              color: preferenceTheme.text.title,
            }
          ]}>
            {t('Legal')}
          </Text>
          <Separator style={{width: '100%'}} />
          <TouchableOpacity style={styles.settingItem}>
            <Text>Privacy Policy</Text>
            <Icon
              name='chevron-right'
              width={24}
              height={24}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text>Terms of Service</Text>
            <Icon
              name='chevron-right'
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </>
  )
}

export default LegalModal;