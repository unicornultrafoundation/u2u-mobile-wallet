import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import Icon from '../../component/Icon';
import { styles } from './styles';
import Text from '../../component/Text';
import { SvgUri } from 'react-native-svg';
import { useNetwork } from '../../hook/useNetwork';

const TokenDetailHeader = () => {
  const {blockExplorer} = useNetwork()
  const {params} = useRoute<any>();
  const navigation = useNavigation()

  const tokenMeta = params?.tokenMeta || {}

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Icon name="arrow-left" width={24} height={24} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: 24, height: 24, marginRight: 4}}>
          <SvgUri
            uri={tokenMeta.logo}
            width="100%"
            height="100%"
          />
        </View>
        <Text style={styles.headerTokenSymbolText}>{tokenMeta.symbol}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`${blockExplorer}/token/${tokenMeta.address}`)
        }}
      >
        <Icon name="external-link" width={26} height={24} />
      </TouchableOpacity>
    </View>
  )
}

export default TokenDetailHeader;
