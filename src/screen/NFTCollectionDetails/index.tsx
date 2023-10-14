import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import CollectionBanner from './Banner';
import NFTItems from './NFTItems';
import Tab from '../../component/Tab';

const NFTCollectionDetailsScreen = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [tab, setTab] = useState('items');

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: preferenceTheme.background.background },
      ]}>
      <CollectionBanner />

      <View style={[styles.section]}>
        <Tab
          tabs={[
            { label: 'Items', value: 'items' },
            { label: 'History', value: 'history' },
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
        {tab === 'items' && <NFTItems />}
      </View>
    </View>
  );
};

export default NFTCollectionDetailsScreen;
