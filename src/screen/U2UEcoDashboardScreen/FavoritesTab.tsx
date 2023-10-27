import React, {useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import Tab from '../../component/Tab';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useGlobalStore} from '../../state/global';
import FavoriteSection from './FavoriteTab';

const FavoriteTab = () => {
  const [selectedTab, setSelectedTab] = useState('trading');
  const route = useRoute();

  const {setRouteName} = useGlobalStore();

  const renderScene = () => {
    switch (selectedTab) {
      case 'trading':
        return <FavoriteSection filter="trading" />;
      case 'defi':
        return <FavoriteSection filter="defi" />;
      case 'gamefi':
        return <FavoriteSection filter="gamefi" />;
      case 'dex':
        return <FavoriteSection filter="dex" />;
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
    <ScrollView>
      <Tab
        containerStyle={{paddingLeft: 16}}
        tabs={[
          {
            label: 'Trading',
            value: 'trading',
          },
          {
            label: 'DeFi',
            value: 'defi',
          },
          {
            label: 'GameFi',
            value: 'gamefi',
          },
          {
            label: 'Dex',
            value: 'dex',
          },
          {
            label: 'Tool',
            value: 'tool',
          },
          {
            label: 'Filter',
            value: 'filter',
          },
        ]}
        selectedTab={selectedTab}
        onChange={v => setSelectedTab(v)}
        tabStyle={{
          paddingHorizontal: 0,
          paddingRight: 16,
        }}
      />
      {renderScene()}
    </ScrollView>
  );
};

export default FavoriteTab;
