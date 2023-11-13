import React, {FunctionComponent} from 'react';
import {Animated, FlatList} from 'react-native';

interface BannerSectionProps {
  renderItemComponent: FunctionComponent<any>;
  data?: any[];
}

const BannerSection: React.FC<BannerSectionProps> = ({
  renderItemComponent,
  data,
}) => {
  // const width = Dimensions.get('window').width;
  // const flatListRef = useRef<FlatList | null>(null);
  // useEffect(() => {
  //   let currentOffset = 0; // This will hold the current offset position

  //   const interval = setInterval(() => {
  //     if (flatListRef.current) {
  //       flatListRef.current.scrollToOffset({
  //         offset: currentOffset + CARD_LENGTH + SPACING * 1.5,
  //         animated: true,
  //       });
  //       currentOffset += CARD_LENGTH + SPACING * 1.5; // Update the offset for the next item

  //       // Resetting to the first item when reaching the end
  //       if (currentOffset >= data.length * (CARD_LENGTH + SPACING * 1.5)) {
  //         currentOffset = 0;
  //         flatListRef.current.scrollToOffset({
  //           offset: currentOffset,
  //           animated: true,
  //         });
  //       }
  //     }
  //   }, 3000); // Change the image every 3 seconds

  //   return () => clearInterval(interval); // Clear interval if the component is unmounted or the dependencies change
  // }, []);

  // const CARD_LENGTH = width * 0.8;
  // const SPACING = width * 0.01;
  // const SIDECARD_LENGTH = (width * 0.18) / 2;

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  return (
    <Animated.View>
      <AnimatedFlatList
        // ref={flatListRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        // snapToInterval={CARD_LENGTH + SPACING * 1.5}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment={'center'}
        data={data}
        horizontal={true}
        renderItem={({item, index}: {item: any, index: number}) => {
          const RenderItemComponent = renderItemComponent;
          return <RenderItemComponent {...item} index={index} key={`banner-item-${item.id}`} />;
        }}
        keyExtractor={(item: any) => item.id}
      />
    </Animated.View>
  );
};

export default BannerSection;
