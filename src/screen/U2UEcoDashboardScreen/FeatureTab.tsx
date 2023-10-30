import React from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import BannerSection from './BannerSection';
import ImageItem from './BannerSection/ImageItem';
import AnnouncementItem from './BannerSection/AnnouncementItem';
import TopDapp from './FeatureTab/TopDapp';
import Upcoming from './FeatureTab/Upcoming';
import Trading from './FeatureTab/Trading';
import useFetchDappList from '../../hook/useFetchDappList';

const FeatureTab = () => {
  const {data: DATA, loading} = useFetchDappList<any>(
    'https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/dapp.json',
  );
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <BannerSection renderItemComponent={ImageItem} data={DATA} />
          <BannerSection renderItemComponent={AnnouncementItem} data={DATA} />
        </>
      )}
      <TopDapp />
      <Upcoming />
      <Trading />
    </ScrollView>
  );
};

export default FeatureTab;
