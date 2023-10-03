import React, { useState } from 'react'
import { Dimensions, View } from 'react-native';
import { styles } from './styles';
import Carousel from 'react-native-reanimated-carousel';
import Text from '../../../component/Text';
import Step1 from './Step1';

const TOTAL_STEP = 4

const BannerSection = () => {
  const [step, setStep] = useState(1)
  const width = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={147}
        // autoPlay={true}
        data={[Step1]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => item()}
      />
    </View>
  )
};

export default BannerSection;
