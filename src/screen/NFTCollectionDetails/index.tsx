import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import CollectionBanner from './Banner';
import NFTItems from './NFTItems';
import Tab from '../../component/Tab';
import NFTCollectionActivities from './Activities';

const NFTCollectionDetailsScreen = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [tab, setTab] = useState('items');

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: preferenceTheme.background.background },
      ]}>
      <CollectionBanner />

      <View style={[styles.section]}>
        <Tab
          tabs={[
            { label: 'Items', value: 'items' },
            { label: 'Activities', value: 'activities' },
          ]}
          selectedTab={tab}
          onChange={v => setTab(v)}
          tabStyle={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingLeft: 16,
            paddingRight: 12,
          }}
        />
        <ScrollView style={{ marginTop: 16 }}>
          {tab === 'items' && <NFTItems/>}
          {tab === 'activities' && <NFTCollectionActivities/>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NFTCollectionDetailsScreen;
