import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import SelectDappModal from '../../../component/SelectDappModal';
import DappRow from './DappRowWithFavorite';
import useFetchDappList from '../../../hook/useFetchDappList';

const ExploreSection = ({filter}: {filter: string}) => {
  const {data: DATA, loading} = useFetchDappList();
  
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
