import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_DATA = [{title: '', isFavorite: false}];

function useFavoriteItems() {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  useEffect(() => {
    const loadItemsFromStorage = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('favoriteItems');
        if (storedItems !== null) {
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
  return {toggleFavorite, items};
}

export default useFavoriteItems;
