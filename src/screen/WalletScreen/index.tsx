import React from 'react';
import { styles } from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import WalletHeader from './WalletHeader';

const Separator = () => <View style={styles.separator}/>;

const WalletScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={[
      styles.container,
      {backgroundColor: preferenceTheme.background.background}
    ]}>
      <WalletHeader />
      <View style={[styles.section, styles.headerSection]}>
        <TouchableOpacity>
          <FontAwesome6 style={{ fontSize: 24 }} color="white" name={'circle-user'} solid />
        </TouchableOpacity>
        <Text style={styles.textPrimary}>Menu</Text>
        <Text style={styles.textPrimary}>Actions</Text>
      </View>
      <Separator/>
    </View>
  );
};

export default WalletScreen;
