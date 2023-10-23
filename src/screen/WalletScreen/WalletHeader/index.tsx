import React from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';
import Icon from '../../../component/Icon';
import {useWallet} from '../../../hook/useWallet';
import Text from '../../../component/Text';
import {truncate} from '../../../util/string';
import HeaderSearchComponent from './HeaderSearchComponent';
import Clipboard from '@react-native-clipboard/clipboard';
import SelectNetworkModal from '../../../component/SelectNetworkModal';
import { useNetwork } from '../../../hook/useNetwork';

interface Props {
  collapsed: boolean;
  action: string;
  onGoBack: () => void;
}

const WalletHeader = ({collapsed, action, onGoBack}: Props) => {
  const {wallet} = useWallet();
  const {name} = useNetwork()

  if (collapsed) {
    return <HeaderSearchComponent onGoBack={onGoBack} action={action} />;
  }

  return (
    <View style={styles.headerSection}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="u2u" width={28} height={28} />
        <View style={{marginLeft: 8}}>
          <Text style={styles.addressText}>{truncate(wallet.address, 14)}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => Clipboard.setString(wallet.address)}
        >
          <Icon name="copy" width={24} height={24} />
        </TouchableOpacity>
        <SelectNetworkModal
          trigger={() => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text style={styles.networkText}>{name}</Text>
                <Icon name="chevron-down" width={10} height={10} />
              </View>
            )
          }}
        />
        {/* <TouchableOpacity style={{marginHorizontal: 12}}>
          <Icon name="notification" width={24} height={24} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity>
          <Icon name="scan" width={24} height={24} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default WalletHeader;
