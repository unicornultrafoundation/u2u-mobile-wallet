import React from 'react'
import { View } from 'react-native';
import Text from '../../component/Text';
import { Validator } from '../../service/staking';
import { VALIDATOR_COMMISSION } from '../../config/constant';
import theme from '../../theme';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { formatNumberString } from '../../util/string';
import { useTranslation } from 'react-i18next';

const InfoTab = ({validator}: {
  validator: Validator
}) => {
  const {darkMode} = usePreferenceStore()
  const { t } = useTranslation()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={{paddingTop: 16, gap: 16}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 8}}>
        <View style={{flex: 3}}>
          <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary, paddingBottom: 4}]}>
            {t('commission')}
          </Text>
          <Text style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}>
            {VALIDATOR_COMMISSION}%
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary, paddingBottom: 4}]}>
            {t('ID')}
          </Text>
          <Text style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}>
            {validator.valId}
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 8}}>
        <View style={{flex: 3}}>
          <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary, paddingBottom: 4}]}>
            {t('totalDelegator')}
          </Text>
          <Text style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}>
            {validator.totalDelegator}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary, paddingBottom: 4}]}>
            {t('votingPower')}
          </Text>
          <Text style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}>
            {validator.votingPower ? formatNumberString((validator.votingPower / 10000).toString(), 3) : 0}%
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 3}}>
          <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary, paddingBottom: 4}]}>
            {t('totalStakedAmount')}
          </Text>
          <Text style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}>
            {formatNumberString(validator.totalStakedAmount.dividedBy(10**18).toString(), 4)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default InfoTab;
