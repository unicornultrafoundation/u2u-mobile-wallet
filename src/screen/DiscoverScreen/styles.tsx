import { Dimensions, StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

export const useStyles = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  return StyleSheet.create({
    container: {
      width: '100%',
      height: Dimensions.get('window').height,
      paddingTop: getPhonePaddingTop(),
      paddingBottom: getPhonePaddingBottom(),
      overflow: 'scroll',
      backgroundColor: preferenceTheme.background.background,
    },
    title: {
      color: preferenceTheme.text.title,
      fontWeight: '700',
      letterSpacing: 0.38,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
  });
};
