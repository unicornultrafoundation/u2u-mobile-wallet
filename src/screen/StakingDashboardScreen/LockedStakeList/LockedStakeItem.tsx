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

const LockedStakeItem = ({item}: {
  item: LockedStake
}) => {
  const {darkMode} = usePreferenceStore()
  const {t} = useTranslation()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const [claiming, setClaiming] = useState(false)

  const isClaimable = useMemo(() => {
    if (item.endTime > Date.now()) return false
    return true
  }, [item])

  const handleClaim = async () => {

  }

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
      <View style={{flexDirection: 'row', gap: 5}}>
        {renderItem({label: 'validatorID', content: item.validatorId, flex: 1})}
        {renderItem({label: 'amount', content: `${parseFromRaw(item.lockedAmount.toFixed(), 18, true)} U2U`, flex: 1})}
        {renderItem({label: 'duration', content: parseInterval(0, item.duration)})}
      </View>
      <UnlockModal
        item={item}
        trigger={() => {
          return (
            <View
              style={{
                borderRadius: 60,
                flex: 1,
                paddingVertical: 8,
                backgroundColor: isClaimable ? theme.color.primary[500] : preferenceTheme.background.surface
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
                {isClaimable ? t('withdraw') : t('availableAtValueDate').replace('{value}', formatDate(new Date(item.endTime), "HH:mm dd/MM/yyyy"))}
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}

export default LockedStakeItem;
