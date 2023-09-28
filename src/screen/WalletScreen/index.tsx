import React from 'react';
import { styles } from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import WalletHeader from './WalletHeader';
import BalanceCard from './BalanceCard';

const Separator = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={[styles.separator, {borderBottomColor: preferenceTheme.outline}]}/>
  )
}

const WalletScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={[
      styles.container,
      {backgroundColor: preferenceTheme.background.background}
    ]}>
      <WalletHeader />
      <BalanceCard />
      <Separator/>
    </View>
  );
};

export default WalletScreen;
