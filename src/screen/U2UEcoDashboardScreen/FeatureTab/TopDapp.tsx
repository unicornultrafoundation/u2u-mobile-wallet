import React from 'react';
import {useWalletAssets} from '../../../hook/useWalletAssets';
import {ScrollView, View} from 'react-native';
import DappRow from './DappRow';
import {useGlobalStore} from '../../../state/global';
import Header from '../Header';
const TopDapp = () => {
  const {assets} = useWalletAssets();
  const {searchKeyword} = useGlobalStore();

  return (
    <View>
      <Header text="Top DApps" />
      <ScrollView>
        {assets
          .filter(i => {
            return (
              (i.address as string)
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ||
              (i.symbol as string)
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ||
              (i.name as string)
                .toLowerCase()
                .includes(searchKeyword.toLowerCase())
            );
          })
          .map((tokenObj: any) => {
            return (
              <DappRow
                tokenObj={tokenObj}
                key={`token-asset-${tokenObj.symbol}`}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default TopDapp;
