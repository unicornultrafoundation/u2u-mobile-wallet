import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Header from '../Header';
import BannerSection from '../BannerSection';
import BlurredImageItem, {
  BlurredImageItemProps,
} from '../BannerSection/BlurImageItem';
import useFetchDappList from '../../../hook/useFetchDappList';
// import Text from '../../../component/Text';
const Upcoming = () => {
  const {data: DATA, loading} = useFetchDappList<BlurredImageItemProps[]>(
    'https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/dapp.json',
  );
  // const DATA: BlurredImageItemProps[] = [
  //   {
  //     description: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     title: 'First Item',
  //     logoImg: 'https://fakeimg.pl/100/',
  //     backgroundImg: 'https://fakeimg.pl/100/ff0000,128/000,255',
  //     gradientColor: ['#4c669f', '#3b5998', '#192f6a'],
  //   },
  //   {
  //     description: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     title: 'First Item',
  //     logoImg: 'https://fakeimg.pl/100/',
  //     backgroundImg: 'https://fakeimg.pl/100/ff0000,128/000,255',
  //     gradientColor: ['#4c669f', '#3b5998', '#192f6a'],
  //   },
  // ];
  return (
    <View>
      <Header text="Upcoming" />
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <BannerSection renderItemComponent={BlurredImageItem} data={DATA!} />
        )}
      </View>
    </View>
  );
};

export default Upcoming;
