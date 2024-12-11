import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useStaking } from '../../hook/useStaking';
import Text from '../../component/Text';
import { formatNumberString } from '../../util/string';
import styles from './styles';
import theme from '../../theme';
import { useCirculatingSupply } from '../../hook/useCirculatingSupply';
import { useEpochRewards } from '../../hook/useEpochRewards';
import { useFetchAllValidator } from '../../hook/useFetchAllValidator';
import { usePreference } from '../../hook/usePreference';

const StakingInfoItem = ({title, value}: {
  title: string;
  value: string
}) => {
  const {preferenceTheme} = usePreference()

  return (
    <View style={{flex: 1}}>
      <Text style={[theme.typography.caption1.regular, {color: preferenceTheme.text.title, textAlign: 'center', paddingBottom: 3}]}>{title}</Text>
      <Text style={[theme.typography.headline.bold, {color: preferenceTheme.text.title, textAlign: 'center'}]}>{value}</Text>
    </View>
  )
}

const StakingDataCard = () => {
  const { t } = useTranslation<string>()
  const { stakingContractOptions } = useStaking()
  const { validators } = useFetchAllValidator()
  const { supply } = useCirculatingSupply(stakingContractOptions)
  const { data: rewardsPerEpoch } = useEpochRewards(stakingContractOptions)

  const {preferenceTheme} = usePreference()

  const totalDelegator = useMemo(() => {
    return validators.reduce((pre, cur) => {
      return pre + cur.totalDelegator
    }, 0)
  }, [validators])

  return (
    <View style={[styles.stakingDataContainer, {backgroundColor: preferenceTheme.background.surface}]}>
      <View style={{flexDirection: 'row', paddingBottom: 12}}>
        <StakingInfoItem title={t('totalValidators')} value={formatNumberString(validators.length.toString())} />
        <View style={{width: 6}}/>
        <StakingInfoItem title={t('totalDelegators')} value={formatNumberString(totalDelegator.toString())} />
      </View>
      <View style={{height: 10}}/>
      <View style={{flexDirection: 'row'}}>
        <StakingInfoItem title={`${t('rewardsPerEpoch')}\n(U2U)`} value={formatNumberString(rewardsPerEpoch, 4)} />
        <View style={{width: 6}}/>
        <StakingInfoItem title={`${t('circulatingSupply')}\n(U2U)`} value={supply ? formatNumberString(supply, 0) : "0"} />
      </View>
    </View>
  )
}

export default StakingDataCard;
