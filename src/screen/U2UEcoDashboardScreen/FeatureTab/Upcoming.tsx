import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Header from '../Header';
import BannerSection from '../BannerSection';
import BlurredImageItem from '../BannerSection/BlurImageItem';
import useFetchDappList from '../../../hook/useFetchDappList';

const Upcoming = () => {
  const {data, loading} = useFetchDappList();

  return (
    <View>
      <Header text="Upcoming" />
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <BannerSection renderItemComponent={BlurredImageItem} data={data.filter((i) => i.upcoming)} />
        )}
      </View>
    </View>
  );
};

export default Upcoming;
