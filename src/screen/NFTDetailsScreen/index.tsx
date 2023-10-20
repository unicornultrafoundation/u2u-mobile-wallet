import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import NFTScreenBanner from './Banner';
import Tab from '../../component/Tab';
import NFTDetails from './NFTDetails';
import NFTHistory from './History';
import Button from '../../component/Button';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';

const NFTDetailsScreen = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [tab, setTab] = useState('details');
  const navigation = useNavigation<any>()

  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: preferenceTheme.background.background },
      ]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
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
          {tab === 'history' && <NFTHistory/>}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 99 }}>
        <Button type="fill" fullWidth onPress={() => navigation.navigate('SendNFT')}>
          Transfer
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default NFTDetailsScreen;
