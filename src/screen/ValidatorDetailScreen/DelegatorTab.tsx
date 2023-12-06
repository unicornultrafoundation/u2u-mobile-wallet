import React from 'react'
import { FlatList, View } from 'react-native';
import Text from '../../component/Text';
import { Validator } from '../../service/staking';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import Separator from '../../component/Separator';
import { formatNumberString, shortenAddress } from '../../util/string';
import { usePreference } from '../../hook/usePreference';

const DelegatorTab = ({validator}: {
  validator: Validator
}) => {
  const {preferenceTheme} = usePreference()

  const {t} = useTranslation<string>()

  return (
    <View style={{paddingTop: 16}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
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
          paddingTop: 10,
          paddingBottom: 40
        }}
        renderItem={({item}) => {
          return (
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
              <Text style={[theme.typography.caption1.medium, {maxWidth: '50%'}]}>{shortenAddress(item.delegatorAddress, 10, 10)}</Text>
              <Text style={[theme.typography.caption1.medium, {flex: 1, textAlign: 'right'}]}>{formatNumberString(item.stakedAmount.dividedBy(10 ** 18).toString(), 4)}</Text>
            </View>
          )
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  )
}

export default DelegatorTab;
