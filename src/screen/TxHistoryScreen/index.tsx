import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { useWallet } from '../../hook/useWallet';
import { useTokenTxHistory } from '../../hook/useTokenTxHistory';
import { styles } from './styles';
import Icon from '../../component/Icon';
import theme from '../../theme';
import Text from '../../component/Text';
import { shortenAddress } from '../../util/string';
import { parseFromRaw } from '../../util/bignum';
import { formatDate } from '../../util/date';
import Button from '../../component/Button';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useGlobalStore } from '../../state/global';

const TxHistoryScreen = () => {
  const { setRouteName } = useGlobalStore();
  const navigation = useNavigation<any>()
  const route = useRoute();

  const {wallet} = useWallet()
  const {loading, txList} = useTokenTxHistory(wallet.address, "")

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
    >
      <TouchableOpacity onPress={navigation.goBack}>
        <Icon name="arrow-left" width={24} height={24} />
      </TouchableOpacity>
      <ScrollView style={{marginTop: 24}}>
        {txList.map((txItem: Record<string, any>) => {
          const isSend = wallet.address.toLowerCase() === txItem.from.toLowerCase()
          return (
            <TouchableOpacity
              style={styles.txRowContainer}
              key={`token-tx-${txItem.hash}`}
              onPress={() => navigation.navigate("TransactionDetail", {transactionHash: txItem.hash})}
            >
              <Icon
                name={isSend ? 'arrow-up-circle' : 'arrow-down-circle'}
                color={isSend ? theme.accentColor.error.normal : theme.accentColor.tertiary.normal}
                width={20}
                height={20} 
                style={{marginRight: 24}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.txTypeText}>
                  {isSend ? 'Send' : 'Receive'}
                </Text>
                <Text style={styles.txTypeDescriptionText}>
                  {isSend ? `To: ${shortenAddress(txItem.to, 8, 5)}` : `From: ${shortenAddress(txItem.from, 8, 5)}`}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={[
                  styles.amountText,
                  {color: isSend ? theme.accentColor.error.normal : theme.accentColor.tertiary.normal}
                ]}>
                  {isSend ? '-' : '+'}{parseFromRaw(txItem.value, txItem.tokenDecimal || 18, true)}
                </Text>
                <Text style={styles.dateText}>
                  {formatDate(Number(txItem.timeStamp) * 1000, 'yyyy-MM-dd')}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
        <View style={{paddingVertical: 20, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            style={{
              width: 120,
              // height: 34,
              borderRadius: 80,
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: preferenceTheme.background.surface
            }}
            color='tertiary'
            textStyle={{
              fontSize: 12,
              lineHeight: 16,
              fontWeight: '500',
              color: theme.color.neutral[500]
            }}
          >
            View more
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

export default TxHistoryScreen;
