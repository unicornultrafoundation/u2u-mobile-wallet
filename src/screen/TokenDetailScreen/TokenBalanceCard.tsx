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
import { useTransaction } from '../../hook/useTransaction';
import { formatNumberString } from '../../util/string';
import { useTranslation } from "react-i18next";

const TokenBalanceCard = () => {
  const {wallet} = useWallet()
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {setTokenMeta} = useTransaction();
  const navigation = useNavigation<any>()

  const {params} = useRoute<any>();
  const tokenMeta = params?.tokenMeta || {}
  const {t} = useTranslation()

  const {loading: balanceLoading, balance} = useTokenBalance(wallet.address, tokenMeta.address)

  return (
    <View style={styles.balanceCardContainer}>
      <View style={styles.balanceContainer}>
        <Text style={[styles.balanceNumberInToken, {color: preferenceTheme.text.primary}]}>
          {balanceLoading ? '-' : formatNumberString(balance, 4)} {tokenMeta.symbol}
        </Text>
        {/* <Text style={styles.balanceNumberInFiatText}>$0</Text> */}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 32}}>
          <TouchableOpacity
            style={styles.balanceActionButton}
            onPress={() => {
              setTokenMeta(tokenMeta);
              navigation.navigate('SendToken');
            }}
          >
            <Icon name="arrow-up" width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.balanceActionButtonText}>{t("send")}</Text>
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
          <Text style={styles.balanceActionButtonText}>{t("receive")}</Text>
        </View>
      </View>
    </View>
  )
};

export default TokenBalanceCard;
