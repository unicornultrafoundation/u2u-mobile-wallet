import React from 'react'
import { View } from 'react-native';
import { useStaking } from '../../../hook/useStaking';
import ValidatorItem from './ValidatorItem';

const ValidatorsList = () => {
  const {validators} = useStaking()
  return (
    <View>
      {validators.map((v, index) => <ValidatorItem key={`validator-${index}`} validator={v} />)}
    </View>
  )
};

export default ValidatorsList;
