import React, { Key } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import { useWallet } from '../../hook/useWallet';
import Icon from '../../component/Icon';
import { shortenAddress } from '../../util/string';
import { parseFromRaw } from '../../util/bignum';
import { formatDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles'

const TxHistoryItem = ({txKey, txItem} : {txKey?: Key | null | undefined, txItem: Record<string, any>}) => {

  const {t} = useTranslation()
  const {darkMode} = usePreferenceStore()
  const navigation = useNavigation<any>()
  const {wallet} = useWallet()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const isSend = wallet.address.toLowerCase() === txItem.from.toLowerCase()
  const color = isSend ? theme.accentColor.error.normal : theme.accentColor.tertiary.normal
  return (
    <TouchableOpacity
      style={styles.containerItem}
      key={txKey}
      onPress={() => navigation.navigate("TransactionDetail", {transactionHash: txItem.hash})}
    >
      <Icon
        name={isSend ? 'arrow-up-circle' : 'arrow-down-circle'}
        color={color}
        width={20}
        height={20}
      />
      <View style={{flex: 1, flexDirection: 'column', gap: 2}}>
        <View style={styles.txRowContentItem}>
          <Text style={[
            theme.typography.caption1.medium,
            {color: preferenceTheme.text.primary}
          ]}>
            {isSend ? t('send') : t('receive')}
          </Text>
          <Text style={[
            theme.typography.footnote.regular,
            {color: color, flex: 1, textAlign: 'right'}
          ]}>
            {isSend ? '-' : '+'}{parseFromRaw(txItem.value, txItem.tokenDecimal || 18, true)}
          </Text>
        </View>
        <View style={styles.txRowContentItem}>
          <Text style={[
            theme.typography.caption2.regular,
            {color: preferenceTheme.text.disabled, flex: 1}
          ]}>
            {isSend ? `${t('to')}: ${shortenAddress(txItem.to, 8, 5)}` : `${t('from')}: ${shortenAddress(txItem.from, 8, 5)}`}
          </Text>
          <Text style={[
            theme.typography.caption2.regular,
            {color: preferenceTheme.text.disabled}
          ]}>
            {formatDate(Number(txItem.timeStamp) * 1000, 'dd/MM/yyyy')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default TxHistoryItem;
