import React from 'react';
import { Text, TextProps } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

interface Props extends TextProps {
  gradient: LinearGradientProps
}

const GradientText = ({ style, gradient, ...rest }: Props) => {
  return (
    <MaskedView maskElement={<Text style={style} {...rest} />}>
      <LinearGradient {...gradient}>
        <Text {...rest} style={[style, { opacity: 0 }]}/>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
