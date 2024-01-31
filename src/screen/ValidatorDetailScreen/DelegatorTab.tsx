import React from 'react'
import { FlatList, Linking, TouchableOpacity, View } from 'react-native';
import Text from '../../component/Text';
import { Validator } from '../../service/staking';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import Separator from '../../component/Separator';
import { formatNumberString, shortenAddress } from '../../util/string';
import { usePreference } from '../../hook/usePreference';
import { useNetwork } from '../../hook/useNetwork';
import Icon from '../../component/Icon';

const DelegatorTab = ({validator}: {
  validator: Validator
}) => {
  const {preferenceTheme} = usePreference()
  const {blockExplorer} = useNetwork()

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
              <TouchableOpacity
                style={{maxWidth: '50%', flex: 1, flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  Linking.openURL(`${blockExplorer}/address/${item.delegatorAddress}`)
                }}
              >
                <Text style={[theme.typography.caption1.medium]}>{shortenAddress(item.delegatorAddress, 10, 10)}</Text>
                <Icon name="external-link" width={24} height={24} />
              </TouchableOpacity>
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
