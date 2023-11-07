import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { useNavigation } from '@react-navigation/native';

const DappRow = ({dappMeta}: {dappMeta: any}) => {
  const navigation = useNavigation<any>();
  const handlePressDetail = () => {
    // navigation.navigate('DAppWebView', {url: dappMeta.url});
  };

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
        <Text style={[theme.typography.label.bold]}>{dappMeta.title}</Text>
        <Text style={[theme.typography.caption1.regular]}>
          {dappMeta.description}
        </Text>
      </View>
      <View>
        <Button
          type="text"
          textStyle={{fontSize: 14, textAlign: 'center', color: '#B4B4B4'}}
          style={styles.openButton}
          onPress={handlePressDetail}
        >
          Open
        </Button>
      </View>
    </View>
  );
};

export default DappRow;
