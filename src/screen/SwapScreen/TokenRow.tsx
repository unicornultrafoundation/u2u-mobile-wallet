import React, { useMemo } from 'react'
import { TouchableOpacity, View, Image } from 'react-native';
import {styles} from './styles';
import Text from '../../component/Text';
import { formatNumberString } from '../../util/string';
import theme from '../../theme';
import Icon from '@/component/Icon';
import { useLocalStore } from '../../state/local';

const TokenRow = ({tokenObj, onPress}: {
  tokenObj: any;
  onPress: () => void;
}) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.tokenContainer}>
      <View style={{width: 28, height: 28}}>
        {tokenObj.logo ? (
          <Image
            source={{uri: tokenObj.logo}}
            style={{
              width: 28,
              height: 28
            }}
          />
        ) : (
          <Icon
            name='anonymous-token'
          />
        )}
      </View>
      <View style={{ flex: 1, paddingHorizontal: 8}}>
        <Text style={[theme.typography.caption1.medium]}>{tokenObj.symbol}</Text>
        <Text style={[theme.typography.caption1.regular]}>{tokenObj.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TokenRow;