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

const LanguageModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const { t, i18n } = useTranslation<string>()

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
            {t('chooseLanguage')}
          </Text>
          <Separator style={{width: '100%'}} />
          {i18n.languages.map((lang: string) => {
            return (
              <TouchableOpacity style={styles.settingItem} key={`language-${lang}`}>
                <Text>{t(lang)}</Text>
                <View>
                  {i18n.language === lang && (
                    <Icon
                      name='success'
                      width={24}
                      height={24}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </BottomSheetModal>
    </>
  )
}

export default LanguageModal;