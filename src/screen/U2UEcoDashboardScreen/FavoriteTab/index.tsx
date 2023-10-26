import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import SelectDappModal from '../../../component/SelectDappModal';
import DappRow from '../ExploreTab/DappRowWithFavorite';
import useFetchDappList from '../../../hook/useFetchDappList';
import {useFavoriteStore} from '../../../state/favorite';

const FavoriteSection = ({filter}: {filter: string}) => {
  const {data: DATA, loading} = useFetchDappList<DappResult[]>(
    'https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/dapp.json',
  );
  const {items} = useFavoriteStore();
  return (
    <View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator />
        ) : (
          DATA!
            .filter(obj => {
              return items.some(item => {
                return (
                  item.title === obj.title &&
                  item.isFavorite === true &&
                  obj.category!.includes(filter)
                );
              });
            })
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

export default FavoriteSection;
