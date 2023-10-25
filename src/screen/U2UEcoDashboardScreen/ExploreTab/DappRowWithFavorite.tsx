import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import StarButton from '../../../component/FavoriteButton';
import useFavoriteItems from '../../../hook/useFavorite';
import theme from '../../../theme';

const DappRow = ({tokenObj}: {tokenObj: any}) => {
  const {items, toggleFavorite} = useFavoriteItems();

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
        <Text style={[theme.typography.label.bold]}>{tokenObj.title}</Text>
        <Text style={[theme.typography.caption1.regular]}>
          {tokenObj.description}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <Button
          type="text"
          textStyle={{fontSize: 14, textAlign: 'center', color: '#B4B4B4'}}
          style={styles.openButton}>
          Open
        </Button>
        <StarButton
          isFavorite={
            items.find(item => item.title === tokenObj.title)?.isFavorite
          }
          onPress={() => toggleFavorite(tokenObj.title)}
        />
      </View>
    </View>
  );
};

export default DappRow;
