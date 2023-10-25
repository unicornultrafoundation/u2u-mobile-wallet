import React from 'react';
import {ScrollView} from 'react-native';
import BannerSection from './BannerSection';
import ImageItem from './BannerSection/ImageItem';
import AnnouncementItem from './BannerSection/AnnouncementItem';
import TopDapp from './FeatureTab/TopDapp';
import Upcoming from './FeatureTab/Upcoming';
import Trading from './FeatureTab/Trading';

const FeatureTab = () => {
  const DATA = [
    {
      description: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      description: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      description: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  return (
    <ScrollView>
      <BannerSection renderItemComponent={ImageItem} data={DATA} />
      <BannerSection renderItemComponent={AnnouncementItem} data={DATA} />
      <TopDapp />
      <Upcoming />
      <Trading />
    </ScrollView>
  );
};

export default FeatureTab;
