import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Validator } from '../../../service/staking';
import { styles } from './styles';
import { SvgUri } from 'react-native-svg';
import Text from '../../../component/Text';
import BigNumber from 'bignumber.js';
import { formatNumberString } from '../../../util/string';
import theme from '../../../theme';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { useNavigation } from '@react-navigation/native';

const ValidatorItem = ({validator}: {
  validator: Validator
}) => {
  const navigation = useNavigation<any>()

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const amount = useMemo(() => {
    return formatNumberString(validator.totalStakedAmount.dividedBy(10 ** 18).toFixed(), 2)
  }, [validator])

  const handleSelectValidator = (validator: Validator) => {
    navigation.navigate("ValidatorDetail", {
      validator
    })
  }

  return (
    <TouchableOpacity style={styles.validatorItem} onPress={() => handleSelectValidator(validator)}>
      <View style={{width: 34, height: 34, paddingRight: 6}}>
        <SvgUri
          uri="https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"
          width="100%"
          height="100%"
        />
      </View>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Text
          style={[
            theme.typography.caption1.medium,
            {
              color: preferenceTheme.text.title
            }
          ]}
        >
          {validator.name}
        </Text>
        <Text
          style={[
            theme.typography.caption1.regular,
            {
              color: preferenceTheme.text.primary
            }
          ]}
        >
          APR: {formatNumberString(validator.apr.toString(), 2)}%
        </Text>
      </View>
      <Text>{amount}</Text>
    </TouchableOpacity>
  )
}

export default ValidatorItem;