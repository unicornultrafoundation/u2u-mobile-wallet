import React, { useMemo } from 'react';
import {Text as RNText, StyleProp, TextProps, TextStyle} from 'react-native';
import {typography} from '../../theme/typography';
import {usePreferenceStore} from '../../state/preferences';
import {darkTheme, lightTheme} from '../../theme/color';

interface Props extends TextProps {
  type?: string;
  style?: StyleProp<TextStyle>;
  color?: 'title' | 'primary' | 'secondary' | 'placeholder' | 'disabled';
  fontSize?: TextStyle['fontSize'];
  fontWeight?: TextStyle['fontWeight'];
  letterSpacing?: TextStyle['letterSpacing'];
  textAlign?: TextStyle['textAlign']
}

const Text = ({
  children,
  style,
  type = 'label-regular',
  color = 'title',
  fontSize,
  letterSpacing,
  fontWeight,
  textAlign = 'left',
  ...rest
}: Props) => {
  const {darkMode} = usePreferenceStore();
  const [typoType, variant] = useMemo(() => {
    return type.split('-');
  }, [type]);

  const defaultStyle = useMemo(() => {
    return typography[typoType][variant];
  }, [typoType, variant]);

  const customStyle = useMemo(() => {
    const textColor = darkMode ? darkTheme.text[color] : lightTheme.text[color];
    return {
      color: textColor,
      fontSize,
      fontWeight,
      letterSpacing,
      textAlign
    };
  }, [darkMode, color, fontWeight, letterSpacing]);

  return (
    <RNText {...rest} allowFontScaling={false} style={[defaultStyle, customStyle, style]}>
      {children}
    </RNText>
  );
};

export default Text;
