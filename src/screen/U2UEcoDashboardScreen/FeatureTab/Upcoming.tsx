import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Header from '../Header';
import BannerSection from '../BannerSection';
import BlurredImageItem from '../BannerSection/BlurImageItem';
import useFetchDappList from '../../../hook/useFetchDappList';
import { useTranslation } from 'react-i18next';
import { styles } from '../../TokenDetailScreen/styles';

const Upcoming = () => {
  const {data, loading} = useFetchDappList();
  const { t } = useTranslation();
  return (
    <View>
      {data && data.filter((i) => i.upcoming).length > 0 && <Header text="Upcoming" />}
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
