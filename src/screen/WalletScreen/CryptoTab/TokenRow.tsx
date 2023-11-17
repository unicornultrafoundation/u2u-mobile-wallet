import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { SvgUri } from 'react-native-svg';
import Text from '../../../component/Text';
import { useNavigation } from '@react-navigation/native';
import { formatNumberString } from '../../../util/string';
import Icon from '../../../component/Icon';

const TokenRow = ({tokenObj}: {
  tokenObj: any
}) => {
  const navigation = useNavigation<any>()
  const handlePressDetail = () => {
    navigation.navigate('TokenDetail', {tokenMeta: tokenObj})
  }

  return (
    <TouchableOpacity style={styles.tokenContainer} onPress={handlePressDetail}>
      <View style={{width: 28, height: 28}}>
        {tokenObj.logo ? (
          <SvgUri
            uri={tokenObj.logo}
            width="100%"
            height="100%"
          />
        ) : (
          <Icon
            name='anonymous-token'
          />
        )}
      </View>
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <Text>{tokenObj.symbol}</Text>
      </View>
      <View>
        <Text>{formatNumberString(tokenObj.balance)} {tokenObj.symbol}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TokenRow;