import React from 'react';
import { styles } from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Separator = () => <View style={styles.separator}/>;

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      {/*<ImageBackground source={require('../../asset/background/background.png')} style={styles.image}/>*/}
      {/*<ImageBackground source={{uri: 'https://reactnative.dev/img/opengraph.png'}} resizeMode="cover" style={styles.image}/>*/}
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

export default SettingScreen;
