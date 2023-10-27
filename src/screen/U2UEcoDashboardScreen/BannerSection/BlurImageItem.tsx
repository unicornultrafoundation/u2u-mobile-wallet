import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import Button from '../../../component/Button';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../component/Text';
import {styles} from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import theme from '../../../theme';

export interface BlurredImageItemProps {
  backgroundImg: string;
  title: string;
  description: string;
  logoImg: string;
  gradientColor: string[];
  index?: number;
}

const BlurredImageItem = ({
  backgroundImg,
  title,
  description,
  logoImg,
  index,
  gradientColor
}: BlurredImageItemProps) => {
  const width = Dimensions.get('window').width;

  const SPACING = width * 0.1;
  const SIDECARD_LENGTH = (width * 0.18) / 2;
  const size = useSharedValue(0.8);
  const opacity = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{scaleY: size.value}],
      opacity: opacity.value,
    };
  });
  return (
    <Animated.View
      style={[
        styles.container,
        // cardStyle,
        {
          marginRight: index === 2 ? SIDECARD_LENGTH : SPACING,
          left: index === 0 ? 16 : 0,
        },
      ]}>
      <Image source={{uri: backgroundImg}} style={styles.backgroundImage} />
      <View style={styles.upcomingOverlayContainer}>
        <LinearGradient
          colors={gradientColor}
          style={styles.blurredSection}>
          <Image source={{uri: logoImg}} style={styles.smallImage} />
          <View style={styles.textContainer}>
            <Text style={[theme.typography.label.bold]}>{title}</Text>
            <Text style={[theme.typography.caption1.regular]}>{description}</Text>
          </View>
          <Button
            type="text"
            textStyle={{
              fontSize: 14,
              textAlign: 'center',
              color: '#363636',
            }}
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              height: 25,
              width: 50,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}>
            Open
          </Button>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

export default BlurredImageItem;
