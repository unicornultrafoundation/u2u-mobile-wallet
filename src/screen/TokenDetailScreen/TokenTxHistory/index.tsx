import { useRoute } from '@react-navigation/native';
import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useTokenTxHistory } from '../../../hook/useTokenTxHistory';
import { useWallet } from '../../../hook/useWallet';
import { styles } from './styles';
import Text from '../../../component/Text';
import Icon from '../../../component/Icon';
import { shortenAddress } from '../../../util/string';
import { parseFromRaw } from '../../../util/bignum';
import { formatDate } from '../../../util/date';
import theme from '../../../theme';
import Button from '../../../component/Button';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';

const TokenTxHistory = () => {
  const {params} = useRoute<any>();
  const tokenMeta = params?.tokenMeta || {}

  const {wallet} = useWallet()
  const {loading, txList} = useTokenTxHistory(wallet.address, tokenMeta.address)

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <ScrollView>
      {txList.map((txItem: Record<string, any>) => {
        const isSend = wallet.address.toLowerCase() === txItem.from.toLowerCase()
        return (
          <View style={styles.txRowContainer} key={`token-tx-${txItem.hash}`}>
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
          </View>
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
  )
}

export default TokenTxHistory;
