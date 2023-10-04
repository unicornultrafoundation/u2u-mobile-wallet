import React, { useCallback } from 'react'
import { View } from 'react-native';
import { styles } from './styles';
import TokenDetailHeader from './TokenDetailHeader';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import TokenBalanceCard from './TokenBalanceCard';
import TokenTxHistory from './TokenTxHistory';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';

const TokenDetailScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

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
