import React from 'react'
import { SafeAreaView } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';

const NoInternetScreen = () => {
  const { t } = useTranslation()
  return (
    <SafeAreaView
      style={[
        styles.container,
      ]}
    >
      <Text>{t('noInternetConnection')}</Text>
    </SafeAreaView>
  )
}

export default NoInternetScreen;
