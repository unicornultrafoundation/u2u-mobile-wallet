import React from 'react';
import { View } from 'react-native';
import Text from '../../component/Text';
import { styles } from './styles';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>
  )
};

export default SplashScreen;