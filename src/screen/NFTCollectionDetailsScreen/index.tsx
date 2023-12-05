import React, { useCallback, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import CollectionBanner from './Banner';
import NFTItems from './NFTItems';
import Tab from '../../component/Tab';
import NFTCollectionActivities from './Activities';
import { NFTCollectionMeta } from '../../hook/useSupportedNFT';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import { useTranslation } from 'react-i18next';

const NFTCollectionDetailsScreen = () => {
  const { setRouteName } = useGlobalStore();
  const { darkMode } = usePreferenceStore();
  const { t } = useTranslation();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  
  const route = useRoute<any>()
  const nftCollection: NFTCollectionMeta = route.params?.nftCollection || {}
  
  const [tab, setTab] = useState('items');

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  return (
    <View
      style={[
        styles.container,
        { 
          backgroundColor: preferenceTheme.background.background
        },
      ]}>
      <CollectionBanner nftCollection={nftCollection} />

      <View style={[styles.section]}>
        <Tab
          tabs={[
            { label: t('items'), value: 'items' },
            // { label: t('activities), value: 'activities' },
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
        {tab === 'items' && <NFTItems nftCollection={nftCollection} />}
        {/* {tab === 'activities' && <NFTCollectionActivities/>} */}
      </View>
    </View>
  );
};

export default NFTCollectionDetailsScreen;
