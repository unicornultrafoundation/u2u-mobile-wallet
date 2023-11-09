import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native';
import { useStaking } from '../../../hook/useStaking';
import ValidatorItem from './ValidatorItem';

const ValidatorsList = () => {
  const {validators, fetchAllValidators} = useStaking()

  useEffect(() => {
    fetchAllValidators()
  }, [])

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 400
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
