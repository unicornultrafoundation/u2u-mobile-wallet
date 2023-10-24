import React from 'react';
import {ScrollView, View} from 'react-native';
import Header from '../Header';
import {useWalletAssets} from '../../../hook/useWalletAssets';
import {useGlobalStore} from '../../../state/global';
import DappRow from './DappRow';
// import Text from '../../../component/Text';
const Trading = () => {
  const {assets} = useWalletAssets();
  const {searchKeyword} = useGlobalStore();

  return (
    <View>
      <Header text="Trading" />
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

export default Trading;
