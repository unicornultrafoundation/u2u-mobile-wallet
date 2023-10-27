import React from 'react';
import {ScrollView, View, Dimensions, ActivityIndicator} from 'react-native';
import Header from '../Header';
import SelectDappModal from '../../../component/SelectDappModal';
import DappRow from './DappRow';
import useFetchDappList from '../../../hook/useFetchDappList';
import {DappResult} from '../base-type';

const TopDapp = () => {
  const {data: DATA, loading} = useFetchDappList<DappResult[]>(
    'https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/dapp.json',
  );
  // const DATA = [
  //   {
  //     title: 'Ultra X',
  //     description: 'Description',
  //     logoImg: 'https://fakeimg.pl/300/',
  //   },
  //   {
  //     title: 'U2 Swap',
  //     description: 'Description',
  //     logoImg: 'https://fakeimg.pl/300/',
  //   },
  //   {
  //     title: 'U2 OTC',
  //     description: 'Description',
  //     logoImg: 'https://fakeimg.pl/300/',
  //   },
  //   {
  //     title: 'U2 OTCAC',
  //     description: 'Description',
  //     logoImg: 'https://fakeimg.pl/300/',
  //   },
  // ];
  const groupData: any[][] = [];
  if (DATA !== null) {
    for (let i = 0; i < DATA.length; i += 3) {
      groupData.push(DATA.slice(i, i + 3));
    }
  }
  return (
    <View>
      <Header text="Trading" />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          groupData.map((group, groupIndex) => (
            <View
              key={groupIndex}
              style={{
                width: Dimensions.get('window').width * 0.85,
              }}>
              {group.map((item, index) => (
                <SelectDappModal
                  trigger={() => {
                    return <DappRow tokenObj={item} key={`dapp-${index}`} />;
                  }}
                  title={item.title}
                  description={item.description}
                  logoImg={item.logoImg}
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TopDapp;
