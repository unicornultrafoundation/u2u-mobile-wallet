import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Jazzicon from 'react-native-jazzicon'
import { styles } from '../styles';
import Icon from '../../../component/Icon';
import { useWallet } from '../../../hook/useWallet';
import Text from '../../../component/Text';
import { shortenAddress, truncate } from '../../../util/string';
import HeaderSearchComponent from './HeaderSearchComponent';
import Clipboard from '@react-native-clipboard/clipboard';
import SelectNetworkModal from '../../../component/SelectNetworkModal';
import { useNetwork } from '../../../hook/useNetwork';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import SelectWalletModal from '../../../component/SelectWalletModal';
import Toast from 'react-native-toast-message';

interface Props {
  collapsed: boolean;
  action: string;
  onGoBack: () => void;
}

const WalletHeader = ({ collapsed, action, onGoBack }: Props) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const { wallet, getWalletMetadata } = useWallet();
  const { name } = useNetwork()

  if (collapsed) {
    return <HeaderSearchComponent onGoBack={onGoBack} action={action}/>;
  }

  return (
    <View style={styles.headerSection}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8
        }}>
        <SelectWalletModal
          trigger={() => {
            return (
              <Jazzicon size={28} address={wallet.address}/>
            )
          }}
        />
        <View>
          <Text type="subheadline-medium" color="title">
            {getWalletMetadata(wallet).name || `Address ${wallet.path[wallet.path.length - 1]}` }
          </Text>
          {/*<Text type="caption1-regular" color="primary">*/}
          {/*  {shortenAddress(wallet.address, 4, 4)}*/}
          {/*</Text>*/}
        </View>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(wallet.address)
            Toast.show({
              type: "simpleNoti",
              text1: "Copied to clipboard",
              props: {
                width: '45%'
              }
            })
          }}
        >
          <Icon name="copy" width={16} height={16}/>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <SelectNetworkModal
          trigger={() => {
            return (
              <View style={[styles.networkContainer, { backgroundColor: preferenceTheme.background.surface }]}>
                <Text style={styles.networkText}>{name}</Text>
                <Icon name="chevron-down" width={10} height={10}/>
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
