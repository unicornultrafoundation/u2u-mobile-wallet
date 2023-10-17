import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import NFTScreenBanner from './Banner';
import Tab from '../../component/Tab';
import NFTDetails from './NFTDetails';

const NFTDetailsScreen = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [tab, setTab] = useState('details');

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: preferenceTheme.background.background },
      ]}>
      <ScrollView>
        <NFTScreenBanner/>

        <View style={[styles.section]}>
          <Tab
            tabs={[
              { label: 'Details', value: 'details' },
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
        </View>

        <View style={[styles.section, { marginTop: 16 }]}>
          {tab === 'details' && <NFTDetails/>}
          {tab === 'history' && <NFTDetails/>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NFTDetailsScreen;
