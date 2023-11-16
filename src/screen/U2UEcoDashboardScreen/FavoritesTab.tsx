import React, {useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import Tab from '../../component/Tab';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useGlobalStore} from '../../state/global';
import FavoriteSection from './FavoriteTab';
import {useTranslation} from 'react-i18next';

const FavoriteTab = () => {
  const [selectedTab, setSelectedTab] = useState('trading');
  const route = useRoute();

  const {setRouteName} = useGlobalStore();
  const {t} = useTranslation();

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
            label: t('Trading'),
            value: 'trading',
          },
          {
            label: t('DeFi'),
            value: 'defi',
          },
          {
            label: t('GameFi'),
            value: 'gamefi',
          },
          {
            label: t('Dex'),
            value: 'dex',
          },
          {
            label:t('Tool'),
            value: 'tool',
          },
          {
            label: t('Filter'),
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
