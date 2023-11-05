import React, {useState, useEffect} from 'react';
import {View, FlatList, BackHandler, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDebounce} from '../../hook/useDebounce';
import DappRow from '../../screen/U2UEcoDashboardScreen/FeatureTab/DappRow';
import TextInput from '../TextInput';
import Icon from '../Icon';
// Define the types
type SearchResult = {
  // id: number;
  title: string;
};

type APIResponse = {
  results: SearchResult[];
};

// Debounce function
// const debounce = (func: Function, delay: number) => {
//   let inDebounce: NodeJS.Timeout;
//   return function (this: any, ...args: any[]) {
//     clearTimeout(inDebounce);
//     inDebounce = setTimeout(() => func.apply(this, args), delay);
//   };
// };

const SearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLayerVisible, setIsLayerVisible] = useState<boolean>(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery.length > 0) {
      const fetchResults = async () => {
        try {
          console.log(debouncedSearchQuery);
          const response = await fetch(
            'https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/dapp.json',
          );
          const data: APIResponse = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      fetchResults();
    } else {
      setResults([]); // Reset results if input is cleared
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    // Handle the back button press
    const handleBackPress = () => {
      if (isLayerVisible) {
        setIsLayerVisible(false);
        return true; // This will prevent the default back behavior
      }
      return false; // Default behavior
    };

    // Add the listener when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove the listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [isLayerVisible]);
  //   const handleResetButtonPress = () => {
  //     setSearchQuery(''); // Reset the input field
  // };
  return (
    <>
      {/* <TextInput
        placeholder="Search..."
        onFocus={() => setIsLayerVisible(true)}
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      /> */}
      <TextInput
        // containerStyle={styles.input}
        placeholder="Search for DApps or enter a URL"
        placeholderTextColor={'#363636'}
        onTouchStart={() => setIsLayerVisible(true)}
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
        postIcon={() => {
          return (
            <TouchableOpacity onPress={() => setIsLayerVisible(false)}>
              <Icon name='close' width={24} height={24} />
            </TouchableOpacity>
          )
        }}
      />
      {isLayerVisible && (
        <View
          style={{
            position: 'absolute',
            paddingTop: 20,
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            zIndex: 99,
          }}>
          {/* <TouchableOpacity onPress={() => setIsLayerVisible(false)}>
            <Text onPress={handleResetButtonPress} style={{color: 'white'}}>Close</Text>
          </TouchableOpacity> */}
          <FlatList
            data={results}
            keyExtractor={item => item.title}
            renderItem={({item, index}) => (
              <DappRow tokenObj={item} key={`dapp-${index}`} />
            )}
          />
        </View>
      )}
    </>
  );
};

export default SearchComponent;
