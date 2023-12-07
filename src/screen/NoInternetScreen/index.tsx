import React from 'react'
import { SafeAreaView } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import { usePreference } from '../../hook/usePreference';
import { typography } from '../../theme/typography';

const NoInternetScreen = () => {
  const { t } = useTranslation()
  const { preferenceTheme } = usePreference()
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
    >
      <Text
        style={[
          typography.headline.medium,
          {
            color: preferenceTheme.text.primary
          }
        ]}
      >
        {t('noInternetConnection')}
      </Text>
    </SafeAreaView>
  )
}

export default NoInternetScreen;
