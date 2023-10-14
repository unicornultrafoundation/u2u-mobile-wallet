import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { styles } from './styles';
import TextInput from '../../component/TextInput';

const NFTItems = () => {
  const [searchString, setSearchString] = useState('');
  const data = [
    {
      id: 1,
      name: 'WARRIOR  #1',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 2,
      name: 'WARRIOR #2',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 3,
      name: 'WARRIOR #3',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 4,
      name: 'WARRIOR #3',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 5,
      name: 'WARRIOR #3',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 6,
      name: 'WARRIOR #3',
      image: 'https://fakeimg.pl/300/',
    },
  ];

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'stretch', rowGap: 12, columnGap: 24 }}>
      {data.map(item => (
        <View key={item.id} style={{ width: '45%' }}>
          <View style={{ width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden' }}>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 171 }}/>
          </View>
        </View>
      ))}
      {/*<TextInput*/}
      {/*  style={{ backgroundColor: 'white' }}*/}
      {/*  value={searchString}*/}
      {/*  onChangeText={val => setSearchString(val)}*/}
      {/*/>*/}
    </ScrollView>
  );
};

export default NFTItems;
