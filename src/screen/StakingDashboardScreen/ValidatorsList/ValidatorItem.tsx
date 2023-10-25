import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Validator } from '../../../service/staking';
import { styles } from './styles';
import { SvgUri } from 'react-native-svg';
import Text from '../../../component/Text';
import BigNumber from 'bignumber.js';
import { formatNumberString } from '../../../util/string';
import theme from '../../../theme';

const ValidatorItem = ({validator}: {
  validator: Validator
}) => {
  const amount = useMemo(() => {
    return formatNumberString(validator.totalStakedAmount.dividedBy(10 ** 18).toFixed(), 2)
  }, [validator])

  return (
    <View style={styles.validatorItem}>
      <View style={{width: 28, height: 28, paddingRight: 6}}>
        <SvgUri
          uri="https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"
          width="100%"
          height="100%"
        />
      </View>
      <View style={{flex: 1}}>
        <Text
          style={[theme.typography.caption1.medium]}
        >
          {validator.name}
        </Text>
        <Text>{validator.valId}</Text>
      </View>
      <Text>{amount}</Text>
    </View>
  )
}

export default ValidatorItem;