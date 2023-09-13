import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const StakingTab = () => {
  const { t } = useTranslation<string>()
  return (
    <View>
      {/* Header */}
      <View>
        <Text>{t('stakingTitle')}</Text>
      </View>
    </View>
  )
}

export default StakingTab;
