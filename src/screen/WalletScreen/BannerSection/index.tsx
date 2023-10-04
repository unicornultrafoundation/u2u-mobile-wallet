import React from 'react'
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const BannerSection = () => {
  const width = Dimensions.get('window').width;

  return (
    <Carousel
      loop
      width={width}
      height={147}
      autoPlay={true}
      data={[Step1, Step2, Step3, Step4]}
      scrollAnimationDuration={1000}
      // onSnapToItem={(index) => console.log('current index:', index)}
      renderItem={({ item }) => item()}
    />
  )
};

export default BannerSection;
