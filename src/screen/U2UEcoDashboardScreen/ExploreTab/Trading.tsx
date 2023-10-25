import React from 'react';
import {ScrollView, View} from 'react-native';
import SelectDappModal from '../../../component/SelectDappModal';
import DappRow from './DappRowWithFavorite';

const Trading = () => {
  const DATA = [
    {
      title: 'Ultra X',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
    },
    {
      title: 'U2 Swap',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
    },
    {
      title: 'U2 OTC',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
    },
    {
      title: 'U2 OTCAC',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
    },
  ];
  return (
    <View>
      <ScrollView>
        {DATA.map((tokenObj: any, index) => {
          return (
            <SelectDappModal
              trigger={() => {
                return <DappRow tokenObj={tokenObj} key={`dapp-${index}`} />;
              }}
              title={tokenObj.title}
              description={tokenObj.description}
              logoImg={tokenObj.logoImg}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Trading;
