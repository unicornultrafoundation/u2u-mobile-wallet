import React, { useCallback } from 'react'
import { View } from 'react-native';
import { styles } from './styles';
import TokenDetailHeader from './TokenDetailHeader';
import TokenBalanceCard from './TokenBalanceCard';
import TokenTxHistory from './TokenTxHistory';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from '../../component/Separator';
import { usePreference } from '../../hook/usePreference';

const TokenDetailScreen = () => {
  const {preferenceTheme} = usePreference()

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
      <SafeAreaView>
        <TokenDetailHeader />
      </SafeAreaView>
      <TokenBalanceCard />
      <Separator style={{width: '100%'}}/>
      <TokenTxHistory />
    </View>
  )
};

export default TokenDetailScreen;
