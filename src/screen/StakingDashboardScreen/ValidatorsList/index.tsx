import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native';
import { useStaking } from '../../../hook/useStaking';
import ValidatorItem from './ValidatorItem';
import { useFetchAllValidator } from '../../../hook/useFetchAllValidator';

const ValidatorsList = () => {
  const {validators} = useFetchAllValidator()

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 800
        }}
        data={validators}
        renderItem={({item}) => {
          return <ValidatorItem validator={item} />
        }}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      />
    </View>
  )
};

export default ValidatorsList;
