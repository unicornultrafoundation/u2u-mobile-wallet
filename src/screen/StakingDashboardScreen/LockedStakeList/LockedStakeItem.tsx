import React, { useMemo, useState } from 'react'
import { View } from 'react-native';
import { LockedStake } from '../../../hook/useFetchLockedStake';
import { styles } from './styles';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import theme from '../../../theme';
import Text from '../../../component/Text';
import { formatNumberString } from '../../../util/string';
import { parseFromRaw } from '../../../util/bignum';
import { formatDate, parseInterval } from '../../../util/date';
import Button from '../../../component/Button';
import UnlockModal from './UnlockModal';
import { useTranslation } from 'react-i18next';
import { useClaimRewards } from '@/hook/useClaimRewards';
import { useStaking } from '@/hook/useStaking';
import { usePendingReward } from '@/hook/usePendingReward';
import { useWallet } from '@/hook/useWallet';

const LockedStakeItem = ({item}: {
  item: LockedStake
}) => {
  const {darkMode} = usePreferenceStore()
  const {t} = useTranslation()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {wallet} = useWallet()

  const {stakingContractOptions} = useStaking()
  const { pendingRewards } = usePendingReward({delegatorAddress: wallet.address, stakingContractOptions, validatorId: Number(item.validatorId)})
  const { claimRewards } = useClaimRewards(stakingContractOptions)

  const isClaimable = useMemo(() => {
    if (item.endTime > Date.now()) return false
    return true
  }, [item])

  const renderItem = ({label, content, flex} : {
    label: string,
    content: string,
    flex?: number
  }) => {
    return (
      <View style={{flex: flex, gap: 2}}>
        <Text
          style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
        >
          {t(label)}
        </Text>
        <Text
          style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
        >
          {content}
        </Text>
      </View>
    )
  }

  const renderUnlockModal = () => {
    return (
      <UnlockModal
        item={item}
        trigger={() => {
          return (
            <View
              style={{
                borderRadius: 60,
                flex: 1,
                paddingVertical: 8,
                backgroundColor: preferenceTheme.background.surface
              }}
            >
              <Text
                style={[
                  theme.typography.label.medium,
                  {
                    color: preferenceTheme.text.title,
                    textAlign: 'center'
                  }
                ]}
              >
                {/* {t('availableAtValueDate').replace('{value}', formatDate(new Date(item.endTime), "HH:mm dd/MM/yyyy"))} */}
                {t('earlyUnlock')}
              </Text>
            </View>
          )
        }}
      />
    )
  }

  return (
    <View
      style={[
        styles.lockedStake,
        {
          borderColor: preferenceTheme.outline,
          gap: 20,
        }
      ]}
    >
      {/* <View style={{flexDirection: 'row', gap: 5, justifyContent: 'space-between'}}>
        {renderItem({label: 'duration', content: parseInterval(0, item.duration), flex: 1})}
      </View> */}
      <View style={{flexDirection: 'row', gap: 5}}>
        {renderItem({label: 'validator', content: item.validatorName, flex: 1})}
        {renderItem({label: 'amount', content: `${parseFromRaw(item.lockedAmount.toFixed(), 18, true)} U2U`, flex: 1})}
      </View>
      <View style={{flexDirection: 'row', gap: 5}}>
        {renderItem({label: 'claimable', content: `${formatNumberString(pendingRewards, 6)} U2U`, flex: 1})}
        {renderItem({label: 'availableAt', content: formatDate(new Date(item.endTime), "HH:mm dd/MM/yyyy"), flex: 1})}
      </View>
      {
        isClaimable ? (
          <View
            style={{
              borderRadius: 60,
              flex: 1,
              paddingVertical: 8,
              backgroundColor: theme.color.primary[500]
            }}
          >
            <Text
              style={[
                theme.typography.label.medium,
                {
                  color: preferenceTheme.text.title,
                  textAlign: 'center'
                }
              ]}
            >
              {t('alreadyReleased')}
            </Text>
          </View>
        ) : renderUnlockModal()
      }
    </View>
  )
}

export default LockedStakeItem;
