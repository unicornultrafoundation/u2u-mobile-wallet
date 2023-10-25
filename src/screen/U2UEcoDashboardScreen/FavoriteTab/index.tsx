import React from 'react';
import {ScrollView, View} from 'react-native';
import SelectDappModal from '../../../component/SelectDappModal';
import DappRow from '../ExploreTab/DappRowWithFavorite';
import useFavoriteItems from '../../../hook/useFavorite';

const FavoriteSection = ({filter}: {filter: string}) => {
  const DATA = [
    {
      title: 'Ultra X',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
      filter: 'trading',
    },
    {
      title: 'U2 Swap',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
      filter: 'trading',
    },
    {
      title: 'U2 OTC',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
      filter: 'gamefi',
    },
    {
      title: 'U2 OTCAC',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
      filter: 'dex',
    },
  ];

  const {items} = useFavoriteItems();
  return (
    <View>
      <ScrollView>
        {/* {DATA.filter(obj => obj.filter === filter).map(
          (tokenObj: any, index) => {
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
          },
        )} */}
        {DATA.filter(obj => {
          return items.some(item => {
            return (
              item.title === obj.title &&
              item.isFavorite === true &&
              obj.filter === filter
            );
          });
        }).map((tokenObj: any, index) => {
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

export default FavoriteSection;
