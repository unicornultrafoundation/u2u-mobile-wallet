import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  otpContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  otpInput: {
    textAlign: 'center',
    width: 46,
    height: 48,
    color: '#FFFFFF',
    fontSize: 24,
    padding: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.color.neutral[600]
  },
});
