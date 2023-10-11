import React, {useEffect} from 'react';
import {Dimensions, Animated} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Separator from '../../../component/Separator';
import {useFadeAnimation} from '../useFadeAnimation';

const BannerSection = ({collapsed}: {collapsed: boolean}) => {
  const width = Dimensions.get('window').width;

  const {fadeIn, fadeOut, opacityStyle, heightStyle} = useFadeAnimation();

  useEffect(() => {
    collapsed ? fadeOut() : fadeIn();
  }, [collapsed]);
  return (
    <Animated.View
      style={{
        height: heightStyle(170),
        opacity: opacityStyle,
      }}>
      <Carousel
        loop
        width={width}
        height={147}
        autoPlay={true}
        data={[Step1, Step2, Step3, Step4]}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({item}) => item()}
      />
      <Separator />
    </Animated.View>
  );
};

export default BannerSection;
