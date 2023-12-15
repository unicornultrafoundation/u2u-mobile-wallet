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
      backgroundColor: preferenceTheme.background.background
    },
    screenTitle: {
      flex: 1,
      color: preferenceTheme.text.primary,
      textAlign: 'center',
      paddingHorizontal: 8,
    },
    section: {
      paddingHorizontal: 16
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
    },
    card: {
      padding: 12,
      borderRadius: 6,
      backgroundColor: preferenceTheme.background.surface,
      gap: 8
    }
  });
}