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
  const {data: DATA, loading} = useFetchDappList();
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <BannerSection renderItemComponent={ImageItem} data={DATA.filter((i) => i.featured)} />
          {/* <BannerSection renderItemComponent={AnnouncementItem} data={DATA} /> */}
        </>
      )}
      <TopDapp />
      <Upcoming />
      {/* <Trading /> */}
    </ScrollView>
  );
};

export default FeatureTab;
