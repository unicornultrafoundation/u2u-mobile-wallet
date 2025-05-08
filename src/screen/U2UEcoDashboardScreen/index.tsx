import React, {useCallback, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';
import Tab from '../../component/Tab';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useGlobalStore} from '../../state/global';
import ExploreTab from './ExploreTab';
import FeatureTab from './FeatureTab';
import FavoriteTab from './FavoritesTab';
import SearchComponent from '../../component/SearchComponent';
import { usePreference } from '../../hook/usePreference';

const U2UEcoDashboardScreen = () => {
  const {preferenceTheme} = usePreference()

  const route = useRoute();
  const {setRouteName} = useGlobalStore();
  const [selectedTab, setSelectedTab] = useState('feature');

  const renderScene = () => {
    switch (selectedTab) {
      case 'feature':
        return <FeatureTab />;
      case 'favorites':
        return <FavoriteTab />;
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

  
  return (
    <View style={[
      styles.container,
      {
        backgroundColor: preferenceTheme.background.background
      }
    ]}>
      <SearchComponent />
      {/* <Tab
        tabs={[
          {
            label: 'Featured',
            value: 'feature',
          },
          {
            label: 'Explore',
            value: 'explore',
          },
          // {
          //   label: 'Favorites',
          //   value: 'favorites',
          // },
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
      /> */}
      {renderScene()}
    </View>
  );
};

export default U2UEcoDashboardScreen;
