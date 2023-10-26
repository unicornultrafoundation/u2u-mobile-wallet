import React from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import Text from '../../component/Text';
import theme from '../../theme';
import { Validator } from '../../service/staking';
import Separator from '../../component/Separator';
import { useFetchEpochOfValidator } from '../../hook/useFetchEpochOfValidator';
import { formatNumberString } from '../../util/string';

const RewardTab = ({validator}: {
  validator: Validator
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {t} = useTranslation<string>()

  const { epoches, totalCount } = useFetchEpochOfValidator(Number(validator.valId), 0)

  return (
    <View style={{paddingTop: 16}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text
          style={[
            theme.typography.caption2.regular,
            {
              color: preferenceTheme.text.secondary
            }
          ]}
        >
          {t('epoch')}
        </Text>
        <Text
          style={[
            theme.typography.caption2.regular,
            {
              color: preferenceTheme.text.secondary
            }
          ]}
        >
          {t('reward')} (U2U)
        </Text>
      </View>
      
      <FlatList
        data={epoches}
        renderItem={({item}) => {
          return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text>{item.epochId}</Text>
              <Text>{formatNumberString(item.epochRewards.dividedBy(10 ** 18).toString(), 4)}</Text>
            </View>
          )
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  )
}

export default RewardTab;
