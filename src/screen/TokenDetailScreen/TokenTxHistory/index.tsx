import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { useTokenTxHistory } from '../../../hook/useTokenTxHistory';
import { useWallet } from '../../../hook/useWallet';
import theme from '../../../theme';
import Button from '../../../component/Button';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import NoTransactionView from "./NoTransactionView";
import { useTranslation } from "react-i18next";
import TxHistoryItem from '../../TxHistoryScreen/TxHistoryItem';
import LoadingView from '../../../component/Common/loadingView';

const TokenTxHistory = () => {
  const {params} = useRoute<any>();
  const tokenMeta = params?.tokenMeta || {}
  const {t} = useTranslation()

  const navigation = useNavigation<any>()

  const {wallet} = useWallet()
  const {loading, txList} = useTokenTxHistory(wallet.address, tokenMeta.address)

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  if (loading) {
    return <LoadingView/>
  }

  if((txList ?? []).length == 0){
    return <NoTransactionView/>
  }
  
  return (
    <ScrollView>
      {txList.map((txItem: Record<string, any>) => {
        return <TxHistoryItem txItem={txItem}/>
      })}
      <View style={{paddingVertical: 20, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          style={{
            borderRadius: 60,
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: preferenceTheme.background.surface
          }}
          color='tertiary'
          textStyle={[
            theme.typography.caption1.medium,
            {color: preferenceTheme.text.disabled}
          ]}
        >
          {t('viewMore')}
        </Button>
      </View>
    </ScrollView>
  )
}

export default TokenTxHistory;
