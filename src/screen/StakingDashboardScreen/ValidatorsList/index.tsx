import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native';
import { useStaking } from '../../../hook/useStaking';
import ValidatorItem from './ValidatorItem';
import { useFetchAllValidator } from '../../../hook/useFetchAllValidator';
import { TABBAR_HEIGHT } from '../../../component/CustomBottomTab';

const ValidatorsList = () => {
  const {validators} = useFetchAllValidator()

  return (
    <View style={{
      paddingBottom: TABBAR_HEIGHT,
      gap: 12
    }}>
      {validators?.map((item) => {
        return (
          <ValidatorItem
            key={`validator-${item.auth}`}
            validator={item}
          />
        )
      })}
      {/* <FlatList
        bounces={false}
        contentContainerStyle={{
          paddingBottom: TABBAR_HEIGHT,
        }}
        data={validators}
        renderItem={({item}) => {
          return <ValidatorItem validator={item} />
        }}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      /> */}
    </View>
  )
};

export default ValidatorsList;
