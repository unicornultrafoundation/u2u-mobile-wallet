import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Icon from '../../component/Icon';
import { useWallet } from '../../hook/useWallet';
import Text from '../../component/Text';
import { truncate } from '../../util/string';

const WalletHeader = () => {
  const {wallet} = useWallet()
  return (
    <View style={styles.headerSection}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='u2u' width={28} height={28} />
        <View style={{marginLeft: 8}}>
          <Text style={styles.addressText}>
            {truncate(wallet.address, 14)}
          </Text>
          <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
            <Text style={styles.networkText}>
              Testnet
            </Text>
            <Icon name='chevron-down' width={10} height={10} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Icon name='copy' width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 12}}>
          <Icon name='notification' width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name='scan' width={24} height={24} />
        </TouchableOpacity>
        <View></View>
      </View>
    </View>
  )
};

export default WalletHeader;