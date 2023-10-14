import React from 'react'
import { SafeAreaView } from 'react-native'
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import TxDetail from '../../component/TxDetail';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const TransactionDetailScreen = () => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const {params} = useRoute<any>();
  const transactionHash = params?.transactionHash || ""

  const navigation = useNavigation()

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: preferenceTheme.background.background},
      ]}>
      <TxDetail txHash={transactionHash} onClose={navigation.goBack} />
    </SafeAreaView>
  )
}

export default TransactionDetailScreen;
