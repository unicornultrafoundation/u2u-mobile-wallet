import React from 'react'
import { View } from 'react-native';
import { useFetchDelegator } from '../../../hook/useFetchDelegator';
import { useWallet } from '../../../hook/useWallet';
import DelegationItem from './DelegationItem';
import { TABBAR_HEIGHT } from '../../../component/CustomBottomTab';

const DelegationList = () => {
  const {wallet} = useWallet()
  const {delegator} = useFetchDelegator(wallet.address)
  const { validations, address: delegatorAddr } = delegator

  return (
    <View style={{
      paddingBottom: TABBAR_HEIGHT,
      gap: 12
    }}>
      {validations?.map((item) => {
        return (
          <DelegationItem
            key={`delegation-${item.id}`}
            item={item}
          />
        )
      })}
      {/* <FlatList
        bounces={false}
        // refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchDelegator} />}
        contentContainerStyle={{
          paddingBottom: TABBAR_HEIGHT,
        }}
        data={validations}
        renderItem={({item}) => {
          return (
            <DelegationItem
              key={`delegation-${item.id}`}
              item={item}
            />
          )
        }}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      /> */}
    </View>
  )
};

export default DelegationList;
