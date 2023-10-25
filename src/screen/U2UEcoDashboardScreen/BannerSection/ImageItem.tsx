import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Text from '../../../component/Text';
import theme from '../../../theme';
interface ItemProps {
  index: number;
  title: string;
  description: string;
}
const ImageItem = ({index, title, description}: ItemProps) => {
  const width = Dimensions.get('window').width;

  const CARD_LENGTH = width * 0.8;
  const SPACING = width * 0.05;
  const SIDECARD_LENGTH = (width * 0.18) / 2;
  const size = useSharedValue(0.8);
  const opacity = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{scaleY: size.value}],
      opacity: opacity.value,
    };
  });

  const styles = StyleSheet.create({
    card: {
      width: CARD_LENGTH,
      height: 200,
      overflow: 'hidden',
      borderRadius: 15,
    },
    overlay: {
      position: 'absolute', // Position the overlay on top of the image
      left: 0,
      right: 0,
      bottom: 0, // Position it at the bottom of your item container
      height: '25%', // 20% of the item container's height
      backgroundColor: 'rgba(0,0,0,0.1)', // Example: black with 50% opacity
      justifyContent: 'flex-start', // Align content to the top
      alignItems: 'flex-start',
      paddingHorizontal: 16,
    },
  });

  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        {
          marginLeft: index == 0 ? 16 : 0,
          marginRight: index == 2 ? SIDECARD_LENGTH : SPACING,
        },
      ]}>
      <Image
        source={{uri: 'https://fakeimg.pl/300/'}}
        style={{width: '100%', height: '100%'}}
      />
      <View style={styles.overlay}>
        <Text style={[theme.typography.label.bold]}>{title}</Text>
        <Text style={[theme.typography.caption1.regular]}>{description}</Text>
      </View>
    </Animated.View>
  );
};

export default ImageItem;
