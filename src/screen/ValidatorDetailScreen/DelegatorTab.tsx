import React from 'react'
import { FlatList, View } from 'react-native';
import Text from '../../component/Text';
import { Validator } from '../../service/staking';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import Separator from '../../component/Separator';
import { formatNumberString, shortenAddress } from '../../util/string';

const DelegatorTab = ({validator}: {
  validator: Validator
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {t} = useTranslation<string>()

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
          {t('address')}
        </Text>
        <Text
          style={[
            theme.typography.caption2.regular,
            {
              color: preferenceTheme.text.secondary
            }
          ]}
        >
          {t('staked')} (U2U)
        </Text>
      </View>

      <FlatList
        data={validator.delegations}
        contentContainerStyle={{
          paddingBottom: 40
        }}
        renderItem={({item}) => {
          return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text>{shortenAddress(item.delegatorAddress, 10, 10)}</Text>
              <Text>{formatNumberString(item.stakedAmount.dividedBy(10 ** 18).toString(), 4)}</Text>
            </View>
          )
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  )
}

export default DelegatorTab;
