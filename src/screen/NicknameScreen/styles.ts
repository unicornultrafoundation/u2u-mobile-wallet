import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    width: '100%'
  },
  body: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flex: 1
  },
  nicknameContainer: {
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    width: '100%',
    borderColor: theme.color.neutral[600],
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
});
