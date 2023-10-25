import React, {useState, useEffect} from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import StarButton from '../../../component/FavoriteButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DappRow = ({tokenObj}: {tokenObj: any}) => {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const INITIAL_DATA = [{title: '', isFavorite: false}];
  useEffect(() => {
    const loadItemsFromStorage = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('favoriteItems');
        const parsedItems = JSON.parse(storedItems);
        if (parsedItems !== null && parsedItems.length > 0) {
          setItems(JSON.parse(storedItems));
        } else {
          setItems(INITIAL_DATA);
        }
      } catch (err) {
        console.error('Failed: ', err);
      }
    };
    loadItemsFromStorage();
  }, []);

  const toggleFavorite = async (title: string) => {
    let updatedItems;

    // Check if the item with the given title already exists in the items array
    const existingItem = items.find(item => item.title === title);

    if (existingItem) {
      // If it exists, toggle its favorite status
      updatedItems = items.map(item => {
        if (item.title === title) {
          return {...item, isFavorite: !item.isFavorite};
        }
        return item;
      });
    } else {
      // If it doesn't exist, add it to the items array and set it as favorite
      updatedItems = [...items, {title, isFavorite: true}];
    }

    try {
      await AsyncStorage.setItem('favoriteItems', JSON.stringify(updatedItems));
      setItems(updatedItems);
    } catch (error) {
      console.error('Failed to save items:', error);
    }
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
        <Text>{tokenObj.title}</Text>
        <Text>{tokenObj.description}</Text>
      </View>
      <View style={styles.actionContainer}>
        <Button
          type="text"
          textStyle={{fontSize: 12, textAlign: 'center', color: '#B4B4B4'}}
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
