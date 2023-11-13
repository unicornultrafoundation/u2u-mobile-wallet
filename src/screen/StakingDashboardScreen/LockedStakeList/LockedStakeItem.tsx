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

const LockedStakeItem = ({item}: {
  item: LockedStake
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const [claiming, setClaiming] = useState(false)

  const isClaimable = useMemo(() => {
    if (item.endTime > Date.now()) return false
    return true
  }, [item])

  const handleClaim = async () => {

  }

  return (
    <View
      style={[
        styles.lockedStake,
        {
          borderColor: preferenceTheme.outline
        }
      ]}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
        <View>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            Validator ID
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {item.validatorId}
          </Text>
        </View>
        <View>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            Amount
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {parseFromRaw(item.lockedAmount.toFixed(), 18, true)} U2U
          </Text>
        </View>
        <View>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            Duration
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {parseInterval(0, item.duration)}
          </Text>
        </View>
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
                {isClaimable ? "Withdraw" : `Available at ${formatDate(new Date(item.endTime), "HH:mm dd/MM/yyyy")}`}
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}

export default LockedStakeItem;
