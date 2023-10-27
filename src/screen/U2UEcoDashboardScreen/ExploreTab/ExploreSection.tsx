import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import SelectDappModal from '../../../component/SelectDappModal';
import DappRow from './DappRowWithFavorite';
import useFetchDappList from '../../../hook/useFetchDappList';
import {DappResult} from '../base-type';
const ExploreSection = ({filter}: {filter: string}) => {
  const {data: DATA, loading} = useFetchDappList<DappResult[]>(
    'https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/dapp.json',
  );
  // const DATA = [
  //   {
  //     title: 'Ultra X',
  //     description: 'Description',
  //     logoImg: 'https://fakeimg.pl/300/',
  //     category: ['trading', 'dex'],
  //   },
  //   {
  //     title: 'U2 Swap',
  //     description: 'Description',
  //     logoImg: 'https://fakeimg.pl/300/',
  //     category: ['trading', 'gamefi'],
  //   },
  //   {
  //     title: 'U2 OTC',
  //     description: 'Description',
  //     logoImg: 'https://fakeimg.pl/300/',
  //     category: ['gamefi', 'defi'],
  //   },
  //   {
  //     title: 'U2 OTCAC',
  //     description: 'Description',
  //     logoImg: 'https://fakeimg.pl/300/',
  //     category: ['dex'],
  //   },
  // ];
  return (
    <View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator />
        ) : (
          DATA!
            .filter(obj => obj.category!.includes(filter))
            .map((tokenObj: any, index) => {
              return (
                <SelectDappModal
                  trigger={() => {
                    return (
                      <DappRow tokenObj={tokenObj} key={`dapp-${index}`} />
                    );
                  }}
                  title={tokenObj.title}
                  description={tokenObj.description}
                  logoImg={tokenObj.logoImg}
                />
              );
            })
        )}
      </ScrollView>
    </View>
  );
};

export default ExploreSection;
