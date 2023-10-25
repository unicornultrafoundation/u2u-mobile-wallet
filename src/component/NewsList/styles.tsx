import { Dimensions, StyleSheet } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

export const useStyles = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  return StyleSheet.create({
    topNewsImage: {
      width: '100%',
      height: (Dimensions.get('window').width - 32) / 2,
      borderRadius: 12
    },
    title: {
      color: preferenceTheme.text.title,
      fontWeight: '700',
      letterSpacing: 0.38,
    },
    description: {
      color: preferenceTheme.text.primary,
      fontSize: 12,
      textAlign: 'justify'
    },
    caption: {
      color: preferenceTheme.text.primary,
      fontSize: 11,
      letterSpacing: 0.07
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    articleThumbnail: {
      width: 110,
      height: 80,
      borderRadius: 12,
      objectFit: 'cover'
    }
  });
};
