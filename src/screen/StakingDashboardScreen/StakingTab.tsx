import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useStaking } from '../../hook/useStaking';
import Text from '../../component/Text';
import { formatNumberString } from '../../util/string';

const StakingTab = () => {
  const { t } = useTranslation<string>()
  const {supply, rewardsPerEpoch, validators} = useStaking()

  return (
    <View>
      {/* Header */}
      <View>
        <Text>{t('stakingTitle')}</Text>
        <Text>Circulating supply: {formatNumberString(supply)}</Text>
        <Text>Rewards per epoch: {formatNumberString(rewardsPerEpoch)}</Text>
        <Text>Validators count: {validators.length}</Text>
      </View>
    </View>
  )
}

export default StakingTab;
