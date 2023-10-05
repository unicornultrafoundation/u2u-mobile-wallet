import React from 'react';
import BalanceCard from '../WalletScreen/BalanceCard';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../component/Text';
import { styles } from './styles';
import Icon from '../../component/Icon';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTokenBalance } from '../../hook/useTokenBalance';
import { useWallet } from '../../hook/useWallet';

const TokenBalanceCard = () => {
  const {wallet} = useWallet()
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const navigation = useNavigation<any>()

  const {params} = useRoute<any>();
  const tokenMeta = params?.tokenMeta || {}

  const {loading: balanceLoading, balance} = useTokenBalance(wallet.address, tokenMeta.address)

  return (
    <View style={styles.balanceCardContainer}>
      <View style={styles.balanceContainer}>
        <Text style={[styles.balanceNumberInToken, {color: preferenceTheme.text.primary}]}>
          {balanceLoading ? '-' : balance} {tokenMeta.symbol}
        </Text>
        {/* <Text style={styles.balanceNumberInFiatText}>$0</Text> */}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 32}}>
          <TouchableOpacity style={styles.balanceActionButton}>
            <Icon name="arrow-up" width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.balanceActionButtonText}>Send</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={[styles.balanceActionButton, {marginRight: 0}]}
            onPress={() => {
              navigation.navigate('ReceiveToken', {
                tokenMeta
              })
            }}
          >
            <Icon name="arrow-down" width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.balanceActionButtonText}>Receive</Text>
        </View>
      </View>
    </View>
  )
};

export default TokenBalanceCard;
