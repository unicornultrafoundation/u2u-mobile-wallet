import React from 'react';
import {View} from 'react-native';
import Header from '../Header';
import BannerSection from '../BannerSection';
import BlurredImageItem, {
  BlurredImageItemProps,
} from '../BannerSection/BlurImageItem';
// import Text from '../../../component/Text';
const Upcoming = () => {
  const DATA: BlurredImageItemProps[] = [
    {
      description: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      logoImg: 'https://fakeimg.pl/300/',
      backgroundImg: 'https://fakeimg.pl/300/ff0000,128/000,255',
      gradientColor: ['#4c669f', '#3b5998', '#192f6a'],
    },
    {
      description: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      logoImg: 'https://fakeimg.pl/300/',
      backgroundImg: 'https://fakeimg.pl/300/ff0000,128/000,255',
      gradientColor: ['#4c669f', '#3b5998', '#192f6a'],
    },
  ];
  return (
    <View>
      <Header text="Upcoming" />
      <View>
        <BannerSection renderItemComponent={BlurredImageItem} data={DATA} />
      </View>
    </View>
  );
};

export default Upcoming;
