import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Jazzicon from 'react-native-jazzicon'
import { styles } from '../styles';
import Icon from '../../../component/Icon';
import { useWallet } from '../../../hook/useWallet';
import Text from '../../../component/Text';
import { getDefaultWalletName, shortenAddress, truncate } from '../../../util/string';
import HeaderSearchComponent from './HeaderSearchComponent';
import Clipboard from '@react-native-clipboard/clipboard';
import SelectNetworkModal from '../../../component/SelectNetworkModal';
import { useNetwork } from '../../../hook/useNetwork';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import SelectWalletModal from '../../../component/SelectWalletModal';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Scanner from '../../../component/QRCodeScanner';
import { useWalletConnect } from '../../../hook/useWalletConnect';
import { useGlobalStore } from '../../../state/global';

interface Props {
  collapsed: boolean;
  action: string;
  onGoBack: () => void;
}

const WalletHeader = ({ collapsed, action, onGoBack }: Props) => {
  const navigation = useNavigation<any>()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const { wallet, getWalletMetadata } = useWallet();
  const { name } = useNetwork()
  const { t } = useTranslation()
  const {setShowWCScanner} = useGlobalStore()

  if (collapsed) {
    return <HeaderSearchComponent onGoBack={onGoBack} action={action}/>;
  }

  return (
    <View style={[styles.headerSection, {backgroundColor: preferenceTheme.background.background}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('WalletManagement')}
        >
          <Jazzicon size={28} address={wallet.address}/>
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row', gap: 6}}>
          <Text type="subheadline-medium" color="title" style={{flexShrink: 1}}>
            {getWalletMetadata(wallet).name || getDefaultWalletName(wallet)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(wallet.address)
              Toast.show({
                type: "simpleNoti",
                text1: t('msgCopied'),
                props: {
                  width: '45%'
                }
              })
            }}
          >
            <Icon name="copy" width={16} height={16}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setShowWCScanner(true)
              navigation.navigate('WCSessionProposal', {
                uri: 'wc:00ce5cd393a6b562595ba6826b6a5dfa888fc592850a8d0923418a8519fb56c6@2?relay-protocol=irn&symKey=c865e67c2ef1043d07674904aaf133c121d6e9878751183bede1aa7b03683b1e'
              })
            }}
          >
            <Icon name="wallet-connect" width={16} height={16}/>
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
    </View>
  );
};

export default WalletHeader;
