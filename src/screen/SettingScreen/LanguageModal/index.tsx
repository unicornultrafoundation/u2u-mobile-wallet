import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import styles from './styles';
import Text from '../../../component/Text';
import theme from '../../../theme';
import Icon from '../../../component/Icon';
import CustomBottomSheetModal from '../../../component/CustomBottomSheetModal';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

const LanguageModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {darkMode, setLangauge} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const { t, i18n } = useTranslation<string>()

  const languageKeys = Object.keys(i18n.services.resourceStore.data)

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['35%'], []);

  return (
    <CustomBottomSheetModal 
      modalRef={bottomSheetModalRef}
      title='chooseLanguage' 
      trigger={trigger()} 
      triggerModal={
        <BottomSheetScrollView bounces={false}>
          {languageKeys.map((lang: string) => {
            return (
              <TouchableOpacity
                style={styles.settingItem}
                key={`language-${lang}`}
                onPress={() => {
                  i18n.changeLanguage(lang)
                  setLangauge(lang)
                  bottomSheetModalRef.current?.close()
                }}
              >
                <Text style={[theme.typography.footnote.medium, {flex: 1}]}>{t(lang)}</Text>
                <BottomSheetView>
                  {i18n.language === lang && (
                    <Icon
                      name='success'
                      width={24}
                      height={24}
                    />
                  )}
                </BottomSheetView>
              </TouchableOpacity>
            )
          })}
        </BottomSheetScrollView>
      }
      snapPoints={snapPoints}
    />
  )
}

export default LanguageModal;