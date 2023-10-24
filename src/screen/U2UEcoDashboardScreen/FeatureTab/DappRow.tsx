import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {SvgUri} from 'react-native-svg';
import Text from '../../../component/Text';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../component/Button';

const DappRow = ({tokenObj}: {tokenObj: any}) => {
  const navigation = useNavigation<any>();
  const handlePressDetail = () => {
    navigation.navigate('TokenDetail', {tokenMeta: tokenObj});
  };

  return (
    <TouchableOpacity style={styles.tokenContainer} onPress={handlePressDetail}>
      <View style={{width: 40, height: 40}}>
        <SvgUri uri={tokenObj.logo} width="100%" height="100%" />
      </View>
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <Text>{tokenObj.symbol}</Text>
        <Text>Description</Text>
      </View>
      <View>
        <Button
          type="text"
          textStyle={{fontSize: 12, textAlign: 'center', color: '#B4B4B4'}}
          style={{
            backgroundColor: '#1F2225',
            borderRadius: 20,
            height: 40,
            width: 80,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
          }}>
          Open
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default DappRow;
