import React, {useCallback, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';
import Tab from '../../component/Tab';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useGlobalStore} from '../../state/global';
import ExploreTab from './ExploreTab';
import FeatureTab from './FeatureTab';
import FavoriteTab from './FavoritesTab';

const U2UEcoDashboardScreen = () => {
  const route = useRoute();
  const {setRouteName} = useGlobalStore();

  const renderScene = () => {
    switch (selectedTab) {
      case 'feature':
        return <FeatureTab />;
      case 'favorites':
        return (
          <FavoriteTab />
        );
      case 'explore':
        return <ExploreTab />;
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
            label: 'Featured',
            value: 'feature',
          },
          {
            label: 'Explore',
            value: 'explore',
          },
          {
            label: 'Favorites',
            value: 'favorites',
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
