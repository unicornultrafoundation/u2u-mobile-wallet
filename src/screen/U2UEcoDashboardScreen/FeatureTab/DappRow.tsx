import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';
import Text from '../../../component/Text';
import Button from '../../../component/Button';

const DappRow = ({tokenObj}: {tokenObj: any}) => {
  // const navigation = useNavigation<any>();
  // const handlePressDetail = () => {
  //   navigation.navigate('TokenDetail', {tokenMeta: tokenObj});
  // };

  return (
    <View style={styles.tokenContainer}>
      <View style={{width: 40, height: 40}}>
        <Image
          source={{uri: 'https://fakeimg.pl/300/'}}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
          }}
        />
      </View>
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <Text>{tokenObj.title}</Text>
        <Text>{tokenObj.description}</Text>
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
    </View>
  );
};

export default DappRow;
