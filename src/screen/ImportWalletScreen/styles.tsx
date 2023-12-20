import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';
import theme from '../../theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: getPhonePaddingTop() + 24,
    paddingHorizontal: 16
  },
  passwordContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 12,
    flex: 1,
    paddingBottom: getPhonePaddingBottom() + 12
  },
  otpContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
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
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 25,
    letterSpacing: 0.38,
    paddingTop: 32,
    paddingBottom: 8
  },
  instructionText: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.5,
    paddingBottom: 32,
    textAlign: 'center'
  },
  seedContainer: {
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    width: '100%',
    borderColor: theme.color.neutral[600],
    // flex: 1
  },
  seed: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16
  },
});
