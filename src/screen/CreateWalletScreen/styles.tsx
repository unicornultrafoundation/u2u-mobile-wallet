import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';
import theme from '../../theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: getPhonePaddingTop() + 8,
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
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0.38,
    paddingTop: 32,
    paddingBottom: 8
  },
  instructionText: {
    fontSize: 11,
    letterSpacing: 0.07,
    lineHeight: 14,
    paddingBottom: 12,
    textAlign: 'center'
  },
  seedContainer: {
    borderRadius: 8,
    paddingLeft: 24,
    paddingTop: 18,
    paddingRight: 24,
    paddingBottom: 18,
    marginTop: 16,
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
  seedItem: {
    paddingLeft: 4,
    paddingTop: 12,
    paddingRight: 4,
    paddingBottom: 12,
    width: "25%",
  }
});
