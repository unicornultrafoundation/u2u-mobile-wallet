import React, {useCallback, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';
import Tab from '../../component/Tab';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useGlobalStore} from '../../state/global';
import ExploreTab from './ExploreTab';

const U2UEcoDashboardScreen = () => {
  const route = useRoute();
  const {setRouteName} = useGlobalStore();

  const renderScene = () => {
    switch (selectedTab) {
      case 'feature':
        return <ExploreTab />;
      case 'favorites':
        return (
          <Text style={{color: 'white'}}>This is the Favorites scene</Text>
        );
      case 'explore':
        return <Text style={{color: 'white'}}>This is the Explore scene</Text>;
      default:
        return null;
    }
  };

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const [selectedTab, setSelectedTab] = useState('feature');
  return (
    <View style={styles.container}>
      <Text>Investment dashboard screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for DApps or enter a URL"
        placeholderTextColor={'#363636'}
        // onChangeText={onChangeText}
        // value={text}
      />
      <Tab
        tabs={[
          {
            label: 'Feature',
            value: 'feature',
          },
          {
            label: 'Favorites',
            value: 'favorites',
          },
          {
            label: 'Explore',
            value: 'explore',
          },
        ]}
        selectedTab={selectedTab}
        onChange={v => setSelectedTab(v)}
        tabStyle={{
          borderColor: 'transparent',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingLeft: 16,
          paddingRight: 12,
        }}
      />
      {renderScene()}
    </View>
  );
};

export default U2UEcoDashboardScreen;
