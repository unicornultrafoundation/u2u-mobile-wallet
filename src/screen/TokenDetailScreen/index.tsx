import React from 'react'
import { View } from 'react-native';
import { styles } from './styles';
import TokenDetailHeader from './TokenDetailHeader';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import TokenBalanceCard from './TokenBalanceCard';
import TokenTxHistory from './TokenTxHistory';

const TokenDetailScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={[
      styles.container,
      {backgroundColor: preferenceTheme.background.background}
    ]}>
      <TokenDetailHeader />
      <TokenBalanceCard />
      <TokenTxHistory />
    </View>
  )
};

export default TokenDetailScreen;
