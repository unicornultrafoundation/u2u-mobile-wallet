import React, { useMemo } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Validator } from '../../../service/staking';
import { styles } from './styles';
import { SvgUri } from 'react-native-svg';
import Text from '../../../component/Text';
import { formatNumberString, shortenAddress } from '../../../util/string';
import theme from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { usePreference } from '../../../hook/usePreference';

const ValidatorItem = ({validator}: {
  validator: Validator
}) => {
  const navigation = useNavigation<any>()

  const {preferenceTheme} = usePreference()

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
      {validator.avatar ? (
        <Image
          source={{ uri: validator.avatar }}
          style={{
            width: 26,
            height: 26,
            marginRight: 8
          }}
        />
      ) : (
        <View style={{width: 34, height: 34, paddingRight: 8}}>
          <SvgUri
            uri="https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/public_assets/token_logos/u2u.svg"
            width="100%"
            height="100%"
          />
        </View>
      )}
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
          {shortenAddress(validator.auth, 10, 10)} - APR: {formatNumberString(validator.apr.toString(), 2)}%
        </Text>
      </View>
      <Text style={[theme.typography.subheadline.medium, {maxWidth: '65%', marginLeft: 5}]}>
        {amount}
      </Text>
    </TouchableOpacity>
  )
}

export default ValidatorItem;