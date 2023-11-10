import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useStaking } from '../../hook/useStaking';
import Text from '../../component/Text';
import { formatNumberString } from '../../util/string';
import styles from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import { useTotalSupply } from '../../hook/useTotalSupply';
import { useEpochRewards } from '../../hook/useEpochRewards';
import { useFetchAllValidator } from '../../hook/useFetchAllValidator';
import { useCurrentEpoch } from '../../hook/useCurrentEpoch';

const StakingInfoItem = ({title, value}: {
  title: string;
  value: string
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={{flex: 1}}>
      <Text style={[theme.typography.caption1.regular, {color: preferenceTheme.text.title, textAlign: 'center'}]}>{title}</Text>
      <Text style={[theme.typography.headline.bold, {color: preferenceTheme.text.title, textAlign: 'center'}]}>{value}</Text>
    </View>
  )
}

const StakingDataCard = () => {
  const { t } = useTranslation<string>()
  const { stakingContractOptions } = useStaking()
  const { validators } = useFetchAllValidator()
  const { supply } = useTotalSupply(stakingContractOptions)
  const { fetchEpoch } = useCurrentEpoch(stakingContractOptions)
  const { fetchRewardsPerEpoch } = useEpochRewards(stakingContractOptions)

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const [rewardsPerEpoch, setRewardsPerEpoch] = useState("0")

  useEffect(() => {
    (async () => {
      const epoch = await fetchEpoch()
      if (!epoch) return
      const rs = await fetchRewardsPerEpoch(epoch)
      setRewardsPerEpoch(rs)
    })()
  }, [])

  return (
    <View style={[styles.stakingDataContainer, {backgroundColor: preferenceTheme.background.surface}]}>
      <View>
        <View style={{flexDirection: 'row', paddingBottom: 12}}>
          <StakingInfoItem title={t('totalValidator')} value={validators.length.toString()} />
          <StakingInfoItem title={t('totalDelegator')} value={validators.length.toString()} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <StakingInfoItem title={t('rewardsPerEpoch')} value={formatNumberString(rewardsPerEpoch, 4)} />
          <StakingInfoItem title={t('circulatingSupply')} value={supply ? formatNumberString(supply, 0) : "0"} />
        </View>
      </View>
    </View>
  )
}

export default StakingDataCard;
